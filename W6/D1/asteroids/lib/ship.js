// This is you! Another MovingObject subclass.
const Util = require('./utils.js');
const MovingObject = require('./moving_object.js');


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
