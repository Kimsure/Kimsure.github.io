class TetrisGame {
    constructor(canvas, blockSize = 30) {
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d');
        this.blockSize = blockSize;
        this.cols = Math.floor(canvas.width / blockSize);
        this.rows = Math.floor(canvas.height / blockSize);
        this.board = [];
        this.score = 0;
        this.lines = 0;
        this.level = 1;
        this.gameOver = false;
        this.isPaused = false;
        this.speed = 1000;
        this.lastRenderTime = 0;
        this.animationId = null;
        this.keyHandler = this.handleKeyPress.bind(this);
        
        // 定义俄罗斯方块的形状
        this.shapes = [
            [[1, 1, 1, 1]], // I
            [[1, 1], [1, 1]], // O
            [[1, 1, 1], [0, 1, 0]], // T
            [[1, 1, 1], [1, 0, 0]], // L
            [[1, 1, 1], [0, 0, 1]], // J
            [[1, 1, 0], [0, 1, 1]], // S
            [[0, 1, 1], [1, 1, 0]]  // Z
        ];
        
        this.colors = [
            '#00f0f0', // I - 青色
            '#f0f000', // O - 黄色
            '#f000f0', // T - 紫色
            '#f0a000', // L - 橙色
            '#0000f0', // J - 蓝色
            '#00f000', // S - 绿色
            '#f00000'  // Z - 红色
        ];
        
        this.currentPiece = null;
        this.currentPieceColor = null;
        this.currentX = 0;
        this.currentY = 0;
        
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
        this.board = Array(this.rows).fill().map(() => Array(this.cols).fill(0));
        this.score = 0;
        this.lines = 0;
        this.level = 1;
        this.gameOver = false;
        this.isPaused = false;
        this.speed = 1000;
        this.lastRenderTime = performance.now();
        this.currentPiece = null;
        
        this.generateNewPiece();
        this.updateScoreDisplay();
        
        if (this.animationId) {
            cancelAnimationFrame(this.animationId);
        }
        this.animationId = requestAnimationFrame(this.gameLoop.bind(this));
    }
    
    togglePause() {
        if (this.gameOver) return;
        this.isPaused = !this.isPaused;
        if (!this.isPaused) {
            this.lastRenderTime = performance.now();
            this.animationId = requestAnimationFrame(this.gameLoop.bind(this));
        }
    }
    
    generateNewPiece() {
        const randomIndex = Math.floor(Math.random() * this.shapes.length);
        this.currentPiece = this.shapes[randomIndex].map(row => [...row]);
        this.currentPieceColor = this.colors[randomIndex];
        this.currentX = Math.floor((this.cols - this.currentPiece[0].length) / 2);
        this.currentY = 0;
        
        if (this.checkCollision()) {
            this.gameOver = true;
        }
    }
    
    handleKeyPress(event) {
        if (event.code === 'Space') {
            event.preventDefault();
            if (this.gameOver) {
                this.reset();
            } else {
                this.togglePause();
                updatePauseButton('tetris');
            }
            return;
        }

        if (this.isPaused || this.gameOver) return;
        
        switch(event.key) {
            case 'ArrowLeft':
            case 'a':
            case 'A':
                event.preventDefault();
                if (!this.checkCollision(this.currentPiece, this.currentX - 1, this.currentY)) {
                    this.currentX--;
                }
                break;
            case 'ArrowRight':
            case 'd':
            case 'D':
                event.preventDefault();
                if (!this.checkCollision(this.currentPiece, this.currentX + 1, this.currentY)) {
                    this.currentX++;
                }
                break;
            case 'ArrowDown':
            case 's':
            case 'S':
                event.preventDefault();
                if (!this.checkCollision(this.currentPiece, this.currentX, this.currentY + 1)) {
                    this.currentY++;
                    this.score += 1; // 软降奖励
                    this.updateScoreDisplay();
                }
                break;
            case 'ArrowUp':
            case 'w':
            case 'W':
                event.preventDefault();
                const rotated = this.rotate(this.currentPiece);
                // 尝试旋转，如果碰撞则尝试墙踢
                if (!this.checkCollision(rotated, this.currentX, this.currentY)) {
                    this.currentPiece = rotated;
                } else if (!this.checkCollision(rotated, this.currentX - 1, this.currentY)) {
                    this.currentPiece = rotated;
                    this.currentX--;
                } else if (!this.checkCollision(rotated, this.currentX + 1, this.currentY)) {
                    this.currentPiece = rotated;
                    this.currentX++;
                }
                break;
        }
    }
    
    rotate(piece) {
        const N = piece.length;
        const M = piece[0].length;
        const rotated = Array(M).fill().map(() => Array(N).fill(0));
        
        for (let i = 0; i < N; i++) {
            for (let j = 0; j < M; j++) {
                rotated[j][N-1-i] = piece[i][j];
            }
        }
        
        return rotated;
    }
    
    checkCollision(piece = this.currentPiece, x = this.currentX, y = this.currentY) {
        for (let r = 0; r < piece.length; r++) {
            for (let c = 0; c < piece[r].length; c++) {
                if (piece[r][c]) {
                    const newX = x + c;
                    const newY = y + r;
                    
                    if (newX < 0 || newX >= this.cols || newY >= this.rows) {
                        return true;
                    }
                    
                    if (newY >= 0 && this.board[newY][newX]) {
                        return true;
                    }
                }
            }
        }
        return false;
    }
    
    mergePiece() {
        for (let r = 0; r < this.currentPiece.length; r++) {
            for (let c = 0; c < this.currentPiece[r].length; c++) {
                if (this.currentPiece[r][c]) {
                    const newY = this.currentY + r;
                    if (newY >= 0) {
                        this.board[newY][this.currentX + c] = this.currentPieceColor;
                    }
                }
            }
        }
    }
    
    clearLines() {
        let linesCleared = 0;
        
        for (let r = this.rows - 1; r >= 0; r--) {
            if (this.board[r].every(cell => cell !== 0)) {
                this.board.splice(r, 1);
                this.board.unshift(Array(this.cols).fill(0));
                linesCleared++;
                r++; // 检查同一行（现在是新的一行了）
            }
        }
        
        if (linesCleared > 0) {
            this.lines += linesCleared;
            // 计分系统：1行100，2行300，3行600，4行1000
            const points = [0, 100, 300, 600, 1000];
            this.score += points[linesCleared] * this.level;
            
            // 每10行升一级
            this.level = Math.floor(this.lines / 10) + 1;
            
            // 速度随等级增加
            this.speed = Math.max(100, 1000 - (this.level - 1) * 100);
            
            this.updateScoreDisplay();
        }
    }

    updateScoreDisplay() {
        const scoreEl = document.getElementById('tetris-score');
        const linesEl = document.getElementById('tetris-lines');
        const levelEl = document.getElementById('tetris-level');
        
        if (scoreEl) scoreEl.textContent = this.score;
        if (linesEl) linesEl.textContent = this.lines;
        if (levelEl) levelEl.textContent = this.level;
    }
    
    drawPauseScreen() {
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
        // 清空画布
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        
        // 绘制背景
        this.ctx.fillStyle = '#f8f9fa';
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
        
        // 绘制网格
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
        
        // 绘制已固定的方块（带3D效果）
        for (let r = 0; r < this.rows; r++) {
            for (let c = 0; c < this.cols; c++) {
                if (this.board[r][c]) {
                    this.drawBlock(c, r, this.board[r][c]);
                }
            }
        }
        
        // 绘制当前方块
        if (this.currentPiece) {
            // 绘制阴影（预览落点）
            let ghostY = this.currentY;
            while (!this.checkCollision(this.currentPiece, this.currentX, ghostY + 1)) {
                ghostY++;
            }
            
            this.ctx.globalAlpha = 0.3;
            for (let r = 0; r < this.currentPiece.length; r++) {
                for (let c = 0; c < this.currentPiece[r].length; c++) {
                    if (this.currentPiece[r][c]) {
                        this.ctx.fillStyle = '#666';
                        this.ctx.fillRect(
                            (this.currentX + c) * this.blockSize + 1,
                            (ghostY + r) * this.blockSize + 1,
                            this.blockSize - 2,
                            this.blockSize - 2
                        );
                    }
                }
            }
            this.ctx.globalAlpha = 1;
            
            // 绘制当前方块
            for (let r = 0; r < this.currentPiece.length; r++) {
                for (let c = 0; c < this.currentPiece[r].length; c++) {
                    if (this.currentPiece[r][c]) {
                        this.drawBlock(this.currentX + c, this.currentY + r, this.currentPieceColor);
                    }
                }
            }
        }
        
        if (this.gameOver) {
            this.drawGameOver();
        }
    }

    drawBlock(x, y, color) {
        const px = x * this.blockSize;
        const py = y * this.blockSize;
        const size = this.blockSize - 1;
        
        // 主体
        this.ctx.fillStyle = color;
        this.ctx.fillRect(px + 1, py + 1, size - 1, size - 1);
        
        // 高光（左上角）
        this.ctx.fillStyle = 'rgba(255, 255, 255, 0.4)';
        this.ctx.fillRect(px + 1, py + 1, size - 1, 3);
        this.ctx.fillRect(px + 1, py + 1, 3, size - 1);
        
        // 阴影（右下角）
        this.ctx.fillStyle = 'rgba(0, 0, 0, 0.3)';
        this.ctx.fillRect(px + 1, py + size - 3, size - 1, 3);
        this.ctx.fillRect(px + size - 3, py + 1, 3, size - 1);
    }

    drawGameOver() {
        this.ctx.fillStyle = 'rgba(0, 0, 0, 0.7)';
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
        
        this.ctx.fillStyle = '#fff';
        this.ctx.font = 'bold 36px Arial';
        this.ctx.textAlign = 'center';
        this.ctx.textBaseline = 'middle';
        this.ctx.fillText('游戏结束!', this.canvas.width / 2, this.canvas.height / 2 - 60);
        this.ctx.font = '24px Arial';
        this.ctx.fillText(
            `最终得分: ${this.score}`,
            this.canvas.width / 2,
            this.canvas.height / 2 - 10
        );
        this.ctx.font = '18px Arial';
        this.ctx.fillText(
            `消除行数: ${this.lines} | 等级: ${this.level}`,
            this.canvas.width / 2,
            this.canvas.height / 2 + 30
        );
        this.ctx.fillText(
            '按空格键或点击重新开始按钮',
            this.canvas.width / 2,
            this.canvas.height / 2 + 70
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
        
        if (!this.checkCollision(this.currentPiece, this.currentX, this.currentY + 1)) {
            this.currentY++;
        } else {
            this.mergePiece();
            this.clearLines();
            this.generateNewPiece();
        }
        
        this.draw();
    }
}
