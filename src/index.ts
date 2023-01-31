import Game from './Game';

// reference canvas element in js
const canvas = document.getElementById('myCanvas') as HTMLCanvasElement;
// ctx variable to store the 2D rendering context
const ctx: CanvasRenderingContext2D = canvas.getContext('2d');

// create new instance of game
const game = new Game(canvas, ctx);
