const fs = require('fs');
const brain = require('brain.js')
let rawdata = fs.readFileSync('training-data.json');
let data = JSON.parse(rawdata);

const net = new brain.recurrent.LSTM();


const _Data = data;
const config = {
  log: true,           // true to use console.log, when a function is supplied it is used
  logPeriod: 1,
  iterations: 2,
  errorThresh: 0.9,
  learningRate: 1
};
net.train(_Data, config);
console.log(net.run('hi'));
console.log(net.run('hello'));
console.log(net.run('Hello'));

// fs.writeFileSync('trained-net.js', `export default ${ net.toFunction().toString() };`);

// import trainedNet from './trained-net';
// trainedNet(data);