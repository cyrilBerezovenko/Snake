import Cell from './cell'

let cvs = document.querySelector('#canvas');
let ctx = cvs.getContext('2d');

let emptyCellImage = new Image();
let snakeCellImage = new Image();
let appleCellImage = new Image();

emptyCellImage.src = './resources/emptyCell.png';
snakeCellImage.src = './resources/snakeCell.png';
appleCellImage.src = './resources/appleCell.png';

emptyCellImage.style.border = '600px black solid';
console.log(emptyCellImage);

appleCellImage.onload = () => {
    start();
    update();
};

let turning = false;

document.onkeydown = (event) => {
    if(turning) {
        setTimeout(() => document.onkeydown(event), 20);
        return;
    }
    turning = true;
    if(event.key === 'ArrowLeft') turnLeft();
    else if(event.key === 'ArrowRight') turnRight();
    else if(event.key === 'ArrowUp') turnUp();
    else if(event.key === 'ArrowDown') turnDown();
};

let initXPos = 6;
let initYPos = 9;
let initLength = 4;
let speed = 69;
let cellCount = 28;

cvs.width = emptyCellImage.width * cellCount;
cvs.height = emptyCellImage.height * cellCount;

let cells;
let snakeCells;
let lengthEl = document.querySelector('#length');
let length = initLength;
let needGrowth = false;

let cellType = {
    empty: 0,
    snake: 1,
    apple: 2
};

let direction = {
    up: 0,
    right: 1,
    down: 2,
    left: 3
};

function start() {
    cells = [];
    snakeCells = [];
    for(let i = 0; i < cellCount; i++) {
        let column = [];
        for(let j = 0; j < cellCount; j++) {
            column[j] = new Cell(i, j, cellType.empty, undefined);
        }
        cells[i] = column;
    }
    for(let j = 0; j < initLength; j++) {
        snakeCells[j] = cells[initXPos][j + initYPos];
        cells[initXPos][j + initYPos].type = cellType.snake;
        cells[initXPos][j + initYPos].dir = direction.up;
    }
    generateApple();
    setTimeout(move, speed);
}

function update() {
    for(let row of cells) {
        for(let cell of row) {
            ctx.drawImage(getImage(cell.type), cell.x * emptyCellImage.width, cell.y * emptyCellImage.height);
        }
    }
    lengthEl.innerText = length;
    requestAnimationFrame(update);
}

function generateApple() {
    let rand = () => Math.floor(Math.random() * cells.length);
    let x = rand();
    let y = rand();
    while(cells[x][y].type === cellType.snake) {
        x = rand();
        y = rand();
    }
    cells[x][y].type = cellType.apple;
}

function move() {
    turning = false;
    if(needGrowth) {
        debugger;
        needGrowth = false;
        grow();
    }
    let newSnakeCells = [];
    for(let i = 0; i < snakeCells.length; i++) {
        if(snakeCells[i].growed === true) {
            snakeCells[i].growed = false;
            snakeCells[i].dir = snakeCells[i-1].dir;
        }
        let isHead = i === 0;
        snakeCells[i].type = cellType.empty;
        let x = snakeCells[i].x;
        let y = snakeCells[i].y;
        x += snakeCells[i].dir === direction.right ? 1 : (snakeCells[i].dir === direction.left ? -1 : 0);
        y += snakeCells[i].dir === direction.down ? 1 : (snakeCells[i].dir === direction.up ? -1 : 0);
        if(isHead) {
            if(cells[x] === undefined || cells[x][y] === undefined || cells[x][y].type === cellType.snake) {
                die();
                return;
            } else if(cells[x][y].type === cellType.apple) {
                grow();
                if(!needGrowth) {
                    length++;
                }
                generateApple();
            }
            cells[x][y].dir = snakeCells[i].dir;
        }
        cells[x][y].type = cellType.snake;
        newSnakeCells[i] = cells[x][y];
    }
    snakeCells = newSnakeCells;
    setTimeout(move, speed);
}

function grow() {
    let lastCell = snakeCells[snakeCells.length-1];
    let x = lastCell.x;
    let y = lastCell.y;
    x += lastCell.dir === direction.right ? -1 : (lastCell.dir === direction.left ? 1 : 0);
    y += lastCell.dir === direction.down ? -1 : (lastCell.dir === direction.up ? 1 : 0);
    if(!(0 <= x && x < cells.length && 0 <= y && y < cells.length) || cells[x][y].type === cellType.snake) {
        needGrowth = true;
        return;
    }
    cells[x][y].type = cellType.snake;
    cells[x][y].growed = true;
    snakeCells[snakeCells.length] = cells[x][y];
}

function die() {
    let dieMessage = document.querySelector('#die-message');
    dieMessage.style.display = 'block';
}

function turnLeft() {
    let snakeHead = snakeCells[0];
    if(snakeHead.dir === direction.left || snakeHead.dir === direction.right)
        return;
    snakeHead.dir = direction.left;
}

function turnRight() {
    let snakeHead = snakeCells[0];
    if(snakeHead.dir === direction.left || snakeHead.dir === direction.right)
        return;
    snakeHead.dir = direction.right;
}

function turnUp() {
    let snakeHead = snakeCells[0];
    if(snakeHead.dir === direction.up || snakeHead.dir === direction.down)
        return;
    snakeHead.dir = direction.up;
}

function turnDown() {
    let snakeHead = snakeCells[0];
    if(snakeHead.dir === direction.up || snakeHead.dir === direction.down)
        return;
    snakeHead.dir = direction.down;
}

function getImage(type) {
    switch(type) {
        case cellType.empty:
            return emptyCellImage;
        case cellType.snake:
            return snakeCellImage;
        case cellType.apple:
            return appleCellImage;
    }
}