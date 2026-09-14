export const en = {
  common: {
    copy: "Copy",
    copied: "Copied!",
    logOut: "Log out",
    openOnGithub: "View on GitHub",
    getStartedFree: "Get Started Free",
    actionsRemainingToday: "{count} action(s) remaining today",
  },
  severity: {
    critical: "Critical",
    moderate: "Moderate",
    minor: "Minor",
  },
  languageSwitcher: {
    comingSoon: "{language} support is coming in a future iteration — staying in English for now.",
    german: "German",
  },
  resumeDropzone: {
    title: "Drop your resume here",
    subtitle: "PDF or DOCX",
    uploadButton: "Upload resume",
  },
  processingIndicator: {
    subtitle: "This usually takes under a minute.",
  },
  landing: {
    header: {
      navFeatures: "Features",
      navHowItWorks: "How it works",
      navRoadmap: "Roadmap",
      navLearningHub: "Learning Hub",
      navFaq: "FAQ",
      logIn: "Log in",
    },
    hero: {
      badge: "Open source · Free to use today",
      title: "Get your resume past the bots.",
      subtitle:
        "CV Butler scores your resume against real ATS systems, matches it to any job description, and writes tailored cover letters — free, open source, no catch.",
      freeNote: "100% free · No credit card · MIT licensed · Self-hostable",
      cardTitle: "Your ATS Score",
      cardSubtitle: "Senior Product Designer · matched against your resume",
      keywordsMatched: "Keywords matched",
      keywordsMatchedValue: "18 / 22",
      formatting: "Formatting",
      formattingValue: "ATS-safe",
      quickFixesFound: "Quick fixes found",
      quickFixesFoundValue: "3",
      illustrativeNote: "Illustrative example — your results will vary",
    },
    howItWorks: {
      heading: "How it works",
      subheading: "Pick the tool you need — each one works with just your resume.",
      steps: [
        {
          title: "Upload your resume for an ATS review",
          description:
            "Get a score and concrete suggestions on formatting, keywords, and fixes — no job description needed.",
        },
        {
          title: "Compare it to a job description",
          description: "Paste any listing to see how well your resume matches it, and what to adjust.",
        },
        {
          title: "Generate a cover letter",
          description:
            "Using your resume, with a job description as an optional add-on for tighter targeting.",
        },
      ],
    },
    features: {
      heading: "Everything you need to land the interview",
      subheading: "Three core tools, built to work together.",
      items: [
        {
          title: "ATS Score & Analysis",
          subtitle: "Know exactly how screening software reads your resume before you hit submit.",
          description:
            "Get a 0–100 score with a plain-language breakdown of formatting issues, missing keywords, and quick fixes.",
        },
        {
          title: "Job Description Matching",
          subtitle: "Paste any listing and see how well your resume actually lines up.",
          description:
            "Surfaces the skills and keywords the role asks for that your resume is missing, so you can tailor it per application.",
        },
        {
          title: "Cover Letter Generation",
          subtitle: "A tailored draft in the time it takes to read the job post.",
          description:
            "Generates a first draft grounded in your actual experience and the job description — you edit and send.",
        },
      ],
    },
    roadmap: {
      heading: "What's next",
      subheading: "CV Butler is under active development. Here's what's coming.",
      items: [
        {
          badge: "v3",
          title: "Local-model support via Ollama",
          description: "Run scoring and matching against your own local model instead of a hosted one.",
        },
        {
          badge: "Future",
          title: "Job application tracking",
          description: "Track every application — company, resume, cover letter, and status — all in one place.",
        },
      ],
      followProgress: "Follow progress",
    },
    learningHubCta: {
      title: "New to ATS systems?",
      description:
        "Visit the ATS Learning Hub for free guides on resume formatting, keyword strategy, and how automated screeners actually work.",
      cta: "Visit the Learning Hub →",
    },
    faq: {
      heading: "Frequently asked questions",
      items: [
        {
          question: "Is CV Butler really free?",
          answer: "Yes. CV Butler is open source under the MIT license — free to use, free to self-host, free to modify.",
        },
        {
          question: "What happens to my resume data?",
          answer:
            "Being open source, the code handling your data is public and auditable, and you can self-host your own instance. Local-model support that keeps everything on your own machine is planned for v3, via Ollama.",
        },
        {
          question: "Do I need to install anything to try it?",
          answer: "No — get started free in the browser. Self-hosting is optional, for anyone who wants to run their own instance.",
        },
        {
          question: "What's next on the roadmap?",
          answer:
            "v3 adds local-model support through Ollama, so scoring, matching, and cover letter generation can run against a model you host yourself instead of a hosted API — see the roadmap above for what's coming.",
        },
      ],
    },
    finalCta: {
      heading: "Ready to fix your resume?",
    },
    footer: {
      tagline: "Open-source AI career assistant. MIT licensed.",
      productHeading: "Product",
      resourcesHeading: "Resources",
      communityHeading: "Community",
      issuesDiscussions: "Issues & discussions",
      mitLicense: "MIT License",
      copyright:
        "© 2026 CV Butler · Open source under the MIT license · Independent project, not affiliated with any commercial career platform.",
    },
  },
  auth: {
    signIn: {
      title: "Sign in to CV Butler",
      subtitle: "{count} free actions per day. No credit card required.",
      continueWithGoogle: "Continue with Google",
    },
  },
  dashboard: {
    sidebar: {
      home: "Home",
      atsReview: "ATS Review",
      jobMatching: "Job Matching",
      coverLetterGeneration: "Cover Letter Generation",
      learningHub: "Learning Hub",
    },
    home: {
      welcomeBack: "Welcome back, {name}",
      statsAtsReviews: "ATS reviews",
      statsJobMatches: "Job matches",
      statsCoverLetters: "Cover letters",
      shareTitle: "Know someone job hunting?",
      shareDescription: "Share this free, open-source tool with a friend.",
      copyLink: "Copy link",
      copyLinkFailed: "Couldn't copy the link — copy it from your browser's address bar instead.",
      starOnGithub: "Star on GitHub",
      jumpBackIn: "Jump back in",
      open: "Open",
      cards: {
        atsReview: { title: "ATS Review", description: "Score your resume against real ATS systems." },
        jobMatching: { title: "Job Matching", description: "Compare your resume to a job description." },
        coverLetter: { title: "Cover Letter", description: "Generate a tailored draft from your resume." },
        learningHub: { title: "Learning Hub", description: "Guides on formatting, keywords, and ATS." },
      },
    },
    atsReview: {
      formTitle: "ATS Review",
      formSubtitle:
        "Upload your resume to get a 0–100 score with a plain-language breakdown of formatting issues, missing keywords, and quick fixes.",
      startReview: "Start ATS Review",
      analyzing: "Analyzing your resume against ATS systems…",
      analyzeFailed: "Failed to analyze resume",
      genericError: "Something went wrong while analyzing your resume.",
      scoreReady: "ATS score ready. {count} action(s) left today.",
      runAnotherReview: "Run another review",
      resultTitle: "Your ATS Score",
      resultSubtitle: "Here's how your resume scored, category by category.",
      scoreLabel: "ATS Score: {score}/100",
      categoryBreakdown: "Category breakdown",
      recommendations: "Recommendations",
      categoryNames: {
        "Contact Information": "Contact Information",
        "Section Structure": "Section Structure",
        "Date Formatting": "Date Formatting",
        "Resume Length & Content Depth": "Resume Length & Content Depth",
        "Quantified Achievements": "Quantified Achievements",
        "Keyword & Content Relevance": "Keyword & Content Relevance",
      },
    },
    jobMatching: {
      formTitle: "Job Matching",
      formSubtitle: "Upload your resume and paste a job description to see how well it matches and what to adjust.",
      companyNameLabel: "Company name",
      companyNameOptional: "(optional)",
      companyNamePlaceholder: "e.g. Acme Corp",
      jobDescriptionLabel: "Job description",
      jobDescriptionRequired: "(required)",
      jobDescriptionPlaceholder: "Paste the job description here",
      startMatching: "Start matching",
      matching: "Comparing your resume to the job description…",
      matchFailed: "Failed to match job description",
      genericError: "Something went wrong while matching the job description.",
      matchReady: "Match ready. {count} action(s) left today.",
      resultTitle: "Match Results",
      resultSubtitle: "Here's how your resume matches the job description, category by category.",
      scoreLabel: "Match Score: {score}/100",
      unmetConstraintWarning: "Score reflects an unmet requirement below — skills/experience fit alone would score higher.",
      requirements: "Requirements",
      met: "Met",
      notMet: "Not met",
      categoryBreakdown: "Category breakdown",
      recommendations: "Recommendations",
      uploadUpdatedTitle: "Upload your updated resume",
      uploadUpdatedDescription: "Made changes based on the feedback above? Upload the new version to see what improved.",
      uploadUpdatedButton: "Upload updated resume",
      startNewMatch: "Start new match",
      dimensionNames: {
        Skills: "Skills",
        Experience: "Experience",
        Education: "Education",
        "Domain Fit": "Domain Fit",
        "Seniority Fit": "Seniority Fit",
        "Culture Fit": "Culture Fit",
      },
      compareForm: {
        title: "Upload your updated resume",
        description: "Made changes based on the feedback above? Upload the new version to see what improved.",
        compareButton: "Compare with original",
        cancel: "Cancel",
        comparing: "Comparing your updated resume…",
        compareFailed: "Failed to compare resumes",
        compareGenericError: "Something went wrong while comparing your updated resume.",
      },
      diff: {
        title: "Before & After",
        before: "Before",
        after: "After",
        categoryBreakdown: "Category breakdown",
        resolved: "Resolved",
        stillOpen: "Still open",
        newIssuesIntroduced: "New issues introduced",
      },
    },
    coverLetter: {
      formTitle: "Cover Letter Generation",
      formSubtitle: "Generate a tailored draft using your resume, with a job description as an optional add-on for tighter targeting.",
      jobDescriptionLabel: "Job description",
      jobDescriptionOptional: "(optional)",
      jobDescriptionHint: "Leave blank for a general cover letter, or paste a job description for one tailored to it.",
      jobDescriptionPlaceholder: "Paste the job description here",
      generateButton: "Generate cover letter",
      writing: "Writing your cover letter…",
      generateFailed: "Failed to generate cover letter",
      genericError: "Something went wrong while generating the cover letter.",
      letterReady: "Cover letter ready. {count} action(s) left today.",
      resultTitle: "Your Cover Letter",
      resultSubtitle: "Here's the draft generated from your resume.",
      generateAnother: "Generate another",
      general: "General",
      targeted: "Targeted",
      copyFailed: "Couldn't copy — select and copy the text manually instead.",
    },
    learningHub: {
      title: "ATS Learning Hub",
      subtitle: "Free guides on resume formatting, keyword strategy, and how automated screeners actually work.",
      comingBadge: "Coming in v3",
      comingText: "Full guides aren't available yet — here's a preview of what's planned.",
      topics: [
        { title: "Beating the ATS", description: "Formatting rules that keep parsers happy." },
        { title: "Keyword strategy", description: "Matching your language to the listing's." },
        { title: "How screeners work", description: "What automated systems check for, and why." },
      ],
    },
  },
};

export type Dictionary = typeof en;
