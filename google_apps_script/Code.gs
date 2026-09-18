function doGet() {
  const spreadsheetId = "1sD41EruIGQdr2-6-ZMl6GEbFgkkxkXvJSGeBo--71EY";
  const ss = SpreadsheetApp.openById(spreadsheetId);

  const data = {
    settings: readSettings(ss),
    categories: readSheetAsObjects(ss, "تصنيفات"),
    products: readProducts(ss),
    articles: readArticles(ss),
    sports: readSports(ss),
    contact: readContact(ss),
    paymentMethods: readPaymentMethods(ss),
    platforms: readPlatforms(ss),
    socials: readSocials(ss)
  };

  return ContentService.createTextOutput(JSON.stringify(data))
    .setMimeType(ContentService.MimeType.JSON);
}

function readSettings(ss) {
  const sheet = ss.getSheetByName("إعدادات");
  if (!sheet) return {};

  const values = sheet.getDataRange().getValues();
  const result = {};

  for (let row = 1; row < values.length; row++) {
    const item = values[row];
    if (!item || item.length === 0) continue;
    const key = String(item[0] || "").trim();
    const value = item[1] !== undefined ? item[1] : "";
    if (!key) continue;

    const normalizedKey = key.replace(/\s+/g, "_").toLowerCase();
    result[normalizedKey] = value;
  }

  return result;
}

function readProducts(ss) {
  const sheet = ss.getSheetByName("منتجات");
  if (!sheet) return [];

  const values = sheet.getDataRange().getValues();
  if (values.length < 2) return [];

  const headers = values[0].map((h) => String(h || "").trim());

  const rows = [];
  for (let i = 1; i < values.length; i++) {
    const row = values[i];
    if (!row || row.every((cell) => cell === "")) continue;

    const obj = {};
    headers.forEach((header, index) => {
      obj[header] = row[index] !== undefined ? row[index] : "";
    });

    rows.push({
      id: obj.id || "",
      title: obj.title || "",
      description: obj.description || "",
      image: obj.image || "",
      price: Number(obj.price || 0),
      oldPrice: Number(obj.oldPrice || 0),
      platform: obj.platform || "",
      category: obj.category || "",
      subcategory: obj.subcategory || "",
      url: obj.url || "#",
      published: String(obj.published || "").toLowerCase() === "true" || obj.published === true,
      delivery: obj.delivery || "توصيل حسب المنطقة",
      cashOnDelivery: String(obj.cashOnDelivery || "").toLowerCase() === "true" || obj.cashOnDelivery === true,
      returnPolicy: obj.returnPolicy || "إرجاع خلال 7 أيام",
      discount: obj.discount || "",
      badge: obj.badge || "مميز",
      buttonText: obj.buttonText || "اشترِ الآن",
      affiliateUrl: obj.affiliateUrl || "#"
    });
  }

  return rows;
}

function readArticles(ss) {
  const sheet = ss.getSheetByName("مقالات");
  if (!sheet) return [];

  const values = sheet.getDataRange().getValues();
  if (values.length < 2) return [];

  const headers = values[0].map((h) => String(h || "").trim());

  const rows = [];
  for (let i = 1; i < values.length; i++) {
    const row = values[i];
    if (!row || row.every((cell) => cell === "")) continue;

    const obj = {};
    headers.forEach((header, index) => {
      obj[header] = row[index] !== undefined ? row[index] : "";
    });

    rows.push({
      id: obj.id || "",
      title: obj.title || "",
      text: obj.text || "",
      body: obj.body || "",
      published: String(obj.published || "").toLowerCase() === "true" || obj.published === true
    });
  }

  return rows;
}

function readSheetAsObjects(ss, sheetName) {
  const sheet = ss.getSheetByName(sheetName);
  if (!sheet) return [];

  const values = sheet.getDataRange().getValues();
  if (values.length < 2) return [];

  const headers = values[0].map((h) => String(h || "").trim());

  const rows = [];
  for (let i = 1; i < values.length; i++) {
    const row = values[i];
    if (!row || row.every((cell) => cell === "")) continue;

    const obj = {};
    headers.forEach((header, index) => {
      obj[header] = row[index] !== undefined ? row[index] : "";
    });

    rows.push(obj);
  }

  return rows;
}

function readSports(ss) {
  const sheet = ss.getSheetByName("رياضات");
  if (!sheet) return [];

  const values = sheet.getDataRange().getValues();
  if (values.length < 2) return [];

  const headers = values[0].map((h) => String(h || "").trim());
  const result = [];

  for (let i = 1; i < values.length; i++) {
    const row = values[i];
    if (!row || row.every((cell) => cell === "")) continue;

    const obj = {};
    headers.forEach((header, index) => {
      obj[header] = row[index] !== undefined ? row[index] : "";
    });

    const items = [];
    Object.keys(obj).forEach((key) => {
      const value = obj[key];
      if (value && String(value).trim() && /subcategory|subcat|item|items/i.test(key)) {
        const splitted = String(value).split(",");
        splitted.forEach((part) => {
          const cleaned = String(part).trim();
          if (cleaned) items.push(cleaned);
        });
      }
    });

    result.push({
      id: obj.id || "",
      name: obj.name || obj.title || "",
      icon: obj.icon || "🏄",
      items: items.length ? items : [obj.item1 || "متنوع"]
    });
  }

  return result;
}

function readContact(ss) {
  const sheet = ss.getSheetByName("تواصل");
  if (!sheet) return [];

  const values = sheet.getDataRange().getValues();
  if (values.length < 2) return [];

  const headers = values[0].map((h) => String(h || "").trim());
  const rows = [];

  for (let i = 1; i < values.length; i++) {
    const row = values[i];
    if (!row || row.every((cell) => cell === "")) continue;

    const obj = {};
    headers.forEach((header, index) => {
      obj[header] = row[index] !== undefined ? row[index] : "";
    });

    rows.push({
      name: obj.name || obj.platform || "",
      label: obj.label || obj.name || obj.platform || "",
      url: obj.url || "#"
    });
  }

  return rows;
}

function readSocials(ss) {
  return readContact(ss);
}

function readPaymentMethods(ss) {
  const sheet = ss.getSheetByName("طرق الدفع");
  if (!sheet) return [];

  const values = sheet.getDataRange().getValues();
  if (values.length < 2) return [];

  const headers = values[0].map((h) => String(h || "").trim());
  const rows = [];

  for (let i = 1; i < values.length; i++) {
    const row = values[i];
    if (!row || row.every((cell) => cell === "")) continue;

    const obj = {};
    headers.forEach((header, index) => {
      obj[header] = row[index] !== undefined ? row[index] : "";
    });

    rows.push({
      id: obj.id || "",
      title: obj.title || obj.name || "",
      icon: obj.icon || "💳",
      description: obj.description || obj.notes || "طرق الدفع والتوصيل تختلف حسب المتجر والمنصة.",
      showOnSite: String(obj.showOnSite || "").toLowerCase() === "true" || obj.showOnSite === true
    });
  }

  return rows.filter((row) => row.showOnSite !== false);
}

function readPlatforms(ss) {
  const sheet = ss.getSheetByName("منصات");
  if (!sheet) return [];

  const values = sheet.getDataRange().getValues();
  if (values.length < 2) return [];

  const headers = values[0].map((h) => String(h || "").trim());
  const rows = [];

  for (let i = 1; i < values.length; i++) {
    const row = values[i];
    if (!row || row.every((cell) => cell === "")) continue;

    const obj = {};
    headers.forEach((header, index) => {
      obj[header] = row[index] !== undefined ? row[index] : "";
    });

    rows.push({
      id: obj.id || "",
      name: obj.name || "",
      url: obj.url || "#",
      showOnSite: String(obj.showOnSite || "").toLowerCase() === "true" || obj.showOnSite === true,
      affiliateUrl: obj.affiliateUrl || "#",
      notes: obj.notes || ""
    });
  }

  return rows.filter((row) => row.showOnSite !== false);
}
