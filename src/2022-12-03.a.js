import { getLines, debug, exit } from '../lib/lib.js'

const abc = 'abcdefghijklmnopqrstuvwxyz';
const ABC = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';

function getPrio(char) {
    let prio = 0;
    for(let i=1;i<=26;i++) {
        if(abc[i]===char) prio = i+1;
    }
    for(let i=0;i<=26;i++) {
        if(ABC[i]===char) prio = i+26+1;
    }
    return prio;    
}

function getOverlap(first,second) {
    let overlap = [];
    let charOverlaps = '';
    for(let i=0;i<first.length;i++) {
        let char1 = first[i];
        for(let k=0;k<second.length;k++) {
            let char2 = second[k];
            if(char1 === char2) {
                if(charOverlaps !== char1) {
                    charOverlaps = char1;
                    overlap.push(char1);
                }
            }
        }
    }
    let prio = getPrio(charOverlaps);
    return {overlap:overlap,charOverlaps:charOverlaps,prio:prio};
}

function getRucksacks() {
    let rucksacks = [];

    getLines('./assets/2022.12.03.txt').forEach(line => {
        line = line.trim(); 
        let rucksack = {};
        rucksack.part1 = line.substring(0,line.length/2);
        rucksack.part2 = line.substring(line.length/2,line.length);
        rucksack.overlap = getOverlap(rucksack.part1,rucksack.part2);


        //rucksack.all = line;
        rucksacks.push(rucksack);

    });
    return rucksacks;
}

//debug(getRucksacks());exit();

let prio = 0;
getRucksacks().forEach(rucksack => {
    prio += rucksack.overlap.prio;
});

debug(prio);