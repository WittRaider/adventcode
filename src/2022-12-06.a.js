import { getLines, debug, exit } from '../lib/lib.js'


function areAllCharsUnique(chars) {
    let unique = {};
    for(let i=0;i<chars.length;i++) {
        if(!unique[chars[i]]) unique[chars[i]] = 1;
        else return false;
    }
    return true;
}

let lines = getLines('./assets/2022.12.06.txt');
let line = lines[0];

let buffer = '';
for(let i=0;i<line.length;i++) {
    if(buffer.length > 3) { 
        let lastFourOfBuffer = buffer.substring(buffer.length-4,buffer.length);
        if(areAllCharsUnique(lastFourOfBuffer)) {
            debug([lastFourOfBuffer,i,buffer]);
            debug(i);
            exit();
        }
    }
    buffer += line[i];
}