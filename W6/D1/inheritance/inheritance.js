Function.prototype.inherits = function (Parent) {
  function Surrogate(){}
  Surrogate.prototype = Parent.prototype;
  this.prototype = new Surrogate();
  this.prototype.constructor = this;



};

function MovingObject () {}
MovingObject.prototype.move = function () {
  console.log("I AM MOVING BIATCH");
};


function Ship () {}
Ship.inherits(MovingObject);
let s = new Ship();
s.move();

function Asteroid () {}
Asteroid.inherits(MovingObject);
let a = new Asteroid();
a.move();
