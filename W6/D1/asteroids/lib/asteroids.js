const GameView = require('./game_view.js');
const Game = require('./game.js');
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
