import { getLines, debug, exit } from '../lib/lib.js'


class File {
    constructor(name,size,parent) {
        this.parent = parent;
        this.name = name;
        this.size = size;
    }

    getSize() {
        return this.size;
    }

    getName() {
        return this.name;
    }
}

class Directory {

    constructor(name,parent) {
        this.name = name;
        this.parent = parent;
        this.dirs = [];
        this.files = [];
    }

    getSize() {
        let size = 0;
         this.dirs.forEach(dir => {
            size += dir.getSize();
        })
        this.files.forEach(file => {
            size += file.getSize();
        })            
        return size;
    }

    getParent() {
        return this.parent?this.parent:this;
    }

    getName() {
        return this.name;
    }

    gotoDir(dir) {
        for(let i=0;i<this.dirs.length;i++) {
            if(this.dirs[i].getName() === dir) return this.dirs[i];
        }
        throw new Error("unknown dir "+dir );
    }

    getDirs() {
        return this.dirs;
    }

    addDir(dir) {
        for(let i=0;i<this.dirs.length;i++) {
            if(this.dirs[i].getName() === dir) return;
        }
         this.dirs.push(new Directory(dir,this));
    }

    addFile(name,size) {
        for(let i=0;i<this.files.length;i++) {
            if(this.files[i].getName() === name) return;
        }        
        this.files.push(new File(name,size,this));
    }

}

let root = new Directory();
try {
    let current = root;
    let lastCmd = null;
    getLines('./assets/2022.12.07.txt').forEach(line => {
        let first = line.substring(0,1);
        if(first === '$') {
            let parts = line.split(" ");
            let cmd = parts[1].toLocaleLowerCase().trim();
            let arg = (parts[2])?parts[2].trim():null;
            switch(cmd) {
                case 'cd':
                    switch(arg) {
                        case '/':
                            current = root;
                            break;
                        case '.':
                            current = current;
                            break;
                        case '..':
                            current = current.getParent();
                            break;
                        default:
                            arg.split("/").forEach(part => {
                                current = current.gotoDir(part);
                            })
                    }
                    break;
                case 'ls':
                    break;
                default:
                    throw new Error("dont know command: "+cmd+" line: "+line);                   
            }
            lastCmd = cmd;
        } else {
            switch(lastCmd) {
                case 'ls':
                    let parts = line.trim().split(" ");
                    if(parts[0] === 'dir') {
                        current.addDir(parts[1]);
                    } else {
                        current.addFile(parts[1],parseInt(parts[0]));
                    }
                    break;
                default:
                    throw new Error("dont know what to do based on command: "+lastCmd+" line: "+line);            
            }
        }

    });   

}catch(e) {
    debug(e);
}

let dirs = [];
function findDirs(dir) {
    if(dir.getSize() <= 100000) dirs.push(dir);
    dir.getDirs().forEach(dir => {
        findDirs(dir);
    });
}
findDirs(root);

let size = 0;
dirs.forEach(dir => {
    size += dir.getSize();
})

debug(size);