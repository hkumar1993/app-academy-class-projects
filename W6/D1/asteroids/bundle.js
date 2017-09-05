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
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
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
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

const GameView = __webpack_require__(1);
const Game = __webpack_require__(2);
document.addEventListener("DOMContentLoaded", function(){
  const canvasEl = document.getElementById("canvas");
  canvasEl.width = 800;
  canvasEl.height = 800;

  const ctx = canvasEl.getContext("2d");
  ctx.fillStyle = "black";
  ctx.fillRect(0, 0, 800, 800);

  const game = new GameView(ctx);
  game.start();

  //
  // let g = new Game();
  // g.draw(ctx);

  // ctx.beginPath();
  // ctx.arc(100, 100, 20, 0, 2*Math.PI, true);
  // ctx.strokeStyle = "green";
  // ctx.lineWidth = 5;
  // ctx.stroke();
  // ctx.fillStyle = "blue";
  // ctx.fill();
});


/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

// Stores a Game instance.
// Stores a canvas context to draw the game into.
// Installs key listeners to move the ship and fire bullets.
// Installs a timer to call Game.prototype.step.
const Game = __webpack_require__(2);


const GameView = function GameView (ctx) {
  this.game = new Game();
  this.game.allObjects();
  this.ctx = ctx;
};

GameView.prototype.start = function () {
  setInterval(function () {
    this.game.step();
    this.game.draw(this.ctx);
  }.bind(this), 20);
  // this.game.step();
  // this.game.draw(this.ctx);
};

GameView.prototype.bindKeyHandlers = function () {
  key('w', )
};

module.exports = GameView;


/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

// Holds collections of the asteroids, bullets, and your ship.
// Game.prototype.step method calls Game.prototype.move on all the objects,
// and Game.prototype.checkCollisions checks for colliding objects.
//
// Game.prototype.draw(ctx) draws the game.
// Keeps track of dimensions of the space; wraps objects around when th
//ey drift off the screen.

const Asteroid = __webpack_require__(3);
const Ship = __webpack_require__(6);

const Game = function Game(){
  this.DIM_X = 800;
  this.DIM_Y = 800;
  this.NUM_ASTEROIDS = 20;
  this.asteroids = [];
  this.ship = new Ship({
    pos: this.randomPosition(),
    game: this
  });
  for (var i = 0; i < this.NUM_ASTEROIDS; i++) {
    this.asteroids.push(this.addAsteroids());
  }
};

Game.prototype.addAsteroids = function () {
  let game = this;
  const options = {
    pos: this.randomPosition(),
    game: this
  };
  return new Asteroid(options);
};

Game.prototype.allObjects = function () {
  // console.log(this.asteroids.concat([this.ship]));
  return this.asteroids.concat([this.ship]);
};

Game.prototype.moveObjects = function () {
  this.allObjects().forEach(function(spaceThing){
    spaceThing.move();
  });
};


Game.prototype.randomPosition = function () {
  let x = Math.floor(Math.random() * this.DIM_X);
  let y = Math.floor(Math.random() * this.DIM_Y);
  return [x,y];
};

Game.prototype.checkCollisions = function () {
  let spaceObjects = this.allObjects();
  // console.log(spaceObjects);
  for (let i = 0; i < spaceObjects.length - 1; i++) {
    for (let j = i + 1; j < spaceObjects.length; j++) {
      if (spaceObjects[i].isCollidedWith(spaceObjects[j])) {
        // console.log('just collided');
        if(spaceObjects[i] instanceof Asteroid && spaceObjects[j] instanceof Ship){
          console.log('this bitch should move');
        }
        spaceObjects[i].collideWith(spaceObjects[j]);
      }
    }
  }
};

Game.prototype.removeAsteroid = function (asteroid) {
  this.asteroids.splice(this.asteroids.indexOf(asteroid), 1);
};

Game.prototype.draw = function (ctx) {
  ctx.clearRect(0, 0, this.DIM_X, this.DIM_Y);
  ctx.fillStyle = "black";
  ctx.fillRect(0, 0, this.DIM_X, this.DIM_Y);
  // console.log(this.allObjects());
  this.allObjects().forEach(function(spaceThing){
    // console.log('spaceThing: ', spaceThing);
    spaceThing.draw(ctx);
  });
};

Game.prototype.step = function (){
  this.moveObjects();
  this.checkCollisions();
};

Game.prototype.wrap = function (pos) {
  // console.log('inside wrap: ',this);
  if(pos[0] > 800){
    pos[0] = 0;
  } else if (pos[0] < 0) {
    pos[0] = 800;
  }

  if(pos[1] > 800){
    pos[1] = 0;
  } else if (pos[1] < 0) {
    pos[1] = 800;
  }
  return pos;
};

module.exports = Game;


/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

// Spacerock. It inherits from MovingObject.
const MovingObject = __webpack_require__(4);
const Util = __webpack_require__(5);
const Ship = __webpack_require__(6);

const DEFAULTS = {
  COLOR : 'purple',
  RADIUS : 20,
  SPEED : 4
};

// Return a randomly oriented vector with the given length.

const Asteroid = function Asteroid(obj){

  let finalObj = {
    pos: obj.pos,
    vel: Util.randomVec(DEFAULTS.SPEED),
    rad: DEFAULTS.RADIUS,
    color: DEFAULTS.COLOR,
    game: obj.game
  };

  MovingObject.call(this, finalObj);
};

Util.inherits(Asteroid, MovingObject);

Asteroid.prototype.collideWith = function (otherMovingObject) {
  console.log('inside asteroid collision');
  if(otherMovingObject instanceof Ship){
    console.log('Collided with Ship');
    otherMovingObject.relocate();
  }
};


module.exports = Asteroid;


/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

// Base class for anything that moves.
// Most important methods are MovingObject.prototype.move, MovingObject.prototype.draw(ctx),
// MovingObject.prototype.isCollidedWith(otherMovingObject).
const Util = __webpack_require__(5);
const MovingObject = function MovingObject(obj) {
  // console.log('game object',obj);
  this.pos = obj.pos;
  this.vel = obj.vel;
  this.rad = obj.rad;
  this.color = obj.color;
  this.game = obj.game;
};

MovingObject.prototype.draw = function (ctx) {
  // console.log('drawing this: ',this);
  let posX = this.pos[0];
  let posY = this.pos[1];
  // console.log(this.pos[0]);
  ctx.beginPath();
  ctx.fillStyle = this.color;
  ctx.arc(posX, posY, this.rad, 0, 2 * Math.PI, true);
  ctx.fill();
  // console.log('drawing the ass');
};

MovingObject.prototype.move = function () {
  this.pos = [this.pos[0] + this.vel[0], this.pos[1] + this.vel[1]];
  this.pos = this.game.wrap(this.pos);
};

MovingObject.prototype.isCollidedWith = function (otherMovingObject) {
  if (this.rad * 1.5 > Util.dist(this.pos, otherMovingObject.pos)) {
    // console.log('collision occured');
    return true;
  }
  return false;
};

MovingObject.prototype.collideWith = function (otherMovingObject) {
  // console.log('inside generic collision');
    // this.game.removeAsteroid(otherMovingObject);
    // this.game.removeAsteroid(this);
};

module.exports = MovingObject;


/***/ }),
/* 5 */
/***/ (function(module, exports) {

// Utility code, especially vector math stuff.
const Util = {
  inherits (childClass, parentClass){
    function Surrogate(){}
    Surrogate.prototype = parentClass.prototype;
    childClass.prototype = new Surrogate();
    childClass.prototype.constructor = childClass;
  },
  // Scale the length of a vector by the given amount.
  scale (vec, m) {
    return [vec[0] * m, vec[1] * m];
  },
  randomVec (length) {
    const deg = 2 * Math.PI * Math.random();
    return Util.scale([Math.sin(deg), Math.cos(deg)], length);
  },
  dist (pos1, pos2){
    let distX = Math.abs(pos1[0] - pos2[0]);
    let distY = Math.abs(pos1[1] - pos2[1]);
    return Math.sqrt(Math.pow(distX, 2) + Math.pow(distY, 2));
  }
};

module.exports = Util;


/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

// This is you! Another MovingObject subclass.
const Util = __webpack_require__(5);
const MovingObject = __webpack_require__(4);


const DEFAULTS = {
  RADIUS : 10,
  COLOR : '#ff388a'
};

const Ship = function Ship (obj) {
  let finalObj = {
    pos: obj.pos,
    vel: [0,0],
    rad: DEFAULTS.RADIUS,
    color: DEFAULTS.COLOR,
    game: obj.game
  };

  MovingObject.call(this, finalObj);
};

Util.inherits(Ship, MovingObject);

Ship.prototype.relocate = function () {
  this.pos = this.game.randomPosition();
  this.vel = [0,0];
};

Ship.prototype.power = function (impulse) {
  this.vel = [this.vel[0]+impulse[0], this.vel[1]+impulse[1]]
};

module.exports = Ship;


/***/ })
/******/ ]);