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
</style>

<div class="game-container">
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
    <div class="game-card" onclick="alert('即将推出!')">
      <div class="game-preview">
        <svg width="100" height="100" viewBox="0 0 100 100">
          <rect x="20" y="20" width="60" height="60" fill="#f0f0f0" stroke="#666" stroke-width="2"/>
          <text x="50" y="60" font-size="24" fill="#666" text-anchor="middle">2048</text>
        </svg>
      </div>
      <h3>2048</h3>
      <p>即将推出！合并相同的数字，看看你能否达到2048。</p>
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
  </div>
  
  <div class="game-area">
    <div id="snake-game" style="display: none;">
      <h3 style="text-align: center; margin-bottom: 15px;">贪吃蛇</h3>
      <p style="text-align: center; margin-bottom: 15px;">使用方向键或WASD控制蛇的移动，吃到红色食物可以变长！</p>
      <div style="width: 100%; position: relative;">
        <canvas id="snakeCanvas" style="border: 2px solid #dee2e6; border-radius: 4px;"></canvas>
      </div>
    </div>
    <div id="tetris-game" style="display: none;">
      <h3 style="text-align: center; margin-bottom: 15px;">俄罗斯方块</h3>
      <p style="text-align: center; margin-bottom: 15px;">使用方向键或WASD控制方块：左右移动、向下加速、向上旋转。消除整行可以得分！</p>
      <div style="width: 100%; position: relative;">
        <canvas id="tetrisCanvas" style="border: 2px solid #dee2e6; border-radius: 4px;"></canvas>
      </div>
    </div>
  </div>
</div>

<script>
function selectGame(game) {
  // 更新选中状态
  document.querySelectorAll('.game-card').forEach(card => card.classList.remove('active'));
  document.querySelector(`.game-card[onclick*="${game}"]`).classList.add('active');
  
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
      canvas.width = container.clientWidth;
      canvas.height = 400;
      
      // 初始化对应的游戏
      if (game === 'snake') {
        new SnakeGame(canvas);
      } else if (game === 'tetris') {
        new TetrisGame(canvas);
      }
    }
  }
}
</script>

<script src="/assets/js/snake.js"></script>
<script src="/assets/js/tetris.js"></script>
<script>
// 默认显示贪吃蛇游戏
document.addEventListener('DOMContentLoaded', () => {
  selectGame('snake');
});
</script>
<script>
// 阻止方向键滚动页面
document.addEventListener('keydown', function(e) {
    if([37, 38, 39, 40].indexOf(e.keyCode) > -1) {
        e.preventDefault();
    }
});
</script>