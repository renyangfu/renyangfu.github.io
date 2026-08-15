# 任洋甫个人学术主页 v2.1 — 上传与维护说明

这是可以直接用于 GitHub Pages 的静态版本，不需要安装 Node.js、React、数据库或服务器。

## 1. 需要上传到 GitHub 的文件

请把下面 6 个文件上传到 `renyangfu.github.io` 仓库根目录，并覆盖同名旧文件：

- `index.html` — 页面骨架与 SEO 信息
- `style.css` — 全部视觉设计、响应式布局、深浅色主题与动画
- `data.js` — **日常更新内容主要只改这个文件**
- `app.js` — 页面渲染、滚动、按钮、筛选、立体交互等逻辑
- `me.png` — 优化后的个人图片
- `QHU.png` — 优化后的青海大学校徽/校名组合

`README.md` 可以一起上传，也可以不上传；它只作为操作说明，不影响网页显示。

> 如果你还没有上传上一版 v2，请直接上传这 6 个网页文件。
> 如果你已经上传了 v2，本次 v2.1 主要修改 `app.js`、`style.css`、`data.js`，只覆盖这 3 个文件也可以；为避免版本混淆，仍建议第一次直接上传完整 6 文件。

> 旧版 `style.css` 已经不再使用，请用本版本的 `style.css` 覆盖。

## 2. 第一次上传（最简单方法）

1. 打开 GitHub 仓库：`renyangfu/renyangfu.github.io`
2. 点击右上方 **Add file → Upload files**
3. 将上述 6 个网页文件拖进去
4. GitHub 如果提示同名文件，将以新文件内容覆盖
5. 页面下方填写 Commit message，例如：`Upgrade academic homepage v2.1`
6. 点击 **Commit changes**
7. 等待 GitHub Pages 自动部署，通常几分钟后访问 `https://renyangfu.github.io/` 查看
8. 如果浏览器仍显示旧版，可按 `Ctrl + F5` 强制刷新

## 3. 上传前本地预览

最简单：直接双击 `index.html`。

更稳妥的方式（可选）：在文件所在目录运行：

```bash
python -m http.server 8000
```

然后浏览器打开：

```text
http://localhost:8000
```

## 4. 今后更新：原则上只改 `data.js`

`data.js` 已经把个人主页所有内容集中在 `SITE_DATA` 中。

### 4.1 修改个人简介 / 职称 / 邮箱 / 研究方向

在 `profile` 中修改：

```javascript
profile: {
  name: "任洋甫",
  title: "青海大学计算机技术与应用系 讲师",
  role: "讲师",
  affiliation: "青海大学 · 计算机技术与应用系",
  intro: "……",
  researchFocus: ["虚拟现实与交互", "计算机图形学"],
  keywords: ["VR", "交互", "图形学", "可视化"],
  emails: ["renyangfu@qhu.edu.cn"]
}
```

### 4.2 修改首页科研可视化的文字

如果后续研究表述需要更新，只改 `data.js` 中的 `researchVisual`：

```javascript
researchVisual: {
  title: "智能重定向行走 · Interactive Research Visualization",
  hint: "移动鼠标探索 · Hover to explore",
  stages: [
    { key: "understand", en: "UNDERSTAND", label: "空间理解", detail: "……" },
    { key: "predict", en: "PREDICT", label: "风险预测", detail: "……" },
    { key: "guide", en: "GUIDE", label: "智能引导", detail: "……" },
    { key: "redirect", en: "REDIRECT", label: "协同重定向", detail: "……" }
  ]
}
```

这里只建议修改 `label/detail/hint` 等文字。可视化的路径、动画和交互逻辑由 `app.js` 与 `style.css` 控制，日常维护不需要动。

### 4.3 新增科研项目

在 `researchProjects` 数组**最前面**新增：

```javascript
{
  label: "项目来源或类别",
  text: "“项目名称”；2026.01 - 2028.12；主持。"
},
```

页面会自动生成编号和“主持/参与”标签。

### 4.4 新增教学项目

在 `teachingProjects` 数组中新增：

```javascript
{
  date: "2027年3月",
  text: "《项目名称》：项目级别或说明"
},
```

### 4.5 新增论文

在 `publications` 数组**最前面**新增：

```javascript
{
  year: "2027",
  authorsHtml: "作者1, <span class=\"self\">任洋甫</span>, 作者3.",
  title: "论文题目",
  venueHtml: "[J]. <span class=\"venue\">期刊/会议名称</span>, 2027.",
  doiText: "10.xxxx/xxxxx",
  doiUrl: "https://doi.org/10.xxxx/xxxxx"
},
```

说明：

- `year` 决定自动年份分组与筛选按钮
- 需要突出本人姓名时保留 `<span class="self">...</span>`
- 没有 DOI 时可直接删除 `doiText` 与 `doiUrl`
- 页面会自动按年份从新到旧显示

### 4.6 新增课程

在 `courses` 中增加一行：

```javascript
"新的课程名称（2027春季）",
```

### 4.7 新增个人业绩 / 奖项

在 `awards` 最前面新增：

```javascript
{
  year: "2027年",
  text: "获奖或指导学生成果说明。"
},
```

## 5. 哪些文件日常不要改

除非后续要重新设计，否则日常更新不建议修改：

- `index.html`
- `style.css`
- `app.js`

这样可以避免“更新一篇论文，结果把页面样式改坏”的问题。

## 6. 当前版本已经包含的交互

- 顶部固定导航，滚动时自动隐藏/出现
- 当前栏目自动高亮
- 右侧章节定位圆点（桌面端）
- 页面顶部阅读进度条
- 模块进入视野时的分层 Reveal 动画
- 教育/工作经历时间轴反馈
- 科研项目、教学项目、奖项的编辑式 Hover 反馈
- 学术成果按年份筛选
- 论文 Hover Focus（弱化其他论文，突出当前论文）
- 首屏“高原生态虚拟空间 × 有限共享物理空间 × 多用户 × 智能导览智能体 × 重定向行走”科研可视化
- 首屏 4 阶段自动研究叙事：空间理解 → 风险预测 → 智能引导 → 协同重定向
- 虚拟路径与真实物理路径持续动态运动
- 多用户未来运动区域与潜在冲突的动态可视化
- 鼠标经过观景节点 / POI 时，虚拟目标路径即时响应
- 鼠标进入物理空间区域时，可作为临时空间约束，真实路径产生轻量自适应避让
- UNDERSTAND / PREDICT / GUIDE / REDIRECT 四个研究图层可悬停查看
- 首屏轻量 3D / Parallax 鼠标反馈
- 按钮轻量 Magnetic 反馈与按压反馈
- Contact 区轻量透视反馈
- 深色 / 浅色主题切换，并记住用户选择
- 一键复制邮箱
- 回到顶部按钮
- 手机、平板、桌面响应式适配
- `prefers-reduced-motion` 动画减弱支持

## 7. 后期维护的推荐工作流

以后每次只做：

```text
打开 data.js
   ↓
找到 publications / projects / courses / awards
   ↓
复制一条已有数据
   ↓
修改文字
   ↓
保存并上传 data.js
   ↓
GitHub Pages 自动更新
```

也就是说，大部分日常更新只需要上传 **1 个 `data.js` 文件**。

## 8. 安全回退

GitHub 会保留每次 Commit 历史。如果某次修改出现问题，可以在仓库的 **Commits / History** 中找到之前正常的版本并恢复，因此不要删除仓库历史。
