// Stores a Game instance.
// Stores a canvas context to draw the game into.
// Installs key listeners to move the ship and fire bullets.
// Installs a timer to call Game.prototype.step.
const Game = require('./game.js');


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
