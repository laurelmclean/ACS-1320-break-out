(()=>{"use strict";var t=function(){function t(t,i,s,o,r){void 0===t&&(t=0),void 0===i&&(i=0),void 0===s&&(s=100),void 0===o&&(o=100),void 0===r&&(r="#f00"),this.x=t,this.y=i,this.width=s,this.height=o,this.color=r}return t.prototype.moveTo=function(t,i){this.x=t,this.y=i},t.prototype.moveBy=function(t,i){this.x+=t,this.y+=i},t.prototype.render=function(t){t.beginPath(),t.rect(this.x,this.y,this.width,this.height),t.fillStyle=this.color,t.fill(),t.closePath()},t}();const i=t;var s,o=(s=function(t,i){return s=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,i){t.__proto__=i}||function(t,i){for(var s in i)Object.prototype.hasOwnProperty.call(i,s)&&(t[s]=i[s])},s(t,i)},function(t,i){if("function"!=typeof i&&null!==i)throw new TypeError("Class extends value "+String(i)+" is not a constructor or null");function o(){this.constructor=t}s(t,i),t.prototype=null===i?Object.create(i):(o.prototype=i.prototype,new o)}),r=function(t){function i(i,s,o,r){void 0===s&&(s=0),void 0===o&&(o=0),void 0===r&&(r=10);var e=t.call(this,s,o,0,0,i)||this;return e.color=i,e.radius=r,e.dx=2,e.dy=-2,e}return o(i,t),i.prototype.moveTo=function(){this.x+=this.dx,this.y+=this.dy},i.prototype.randColor=function(){this.color="#".concat((Math.floor(16777216*Math.random())+16777216).toString(16).substring(1))},i.prototype.render=function(t){t.beginPath(),t.arc(this.x,this.y,this.radius,0,2*Math.PI),t.fillStyle=this.color,t.fill(),t.closePath()},i}(i);const e=r;var n=function(){var t=function(i,s){return t=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,i){t.__proto__=i}||function(t,i){for(var s in i)Object.prototype.hasOwnProperty.call(i,s)&&(t[s]=i[s])},t(i,s)};return function(i,s){if("function"!=typeof s&&null!==s)throw new TypeError("Class extends value "+String(s)+" is not a constructor or null");function o(){this.constructor=i}t(i,s),i.prototype=null===s?Object.create(s):(o.prototype=s.prototype,new o)}}();const h=function(t){function i(i,s,o,r,e){return void 0===i&&(i=0),void 0===s&&(s=0),void 0===o&&(o=75),void 0===r&&(r=10),void 0===e&&(e="#51a094"),t.call(this,i,s,o,r,e)||this}return n(i,t),i.prototype.moveTo=function(t){this.x+=t},i.prototype.moveBy=function(t){this.x=t},i}(i);var l=function(){function t(t,i,s,o,r){this.x=t,this.y=i,this.color=s,this.value=o,this.font="16px Arial",this.displayText=r}return t.prototype.render=function(t){t.font=this.font,t.fillStyle=this.color,t.fillText("".concat(this.displayText).concat(this.value),this.x,this.y)},t}();const a=l;var c=function(){var t=function(i,s){return t=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,i){t.__proto__=i}||function(t,i){for(var s in i)Object.prototype.hasOwnProperty.call(i,s)&&(t[s]=i[s])},t(i,s)};return function(i,s){if("function"!=typeof s&&null!==s)throw new TypeError("Class extends value "+String(s)+" is not a constructor or null");function o(){this.constructor=i}t(i,s),i.prototype=null===s?Object.create(s):(o.prototype=s.prototype,new o)}}();const d=function(t){function i(i,s,o,r,e){return void 0===e&&(e="#a8d3cc"),t.call(this,i,s,o,r,e)||this}return c(i,t),i}(i);var u=function(){var t=function(i,s){return t=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,i){t.__proto__=i}||function(t,i){for(var s in i)Object.prototype.hasOwnProperty.call(i,s)&&(t[s]=i[s])},t(i,s)};return function(i,s){if("function"!=typeof s&&null!==s)throw new TypeError("Class extends value "+String(s)+" is not a constructor or null");function o(){this.constructor=i}t(i,s),i.prototype=null===s?Object.create(s):(o.prototype=s.prototype,new o)}}();const p=function(t){function i(i,s,o,r,e){void 0===r&&(r=75),void 0===e&&(e=20);var n=t.call(this,i,s,r,e,o)||this;return n.status=1,n}return u(i,t),i}(i);var f=function(){function t(t,i){void 0===t&&(t=3),void 0===i&&(i=5),this.rows=t,this.cols=i,this.bricks=[],this.brickWidth=75,this.brickHeight=20,this.brickPadding=10,this.brickOffset=30,this.setup()}return t.prototype.setup=function(){for(var t=0;t<this.cols;t+=1){this.bricks[t]=[];for(var i=0;i<this.rows;i+=1){var s=t*(this.brickWidth+this.brickPadding)+this.brickOffset,o=i*(this.brickHeight+this.brickPadding)+this.brickOffset,r="#133337";1===i?r="#0e2f44":2===i&&(r="#2a6f64");var e=new p(s,o,r);this.bricks[t][i]=e}}},t.prototype.render=function(t){for(var i=0;i<this.cols;i+=1)for(var s=0;s<this.rows;s+=1)1===this.bricks[i][s].status&&this.bricks[i][s].render(t)},t}();const y=f;var v=function(){function t(t,i){this.canvas=t,this.ctx=i,this.color="#51a094",this.x=this.canvas.width/2,this.y=this.canvas.height-30,this.paddleWidth=75,this.paddleX=(this.canvas.width-this.paddleWidth)/2,this.allBricks=new y,this.background=new d(0,0,this.canvas.width,this.canvas.height),this.ball=new e(this.color,this.x,this.y),this.paddle=new h(this.paddleX,this.canvas.height-10),this.scoreText=new a(8,20,this.color,0,"Score: "),this.livesText=new a(this.canvas.width-65,20,this.color,3,"Lives: "),this.rightPressed=!1,this.leftPressed=!1,this.setUp(),this.draw()}return t.prototype.setUp=function(){this.resetBallAndPaddle();var t=document.addEventListener;t("keydown",this.keyDownHandler.bind(this),!1),t("keyup",this.keyUpHandler.bind(this),!1),t("mousemove",this.mouseMoveHandler.bind(this),!1)},t.prototype.resetBallAndPaddle=function(){this.ball.x=Math.floor(Math.random()*this.canvas.width)+0,this.ball.y=this.canvas.height-30,this.ball.dx=3,this.ball.dy=-3,this.paddle.x=(this.canvas.width-this.paddle.width)/2},t.prototype.collisionDetection=function(){for(var t=0;t<this.allBricks.cols;t+=1)for(var i=0;i<this.allBricks.rows;i+=1){var s=this.allBricks.bricks[t][i];1===s.status&&this.ball.x>s.x&&this.ball.x<s.x+this.allBricks.brickWidth&&this.ball.y>s.y&&this.ball.y<s.y+this.allBricks.brickHeight&&(this.ball.dy=-this.ball.dy,s.status=0,this.ball.randColor(),this.scoreText.value+=1,this.scoreText.value===this.allBricks.rows*this.allBricks.cols&&(alert("YOU WIN! CONGRATULATIONS!"),document.location.reload()))}},t.prototype.movePaddle=function(){this.rightPressed&&this.paddle.x<this.canvas.width-this.paddle.width?this.paddle.moveTo(7):this.leftPressed&&this.paddle.x>0&&this.paddle.moveTo(-7)},t.prototype.keyDownHandler=function(t){var i=t.key;"Right"===i||"ArrowRight"===i?this.rightPressed=!0:"Left"!==i&&"ArrowLeft"!==i||(this.leftPressed=!0)},t.prototype.keyUpHandler=function(t){var i=t.key;"Right"===i||"ArrowRight"===i?this.rightPressed=!1:"Left"!==i&&"ArrowLeft"!==i||(this.leftPressed=!1)},t.prototype.mouseMoveHandler=function(t){var i=t.clientX-this.canvas.offsetLeft;i>0&&i<this.canvas.width&&this.paddle.moveBy(i-this.paddle.width/2)},t.prototype.draw=function(){this.ctx.clearRect(0,0,this.canvas.width,this.canvas.height),this.background.render(this.ctx),this.allBricks.render(this.ctx),this.ball.render(this.ctx),this.ball.moveTo(),this.paddle.render(this.ctx),this.scoreText.render(this.ctx),this.livesText.render(this.ctx),this.collisionDetection(),(this.ball.x+this.ball.dx>this.canvas.width-this.ball.radius||this.ball.x+this.ball.dx<this.ball.radius)&&(this.ball.dx=-this.ball.dx,this.ball.randColor()),this.ball.y+this.ball.dy<this.ball.radius?(this.ball.dy=-this.ball.dy,this.ball.randColor()):this.ball.y+this.ball.dy>this.canvas.height-this.ball.radius&&(this.ball.x>this.paddle.x&&this.ball.x<this.paddle.x+this.paddle.width?(this.ball.dy=-this.ball.dy,this.ball.randColor()):(this.livesText.value-=1,this.livesText.value?this.resetBallAndPaddle():(alert("GAME OVER"),document.location.reload()))),this.movePaddle(),requestAnimationFrame(this.draw.bind(this))},t}();const b=v;var x=document.getElementById("myCanvas"),w=x.getContext("2d");new b(x,w)})();