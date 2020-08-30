const puppeteer = require('puppeteer');
const episodes = require('./episodes')
const fs = require('fs');
const selector = 'p';
let bufor = 0;
const getDialog = async function (urls) {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    console.log(bufor)
    console.log(urls[bufor])
    await page.goto(urls[bufor]);
    const logs = await page.$$eval(selector, nodes => {
        return nodes.map(node => {
            const person = node.querySelector('b') !== null
              ? node.querySelector('b').textContent.replace(':', '')
              : null;
            const txt = node.childNodes[1] !== undefined
              ? node.childNodes[1].textContent
              : null;
            return {
                person,
                txt
            }
        })
    });
    const filteredLogs = logs.filter(el => {
      if (!el.person || !el.txt) return false;
      return true
    })
    fs.writeFile(`./dialogs/dialog-${urls[bufor].split('/').pop().replace('.html','')}.json`, JSON.stringify(filteredLogs), err => err ? console.log(err): null);
    bufor++
    await browser.close();
    if (urls[bufor] !== undefined) {
      getDialog(urls)
    }
}

getDialog(episodes.episodes)
// console.log(episodes.episodes)