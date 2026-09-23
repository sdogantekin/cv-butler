export const en = {
  common: {
    copy: "Copy",
    copied: "Copied!",
    logOut: "Log out",
    openOnGithub: "View on GitHub",
    getStartedFree: "Get Started Free",
    actionsRemainingToday: "{count} action(s) remaining today",
  },
  // Keyed by ApiErrorCode (src/lib/api-errors.ts) — every API route error
  // response is built from this, never a hardcoded English string.
  errors: {
    unauthorized: "You need to be signed in to do this.",
    missing_resume_file: "Please attach a resume file.",
    invalid_resume_file: "That resume file looks invalid or empty. Please try a different file.",
    unsupported_file_type: "Only PDF and .docx resumes are supported (no scanned PDFs or legacy .doc).",
    file_too_large: "Resume file must be 10MB or smaller.",
    invalid_job_description: "Please provide a valid job description (1–20,000 characters).",
    invalid_company_name: "Company name is too long.",
    invalid_request: "That request wasn't valid. Please try again.",
    resume_not_found: "Resume not found.",
    daily_limit_reached: "You've reached today's action limit. Try again tomorrow.",
    invalid_previous_match: "The previous match result couldn't be read. Please start a new match.",
    resume_parsing_failed: "We couldn't read your resume. Please try a different file.",
    analysis_failed: "Something went wrong while analyzing your resume.",
    comparison_failed: "Something went wrong while comparing your resumes.",
    generation_failed: "Something went wrong while generating your cover letter.",
  },
  severity: {
    critical: "Critical",
    moderate: "Moderate",
    minor: "Minor",
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
      issuesDiscussions: "Issues and discussions",
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
      comingBadge: "Coming soon",
      comingText: "More guides are on the way — here's what's planned next.",
      availableBadge: "Guide available",
      readGuideCta: "Read guide",
      topics: [
        {
          title: "Beating the ATS",
          description: "Formatting rules that keep parsers happy.",
          slug: "beating-the-ats",
        },
        {
          title: "Keyword strategy",
          description: "Matching your language to the listing's.",
          slug: "keyword-strategy",
        },
        {
          title: "How screeners work",
          description: "What automated systems check for, and why.",
          slug: "how-screeners-work",
        },
      ],
      beatingTheAts: {
        backLink: "Back to Learning Hub",
        title: "Beating the ATS",
        subtitle:
          "Formatting rules that keep applicant tracking systems from mangling your resume before a human ever sees it.",
        sections: [
          {
            heading: "Layout",
            rules: [
              "Use a single-column layout. Multi-column and sidebar designs often get read out of order or dropped entirely.",
              "Skip images, icons, logos, and graphics — parsers can't read them, and a headshot won't help your score.",
              "Avoid text boxes, shapes, and Word SmartArt. Content placed inside them is frequently skipped.",
              "Avoid tables for structure. If you must use one for alignment, keep it minimal — many parsers read across rows instead of down columns.",
              "Never put contact details or key content in a header or footer. Plenty of ATS ignore that area completely.",
            ],
          },
          {
            heading: "File format & name",
            rules: [
              "Save as a PDF — it's the safest bet for modern ATS. Use DOCX only if the job posting explicitly asks for it.",
              "Never upload a scanned PDF. It's just an image, and there's no text underneath for the parser to extract.",
              "Name the file Firstname_Lastname_CV.pdf. Skip dates, version numbers, and special characters in the filename.",
            ],
          },
          {
            heading: "Fonts & sizing",
            rules: [
              "Stick to universal, ATS-safe fonts: Arial, Calibri, Helvetica, Times New Roman, or Verdana.",
              "Avoid condensed or decorative fonts, however stylish they look.",
              "Keep body text at 10–12pt and headings at 12–14pt.",
            ],
          },
          {
            heading: "Characters, bullets & headings",
            rules: [
              "Avoid special icons (☎ ✉ ➤ ✔), emojis (🚀 ⭐), and decorative bullets (■ ◆) — use a plain \"•\" or a hyphen instead.",
              "Use standard section headings the parser recognizes, like \"Experience,\" not creative alternatives like \"Career Journey.\"",
              "Keep date formats consistent throughout — don't mix \"Jan 2020\" with \"2020-01\" in the same document.",
            ],
          },
        ],
        breakersTitle: "ATS breakers — avoid these at all costs",
        breakers: [
          "Photos or logos",
          "Multi-column layouts",
          "Text boxes",
          "Tables used for structure",
          "Headers or footers holding key information",
          "Icons (☎ ✉ ✔)",
          "Uncommon or decorative fonts",
          "PDFs exported straight from design tools like Figma or Canva",
          "Over-stylized templates",
          "\"&\" in place of \"and\" within keyword phrases",
          "Hyphenated line breaks splitting words across lines",
          "Inconsistent spelling variants (e.g. mixing \"analyse\" and \"analyze\")",
        ],
        checklistTitle: "Final formatting checklist",
        checklist: [
          {
            category: "Structure",
            items: ["Single column", "Standard section headings", "No images or graphics"],
          },
          {
            category: "Formatting",
            items: [
              "Clean PDF export",
              "Plain, extractable text",
              "Standard font",
              "No special characters or icons",
            ],
          },
          {
            category: "Content",
            items: [
              "Consistent date formats",
              "Contact info in the main body, not header/footer",
              "Certifications and section titles spelled out in full",
            ],
          },
        ],
      },
      keywordStrategy: {
        backLink: "Back to Learning Hub",
        title: "Keyword Strategy",
        subtitle:
          "How to match your resume's language to the job listing's, so both the parser and the recruiter see the fit.",
        sections: [
          {
            heading: "Find your target keywords",
            rules: [
              "Pull them straight from the job description: responsibilities, required skills, nice-to-have skills, certifications, tools and technologies, and any industry terms that keep coming up.",
              "Weight what's listed as required or repeated more than once over anything mentioned just once as a nice-to-have.",
            ],
          },
          {
            heading: "Match the listing's exact wording",
            rules: [
              "ATS keyword matching is literal. If the listing says \"stakeholder management,\" write that — not \"stakeholder coordination.\"",
              "Only swap in a synonym if the listing itself uses it somewhere else. Otherwise, keep its exact phrasing.",
              "Watch regional spelling. \"Data visualisation\" and \"data visualization\" are different strings to a parser — match whichever the listing uses.",
            ],
          },
          {
            heading: "Place keywords where the parser looks first",
            rules: [
              "Summary: work 4–6 of your strongest keyword skills into 1–3 sentences right at the top.",
              "Skills section: list them as a flat, comma-separated list rather than bullets — parsers extract this section on its own, and comma lists parse more reliably.",
              "Experience bullets: weave keywords into the achievements themselves, not just the standalone skills list.",
              "Education: only add keywords or coursework here if they genuinely apply — padding this section doesn't help.",
            ],
          },
          {
            heading: "Repeat critical keywords, naturally",
            rules: [
              "Aim for each critical keyword to show up 2–4 times across the whole document — summary, skills, and experience combined.",
              "The repetition should read naturally in context. A recruiter reads the same document a parser does, so it still has to make sense as prose.",
            ],
          },
        ],
        bulletFormulaTitle: "The bullet formula for experience",
        bulletFormulaFormula: "Verb + skill/keyword + outcome",
        bulletFormulaExamples: [
          "Improved a Python data pipeline's efficiency by 30% by implementing optimized scripts.",
          "Led a team of 5 analysts, delivering insights that increased revenue by €1.2M.",
          "Developed Power BI dashboards used by 120+ stakeholders across Finance and Operations.",
        ],
        mistakesTitle: "Keyword mistakes to avoid",
        mistakes: [
          "Swapping in a synonym the listing doesn't use, even if it means the same thing",
          "Keyword-stuffing the skills section with terms that don't appear anywhere else in the CV",
          "Listing skills only once, in a wall at the bottom, instead of reinforcing them in the summary and experience bullets",
          "Ignoring a regional spelling the listing specifically uses (e.g. \"optimise\" vs \"optimize\")",
          "Weakening a job title match unnecessarily (e.g. \"Business Analyst – Intern\" instead of \"Business Analyst Intern\")",
        ],
        checklistTitle: "Keyword strategy checklist",
        checklist: [
          {
            category: "Research",
            items: [
              "All required and nice-to-have keywords extracted from the listing",
              "Recurring industry terms noted",
            ],
          },
          {
            category: "Placement",
            items: [
              "4–6 keywords worked into the summary",
              "Skills listed as a flat, comma-separated list",
              "Keywords woven into experience bullets",
            ],
          },
          {
            category: "Wording",
            items: [
              "Exact listing phrasing used, not synonyms",
              "Consistent regional spelling",
              "Each critical keyword repeated 2–4 times",
            ],
          },
        ],
      },
      howScreenersWork: {
        backLink: "Back to Learning Hub",
        title: "How Screeners Work",
        subtitle:
          "What an ATS actually checks, how your score gets calculated, and why qualified candidates still get rejected.",
        sections: [
          {
            heading: "What an ATS actually does",
            rules: [
              "It's recruitment software, not a human reviewer — think of it as a first-round interview conducted by a computer before anyone reads your CV.",
              "It collects and stores every application in a database, then parses each CV to extract structured fields like contact info, job titles, dates, and skills.",
              "It ranks candidates by keyword match and other criteria, then filters out anything that doesn't meet the minimum requirements the recruiter set.",
              "Nearly every large employer uses one — over 98% of Fortune 500 companies and roughly 75% of employers overall.",
            ],
          },
          {
            heading: "The systems you're actually up against",
            rules: [
              "Enterprise: Workday, Taleo (Oracle), SuccessFactors (SAP), and iCIMS — common at large and Fortune 500 companies.",
              "Mid-market: Greenhouse, Lever, SmartRecruiters, and Jobvite — common at tech companies and startups.",
              "Small business: BambooHR, Zoho Recruit, and Bullhorn — common at smaller companies and staffing agencies.",
              "Each has different parsing quirks — some handle formatting or synonyms better than others — which is exactly why a clean, standard-format CV maximizes compatibility across all of them.",
            ],
          },
          {
            heading: "How your score gets calculated",
            rules: [
              "Keyword match (40–60% of the score): how many required keywords appear, how often, and where — skills section, summary, and experience all count.",
              "Experience match (20–30%): your years of experience against what's required, and how closely your job titles match the role.",
              "Education & certifications (10–20%): whether required degrees or certifications are present and relevant.",
              "Other factors (10–20%): things like location match, salary expectations, and whether the application is complete.",
            ],
          },
        ],
        scoreRangesTitle: "What the score actually means",
        scoreRanges: [
          { range: "80–100%", label: "Human review", description: "Your CV reaches a recruiter." },
          {
            range: "60–79%",
            label: "Maybe reviewed",
            description: "Depends on how many other applicants there are.",
          },
          { range: "0–59%", label: "Auto-rejected", description: "Filtered out before anyone sees it." },
        ],
        funnelTitle: "The funnel doesn't stop at the ATS",
        funnelSteps: [
          {
            stage: "ATS filtering",
            detail: "Automated keyword and requirement matching eliminates 50–75% of applications.",
          },
          {
            stage: "Recruiter quick scan",
            detail:
              "About 6–10 seconds, checking title, companies, education, and keywords — plus red flags like gaps or job-hopping.",
          },
          {
            stage: "Detailed review",
            detail:
              "2–3 minutes, only for CVs that survive the scan, weighed against the rest of the shortlist.",
          },
          {
            stage: "Phone screening & interviews",
            detail: "15–30 minutes to verify experience and fit before the final rounds.",
          },
        ],
        rejectionTitle: "Why qualified candidates still get rejected",
        rejectionReasons: [
          "Missing keywords — you have the skill, but used different terminology than the listing",
          "Formatting that broke parsing, even though the experience was there",
          "Key information buried instead of highlighted in the first 6–10 seconds",
          "Gaps or inconsistencies that raised a flag with no context to explain them",
          "The role was filled internally, budgeted out, or frozen after the posting went up",
          "Simple competition — hundreds of applicants, referrals, or internal candidates prioritized",
        ],
      },
    },
  },
};

export type Dictionary = typeof en;
