import type { Dictionary } from "./en";

export const de: Dictionary = {
  common: {
    copy: "Kopieren",
    copied: "Kopiert!",
    logOut: "Abmelden",
    openOnGithub: "Auf GitHub ansehen",
    getStartedFree: "Kostenlos starten",
    actionsRemainingToday: "{count} Aktion(en) heute übrig",
  },
  errors: {
    unauthorized: "Sie müssen angemeldet sein, um das zu tun.",
    missing_resume_file: "Bitte fügen Sie eine Lebenslauf-Datei hinzu.",
    invalid_resume_file: "Diese Lebenslauf-Datei scheint ungültig oder leer zu sein. Bitte versuchen Sie eine andere Datei.",
    unsupported_file_type:
      "Nur PDF- und .docx-Lebensläufe werden unterstützt (keine gescannten PDFs oder das alte .doc-Format).",
    file_too_large: "Die Lebenslauf-Datei darf höchstens 10 MB groß sein.",
    invalid_job_description: "Bitte geben Sie eine gültige Stellenbeschreibung ein (1–20.000 Zeichen).",
    invalid_company_name: "Der Firmenname ist zu lang.",
    invalid_request: "Diese Anfrage war ungültig. Bitte versuchen Sie es erneut.",
    resume_not_found: "Lebenslauf nicht gefunden.",
    daily_limit_reached: "Sie haben Ihr heutiges Aktionslimit erreicht. Bitte versuchen Sie es morgen erneut.",
    invalid_previous_match: "Das vorherige Abgleichsergebnis konnte nicht gelesen werden. Bitte starten Sie einen neuen Abgleich.",
    resume_parsing_failed: "Ihr Lebenslauf konnte nicht gelesen werden. Bitte versuchen Sie eine andere Datei.",
    analysis_failed: "Beim Analysieren Ihres Lebenslaufs ist etwas schiefgelaufen.",
    comparison_failed: "Beim Vergleichen Ihrer Lebensläufe ist etwas schiefgelaufen.",
    generation_failed: "Beim Erstellen Ihres Anschreibens ist etwas schiefgelaufen.",
  },
  severity: {
    critical: "Kritisch",
    moderate: "Mittel",
    minor: "Gering",
  },
  resumeDropzone: {
    title: "Lebenslauf hier ablegen",
    subtitle: "PDF oder DOCX",
    uploadButton: "Lebenslauf hochladen",
  },
  processingIndicator: {
    subtitle: "Das dauert normalerweise weniger als eine Minute.",
  },
  landing: {
    header: {
      navFeatures: "Funktionen",
      navHowItWorks: "So funktioniert's",
      navRoadmap: "Roadmap",
      navLearningHub: "Wissenszentrum",
      navFaq: "FAQ",
      logIn: "Anmelden",
    },
    hero: {
      badge: "Open Source · Heute kostenlos nutzen",
      title: "Bringen Sie Ihren Lebenslauf an den Bots vorbei.",
      subtitle:
        "CV Butler bewertet Ihren Lebenslauf anhand echter ATS-Systeme, gleicht ihn mit jeder Stellenbeschreibung ab und schreibt maßgeschneiderte Anschreiben — kostenlos, Open Source, ohne Haken.",
      freeNote: "100 % kostenlos · Keine Kreditkarte nötig · MIT-lizenziert · Selbst hostbar",
      cardTitle: "Ihr ATS-Score",
      cardSubtitle: "Senior Product Designer · abgeglichen mit Ihrem Lebenslauf",
      keywordsMatched: "Übereinstimmende Keywords",
      keywordsMatchedValue: "18 / 22",
      formatting: "Formatierung",
      formattingValue: "ATS-sicher",
      quickFixesFound: "Gefundene Schnellkorrekturen",
      quickFixesFoundValue: "3",
      illustrativeNote: "Illustratives Beispiel — Ihre Ergebnisse können abweichen",
    },
    howItWorks: {
      heading: "So funktioniert's",
      subheading: "Wählen Sie das Tool, das Sie brauchen — jedes funktioniert allein mit Ihrem Lebenslauf.",
      steps: [
        {
          title: "Lebenslauf für eine ATS-Prüfung hochladen",
          description:
            "Erhalten Sie einen Score und konkrete Vorschläge zu Formatierung, Keywords und Korrekturen — ganz ohne Stellenbeschreibung.",
        },
        {
          title: "Mit einer Stellenbeschreibung abgleichen",
          description: "Fügen Sie eine beliebige Stellenanzeige ein, um zu sehen, wie gut Ihr Lebenslauf passt und was Sie anpassen sollten.",
        },
        {
          title: "Ein Anschreiben erstellen",
          description:
            "Basierend auf Ihrem Lebenslauf, optional ergänzt durch eine Stellenbeschreibung für eine gezieltere Ausrichtung.",
        },
      ],
    },
    features: {
      heading: "Alles, was Sie brauchen, um das Vorstellungsgespräch zu bekommen",
      subheading: "Drei Kernwerkzeuge, die zusammen funktionieren.",
      items: [
        {
          title: "ATS-Score & Analyse",
          subtitle: "Erfahren Sie genau, wie Screening-Software Ihren Lebenslauf liest, bevor Sie ihn einreichen.",
          description:
            "Erhalten Sie einen Score von 0–100 mit einer verständlichen Aufschlüsselung von Formatierungsproblemen, fehlenden Keywords und Schnellkorrekturen.",
        },
        {
          title: "Abgleich mit Stellenbeschreibungen",
          subtitle: "Fügen Sie eine beliebige Anzeige ein und sehen Sie, wie gut Ihr Lebenslauf wirklich passt.",
          description:
            "Zeigt die Fähigkeiten und Keywords, die in der Stelle gefordert werden und in Ihrem Lebenslauf fehlen, damit Sie ihn für jede Bewerbung anpassen können.",
        },
        {
          title: "Anschreiben erstellen",
          subtitle: "Ein maßgeschneiderter Entwurf in der Zeit, die Sie zum Lesen der Stellenanzeige brauchen.",
          description:
            "Erstellt einen ersten Entwurf, der auf Ihrer tatsächlichen Erfahrung und der Stellenbeschreibung basiert — Sie bearbeiten und senden ihn.",
        },
      ],
    },
    roadmap: {
      heading: "Was als Nächstes kommt",
      subheading: "CV Butler wird aktiv weiterentwickelt. Das kommt als Nächstes.",
      items: [
        {
          badge: "v3",
          title: "Unterstützung für lokale Modelle über Ollama",
          description: "Führen Sie Scoring und Abgleich mit Ihrem eigenen lokalen Modell statt eines gehosteten Modells aus.",
        },
        {
          badge: "Zukunft",
          title: "Bewerbungsverfolgung",
          description: "Behalten Sie jede Bewerbung im Blick — Firma, Lebenslauf, Anschreiben und Status — alles an einem Ort.",
        },
      ],
      followProgress: "Fortschritt verfolgen",
    },
    learningHubCta: {
      title: "Neu bei ATS-Systemen?",
      description:
        "Besuchen Sie das ATS-Wissenszentrum für kostenlose Anleitungen zu Lebenslauf-Formatierung, Keyword-Strategie und wie automatisierte Screener wirklich funktionieren.",
      cta: "Zum Wissenszentrum →",
    },
    faq: {
      heading: "Häufig gestellte Fragen",
      items: [
        {
          question: "Ist CV Butler wirklich kostenlos?",
          answer: "Ja. CV Butler ist Open Source unter der MIT-Lizenz — kostenlos nutzbar, kostenlos selbst hostbar, kostenlos veränderbar.",
        },
        {
          question: "Was passiert mit meinen Lebenslaufdaten?",
          answer:
            "Da der Code Open Source ist, ist der Code, der Ihre Daten verarbeitet, öffentlich einsehbar und überprüfbar, und Sie können Ihre eigene Instanz selbst hosten. Unterstützung für lokale Modelle, bei denen alles auf Ihrem eigenen Rechner bleibt, ist für v3 über Ollama geplant.",
        },
        {
          question: "Muss ich etwas installieren, um es auszuprobieren?",
          answer: "Nein — starten Sie kostenlos im Browser. Self-Hosting ist optional, für alle, die eine eigene Instanz betreiben möchten.",
        },
        {
          question: "Was kommt als Nächstes auf der Roadmap?",
          answer:
            "v3 bringt Unterstützung für lokale Modelle über Ollama, sodass Scoring, Abgleich und Anschreiben-Erstellung mit einem selbst gehosteten Modell statt einer gehosteten API laufen können — siehe die Roadmap oben für weitere Details.",
        },
      ],
    },
    finalCta: {
      heading: "Bereit, Ihren Lebenslauf zu verbessern?",
    },
    footer: {
      tagline: "Open-Source-KI-Karriereassistent. MIT-lizenziert.",
      productHeading: "Produkt",
      resourcesHeading: "Ressourcen",
      communityHeading: "Community",
      issuesDiscussions: "Issues und Diskussionen",
      mitLicense: "MIT-Lizenz",
      copyright:
        "© 2026 CV Butler · Open Source unter der MIT-Lizenz · Unabhängiges Projekt, nicht mit einer kommerziellen Karriereplattform verbunden.",
    },
  },
  auth: {
    signIn: {
      title: "Bei CV Butler anmelden",
      subtitle: "{count} kostenlose Aktionen pro Tag. Keine Kreditkarte erforderlich.",
      continueWithGoogle: "Mit Google fortfahren",
    },
  },
  dashboard: {
    sidebar: {
      home: "Start",
      atsReview: "ATS-Prüfung",
      jobMatching: "Job-Abgleich",
      coverLetterGeneration: "Anschreiben erstellen",
      learningHub: "Wissenszentrum",
    },
    home: {
      welcomeBack: "Willkommen zurück, {name}",
      statsAtsReviews: "ATS-Prüfungen",
      statsJobMatches: "Job-Abgleiche",
      statsCoverLetters: "Anschreiben",
      shareTitle: "Kennen Sie jemanden auf Jobsuche?",
      shareDescription: "Teilen Sie dieses kostenlose Open-Source-Tool mit einem Freund.",
      copyLink: "Link kopieren",
      copyLinkFailed: "Der Link konnte nicht kopiert werden — kopieren Sie ihn stattdessen aus der Adressleiste Ihres Browsers.",
      starOnGithub: "Auf GitHub sternen",
      jumpBackIn: "Weiter geht's",
      open: "Öffnen",
      cards: {
        atsReview: { title: "ATS-Prüfung", description: "Bewerten Sie Ihren Lebenslauf anhand echter ATS-Systeme." },
        jobMatching: { title: "Job-Abgleich", description: "Gleichen Sie Ihren Lebenslauf mit einer Stellenbeschreibung ab." },
        coverLetter: { title: "Anschreiben", description: "Erstellen Sie einen maßgeschneiderten Entwurf aus Ihrem Lebenslauf." },
        learningHub: { title: "Wissenszentrum", description: "Anleitungen zu Formatierung, Keywords und ATS." },
      },
    },
    atsReview: {
      formTitle: "ATS-Prüfung",
      formSubtitle:
        "Laden Sie Ihren Lebenslauf hoch, um einen Score von 0–100 mit einer verständlichen Aufschlüsselung von Formatierungsproblemen, fehlenden Keywords und Schnellkorrekturen zu erhalten.",
      startReview: "ATS-Prüfung starten",
      analyzing: "Ihr Lebenslauf wird mit ATS-Systemen analysiert…",
      analyzeFailed: "Lebenslauf konnte nicht analysiert werden",
      genericError: "Beim Analysieren Ihres Lebenslaufs ist etwas schiefgelaufen.",
      scoreReady: "ATS-Score bereit. Noch {count} Aktion(en) heute übrig.",
      runAnotherReview: "Weitere Prüfung durchführen",
      resultTitle: "Ihr ATS-Score",
      resultSubtitle: "So hat Ihr Lebenslauf abgeschnitten, Kategorie für Kategorie.",
      scoreLabel: "ATS-Score: {score}/100",
      categoryBreakdown: "Kategorie-Aufschlüsselung",
      recommendations: "Empfehlungen",
      categoryNames: {
        "Contact Information": "Kontaktinformationen",
        "Section Structure": "Abschnittsstruktur",
        "Date Formatting": "Datumsformatierung",
        "Resume Length & Content Depth": "Lebenslauflänge & Inhaltstiefe",
        "Quantified Achievements": "Quantifizierte Erfolge",
        "Keyword & Content Relevance": "Keyword- & Inhaltsrelevanz",
      },
    },
    jobMatching: {
      formTitle: "Job-Abgleich",
      formSubtitle: "Laden Sie Ihren Lebenslauf hoch und fügen Sie eine Stellenbeschreibung ein, um zu sehen, wie gut sie passt und was Sie anpassen sollten.",
      companyNameLabel: "Firmenname",
      companyNameOptional: "(optional)",
      companyNamePlaceholder: "z. B. Acme GmbH",
      jobDescriptionLabel: "Stellenbeschreibung",
      jobDescriptionRequired: "(erforderlich)",
      jobDescriptionPlaceholder: "Stellenbeschreibung hier einfügen",
      startMatching: "Abgleich starten",
      matching: "Ihr Lebenslauf wird mit der Stellenbeschreibung verglichen…",
      matchFailed: "Stellenbeschreibung konnte nicht abgeglichen werden",
      genericError: "Beim Abgleichen der Stellenbeschreibung ist etwas schiefgelaufen.",
      matchReady: "Abgleich bereit. Noch {count} Aktion(en) heute übrig.",
      resultTitle: "Abgleichsergebnisse",
      resultSubtitle: "So passt Ihr Lebenslauf zur Stellenbeschreibung, Kategorie für Kategorie.",
      scoreLabel: "Abgleich-Score: {score}/100",
      unmetConstraintWarning: "Der Score spiegelt eine unten nicht erfüllte Anforderung wider — allein die Fähigkeiten-/Erfahrungspassung würde höher bewertet.",
      requirements: "Anforderungen",
      met: "Erfüllt",
      notMet: "Nicht erfüllt",
      categoryBreakdown: "Kategorie-Aufschlüsselung",
      recommendations: "Empfehlungen",
      uploadUpdatedTitle: "Aktualisierten Lebenslauf hochladen",
      uploadUpdatedDescription: "Änderungen basierend auf dem obigen Feedback vorgenommen? Laden Sie die neue Version hoch, um zu sehen, was sich verbessert hat.",
      uploadUpdatedButton: "Aktualisierten Lebenslauf hochladen",
      startNewMatch: "Neuen Abgleich starten",
      dimensionNames: {
        Skills: "Fähigkeiten",
        Experience: "Erfahrung",
        Education: "Ausbildung",
        "Domain Fit": "Branchenpassung",
        "Seniority Fit": "Senioritätspassung",
        "Culture Fit": "Kulturpassung",
      },
      compareForm: {
        title: "Aktualisierten Lebenslauf hochladen",
        description: "Änderungen basierend auf dem obigen Feedback vorgenommen? Laden Sie die neue Version hoch, um zu sehen, was sich verbessert hat.",
        compareButton: "Mit Original vergleichen",
        cancel: "Abbrechen",
        comparing: "Ihr aktualisierter Lebenslauf wird verglichen…",
        compareFailed: "Lebensläufe konnten nicht verglichen werden",
        compareGenericError: "Beim Vergleichen Ihres aktualisierten Lebenslaufs ist etwas schiefgelaufen.",
      },
      diff: {
        title: "Vorher & Nachher",
        before: "Vorher",
        after: "Nachher",
        categoryBreakdown: "Kategorie-Aufschlüsselung",
        resolved: "Behoben",
        stillOpen: "Weiterhin offen",
        newIssuesIntroduced: "Neu aufgetretene Probleme",
      },
    },
    coverLetter: {
      formTitle: "Anschreiben erstellen",
      formSubtitle: "Erstellen Sie einen maßgeschneiderten Entwurf aus Ihrem Lebenslauf, optional ergänzt durch eine Stellenbeschreibung für eine gezieltere Ausrichtung.",
      jobDescriptionLabel: "Stellenbeschreibung",
      jobDescriptionOptional: "(optional)",
      jobDescriptionHint: "Leer lassen für ein allgemeines Anschreiben, oder eine Stellenbeschreibung einfügen für ein darauf zugeschnittenes.",
      jobDescriptionPlaceholder: "Stellenbeschreibung hier einfügen",
      generateButton: "Anschreiben erstellen",
      writing: "Ihr Anschreiben wird geschrieben…",
      generateFailed: "Anschreiben konnte nicht erstellt werden",
      genericError: "Beim Erstellen des Anschreibens ist etwas schiefgelaufen.",
      letterReady: "Anschreiben bereit. Noch {count} Aktion(en) heute übrig.",
      resultTitle: "Ihr Anschreiben",
      resultSubtitle: "Hier ist der aus Ihrem Lebenslauf erstellte Entwurf.",
      generateAnother: "Weiteres erstellen",
      general: "Allgemein",
      targeted: "Zielgerichtet",
      copyFailed: "Kopieren fehlgeschlagen — bitte markieren und kopieren Sie den Text manuell.",
    },
    learningHub: {
      title: "ATS-Wissenszentrum",
      subtitle: "Kostenlose Anleitungen zu Lebenslauf-Formatierung, Keyword-Strategie und wie automatisierte Screener wirklich funktionieren.",
      comingBadge: "Demnächst",
      comingText: "Weitere Anleitungen sind in Vorbereitung — hier ist, was als Nächstes geplant ist.",
      availableBadge: "Anleitung verfügbar",
      readGuideCta: "Anleitung lesen",
      topics: [
        {
          title: "ATS überlisten",
          description: "Formatierungsregeln, die Parser zufriedenstellen.",
          slug: "beating-the-ats",
        },
        { title: "Keyword-Strategie", description: "Ihre Sprache an die der Anzeige anpassen.", slug: null },
        {
          title: "So funktionieren Screener",
          description: "Wonach automatisierte Systeme suchen, und warum.",
          slug: null,
        },
      ],
      // Guide body intentionally left in English for now (translation planned once the content is finalized).
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
    },
  },
};
