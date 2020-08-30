const puppeteer = require('puppeteer');
const episodes = require('./episodes');
const fs = require('fs');
let i = 0;

fs.appendFile(`./dialog.csv`, '"person";"txt"\n', (err) => (err ? console.log(err) : null));

const getDialog = async function (urls) {
  console.log(i);
  console.log(urls[i]);
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto(urls[i]);
  const logs = await page.$$eval('p', (nodes) => {
    let log = []
    for (var k = 0; k < nodes.length; k++) {
      let p = nodes[k].querySelector('b');
      let t = nodes[k].childNodes[1];
      if (!!p && !!p.textContent.trim() && !!t && !!t.textContent.trim()) {
        log.push(`"${p.textContent.trim().replace(':', '')}";"${t.textContent.replace(/\n/g, '').trim()}"\n`);
      }
    }
    return log.join('');
  });
  fs.appendFileSync(`./dialog.csv`, logs, (err) => (err ? console.log(err) : null));
  i++;
  await browser.close();
  if (urls[i] !== undefined) {
    getDialog(urls);
  }
};

setTimeout(() => {
  getDialog(episodes.episodes);
}, 1000)
