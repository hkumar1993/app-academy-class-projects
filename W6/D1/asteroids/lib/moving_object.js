// Base class for anything that moves.
// Most important methods are MovingObject.prototype.move, MovingObject.prototype.draw(ctx),
// MovingObject.prototype.isCollidedWith(otherMovingObject).
const Util = require('./utils.js');
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
