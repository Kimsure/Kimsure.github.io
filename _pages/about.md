---
permalink: /
author_profile: true
stylesheets:
  - /assets/css/home.css
redirect_from:
  - /about/
  - /about.html
---

<span id="about-me"></span>
<h1 class="main-heading">Hi there <img src="images/Hi.gif" width="40px" alt="Waving hand"> Welcome to my Homepage!</h1>

I'm a Ph.D. student at [MMT lab](https://jiminxiao.github.io), University of Liverpool, co-advised by Dr. Siyue Yu, Prof. Jimin Xiao and Dr. Yi Dong. I'm also fortunate to work closely with Dr. [Mingjie Sun](https://scst.suda.edu.cn/0f/92/c11250a528274/page.htm) from [Soochow University](https://www.suda.edu.cn) and Dr. [Bingfeng Zhang](https://zbf1991.github.io/) from [China University of Petroleum (East China)](https://www.upc.edu.cn).

Previously, I worked as a camera engineer at [vivo Mobile Communication Ltd](https://www.vivo.com), focusing on auto-focus and image stabilization. I graduated from [MePro](http://mepro.bjtu.edu.cn) led by Prof. [Yao Zhao](https://faculty.bjtu.edu.cn/5900/) (**IEEE Fellow**), at Beijing Jiaotong University, advised by Prof. [Meiqin Liu](https://faculty.bjtu.edu.cn/8002/) and Prof. [Chao Yao](https://yaochao1986.github.io/).

My research focuses on **open-vocabulary dense perception**, **multimodal visual grounding**, **concept/reasoning/text-guided segmentation** and **multimodal large language models**, with <a href="{{ site.author.googlescholar }}"><span id="total_cit">Google Scholar</span> citations</a>.

News
---------------
<span id="-news"></span>
<div class="news-box">
  <ul class="news-list">
    <li><span class="news-date"><em>2026.07</em></span> 🎉🎉 One regular paper accepted by ECCV 2026.</li>
    <li><span class="news-date"><em>2026.05</em></span> 🎉🎉 One regular paper accepted by ICML 2026.</li>
    <li><span class="news-date"><em>2026.03</em></span> 🎉🎉 One regular paper and one Findings paper accepted by CVPR 2026.</li>
    <li><span class="news-date"><em>2025.08</em></span> 🎉🎉 SFP selected as an ICCV 2025 Highlight paper. Many thanks to all co-authors!</li>
    <li><span class="news-date"><em>2025.06</em></span> 🎉🎉 One regular paper accepted by ICCV 2025.</li>
    <li><span class="news-date"><em>2023.10</em></span> 🎉🎉 Two regular papers accepted by ACM MM 2023.</li>
    <li><span class="news-date"><em>2023.04</em></span> 🎉🎉 One regular paper accepted by IEEE T-CSVT.</li>
  </ul>
</div>

Experience
--------------
<span id="-educations"></span>
<span id="-internships"></span>
<div class="experience-container">
  <div class="experience-card">
    <img src="images/liverpool.svg" alt="University of Liverpool" class="experience-logo">
    <div class="experience-info">
      <strong>University of Liverpool</strong><br>
      <em>2024.09 - Present</em><br>
      Ph.D. in Computer Science<br>
      <span style="color:#888;">MMT lab, co-advised by Dr. Siyue Yu, Prof. Jimin Xiao, and Dr. Yi Dong.</span>
    </div>
  </div>

  <div class="experience-card">
    <img src="images/vivo.svg" alt="vivo Mobile Communication Ltd." class="experience-logo">
    <div class="experience-info">
      <strong>vivo Mobile Communication Ltd.</strong><br>
      <em>2023.07 - 2024.08</em><br>
      Camera Engineer<br>
      <span style="color:#888;">Auto-focus and image stabilization.</span>
    </div>
  </div>

  <div class="experience-card">
    <img src="images/bjtu.png" alt="Beijing Jiaotong University" class="experience-logo">
    <div class="experience-info">
      <strong>Beijing Jiaotong University</strong><br>
      <em>2021.09 - 2023.06</em><br>
      M.Eng. in Electronic Engineering<br>
      <span style="color:#888;">MePro, advised by Prof. Meiqin Liu and Prof. Chao Yao.</span>
    </div>
  </div>
</div>

Publications
--------------
<span id="-publications"></span>
<button class="pub-button active" onclick="filterPublications(event, 'all')">Core Publications</button>
<button class="pub-button" onclick="filterPublications(event, 'list')">Full Publications List</button>

(* equal contribution · &Dagger; project leader)

<div id="core-publications" class="publication-view" data-publication-view="core">
<h3 id="preprint">Preprint</h3>
<div class="publication-card" data-category="all">
  <div style="display: flex; align-items: center;">
    <div class="pub-media-rotator" data-interval="4000" style="position: relative; width: 320px; height: 180px; margin-right: 20px; border-radius: 8px; overflow: hidden; flex: 0 0 auto;">
      <img src="images/TAG.png" alt="TAG method overview: calibrating frozen SAM3 with trainable adapters and image-level supervision" style="width: 320px; height: 180px; object-fit: contain; display: block; margin: 0 auto;">
    </div>
    <div>
      <strong>TAG: Calibrating SAM3 for Universal Image Segmentation without Dense Supervision</strong><br>
      <i style="font-size: 13px;">Hao Zhu, Heyu Sun, <a href="{{ site.url }}" target="_blank"><strong>Shuo Jin</strong></a>, Jiayu Xiao, Feng Dai.</i><br>
      Calibrating SAM3 for universal image segmentation with image-level supervision and confidence-weighted distillation.
      <br>
      <a href="https://arxiv.org/abs/2610.14651"><em>[arxiv]</em></a>
    </div>
  </div>
</div>

<h3 id="publication">Publication</h3>
<!--
<div class="publication-card" data-category="all">
  <div style="display: flex; align-items: center;">
    <div class="pub-media-rotator" data-interval="4000" style="position: relative; width: 320px; height: 180px; margin-right: 20px; border-radius: 8px; overflow: hidden; flex: 0 0 auto;">
      <img src="images/Bound3D.png" alt="Don't Starve the Boundaries: Boundary-Constrained Label Propagation for Weakly Supervised 3D Segmentation" style="width: 320px; height: 180px; object-fit: contain; display: block; margin: 0 auto;">
    </div>
    <div>
      <strong>Don't Starve the Boundaries: Boundary-Constrained Label Propagation for Weakly Supervised 3D Segmentation</strong><br>
      <i style="font-size: 13px;">Shuwei Wu, <a href="{{ site.url }}" target="_blank"><strong>Shuo Jin</strong></a>, Zhijin He, Siyue Yu, ENG GEE LIM, Qiufeng Wang, Jimin Xiao.</i><br>
      Boundary-aware pseudo-label propagation for weakly supervised point-cloud segmentation.
      <br>
      <b><i style="color:#83a1c7;">ECCV 2026 &nbsp;</i></b>
      <a href="https://media.eventhosts.cc/Conferences/ECCV2026/pdfs/12260.pdf"><em>[paper]</em></a>
      <a href="/Bound3D/"><em>[project]</em></a>
      <a href="https://github.com/Kimsure/Bound3D"><em>[code]</em></a>
      <a href="/images/poster/poster_eccv26_bound3D.pdf"><em>[poster]</em></a>
    </div>
  </div>
</div>
-->

<div class="publication-card" data-category="all">
  <div style="display: flex; align-items: center;">
    <div class="pub-media-rotator" data-interval="4000" style="position: relative; width: 320px; height: 180px; margin-right: 20px; border-radius: 8px; overflow: hidden; flex: 0 0 auto;">
      <img src="images/VIP.png" alt="VIP: Visual-guided Prompt Evolution for Efficient Dense Vision-Language Inference" style="width: 320px; height: 180px; object-fit: contain; display: block; margin: 0 auto;">
    </div>
    <div>
      <strong>VIP: Visual-guided Prompt Evolution for Efficient Dense Vision-Language Inference</strong><br>
      <i style="font-size: 13px;">Hao Zhu*, <a href="{{ site.url }}" target="_blank"><strong>Shuo Jin*</strong></a>, Wenbin Liao, Jiayu Xiao, Yan Zhu, Siyue Yu, Feng Dai.</i><br>
      Visually guided prompt evolution for efficient dense vision-language inference.
      <br>
      <b><i style="color:#83a1c7;">ICML 2026 &nbsp;</i></b>
      <a href="https://arxiv.org/abs/2605.12325"><em>[paper]</em></a>
      <a href="/VIP/"><em>[project]</em></a>
      <a href="https://github.com/Kimsure/VIP"><em>[code]</em></a>
      <a href="/images/poster/poster_icml26_VIP.pdf"><em>[poster]</em></a>
    </div>
  </div>
</div>

<div class="publication-card" data-category="all">
  <div style="display: flex; align-items: center;">
    <div class="pub-media-rotator" data-interval="4000" style="position: relative; width: 320px; height: 180px; margin-right: 20px; border-radius: 8px; overflow: hidden; flex: 0 0 auto;">
      <img src="images/TFSSD.png" alt="TF-SSD: A Strong Pipeline via Synergic Mask Filter for Training-free Co-salient Object Detection" style="width: 320px; height: 180px; object-fit: contain; display: block; margin: 0 auto;">
    </div>
    <div>
      <strong>TF-SSD: A Strong Pipeline via Synergic Mask Filter for Training-free Co-salient Object Detection</strong><br>
      <i style="font-size: 13px;">Zhijin He*, <a href="{{ site.url }}" target="_blank"><strong>Shuo Jin*</strong></a>, Siyue Yu, Shuwei Wu, Bingfeng Zhang, Li Yu, Jimin Xiao.</i><br>
      A training-free pipeline combining mask candidates, saliency, and cross-image semantic consistency.
      <br>
      <b><i style="color:#83a1c7;">CVPR 2026 &nbsp;</i></b>
      <a href="https://arxiv.org/abs/2604.00549"><em>[paper]</em></a>
      <a href="/TFSSD/"><em>[project]</em></a>
      <a href="https://github.com/hzz-yy/TF-SSD"><em>[code]</em></a>
      <a href="/images/poster/poster_cvpr26_tfssd.pdf"><em>[poster]</em></a>
    </div>
  </div>
</div>

<div class="publication-card" data-category="all">
  <div style="display: flex; align-items: center;">
    <div class="pub-media-rotator" data-interval="4000" style="position: relative; width: 320px; height: 180px; margin-right: 20px; border-radius: 8px; overflow: hidden; flex: 0 0 auto;">
      <img src="images/TALENT.png" alt="TALENT: Target-aware Efficient Tuning for Referring Image Segmentation" style="width: 320px; height: 180px; object-fit: contain; display: block; margin: 0 auto;">
    </div>
    <div>
      <strong>TALENT: Target-aware Efficient Tuning for Referring Image Segmentation</strong><br>
      <i style="font-size: 13px;"><a href="{{ site.url }}" target="_blank"><strong>Shuo Jin</strong></a>, Siyue Yu, Bingfeng Zhang, Chao Yao, Meiqin Liu, Jimin Xiao.</i><br>
      Target-aware parameter-efficient tuning to ground the instance described by a referring expression.
      <br>
      <b><i style="color:#83a1c7;">CVPR 2026 Findings &nbsp;</i></b>
      <a href="https://arxiv.org/abs/2604.00609"><em>[paper]</em></a>
      <a href="/TALENT/"><em>[project]</em></a>
      <a href="https://github.com/Kimsure/TALENT"><em>[code]</em></a>
      <a href="/images/poster/poster_cvpr26_TALENT.pdf"><em>[poster]</em></a>
    </div>
  </div>
</div>

<div class="publication-card" data-category="all">
  <div style="display: flex; align-items: center;">
    <div class="pub-media-rotator" data-interval="4000" style="position: relative; width: 320px; height: 180px; margin-right: 20px; border-radius: 8px; overflow: hidden; flex: 0 0 auto;">
      <img src="images/SFP.png" alt="Feature Purification Matters: Suppressing Outlier Propagation for Training-Free Open-Vocabulary Semantic Segmentation" style="width: 320px; height: 180px; object-fit: contain; display: block; margin: 0 auto;">
    </div>
    <div>
      <strong>Feature Purification Matters: Suppressing Outlier Propagation for Training-Free Open-Vocabulary Semantic Segmentation</strong><br>
      <i style="font-size: 13px;"><a href="{{ site.url }}" target="_blank"><strong>Shuo Jin</strong></a>, Siyue Yu, Bingfeng Zhang, Mingjie Sun, Yi Dong, Jimin Xiao.</i><br>
      Suppressing attention outliers to improve spatial perception in open-vocabulary segmentation.
      <br>
      <b><i style="color:#83a1c7;">ICCV 2025 Highlight &nbsp;</i></b>
      <a href="https://openaccess.thecvf.com/content/ICCV2025/papers/Jin_Feature_Purification_Matters_Suppressing_Outlier_Propagation_for_Training-Free_Open-Vocabulary_Semantic_ICCV_2025_paper.pdf"><em>[paper]</em></a>
      <a href="/SFP/"><em>[project]</em></a>
      <a href="https://github.com/Kimsure/SFP"><em>[code]</em></a>
      <a href="/images/poster/poster_iccv25_SFP.pdf"><em>[poster]</em></a>
    </div>
  </div>
</div>

<div class="publication-card" data-category="all">
  <div style="display: flex; align-items: center;">
    <div class="pub-media-rotator" data-interval="4000" style="position: relative; width: 320px; height: 180px; margin-right: 20px; border-radius: 8px; overflow: hidden; flex: 0 0 auto;">
      <img src="images/KSNet-method.png" alt="KSNet method overview: kernel-split network with recurrent propagation and inter-frame alignment" style="width: 320px; height: 180px; object-fit: contain; display: block; margin: 0 auto;">
    </div>
    <div>
      <strong>Kernel Dimension Matters: To Activate Available Kernels for Real-time Video Super-Resolution</strong><br>
      <i style="font-size: 13px;"><a href="{{ site.url }}" target="_blank"><strong>Shuo Jin</strong></a>, Meiqin Liu, Chao Yao, Chunyu Lin, Yao Zhao.</i><br>
      Kernel-split design and efficient temporal alignment for real-time video super-resolution.
      <br>
      <b><i style="color:#83a1c7;">ACM MM 2023 &nbsp;</i></b>
      <a href="https://dl.acm.org/doi/pdf/10.1145/3581783.3611908"><em>[paper]</em></a>
      <a href="/KSNet/"><em>[project]</em></a>
      <a href="https://github.com/Kimsure/KSNet"><em>[code]</em></a>
      <a href="/images/poster/poster_acm_0942.pdf"><em>[poster]</em></a>
    </div>
  </div>
</div>
</div>

<div id="full-publications" class="publication-view" data-publication-view="list" hidden>
  <ul class="full-publication-list">
    <li>
      <span class="pub-list-badge">ECCV 2026</span>
      <span class="pub-list-title">Don't Starve the Boundaries: Boundary-Constrained Label Propagation for Weakly Supervised 3D Segmentation</span><br>
      <span class="pub-list-authors">Shuwei Wu, <a href="{{ site.url }}" target="_blank"><strong>Shuo Jin</strong></a>, Zhijin He, Siyue Yu, ENG GEE LIM, Qiufeng Wang, Jimin Xiao.</span>

      <span class="pub-list-links"><a href="https://media.eventhosts.cc/Conferences/ECCV2026/pdfs/12260.pdf">[paper]</a><a href="/Bound3D/">[project]</a><a href="https://github.com/Kimsure/Bound3D">[code]</a><a href="/images/poster/poster_eccv26_bound3D.pdf">[poster]</a></span>
    </li>
    <li>
      <span class="pub-list-badge">ICML 2026</span>
      <span class="pub-list-title">VIP: Visual-guided Prompt Evolution for Efficient Dense Vision-Language Inference</span><br>
      <span class="pub-list-authors">Hao Zhu*, <a href="{{ site.url }}" target="_blank"><strong>Shuo Jin*</strong></a>, Wenbin Liao, Jiayu Xiao, Yan Zhu, Siyue Yu, Feng Dai.</span>

      <span class="pub-list-links"><a href="https://arxiv.org/abs/2605.12325">[paper]</a><a href="/VIP/">[project]</a><a href="https://github.com/Kimsure/VIP">[code]</a><a href="/images/poster/poster_icml26_VIP.pdf">[poster]</a></span>
    </li>
    <li>
      <span class="pub-list-badge">CVPR 2026</span>
      <span class="pub-list-title">TF-SSD: A Strong Pipeline via Synergic Mask Filter for Training-free Co-salient Object Detection</span><br>
      <span class="pub-list-authors">Zhijin He*, <a href="{{ site.url }}" target="_blank"><strong>Shuo Jin*</strong></a>, Siyue Yu, Shuwei Wu, Bingfeng Zhang, Li Yu, Jimin Xiao.</span>

      <span class="pub-list-links"><a href="https://arxiv.org/abs/2604.00549">[paper]</a><a href="/TFSSD/">[project]</a><a href="https://github.com/hzz-yy/TF-SSD">[code]</a><a href="/images/poster/poster_cvpr26_tfssd.pdf">[poster]</a></span>
    </li>
    <li>
      <span class="pub-list-badge">CVPR 2026</span>
      <span class="pub-list-title">TALENT: Target-aware Efficient Tuning for Referring Image Segmentation</span><br>
      <span class="pub-list-authors"><a href="{{ site.url }}" target="_blank"><strong>Shuo Jin</strong></a>, Siyue Yu, Bingfeng Zhang, Chao Yao, Meiqin Liu, Jimin Xiao.</span>
      <span class="pub-list-note">Findings.</span>
      <span class="pub-list-links"><a href="https://arxiv.org/abs/2604.00609">[paper]</a><a href="/TALENT/">[project]</a><a href="https://github.com/Kimsure/TALENT">[code]</a><a href="/images/poster/poster_cvpr26_TALENT.pdf">[poster]</a></span>
    </li>
    <li>
      <span class="pub-list-badge">ICCV 2025</span>
      <span class="pub-list-title">Feature Purification Matters: Suppressing Outlier Propagation for Training-Free Open-Vocabulary Semantic Segmentation</span><br>
      <span class="pub-list-authors"><a href="{{ site.url }}" target="_blank"><strong>Shuo Jin</strong></a>, Siyue Yu, Bingfeng Zhang, Mingjie Sun, Yi Dong, Jimin Xiao.</span>
      <span class="pub-list-note">Highlight.</span>
      <span class="pub-list-links"><a href="https://openaccess.thecvf.com/content/ICCV2025/papers/Jin_Feature_Purification_Matters_Suppressing_Outlier_Propagation_for_Training-Free_Open-Vocabulary_Semantic_ICCV_2025_paper.pdf">[paper]</a><a href="/SFP/">[project]</a><a href="https://github.com/Kimsure/SFP">[code]</a><a href="/images/poster/poster_iccv25_SFP.pdf">[poster]</a></span>
    </li>
    <li>
      <span class="pub-list-badge">ACM MM 2023</span>
      <span class="pub-list-title">Kernel Dimension Matters: To Activate Available Kernels for Real-time Video Super-Resolution</span><br>
      <span class="pub-list-authors"><a href="{{ site.url }}" target="_blank"><strong>Shuo Jin</strong></a>, Meiqin Liu, Chao Yao, Chunyu Lin, Yao Zhao.</span>

      <span class="pub-list-links"><a href="https://dl.acm.org/doi/pdf/10.1145/3581783.3611908">[paper]</a><a href="/KSNet/">[project]</a><a href="https://github.com/Kimsure/KSNet">[code]</a><a href="/images/poster/poster_acm_0942.pdf">[poster]</a></span>
    </li>
    <li>
      <span class="pub-list-badge">ACM MM 2023</span>
      <span class="pub-list-title">CLG-INet: Coupled Local-Global Interactive Network for Image Restoration</span><br>
      <span class="pub-list-authors">Yuqi Jiang, Chune ZHANG, <a href="{{ site.url }}" target="_blank"><strong>Shuo Jin</strong></a>, Jiao Liu, Jiapeng Wang.</span>

      <span class="pub-list-links"><a href="https://dl.acm.org/doi/pdf/10.1145/3581783.3612251">[paper]</a><a href="https://openreview.net/profile?id=~Yuqi_Jiang2">[project]</a><a href="/images/poster/poster_acm_CLGINet.pdf">[poster]</a></span>
    </li>
    <li>
      <span class="pub-list-badge">IEEE T-CSVT</span>
      <span class="pub-list-title">Temporal consistency learning of inter-frames for video super-resolution</span><br>
      <span class="pub-list-authors">Meiqin Liu, <a href="{{ site.url }}" target="_blank"><strong>Shuo Jin</strong></a>, Chao Yao, Yao Zhao.</span>

      <span class="pub-list-links"><a href="https://ieeexplore.ieee.org/abstract/document/9919163">[paper]</a><a href="https://github.com/Kimsure/TCNet">[code]</a></span>
    </li>
  </ul>
</div>

<script src="assets/js/show_publications.js"></script>
<script src="assets/js/pub_media_rotator.js"></script>

Patents
--------
- A Co-salient Object Detection Algorithm Based on Democratic Prototype Feature Mining, CN119963800A.

Services
--------
<span id="-Social"></span>
- Reviewer for IEEE T-IP, ACM MM 2025, ICCV 2025, AAAI 2026/2027, CVPR 2025/2026, and ICLR 2027.

Teaching
--------
<span id="-teaching"></span>
- AIP304: Machine Learning (Undergraduate course @ XJTLU), Teaching Assistant.
- INT305: Machine Learning (Undergraduate course @ XJTLU), Teaching Assistant.
- INT302: Image Processing (Undergraduate course @ XJTLU), Teaching Assistant.
- CSI305: Multimedia Security Systems (Undergraduate course @ XJTLU), Teaching Assistant.
