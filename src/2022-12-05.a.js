import { getLines, debug, exit } from '../lib/lib.js'

let stacks = [[],[],[],[],[],[],[],[],[]];

function parseLayer(line) {
    if(line.indexOf("[")===-1) return;
    let layer = [];
    for(let i=0;i<9;i++) {
        let item = line.substring(i*4,i*4+3);
        item = item.trim();
        if(!item) continue;
        stacks[i].unshift(item);
    }
    return layer;
}

function parseIt() {
    let instructions = [];
    let inBody = false;
    getLines('./assets/2022.12.05.txt').forEach(line => {
        if(!line.trim()) {
            inBody = true;
        }

        if(!inBody) {
            parseLayer(line);
        }

        if(inBody) {
            let split = line.trim().split(" ");
            instructions.push({
                move:split[1],
                from:split[3],
                to:split[5]
            });

        }
    });
    return {stacks:stacks,instructions:instructions};
}

function rearrange(stacks,instructions) {
    instructions.forEach(instruction => {
        for(let i=0;i<instruction.move;i++) {
            let item = stacks[instruction.from-1].pop();
            stacks[instruction.to-1].push(item);
        }
    });
    return stacks;
}

const parsed = parseIt();
const rearragedStacks = rearrange(parsed.stacks,parsed.instructions);
let topline = "";
rearragedStacks.forEach(stack => {
    topline += stack.pop();
});
debug(topline.replace(/\[/g,"").replace(/\]/g,""));