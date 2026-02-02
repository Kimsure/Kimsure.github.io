class SnakeGame {
    constructor(canvas, blockSize = 20) {
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d');
        this.blockSize = blockSize;
        this.cols = Math.floor(canvas.width / blockSize);
        this.rows = Math.floor(canvas.height / blockSize);
        this.snake = [];
        this.food = null;
        this.direction = 'right';
        this.nextDirection = 'right';
        this.score = 0;
        this.highScore = parseInt(localStorage.getItem('snakeHighScore')) || 0;
        this.gameOver = false;
        this.isPaused = false;
        this.speed = 150;
        this.lastRenderTime = 0;
        this.animationId = null;
        this.keyHandler = this.handleKeyPress.bind(this);
        
        this.init();
    }

    init() {
        this.reset();
        document.addEventListener('keydown', this.keyHandler);
    }

    destroy() {
        this.gameOver = true;
        this.isPaused = true;
        if (this.animationId) {
            cancelAnimationFrame(this.animationId);
            this.animationId = null;
        }
        document.removeEventListener('keydown', this.keyHandler);
    }

    reset() {
        // 计算网格中心位置
        const startX = Math.floor(this.cols / 2);
        const startY = Math.floor(this.rows / 2);
        
        this.snake = [
            { x: startX, y: startY },
            { x: startX - 1, y: startY },
            { x: startX - 2, y: startY }
        ];
        this.direction = 'right';
        this.nextDirection = 'right';
        this.score = 0;
        this.gameOver = false;
        this.isPaused = false;
        this.speed = 150;
        this.lastRenderTime = performance.now();
        
        this.generateFood();
        this.updateScoreDisplay();
        
        // 重新开始游戏循环
        if (this.animationId) {
            cancelAnimationFrame(this.animationId);
        }
        this.animationId = requestAnimationFrame(this.gameLoop.bind(this));
    }

    generateFood() {
        let newFood;
        do {
            newFood = {
                x: Math.floor(Math.random() * this.cols),
                y: Math.floor(Math.random() * this.rows)
            };
        } while (this.snake.some(segment => segment.x === newFood.x && segment.y === newFood.y));
        
        this.food = newFood;
    }

    togglePause() {
        if (this.gameOver) return;
        this.isPaused = !this.isPaused;
        if (!this.isPaused) {
            this.lastRenderTime = performance.now();
            this.animationId = requestAnimationFrame(this.gameLoop.bind(this));
        }
    }

    handleKeyPress(event) {
        if (event.code === 'Space') {
            event.preventDefault();
            if (this.gameOver) {
                this.reset();
            } else {
                this.togglePause();
                updatePauseButton('snake');
            }
            return;
        }

        if (this.isPaused || this.gameOver) return;

        const keyMap = {
            'ArrowUp': 'up',
            'ArrowDown': 'down',
            'ArrowLeft': 'left',
            'ArrowRight': 'right',
            'w': 'up',
            's': 'down',
            'a': 'left',
            'd': 'right',
            'W': 'up',
            'S': 'down',
            'A': 'left',
            'D': 'right'
        };

        const newDirection = keyMap[event.key];
        if (!newDirection) return;

        const opposites = {
            'up': 'down',
            'down': 'up',
            'left': 'right',
            'right': 'left'
        };

        // 防止180度转向和快速按键导致的自撞
        if (opposites[newDirection] !== this.direction) {
            this.nextDirection = newDirection;
        }
    }

    moveSnake() {
        // 应用下一个方向
        this.direction = this.nextDirection;
        
        const head = { ...this.snake[0] };

        switch (this.direction) {
            case 'up': head.y--; break;
            case 'down': head.y++; break;
            case 'left': head.x--; break;
            case 'right': head.x++; break;
        }

        // 检查碰撞墙壁 - 使用环绕模式或结束游戏
        if (head.x < 0 || head.x >= this.cols || head.y < 0 || head.y >= this.rows) {
            this.gameOver = true;
            return;
        }

        // 检查碰撞自身
        if (this.snake.some(segment => segment.x === head.x && segment.y === head.y)) {
            this.gameOver = true;
            return;
        }

        this.snake.unshift(head);

        // 检查是否吃到食物
        if (head.x === this.food.x && head.y === this.food.y) {
            this.score += 10;
            this.generateFood();
            // 每50分增加速度
            if (this.score % 50 === 0) {
                this.speed = Math.max(50, this.speed - 10);
            }
            this.updateScoreDisplay();
        } else {
            this.snake.pop();
        }
    }

    updateScoreDisplay() {
        updateScoreDisplay('snake', this.score);
        if (this.score > this.highScore) {
            this.highScore = this.score;
            localStorage.setItem('snakeHighScore', this.highScore);
        }
        updateHighScoreDisplay('snake', this.highScore);
    }

    drawPauseScreen() {
        // 保存当前画布状态
        this.ctx.save();
        
        this.ctx.fillStyle = 'rgba(0, 0, 0, 0.6)';
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
        
        this.ctx.fillStyle = '#fff';
        this.ctx.font = 'bold 36px Arial';
        this.ctx.textAlign = 'center';
        this.ctx.textBaseline = 'middle';
        this.ctx.fillText('游戏暂停', this.canvas.width / 2, this.canvas.height / 2 - 20);
        this.ctx.font = '18px Arial';
        this.ctx.fillText('按空格键或点击继续按钮继续', this.canvas.width / 2, this.canvas.height / 2 + 25);
        
        this.ctx.restore();
    }

    draw() {
        // 清空画布 - 使用clearRect而不是fillRect来避免闪烁
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        
        // 绘制背景
        this.ctx.fillStyle = '#f8f9fa';
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

        // 绘制网格（可选，增加视觉效果）
        this.ctx.strokeStyle = '#e9ecef';
        this.ctx.lineWidth = 0.5;
        for (let i = 0; i <= this.cols; i++) {
            this.ctx.beginPath();
            this.ctx.moveTo(i * this.blockSize, 0);
            this.ctx.lineTo(i * this.blockSize, this.canvas.height);
            this.ctx.stroke();
        }
        for (let i = 0; i <= this.rows; i++) {
            this.ctx.beginPath();
            this.ctx.moveTo(0, i * this.blockSize);
            this.ctx.lineTo(this.canvas.width, i * this.blockSize);
            this.ctx.stroke();
        }

        // 绘制蛇
        this.snake.forEach((segment, index) => {
            // 蛇头用更亮的颜色
            if (index === 0) {
                this.ctx.fillStyle = '#28a745';
                // 绘制蛇头圆角
                this.roundRect(
                    segment.x * this.blockSize + 1,
                    segment.y * this.blockSize + 1,
                    this.blockSize - 2,
                    this.blockSize - 2,
                    4
                );
                this.ctx.fill();
                
                // 绘制眼睛
                this.ctx.fillStyle = '#fff';
                const eyeSize = 3;
                const eyeOffset = 5;
                if (this.direction === 'right' || this.direction === 'left') {
                    this.ctx.beginPath();
                    this.ctx.arc(
                        segment.x * this.blockSize + this.blockSize / 2,
                        segment.y * this.blockSize + eyeOffset,
                        eyeSize, 0, Math.PI * 2
                    );
                    this.ctx.fill();
                    this.ctx.beginPath();
                    this.ctx.arc(
                        segment.x * this.blockSize + this.blockSize / 2,
                        segment.y * this.blockSize + this.blockSize - eyeOffset,
                        eyeSize, 0, Math.PI * 2
                    );
                    this.ctx.fill();
                } else {
                    this.ctx.beginPath();
                    this.ctx.arc(
                        segment.x * this.blockSize + eyeOffset,
                        segment.y * this.blockSize + this.blockSize / 2,
                        eyeSize, 0, Math.PI * 2
                    );
                    this.ctx.fill();
                    this.ctx.beginPath();
                    this.ctx.arc(
                        segment.x * this.blockSize + this.blockSize - eyeOffset,
                        segment.y * this.blockSize + this.blockSize / 2,
                        eyeSize, 0, Math.PI * 2
                    );
                    this.ctx.fill();
                }
            } else {
                // 蛇身渐变效果
                const gradient = 1 - (index / this.snake.length) * 0.3;
                this.ctx.fillStyle = `rgb(${25 * gradient + 30}, ${167 * gradient}, ${69 * gradient + 30})`;
                this.roundRect(
                    segment.x * this.blockSize + 1,
                    segment.y * this.blockSize + 1,
                    this.blockSize - 2,
                    this.blockSize - 2,
                    3
                );
                this.ctx.fill();
            }
        });

        // 绘制食物（带发光效果）
        if (this.food) {
            // 外发光
            this.ctx.shadowColor = '#dc3545';
            this.ctx.shadowBlur = 10;
            this.ctx.fillStyle = '#dc3545';
            
            const centerX = this.food.x * this.blockSize + this.blockSize / 2;
            const centerY = this.food.y * this.blockSize + this.blockSize / 2;
            const radius = (this.blockSize - 4) / 2;
            
            this.ctx.beginPath();
            this.ctx.arc(centerX, centerY, radius, 0, Math.PI * 2);
            this.ctx.fill();
            
            // 重置阴影
            this.ctx.shadowBlur = 0;
            
            // 高光
            this.ctx.fillStyle = '#ff6b7a';
            this.ctx.beginPath();
            this.ctx.arc(centerX - 2, centerY - 2, radius / 3, 0, Math.PI * 2);
            this.ctx.fill();
        }

        if (this.gameOver) {
            this.drawGameOver();
        }
    }

    roundRect(x, y, width, height, radius) {
        this.ctx.beginPath();
        this.ctx.moveTo(x + radius, y);
        this.ctx.lineTo(x + width - radius, y);
        this.ctx.quadraticCurveTo(x + width, y, x + width, y + radius);
        this.ctx.lineTo(x + width, y + height - radius);
        this.ctx.quadraticCurveTo(x + width, y + height, x + width - radius, y + height);
        this.ctx.lineTo(x + radius, y + height);
        this.ctx.quadraticCurveTo(x, y + height, x, y + height - radius);
        this.ctx.lineTo(x, y + radius);
        this.ctx.quadraticCurveTo(x, y, x + radius, y);
        this.ctx.closePath();
    }

    drawGameOver() {
        this.ctx.fillStyle = 'rgba(0, 0, 0, 0.7)';
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
        
        this.ctx.fillStyle = '#fff';
        this.ctx.font = 'bold 36px Arial';
        this.ctx.textAlign = 'center';
        this.ctx.textBaseline = 'middle';
        this.ctx.fillText('游戏结束!', this.canvas.width / 2, this.canvas.height / 2 - 40);
        this.ctx.font = '24px Arial';
        this.ctx.fillText(
            `最终得分: ${this.score}`,
            this.canvas.width / 2,
            this.canvas.height / 2 + 10
        );
        this.ctx.font = '18px Arial';
        this.ctx.fillText(
            '按空格键或点击重新开始按钮',
            this.canvas.width / 2,
            this.canvas.height / 2 + 50
        );
    }

    gameLoop(timestamp) {
        if (this.gameOver) {
            this.draw();
            return;
        }

        if (this.isPaused) {
            this.draw();
            this.drawPauseScreen();
            return;
        }

        this.animationId = requestAnimationFrame(this.gameLoop.bind(this));

        const secondsSinceLastRender = (timestamp - this.lastRenderTime) / 1000;
        if (secondsSinceLastRender < this.speed / 1000) {
            this.draw();
            return;
        }

        this.lastRenderTime = timestamp;
        this.moveSnake();
        this.draw();
    }
}
