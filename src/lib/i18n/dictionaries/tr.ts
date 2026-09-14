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
  severity: {
    critical: "Kritik",
    moderate: "Orta",
    minor: "Düşük",
  },
  languageSwitcher: {
    comingSoon: "{language} desteği ileride eklenecek — şimdilik İngilizce olarak devam ediyoruz.",
    german: "Almanca",
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
      comingBadge: "v3'te geliyor",
      comingText: "Tam rehberler henüz mevcut değil — işte planlananların bir önizlemesi.",
      topics: [
        { title: "ATS'yi Aşmak", description: "Ayrıştırıcıları memnun eden biçimlendirme kuralları." },
        { title: "Anahtar kelime stratejisi", description: "Dilinizi ilanınkiyle eşleştirmek." },
        { title: "Tarama sistemleri nasıl çalışır", description: "Otomatik sistemlerin neyi kontrol ettiği ve nedeni." },
      ],
    },
  },
};
