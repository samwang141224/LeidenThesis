/* ===== Leiden Thesis Upload — app.js ===== */
(function () {
  'use strict';

  // ── DOM references ───────────────────────────────────────────────
  const dropZone   = document.getElementById('drop-zone');
  const fileInput  = document.getElementById('file-input');
  const fileInfo   = document.getElementById('file-info');
  const fileName   = document.getElementById('file-name');
  const fileSize   = document.getElementById('file-size');
  const btnClear   = document.getElementById('btn-clear');
  const viewerCard = document.getElementById('viewer-card');
  const pdfFrame   = document.getElementById('pdf-frame');
  const docTitle   = document.getElementById('doc-title');
  const emptyState = document.getElementById('empty-state');
  const loader     = document.getElementById('loader');
  const btnZoomIn  = document.getElementById('btn-zoom-in');
  const btnZoomOut = document.getElementById('btn-zoom-out');
  const btnFull    = document.getElementById('btn-fullscreen');

  let currentObjectURL = null;

  // ── Helpers ──────────────────────────────────────────────────────
  function formatBytes(bytes) {
    if (bytes < 1024)        return bytes + ' B';
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB';
    return (bytes / (1024 * 1024)).toFixed(2) + ' MB';
  }

  function revokeOldURL() {
    if (currentObjectURL) {
      URL.revokeObjectURL(currentObjectURL);
      currentObjectURL = null;
    }
  }

  // ── Load a File object into the viewer ───────────────────────────
  function loadPDF(file) {
    if (!file || file.type !== 'application/pdf') {
      alert('Please select a valid PDF file.');
      return;
    }

    // Show file metadata
    fileName.textContent = file.name;
    fileSize.textContent = formatBytes(file.size);
    fileInfo.classList.add('visible');

    // Update toolbar title
    docTitle.textContent = file.name;

    // Show loader, hide viewer while loading
    emptyState.style.display  = 'none';
    loader.classList.add('visible');
    viewerCard.classList.remove('visible');

    // Revoke previous blob URL to free memory
    revokeOldURL();

    // Create a new blob URL and inject into iframe
    currentObjectURL = URL.createObjectURL(file);

    pdfFrame.onload = function () {
      loader.classList.remove('visible');
      viewerCard.classList.add('visible');
    };

    pdfFrame.src = currentObjectURL;
  }

  // ── Clear / reset ────────────────────────────────────────────────
  function clearViewer() {
    revokeOldURL();
    fileInput.value     = '';
    fileInfo.classList.remove('visible');
    viewerCard.classList.remove('visible');
    pdfFrame.src        = '';
    docTitle.textContent = 'No file selected';
    emptyState.style.display = 'block';
    loader.classList.remove('visible');
  }

  // ── Drag-and-drop events ─────────────────────────────────────────
  dropZone.addEventListener('dragover', function (e) {
    e.preventDefault();
    dropZone.classList.add('drag-over');
  });

  dropZone.addEventListener('dragleave', function () {
    dropZone.classList.remove('drag-over');
  });

  dropZone.addEventListener('drop', function (e) {
    e.preventDefault();
    dropZone.classList.remove('drag-over');
    const files = e.dataTransfer.files;
    if (files.length > 0) loadPDF(files[0]);
  });

  // ── File-input change ────────────────────────────────────────────
  fileInput.addEventListener('change', function () {
    if (fileInput.files.length > 0) loadPDF(fileInput.files[0]);
  });

  // ── Clear button ─────────────────────────────────────────────────
  btnClear.addEventListener('click', clearViewer);

  // ── Zoom controls (scales the iframe body via CSS) ───────────────
  let zoom = 1;

  function applyZoom() {
    try {
      // Works for same-origin blob URLs; use transform for cross-browser support
      const doc = pdfFrame.contentDocument || pdfFrame.contentWindow.document;
      doc.body.style.transformOrigin = 'top left';
      doc.body.style.transform = 'scale(' + zoom + ')';
      // Adjust the host iframe height so scroll bars appear correctly
      pdfFrame.style.height = (80 * zoom) + 'vh';
    } catch (_) {
      // Cross-origin — not applicable; ignore
    }
  }

  btnZoomIn.addEventListener('click', function () {
    zoom = Math.min(zoom + 0.25, 3);
    applyZoom();
  });

  btnZoomOut.addEventListener('click', function () {
    zoom = Math.max(zoom - 0.25, 0.5);
    applyZoom();
  });

  // ── Fullscreen the iframe ─────────────────────────────────────────
  btnFull.addEventListener('click', function () {
    const el = pdfFrame;
    if (el.requestFullscreen)            el.requestFullscreen();
    else if (el.webkitRequestFullscreen) el.webkitRequestFullscreen();
    else if (el.mozRequestFullScreen)    el.mozRequestFullScreen();
  });

  // ── Paste from clipboard (Ctrl+V) ────────────────────────────────
  document.addEventListener('paste', function (e) {
    const items = (e.clipboardData || window.clipboardData).items;
    for (let i = 0; i < items.length; i++) {
      if (items[i].type === 'application/pdf') {
        loadPDF(items[i].getAsFile());
        break;
      }
    }
  });
}());
