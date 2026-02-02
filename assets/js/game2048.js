class Game2048 {
    constructor(canvas) {
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d');
        this.gridSize = 4;
        this.cellSize = 0;
        this.padding = 0;
        this.board = [];
        this.score = 0;
        this.highScore = parseInt(localStorage.getItem('game2048HighScore')) || 0;
        this.gameOver = false;
        this.isPaused = false;
        this.won = false;
        this.animationId = null;
        this.keyHandler = this.handleKeyPress.bind(this);
        
        // 颜色配置
        this.colors = {
            0: '#cdc1b4',
            2: '#eee4da',
            4: '#ede0c8',
            8: '#f2b179',
            16: '#f59563',
            32: '#f67c5f',
            64: '#f65e3b',
            128: '#edcf72',
            256: '#edcc61',
            512: '#edc850',
            1024: '#edc53f',
            2048: '#edc22e',
            4096: '#3c3a32',
            8192: '#3c3a32'
        };
        
        this.textColors = {
            0: '#776e65',
            2: '#776e65',
            4: '#776e65',
            8: '#f9f6f2',
            16: '#f9f6f2',
            32: '#f9f6f2',
            64: '#f9f6f2',
            128: '#f9f6f2',
            256: '#f9f6f2',
            512: '#f9f6f2',
            1024: '#f9f6f2',
            2048: '#f9f6f2',
            4096: '#f9f6f2',
            8192: '#f9f6f2'
        };
        
        this.init();
    }
    
    init() {
        this.calculateDimensions();
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

    calculateDimensions() {
        const minSize = Math.min(this.canvas.width, this.canvas.height);
        this.padding = minSize * 0.03;
        const totalPadding = this.padding * (this.gridSize + 1);
        this.cellSize = (minSize - totalPadding) / this.gridSize;
        
        // 居中偏移
        this.offsetX = (this.canvas.width - minSize) / 2 + this.padding;
        this.offsetY = (this.canvas.height - minSize) / 2 + this.padding;
    }

    reset() {
        this.board = Array(this.gridSize).fill().map(() => Array(this.gridSize).fill(0));
        this.score = 0;
        this.gameOver = false;
        this.isPaused = false;
        this.won = false;
        
        // 初始生成两个方块
        this.addRandomTile();
        this.addRandomTile();
        
        this.updateScoreDisplay();
        this.draw();
    }
    
    togglePause() {
        if (this.gameOver || this.won) return;
        this.isPaused = !this.isPaused;
        this.draw();
    }
    
    addRandomTile() {
        const emptyCells = [];
        for (let r = 0; r < this.gridSize; r++) {
            for (let c = 0; c < this.gridSize; c++) {
                if (this.board[r][c] === 0) {
                    emptyCells.push({r, c});
                }
            }
        }
        
        if (emptyCells.length > 0) {
            const randomCell = emptyCells[Math.floor(Math.random() * emptyCells.length)];
            // 90%概率生成2，10%概率生成4
            this.board[randomCell.r][randomCell.c] = Math.random() < 0.9 ? 2 : 4;
        }
    }
    
    handleKeyPress(event) {
        if (event.code === 'Space') {
            event.preventDefault();
            if (this.gameOver || this.won) {
                this.reset();
            } else {
                this.togglePause();
                updatePauseButton('game2048');
            }
            return;
        }

        if (this.isPaused || this.gameOver) return;
        
        let moved = false;
        
        switch(event.key) {
            case 'ArrowLeft':
            case 'a':
            case 'A':
                event.preventDefault();
                moved = this.moveLeft();
                break;
            case 'ArrowRight':
            case 'd':
            case 'D':
                event.preventDefault();
                moved = this.moveRight();
                break;
            case 'ArrowUp':
            case 'w':
            case 'W':
                event.preventDefault();
                moved = this.moveUp();
                break;
            case 'ArrowDown':
            case 's':
            case 'S':
                event.preventDefault();
                moved = this.moveDown();
                break;
        }
        
        if (moved) {
            this.addRandomTile();
            this.updateScoreDisplay();
            this.draw();
            
            // 检查胜利条件
            if (!this.won && this.hasWon()) {
                this.won = true;
                this.draw();
                return;
            }
            
            // 检查游戏结束
            if (this.isGameOver()) {
                this.gameOver = true;
                this.draw();
            }
        }
    }
    
    moveLeft() {
        let moved = false;
        for (let r = 0; r < this.gridSize; r++) {
            const row = this.board[r].filter(val => val !== 0);
            const merged = [];
            
            for (let i = 0; i < row.length; i++) {
                if (i < row.length - 1 && row[i] === row[i + 1] && !merged.includes(i)) {
                    row[i] *= 2;
                    this.score += row[i];
                    row.splice(i + 1, 1);
                    merged.push(i);
                    moved = true;
                }
            }
            
            // 补齐0
            while (row.length < this.gridSize) {
                row.push(0);
            }
            
            // 检查是否移动
            for (let c = 0; c < this.gridSize; c++) {
                if (this.board[r][c] !== row[c]) {
                    moved = true;
                }
                this.board[r][c] = row[c];
            }
        }
        return moved;
    }
    
    moveRight() {
        let moved = false;
        for (let r = 0; r < this.gridSize; r++) {
            const row = this.board[r].filter(val => val !== 0);
            const merged = [];
            
            for (let i = row.length - 1; i >= 0; i--) {
                if (i > 0 && row[i] === row[i - 1] && !merged.includes(i)) {
                    row[i] *= 2;
                    this.score += row[i];
                    row.splice(i - 1, 1);
                    merged.push(i);
                    moved = true;
                    i--;
                }
            }
            
            // 在前面补齐0
            while (row.length < this.gridSize) {
                row.unshift(0);
            }
            
            for (let c = 0; c < this.gridSize; c++) {
                if (this.board[r][c] !== row[c]) {
                    moved = true;
                }
                this.board[r][c] = row[c];
            }
        }
        return moved;
    }
    
    moveUp() {
        let moved = false;
        for (let c = 0; c < this.gridSize; c++) {
            const col = [];
            for (let r = 0; r < this.gridSize; r++) {
                if (this.board[r][c] !== 0) {
                    col.push(this.board[r][c]);
                }
            }
            
            const merged = [];
            for (let i = 0; i < col.length; i++) {
                if (i < col.length - 1 && col[i] === col[i + 1] && !merged.includes(i)) {
                    col[i] *= 2;
                    this.score += col[i];
                    col.splice(i + 1, 1);
                    merged.push(i);
                    moved = true;
                }
            }
            
            while (col.length < this.gridSize) {
                col.push(0);
            }
            
            for (let r = 0; r < this.gridSize; r++) {
                if (this.board[r][c] !== col[r]) {
                    moved = true;
                }
                this.board[r][c] = col[r];
            }
        }
        return moved;
    }
    
    moveDown() {
        let moved = false;
        for (let c = 0; c < this.gridSize; c++) {
            const col = [];
            for (let r = 0; r < this.gridSize; r++) {
                if (this.board[r][c] !== 0) {
                    col.push(this.board[r][c]);
                }
            }
            
            const merged = [];
            for (let i = col.length - 1; i >= 0; i--) {
                if (i > 0 && col[i] === col[i - 1] && !merged.includes(i)) {
                    col[i] *= 2;
                    this.score += col[i];
                    col.splice(i - 1, 1);
                    merged.push(i);
                    moved = true;
                    i--;
                }
            }
            
            while (col.length < this.gridSize) {
                col.unshift(0);
            }
            
            for (let r = 0; r < this.gridSize; r++) {
                if (this.board[r][c] !== col[r]) {
                    moved = true;
                }
                this.board[r][c] = col[r];
            }
        }
        return moved;
    }
    
    hasWon() {
        for (let r = 0; r < this.gridSize; r++) {
            for (let c = 0; c < this.gridSize; c++) {
                if (this.board[r][c] === 2048) {
                    return true;
                }
            }
        }
        return false;
    }
    
    isGameOver() {
        // 检查是否有空格
        for (let r = 0; r < this.gridSize; r++) {
            for (let c = 0; c < this.gridSize; c++) {
                if (this.board[r][c] === 0) {
                    return false;
                }
            }
        }
        
        // 检查是否可以合并
        for (let r = 0; r < this.gridSize; r++) {
            for (let c = 0; c < this.gridSize; c++) {
                const val = this.board[r][c];
                if ((r < this.gridSize - 1 && this.board[r + 1][c] === val) ||
                    (c < this.gridSize - 1 && this.board[r][c + 1] === val)) {
                    return false;
                }
            }
        }
        
        return true;
    }

    updateScoreDisplay() {
        updateScoreDisplay('game2048', this.score);
        if (this.score > this.highScore) {
            this.highScore = this.score;
            localStorage.setItem('game2048HighScore', this.highScore);
        }
        updateHighScoreDisplay('game2048', this.highScore);
    }
    
    draw() {
        // 清空画布
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        
        // 绘制背景
        this.ctx.fillStyle = '#bbada0';
        this.roundRect(0, 0, this.canvas.width, this.canvas.height, 10);
        this.ctx.fill();
        
        // 绘制游戏板背景
        const boardSize = this.cellSize * this.gridSize + this.padding * (this.gridSize + 1);
        this.ctx.fillStyle = '#bbada0';
        this.roundRect(
            this.offsetX - this.padding,
            this.offsetY - this.padding,
            boardSize,
            boardSize,
            6
        );
        this.ctx.fill();
        
        // 绘制每个格子
        for (let r = 0; r < this.gridSize; r++) {
            for (let c = 0; c < this.gridSize; c++) {
                const x = this.offsetX + c * (this.cellSize + this.padding);
                const y = this.offsetY + r * (this.cellSize + this.padding);
                const value = this.board[r][c];
                
                // 绘制格子背景
                this.ctx.fillStyle = this.colors[value] || '#3c3a32';
                this.roundRect(x, y, this.cellSize, this.cellSize, 4);
                this.ctx.fill();
                
                // 绘制数字
                if (value !== 0) {
                    this.ctx.fillStyle = this.textColors[value] || '#f9f6f2';
                    this.ctx.font = `bold ${this.getFontSize(value)}px Arial`;
                    this.ctx.textAlign = 'center';
                    this.ctx.textBaseline = 'middle';
                    this.ctx.fillText(
                        value.toString(),
                        x + this.cellSize / 2,
                        y + this.cellSize / 2 + 2
                    );
                }
            }
        }
        
        if (this.isPaused) {
            this.drawPauseScreen();
        }
        
        if (this.won && !this.isPaused) {
            this.drawWinScreen();
        }
        
        if (this.gameOver) {
            this.drawGameOver();
        }
    }

    getFontSize(value) {
        const digits = value.toString().length;
        if (digits <= 2) return this.cellSize * 0.55;
        if (digits === 3) return this.cellSize * 0.45;
        return this.cellSize * 0.35;
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
    
    drawPauseScreen() {
        this.ctx.save();
        
        this.ctx.fillStyle = 'rgba(238, 228, 218, 0.8)';
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
        
        this.ctx.fillStyle = '#8f7a66';
        this.ctx.font = 'bold 36px Arial';
        this.ctx.textAlign = 'center';
        this.ctx.textBaseline = 'middle';
        this.ctx.fillText('游戏暂停', this.canvas.width / 2, this.canvas.height / 2 - 20);
        this.ctx.font = '18px Arial';
        this.ctx.fillText('按空格键或点击继续按钮继续', this.canvas.width / 2, this.canvas.height / 2 + 25);
        
        this.ctx.restore();
    }

    drawWinScreen() {
        this.ctx.save();
        
        this.ctx.fillStyle = 'rgba(237, 194, 46, 0.8)';
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
        
        this.ctx.fillStyle = '#f9f6f2';
        this.ctx.font = 'bold 48px Arial';
        this.ctx.textAlign = 'center';
        this.ctx.textBaseline = 'middle';
        this.ctx.fillText('你赢了!', this.canvas.width / 2, this.canvas.height / 2 - 30);
        this.ctx.font = '20px Arial';
        this.ctx.fillText('按空格键继续游戏', this.canvas.width / 2, this.canvas.height / 2 + 30);
        
        this.ctx.restore();
    }

    drawGameOver() {
        this.ctx.save();
        
        this.ctx.fillStyle = 'rgba(238, 228, 218, 0.9)';
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
        
        this.ctx.fillStyle = '#776e65';
        this.ctx.font = 'bold 36px Arial';
        this.ctx.textAlign = 'center';
        this.ctx.textBaseline = 'middle';
        this.ctx.fillText('游戏结束!', this.canvas.width / 2, this.canvas.height / 2 - 50);
        this.ctx.font = '24px Arial';
        this.ctx.fillText(
            `最终得分: ${this.score}`,
            this.canvas.width / 2,
            this.canvas.height / 2
        );
        this.ctx.font = '18px Arial';
        this.ctx.fillText(
            '按空格键或点击重新开始按钮',
            this.canvas.width / 2,
            this.canvas.height / 2 + 45
        );
        
        this.ctx.restore();
    }
}
