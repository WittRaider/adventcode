const fs = require('fs');
const lines = fs.readFileSync('./assets/2022-12-01.txt','utf-8').split("\n");

function echo(data,doExit) {
    console.log(data);
    console.log("\n");
    if(doExit) process.exit();
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

elves.sort(function(a, b){return b-a});

echo (elves[0]+elves[1]+elves[2]);
