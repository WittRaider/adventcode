import { getLines, debug, exit } from '../lib/lib.js'

function findHighest(arr) {
    let max = arr.reduce((a, b) => { return Math.max(a, b) });
    return arr.indexOf(max);
}

function getElves() {
    let elves = [];
    let sum = 0;

    getLines('./assets/2022.12.01.txt').forEach(line => {
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

debug(findHighest(getElves()));