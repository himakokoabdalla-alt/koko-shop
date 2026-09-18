const state = {
  settings: {},
  products: [],
  articles: [],
  categories: [],
  sports: [],
  socials: [],
  paymentMethods: [],
  platforms: []
};

const els = {
  mainNav: document.getElementById("mainNav"),
  categoriesGrid: document.getElementById("categoriesGrid"),
  productsGrid: document.getElementById("productsGrid"),
  articlesGrid: document.getElementById("articlesGrid"),
  sportsGrid: document.getElementById("sportsGrid"),
  socialGrid: document.getElementById("socialGrid"),
  paymentsGrid: document.getElementById("paymentsGrid"),
  platformGrid: document.getElementById("platformGrid"),
  heroTitle: document.getElementById("heroTitle"),
  heroText: document.getElementById("heroText"),
  paymentTitle: document.getElementById("paymentTitle"),
  amazonDisclosure: document.getElementById("amazonDisclosure"),
  musicAudio: document.getElementById("musicAudio"),
  musicName: document.getElementById("musicName"),
  playPauseBtn: document.getElementById("playPauseBtn"),
  searchInput: document.getElementById("searchInput"),
  searchPanel: document.getElementById("searchPanel"),
  searchToggle: document.querySelector(".search-toggle")
};

const defaultNav = [
  { label: "الرئيسية", href: "#top" },
  { label: "المنتجات", href: "#featured" },
  { label: "المقالات", href: "#guides" },
  { label: "طرق الدفع", href: "#paymentMethodsSection" },
  { label: "التواصل", href: "#social-section" }
];

function safeText(value, fallback = "") {
  return value === undefined || value === null || value === "" ? fallback : value;
}

function normalizeSocials(input) {
  if (!Array.isArray(input)) return [];
  return input
    .map((item) => {
      if (!item || typeof item !== "object") return null;
      const name = safeText(item.name, "");
      const label = safeText(item.label, name || "Social");
      const url = safeText(item.url, "#");
      return { name, label, url };
    })
    .filter(Boolean);
}

function getConfiguredUrl() {
  if (CONFIG.appScriptUrl && CONFIG.appScriptUrl.trim() !== "PASTE_YOUR_WEB_APP_URL_HERE") {
    return CONFIG.appScriptUrl.trim();
  }
  return null;
}

async function fetchSiteData() {
  const url = getConfiguredUrl();

  if (!url) {
    console.warn("No Web App URL configured, loading demo fallback data.");
    useFallbackData();
    return;
  }

  try {
    const response = await fetch(url, {
      method: "GET",
      cache: "no-store"
    });

    if (!response.ok) {
      throw new Error(`Failed to load: ${response.status}`);
    }

    const data = await response.json();
    state.settings = data.settings || {};
    state.products = data.products || [];
    state.articles = data.articles || [];
    state.categories = data.categories || [];
    state.sports = data.sports || [];
    state.socials = normalizeSocials(data.socials || data.contact || []);
    state.paymentMethods = Array.isArray(data.paymentMethods) ? data.paymentMethods : [];
    state.platforms = Array.isArray(data.platforms) ? data.platforms : [];
    applySiteState();
  } catch (error) {
    console.error(error);
    useFallbackData();
  }
}

function useFallbackData() {
  state.settings = {
    hero_title: CONFIG.fallback.heroTitle,
    hero_text: CONFIG.fallback.heroText,
    amazon_disclosure: CONFIG.fallback.amazonDisclosure,
    payment_title: CONFIG.fallback.paymentTitle,
    music_url: CONFIG.fallback.musicUrl,
    music_name: CONFIG.fallback.musicName,
    site_title: CONFIG.fallback.siteTitle
  };

  state.products = [
    {
      id: 1,
      title: "ماوس لاسلكي احترافي",
      description: "أداء سريع، مريح للاستخدام اليومي، ومناسب للمكتب واللابتوب.",
      image: "https://images.unsplash.com/photo-1527814050087-3793815479db?auto=format&fit=crop&w=900&q=80",
      price: 450,
      oldPrice: 620,
      platform: "Amazon",
      category: "الحاسب والمكتب",
      subcategory: "ماوس وكيبورد",
      url: "#",
      published: true,
      delivery: "توصيل حسب المنطقة",
      cashOnDelivery: true,
      returnPolicy: "إرجاع خلال 7 أيام",
      discount: "27%",
      badge: "الأكثر طلبًا",
      buttonText: "اشترِ الآن",
      affiliateUrl: "#"
    },
    {
      id: 2,
      title: "حقيبة ظهر للرحلات",
      description: "مناسبة للتخييم والرحلات الطويلة، مزودة بجيوب تنظيمية وتجهيزات عملية.",
      image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=900&q=80",
      price: 760,
      oldPrice: 980,
      platform: "Noon",
      category: "الرياضة والمغامرات",
      subcategory: "Camping",
      url: "#",
      published: true,
      delivery: "توصيل سريع",
      cashOnDelivery: true,
      returnPolicy: "إرجاع خلال 10 أيام",
      discount: "22%",
      badge: "مميز",
      buttonText: "اشترِ الآن",
      affiliateUrl: "#"
    },
    {
      id: 3,
      title: "طقم أدوات تنظيف منزلية",
      description: "مستوى عالي من الجودة، مناسب للمنزل والرفاهية اليومية.",
      image: "https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&w=900&q=80",
      price: 320,
      oldPrice: 430,
      platform: "Temu",
      category: "المنزل",
      subcategory: "تنظيف",
      url: "#",
      published: true,
      delivery: "توصيل حسب المنطقة",
      cashOnDelivery: false,
      returnPolicy: "إرجاع خلال 7 أيام",
      discount: "25%",
      badge: "تخفيضات",
      buttonText: "اشترِ الآن",
      affiliateUrl: "#"
    },
    {
      id: 4,
      title: "سماعات لاسلكية مريحة",
      description: "صوت نقي، إلغاء ضوضاء جزئي، ومناسب للعناية بالاستماع اليومي.",
      image: "https://images.unsplash.com/photo-1546435770-a3e426bf472b?auto=format&fit=crop&w=900&q=80",
      price: 610,
      oldPrice: 820,
      platform: "Amazon",
      category: "الإلكترونيات",
      subcategory: "سماعات",
      url: "#",
      published: true,
      delivery: "توصيل سريع",
      cashOnDelivery: true,
      returnPolicy: "إرجاع خلال 7 أيام",
      discount: "26%",
      badge: "مميز",
      buttonText: "اشترِ الآن",
      affiliateUrl: "#"
    }
  ];

  state.articles = [
    {
      id: 1,
      title: "كيف تختار التابلت المناسب للدراسة؟",
      text: "ابدأ بتحديد احتياجك من الأداء، الشاشة، والذاكرة.",
      body: "إذا كنت تبحث عن جهاز للدراسة، فاحرص على شاشة مناسبة، ذاكرة كافية، وسلاسة في الاستخدام...",
      published: true
    },
    {
      id: 2,
      title: "كيف تختار ماوس لاسلكي مناسب؟",
      text: "اختر ماوسًا مريحًا ومناسبًا لطبيعة العمل اليومية.",
      body: "للمكتب المنزلي، اختَر ماوسًا خفيفًا، مع بطارية مستقرة، وأزرار مريحة...",
      published: true
    }
  ];

  state.categories = [
    { id: 1, name: "الإلكترونيات", icon: "📱" },
    { id: 2, name: "الكمبيوتر والمكتب", icon: "💻" },
    { id: 3, name: "المدرسة والدراسة", icon: "📚" },
    { id: 4, name: "المنزل", icon: "🏠" },
    { id: 5, name: "الفود والمطبخ", icon: "🍳" }
  ];

  state.sports = [
    { id: 1, name: "Hiking", icon: "🥾", items: ["حقائب صغيرة", "أحذية", "ماء"] },
    { id: 2, name: "Mountain Bike", icon: "🚴", items: ["خوذة", "قفازات", "إكسسوارات"] },
    { id: 3, name: "Diving", icon: "🤿", items: ["معدات سباحة", "ملابس", "أحزمة"] },
    { id: 4, name: "Gym & Fitness", icon: "🏋️", items: ["كيس تمرين", "ماء", "أدوات"] }
  ];

  state.socials = [
    { name: "facebook", label: "Facebook", url: "https://www.facebook.com/profile.php?id=61593947162280" },
    { name: "instagram", label: "Instagram", url: "https://www.instagram.com/himakokoabdalla/" },
    { name: "youtube", label: "YouTube", url: "https://www.youtube.com/@kokoabdallahima" },
    { name: "tiktok", label: "TikTok", url: "https://www.tiktok.com/@kokoabdallahima" },
    { name: "threads", label: "Threads", url: "https://www.threads.com/@kokoshoppingstore" },
    { name: "snapchat", label: "Snapchat", url: "https://www.snapchat.com/add/koko-shoppingst" }
  ];

  state.paymentMethods = [
    { id: 1, title: "الدفع عند الاستلام", icon: "💵", description: "متاح في بعض المناطق" },
    { id: 2, title: "بطاقات بنكية", icon: "💳", description: "بطاقات Visa/MasterCard" },
    { id: 3, title: "محافظ إلكترونية", icon: "📱", description: "Apple Pay / Google Pay / أخرى" },
    { id: 4, title: "دفع آمن", icon: "🔒", description: "طرق الدفع والتوصيل تختلف حسب المتجر والمنصة." }
  ];

  state.platforms = [
    { id: 1, name: "Amazon", url: "#", notes: "Affiliate tagged link when available" },
    { id: 2, name: "Temu", url: "#", notes: "مناسب للتسوق عبر المنصة" },
    { id: 3, name: "Noon", url: "#", notes: "دعم عربي واستهداف محلي" }
  ];

  applySiteState();
}

function applySiteState() {
  const settings = state.settings || {};
  const heroTitle = safeText(settings.hero_title, CONFIG.fallback.heroTitle);
  const heroText = safeText(settings.hero_text, CONFIG.fallback.heroText);
  const paymentTitle = safeText(settings.payment_title, "طرق الدفع والتوصيل تختلف حسب المتجر والمنصة.");
  const amazonDisclosure = safeText(settings.amazon_disclosure, "بصفتي مشاركًا لأمازون، فإنني أكسب من عمليات الشراء المؤهلة.");
  const musicName = safeText(settings.music_name, CONFIG.fallback.musicName);

  els.heroTitle.textContent = heroTitle;
  els.heroText.textContent = heroText;
  els.paymentTitle.textContent = paymentTitle;
  els.amazonDisclosure.textContent = amazonDisclosure;
  els.musicName.textContent = musicName;

  renderNav(defaultNav);
  renderCategories(state.categories);
  renderProducts(state.products);
  renderArticles(state.articles);
  renderSports(state.sports);
  renderPayments(state.paymentMethods);
  renderSocials(state.socials);
  renderPlatforms(state.platforms);
  initMusic(settings.music_url || CONFIG.fallback.musicUrl);
}

function renderNav(items) {
  els.mainNav.innerHTML = items
    .map((item) => `<a href="${item.href}">${item.label}</a>`)
    .join("");
}

function renderCategories(items) {
  if (!Array.isArray(items) || items.length === 0) {
    els.categoriesGrid.innerHTML = "";
    return;
  }

  els.categoriesGrid.innerHTML = items
    .slice(0, 10)
    .map((item) => {
      const name = item.name || "قسم";
      const icon = item.icon || "📦";
      return `
        <div class="category-card">
          <div class="category-icon">${icon}</div>
          <h3>${name}</h3>
        </div>
      `;
    })
    .join("");
}

function renderProducts(items) {
  if (!Array.isArray(items) || items.length === 0) {
    els.productsGrid.innerHTML = "<p>لا توجد منتجات متاحة حاليًا.</p>";
    return;
  }

  els.productsGrid.innerHTML = items
    .filter((p) => p && p.published !== false)
    .slice(0, 8)
    .map((product) => {
      const image = product.image || "https://images.unsplash.com/photo-1524758631624-e2822e304c36?auto=format&fit=crop&w=900&q=80";
      const title = product.title || "منتج";
      const description = product.description || "منتج مميز";
      const price = Number(product.price || 0);
      const oldPrice = Number(product.oldPrice || price);
      const discount = product.discount || `${Math.round(((oldPrice - price) / oldPrice) * 100) || 0}%`;
      const badge = product.badge || "مميز";
      const platform = product.platform || "منصة";
      const buttonText = product.buttonText || "اشترِ الآن";
      const affiliateUrl = product.affiliateUrl || "#";

      return `
        <article class="product-card">
          <div class="image-wrap">
            <img src="${image}" alt="${title}" />
            <span class="badge">${badge}</span>
          </div>

          <div class="content">
            <div class="product-meta">
              <span>${platform}</span>
              <span>${product.category || ""}</span>
            </div>

            <h3>${title}</h3>
            <p>${description}</p>

            <div class="price-box">
              <span class="price-now">${price} ج.م</span>
              <span class="price-old">${oldPrice} ج.م</span>
            </div>

            <span class="product-tag">${discount} خصم</span>

            <div class="product-footer">
              <button class="product-link" data-url="${affiliateUrl}">${buttonText}</button>
            </div>
          </div>
        </article>
      `;
    })
    .join("");

  document.querySelectorAll(".product-link").forEach((button) => {
    button.addEventListener("click", () => {
      const url = button.getAttribute("data-url");
      if (url && url !== "#") {
        window.open(url, "_blank", "noopener,noreferrer");
      }
    });
  });
}

function renderArticles(items) {
  if (!Array.isArray(items) || items.length === 0) {
    els.articlesGrid.innerHTML = "";
    return;
  }

  els.articlesGrid.innerHTML = items
    .filter((article) => article && article.published !== false)
    .slice(0, 6)
    .map((article) => {
      const title = article.title || "مقال";
      const text = article.text || "";
      const body = article.body || text || "اقرأ المزيد لمعرفة التفاصيل.";
      return `
        <article class="article-card">
          <span class="tag">Buying Guide</span>
          <h3>${title}</h3>
          <p>${text}</p>
          <p style="margin-top:12px;">${body}</p>
        </article>
      `;
    })
    .join("");
}

function renderSports(items) {
  if (!Array.isArray(items) || items.length === 0) {
    els.sportsGrid.innerHTML = "";
    return;
  }

  els.sportsGrid.innerHTML = items
    .slice(0, 8)
    .map((sport) => {
      const name = sport.name || "قسم رياضي";
      const icon = sport.icon || "🏄";
      const list = Array.isArray(sport.items) ? sport.items : [];
      const itemsHtml = list.slice(0, 3).map((it) => `<li>${it}</li>`).join("");

      return `
        <article class="sport-card">
          <div class="sport-icon">${icon}</div>
          <h3>${name}</h3>
          <ul>${itemsHtml}</ul>
        </article>
      `;
    })
    .join("");
}

function renderPayments(items) {
  if (!Array.isArray(items) || items.length === 0) {
    els.paymentsGrid.innerHTML = "";
    return;
  }

  els.paymentsGrid.innerHTML = items
    .map((item) => {
      const title = item.title || "طريقة دفع";
      const icon = item.icon || "💳";
      const description = item.description || "طرق الدفع والتوصيل تختلف حسب المتجر والمنصة.";
      return `
        <article class="payment-card">
          <div class="payment-icon">${icon}</div>
          <div>
            <h4>${title}</h4>
            <p>${description}</p>
          </div>
        </article>
      `;
    })
    .join("");
}

function renderSocials(items) {
  const socials = normalizeSocials(items);
  if (!socials.length) {
    els.socialGrid.innerHTML = "";
    return;
  }

  const icons = {
    facebook: "f",
    instagram: "◎",
    youtube: "▶",
    tiktok: "♪",
    threads: "✦",
    snapchat: "◌",
    x: "X",
    twitter: "X"
  };

  els.socialGrid.innerHTML = socials
    .map((social) => {
      const name = safeText(social.name, "social");
      const label = safeText(social.label, name);
      const url = safeText(social.url, "#");
      const icon = icons[name.toLowerCase()] || "↗";
      return `
        <a class="social-card" href="${url}" target="_blank" rel="noopener noreferrer">
          <div class="social-icon">${icon}</div>
          <strong>${label}</strong>
        </a>
      `;
    })
    .join("");
}

function renderPlatforms(items) {
  if (!Array.isArray(items) || items.length === 0) {
    els.platformGrid.innerHTML = "";
    return;
  }

  els.platformGrid.innerHTML = items
    .filter((item) => item && item.showOnSite !== false)
    .map((item) => {
      const name = item.name || "منصة";
      const url = item.url || "#";
      const notes = item.notes || "متاحة عبر المنصة";
      return `
        <article class="platform-card">
          <h4>${name}</h4>
          <p>${notes}</p>
          <a href="${url}" target="_blank" rel="noopener noreferrer">زيارة المنصة</a>
        </article>
      `;
    })
    .join("");
}

function initMusic(musicUrl) {
  const audio = els.musicAudio;
  const playPauseBtn = els.playPauseBtn;

  if (!musicUrl || !musicUrl.trim()) {
    document.getElementById("musicPlayerWrap").style.display = "none";
    return;
  }

  audio.src = musicUrl;
  audio.preload = "none";

  playPauseBtn.addEventListener("click", async () => {
    try {
      if (audio.paused) {
        await audio.play();
        playPauseBtn.textContent = "❚❚";
      } else {
        audio.pause();
        playPauseBtn.textContent = "▶";
      }
    } catch (error) {
      console.warn("Autoplay blocked by browser. User interaction is required to play audio.", error);
    }
  });
}

els.searchToggle.addEventListener("click", () => {
  els.searchPanel.classList.toggle("hidden");
  if (!els.searchPanel.classList.contains("hidden")) {
    els.searchInput.focus();
  }
});

els.searchInput.addEventListener("input", (event) => {
  const term = event.target.value.trim().toLowerCase();
  const cards = document.querySelectorAll(".product-card");

  cards.forEach((card) => {
    const text = card.textContent.toLowerCase();
    card.style.display = text.includes(term) ? "" : "none";
  });
});

document.addEventListener("DOMContentLoaded", () => {
  fetchSiteData();
});
