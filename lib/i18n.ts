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
      tagline: "Notes, posts, direction",
      navigation: [
        { href: "/", label: "Home" },
        { href: "/blog", label: "Blog" },
        { href: "/feed.xml", label: "RSS" },
      ],
    },
    footer: {
      line: "Shalilo · Built slowly, shipped deliberately.",
      stack: "Next.js 15 · Tailwind CSS · Markdown · RSS",
      uptimeLabel: "Online for",
    },
    home: {
      badge: "Personal system in progress",
      eyebrow: "Shalilo's corner on the web",
      title: ["A personal site", "with more of me in it."],
      role: "Writer, builder, and frontend learner.",
      bio: "A personal website for longer writing, small notes, and the kind of quiet iteration that slowly sharpens a project.",
      primaryCta: "Read the archive",
      secondaryCta: "Follow via RSS",
      statusLabel: "Status",
      statusValue: "Building deliberately",
      statusDescription:
        "Less noise, fewer rushed additions, more pages that feel worth returning to.",
      siteUptime: "Site uptime",
      started: "Started",
      startedValue: "Apr 2026",
      highlights: [
        { label: "Current stage", value: "Identity pass" },
        { label: "Stack", value: "Next.js 15" },
        { label: "Mode", value: "Dark-first" },
      ],
      linksTitle: "Personal links",
      linksEyebrow: "Find me",
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
          description: "Longer posts, build notes, and personal reflections.",
          href: "/blog",
        },
        {
          title: "Now",
          description: "Currently refining the blog, writing more, and learning in public.",
          href: "/blog/2026-04-07-diary",
        },
        {
          title: "Direction",
          description: "Aiming for a quieter, sharper, more personal reading experience.",
          href: "/blog/hello-shalilo",
        },
      ],
      recentEyebrow: "Recent posts",
      recentTitle: "Latest writing",
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
    post: {
      back: "Back to all posts",
      newer: "Newer post",
      older: "Older post",
      toc: "On this page",
      backToTop: "Top",
    },
    common: {
      minuteRead: "min read",
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
      badge: "个人站点持续构建中",
      eyebrow: "Shalilo 的网络角落",
      title: ["一个更像我自己的", "个人网站。"],
      role: "写作者、建设者，也是前端学习者。",
      bio: "这里用来放更长的文章、零散的笔记，以及那些在安静迭代里慢慢变锋利的想法。",
      primaryCta: "查看文章归档",
      secondaryCta: "通过 RSS 订阅",
      statusLabel: "状态",
      statusValue: "有意识地持续打磨",
      statusDescription: "减少噪音，减少仓促添加，让每一页都更值得反复回来读。",
      siteUptime: "站点运行时长",
      started: "开始于",
      startedValue: "2026 年 4 月",
      highlights: [
        { label: "当前阶段", value: "身份感强化" },
        { label: "技术栈", value: "Next.js 15" },
        { label: "风格", value: "深色优先" },
      ],
      linksTitle: "个人链接",
      linksEyebrow: "找到我",
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
          description: "更完整的文章、阶段记录与个人思考。",
          href: "/blog",
        },
        {
          title: "近况",
          description: "最近在继续优化网站、写更多内容，也在公开学习。",
          href: "/blog/2026-04-07-diary",
        },
        {
          title: "方向",
          description: "目标是做出一个更安静、更锋利、更个人化的阅读空间。",
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
    post: {
      back: "返回全部文章",
      newer: "较新的文章",
      older: "较早的文章",
      toc: "本页目录",
      backToTop: "回到顶部",
    },
    common: {
      minuteRead: "分钟阅读",
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
      badge: "個人站點持續建構中",
      eyebrow: "Shalilo 的網路角落",
      title: ["一個更像我自己的", "個人網站。"],
      role: "寫作者、建造者，也是前端學習者。",
      bio: "這裡用來放更長的文章、零散的筆記，以及那些在安靜迭代裡慢慢變鋒利的想法。",
      primaryCta: "查看文章歸檔",
      secondaryCta: "透過 RSS 訂閱",
      statusLabel: "狀態",
      statusValue: "有意識地持續打磨",
      statusDescription: "減少噪音，減少倉促添加，讓每一頁都更值得反覆回來讀。",
      siteUptime: "站點運行時長",
      started: "開始於",
      startedValue: "2026 年 4 月",
      highlights: [
        { label: "目前階段", value: "身份感強化" },
        { label: "技術棧", value: "Next.js 15" },
        { label: "風格", value: "深色優先" },
      ],
      linksTitle: "個人連結",
      linksEyebrow: "找到我",
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
          description: "更完整的文章、階段記錄與個人思考。",
          href: "/blog",
        },
        {
          title: "近況",
          description: "最近在持續優化網站、寫更多內容，也在公開學習。",
          href: "/blog/2026-04-07-diary",
        },
        {
          title: "方向",
          description: "目標是做出一個更安靜、更鋒利、更個人化的閱讀空間。",
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
    post: {
      back: "返回全部文章",
      newer: "較新的文章",
      older: "較早的文章",
      toc: "本頁目錄",
      backToTop: "回到頂部",
    },
    common: {
      minuteRead: "分鐘閱讀",
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
