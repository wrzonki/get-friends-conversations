const fs = require('fs');
const brain = require('brain.js')
let rawdata = fs.readFileSync('training-data.json');
let data = JSON.parse(rawdata);

const net = new brain.recurrent.LSTM();


const _Data = data;
const config = {
  iterations: 1,
  log: true,
  learningRate: 0.3,
};
net.train(_Data);
console.log(net.run('Hello!'));

fs.writeFileSync('trained-net.js', `export default ${ net.toFunction().toString() };`);

// import trainedNet from './trained-net';
// trainedNet(data);