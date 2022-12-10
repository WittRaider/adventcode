import { getLines, debug, exit } from '../lib/lib.js'

class Head {
    constructor(x,y) {
        this.x = x;
        this.y = y;
    }

    up() {
        this.y--;
    }

    down() {
        this.y++;
    }

    left() {
        this.x--;
    }
    
    right() {
        this.x++;
    }

    getX() {
        return this.x;
    }

    getY() {
        return this.y;
    }
}

class Tail {
    constructor(x,y,head) {
        this.x = x;
        this.y = y;
        this.head = head;
        this.positions = {};
    }

    logPosition() {
        /*
        debug({
                head:{x:this.head.getX(),y:this.head.getY()},
                tail:{x:this.x,y:this.y},
              });
              */
        this.positions[String(this.x)+'/'+String(this.y)] = true;
    }

    getNumPositions() {
        return Object.keys(this.positions).length;
    }

    getRopeLength() {
        return 1;
    }

    follow() {
        if(this.x === this.head.getX()) {
            if(this.y < this.head.getY()-this.getRopeLength()) {
                this.y++;
                this.logPosition();
                return;
            }
            if(this.y > this.head.getY()+this.getRopeLength()) {
                this.y--;
                this.logPosition();
                return;
            }            
        }
        if(this.y === this.head.getY()) {
            if(this.x < this.head.getX()-this.getRopeLength()) {
                //debug("move right");
                this.x++;
                this.logPosition();
                return;
            }
            if(this.x > this.head.getX()+this.getRopeLength()) {
                //debug("move left");
                this.x--;
                this.logPosition();
                return;
            }            
        }     
        
        if(this.x < this.head.getX()-1) {
            this.x++;
            this.y = this.head.getY();
        } else if(this.x > this.head.getX()+this.getRopeLength()) {
            this.x--;
            this.y = this.head.getY();
        }       

        if(this.y < this.head.getY()-1) {
            this.y++;
            this.x = this.head.getX();
        } else if(this.y > this.head.getY()+this.getRopeLength()) {
            this.y--;
            this.x = this.head.getX();
        }  
        this.logPosition();
        return;
        
    }
}

let instructions = [];
getLines('./assets/2022.12.09.txt').forEach(line => {
 const i = line.trim().split(" ");
 instructions.push({direction:i[0],distance:parseInt(i[1])});
});

const head = new Head(0,0);
const tail = new Tail(0,0,head);

for(let l=0;l<instructions.length;l++) {
    let instruction = instructions[l];
    for(let i=0;i<instruction.distance;i++) {
        switch(instruction.direction) {
            case 'U':
                //console.log("up");
                head.up();
                tail.follow();
                break;
            case 'D':
                //console.log("down");
                head.down();
                tail.follow();
                break;
            case 'L':
                //console.log("left");
                head.left();
                tail.follow();
                break;
            case 'R':
                //console.log("right");
                head.right();
                tail.follow();
                break;
        }
    }
    //if(l>1) break;
}

debug(tail.getNumPositions());
