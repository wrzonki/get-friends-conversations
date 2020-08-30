const fs = require('fs');

let rawdata = fs.readFileSync('dialog.json');
let lines = JSON.parse(rawdata);

var trainingData = [];


for (var i = 0; i < lines.length; i++) {
  var input;
  var output;
  if (student[i + 1] !== undefined) {
    if ('txt' in  student[i]) {
      input = student[i]['txt'];
    }
    if ('txt' in  student[i + 1]) {
      output = student[i + 1]['txt'];
    }

    if ('1' in  student[i]) {
      input = student[i]['1'];
    }
    if ('1' in  student[i + 1]) {
      output = student[i + 1]['1'];
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