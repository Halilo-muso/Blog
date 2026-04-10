# Blog Feature History

这份文档记录 blog 的阶段性功能变化。以后每次新增、删除或明显调整一个功能，都同步记在这里。

说明：
- `Added` = 新增功能
- `Changed` = 调整/优化已有功能
- `Removed` = 删除功能

## 2026-04-10

### Dual Stream Portal
- `Added`: `/notes` 作为独立内容流，不再把日记型内容混在 blog 中。
- `Added`: `/projects`、`/about`、`/links` 页面，站点结构从单一博客扩展为个人站点。
- `Changed`: 首页重组为身份介绍、最新 Blog、最新 Notes、Projects 与 Links 的总览页。
- `Changed`: 旧的 diary `blog` 链接永久重定向到新的 `notes` 路由。

## 2026-04-09

### Article Reading Experience
- `Changed`: 右侧目录区改成更清晰的卡片式导航，当前章节高亮更明显。
- `Changed`: 文末上一篇 / 下一篇卡片补充日期与分类信息，阅读结束后的跳转更自然。
- `Changed`: 代码块增加语言头部和更清晰的容器样式，代码内容更像成品阅读组件。
- `Changed`: 引用块、列表和图片展示进一步细化，正文的长文阅读节奏更稳定。

## 2026-04-08

### Article Reading Experience
- `Added`: 移动端文章目录入口，手机上可以展开查看当前文章的章节导航。
- `Changed`: 文章正文增加独立阅读容器，正文、引用块、代码块的排版节奏更适合长时间阅读。

### Project Workflow
- `Added`: 建立这份 [blog-feature-history.md](/D:/code/blog/docs/blog-feature-history.md) 作为持续维护的功能演进日志。
- `Changed`: 调整 `.gitignore`，只跟踪这份公开的功能演进文档，不跟踪整个 `docs` 目录。

### Homepage Identity
- `Changed`: 首页主文案调整为“前端学习者 / 写作者 / 建设者”的表达，身份感更明确。
- `Changed`: 首页右侧个人信息卡从过重版本收回到更轻的陪衬结构，避免抢走 Hero 的视觉重心。

### Header
- `Changed`: 顶部导航改为更安静的样式，减少胶囊感和厚重按钮感。
- `Changed`: 语言切换和主题切换改成更克制的表现方式。

### Homepage Profile Card
- `Added`: 首页接入个人头像，头像来源改为 `public/shalilo.jpg`。
- `Changed`: 头像尺寸、圆角、边框和阴影被重新设计，更像个人名片的一部分。
- `Changed`: GitHub / 网易云入口恢复为带图标的轻量链接样式。

## Previous History From Git

### 2026-04-08 Before The Current Session
- `Added`: 分类结构与分类归档页。
- `Added`: 文章目录高亮与返回顶部按钮。
- `Changed`: 文章阅读体验进行过一轮重构。

对应提交：
- `a24f936` `feat: add category filters and archive pages`
- `be763e9` `feat: add post category structure`
- `66dfaf6` `feat: add active toc and back-to-top`
- `9061b37` `refactor: refine post reading experience`
