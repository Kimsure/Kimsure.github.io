class TetrisGame {
    constructor(canvas, blockSize = 30) {
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d');
        this.blockSize = blockSize;
        this.cols = Math.floor(canvas.width / blockSize);
        this.rows = Math.floor(canvas.height / blockSize);
        this.board = Array(this.rows).fill().map(() => Array(this.cols).fill(0));
        this.score = 0;
        this.gameOver = false;
        this.speed = 1000;
        this.lastRenderTime = 0;
        
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
        this.generateNewPiece();
        document.addEventListener('keydown', this.handleKeyPress.bind(this));
        requestAnimationFrame(this.gameLoop.bind(this));
    }
    
    generateNewPiece() {
        const randomIndex = Math.floor(Math.random() * this.shapes.length);
        this.currentPiece = this.shapes[randomIndex];
        this.currentPieceColor = this.colors[randomIndex];
        this.currentX = Math.floor((this.cols - this.currentPiece[0].length) / 2);
        this.currentY = 0;
        
        if (this.checkCollision()) {
            this.gameOver = true;
        }
    }
    
    handleKeyPress(event) {
        if (this.gameOver) {
            if (event.code === 'Space') {
                this.reset();
            }
            return;
        }
        
        switch(event.key) {
            case 'ArrowLeft':
            case 'a':
                if (!this.checkCollision(this.currentPiece, this.currentX - 1, this.currentY)) {
                    this.currentX--;
                }
                break;
            case 'ArrowRight':
            case 'd':
                if (!this.checkCollision(this.currentPiece, this.currentX + 1, this.currentY)) {
                    this.currentX++;
                }
                break;
            case 'ArrowDown':
            case 's':
                if (!this.checkCollision(this.currentPiece, this.currentX, this.currentY + 1)) {
                    this.currentY++;
                }
                break;
            case 'ArrowUp':
            case 'w':
                const rotated = this.rotate(this.currentPiece);
                if (!this.checkCollision(rotated, this.currentX, this.currentY)) {
                    this.currentPiece = rotated;
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
            this.score += linesCleared * 100;
            this.speed = Math.max(100, 1000 - Math.floor(this.score / 1000) * 100);
        }
    }
    
    draw() {
        // 清空画布
        this.ctx.fillStyle = '#f8f9fa';
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
        
        // 绘制已固定的方块
        for (let r = 0; r < this.rows; r++) {
            for (let c = 0; c < this.cols; c++) {
                if (this.board[r][c]) {
                    this.ctx.fillStyle = this.board[r][c];
                    this.ctx.fillRect(
                        c * this.blockSize,
                        r * this.blockSize,
                        this.blockSize - 1,
                        this.blockSize - 1
                    );
                }
            }
        }
        
        // 绘制当前方块
        if (this.currentPiece) {
            this.ctx.fillStyle = this.currentPieceColor;
            for (let r = 0; r < this.currentPiece.length; r++) {
                for (let c = 0; c < this.currentPiece[r].length; c++) {
                    if (this.currentPiece[r][c]) {
                        this.ctx.fillRect(
                            (this.currentX + c) * this.blockSize,
                            (this.currentY + r) * this.blockSize,
                            this.blockSize - 1,
                            this.blockSize - 1
                        );
                    }
                }
            }
        }
        
        // 绘制分数
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
        this.board = Array(this.rows).fill().map(() => Array(this.cols).fill(0));
        this.score = 0;
        this.gameOver = false;
        this.speed = 1000;
        this.generateNewPiece();
    }
    
    gameLoop(timestamp) {
        if (this.gameOver) {
            this.draw();
            return;
        }
        
        requestAnimationFrame(this.gameLoop.bind(this));
        
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

// 当页面加载完成时初始化游戏
document.addEventListener('DOMContentLoaded', () => {
    const canvas = document.getElementById('tetrisCanvas');
    if (canvas) {
        // 设置画布大小
        const container = canvas.parentElement;
        canvas.width = container.clientWidth;
        canvas.height = 400;

        // 初始化游戏
        new TetrisGame(canvas);
    }
});