window.onload =function(){

}
// צריך לשחק עם החיצים של המקלדת

const canvas = document.getElementById('gameCanvas');
    const ctx = canvas.getContext('2d');

    const gridSize = 20;
    let snake = [{ x: 200, y: 200 }];
    let apple = { x: 0, y: 0 };
    let score = 0;
    let speed = 100;
    let dx = 0;
    let dy = -gridSize;

    function drawSnake() {
      ctx.fillStyle = 'YOUR_SNAKE_COLOR'; 
      snake.forEach(({ x, y }) => {
        ctx.fillRect(x, y, gridSize, gridSize);
      });
    }

    function drawApple() {
      ctx.fillStyle = 'red';
      ctx.fillRect(apple.x, apple.y, gridSize, gridSize);
    }

    function drawScore() {
      ctx.fillStyle = 'black';
      ctx.font = '20px Arial';
      ctx.fillText('ניקוד: ' + score, 10, 30);
    }

    function generateApple() {
      const maxX = canvas.width / gridSize;
      const maxY = canvas.height / gridSize;
      apple.x = Math.floor(Math.random() * maxX) * gridSize;
      apple.y = Math.floor(Math.random() * maxY) * gridSize;
    }

    function checkCollision() {
      if (
        snake[0].x < 0 ||
        snake[0].x >= canvas.width ||
        snake[0].y < 0 ||
        snake[0].y >= canvas.height
      ) {
        return true; 
      }

      for (let i = 1; i < snake.length; i++) {
        if (snake[i].x === snake[0].x && snake[i].y === snake[0].y) {
          return true; 
        }
      }

      return false;
    }

    function update() {
      const head = { x: snake[0].x + dx, y: snake[0].y + dy };
      snake.unshift(head);

      if (snake[0].x === apple.x && snake[0].y === apple.y) {
        score += 10;
        speed *= 0.9;
        generateApple();
      } else {
        snake.pop();
      }

      if (checkCollision()) {
        alert('המשחק הסתיים, ניקוד: ' + score);
        snake = [{ x: 200, y: 200 }];
        score = 0;
        speed = 100;
        dx = 0;
        dy = -gridSize;
      }

      ctx.clearRect(0, 0, canvas.width, canvas.height);
      drawSnake();
      drawApple();
      drawScore();
    }

    document.addEventListener('keydown', (event) => {
      const key = event.key;
      if (key === 'ArrowLeft' && dx === 0) {
        dx = -gridSize;
        dy = 0;
      } else if (key === 'ArrowRight' && dx === 0) {
        dx = gridSize;
        dy = 0;
      } else if (key === 'ArrowUp' && dy === 0) {
        dx = 0;
        dy = -gridSize;
      } else if (key === 'ArrowDown' && dy === 0) {
        dx = 0;
        dy = gridSize;
      }
    });

    generateApple();
    setInterval(update, speed);