export const profile = {
  name: "Kiran Sukumaran",
  initials: "KS",
  role: "Technical Lead · Backend · DevOps · AI",
  location: "Thiruvananthapuram, Kerala, India",
  email: "ks4uofficial@gmail.com",
  phone: "+91 9567464915",
  phoneHref: "tel:+919567464915",
  linkedin: "https://www.linkedin.com/in/kiran-sukumaran",
  cvHref: "/kiran-sukumaran-cv.pdf",
  headline:
    "I build production backends, cloud infrastructure, and AI systems — with the same bar for reliability on all three.",
  summary:
    "Technical Lead with 8+ years across backend engineering, DevOps, and AI. I design Node.js and TypeScript services, ship AWS infrastructure with Pulumi and serverless, and build production Generative AI and Voice Agent systems. The through-line is the same: architecture that stays up.",
  now: "Associate Technical Lead at KeyValue, working across backend services, AWS infrastructure with Pulumi, and AI systems including Voice Agents and GenAI workflows.",
};

export const pipeline = [
  { id: "backend", label: "Backend", detail: "Node.js · NestJS · microservices · APIs" },
  { id: "devops", label: "DevOps", detail: "AWS · Pulumi · serverless · IaC" },
  { id: "ai", label: "AI", detail: "Voice agents · GenAI · LLMs · orchestration" },
] as const;

export const stats = [
  { value: "8+", label: "Years building systems" },
  { value: "10+", label: "Engineers mentored" },
  { value: "20%", label: "Faster delivery" },
  { value: "5", label: "Industries shipped in" },
];

export const focus = [
  "Backend architecture",
  "Microservices & APIs",
  "AWS, Pulumi & IaC",
  "Serverless & observability",
  "Generative AI & agents",
  "Voice AI & real-time systems",
];

export const projects = [
  {
    index: "01",
    title: "Agentic Voice AI & Generative AI Platform",
    pillars: ["AI", "DevOps", "Backend"],
    summary:
      "End-to-end agentic voice pipelines that combine speech-to-text, LLM reasoning, text-to-speech, and real-time backend processing — plus GenAI workflows for image and video generation.",
    points: [
      "Designed low-latency voice workflows with Deepgram and Cartesia, focused on streaming performance and responsive conversation.",
      "Provisioned scalable AWS infrastructure with Pulumi and serverless backends on Lambda.",
    ],
    tech: ["Node.js", "TypeScript", "AWS", "Pulumi", "Lambda", "Deepgram", "Cartesia", "LLMs"],
  },
  {
    index: "02",
    title: "Healthcare Engagement Platform",
    pillars: ["Backend"],
    summary:
      "Backend for healthcare engagement across surveys, newsletters, journey management, and performance tracking for medical representatives and healthcare professionals.",
    points: [
      "Supported data-driven marketing and analytics workflows on a production healthcare platform.",
      "Built with a modern TypeScript stack and a relational data model for journey and campaign data.",
    ],
    tech: ["Next.js", "Node.js", "PostgreSQL", "Prisma"],
  },
  {
    index: "03",
    title: "Ecommerce & Marketing Platforms",
    pillars: ["Backend", "DevOps"],
    summary:
      "Scalable backend services for ecommerce, marketing automation, content distribution, inventory, and customer workflows.",
    points: [
      "Cut content creation time by 50% and increased reach and engagement by 75% through automation.",
      "Built and operated AWS applications on EC2, Lambda, RDS, and CloudWatch.",
    ],
    tech: ["Node.js", "TypeScript", "NestJS", "AWS", "PostgreSQL", "MongoDB"],
  },
  {
    index: "04",
    title: "Security Platform Modernization",
    pillars: ["Backend"],
    summary:
      "Migration of legacy services toward Kotlin microservices, with Node.js controllers and secure service integrations.",
    points: [
      "Contributed to a large-scale service rewrite while keeping integrations secure and operable.",
    ],
    tech: ["Kotlin", "Java", "PostgreSQL", "Node.js"],
  },
  {
    index: "05",
    title: "3D Infrastructure Design Simulator",
    pillars: ["Backend"],
    summary:
      "3D infrastructure visualization for camera and sensor placement, measurements, and security-system planning.",
    points: [
      "Gave teams a visual model of infrastructure so they could plan component placement with cost-aware analysis.",
      "Built on Angular, Three.js, WebGL, Node.js, and MongoDB.",
    ],
    tech: ["Angular", "Three.js", "WebGL", "Node.js", "MongoDB"],
  },
];

export const skillGroups = [
  {
    title: "Backend",
    items: ["Node.js", "NestJS", "REST APIs", "Microservices", "Serverless", "Distributed systems"],
  },
  {
    title: "DevOps",
    items: ["AWS Lambda", "EC2", "S3", "RDS", "CloudWatch", "Docker", "Pulumi", "IaC", "GCP"],
  },
  {
    title: "AI",
    items: ["Generative AI", "LLMs", "AI Agents", "Voice AI", "STT", "TTS", "Prompt engineering"],
  },
  {
    title: "Languages",
    items: ["TypeScript", "JavaScript", "Dart", "Java", "Kotlin"],
  },
  {
    title: "Data & messaging",
    items: ["PostgreSQL", "MongoDB", "MySQL", "Kafka", "RabbitMQ", "MQTT"],
  },
  {
    title: "Frontend & mobile",
    items: ["Angular", "Next.js", "Flutter", "Three.js", "WebGL"],
  },
];

export const experience = [
  {
    company: "KeyValue Software Systems",
    location: "Thiruvananthapuram",
    roles: [
      {
        title: "Associate Technical Lead",
        dates: "Jan 2026 — Present",
        points: [
          "Building backend services and serverless architectures on Node.js and AWS Lambda.",
          "Designing AWS infrastructure with Pulumi and Infrastructure as Code.",
          "Architected Voice AI agent pipelines integrating STT, LLM orchestration, and TTS.",
          "Engineered Generative AI workflows for image and video generation.",
        ],
      },
    ],
  },
  {
    company: "QBurst Technologies",
    location: "Thiruvananthapuram",
    roles: [
      {
        title: "Lead Engineer",
        dates: "Feb 2025 — Jan 2026",
        points: [
          "Led and mentored a 10+ member backend team delivering microservice products in Node.js, TypeScript, and NestJS.",
        ],
      },
      {
        title: "Senior Engineer",
        dates: "Feb 2022 — Feb 2025",
        points: [
          "Improved delivery efficiency by 20% and optimized resource allocation, contributing to a 15% reduction in project costs.",
          "Designed backend solutions across healthcare, marketing, and ecommerce, including data, analytics, and automation.",
        ],
      },
      {
        title: "Software Engineer",
        dates: "Sep 2020 — Feb 2022",
        points: [
          "Built a marketing content platform that reduced content creation time by 50% and increased reach by 75%.",
          "Shipped AWS applications on EC2, Lambda, RDS, and CloudWatch, including systems handling sensitive healthcare data.",
        ],
      },
    ],
  },
  {
    company: "Pivot Systems Inc.",
    location: "Thiruvananthapuram",
    roles: [
      {
        title: "Associate Software Engineer",
        dates: "Jun 2018 — Sep 2020",
        points: [
          "Delivered a 3D infrastructure visualization and planning product with Angular, Three.js, WebGL, Node.js, and MongoDB.",
          "Built secure REST APIs and web gateways with role-based access control.",
          "Supported cloud deployments, monitoring, and application performance optimization.",
        ],
      },
    ],
  },
  {
    company: "Independent / Freelance",
    location: "India · Singapore · Indonesia",
    roles: [
      {
        title: "Software Engineer",
        dates: "2015 — Present",
        points: [
          "Built booking, inventory, client management, and workflow products for businesses and clinics.",
          "Worked end-to-end with clients: requirements, architecture, development, deployment, and production support.",
          "Stack included Node.js, Flutter, and Firebase.",
        ],
      },
    ],
  },
];

export const community = {
  org: "Prathidhwani Technical Forum",
  title: "Backend Developer / Community Contributor",
  dates: "Jun 2020 — Apr 2022",
  summary:
    "Volunteer backend work for a Kerala technical community that helps job seekers and professionals.",
  points: [
    "Contributed backend development and technical implementation for community-focused platforms.",
    "Supported tools used by job seekers and working professionals in the Prathidhwani network.",
    "Worked as a community contributor alongside full-time engineering roles.",
  ],
};

export const education = {
  degree: "B.Tech — Computer Science and Engineering",
  school: "Valia Koonambaikulathamma College of Engineering & Technology",
  affiliation: "Kerala University",
  dates: "2014 — 2018",
};

export const certifications = [
  "Generative AI Foundations",
  "Generative AI — Fundamentals",
  "Microsoft Azure Fundamentals",
  "Full Stack Development — Mashup Stack",
];

export const languages = [
  { name: "English", level: "Full professional" },
  { name: "Malayalam", level: "Native" },
  { name: "Hindi", level: "Limited working" },
];
