---
permalink: /funzone/
title: "Fun Zone"
except: "Play Snake Game"
author_profile: true
---

<div style="width: 100%; max-width: 800px; margin: 20px auto; padding: 20px; background-color: #f8f9fa; border-radius: 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
    <h3 style="text-align: center; margin-bottom: 15px;">Snake Game</h3>
    <p style="text-align: center; margin-bottom: 15px;">Use arrow keys or WASD to control the snake. Eat the red food to grow longer!</p>
    <div style="width: 100%; position: relative;">
        <canvas id="snakeCanvas" style="border: 2px solid #dee2e6; border-radius: 4px;"></canvas>
    </div>
</div>

<script src="/assets/js/snake.js"></script>
<script>
// 阻止方向键滚动页面
document.addEventListener('keydown', function(e) {
    if([37, 38, 39, 40].indexOf(e.keyCode) > -1) {
        e.preventDefault();
    }
});
</script>