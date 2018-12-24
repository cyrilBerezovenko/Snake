import Cell from './cell'

let cvs = document.querySelector('#canvas');
let ctx = cvs.getContext('2d');

cvs.width = 510;
cvs.height = 510;

let emptyCellImage = new Image();
let snakeCellImage = new Image();
let appleCellImage = new Image();

emptyCellImage.src = './resources/emptyCell.png';
snakeCellImage.src = './resources/snakeCell.png';
appleCellImage.src = './resources/appleCell.png';

appleCellImage.onload = () => {
    start();
    update();
};

document.onkeydown = (event) => {
    if(event.key === 'ArrowLeft') turnLeft();
    else if(event.key === 'ArrowRight') turnRight();
    else if(event.key === 'ArrowUp') turnUp();
    else if(event.key === 'ArrowDown') turnDown();
};

let initXPos = 6;
let initYPos = 9;
let initLength = 4;
let speed = 100;

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
    let cellCount = cvs.width / emptyCellImage.width;
    cells = [];
    snakeCells = [];
    for(let i = 0; i < cellCount; i++) {
        let column = [];
        for(let j = 0; j < cellCount; j++) {
            column[j] = new Cell(i*emptyCellImage.width, j*emptyCellImage.height, cellType.empty, undefined);
        }
        cells[i] = column;
    }
    for(let j = 0; j < initLength; j++) {
        snakeCells[j] = {
            x: initXPos,
            y: j + initYPos
        };
        cells[initXPos][j + initYPos].type = cellType.snake;
        cells[initXPos][j + initYPos].dir = direction.up;
    }
    generateApple();
    setTimeout(move, speed);
}

function update() {
    for(let row of cells) {
        for(let cell of row) {
            ctx.drawImage(getImage(cell.type), cell.x, cell.y);
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
    let wasGrowth = false;
    if(needGrowth) {
        needGrowth = false;
        wasGrowth = true;
        grow();
    }
    let newSnakeCells = [];
    for(let i = 0; i < snakeCells.length; i++) {
        let x = snakeCells[i].x;
        let y = snakeCells[i].y;
        if(cells[x][y].growed === true) {
            
            cells[x][y].growed = false;
            cells[x][y].dir = cells[snakeCells[i-1].x][snakeCells[i-1].y].dir;
        }
        let c = cells[x][y];
        let isHead = i === 0;
        let isEnd = i === snakeCells.length - 1;
        cells[x][y].type = cellType.empty;
        x += c.dir === direction.right ? 1 : (c.dir === direction.left ? -1 : 0);
        y += c.dir === direction.down ? 1 : (c.dir === direction.up ? -1 : 0);
        if(!(0 <= x && x < cells.length && 0 <= y && y < cells.length)) {
            //
            die();
            return;
        }
        if(isHead) {
            if(cells[x][y].type === cellType.snake) {
                //
                die();
                return;
            } else if(cells[x][y].type === cellType.apple) {
                
                grow();
                if(!needGrowth) {
                    length++;
                    generateApple();
                }
            }
            cells[x][y].dir = c.dir;
        }
        else if(isEnd) {
            //
            cells[c.x/emptyCellImage.width][c.y/emptyCellImage.width].dir = undefined;
        }
        cells[x][y].type = cellType.snake;
        newSnakeCells[i] = {
            x: x,
            y: y
        };
    }
    if(wasGrowth)
        newSnakeCells.push(snakeCells[snakeCells.length-1]);
    snakeCells = newSnakeCells;
    setTimeout(move, speed);
}

function grow() {
    let lastCell = snakeCells[snakeCells.length-1];
    let x = lastCell.x;
    let y = lastCell.y;
    let c = cells[x][y];
    x += c.dir === direction.right ? -1 : (c.dir === direction.left ? 1 : 0);
    y += c.dir === direction.down ? -1 : (c.dir === direction.up ? 1 : 0);
    if(!(0 <= x && x < cells.length && 0 <= y && y < cells.length) || cells[x][y].type === cellType.snake) {
        //
        needGrowth = true;
        return;
    }
    cells[x][y].type = cellType.snake;
    cells[x][y].growed = true;
    snakeCells[snakeCells.length] = {
        x: x,
        y: y
    };
}

function die() {
    let dieMessage = document.querySelector('#die-message');
    dieMessage.style.display = 'block';
}

function turnLeft() {
    let snakeHead = cells[snakeCells[0].x][snakeCells[0].y];
    if(snakeHead.dir === direction.left || snakeHead.dir === direction.right)
        return;
    snakeHead.dir = direction.left;
}

function turnRight() {
    let snakeHead = cells[snakeCells[0].x][snakeCells[0].y];
    if(snakeHead.dir === direction.left || snakeHead.dir === direction.right)
        return;
    snakeHead.dir = direction.right;
}

function turnUp() {
    let snakeHead = cells[snakeCells[0].x][snakeCells[0].y];
    if(snakeHead.dir === direction.up || snakeHead.dir === direction.down)
        return;
    snakeHead.dir = direction.up;
}

function turnDown() {
    let snakeHead = cells[snakeCells[0].x][snakeCells[0].y];
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