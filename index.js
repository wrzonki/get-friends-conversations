const fs = require('fs');
const brain = require('brain.js')
let rawdata = fs.readFileSync('training-data.json');
let data = JSON.parse(rawdata);

const net = new brain.NeuralNetwork({hiddenLayers :[3]});


const _Data = data;
net.train(_Data);
console.log(net.run('Hello!'));