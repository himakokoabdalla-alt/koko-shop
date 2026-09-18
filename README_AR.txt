KOKO SHOP - مشروع كامل

ملاحظات هامة:
- هذا المشروع مصمم ليعمل مع Google Sheets عبر Apps Script كـ Web App.
- لا تستخدم Amazon Customer Reviews أو بيانات Amazon غير المسموح بها.
- لا تجعل الموقع يزعم أن جميع طرق الدفع متاحة دائمًا.
- الإفصاح عن Amazon يجب أن يظهر بوضوح.
- الروابط الخارجية يجب أن تُستخدم في صورة Affiliate URLs عند توفرها.

هيكل الملفات:
- index.html
- style.css
- app.js
- config.js
- google_apps_script/Code.gs
- data/
- README_AR.txt

خطوات التشغيل:
1) أنشئ ورقة Google Sheets جديدة.
2) أضف الأوراق التالية:
   - منتجات
   - مقالات
   - إعدادات
   - تصنيفات
   - رياضات
   - تواصل
   - طرق الدفع
   - منصات
3) انسخ العناوين المطلوبة في كل ورقة.
4) اذهب إلى Extensions > Apps Script.
5) أنشئ ملف Code.gs وضع فيه محتوى google_apps_script/Code.gs.
6) ضع Spreadsheet ID الحالي في الكود.
7) Deploy > New Deployment > Web App.
8) احصل على رابط /exec.
9) ضع الرابط داخل config.js في: CONFIG.appScriptUrl
10) افتح index.html في المتصفح أو استخدم Live Server.
11) تأكد أن Settings و Socials و Payment Methods تظهر من Google Sheets.

أمثلة للـ Sheets:
1) منتجات
- id
- title
- description
- image
- price
- oldPrice
- platform
- category
- subcategory
- url
- published
- delivery
- cashOnDelivery
- returnPolicy
- discount
- badge
- buttonText
- affiliateUrl

2) مقالات
- id
- title
- text
- body
- published

3) إعدادات
- hero_title
- hero_text
- music_url
- music_name
- show_platforms
- amazon_disclosure
- payment_title
- payment_methods
- delivery_text
- site_title

4) تصنيفات
- id
- name
- icon

5) رياضات
- id
- name
- icon
- subcategory

6) تواصل
- name
- label
- url

7) طرق الدفع
- id
- title
- icon
- description
- showOnSite

8) منصات
- id
- name
- url
- showOnSite
- affiliateUrl
- notes

9) شرح التحكم
- نص إرشادي عربي داخل الورقة

ملاحظات:
- لا تضع بيانات حقيقية غير مؤكدة في الأسعار أو الخصومات.
- جميع البيانات غير مؤكدة يجب أن تكون واضحة كـ Demo data.
- إذا كان المتصفح يمنع التشغيل التلقائي للموسيقى، فيجب أن يعتمد التشغيل على تفاعل المستخدم.
