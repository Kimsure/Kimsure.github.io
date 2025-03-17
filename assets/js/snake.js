class SnakeGame {
    constructor(canvas, blockSize = 20) {
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d');
        this.blockSize = blockSize;
        this.snake = [
            { x: 10, y: 10 },
        ];
        this.food = null;
        this.direction = 'right';
        this.score = 0;
        this.gameOver = false;
        this.isPaused = false;
        this.speed = 150;
        this.lastRenderTime = 0;
        this.init();
    }

    init() {
        this.generateFood();
        document.addEventListener('keydown', this.handleKeyPress.bind(this));
        requestAnimationFrame(this.gameLoop.bind(this));
    }

    generateFood() {
        const maxX = Math.floor((this.canvas.width - this.blockSize) / this.blockSize);
        const maxY = Math.floor((this.canvas.height - this.blockSize) / this.blockSize);
        
        let newFood;
        do {
            newFood = {
                x: Math.floor(Math.random() * maxX),
                y: Math.floor(Math.random() * maxY)
            };
        } while (this.snake.some(segment => segment.x === newFood.x && segment.y === newFood.y));
        
        this.food = newFood;
    }

    handleKeyPress(event) {
        if (event.code === 'Space' && !this.gameOver) {
            this.isPaused = !this.isPaused;
            if (!this.isPaused) {
                this.lastRenderTime = performance.now();
                requestAnimationFrame(this.gameLoop.bind(this));
            }
            return;
        }

        if (this.isPaused) return;

        const keyMap = {
            'ArrowUp': 'up',
            'ArrowDown': 'down',
            'ArrowLeft': 'left',
            'ArrowRight': 'right',
            'w': 'up',
            's': 'down',
            'a': 'left',
            'd': 'right'
        };

        const newDirection = keyMap[event.key];
        if (!newDirection) return;

        const opposites = {
            'up': 'down',
            'down': 'up',
            'left': 'right',
            'right': 'left'
        };

        if (opposites[newDirection] !== this.direction) {
            this.direction = newDirection;
        }
    }

    moveSnake() {
        const head = { ...this.snake[0] };

        switch (this.direction) {
            case 'up': head.y--; break;
            case 'down': head.y++; break;
            case 'left': head.x--; break;
            case 'right': head.x++; break;
        }

        // Check collision with walls
        if (head.x < 0 || head.x >= this.canvas.width / this.blockSize ||
            head.y < 0 || head.y >= this.canvas.height / this.blockSize) {
            this.gameOver = true;
            return;
        }

        // Check collision with self
        if (this.snake.some(segment => segment.x === head.x && segment.y === head.y)) {
            this.gameOver = true;
            return;
        }

        this.snake.unshift(head);

        // Check if snake ate food
        if (head.x === this.food.x && head.y === this.food.y) {
            this.score += 10;
            this.generateFood();
            // Increase speed every 50 points
            if (this.score % 50 === 0) {
                this.speed = Math.max(50, this.speed - 10);
            }
        } else {
            this.snake.pop();
        }
    }

    drawPauseScreen() {
        this.ctx.fillStyle = 'rgba(0, 0, 0, 0.5)';
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
        
        this.ctx.fillStyle = '#fff';
        this.ctx.font = '30px Arial';
        this.ctx.textAlign = 'center';
        this.ctx.fillText('游戏暂停', this.canvas.width / 2, this.canvas.height / 2);
        this.ctx.font = '20px Arial';
        this.ctx.fillText('按空格键继续', this.canvas.width / 2, this.canvas.height / 2 + 40);
    }

    draw() {
        // Clear canvas
        this.ctx.fillStyle = '#f8f9fa';
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

        // Draw snake
        this.snake.forEach((segment, index) => {
            this.ctx.fillStyle = index === 0 ? '#28a745' : '#198754';
            this.ctx.fillRect(
                segment.x * this.blockSize,
                segment.y * this.blockSize,
                this.blockSize - 1,
                this.blockSize - 1
            );
        });

        // Draw food
        this.ctx.fillStyle = '#dc3545';
        this.ctx.fillRect(
            this.food.x * this.blockSize,
            this.food.y * this.blockSize,
            this.blockSize - 1,
            this.blockSize - 1
        );

        // Draw score
        this.ctx.fillStyle = '#212529';
        this.ctx.font = '20px Arial';
        this.ctx.fillText(`Score: ${this.score}`, 10, 30);

        if (this.gameOver) {
            this.ctx.fillStyle = 'rgba(0, 0, 0, 0.7)';
            this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
            
            this.ctx.fillStyle = '#fff';
            this.ctx.font = '30px Arial';
            this.ctx.textAlign = 'center';
            this.ctx.fillText('Game Over!', this.canvas.width / 2, this.canvas.height / 2);
            this.ctx.font = '20px Arial';
            this.ctx.fillText(
                `Final Score: ${this.score}`,
                this.canvas.width / 2,
                this.canvas.height / 2 + 40
            );
            this.ctx.fillText(
                'Press Space to Restart',
                this.canvas.width / 2,
                this.canvas.height / 2 + 80
            );
        }
    }

    reset() {
        this.snake = [{ x: 10, y: 10 }];
        this.direction = 'right';
        this.score = 0;
        this.gameOver = false;
        this.isPaused = false;
        this.speed = 150;
        this.generateFood();
    }

    gameLoop(timestamp) {
        if (this.gameOver) {
            const handleRestart = (event) => {
                if (event.code === 'Space') {
                    this.reset();
                    document.removeEventListener('keydown', handleRestart);
                }
            };
            document.addEventListener('keydown', handleRestart);
            return;
        }

        if (this.isPaused) {
            this.drawPauseScreen();
            return;
        }

        requestAnimationFrame(this.gameLoop.bind(this));

        const secondsSinceLastRender = (timestamp - this.lastRenderTime) / 1000;
        if (secondsSinceLastRender < this.speed / 1000) return;

        this.lastRenderTime = timestamp;
        this.moveSnake();
        this.draw();
    }
}

// Initialize game when the page loads
document.addEventListener('DOMContentLoaded', () => {
    const canvas = document.getElementById('snakeCanvas');
    if (canvas) {
        // Set canvas size based on container
        const container = canvas.parentElement;
        canvas.width = container.clientWidth;
        canvas.height = 400;

        // Initialize game
        new SnakeGame(canvas);
    }
});