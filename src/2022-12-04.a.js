import { getLines, debug, exit } from '../lib/lib.js'

function isContained(narrow,wide) {
    return (narrow.low >= wide.low && narrow.high <= wide.high);
}

function getPairs() {
    let pairs = [];
    getLines('./assets/2022.12.04.txt').forEach(line => {
        line = line.trim();
        let split = line.split(",");
        let pair = {split:[{
            low:parseInt(split[0].split("-")[0]),
            high:parseInt(split[0].split("-")[1])
        },{
            low:parseInt(split[1].split("-")[0]),
            high:parseInt(split[1].split("-")[1])
        }]}
        pair.isContained = isContained(pair.split[0],pair.split[1]) || isContained(pair.split[1],pair.split[0]);
        pairs.push(pair);
    });
    return pairs;
}

let res = getPairs().reduce((total, pair) => {
    let add = (pair.isContained)?1:0;
    return total + add;
},0);

debug(res);