// Spacerock. It inherits from MovingObject.
const MovingObject = require('./moving_object.js');
const Util = require('./utils.js');
const Ship = require('./ship.js');

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
