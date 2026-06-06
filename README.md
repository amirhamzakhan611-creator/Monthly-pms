# 📱 PMS Tracker — DPI West 1

> Preventive Maintenance Schedule (PMS) Ticket Tracker  
> Built for: **Amir Khan · Senior Technician · DPI West 1, Mumbai**

---

## 🚀 GitHub Pages pe Deploy kaise karo

### Step 1 — GitHub Account
- **github.com** pe account banao (agar nahi hai to)

### Step 2 — New Repository banao
1. GitHub pe login karo
2. Top-right `+` → **New repository**
3. Repository name: `pms-tracker`
4. **Public** select karo ✅
5. **Create repository** click karo

### Step 3 — Files Upload karo
1. Repository page pe **"uploading an existing file"** link click karo
2. **Yeh saari files drag karke upload karo:**
   ```
   index.html
   manifest.json
   sw.js
   offline.html
   icons/  (folder — icon-192.png, icon-512.png, icon.svg)
   ```
3. Commit message: `PMS Tracker v1.0`
4. **Commit changes** click karo

> ⚠️ **IMPORTANT:** `icons` folder ke andar ki files bhi upload karni hain

### Step 4 — GitHub Pages ON karo
1. Repository → **Settings** tab
2. Left sidebar: **Pages**
3. Source: **Deploy from a branch**
4. Branch: `main` → folder: `/ (root)`
5. **Save** click karo

### Step 5 — App URL milega
```
https://YOUR-USERNAME.github.io/pms-tracker/
```
Thodi der mein (2–5 min) live ho jayega ✅

---

## 📲 Smartphone pe Install karo

### Android (Chrome):
1. App URL Chrome mein open karo
2. Address bar ke niche **"Add to Home screen"** banner aayega
3. **Install** tap karo
4. Done! App icon home screen pe aa jayega

### iPhone (Safari):
1. Safari mein URL open karo
2. Bottom Share button (📤) tap karo
3. **"Add to Home Screen"** select karo
4. **Add** tap karo

---

## ✨ Features

- **6 Store Tracking** — Closed ✅ + Open 🔴 tickets per store
- **Auto % Calculation** — Compliance percentage instant
- **15-Day Cycle** — Cycle 1 (1–15) aur Cycle 2 (16–31) alag saved
- **Monthly Archive** — Har month aur cycle ka data saved rehta hai
- **WhatsApp Report** — One-tap formatted message generate
- **Offline Support** — Internet band hone pe bhi kaam karta hai
- **Auto Save** — LocalStorage mein hamesha saved

---

## 📁 File Structure

```
pms-tracker/
├── index.html      ← Main App
├── manifest.json   ← PWA Config
├── sw.js           ← Service Worker (Offline)
├── offline.html    ← Offline fallback page
└── icons/
    ├── icon.svg        ← Vector icon
    ├── icon-192.png    ← App icon (small)
    └── icon-512.png    ← App icon (large)
```

---

*Made with ❤️ for DPI West 1 Field Operations*
