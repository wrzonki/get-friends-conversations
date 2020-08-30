const fs = require('fs');
const brain = require('brain.js')
let rawdata = fs.readFileSync('training-data.json');
let data = JSON.parse(rawdata);

const net = new brain.recurrent.LSTM();


const _Data = data;
const config = {
  log: true,           // true to use console.log, when a function is supplied it is used
  logPeriod: 1,
  iterations: 300
};
net.train(_Data, config);
console.log(net.run('hi'));
console.log(net.run('hello'));
console.log(net.run('Hello'));
console.log(net.run('How you doin?'));
console.log(net.run('I\'m fine thanks'));

fs.writeFileSync('trained-net.js', JSON.stringify(net.toJSON()));

// import trainedNet from './trained-net';
// trainedNet(data);