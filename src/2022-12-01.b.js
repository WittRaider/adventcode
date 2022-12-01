import { getLines, debug, exit } from '../lib/lib.js'

function getElves() {
    let elves = [];
    let sum = 0;

    getLines('./assets/2022-12-01.txt').forEach(line => {
        line = line.trim(); 
        if(line) {
            let int = parseInt(line);
            sum += int;
        } else {
            elves.push(sum);
            sum = 0;
        } 
    });
    return elves;
}

let elves = getElves();
elves.sort(function(a, b){return b-a}); //sort descending
debug(elves[0]+elves[1]+elves[2]);
