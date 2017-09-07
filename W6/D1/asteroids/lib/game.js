// Holds collections of the asteroids, bullets, and your ship.
// Game.prototype.step method calls Game.prototype.move on all the objects,
// and Game.prototype.checkCollisions checks for colliding objects.
//
// Game.prototype.draw(ctx) draws the game.
// Keeps track of dimensions of the space; wraps objects around when th
//ey drift off the screen.

const Asteroid = require('./asteroid.js');
const Ship = require('./ship.js');

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
