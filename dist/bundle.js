/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/js/index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/js/cell.js":
/*!************************!*\
  !*** ./src/js/cell.js ***!
  \************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Cell; });
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Cell = function Cell(x, y, type, dir) {
  _classCallCheck(this, Cell);

  this.x = x;
  this.y = y;
  this.type = type;
  this.dir = dir;
};



/***/ }),

/***/ "./src/js/index.js":
/*!*************************!*\
  !*** ./src/js/index.js ***!
  \*************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _cell__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./cell */ "./src/js/cell.js");

var cvs = document.querySelector('#canvas');
var ctx = cvs.getContext('2d');
cvs.width = 510;
cvs.height = 510;
var emptyCellImage = new Image();
var snakeCellImage = new Image();
var appleCellImage = new Image();
emptyCellImage.src = './resources/emptyCell.png';
snakeCellImage.src = './resources/snakeCell.png';
appleCellImage.src = './resources/appleCell.png';

appleCellImage.onload = function () {
  start();
  update();
};

document.onkeydown = function (event) {
  if (event.key === 'ArrowLeft') turnLeft();else if (event.key === 'ArrowRight') turnRight();else if (event.key === 'ArrowUp') turnUp();else if (event.key === 'ArrowDown') turnDown();
};

var initXPos = 6;
var initYPos = 9;
var initLength = 8;
var speed = 100;
var cells;
var snakeCells;
var lengthEl = document.querySelector('#length');
var length = initLength;
var needGrowth = false;
var cellType = {
  empty: 0,
  snake: 1,
  apple: 2
};
var direction = {
  up: 0,
  right: 1,
  down: 3,
  left: 4
};

function start() {
  var cellCount = cvs.width / emptyCellImage.width;
  cells = [];
  snakeCells = [];

  for (var i = 0; i < cellCount; i++) {
    var column = [];

    for (var j = 0; j < cellCount; j++) {
      column[j] = new _cell__WEBPACK_IMPORTED_MODULE_0__["default"](i * emptyCellImage.width, j * emptyCellImage.height, cellType.empty, undefined);
    }

    cells[i] = column;
  }

  for (var _j = 0; _j < initLength; _j++) {
    snakeCells[_j] = {
      x: initXPos,
      y: _j + initYPos
    };
    cells[initXPos][_j + initYPos].type = cellType.snake;
    cells[initXPos][_j + initYPos].dir = direction.up;
  }

  generateApple();
  setTimeout(move, speed);
}

function update() {
  var _iteratorNormalCompletion = true;
  var _didIteratorError = false;
  var _iteratorError = undefined;

  try {
    for (var _iterator = cells[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
      var row = _step.value;
      var _iteratorNormalCompletion2 = true;
      var _didIteratorError2 = false;
      var _iteratorError2 = undefined;

      try {
        for (var _iterator2 = row[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
          var cell = _step2.value;
          ctx.drawImage(getImage(cell.type), cell.x, cell.y);
        }
      } catch (err) {
        _didIteratorError2 = true;
        _iteratorError2 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion2 && _iterator2.return != null) {
            _iterator2.return();
          }
        } finally {
          if (_didIteratorError2) {
            throw _iteratorError2;
          }
        }
      }
    }
  } catch (err) {
    _didIteratorError = true;
    _iteratorError = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion && _iterator.return != null) {
        _iterator.return();
      }
    } finally {
      if (_didIteratorError) {
        throw _iteratorError;
      }
    }
  }

  lengthEl.innerText = length;
  requestAnimationFrame(update);
}

function generateApple() {
  var rand = function rand() {
    return Math.floor(Math.random() * cells.length);
  };

  var x = rand();
  var y = rand();

  while (cells[x][y].type === cellType.snake) {
    x = rand();
    y = rand();
  }

  cells[x][y].type = cellType.apple;
}

function move() {
  //debugger;
  var wasGrowth = false;

  if (needGrowth) {
    needGrowth = false;
    wasGrowth = true;
    grow();
  }

  var newSnakeCells = [];

  for (var i = 0; i < snakeCells.length; i++) {
    var x = snakeCells[i].x;
    var y = snakeCells[i].y;

    if (cells[x][y].growed === true) {
      debugger;
      cells[x][y].growed = false;
      cells[x][y].dir = cells[snakeCells[i - 1].x][snakeCells[i - 1].y].dir;
    }

    var c = cells[x][y];
    var isHead = i === 0;
    var isEnd = i === snakeCells.length - 1;
    cells[x][y].type = cellType.empty;
    x += c.dir === direction.right ? 1 : c.dir === direction.left ? -1 : 0;
    y += c.dir === direction.down ? 1 : c.dir === direction.up ? -1 : 0;

    if (!(0 <= x && x < cells.length && 0 <= y && y < cells.length)) {
      //debugger;
      die();
      return;
    }

    if (isHead) {
      if (cells[x][y].type === cellType.snake) {
        //debugger;
        die();
        return;
      } else if (cells[x][y].type === cellType.apple) {
        debugger;
        grow();

        if (!needGrowth) {
          length++;
          generateApple();
        }
      }

      cells[x][y].dir = c.dir;
    } else if (isEnd) {
      //debugger;
      cells[c.x / emptyCellImage.width][c.y / emptyCellImage.width].dir = undefined;
    }

    cells[x][y].type = cellType.snake;
    newSnakeCells[i] = {
      x: x,
      y: y
    };
  }

  if (wasGrowth) newSnakeCells.push(snakeCells[snakeCells.length - 1]);
  snakeCells = newSnakeCells;
  setTimeout(move, speed);
}

function grow() {
  var lastCell = snakeCells[snakeCells.length - 1];
  var x = lastCell.x;
  var y = lastCell.y;
  var c = cells[x][y];
  x += c.dir === direction.right ? -1 : c.dir === direction.left ? 1 : 0;
  y += c.dir === direction.down ? -1 : c.dir === direction.up ? 1 : 0;

  if (!(0 <= x && x < cells.length && 0 <= y && y < cells.length) || cells[x][y].type === cellType.snake) {
    //debugger;
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
  var dieMessage = document.querySelector('#die-message');
  dieMessage.style.display = 'block';
}

function turnLeft() {
  var snakeHead = cells[snakeCells[0].x][snakeCells[0].y];
  if (snakeHead.dir === direction.left || snakeHead.dir === direction.right) return;
  snakeHead.dir = direction.left;
}

function turnRight() {
  var snakeHead = cells[snakeCells[0].x][snakeCells[0].y];
  if (snakeHead.dir === direction.left || snakeHead.dir === direction.right) return;
  snakeHead.dir = direction.right;
}

function turnUp() {
  var snakeHead = cells[snakeCells[0].x][snakeCells[0].y];
  if (snakeHead.dir === direction.up || snakeHead.dir === direction.down) return;
  snakeHead.dir = direction.up;
}

function turnDown() {
  var snakeHead = cells[snakeCells[0].x][snakeCells[0].y];
  if (snakeHead.dir === direction.up || snakeHead.dir === direction.down) return;
  snakeHead.dir = direction.down;
}

function getImage(type) {
  switch (type) {
    case cellType.empty:
      return emptyCellImage;

    case cellType.snake:
      return snakeCellImage;

    case cellType.apple:
      return appleCellImage;
  }
}

/***/ })

/******/ });
//# sourceMappingURL=bundle.js.map