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
          slug: "how-screeners-work",
        },
      ],
      beatingTheAts: {
        backLink: "Öğrenme Merkezine Dön",
        title: "ATS'yi Aşmak",
        subtitle:
          "Bir insan özgeçmişinizi görmeden önce, başvuru takip sistemlerinin onu bozmasını önleyen biçimlendirme kuralları.",
        sections: [
          {
            heading: "Düzen",
            rules: [
              "Tek sütunlu bir düzen kullanın. Çok sütunlu ve kenar çubuklu tasarımlar genellikle yanlış sırada okunur veya tamamen atlanır.",
              "Görsel, ikon, logo ve grafiklerden kaçının — ayrıştırıcılar bunları okuyamaz ve bir vesikalık fotoğraf puanınıza yardımcı olmaz.",
              "Metin kutuları, şekiller ve Word SmartArt kullanmayın. Bunların içine yerleştirilen içerik genellikle atlanır.",
              "Yapı oluşturmak için tablo kullanmayın. Hizalama için mecburen kullanmanız gerekiyorsa asgari düzeyde tutun — birçok ayrıştırıcı sütunları değil, satırları takip ederek okur.",
              "İletişim bilgilerinizi veya önemli içerikleri asla üst bilgi ya da alt bilgiye koymayın. Birçok ATS bu alanı tamamen görmezden gelir.",
            ],
          },
          {
            heading: "Dosya biçimi ve adı",
            rules: [
              "PDF olarak kaydedin — modern ATS sistemleri için en güvenli seçenek budur. DOCX'i yalnızca iş ilanı bunu açıkça istiyorsa kullanın.",
              "Taranmış bir PDF yüklemeyin. Bu sadece bir görseldir ve ayrıştırıcının çıkarabileceği bir metin içermez.",
              "Dosyayı Ad_Soyad_CV.pdf şeklinde adlandırın. Dosya adında tarih, sürüm numarası veya özel karakter kullanmayın.",
            ],
          },
          {
            heading: "Yazı tipi ve boyut",
            rules: [
              "Evrensel ve ATS uyumlu yazı tiplerine bağlı kalın: Arial, Calibri, Helvetica, Times New Roman veya Verdana.",
              "Ne kadar şık görünse de dar (condensed) veya dekoratif yazı tiplerinden kaçının.",
              "Gövde metnini 10–12pt, başlıkları ise 12–14pt aralığında tutun.",
            ],
          },
          {
            heading: "Karakterler, madde işaretleri ve başlıklar",
            rules: [
              "Özel simgelerden (☎ ✉ ➤ ✔), emojilerden (🚀 ⭐) ve dekoratif madde işaretlerinden (■ ◆) kaçının — bunun yerine sade bir \"•\" veya tire kullanın.",
              "Ayrıştırıcının tanıdığı standart bölüm başlıklarını kullanın; \"Career Journey\" gibi yaratıcı alternatifler yerine \"Experience\" gibi başlıklar tercih edin.",
              "Tarih biçimini belge boyunca tutarlı tutun — aynı belgede \"Jan 2020\" ile \"2020-01\" gibi farklı biçimleri karıştırmayın.",
            ],
          },
        ],
        breakersTitle: "ATS'yi bozan unsurlar — bunlardan her ne olursa olsun kaçının",
        breakers: [
          "Fotoğraf veya logo",
          "Çok sütunlu düzenler",
          "Metin kutuları",
          "Yapı için kullanılan tablolar",
          "Önemli bilgi barındıran üst/alt bilgiler",
          "Simgeler (☎ ✉ ✔)",
          "Sıra dışı veya dekoratif yazı tipleri",
          "Figma veya Canva gibi tasarım araçlarından doğrudan dışa aktarılan PDF'ler",
          "Aşırı stilize edilmiş şablonlar",
          "Anahtar kelime ifadelerinde \"and\" yerine \"&\" kullanmak",
          "Kelimeleri satırlar arasında bölen tireli satır sonları",
          "Tutarsız yazım biçimleri (örneğin \"analyse\" ve \"analyze\" kullanımını karıştırmak)",
        ],
        checklistTitle: "Son biçimlendirme kontrol listesi",
        checklist: [
          {
            category: "Yapı",
            items: ["Tek sütun", "Standart bölüm başlıkları", "Görsel veya grafik yok"],
          },
          {
            category: "Biçimlendirme",
            items: [
              "Temiz PDF çıktısı",
              "Sade, çıkarılabilir metin",
              "Standart yazı tipi",
              "Özel karakter veya simge yok",
            ],
          },
          {
            category: "İçerik",
            items: [
              "Tutarlı tarih biçimleri",
              "İletişim bilgileri üst/alt bilgide değil, ana metinde",
              "Sertifikalar ve bölüm başlıkları tam olarak yazılmış",
            ],
          },
        ],
      },
      // Rehber içeriği şimdilik kasıtlı olarak İngilizce (çeviri, içerik netleştikten sonra planlanıyor).
      keywordStrategy: {
        backLink: "Öğrenme Merkezine Dön",
        title: "Anahtar Kelime Stratejisi",
        subtitle:
          "Hem ayrıştırıcının hem de işe alım uzmanının uyumu görebilmesi için özgeçmişinizin dilini iş ilanının diliyle nasıl eşleştireceğiniz.",
        sections: [
          {
            heading: "Hedef anahtar kelimelerinizi belirleyin",
            rules: [
              "Bunları doğrudan iş ilanından çıkarın: sorumluluklar, gerekli beceriler, tercih sebebi beceriler, sertifikalar, araçlar ve teknolojiler ile sürekli tekrar eden sektör terimleri.",
              "Zorunlu olarak belirtilen veya birden fazla kez tekrarlanan ifadelere, sadece bir kez ve tercih sebebi olarak geçen ifadelerden daha fazla önem verin.",
            ],
          },
          {
            heading: "İlanın tam ifadesini kullanın",
            rules: [
              "ATS'nin anahtar kelime eşleştirmesi harfi harfinedir. İlanda \"stakeholder management\" geçiyorsa, \"stakeholder coordination\" değil tam olarak bunu yazın.",
              "Bir eş anlamlıyı yalnızca ilanın kendisi başka bir yerde o kelimeyi kullanıyorsa tercih edin. Aksi halde ilanın tam ifadesini koruyun.",
              "Bölgesel yazım farklarına dikkat edin. \"Data visualisation\" ve \"data visualization\" bir ayrıştırıcı için farklı ifadelerdir — ilanın hangisini kullandığına göre yazın.",
            ],
          },
          {
            heading: "Anahtar kelimeleri ayrıştırıcının önce baktığı yerlere koyun",
            rules: [
              "Özet: en güçlü 4-6 anahtar kelime becerinizi en üstte 1-3 cümleye yedirin.",
              "Beceriler bölümü: bunları madde işareti yerine virgülle ayrılmış düz bir liste halinde yazın — ayrıştırıcılar bu bölümü ayrı olarak çıkarır ve virgüllü listeler daha güvenilir şekilde okunur.",
              "Deneyim maddeleri: anahtar kelimeleri sadece ayrı bir beceri listesine değil, başarılarınızın kendisine de işleyin.",
              "Eğitim: anahtar kelimeleri veya dersleri yalnızca gerçekten ilgiliyse buraya ekleyin — bu bölümü doldurmak bir fayda sağlamaz.",
            ],
          },
          {
            heading: "Kritik anahtar kelimeleri doğal bir şekilde tekrarlayın",
            rules: [
              "Her kritik anahtar kelimenin özet, beceriler ve deneyim bölümlerinin toplamında belge boyunca 2-4 kez geçmesini hedefleyin.",
              "Bu tekrar, bağlam içinde doğal okunmalıdır. İşe alım uzmanı da ayrıştırıcının okuduğu aynı belgeyi okur, dolayısıyla metin düzyazı olarak da anlamlı olmalıdır.",
            ],
          },
        ],
        bulletFormulaTitle: "Deneyim maddeleri için formül",
        bulletFormulaFormula: "Fiil + beceri/anahtar kelime + sonuç",
        bulletFormulaExamples: [
          "Optimize edilmiş betikler uygulayarak bir Python veri hattının verimliliğini %30 artırdım.",
          "5 analistten oluşan bir ekibe liderlik ederek geliri 1,2 milyon € artıran içgörüler sundum.",
          "Finans ve Operasyon birimlerinde 120'den fazla paydaş tarafından kullanılan Power BI panoları geliştirdim.",
        ],
        mistakesTitle: "Kaçınılması gereken anahtar kelime hataları",
        mistakes: [
          "Aynı anlama gelse de ilanın kullanmadığı bir eş anlamlıyı tercih etmek",
          "Beceriler bölümünü, özgeçmişin başka hiçbir yerinde geçmeyen terimlerle doldurmak",
          "Becerileri özet ve deneyim maddelerinde tekrar vurgulamak yerine sadece en altta tek bir blokta listelemek",
          "İlanın özellikle kullandığı bölgesel yazım biçimini göz ardı etmek (örneğin \"optimise\" yerine \"optimize\")",
          "Unvan eşleşmesini gereksiz yere zayıflatmak (örneğin \"Business Analyst Intern\" yerine \"Business Analyst – Intern\")",
        ],
        checklistTitle: "Anahtar kelime stratejisi kontrol listesi",
        checklist: [
          {
            category: "Araştırma",
            items: [
              "İlandan tüm zorunlu ve tercih sebebi anahtar kelimeler çıkarıldı",
              "Tekrar eden sektör terimleri not edildi",
            ],
          },
          {
            category: "Yerleşim",
            items: [
              "Özete 4-6 anahtar kelime işlendi",
              "Beceriler virgülle ayrılmış düz bir liste olarak yazıldı",
              "Anahtar kelimeler deneyim maddelerine işlendi",
            ],
          },
          {
            category: "İfade",
            items: [
              "Eş anlamlılar değil, ilanın tam ifadesi kullanıldı",
              "Tutarlı bölgesel yazım",
              "Her kritik anahtar kelime 2-4 kez tekrarlandı",
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
