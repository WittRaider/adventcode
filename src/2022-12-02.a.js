import { getLines, debug, exit } from '../lib/lib.js'

function getPairs() {
    let round = [];

    getLines('./assets/2022.12.02.txt').forEach(line => {
        line = line.trim(); 
        round.push([line.substring(0,1),line.substring(2,3)]); 
    });
    return round;
}

const values = {
    'A':{'type':'Rock','score':1},
    'B':{'type':'Paper','score':2},
    'C':{'type':'Sissors','score':3},
    'X':{'type':'Rock','score':1},
    'Y':{'type':'Paper','score':2},
    'Z':{'type':'Sissors','score':3}
}

const scores = {
    loss : 0,
    tie  : 3,
    win  : 6,
}

let score = {
    playerA : 0,
    playerB : 0
}

let res = getPairs();
res.forEach(pair => {
    const playerA = values[pair[0]];
    const playerB = values[pair[1]];
    switch(playerA.type) {
        case 'Rock':
            switch(playerB.type) {
                case 'Rock':
                    score.playerA += playerA.score + scores.tie;
                    score.playerB += playerB.score + scores.tie;
                    break;
                case 'Paper':
                    score.playerA += playerA.score + scores.loss;
                    score.playerB += playerB.score + scores.win;
                    break;
                case 'Sissors':
                    score.playerA += playerA.score + scores.win;
                    score.playerB += playerB.score + scores.loss;
                    break;
            }
            break;
        case 'Paper':
            switch(playerB.type) {
                case 'Rock':
                    score.playerA += playerA.score + scores.win;
                    score.playerB += playerB.score + scores.loss;
                    break;
                case 'Paper':
                    score.playerA += playerA.score + scores.tie;
                    score.playerB += playerB.score + scores.tie;
                    break;
                case 'Sissors':
                    score.playerA += playerA.score + scores.loss;
                    score.playerB += playerB.score + scores.win;
                    break;
            }
            break;
        case 'Sissors':
            switch(playerB.type) {
                case 'Rock':
                    score.playerA += playerA.score + scores.loss;
                    score.playerB += playerB.score + scores.win;
                    break;
                case 'Paper':
                    score.playerA += playerA.score + scores.win;
                    score.playerB += playerB.score + scores.loss;
                    break;
                case 'Sissors':
                    score.playerA += playerA.score + scores.tie;
                    score.playerB += playerB.score + scores.tie;
                    break;
            }
            break;
    }
});

debug(score.playerB);