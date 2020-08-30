const fs = require('fs');
const brain = require('brain.js')
let rawdata = fs.readFileSync('training-data.json');
let data = JSON.parse(rawdata);

const net = new brain.recurrent.LSTM();


const _Data = data;
const config = {
  log: true,           // true to use console.log, when a function is supplied it is used
  logPeriod: 5,
  iterations: 1000,
  errorThresh: 0.05,
  learningRate: 0.5
};
net.train(_Data, config);
console.log(net.run('hi'));
console.log(net.run('hello'));
console.log(net.run('Hello'));

// fs.writeFileSync('trained-net.js', `export default ${ net.toFunction().toString() };`);

// import trainedNet from './trained-net';
// trainedNet(data);