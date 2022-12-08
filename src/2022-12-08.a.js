import { getLines, debug, exit } from '../lib/lib.js'

let grid = [];

class Tree {
    constructor(height,x,y) {
        this.height = height;
        this.x = x;
        this.y = y;
    }

    getHeight() {
        return this.height;
    }

    getOffset(x,y) {
        try {
            if(grid[this.y+y][this.x+x]) {
                return grid[this.y+y][this.x+x];
            }
        } catch(e) {
            return null;
        }
    }

    getTop() {
        return this.getOffset(0,-1);
    }

    getRight() {
        return this.getOffset(1,0);
    }    

    getBottom() {
        return this.getOffset(0,1);
    }    

    getLeft() {
        return this.getOffset(-1,0);
    }  
    
    getAllTop() {
        let trees = [];
        for(let y=(this.y-1);y>=0;y--) {
            if(grid[y][this.x]) trees.push(grid[y][this.x]);
        }
        return trees;
    }

    getAllBottom() {
        let trees = [];
        for(let y=(this.y+1);y<99;y++) {
            if(grid[y][this.x]) trees.push(grid[y][this.x]);
        }
        return trees;
    }

    getAllLeft() {
        let trees = [];
        for(let x=(this.x-1);x>=0;x--) {
            if(grid[this.y][x]) trees.push(grid[this.y][x]);
        }
        return trees;
    }

    getAllRight() {
        let trees = [];
        for(let x=(this.x+1);x<99;x++) {
            if(grid[this.y][x]) trees.push(grid[this.y][x]);
        }
        return trees;
    }

    isVisibleInRow(row) {
        for(let i=0;i<row.length;i++) {
            if(row[i].getHeight() >= this.getHeight()) return false;
        }
        return true;
    }

    isVisible() {
        if(!this.getTop() || !this.getLeft() || !this.getBottom() || !this.getRight()) return true;
        if(this.isVisibleInRow(this.getAllTop())) return true;
        if(this.isVisibleInRow(this.getAllBottom())) return true;
        if(this.isVisibleInRow(this.getAllLeft())) return true;
        if(this.isVisibleInRow(this.getAllRight())) return true;
        return false;
    }

}

let allTrees = [];
let y = 0;
let numTrees = 0;
getLines('./assets/2022.12.08.txt').forEach(line => {
    line = line.trim();
    let gridLine = [];
    for(let x=0;x<line.length;x++) {
        numTrees++;
        let tree = new Tree(parseInt(line[x]),x,y);
        gridLine.push(tree);
        allTrees.push(tree);
    }
    grid.push(gridLine);
    y++;    
});

let visibleTrees = 0;
allTrees.forEach(tree => {
    if(tree.isVisible()) visibleTrees++;
})
debug(visibleTrees);
