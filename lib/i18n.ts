export const LOCALE_COOKIE_NAME = "shalilo-locale";
export const locales = ["en", "zh-CN", "zh-TW"] as const;

export type SiteLocale = (typeof locales)[number];

export const defaultLocale: SiteLocale = "en";

export const localeLabels: Record<SiteLocale, string> = {
  en: "EN",
  "zh-CN": "简",
  "zh-TW": "繁",
};

export const dictionaries = {
  en: {
    header: {
      tagline: "Notes, posts, projects, direction",
      navigation: [
        { href: "/", label: "Home" },
        { href: "/blog", label: "Blog" },
        { href: "/notes", label: "Notes" },
        { href: "/projects", label: "Projects" },
        { href: "/about", label: "About" },
        { href: "/links", label: "Links" },
        { href: "/feed.xml", label: "RSS" },
      ],
    },
    footer: {
      line: "Shalilo · Built slowly, shipped deliberately.",
      stack: "Next.js 15 · Tailwind CSS · Markdown · RSS",
      uptimeLabel: "Online for",
    },
    home: {
      badge: "Learning frontend by building in public",
      eyebrow: "A personal site shaped while learning",
      title: ["Learning in public,", "building my own place."],
      role: "Frontend learner, writer, and builder.",
      bio: "I am using this site to learn frontend by actually shipping pages, writing notes, and slowly building a personal place that feels more like mine.",
      primaryCta: "Read the archive",
      secondaryCta: "Follow via RSS",
      statusLabel: "Status",
      statusValue: "Learning by building",
      statusDescription:
        "Each update is part study, part practice, and part of turning this site into something more personal.",
      siteUptime: "Site uptime",
      started: "Started",
      startedValue: "Apr 2026",
      highlights: [
        { label: "Current stage", value: "Identity pass" },
        { label: "Stack", value: "Next.js 15" },
        { label: "Mode", value: "Dark-first" },
      ],
      linksTitle: "Personal links",
      profileLinks: [
        {
          label: "GitHub",
          description: "Code, experiments, and the public trail of this site.",
          href: "github",
        },
        {
          label: "NetEase Music",
          description: "What I loop while writing, reading, and polishing the blog.",
          href: "music",
        },
      ],
      quickLinks: [
        {
          title: "Writing",
          description: "Posts, notes, and build logs from the process of learning and making.",
          href: "/blog",
        },
        {
          title: "Now",
          description: "Currently refining the blog, writing more, and turning practice into visible progress.",
          href: "/blog/2026-04-07-diary",
        },
        {
          title: "Direction",
          description: "A quieter, sharper site built step by step while I learn how frontend really works.",
          href: "/blog/hello-shalilo",
        },
      ],
      recentEyebrow: "Recent posts",
      recentTitle: "Latest writing",
      blogEyebrow: "Latest blog",
      notesEyebrow: "Latest notes",
      projectsEyebrow: "Projects",
      linksEyebrow: "Links",
      archiveLink: "View archive",
      externalLabel: "External",
    },
    blog: {
      eyebrow: "Archive",
      title: "Blog posts",
      description:
        "This archive contains every published post, grouped by category for a clearer browsing flow.",
      continueReading: "Continue reading",
      categoryOverview: "Browse by category",
      allPosts: "All posts",
      viewCategory: "Open category page",
      emptyCategory: "No posts in this category yet.",
      categories: {
        tech: "Tech",
        daily: "Daily",
        music: "Music",
        misc: "Misc",
      },
    },
    notes: {
      eyebrow: "Notes",
      title: "Notes & Says",
      description: "Process, observations, ideas, and stage updates.",
      continueReading: "Open note",
      empty: "No notes published yet.",
      back: "Back to all notes",
    },
    post: {
      back: "Back to all posts",
      newer: "Newer post",
      older: "Older post",
      toc: "On this page",
      backToTop: "Top",
    },
    common: {
      minuteRead: "min read",
      metadata: "Entry metadata",
      publishedOn: "Published on",
      readingTime: "Reading time",
      tags: "Tags",
    },
  },
  "zh-CN": {
    header: {
      tagline: "随笔、文章与方向",
      navigation: [
        { href: "/", label: "首页" },
        { href: "/blog", label: "Blog" },
        { href: "/feed.xml", label: "RSS" },
      ],
    },
    footer: {
      line: "Shalilo · 慢慢搭建，认真发布。",
      stack: "Next.js 15 · Tailwind CSS · Markdown · RSS",
      uptimeLabel: "已运行",
    },
    home: {
      badge: "一边学前端，一边把网站慢慢做出来",
      eyebrow: "一个在学习中逐渐成形的个人站",
      title: ["把学习公开写下来，", "也把网站亲手做出来。"],
      role: "前端学习者、写作者，也是这个网站的建设者。",
      bio: "我用这个网站练习前端、记录阶段、发布文章，也把一点点学会的东西真正做进页面里。",
      primaryCta: "查看文章归档",
      secondaryCta: "通过 RSS 订阅",
      statusLabel: "状态",
      statusValue: "一边学习，一边建设",
      statusDescription: "每一次更新都既是练习，也是作品的一部分，我想让这个网站越来越像我自己。",
      siteUptime: "站点运行时长",
      started: "开始于",
      startedValue: "2026 年 4 月",
      highlights: [
        { label: "当前阶段", value: "身份感强化" },
        { label: "技术栈", value: "Next.js 15" },
        { label: "风格", value: "深色优先" },
      ],
      linksTitle: "个人链接",
      profileLinks: [
        {
          label: "GitHub",
          description: "代码、实验，以及这个站点公开留下来的构建轨迹。",
          href: "github",
        },
        {
          label: "网易云音乐",
          description: "写作、阅读和打磨这个站点时循环播放的音乐。",
          href: "music",
        },
      ],
      quickLinks: [
        {
          title: "写作",
          description: "文章、阶段记录，以及把学习过程慢慢写清楚的地方。",
          href: "/blog",
        },
        {
          title: "近况",
          description: "最近在继续优化网站、写更多内容，也把练习真正做进这个 blog 里。",
          href: "/blog/2026-04-07-diary",
        },
        {
          title: "方向",
          description: "目标是把它做成一个更安静、更清晰，也更能代表我自己的个人空间。",
          href: "/blog/hello-shalilo",
        },
      ],
      recentEyebrow: "最近文章",
      recentTitle: "最新写作",
      archiveLink: "查看归档",
      externalLabel: "外部链接",
    },
    blog: {
      eyebrow: "归档",
      title: "Blog",
      description: "这里收录所有已发布的文章，并按分类整理，方便继续浏览。",
      continueReading: "继续阅读",
      categoryOverview: "按分类浏览",
      allPosts: "全部文章",
      viewCategory: "打开分类页",
      emptyCategory: "这个分类暂时还没有文章。",
      categories: {
        tech: "技术",
        daily: "日常",
        music: "音乐",
        misc: "杂项",
      },
    },
    notes: {
      eyebrow: "Notes",
      title: "Notes 与动态",
      description: "过程、观察、想法，以及阶段性的更新记录。",
      continueReading: "打开笔记",
      empty: "还没有已发布的 notes。",
      back: "返回全部 notes",
    },
    post: {
      back: "返回全部文章",
      newer: "较新的文章",
      older: "较早的文章",
      toc: "本页目录",
      backToTop: "回到顶部",
    },
    common: {
      minuteRead: "分钟阅读",
      metadata: "条目信息",
      publishedOn: "发布于",
      readingTime: "阅读时长",
      tags: "标签",
    },
  },
  "zh-TW": {
    header: {
      tagline: "隨筆、文章與方向",
      navigation: [
        { href: "/", label: "首頁" },
        { href: "/blog", label: "Blog" },
        { href: "/feed.xml", label: "RSS" },
      ],
    },
    footer: {
      line: "Shalilo · 慢慢建造，審慎發布。",
      stack: "Next.js 15 · Tailwind CSS · Markdown · RSS",
      uptimeLabel: "已運行",
    },
    home: {
      badge: "一邊學前端，一邊把網站慢慢做出來",
      eyebrow: "一個在學習中逐漸成形的個人站",
      title: ["把學習公開寫下來，", "也把網站親手做出來。"],
      role: "前端學習者、寫作者，也是這個網站的建造者。",
      bio: "我用這個網站練習前端、記錄階段、發佈文章，也把一點點學會的東西真正做進頁面裡。",
      primaryCta: "查看文章歸檔",
      secondaryCta: "透過 RSS 訂閱",
      statusLabel: "狀態",
      statusValue: "一邊學習，一邊建造",
      statusDescription: "每一次更新都既是練習，也是作品的一部分，我想讓這個網站越來越像我自己。",
      siteUptime: "站點運行時長",
      started: "開始於",
      startedValue: "2026 年 4 月",
      highlights: [
        { label: "目前階段", value: "身份感強化" },
        { label: "技術棧", value: "Next.js 15" },
        { label: "風格", value: "深色優先" },
      ],
      linksTitle: "個人連結",
      profileLinks: [
        {
          label: "GitHub",
          description: "程式碼、實驗，以及這個站點公開留下來的建構軌跡。",
          href: "github",
        },
        {
          label: "網易雲音樂",
          description: "寫作、閱讀與打磨這個站點時循環播放的音樂。",
          href: "music",
        },
      ],
      quickLinks: [
        {
          title: "寫作",
          description: "文章、階段記錄，以及把學習過程慢慢寫清楚的地方。",
          href: "/blog",
        },
        {
          title: "近況",
          description: "最近在持續優化網站、寫更多內容，也把練習真正做進這個 blog 裡。",
          href: "/blog/2026-04-07-diary",
        },
        {
          title: "方向",
          description: "目標是把它做成一個更安靜、更清晰，也更能代表我自己的個人空間。",
          href: "/blog/hello-shalilo",
        },
      ],
      recentEyebrow: "最近文章",
      recentTitle: "最新寫作",
      archiveLink: "查看歸檔",
      externalLabel: "外部連結",
    },
    blog: {
      eyebrow: "歸檔",
      title: "Blog",
      description: "這裡收錄所有已發佈的文章，並按分類整理，方便繼續瀏覽。",
      continueReading: "繼續閱讀",
      categoryOverview: "按分類瀏覽",
      allPosts: "全部文章",
      viewCategory: "打開分類頁",
      emptyCategory: "這個分類暫時還沒有文章。",
      categories: {
        tech: "技術",
        daily: "日常",
        music: "音樂",
        misc: "雜項",
      },
    },
    notes: {
      eyebrow: "Notes",
      title: "Notes 與動態",
      description: "過程、觀察、想法，以及階段性的更新記錄。",
      continueReading: "打開筆記",
      empty: "還沒有已發佈的 notes。",
      back: "返回全部 notes",
    },
    post: {
      back: "返回全部文章",
      newer: "較新的文章",
      older: "較早的文章",
      toc: "本頁目錄",
      backToTop: "回到頂部",
    },
    common: {
      minuteRead: "分鐘閱讀",
      metadata: "條目資訊",
      publishedOn: "發佈於",
      readingTime: "閱讀時長",
      tags: "標籤",
    },
  },
} as const;

export function isSupportedLocale(value: string | undefined): value is SiteLocale {
  return locales.some((locale) => locale === value);
}

export function getDictionary(locale: SiteLocale) {
  return dictionaries[locale];
}

export function getLocaleTag(locale: SiteLocale) {
  return locale;
}

export function getDateLocale(locale: SiteLocale) {
  if (locale === "en") {
    return "en-US";
  }

  return locale;
}

