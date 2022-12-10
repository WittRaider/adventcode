import { getLines, debug, exit } from '../lib/lib.js'

class Head {
    constructor(x,y) {
        this.x = x;
        this.y = y;
        this.next = null;
    }

    getAllParts() {
        let pos = [];
        pos.push(this);
        this.next.getAllParts(pos);
        return pos;        
    }

    getAllPositions() {
        let pos = [];
        pos.push({x:this.getX(),y:this.getY()});
        this.next.getAllPositions(pos);
        return pos;
    }

    add(x,y) {
        this.next = new Knot(x,y,this);   
        return this.next;     
    }

    up() {
        this.y--;
        if(this.next) this.next.follow();
    }

    down() {
        this.y++;
        if(this.next) this.next.follow();
    }

    left() {
        this.x--;
        if(this.next) this.next.follow();
    }
    
    right() {
        this.x++;
        if(this.next) this.next.follow();
    }

    getX() {
        return this.x;
    }

    getY() {
        return this.y;
    }

    getTail() {
        return this.next.getTail()
    }
}


class Knot {
    constructor(x,y,prev) {
        this.x = x;
        this.y = y;
        this.prev = prev;
        this.next = null;
        this.positions = {};
    }

    getAllParts(pos) {
        pos.push(this);
        if(this.next) this.next.getAllPositions(pos);
    }

    getAllPositions(pos) {
        pos.push({x:this.getX(),y:this.getY()});
        if(this.next) this.next.getAllPositions(pos);
    }

    getTail() {
        return (this.next)?this.next.getTail():this;
    }

    add(x,y) {
        this.next = new Knot(x,y,this);   
        return this.next;     
    }

    getX() {
        return this.x;
    }

    getY() {
        return this.y;
    }

    logPosition() {
        /*
        debug({
                prev:{x:this.prev.getX(),y:this.prev.getY()},
                knot:{x:this.x,y:this.y},
              });
              */
        this.positions[String(this.x)+'/'+String(this.y)] = true;
        if(this.next) this.next.follow();
    }

    getNumPositions() {
        return Object.keys(this.positions).length;
    }

    getLength() {
        return 1;
    }

    follow() {
        if(this.x === this.prev.getX()) {
            if(this.y < this.prev.getY()-this.getLength()) {
                this.y++;
                this.logPosition();
                return;
            }
            if(this.y > this.prev.getY()+this.getLength()) {
                this.y--;
                this.logPosition();
                return;
            }            
        }
        if(this.y === this.prev.getY()) {
            if(this.x < this.prev.getX()-this.getLength()) {
                //debug("move right");
                this.x++;
                this.logPosition();
                return;
            }
            if(this.x > this.prev.getX()+this.getLength()) {
                //debug("move left");
                this.x--;
                this.logPosition();
                return;
            }            
        }     
        
        if(this.x < this.prev.getX()-1) {
            this.x++;
            this.y = this.prev.getY();
        } else if(this.x > this.prev.getX()+this.getLength()) {
            this.x--;
            this.y = this.prev.getY();
        }       

        if(this.y < this.prev.getY()-1) {
            this.y++;
            this.x = this.prev.getX();
        } else if(this.y > this.prev.getY()+this.getLength()) {
            this.y--;
            this.x = this.prev.getX();
        }  
        this.logPosition();
        return;
        
    }
}

let instructions = [];
getLines('./assets/2022.12.09 b.txt').forEach(line => {
 const i = line.trim().split(" ");
 instructions.push({direction:i[0],distance:parseInt(i[1])});
});

const head = new Head(0,0);
             head.add(0,0)
             .add(0,0)
             .add(0,0)
             .add(0,0)
             .add(0,0)
             .add(0,0)
             .add(0,0)
             .add(0,0)
             .add(0,0);

for(let l=0;l<instructions.length;l++) {
    let instruction = instructions[l];
    for(let i=0;i<instruction.distance;i++) {
        switch(instruction.direction) {
            case 'U':
                //console.log("up");
                head.up();
                break;
            case 'D':
                //console.log("down");
                head.down();
                break;
            case 'L':
                //console.log("left");
                head.left();
                break;
            case 'R':
                //console.log("right");
                head.right();
                break;
        }
    }
}

function showField(head) {
    const positions = head.getAllPositions();
    //debug(positions);exit();
    debug("...");
    let lines = "";
    let minX = 99999999999;
    let minY = 99999999999;
    let maxX = -99999999999;
    let maxY = -99999999999;
    head.getAllPositions().forEach(pos => {
        if(pos.x > maxX) maxX = pos.x;
        if(pos.y > maxY) maxY = pos.y;
        if(pos.x < minX) minX = pos.x;
        if(pos.y < minY) minY = pos.y;   
        for(let y=minY;y<=maxY;y++) {
            for(let x=minX;x<=maxX;x++) {
                let char = ".";
                /*
                positions.forEach(part => {
                    if(part.x === x && part.y === y) {
                        char = 'X';
                    }
                });
                */
                lines += char;
            }
            //lines += "\n";
        }     
    });
    //debug([minX,maxX]);
    debug(lines);
}

showField(head);

//debug({instruction:instructions.pop(),rope:head.getAllPositions()});

debug(head.getTail().getNumPositions());