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


I’m a 1st-year Ph.D student at [MMT lab](https://jiminxiao.github.io), University of Liverpool, co-advised by Dr. Siyue Yu and Prof. Jimin Xiao. I'm also fortunate to work closely with Dr. [Mingjie Sun](https://scst.suda.edu.cn/0f/92/c11250a528274/page.htm) from [Soochow University](https://www.suda.edu.cn) and [Dr. Bingfeng Zhang](https://zbf1991.github.io/) from [China University of Petroleum (East China)](https://www.upc.edu.cn).
<!-- Dr. Yi Dong and Prof. Xiaowei Huang, in [Trustworthy Autonomous Cyber-Physical Systems (TACPS) Lab](https://cgi.csc.liv.ac.uk/~acps/home/). -->

Prior to that, I worked as a camera engineer for [vivo Mobile Communication Ltd](https://www.vivo.com), focusing on Auto-Foucs & Image-Stablization.

I got my M.Eng. degree at [MePro](http://mepro.bjtu.edu.cn) (Group Leader: Yao Zhao, IEEE Fellow), Beijing Jiaotong University, advised by Associate Prof. Meiqin Liu and Chao Yao.



My research interests cover a range of computer vision and deep learning. Currentl, my research is primarily concentrated on open-vocabulary dense perception, multimodal visual grounding and multimodal LLM.
<!-- including image & video low-level vision, e.g. super-resolution, denoising, low-light enhancement, etc. and semantic segmentation under various conditions, including weakly-supervised, self-supervised and zero-shot learning environments. -->
<!--
neural machine translation and computer vision. I have published more than 100 papers at the top international AI conferences with total <a href='https://scholar.google.com/citations?user=DhtAFkwAAAAJ'>google scholar citations <strong><span id='total_cit'>260000+</span></strong></a> (You can also use google scholar badge <a href='https://scholar.google.com/citations?user=DhtAFkwAAAAJ'><img src="https://img.shields.io/endpoint?url={{ url | url_encode }}&logo=Google%20Scholar&labelColor=f6f6f6&color=9cf&style=flat&label=citations"></a>).
-->

# 🔥 News
- *2025.08*: &nbsp;🎉🎉 Our paper SFP has been selected as ICCV25 **highligh** paper! Many thanks to all co-authors.
- *2025.06*: &nbsp;🎉🎉 One paper is accepted by ICCV 2025.
- *2023.10*: &nbsp;🎉🎉 Two papers are accepted by ACM MM 2023. 
- *2023.04*: &nbsp;🎉🎉 One paper is accepted by T-CSVT.

# 📝 Publications 

<div class='paper-box'><div class='paper-box-image'><div><div class="badge">ICCV 2025 highlight</div><img src='images/SFP.png' alt="sym" width="100%"></div></div>
<div class='paper-box-text' markdown="1">

Feature Purification Matters: Suppressing Outlier Propagation for Training-Free Open-Vocabulary Semantic Segmentation

**Shuo Jin**, Siyue Yu, Bingfeng Zhang, Mingjie Sun, Yi Dong, Jimin Xiao

[![project](https://img.shields.io/badge/Project-SFP-green)](https://github.com/Kimsure/SFP)    [![arXiv](https://img.shields.io/badge/Paper-ICCV-b31b1b)](https://openaccess.thecvf.com/content/ICCV2025/papers/Jin_Feature_Purification_Matters_Suppressing_Outlier_Propagation_for_Training-Free_Open-Vocabulary_Semantic_ICCV_2025_paper.pdf) [![Poster](https://img.shields.io/badge/Poster-SFP-yellow)](../images/poster/poster_iccv25_09317.pdf) <a href="#LICENSE--citation"><img alt="License: MIT" src="https://img.shields.io/badge/LICENSE-MIT-blue.svg"/></a>
<!-- [[PDF]](https://openaccess.thecvf.com/content/ICCV2025/papers/Jin_Feature_Purification_Matters_Suppressing_Outlier_Propagation_for_Training-Free_Open-Vocabulary_Semantic_ICCV_2025_paper.pdf)
[[Code]](https://github.com/Kimsure/SFP)
[[Poster]](../images/poster/poster_iccv25_09317.pdf) -->
<!-- [**Project**](https://github.com/jxtse/GEC_Metrics_LLM) <strong><span class='show_paper_citations' data='DhtAFkwAAAAJ:ALROH1vI_8AC'></span></strong> | <a href="">Link to paper</a> -->
</div>
</div>

<div class='paper-box'><div class='paper-box-image'><div><div class="badge">ACM MM 2023</div><img src='images/KSNet.png' alt="sym" width="100%"></div></div>
<div class='paper-box-text' markdown="1">

Kernel Dimension Matters: To Activate Available Kernels for Real-time Video Super-Resolution

**Shuo Jin**, Meiqin Liu, Chao Yao, Chunyu Lin, Yao Zhao

[![project](https://img.shields.io/badge/Project-KSNet-green)](https://github.com/Kimsure/KSNet)    [![arXiv](https://img.shields.io/badge/Paper-ACMMM-b31b1b)](https://dl.acm.org/doi/pdf/10.1145/3581783.3611908) [![Poster](https://img.shields.io/badge/Poster-KSNet-yellow)](../images/poster/poster_acm_0942.pdf) <a href="#LICENSE--citation"><img alt="License: MIT" src="https://img.shields.io/badge/LICENSE-MIT-blue.svg"/></a>
<!-- [[PDF]](https://dl.acm.org/doi/pdf/10.1145/3581783.3611908) -->
<!-- [[Code]](https://github.com/Kimsure/KSNet)
[[Poster]](../images/poster/poster_acm_0942.pdf) -->
<!-- [**Project**](https://github.com/jxtse/GEC_Metrics_LLM) <strong><span class='show_paper_citations' data='DhtAFkwAAAAJ:ALROH1vI_8AC'></span></strong> | <a href="">Link to paper</a> -->
</div>
</div>

<div class='paper-box'><div class='paper-box-image'><div><div class="badge">ACM MM 2023</div><img src='images/CLG-INet.png' alt="sym" width="100%"></div></div>
<div class='paper-box-text' markdown="1">

CLG-INet: Coupled Local-Global Interactive Network for Image Restoration

Yuqi Jiang, Chune ZHANG, **Shuo Jin**, Jiao Liu, Jiapeng Wang

[![project](https://img.shields.io/badge/Project-CLGINet-green)](https://openreview.net/profile?id=~Yuqi_Jiang2)    [![arXiv](https://img.shields.io/badge/Paper-ACMMM-b31b1b)](https://dl.acm.org/doi/pdf/10.1145/3581783.3612251) [![Poster](https://img.shields.io/badge/Poster-CLGINet-yellow)](../images/poster/poster_acm_CLGINet.pdf) <a href="#LICENSE--citation"><img alt="License: MIT" src="https://img.shields.io/badge/LICENSE-MIT-blue.svg"/></a>

<!-- [[PDF]](https://dl.acm.org/doi/pdf/10.1145/3581783.3612251)
[[Code]](https://openreview.net/profile?id=~Yuqi_Jiang2)
[[Poster]](../images/poster/poster_acm_CLGINet.pdf) -->
<!-- [**Project**](https://github.com/jxtse/GEC_Metrics_LLM) <strong><span class='show_paper_citations' data='DhtAFkwAAAAJ:ALROH1vI_8AC'></span></strong> | <a href="">Link to paper</a> -->
</div>
</div>

<div class='paper-box'><div class='paper-box-image'><div><div class="badge">IEEE T-CSVT</div><img src='images/TCNet.png' alt="sym" width="100%"></div></div>
<div class='paper-box-text' markdown="1">

Temporal consistency learning of inter-frames for video super-resolution

Meiqin Liu, **Shuo Jin**, Chao Yao, Chunyu Lin, Yao Zhao

[![project](https://img.shields.io/badge/Project-TCNet-green)](https://github.com/Kimsure/TCNet)    [![arXiv](https://img.shields.io/badge/Paper-TCSVT-b31b1b)](https://ieeexplore.ieee.org/abstract/document/9919163) <a href="#LICENSE--citation"><img alt="License: MIT" src="https://img.shields.io/badge/LICENSE-MIT-blue.svg"/></a>

<!-- [[PDF]](https://ieeexplore.ieee.org/abstract/document/9919163)
[[Code]](https://github.com/Kimsure/TCNet) -->

<!-- [**Project**](https://github.com/jxtse/GEC_Metrics_LLM) <strong><span class='show_paper_citations' data='DhtAFkwAAAAJ:ALROH1vI_8AC'></span></strong> | <a href="">Link to paper</a> -->
</div>
</div>

<!--
# 🎖 Honors and Awards
- *2023.03* Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus ornare aliquet ipsum, ac tempus justo dapibus sit amet. 
- *2023.06* Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus ornare aliquet ipsum, ac tempus justo dapibus sit amet. 
-->
# 🎖 Patents

- A Co-salient Object Detection Algorithm Based on Democratic Prototype Feature Mining, CN119963800A

# 📖 Educations

- *2024.09 - present*, Ph.D in Computer Science, University of Liverpool.
- *2021.09 - 2023.06*, M.Eng in Electronic Engineering, Beijing Jiaotong University.


<!--
# 💬 Invited Talks
-->

# 💻 Works & Internships

- *2023.07 - 2024.08*, vivo Mobile Communication Ltd.

# 💬 Social Work

Reviewer for ACMMM, ICCV, AAAI, TIP.
