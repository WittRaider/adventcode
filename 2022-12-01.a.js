const fs = require('fs');
const lines = fs.readFileSync('./assets/2022-12-01.txt','utf-8').split("\n");

function echo(data,doExit) {
    console.log(data);
    console.log("\n");
    if(doExit) process.exit();
}

function findHighest(elves) {
    let index = 0;
    let max = 0;
    for(let i = 0;i<elves.length;i++) {
        if(elves[i] > sum) {
            sum = elves[i];
            index = i;
        }
    }
    return index;
}

let index = 0;
let elves = [];
let sum = 0;

for(let i = 0;i<lines.length;i++) {
    let line = String(lines[i]).trim();
    if(line) {
        let int = parseInt(line);
        sum += int;
    } else {
        elves.push(sum);
        index++;
        sum = 0;
    }
}

echo(elves[findHighest(elves)]);