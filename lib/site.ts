export const siteConfig = {
  name: "Shalilo",
  url: "https://www.sha1ilo.com",
  description:
    "Shalilo's personal blog, where learning frontend and building in public happen at the same time.",
  launchedAt: "2026-04-05T00:00:00+08:00",
  profile: {
    displayName: "Shalilo",
    role: "Frontend learner, writer, and builder.",
    bio: "I am using this site to learn frontend by actually shipping pages, writing notes, and slowly building a personal place that feels more like mine.",
    avatar: "/shalilo.jpg",
    avatarAlt: "Portrait of Shalilo",
  },
  links: {
    github: "https://github.com/Halilo-muso",
    music: "https://music.163.com/",
  },
  about: {
    intro:
      "I am building this site while learning frontend, writing in public, and trying to turn practice into a place that feels like mine.",
    sections: [
      {
        title: "What I am doing",
        body: "Learning frontend by shipping pages, refining writing, and slowly growing this site into a fuller personal space.",
      },
      {
        title: "Why this site exists",
        body: "To keep a record of what I make, what I learn, and how my thinking changes while I build in public.",
      },
    ],
  },
} as const;
