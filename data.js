/**
 * 个人主页内容数据
 * ------------------------------------------------------------
 * 后期绝大多数更新只需要修改这个文件。
 * 设计、动画、布局分别位于 style.css / app.js，不建议日常更新时修改。
 */
window.SITE_DATA = {
      profile: {
        name: "任洋甫",
        title: "青海大学计算机技术与应用系 讲师",
        role: "讲师",
        affiliation: "青海大学 · 计算机技术与应用系",
        avatar: "me.png",
        universityLogo: "QHU.png",
        institute: { name: "青海大学可视媒体计算研究所", url: "https://qhucvm.github.io/" },
        intro: "任洋甫目前是青海大学计算机技术与应用系的讲师，GDC专委委员、干事，CCF虚拟现实与可视化技术专业委员会执行委员，CCF专业会员、GDC会员、中国电子学会会员。研究方向主要包括虚拟现实与交互，计算机图形学。获批2025年度青海省“昆仑英才·高端创新创业人才”拔尖创新人才。",
        researchFocus: ["虚拟现实与交互", "计算机图形学"],
        keywords: ["VR", "交互", "图形学", "可视化"],
        academicIdentity: "GDC专委委员、干事，CCF虚拟现实与可视化技术专业委员会执行委员，CCF专业会员、GDC会员、中国电子学会会员。",
        talent: "青海省“昆仑英才·高端创新创业人才”拔尖创新人才。",
        emails: ["renyangfu@qhu.edu.cn"],
        contactNote: "请对课题组研究方向有兴趣的同学，请附个人简历和自我介绍发送邮件联系我。",
        footer: "© 2025 任洋甫"
      },

      researchVisual: {
        title: "智能重定向行走 · Interactive Research Visualization",
        hint: "移动鼠标探索 · Hover to explore",
        stages: [
          { key: "understand", en: "UNDERSTAND", label: "空间理解", detail: "虚拟旅游空间、真实物理空间与动态用户状态" },
          { key: "predict", en: "PREDICT", label: "风险预测", detail: "短时运动趋势、未来空间占用与潜在冲突" },
          { key: "guide", en: "GUIDE", label: "智能引导", detail: "虚拟导览智能体通过空间行为影响行走方向" },
          { key: "redirect", en: "REDIRECT", label: "协同重定向", detail: "在有限物理空间中调节真实轨迹并保持虚拟漫游连续" }
        ]
      },

      sections: [
        { id: "bio", number: "01", title: "简介", en: "Profile" },
        { id: "education", number: "02", title: "教育背景", en: "Education" },
        { id: "experience", number: "03", title: "教学工作", en: "Experience" },
        { id: "projects", number: "04", title: "科研项目", en: "Research Projects" },
        { id: "teaching_projects", number: "05", title: "教学项目", en: "Teaching Projects" },
        { id: "publications", number: "06", title: "学术成果", en: "Publications" },
        { id: "courses", number: "07", title: "教授课程", en: "Courses" },
        { id: "awards", number: "08", title: "个人业绩", en: "Awards & Honors" },
        { id: "contact", number: "09", title: "联系方式", en: "Contact" }
      ],

      education: [
        { when: "2021年9月~2026年7月", what: "清华大学，计算机科学与技术系，工学博士学位，博士导师：张松海教授" },
        { when: "2012年9月~2015年7月", what: "云南大学，信息学院，工学硕士学位，硕士导师：普园媛教授" },
        { when: "2006年9月~2010年7月", what: "西北师范大学，物理与电子工程学院，理学学士学位" }
      ],

      experience: [
        { when: "2016年9月~至今", what: "青海大学，计算机技术与应用系，讲师" }
      ],

      researchProjects: [
        { label: "北航虚拟现实技术与系统全国重点实验室2026年开放课题", text: "“面向重定向行走的场景布局影响机制与自适应控制方法研究”；2026.05 - 2028.05; 主持。" },
        { label: "青海大学2019年中青年基金项目", text: "“基于视觉语义的短视频内容分析及研究”；2019.11 - 2022.12；主持。" },
        { label: "国家重点研发计划项目", text: "“三维数字交互引擎关键技术研发与开发应用生态构建”；2023年11月 至 2026年10月，参与。" },
        { label: "国家自然科学基金", text: "“藏毯图像生成及颜色编辑关键技术研究”；2026.01-2029.12；参与。" },
        { label: "国家自然科学基金", text: "“全景视觉数据分析、处理与VR交互”；2022.01-2026.12；参与。" },
        { label: "国家自然科学基金项目", text: "“全景视频感知理解及呈现关键技术研究”；2019.01-2022.12；参与。" }
      ],

      teachingProjects: [
        { date: "2020年9月", text: "《大学计算机》课程：国家级一流线上线下混合式课程" },
        { date: "2024年1月", text: "《大学计算机》课程：青海省省级一流线上线下混合式课程" },
        { date: "2026年4月", text: "《面向新工科的《虚拟现实技术与应用》课程系统重构与实践研究》：校级教学研究项目" },
        { date: "2023年6月", text: "《基于可视媒体计算与艺术表现专题提高计算机专业学生科研素养的应用研究--以青海大学为例》：校级教学研究项目" },
        { date: "2020年6月", text: "《计算机系统平台》课程：校级虚拟仿真实验教学建设项目" },
        { date: "2017年9月", text: "《计算机系统平台》课程：校级精品课程" },
        { date: "2018年9月", text: "《数据库应用基础》课程：校级一类课程建设项目" },
        { date: "2019年9月", text: "《数据库应用基础》课程：2019年青海大学课程建设项目" }
      ],

      publications: [
        { 
            year: "2026",
            authorsHtml: "陈思成, 张少魁, 刘家宏, <span class=\"self\">任洋甫</span>*, 张松海.",
            title: "基于低维连续隐空间表示的交互式3D室内场景生成与推荐系统",
            venueHtml: "<span class=\"venue\">图学学报</span>, 2026 (网络首发: 2026-10-22). <a href=\"https://link.cnki.net/urlid/10.1034.t.20261022.1004.002\" target=\"_blank\" rel=\"noopener noreferrer\">CNKI</a>"
        },
        {
          year: "2025",
          authorsHtml: "Xin Du, Sen-Zhe Xu, <span class=\"self\">Yang-Fu Ren</span>, Qi-Wen Gan, and Song-Hai Zhang.",
          title: "Perceiving Safety: User Preferences and Perception of Multimodal Virtual Boundary Cues in VR",
          venueHtml: "In Proceedings of the International Conference on Extended Reality (ICXR 2025 CCF-C <strong style=\"color: #e60012;\">Best Poster Award</strong>)."
        },
        {
          year: "2025",
          authorsHtml: "Hong-Ru Ji, Sen-Zhe Xu, <span class=\"self\">Yang-Fu Ren</span>, Fang-Lue Zhang, and Song-Hai Zhang.",
          title: "The Effects of Head Pitch on Translation Gain in Virtual Reality Environments",
          venueHtml: "In Proceedings of the International Conference on Extended Reality (ICXR 2025, CCF-C)."
        },
        {
          year: "2025",
          authorsHtml: "冀红茹, 任洋甫*, 胥森哲, 张松海.",
          title: "虚拟现实中速度驱动场景缩放对行走与查找效率提升的研究",
          venueHtml: "[J]. <span class=\"venue\">计算机科学</span>, 2025,1-18."
        },
        {
          year: "2025",
          authorsHtml: "杜欣, <span class=\"self\">任洋甫</span>, 胥森哲, 等.",
          title: "虚拟现实重定向行走中的场景缩放增益研究",
          venueHtml: "[J]. <span class=\"venue\">图学学报</span>, 2025, 46(04): 793-806."
        },
        {
          year: "2025",
          authorsHtml: "谢泽华, 傅月瑶, 何煜, 等.",
          title: "俯仰视角影响下的虚拟现实头部旋转增益研究",
          venueHtml: "[J]. <span class=\"venue\">计算机科学</span>, 2025, 52(04): 212-221."
        },
        {
          year: "2024",
          authorsHtml: "<span class=\"self\">任洋甫</span>, 于歌, 傅月瑶, 等.",
          title: "虚拟现实中场景和时间对用户空间方向认知的影响",
          venueHtml: "[J]. <span class=\"venue\">图学学报</span>, 2024, 45(06): 1349-1363."
        },
        {
          year: "2024",
          authorsHtml: "<span class=\"self\">任洋甫</span>, 李志强, 张松海.",
          title: "沉浸式环境中多场景视觉提示信息可视化方法综述",
          venueHtml: "[J]. <span class=\"venue\">中国图象图形学报</span>, 2024, 29(01): 1-21.",
          doiText: "CNKI:SUN:ZGTB.0.2024-01-001"
        },
        {
          year: "2024",
          authorsHtml: "Liu J H, <span class=\"self\">Ren Y F</span>, Gan Q W, et al.",
          title: "Overcoming Spatial Constraints in VR: A Survey of Redirected Walking Techniques",
          venueHtml: "[J]. <span class=\"venue\">Journal of Computer Science and Technology</span>, 2024, 39(4): 841-870."
        },
        {
          year: "2023",
          authorsHtml: "陈朗, <span class=\"self\">任洋甫</span>, 杨培, 等.",
          title: "Dynamic Unet+:一种轻量精确的语义分割算法及应用",
          venueHtml: "[J]. <span class=\"venue\">电脑知识与技术</span>, 2023, 19(11): 1-5.",
          doiText: "10.14004/j.cnki.ckt.2023.0602",
          doiUrl: "https://doi.org/10.14004/j.cnki.ckt.2023.0602"
        },
        {
          year: "2019",
          authorsHtml: "<span class=\"self\">任洋甫</span>, 普园媛, 徐丹, 等.",
          title: "语义值驱动的三维直立状态人体模型变形",
          venueHtml: "[J]. <span class=\"venue\">系统仿真学报</span>, 2019, 31(03): 476-485.",
          doiText: "10.16182/j.issn1004731x.joss.17DEA-007",
          doiUrl: "https://doi.org/10.16182/j.issn1004731x.joss.17DEA-007"
        },
        {
          year: "2018",
          authorsHtml: "杨培, 陈沿锦, 贾金芳, 等.",
          title: "一种改进的快速迭代阈值选择算法",
          venueHtml: "[J]. <span class=\"venue\">青海大学学报</span>, 2018, 36(03): 34-39.",
          doiText: "10.13901/j.cnki.qhwxxbzk.2018.03.006",
          doiUrl: "https://doi.org/10.13901/j.cnki.qhwxxbzk.2018.03.006"
        },
        {
          year: "2015",
          authorsHtml: "刘玉清, 普园媛, <span class=\"self\">任洋甫</span>, 等.",
          title: "梵高绘画风格特点的数字化分析",
          venueHtml: "[J]. <span class=\"venue\">系统仿真学报</span>, 2015, 27(04): 779-785.",
          doiText: "10.16182/j.cnki.joss.2015.04.015",
          doiUrl: "https://doi.org/10.16182/j.cnki.joss.2015.04.015"
        }
      ],

      courses: [
        "虚拟现实技术与应用（2026春季）",
        "人工智能通识（2025秋季）",
        "可视媒体计算与艺术表现（2025秋季）",
        "大学计算机",
        "计算机系统平台",
        "数据分析与处理技术",
        "数据库应用基础"
      ],

      awards: 
    [
      {year: "2026年",text: "参与指导学生获2026年中国大学生计算机设计大赛国赛三等奖。"},
      {year: "2026年4月",text: "合作论文《西部高校计算机系统平台课程虚拟仿真实验设计及应用实践》被2026年全国高校计算机类专业系统能力培养高峰论坛录用，并荣获会议论文三等奖。"},
      {year: "2026年",text: "参与指导学生获2026年中国大学生计算机设计大赛西北赛区一等奖。"},
      {year: "2025年11月",text: "论文“Perceiving Safety: User Preferences and Perception of Multimodal Virtual Boundary Cues in Virtual Reality”获2025 International Conference on Extended Reality（ICXR 2025）最佳论文海报奖。"},
      {year: "2025年",text: "参与指导学生获2025年中国大学生计算机设计大赛西北赛区三等奖。"},
      {year: "2024年",text: "指导学生获得全国大学生虚拟现实创新设计竞赛国赛二等奖。"},
      {year: "2022年",text: "参与指导学生获2022年中国大学生计算机设计大赛三等奖。"},
      {year: "2021年",text: "指导学生获得第五届“龙芯杯”全国系统能力培养大赛全国团体优胜奖，并获得优秀指导教师称号。"},
      {year: "2021年",text: "获得青海大学本科生优秀毕业论文指导教师。"},
      {year: "2020年",text: "指导学生获得第四届“龙芯杯”全国系统能力培养大赛全国团体三等奖，并获得优秀指导教师称号。"},
      {year: "2019年",text: "指导学生获得第三届“龙芯杯”全国系统能力培养大赛全国团体优胜奖，并获得优秀指导教师称号。"}
    ]
    };
