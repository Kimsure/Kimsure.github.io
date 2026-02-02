---
permalink: /funzone/
title: "Fun Zone"
except: "Play Games"
author_profile: false
layout: default
---

<style>
body { 
  background-color: #f8f9fa;
  margin: 0;
  padding: 0;
  min-height: 100vh;
}
.masthead, .page__footer { display: none; }
.game-container {
  max-width: 1200px;
  margin: 40px auto;
  padding: 20px;
}
.game-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
  padding: 0 10px;
}
.back-btn {
  background: #007bff;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 8px;
  cursor: pointer;
  font-size: 16px;
  text-decoration: none;
  display: inline-flex;
  align-items: center;
  gap: 8px;
  transition: background 0.2s;
}
.back-btn:hover {
  background: #0056b3;
  color: white;
  text-decoration: none;
}
.game-selection {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 20px;
  margin-bottom: 40px;
}
.game-card {
  background: white;
  border-radius: 12px;
  padding: 20px;
  box-shadow: 0 4px 6px rgba(0,0,0,0.1);
  cursor: pointer;
  transition: transform 0.2s;
}
.game-card:hover {
  transform: translateY(-5px);
}
.game-card.active {
  border: 2px solid #007bff;
}
.game-card h3 {
  margin: 10px 0;
  color: #333;
}
.game-card p {
  color: #666;
  font-size: 14px;
  margin-bottom: 10px;
}
.game-preview {
  width: 100%;
  height: 150px;
  background: #f0f0f0;
  border-radius: 8px;
  margin-bottom: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
}
.game-area {
  background: white;
  padding: 20px;
  border-radius: 12px;
  box-shadow: 0 4px 6px rgba(0,0,0,0.1);
}
.game-controls {
  display: flex;
  justify-content: center;
  gap: 15px;
  margin-bottom: 15px;
  flex-wrap: wrap;
}
.control-btn {
  background: #28a745;
  color: white;
  border: none;
  padding: 10px 25px;
  border-radius: 8px;
  cursor: pointer;
  font-size: 16px;
  font-weight: 500;
  transition: background 0.2s, transform 0.1s;
}
.control-btn:hover {
  background: #218838;
  transform: translateY(-2px);
}
.control-btn:active {
  transform: translateY(0);
}
.control-btn.paused {
  background: #ffc107;
  color: #212529;
}
.control-btn.paused:hover {
  background: #e0a800;
}
.game-info {
  display: flex;
  justify-content: center;
  gap: 30px;
  margin-bottom: 15px;
  flex-wrap: wrap;
}
.score-display {
  font-size: 18px;
  font-weight: bold;
  color: #333;
  background: #f8f9fa;
  padding: 8px 16px;
  border-radius: 8px;
  border: 2px solid #dee2e6;
}
.instructions {
  background: #f8f9fa;
  padding: 15px;
  border-radius: 8px;
  margin-bottom: 15px;
  text-align: center;
  color: #666;
  font-size: 14px;
}
.instructions strong {
  color: #333;
}
</style>

<div class="game-container">
  <div class="game-header">
    <h2 style="margin: 0; color: #333;">🎮 Fun Zone</h2>
    <a href="/" class="back-btn">← 返回主页</a>
  </div>

  <div class="game-selection">
    <div class="game-card active" onclick="selectGame('snake')">
      <div class="game-preview">
        <svg width="100" height="100" viewBox="0 0 100 100">
          <rect x="20" y="20" width="15" height="15" fill="#28a745"/>
          <rect x="35" y="20" width="15" height="15" fill="#198754"/>
          <rect x="50" y="20" width="15" height="15" fill="#198754"/>
          <circle cx="75" cy="20" r="7.5" fill="#dc3545"/>
        </svg>
      </div>
      <h3>贪吃蛇</h3>
      <p>经典的贪吃蛇游戏，使用方向键或WASD控制蛇移动，吃到食物可以变长。</p>
    </div>
    <div class="game-card" onclick="selectGame('tetris')">
      <div class="game-preview">
        <svg width="100" height="100" viewBox="0 0 100 100">
          <rect x="30" y="20" width="15" height="15" fill="#00f0f0"/>
          <rect x="45" y="20" width="15" height="15" fill="#00f0f0"/>
          <rect x="45" y="35" width="15" height="15" fill="#00f0f0"/>
          <rect x="45" y="50" width="15" height="15" fill="#00f0f0"/>
        </svg>
      </div>
      <h3>俄罗斯方块</h3>
      <p>经典的俄罗斯方块游戏，使用方向键或WASD控制方块移动和旋转。</p>
    </div>
    <div class="game-card" onclick="selectGame('game2048')">
      <div class="game-preview">
        <svg width="100" height="100" viewBox="0 0 100 100">
          <rect x="15" y="15" width="32" height="32" fill="#edc22e" rx="4"/>
          <text x="31" y="38" font-size="20" fill="#f9f6f2" text-anchor="middle" font-weight="bold">2</text>
          <rect x="53" y="15" width="32" height="32" fill="#f2b179" rx="4"/>
          <text x="69" y="38" font-size="20" fill="#f9f6f2" text-anchor="middle" font-weight="bold">4</text>
          <rect x="15" y="53" width="32" height="32" fill="#f2b179" rx="4"/>
          <text x="31" y="76" font-size="20" fill="#f9f6f2" text-anchor="middle" font-weight="bold">4</text>
          <rect x="53" y="53" width="32" height="32" fill="#edc22e" rx="4"/>
          <text x="69" y="76" font-size="20" fill="#f9f6f2" text-anchor="middle" font-weight="bold">2</text>
        </svg>
      </div>
      <h3>2048</h3>
      <p>合并相同的数字方块，挑战能否达到2048！使用方向键或WASD控制。</p>
    </div>
  </div>
  
  <div class="game-area">
    <!-- 贪吃蛇游戏 -->
    <div id="snake-game" style="display: none;">
      <div class="game-info">
        <span class="score-display">得分: <span id="snake-score">0</span></span>
        <span class="score-display">最高分: <span id="snake-highscore">0</span></span>
      </div>
      <div class="game-controls">
        <button class="control-btn" id="snake-pause-btn" onclick="togglePause('snake')">暂停</button>
        <button class="control-btn" onclick="restartGame('snake')">重新开始</button>
      </div>
      <div class="instructions">
        <strong>操作说明：</strong>使用方向键 ↑↓←→ 或 WASD 控制蛇的移动 | 空格键或点击暂停按钮暂停游戏
      </div>
      <div style="width: 100%; position: relative;">
        <canvas id="snakeCanvas" style="border: 2px solid #dee2e6; border-radius: 4px; display: block; margin: 0 auto;"></canvas>
      </div>
    </div>

    <!-- 俄罗斯方块游戏 -->
    <div id="tetris-game" style="display: none;">
      <div class="game-info">
        <span class="score-display">得分: <span id="tetris-score">0</span></span>
        <span class="score-display">消除行数: <span id="tetris-lines">0</span></span>
        <span class="score-display">等级: <span id="tetris-level">1</span></span>
      </div>
      <div class="game-controls">
        <button class="control-btn" id="tetris-pause-btn" onclick="togglePause('tetris')">暂停</button>
        <button class="control-btn" onclick="restartGame('tetris')">重新开始</button>
      </div>
      <div class="instructions">
        <strong>操作说明：</strong>←→ 左右移动 | ↓ 加速下降 | ↑ 或 W 旋转 | 空格键或点击暂停按钮暂停游戏
      </div>
      <div style="width: 100%; position: relative;">
        <canvas id="tetrisCanvas" style="border: 2px solid #dee2e6; border-radius: 4px; display: block; margin: 0 auto;"></canvas>
      </div>
    </div>

    <!-- 2048游戏 -->
    <div id="game2048-game" style="display: none;">
      <div class="game-info">
        <span class="score-display">得分: <span id="game2048-score">0</span></span>
        <span class="score-display">最高分: <span id="game2048-highscore">0</span></span>
      </div>
      <div class="game-controls">
        <button class="control-btn" id="game2048-pause-btn" onclick="togglePause('game2048')">暂停</button>
        <button class="control-btn" onclick="restartGame('game2048')">重新开始</button>
      </div>
      <div class="instructions">
        <strong>操作说明：</strong>使用方向键 ↑↓←→ 或 WASD 移动所有方块 | 相同数字的方块会合并 | 空格键或点击暂停按钮暂停游戏
      </div>
      <div style="width: 100%; position: relative;">
        <canvas id="game2048Canvas" style="border: 2px solid #dee2e6; border-radius: 4px; display: block; margin: 0 auto;"></canvas>
      </div>
    </div>
  </div>
</div>

<script>
let games = {
  snake: null,
  tetris: null,
  game2048: null
};

function selectGame(game) {
  // 更新选中状态
  document.querySelectorAll('.game-card').forEach(card => card.classList.remove('active'));
  event.currentTarget.classList.add('active');
  
  // 清理当前游戏实例
  Object.keys(games).forEach(key => {
    if (games[key]) {
      games[key].destroy();
      games[key] = null;
    }
  });
  
  // 隐藏所有游戏
  document.querySelectorAll('[id$="-game"]').forEach(gameDiv => {
    gameDiv.style.display = 'none';
  });
  
  // 显示选中的游戏
  const selectedGame = document.getElementById(`${game}-game`);
  if (selectedGame) {
    selectedGame.style.display = 'block';
    // 重新初始化游戏画布
    const canvas = selectedGame.querySelector('canvas');
    if (canvas) {
      const container = canvas.parentElement;
      canvas.width = Math.min(container.clientWidth, 600);
      canvas.height = 400;
      
      // 初始化对应的游戏
      if (game === 'snake') {
        games.snake = new SnakeGame(canvas);
      } else if (game === 'tetris') {
        games.tetris = new TetrisGame(canvas);
      } else if (game === 'game2048') {
        games.game2048 = new Game2048(canvas);
      }
    }
  }
}

function togglePause(game) {
  if (games[game]) {
    games[game].togglePause();
    updatePauseButton(game);
  }
}

function updatePauseButton(game) {
  const btn = document.getElementById(`${game}-pause-btn`);
  if (btn && games[game]) {
    btn.textContent = games[game].isPaused ? '继续' : '暂停';
    btn.classList.toggle('paused', games[game].isPaused);
  }
}

function restartGame(game) {
  if (games[game]) {
    games[game].reset();
    updatePauseButton(game);
  }
}

// 更新分数显示的辅助函数
function updateScoreDisplay(game, score) {
  const scoreEl = document.getElementById(`${game}-score`);
  if (scoreEl) scoreEl.textContent = score;
}

function updateHighScoreDisplay(game, score) {
  const highScoreEl = document.getElementById(`${game}-highscore`);
  if (highScoreEl) highScoreEl.textContent = score;
}
</script>

<script src="/assets/js/snake.js"></script>
<script src="/assets/js/tetris.js"></script>
<script src="/assets/js/game2048.js"></script>
<script>
// 默认显示贪吃蛇游戏
document.addEventListener('DOMContentLoaded', () => {
  // 手动触发第一个游戏卡片点击
  const firstCard = document.querySelector('.game-card');
  if (firstCard) {
    firstCard.click();
  }
});

// 阻止方向键滚动页面
document.addEventListener('keydown', function(e) {
    if([37, 38, 39, 40].indexOf(e.keyCode) > -1) {
        e.preventDefault();
    }
});
</script>
