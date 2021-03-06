var allEnemies;
var player;
var score = 0;
var startGame = function(image){
  // Enemies our player must avoid
  var Enemy = function(pos,speed) {
      // Variables applied to each of our instances go here,
      // we've provided one for you to get started

      // The image/sprite for our enemies, this uses
      // a helper we've provided to easily load images
      this.sprite = 'images/enemy-bug.png';
      this.x = -100;
      this.y = 60+85*pos;
      this.speed = speed;
  };

  // Update the enemy's position, required method for game
  // Parameter: dt, a time delta between ticks
  Enemy.prototype.update = function(dt) {
      // You should multiply any movement by the dt parameter
      // which will ensure the game runs at the same speed for
      // all computers.
      if (this.x < 500){
        this.x += 75*this.speed*dt;
      }
      else{
        this.x = -110;
      }
      this.checkCollision(player)
  };

  // Draw the enemy on the screen, required method for game
  Enemy.prototype.render = function() {
      ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
  };
  Enemy.prototype.checkCollision = function(player) {
          'use strict';
          var enemyObj = 50;
          if (player.x < this.x + enemyObj &&
              player.x + enemyObj > this.x &&
              player.y < this.y + enemyObj &&
              enemyObj + player.y > this.y) {
              score = 0;
              $('#score_val').html(score);
              player.reset(); // resets player not enemy
          }
          if (player.y < enemyObj) {
              score += 1;
              $('#score_val').html(score);
              player.reset(); // resets player not enemy
          }
      };

  // Now write your own player class
  // This class requires an update(), render() and
  // a handleInput() method.
  var Player = function(image) {
      this.sprite = image;
      this.x = 1+100*2;
      this.y = 60+85*4;
      this.dx = 0;
      this.dy = 0;
      this.collision = false;
  };
  Player.prototype.update = function(dt) {
    this.x += this.dx;
    this.y += this.dy;
    this.dx = 0;
    this.dy = 0;
  };
  Player.prototype.render = function() {
      ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
  };
  Player.prototype.handleInput = function(keypress) {
    if (keypress == "up"){
      if (this.y>0){
        this.dy = -85;
      }
    }
    if (keypress == "right"){
      if (this.x<400){
        this.dx = 100;
      }
    }
    if (keypress == "left"){
      if (this.x>100){
        this.dx = -100;
      }
    }
    if (keypress == "down"){
      if (this.y<400){
        this.dy = 85;
      }
    }
    this.update();
  };

  Player.prototype.reset = function(){
    this.x = 1+100*2;
    this.y = 60+85*4;
    this.dx = 0;
    this.dy = 0;
  }
  // Now instantiate your objects.
  // Place all enemy objects in an array called allEnemies
  // Place the player object in a variable called player

  var createPlayer= function(image){
    player = new Player(image);
  }

  allEnemies = [new Enemy(0,6),new Enemy(1,4),new Enemy(2,5)];


  // This listens for key presses and sends the keys to your
  // Player.handleInput() method. You don't need to modify this.
  document.addEventListener('keyup', function(e) {
      var allowedKeys = {
          37: 'left',
          38: 'up',
          39: 'right',
          40: 'down'
      };

      player.handleInput(allowedKeys[e.keyCode]);
  });
  createPlayer(image);
  startEngine();
  $('#playerSelect').attr('style','display:none');
  $('#score').attr('style','display:block');
}
