import { Game } from "./game/game.js";
const canvas = document.getElementById("game-canvas");
const game = new Game(800, 380, canvas);
game.init();
