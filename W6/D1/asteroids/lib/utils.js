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
