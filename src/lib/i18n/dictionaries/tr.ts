import type { Dictionary } from "./en";

export const tr: Dictionary = {
  common: {
    copy: "Kopyala",
    copied: "Kopyalandı!",
    logOut: "Çıkış yap",
    openOnGithub: "GitHub'da Görüntüle",
    getStartedFree: "Ücretsiz Başlayın",
    actionsRemainingToday: "Bugün için {count} işlem hakkınız kaldı",
  },
  errors: {
    unauthorized: "Bunu yapabilmek için giriş yapmanız gerekiyor.",
    missing_resume_file: "Lütfen bir özgeçmiş dosyası ekleyin.",
    invalid_resume_file: "Bu özgeçmiş dosyası geçersiz veya boş görünüyor. Lütfen farklı bir dosya deneyin.",
    unsupported_file_type:
      "Yalnızca PDF ve .docx özgeçmişler destekleniyor (taranmış PDF veya eski .doc formatı desteklenmiyor).",
    file_too_large: "Özgeçmiş dosyası en fazla 10MB olmalıdır.",
    invalid_job_description: "Lütfen geçerli bir iş ilanı metni girin (1-20.000 karakter).",
    invalid_company_name: "Şirket adı çok uzun.",
    invalid_request: "İstek geçerli değildi. Lütfen tekrar deneyin.",
    resume_not_found: "Özgeçmiş bulunamadı.",
    daily_limit_reached: "Bugünkü işlem hakkınızı doldurdunuz. Lütfen yarın tekrar deneyin.",
    invalid_previous_match: "Önceki eşleştirme sonucu okunamadı. Lütfen yeni bir eşleştirme başlatın.",
    resume_parsing_failed: "Özgeçmişiniz okunamadı. Lütfen farklı bir dosya deneyin.",
    analysis_failed: "Özgeçmişiniz analiz edilirken bir şeyler ters gitti.",
    comparison_failed: "Özgeçmişleriniz karşılaştırılırken bir şeyler ters gitti.",
    generation_failed: "Ön yazınız oluşturulurken bir şeyler ters gitti.",
  },
  severity: {
    critical: "Kritik",
    moderate: "Orta",
    minor: "Düşük",
  },
  resumeDropzone: {
    title: "Özgeçmişinizi buraya bırakın",
    subtitle: "PDF veya DOCX",
    uploadButton: "Özgeçmiş yükle",
  },
  processingIndicator: {
    subtitle: "Bu genellikle bir dakikadan kısa sürer.",
  },
  landing: {
    header: {
      navFeatures: "Özellikler",
      navHowItWorks: "Nasıl çalışır",
      navRoadmap: "Yol haritası",
      navLearningHub: "Öğrenme Merkezi",
      navFaq: "SSS",
      logIn: "Giriş yap",
    },
    hero: {
      badge: "Açık kaynak · Bugün ücretsiz kullanın",
      title: "Özgeçmişinizi robotların önünden geçirin.",
      subtitle:
        "CV Butler özgeçmişinizi gerçek ATS sistemlerine göre puanlar, herhangi bir iş ilanıyla eşleştirir ve size özel ön yazılar hazırlar — ücretsiz, açık kaynak, hiçbir gizli şart yok.",
      freeNote: "%100 ücretsiz · Kredi kartı gerekmez · MIT lisanslı · Kendi sunucunuzda barındırılabilir",
      cardTitle: "ATS Puanınız",
      cardSubtitle: "Kıdemli Ürün Tasarımcısı · özgeçmişinizle eşleştirildi",
      keywordsMatched: "Eşleşen anahtar kelimeler",
      keywordsMatchedValue: "18 / 22",
      formatting: "Biçimlendirme",
      formattingValue: "ATS uyumlu",
      quickFixesFound: "Bulunan hızlı düzeltmeler",
      quickFixesFoundValue: "3",
      illustrativeNote: "Örnek amaçlıdır — sonuçlarınız farklılık gösterebilir",
    },
    howItWorks: {
      heading: "Nasıl çalışır",
      subheading: "İhtiyacınız olan aracı seçin — her biri yalnızca özgeçmişinizle çalışır.",
      steps: [
        {
          title: "ATS incelemesi için özgeçmişinizi yükleyin",
          description:
            "Biçimlendirme, anahtar kelimeler ve düzeltmeler hakkında bir puan ve somut öneriler alın — iş ilanına gerek yok.",
        },
        {
          title: "Bir iş ilanıyla karşılaştırın",
          description: "Herhangi bir ilanı yapıştırın, özgeçmişinizin ne kadar uyduğunu ve nelerin değiştirilmesi gerektiğini görün.",
        },
        {
          title: "Bir ön yazı oluşturun",
          description:
            "Özgeçmişinizi kullanarak, daha isabetli bir hedefleme için isteğe bağlı olarak iş ilanı ekleyebilirsiniz.",
        },
      ],
    },
    features: {
      heading: "Mülakata girmek için ihtiyacınız olan her şey",
      subheading: "Birlikte çalışacak şekilde tasarlanmış üç temel araç.",
      items: [
        {
          title: "ATS Puanı ve Analizi",
          subtitle: "Göndermeden önce tarama yazılımının özgeçmişinizi nasıl okuduğunu tam olarak öğrenin.",
          description:
            "Biçimlendirme sorunları, eksik anahtar kelimeler ve hızlı düzeltmeler hakkında sade bir dille açıklanmış 0-100 arası bir puan alın.",
        },
        {
          title: "İş İlanı Eşleştirme",
          subtitle: "Herhangi bir ilanı yapıştırın, özgeçmişinizin gerçekte ne kadar uyduğunu görün.",
          description:
            "İlanın aradığı ve özgeçmişinizde eksik olan beceri ve anahtar kelimeleri ortaya çıkarır, böylece her başvuru için özelleştirebilirsiniz.",
        },
        {
          title: "Ön Yazı Oluşturma",
          subtitle: "Bir iş ilanını okuyacağınız süre içinde size özel bir taslak.",
          description:
            "Gerçek deneyiminize ve iş ilanına dayanan bir ilk taslak oluşturur — siz düzenleyip gönderirsiniz.",
        },
      ],
    },
    roadmap: {
      heading: "Sırada ne var",
      subheading: "CV Butler aktif olarak geliştiriliyor. İşte yakında gelecekler.",
      items: [
        {
          badge: "v3",
          title: "Ollama ile yerel model desteği",
          description: "Puanlama ve eşleştirmeyi barındırılan bir model yerine kendi yerel modelinize karşı çalıştırın.",
        },
        {
          badge: "Gelecek",
          title: "İş başvurusu takibi",
          description: "Her başvuruyu — şirket, özgeçmiş, ön yazı ve durum — tek bir yerden takip edin.",
        },
      ],
      followProgress: "Gelişmeleri takip edin",
    },
    learningHubCta: {
      title: "ATS sistemlerine yeni mi başlıyorsunuz?",
      description:
        "Özgeçmiş biçimlendirme, anahtar kelime stratejisi ve otomatik tarama sistemlerinin gerçekte nasıl çalıştığı hakkında ücretsiz rehberler için ATS Öğrenme Merkezi'ni ziyaret edin.",
      cta: "Öğrenme Merkezi'ni ziyaret edin →",
    },
    faq: {
      heading: "Sıkça sorulan sorular",
      items: [
        {
          question: "CV Butler gerçekten ücretsiz mi?",
          answer: "Evet. CV Butler, MIT lisansı altında açık kaynaklıdır — kullanımı, kendi sunucunuzda barındırmanız ve değiştirmeniz ücretsizdir.",
        },
        {
          question: "Özgeçmiş verilerime ne oluyor?",
          answer:
            "Açık kaynaklı olduğu için verilerinizi işleyen kod herkese açık ve denetlenebilir, ayrıca kendi sunucunuzda kendi örneğinizi barındırabilirsiniz. Her şeyi kendi bilgisayarınızda tutan yerel model desteği, Ollama üzerinden v3 için planlanıyor.",
        },
        {
          question: "Denemek için bir şey kurmam gerekiyor mu?",
          answer: "Hayır — tarayıcıda ücretsiz olarak başlayın. Kendi sunucunuzda barındırmak, kendi örneğini çalıştırmak isteyenler için isteğe bağlıdır.",
        },
        {
          question: "Yol haritasında sırada ne var?",
          answer:
            "v3, Ollama üzerinden yerel model desteği ekliyor; böylece puanlama, eşleştirme ve ön yazı oluşturma, barındırılan bir API yerine kendi barındırdığınız bir modelle çalışabilir — nelerin geleceğini görmek için yukarıdaki yol haritasına bakın.",
        },
      ],
    },
    finalCta: {
      heading: "Özgeçmişinizi düzeltmeye hazır mısınız?",
    },
    footer: {
      tagline: "Açık kaynaklı yapay zeka kariyer asistanı. MIT lisanslı.",
      productHeading: "Ürün",
      resourcesHeading: "Kaynaklar",
      communityHeading: "Topluluk",
      issuesDiscussions: "Sorunlar ve tartışmalar",
      mitLicense: "MIT Lisansı",
      copyright:
        "© 2026 CV Butler · MIT lisansı altında açık kaynak · Bağımsız bir proje, herhangi bir ticari kariyer platformuyla bağlantılı değildir.",
    },
  },
  auth: {
    signIn: {
      title: "CV Butler'a giriş yapın",
      subtitle: "Günde {count} ücretsiz işlem. Kredi kartı gerekmez.",
      continueWithGoogle: "Google ile devam et",
    },
  },
  dashboard: {
    sidebar: {
      home: "Ana Sayfa",
      atsReview: "ATS İncelemesi",
      jobMatching: "İş Eşleştirme",
      coverLetterGeneration: "Ön Yazı Oluşturma",
      learningHub: "Öğrenme Merkezi",
    },
    home: {
      welcomeBack: "Tekrar hoş geldiniz, {name}",
      statsAtsReviews: "ATS incelemesi",
      statsJobMatches: "iş eşleştirmesi",
      statsCoverLetters: "ön yazı",
      shareTitle: "İş arayan birini mi tanıyorsunuz?",
      shareDescription: "Bu ücretsiz, açık kaynaklı aracı bir arkadaşınızla paylaşın.",
      copyLink: "Bağlantıyı kopyala",
      copyLinkFailed: "Bağlantı kopyalanamadı — bunun yerine tarayıcınızın adres çubuğundan kopyalayın.",
      starOnGithub: "GitHub'da yıldızla",
      jumpBackIn: "Kaldığınız yerden devam edin",
      open: "Aç",
      cards: {
        atsReview: { title: "ATS İncelemesi", description: "Özgeçmişinizi gerçek ATS sistemlerine göre puanlayın." },
        jobMatching: { title: "İş Eşleştirme", description: "Özgeçmişinizi bir iş ilanıyla karşılaştırın." },
        coverLetter: { title: "Ön Yazı", description: "Özgeçmişinizden size özel bir taslak oluşturun." },
        learningHub: { title: "Öğrenme Merkezi", description: "Biçimlendirme, anahtar kelimeler ve ATS hakkında rehberler." },
      },
    },
    atsReview: {
      formTitle: "ATS İncelemesi",
      formSubtitle:
        "Biçimlendirme sorunları, eksik anahtar kelimeler ve hızlı düzeltmeler hakkında sade bir dille açıklanmış 0-100 arası bir puan almak için özgeçmişinizi yükleyin.",
      startReview: "ATS İncelemesini Başlat",
      analyzing: "Özgeçmişiniz ATS sistemlerine göre analiz ediliyor…",
      analyzeFailed: "Özgeçmiş analiz edilemedi",
      genericError: "Özgeçmişiniz analiz edilirken bir şeyler ters gitti.",
      scoreReady: "ATS puanı hazır. Bugün için {count} işlem hakkınız kaldı.",
      runAnotherReview: "Başka bir inceleme çalıştır",
      resultTitle: "ATS Puanınız",
      resultSubtitle: "Özgeçmişiniz kategori kategori nasıl puanlandı.",
      scoreLabel: "ATS Puanı: {score}/100",
      categoryBreakdown: "Kategori dökümü",
      recommendations: "Öneriler",
      categoryNames: {
        "Contact Information": "İletişim Bilgileri",
        "Section Structure": "Bölüm Yapısı",
        "Date Formatting": "Tarih Biçimlendirme",
        "Resume Length & Content Depth": "Özgeçmiş Uzunluğu ve İçerik Derinliği",
        "Quantified Achievements": "Sayısallaştırılmış Başarılar",
        "Keyword & Content Relevance": "Anahtar Kelime ve İçerik Uygunluğu",
      },
    },
    jobMatching: {
      formTitle: "İş Eşleştirme",
      formSubtitle: "Ne kadar uyduğunu ve nelerin değiştirilmesi gerektiğini görmek için özgeçmişinizi yükleyin ve bir iş ilanı yapıştırın.",
      companyNameLabel: "Şirket adı",
      companyNameOptional: "(isteğe bağlı)",
      companyNamePlaceholder: "örn. Acme A.Ş.",
      jobDescriptionLabel: "İş ilanı",
      jobDescriptionRequired: "(zorunlu)",
      jobDescriptionPlaceholder: "İş ilanını buraya yapıştırın",
      startMatching: "Eşleştirmeyi başlat",
      matching: "Özgeçmişiniz iş ilanıyla karşılaştırılıyor…",
      matchFailed: "İş ilanı eşleştirilemedi",
      genericError: "İş ilanı eşleştirilirken bir şeyler ters gitti.",
      matchReady: "Eşleştirme hazır. Bugün için {count} işlem hakkınız kaldı.",
      resultTitle: "Eşleştirme Sonuçları",
      resultSubtitle: "Özgeçmişiniz iş ilanıyla kategori kategori nasıl eşleşiyor.",
      scoreLabel: "Eşleştirme Puanı: {score}/100",
      unmetConstraintWarning: "Puan, aşağıdaki karşılanmayan bir gereksinimi yansıtıyor — yalnızca beceri/deneyim uyumu daha yüksek puan alırdı.",
      requirements: "Gereksinimler",
      met: "Karşılandı",
      notMet: "Karşılanmadı",
      categoryBreakdown: "Kategori dökümü",
      recommendations: "Öneriler",
      uploadUpdatedTitle: "Güncellenmiş özgeçmişinizi yükleyin",
      uploadUpdatedDescription: "Yukarıdaki geri bildirime göre değişiklik mi yaptınız? Neyin iyileştiğini görmek için yeni sürümü yükleyin.",
      uploadUpdatedButton: "Güncellenmiş özgeçmiş yükle",
      startNewMatch: "Yeni eşleştirme başlat",
      dimensionNames: {
        Skills: "Beceriler",
        Experience: "Deneyim",
        Education: "Eğitim",
        "Domain Fit": "Alan Uyumu",
        "Seniority Fit": "Kıdem Uyumu",
        "Culture Fit": "Kültür Uyumu",
      },
      compareForm: {
        title: "Güncellenmiş özgeçmişinizi yükleyin",
        description: "Yukarıdaki geri bildirime göre değişiklik mi yaptınız? Neyin iyileştiğini görmek için yeni sürümü yükleyin.",
        compareButton: "Orijinaliyle karşılaştır",
        cancel: "İptal",
        comparing: "Güncellenmiş özgeçmişiniz karşılaştırılıyor…",
        compareFailed: "Özgeçmişler karşılaştırılamadı",
        compareGenericError: "Güncellenmiş özgeçmişiniz karşılaştırılırken bir şeyler ters gitti.",
      },
      diff: {
        title: "Öncesi ve Sonrası",
        before: "Önce",
        after: "Sonra",
        categoryBreakdown: "Kategori dökümü",
        resolved: "Çözüldü",
        stillOpen: "Hâlâ açık",
        newIssuesIntroduced: "Yeni ortaya çıkan sorunlar",
      },
    },
    coverLetter: {
      formTitle: "Ön Yazı Oluşturma",
      formSubtitle: "Daha isabetli bir hedefleme için isteğe bağlı bir iş ilanı ekleyerek özgeçmişinizi kullanan size özel bir taslak oluşturun.",
      jobDescriptionLabel: "İş ilanı",
      jobDescriptionOptional: "(isteğe bağlı)",
      jobDescriptionHint: "Genel bir ön yazı için boş bırakın, ya da ona özel bir taslak için bir iş ilanı yapıştırın.",
      jobDescriptionPlaceholder: "İş ilanını buraya yapıştırın",
      generateButton: "Ön yazı oluştur",
      writing: "Ön yazınız yazılıyor…",
      generateFailed: "Ön yazı oluşturulamadı",
      genericError: "Ön yazı oluşturulurken bir şeyler ters gitti.",
      letterReady: "Ön yazı hazır. Bugün için {count} işlem hakkınız kaldı.",
      resultTitle: "Ön Yazınız",
      resultSubtitle: "İşte özgeçmişinizden oluşturulan taslak.",
      generateAnother: "Başka bir tane oluştur",
      general: "Genel",
      targeted: "Hedefli",
      copyFailed: "Kopyalanamadı — metni manuel olarak seçip kopyalayın.",
    },
    learningHub: {
      title: "ATS Öğrenme Merkezi",
      subtitle: "Özgeçmiş biçimlendirme, anahtar kelime stratejisi ve otomatik tarama sistemlerinin gerçekte nasıl çalıştığı hakkında ücretsiz rehberler.",
      comingBadge: "Yakında",
      comingText: "Daha fazla rehber hazırlanıyor — sırada bunlar var.",
      availableBadge: "Rehber mevcut",
      readGuideCta: "Rehberi oku",
      topics: [
        {
          title: "ATS'yi Aşmak",
          description: "Ayrıştırıcıları memnun eden biçimlendirme kuralları.",
          slug: "beating-the-ats",
        },
        {
          title: "Anahtar kelime stratejisi",
          description: "Dilinizi ilanınkiyle eşleştirmek.",
          slug: "keyword-strategy",
        },
        {
          title: "Tarama sistemleri nasıl çalışır",
          description: "Otomatik sistemlerin neyi kontrol ettiği ve nedeni.",
          slug: null,
        },
      ],
      // Rehber içeriği şimdilik kasıtlı olarak İngilizce (çeviri, içerik netleştikten sonra planlanıyor).
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
      // Rehber içeriği şimdilik kasıtlı olarak İngilizce (çeviri, içerik netleştikten sonra planlanıyor).
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
    },
  },
};
