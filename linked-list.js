const fs = require('fs');

let rawdata = fs.readFileSync('dialog_small.json');
let lines = JSON.parse(rawdata);

var trainingData = [];


for (var i = 0; i < lines.length; i++) {
  var input;
  var output;
  if (lines[i + 1] !== undefined) {
    if ('txt' in  lines[i]) {
      input = lines[i]['txt'];
    }
    if ('txt' in  lines[i + 1]) {
      output = lines[i + 1]['txt'];
    }

    if ('1' in  lines[i]) {
      input = lines[i]['1'];
    }
    if ('1' in  lines[i + 1]) {
      output = lines[i + 1]['1'];
    }

    if (!!input && !! output) {
      trainingData.push({
        input: input,
        output: output
      })
    }
  }
}

fs.writeFileSync('training-data.json', JSON.stringify(trainingData));