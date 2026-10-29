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
          badge: "v4",
          title: "Bewerbungsverfolgung",
          description: "Behalten Sie jede Bewerbung im Blick — Firma, Lebenslauf, Anschreiben und Status — alles an einem Ort.",
        },
        {
          badge: "v5",
          title: "Jobsuche-Agent",
          description: "Auf Basis Ihrer Präferenzen sucht ein Agent für Sie nach den besten Stellenangeboten.",
        },
        {
          badge: "v6",
          title: "Vorbereitung auf Vorstellungsgespräche",
          description: "Erhalten Sie wahrscheinliche Interviewfragen, abgeleitet aus den Lücken zwischen Ihrem Lebenslauf und der Stelle.",
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
  // Content intentionally left in English for now (translation planned once the content is finalized).
  checkout: {
    title: "Pricing",
    subtitle: "Pick a plan. Prices are shown in your local currency with tax included.",
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
        {
          title: "Keyword-Strategie",
          description: "Ihre Sprache an die der Anzeige anpassen.",
          slug: "keyword-strategy",
        },
        {
          title: "So funktionieren Screener",
          description: "Wonach automatisierte Systeme suchen, und warum.",
          slug: "how-screeners-work",
        },
      ],
      beatingTheAts: {
        backLink: "Zurück zum Wissenszentrum",
        title: "ATS überlisten",
        subtitle:
          "Formatierungsregeln, die verhindern, dass Bewerbermanagementsysteme Ihren Lebenslauf zerstückeln, bevor ihn ein Mensch zu sehen bekommt.",
        sections: [
          {
            heading: "Layout",
            rules: [
              "Verwenden Sie ein einspaltiges Layout. Mehrspaltige Designs und Seitenleisten werden oft in der falschen Reihenfolge gelesen oder ganz ausgelassen.",
              "Verzichten Sie auf Bilder, Icons, Logos und Grafiken – Parser können sie nicht lesen, und ein Foto verbessert Ihren Score nicht.",
              "Vermeiden Sie Textfelder, Formen und Word-SmartArt. Inhalte darin werden häufig übersprungen.",
              "Vermeiden Sie Tabellen zur Strukturierung. Wenn Sie eine zur Ausrichtung brauchen, halten Sie sie minimal – viele Parser lesen quer über die Zeilen statt spaltenweise.",
              "Setzen Sie Kontaktdaten oder wichtige Inhalte nie in die Kopf- oder Fußzeile. Zahlreiche ATS ignorieren diesen Bereich komplett.",
            ],
          },
          {
            heading: "Dateiformat & Dateiname",
            rules: [
              "Speichern Sie als PDF – das ist für moderne ATS die sicherste Wahl. Nutzen Sie DOCX nur, wenn die Stellenanzeige es ausdrücklich verlangt.",
              "Laden Sie nie ein gescanntes PDF hoch. Es ist nur ein Bild, und darunter liegt kein Text, den der Parser auslesen könnte.",
              "Benennen Sie die Datei Vorname_Nachname_Lebenslauf.pdf. Verzichten Sie im Dateinamen auf Datumsangaben, Versionsnummern und Sonderzeichen.",
            ],
          },
          {
            heading: "Schriftarten & Schriftgrößen",
            rules: [
              "Bleiben Sie bei gängigen, ATS-sicheren Schriftarten: Arial, Calibri, Helvetica, Times New Roman oder Verdana.",
              "Vermeiden Sie schmale oder dekorative Schriftarten, so stilvoll sie auch aussehen.",
              "Halten Sie den Fließtext bei 10–12 pt und Überschriften bei 12–14 pt.",
            ],
          },
          {
            heading: "Zeichen, Aufzählungszeichen & Überschriften",
            rules: [
              "Vermeiden Sie Sonderzeichen-Icons (☎ ✉ ➤ ✔), Emojis (🚀 ⭐) und dekorative Aufzählungszeichen (■ ◆) – nehmen Sie stattdessen ein einfaches „•“ oder einen Bindestrich.",
              "Verwenden Sie Standardüberschriften, die der Parser erkennt, etwa „Berufserfahrung“, und keine kreativen Alternativen wie „Mein Werdegang“.",
              "Halten Sie Datumsformate im ganzen Dokument einheitlich – mischen Sie nicht „Jan 2020“ mit „2020-01“.",
            ],
          },
        ],
        breakersTitle: "ATS-Killer – unbedingt vermeiden",
        breakers: [
          "Fotos oder Logos",
          "Mehrspaltige Layouts",
          "Textfelder",
          "Tabellen zur Strukturierung",
          "Kopf- oder Fußzeilen mit wichtigen Informationen",
          "Icons (☎ ✉ ✔)",
          "Ungewöhnliche oder dekorative Schriftarten",
          "PDFs, die direkt aus Design-Tools wie Figma oder Canva exportiert wurden",
          "Übermäßig gestaltete Vorlagen",
          "„&“ statt „und“ in Keyword-Phrasen",
          "Silbentrennung, die Wörter über mehrere Zeilen zerteilt",
          "Uneinheitliche Schreibvarianten (z. B. „Projektmanagement“ und „Projekt-Management“ gemischt)",
        ],
        checklistTitle: "Abschließende Formatierungs-Checkliste",
        checklist: [
          {
            category: "Struktur",
            items: ["Eine Spalte", "Standardüberschriften", "Keine Bilder oder Grafiken"],
          },
          {
            category: "Formatierung",
            items: [
              "Sauberer PDF-Export",
              "Einfacher, auslesbarer Text",
              "Standardschriftart",
              "Keine Sonderzeichen oder Icons",
            ],
          },
          {
            category: "Inhalt",
            items: [
              "Einheitliche Datumsformate",
              "Kontaktdaten im Haupttext, nicht in Kopf-/Fußzeile",
              "Zertifikate und Abschnittstitel ausgeschrieben",
            ],
          },
        ],
      },
      keywordStrategy: {
        backLink: "Zurück zum Wissenszentrum",
        title: "Keyword-Strategie",
        subtitle:
          "Wie Sie die Sprache Ihres Lebenslaufs an die der Stellenanzeige anpassen, damit sowohl der Parser als auch die Recruiterin oder der Recruiter die Passung erkennen.",
        sections: [
          {
            heading: "Zielkeywords finden",
            rules: [
              "Entnehmen Sie sie direkt der Stellenbeschreibung: Aufgaben, geforderte Kenntnisse, wünschenswerte Kenntnisse, Zertifikate, Tools und Technologien sowie Branchenbegriffe, die immer wieder auftauchen.",
              "Gewichten Sie, was als Voraussetzung genannt oder mehrfach wiederholt wird, stärker als das, was nur einmal als Nice-to-have erscheint.",
            ],
          },
          {
            heading: "Den genauen Wortlaut der Anzeige übernehmen",
            rules: [
              "Das Keyword-Matching eines ATS ist wörtlich. Steht in der Anzeige „Stakeholder-Management“, schreiben Sie genau das – nicht „Stakeholder-Koordination“.",
              "Setzen Sie nur dann ein Synonym ein, wenn die Anzeige es selbst an anderer Stelle verwendet. Ansonsten behalten Sie die exakte Formulierung bei.",
              "Achten Sie auf Schreibvarianten. „Datenvisualisierung“, „Daten-Visualisierung“ und „Data Visualization“ sind für einen Parser verschiedene Zeichenfolgen – übernehmen Sie die Variante, die die Anzeige nutzt.",
            ],
          },
          {
            heading: "Keywords dort platzieren, wo der Parser zuerst hinschaut",
            rules: [
              "Kurzprofil: Bringen Sie 4–6 Ihrer stärksten Keyword-Kenntnisse in 1–3 Sätzen ganz oben unter.",
              "Kenntnisse-Abschnitt: Führen Sie sie als einfache, kommagetrennte Liste statt als Aufzählungspunkte auf – Parser lesen diesen Abschnitt separat aus, und Kommalisten werden zuverlässiger erkannt.",
              "Stichpunkte zur Berufserfahrung: Verweben Sie Keywords in die Erfolge selbst, nicht nur in die eigenständige Kenntnisliste.",
              "Ausbildung: Ergänzen Sie hier nur Keywords oder Studieninhalte, die wirklich zutreffen – diesen Abschnitt aufzublähen bringt nichts.",
            ],
          },
          {
            heading: "Entscheidende Keywords wiederholen – natürlich",
            rules: [
              "Ziel: Jedes entscheidende Keyword kommt im gesamten Dokument 2–4 Mal vor – Kurzprofil, Kenntnisse und Berufserfahrung zusammengenommen.",
              "Die Wiederholung sollte im Kontext natürlich klingen. Recruiter lesen dasselbe Dokument wie ein Parser, es muss also weiterhin als Fließtext Sinn ergeben.",
            ],
          },
        ],
        bulletFormulaTitle: "Die Stichpunkt-Formel für die Berufserfahrung",
        bulletFormulaFormula: "Verb + Kenntnis/Keyword + Ergebnis",
        bulletFormulaExamples: [
          "Effizienz einer Python-Datenpipeline um 30 % gesteigert durch die Implementierung optimierter Skripte.",
          "Team aus 5 Analysten geleitet und Erkenntnisse geliefert, die den Umsatz um 1,2 Mio. € steigerten.",
          "Power-BI-Dashboards entwickelt, die von über 120 Stakeholdern in Finanzen und Betrieb genutzt werden.",
        ],
        mistakesTitle: "Keyword-Fehler, die Sie vermeiden sollten",
        mistakes: [
          "Ein Synonym einsetzen, das die Anzeige nicht verwendet, auch wenn es dasselbe bedeutet",
          "Den Kenntnisse-Abschnitt mit Begriffen vollstopfen, die sonst nirgends im Lebenslauf vorkommen",
          "Kenntnisse nur einmal in einem Block am Ende auflisten, statt sie im Kurzprofil und in den Stichpunkten zur Berufserfahrung zu untermauern",
          "Eine regionale Schreibweise ignorieren, die die Anzeige ausdrücklich nutzt (z. B. „Massnahmen“ statt „Maßnahmen“)",
          "Die Übereinstimmung mit einer Jobbezeichnung unnötig abschwächen (z. B. „Business Analyst – Praktikant“ statt „Business Analyst Praktikant“)",
        ],
        checklistTitle: "Checkliste zur Keyword-Strategie",
        checklist: [
          {
            category: "Recherche",
            items: [
              "Alle geforderten und wünschenswerten Keywords aus der Anzeige entnommen",
              "Wiederkehrende Branchenbegriffe notiert",
            ],
          },
          {
            category: "Platzierung",
            items: [
              "4–6 Keywords im Kurzprofil untergebracht",
              "Kenntnisse als einfache, kommagetrennte Liste aufgeführt",
              "Keywords in die Stichpunkte zur Berufserfahrung eingewoben",
            ],
          },
          {
            category: "Formulierung",
            items: [
              "Exakter Wortlaut der Anzeige statt Synonymen verwendet",
              "Einheitliche Schreibweise",
              "Jedes entscheidende Keyword 2–4 Mal wiederholt",
            ],
          },
        ],
      },
      howScreenersWork: {
        backLink: "Zurück zum Wissenszentrum",
        title: "So funktionieren Screener",
        subtitle:
          "Was ein ATS tatsächlich prüft, wie Ihr Score berechnet wird und warum qualifizierte Kandidaten trotzdem abgelehnt werden.",
        sections: [
          {
            heading: "Was ein ATS tatsächlich macht",
            rules: [
              "Es ist Recruiting-Software, kein menschlicher Prüfer – stellen Sie es sich als Vorstellungsgespräch der ersten Runde vor, das ein Computer führt, bevor jemand Ihren Lebenslauf liest.",
              "Es erfasst und speichert jede Bewerbung in einer Datenbank und liest dann jeden Lebenslauf aus, um strukturierte Felder wie Kontaktdaten, Jobtitel, Daten und Kenntnisse zu extrahieren.",
              "Es reiht Kandidaten nach Keyword-Übereinstimmung und weiteren Kriterien und filtert alles heraus, was die vom Recruiter festgelegten Mindestanforderungen nicht erfüllt.",
              "Fast jeder große Arbeitgeber nutzt eines – über 98 % der Fortune-500-Unternehmen und rund 75 % der Arbeitgeber insgesamt.",
            ],
          },
          {
            heading: "Die Systeme, mit denen Sie es tatsächlich zu tun haben",
            rules: [
              "Enterprise: Workday, Taleo (Oracle), SuccessFactors (SAP) und iCIMS – verbreitet bei Großunternehmen und Fortune-500-Konzernen.",
              "Mittelstand: Greenhouse, Lever, SmartRecruiters und Jobvite – verbreitet bei Tech-Unternehmen und Start-ups.",
              "Kleine Unternehmen: BambooHR, Zoho Recruit und Bullhorn – verbreitet bei kleineren Firmen und Personalagenturen.",
              "Jedes hat eigene Parsing-Eigenheiten – manche kommen besser mit Formatierung oder Synonymen zurecht als andere. Genau deshalb maximiert ein sauberer Lebenslauf im Standardformat die Kompatibilität mit allen.",
            ],
          },
          {
            heading: "Wie Ihr Score berechnet wird",
            rules: [
              "Keyword-Übereinstimmung (40–60 % des Scores): wie viele geforderte Keywords vorkommen, wie oft und wo – Kenntnisse, Kurzprofil und Berufserfahrung zählen alle.",
              "Erfahrungsabgleich (20–30 %): Ihre Berufsjahre im Verhältnis zur Anforderung und wie nah Ihre Jobtitel an der Stelle liegen.",
              "Ausbildung & Zertifikate (10–20 %): ob geforderte Abschlüsse oder Zertifikate vorhanden und einschlägig sind.",
              "Sonstige Faktoren (10–20 %): etwa Standortübereinstimmung, Gehaltsvorstellungen und ob die Bewerbung vollständig ist.",
            ],
          },
        ],
        scoreRangesTitle: "Was der Score tatsächlich bedeutet",
        scoreRanges: [
          { range: "80–100 %", label: "Menschliche Prüfung", description: "Ihr Lebenslauf erreicht einen Recruiter." },
          {
            range: "60–79 %",
            label: "Wird vielleicht geprüft",
            description: "Hängt davon ab, wie viele andere Bewerbungen vorliegen.",
          },
          { range: "0–59 %", label: "Automatisch abgelehnt", description: "Aussortiert, bevor ihn jemand sieht." },
        ],
        funnelTitle: "Der Trichter endet nicht beim ATS",
        funnelSteps: [
          {
            stage: "ATS-Filterung",
            detail: "Automatisierter Abgleich von Keywords und Anforderungen scheidet 50–75 % der Bewerbungen aus.",
          },
          {
            stage: "Schneller Recruiter-Scan",
            detail:
              "Etwa 6–10 Sekunden, in denen Titel, Arbeitgeber, Ausbildung und Keywords geprüft werden – plus Warnsignale wie Lücken oder häufige Jobwechsel.",
          },
          {
            stage: "Detaillierte Prüfung",
            detail:
              "2–3 Minuten, nur für Lebensläufe, die den Scan überstehen, im Vergleich zum Rest der Auswahlliste.",
          },
          {
            stage: "Telefoninterview & Gespräche",
            detail: "15–30 Minuten, um Erfahrung und Passung vor den finalen Runden zu überprüfen.",
          },
        ],
        rejectionTitle: "Warum qualifizierte Kandidaten trotzdem abgelehnt werden",
        rejectionReasons: [
          "Fehlende Keywords – Sie haben die Kenntnis, aber eine andere Terminologie als die Anzeige verwendet",
          "Formatierung, die das Parsing gestört hat, obwohl die Erfahrung vorhanden war",
          "Wichtige Informationen vergraben, statt sie in den ersten 6–10 Sekunden hervorzuheben",
          "Lücken oder Unstimmigkeiten, die Fragen aufwerfen, ohne dass der Kontext sie erklärt",
          "Die Stelle wurde intern besetzt, aus dem Budget gestrichen oder nach der Veröffentlichung eingefroren",
          "Schlicht Konkurrenz – Hunderte Bewerbungen, bei denen Empfehlungen oder interne Kandidaten bevorzugt wurden",
        ],
      },
    },
  },
};
