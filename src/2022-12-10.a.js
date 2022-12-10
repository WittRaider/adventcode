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

function s(cycle) {
    return cycles[cycle-1].signalStrength;
}

debug(s(20)+s(60)+s(100)+s(140)+s(180)+s(220));