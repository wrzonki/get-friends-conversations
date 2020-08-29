const puppeteer = require('puppeteer');
const episodes = require('./episodes');
const fs = require('fs');
let i = 0;

const getDialog = async function (urls) {
  console.log(i);
  console.log(urls[i]);
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto(urls[i]);
  const logs = await page.$$eval('p', (nodes) => {
    return nodes.map((node) => {
      let data = {};
      let p = node.querySelector('b')
      let t = node.childNodes[1]
      if (!!p && !!p.textContent.trim() && !!t && !!t.textContent.trim()) {
        data.person = p.textContent.trim();
        data.txt = t.textContent.trim();
        return data;
      }
    });
  });
  fs.writeFile(`./dialog.json`, JSON.stringify(logs.filter(el => el !== null)), (err) =>
    err ? console.log(err) : null
  );
  i++;
  await browser.close();
  if (urls[i] !== undefined) {
    getDialog(urls);
  }
};

getDialog(episodes.episodes);

