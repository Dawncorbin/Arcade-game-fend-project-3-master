// Enemies our player must avoid
var Enemy = function(x,y, speed) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    this.x = x;
    this.y = y + 55;
    this.speed = speed;
    // image/sprite for our enemy
    this.sprite = 'images/enemy-bug.png';

    this.horizontal = 101;
    this.boundry = this.horizontal * 5;
    this.resetPos = -this.horizontal;
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks

Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.

    //If enemy is not passed boundary
    if(this.x < this.boundry) {

        // move forward
        // increment x by speed * dt
        this.x += this.speed * dt;
      } else {
        // reset pos to start
        this.x = this.resetPos;
      }
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.

// new hero object
class Hero {
    constructor() {
        this.sprite = 'images/char-boy.png';
        this.horizontal = 101;
        this.vertical = 83;
        this.startX = this.horizontal * 2;
        this.startY = (this.vertical * 4) + 55;
        this.x = this.startX;
        this.y = this.startY;
        this.victory = false;
    }

        update() {
            // check collision here
            for(let enemy of allEnemies) {

                // did hero x and y collide with enemy?
                // dividing the horizontal by /2, reduces the collision space by half
                if (this.y === enemy.y && (enemy.x + enemy.horizontal/2 > this.x
                   && enemy.x < this.x + this.horizontal/2)) {
                    this.reset();
                }

              }
            // check win here
                // did player x and y reach final tile?
                if(this.y === (- 28)) {
                  alert('Congratulations! You won the game!')
                  this.victory = true;
                    if(window.confirm('Play Again?')) {
                        player.reset();
                    }
                }
        }
        // reset hero to start x and y
        reset() {
          this.y = this.startY;
          this.x = this.startX;
        }
    // renders player image on board
    render() {
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    }

    // moves player with arrow keys
    handleInput(input) {
        switch(input) {
            case 'left':
                if (this.x > 0) {
                    this.x -= this.horizontal;
                }
                break;
            case 'up':
                if (this.y > 0) {
                    this.y -= this.vertical;
                }
                break;
            case 'right':
                if (this.x < this.horizontal * 4) {
                    this.x += this.horizontal;
                }
                break;
            case 'down':
                if (this.y < this.vertical * 4) {
                    this.y += this.vertical;
                }
                break;
        }
    }
}
  // Now instantiate your objects.
  // variable for player
  const player = new Hero();
  const bug1 = new Enemy(-101, 0, 200);
  const bug2 = new Enemy(-101, 83, 300);
  const bug3 = new Enemy((-101*2.5), 83, 300);
  const bug4 = new Enemy((-101*2.5), 166, 160);

  // Place all enemy objects in an array called allEnemies
  // init allEnemies array
  // for each enemy - create and push new Enemy object into above array
  const allEnemies = [];
  allEnemies.push(bug1, bug2, bug3, bug4);
  console.log(allEnemies);

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
