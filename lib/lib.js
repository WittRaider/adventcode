import fs from 'fs';

export function getLines(path) {
    return fs.readFileSync('./assets/2022-12-01.txt','utf-8').split("\n");
}

export function debug(data) {
    console.log(data);
    console.log("\n");
}

export function exit() {
    process.exit();
}