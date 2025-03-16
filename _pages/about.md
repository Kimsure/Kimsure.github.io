---
permalink: /
title: ""
excerpt: ""
author_profile: true
redirect_from: 
  - /about/
  - /about.html
---

{% if site.google_scholar_stats_use_cdn %}
{% assign gsDataBaseUrl = "https://cdn.jsdelivr.net/gh/" | append: site.repository | append: "@" %}
{% else %}
{% assign gsDataBaseUrl = "https://raw.githubusercontent.com/" | append: site.repository | append: "/" %}
{% endif %}
{% assign url = gsDataBaseUrl | append: "google-scholar-stats/gs_data_shieldsio.json" %}

<span class='anchor' id='about-me'></span>


I’m a 1st-year Ph.D student at [MMT lab](https://jiminxiao.github.io), University of Liverpool, co-advised by Dr. Siyue Yu and Prof. Jimin Xiao. I'm also fortunate to work closely with Dr. Yi Dong and Prof. Xiaowei Huang, in [Trustworthy Autonomous Cyber-Physical Systems (TACPS) Lab](https://cgi.csc.liv.ac.uk/~acps/home/).

Prior to that, I worked as a camera engineer for [vivo Mobile Communication Ltd](https://www.vivo.com), focusing on Auto-Foucs & Image-Stablization.

I got my M.Eng. degree at [MePro](http://mepro.bjtu.edu.cn) (Group Leader: Yao Zhao, IEEE Fellow), Beijing Jiaotong University, advised by Associate Prof. Meiqin Liu and Chao Yao.



My research interests cover a range of computer vision and deep learning, including image & video low-level vision, e.g. super-resolution, denoising, low-light enhancement, etc. and semantic segmentation under various supervisory conditions, including weakly supervised, zero-shot and continual learning environments. My research is primarily concentrated on open-vocabulary segmentation tasks and semantic-guided low-level vision.

<!--
neural machine translation and computer vision. I have published more than 100 papers at the top international AI conferences with total <a href='https://scholar.google.com/citations?user=DhtAFkwAAAAJ'>google scholar citations <strong><span id='total_cit'>260000+</span></strong></a> (You can also use google scholar badge <a href='https://scholar.google.com/citations?user=DhtAFkwAAAAJ'><img src="https://img.shields.io/endpoint?url={{ url | url_encode }}&logo=Google%20Scholar&labelColor=f6f6f6&color=9cf&style=flat&label=citations"></a>).
-->

# 🔥 News
- *2023.10*: &nbsp;🎉🎉 Two papers accepted by ACM MM 2023. 
- *2023.04*: &nbsp;🎉🎉 One paper accepted by T-CSVT.

# 📝 Publications 

<div class='paper-box'><div class='paper-box-image'><div><div class="badge">ACM MM 2023</div><img src='images/KSNet.png' alt="sym" width="100%"></div></div>
<div class='paper-box-text' markdown="1">

[Kernel Dimension Matters: To Activate Available Kernels for Real-time Video Super-Resolution](https://dl.acm.org/doi/pdf/10.1145/3581783.3611908)

**Shuo Jin**, Meiqin Liu, Chao Yao, Chunyu Lin, Yao Zhao
<!-- [**Project**](https://github.com/jxtse/GEC_Metrics_LLM) <strong><span class='show_paper_citations' data='DhtAFkwAAAAJ:ALROH1vI_8AC'></span></strong> | <a href="">Link to paper</a> -->
</div>
</div>

<div class='paper-box'><div class='paper-box-image'><div><div class="badge">ACM MM 2023</div><img src='images/CLG-INet.png' alt="sym" width="100%"></div></div>
<div class='paper-box-text' markdown="1">

[CLG-INet: Coupled Local-Global Interactive Network for Image Restoration](https://dl.acm.org/doi/pdf/10.1145/3581783.3612251)

Yuqi Jiang, Chune ZHANG, **Shuo Jin**, Jiao Liu, Jiapeng Wang
<!-- [**Project**](https://github.com/jxtse/GEC_Metrics_LLM) <strong><span class='show_paper_citations' data='DhtAFkwAAAAJ:ALROH1vI_8AC'></span></strong> | <a href="">Link to paper</a> -->
</div>
</div>

<div class='paper-box'><div class='paper-box-image'><div><div class="badge">IEEE T-CSVT</div><img src='images/TCNet.png' alt="sym" width="100%"></div></div>
<div class='paper-box-text' markdown="1">

[Temporal consistency learning of inter-frames for video super-resolution](https://ieeexplore.ieee.org/abstract/document/9919163)

Meiqin Liu, **Shuo Jin**, Chao Yao, Chunyu Lin, Yao Zhao
<!-- [**Project**](https://github.com/jxtse/GEC_Metrics_LLM) <strong><span class='show_paper_citations' data='DhtAFkwAAAAJ:ALROH1vI_8AC'></span></strong> | <a href="">Link to paper</a> -->
</div>
</div>

<!--
# 🎖 Honors and Awards
- *2023.03* Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus ornare aliquet ipsum, ac tempus justo dapibus sit amet. 
- *2023.06* Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus ornare aliquet ipsum, ac tempus justo dapibus sit amet. 
-->
# 📖 Educations

- *2024.09 - present*, Ph.D in Computer Science, University of Liverpool.
- *2021.09 - 2023.06*, M.Eng in Electronic Engineering, Beijing Jiaotong University.


<!--
# 💬 Invited Talks
-->

# 💻 Works & Internships

- *2023.07 - 2024.08 (full-time)*, vivo Mobile Communication Ltd.

# 💻 Social Work

Reviewer for ACMMM and TIP.

# 🎮 Fun Zone

<div style="width: 100%; max-width: 800px; margin: 20px auto; padding: 20px; background-color: #f8f9fa; border-radius: 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
    <h3 style="text-align: center; margin-bottom: 15px;">Snake Game</h3>
    <p style="text-align: center; margin-bottom: 15px;">Use arrow keys or WASD to control the snake. Eat the red food to grow longer!</p>
    <div style="width: 100%; position: relative;">
        <canvas id="snakeCanvas" style="border: 2px solid #dee2e6; border-radius: 4px;"></canvas>
    </div>
</div>

<script src="/assets/js/snake.js"></script>
