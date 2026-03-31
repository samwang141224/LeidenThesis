# LeidenThesis

A lightweight, browser-based website that lets you **upload and view your thesis PDF** — no server required.

## Features

- 📄 **Drag-and-drop** or click-to-browse PDF upload
- 🔍 In-browser PDF viewer (iframe-based, works with any browser PDF plugin)
- ⛶ Fullscreen mode and zoom controls
- 🔒 **100 % local** — your file never leaves your computer
- ♿ Accessible markup with ARIA labels

## Usage

1. Open `index.html` in any modern browser (Chrome, Firefox, Edge, Safari).
2. Drag your thesis PDF onto the upload area — or click **"click to browse"** and select the file.
3. The PDF is displayed instantly in the viewer below.
4. Use **+ Zoom / − Zoom** and **⛶ Fullscreen** to adjust the reading experience.
5. Click the **✕** button to remove the current file and load a different one.

## Files

| File | Description |
|------|-------------|
| `index.html` | Main page — upload form and PDF viewer |
| `styles.css` | All styling (Leiden blue color scheme) |
| `app.js` | Client-side logic: file handling, drag-drop, zoom, fullscreen |

## Running locally

No build step is needed. Simply open `index.html`:

```bash
# macOS
open index.html

# Linux
xdg-open index.html

# Windows (PowerShell)
start index.html
```

Or serve with any static server for the best experience:

```bash
npx serve .
# then visit http://localhost:3000
```
