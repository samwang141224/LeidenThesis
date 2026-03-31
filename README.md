# LeidenThesis

A GitHub Pages website that lists your thesis PDF documents as public links. Anyone with the URL can open and download them.

---

## 🌐 Public website URL

Once GitHub Pages is enabled (see setup below), your site will be live at:

```
https://samwang141224.github.io/LeidenThesis/
```

---

## ⚙️ One-time GitHub Pages setup

1. Go to your repository on GitHub: **https://github.com/samwang141224/LeidenThesis**
2. Click **Settings** → **Pages** (left sidebar)
3. Under **Source**, select **Deploy from a branch**
4. Choose branch **`main`** and folder **`/ (root)`**
5. Click **Save**
6. Wait ~1 minute, then visit **https://samwang141224.github.io/LeidenThesis/**

---

## ✏️ How to edit the website

### 1. Add a PDF file

Upload your PDF into the `pdfs/` folder in this repository:

- On GitHub.com: go to `pdfs/` → **Add file → Upload files** → select your PDF → **Commit changes**
- Or add via git: place the file in the `pdfs/` folder, then `git add`, `git commit`, `git push`

### 2. Add a link on the page

Open `index.html` and find the section you want to edit:

**Ph.D. Thesis links** (bullet list):
```html
<li><a href="pdfs/full-thesis.pdf" target="_blank">Full thesis</a></li>
```
Change `full-thesis.pdf` to the actual filename you uploaded, and change `Full thesis` to whatever label you want.

**Individual Chapters** (numbered list):
```html
<li><a href="pdfs/chapter1.pdf" target="_blank">Chapter 1: Introduction</a></li>
```
Add or remove `<li>` lines to match your chapters.

### 3. Change the date

In `index.html`, find this line and update it:
```html
Mar, 2025
```

### 4. Change section titles or labels

In `index.html`, find and edit:
```html
<h2>Ph.D. Thesis</h2>
<span class="section-label">Primary documents</span>
```

---

## 📁 File structure

```
LeidenThesis/
├── index.html       ← Edit this to add/remove links
├── styles.css       ← Edit this to change colors / fonts
├── pdfs/            ← Put all your PDF files here
│   ├── full-thesis.pdf
│   ├── chapter1.pdf
│   └── ...
└── README.md
```
