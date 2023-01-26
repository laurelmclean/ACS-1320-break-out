import Game from './Game.js';

// reference canvas element in js
const canvas = document.getElementById('myCanvas');
// ctx variable to store the 2D rendering context
const ctx = canvas.getContext('2d');

// create new instance of game
const game = new Game(canvas, ctx);
