import { getLines, debug, exit } from '../lib/lib.js'

let cycles = [];
let currentRegister = 1;
let numCycle = 0;
getLines('./assets/2022.12.10.txt').forEach(line => {
    let parts = line.trim().split(" ");
    switch(parts[0]) {
        case "addx":
            numCycle++;
            cycles.push({
                x:currentRegister,
                afterX:currentRegister,
                numCycle:numCycle,
                instruction:line.trim(),
                signalStrength:currentRegister*numCycle
            });  
            numCycle++;
            cycles.push({
                x:currentRegister,
                afterX:(currentRegister+parseInt(parts[1])),
                numCycle:numCycle,
                instruction:line.trim(),
                signalStrength:currentRegister*numCycle
            });                     
            currentRegister += parseInt(parts[1]);
            break;
        case "noop":
            numCycle++;
            cycles.push({
                x:currentRegister,
                afterX:currentRegister,
                numCycle:numCycle,
                instruction:line.trim(),
                signalStrength:currentRegister*numCycle
            });
            break;
    }
});

function drawSprite(cycle) {
    let line = '';
    for(let i=0;i<40;i++) {
        if(i === cycle.afterX || i === (cycle.afterX-1) || i === (cycle.afterX+1)) line += "#";
        else line += ".";
    }
    return line;
}

function getCycle(num) {
    return cycles[num-1];
}

let allLines = ['','','','','',''];
let num = 0;
cycles.forEach(cycle => {
    let line = Math.floor((cycle.numCycle-1)/40);
    let pos  = (cycle.numCycle-1) % 40;   
    let sprite = drawSprite(getCycle(Math.max(cycle.numCycle-1,1)));
    let char = (sprite[pos]==='#')?'#':'.';
    allLines[line] += char;
    /*
    if(num < 10) {
        debug({cycle:cycle.numCycle,line:line,pos:pos,char:char,sprite:sprite,ctr:allLines[line]});    
    }
    */
    num++;
});

let out = '';
allLines.forEach(line => {
    out += line+"\n";
})
debug(out);