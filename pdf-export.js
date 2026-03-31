(function (globalScope) {
  function escapeHtml(value) {
    return String(value)
      .replaceAll("&", "&amp;")
      .replaceAll("<", "&lt;")
      .replaceAll(">", "&gt;")
      .replaceAll('"', "&quot;")
      .replaceAll("'", "&#39;");
  }

  function buildPdfBundleMarkup(items) {
    const pages = items
      .map(
        (item) => `
        <section class="page">
          <p class="eyebrow">${escapeHtml(item.type)}</p>
          <h1>${escapeHtml(item.name)}</h1>
          <p class="description">${escapeHtml(item.description)}</p>
          <div class="grid">
            <article>
              <h2>Overview</h2>
              <p>${escapeHtml(item.overview)}</p>
            </article>
            <article>
              <h2>Good</h2>
              <p>${escapeHtml(item.good)}</p>
            </article>
            <article>
              <h2>Bad</h2>
              <p>${escapeHtml(item.bad)}</p>
            </article>
            <article>
              <h2>Ugly</h2>
              <p>${escapeHtml(item.ugly)}</p>
            </article>
          </div>
        </section>
      `,
      )
      .join("");

    return `<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>TailoredAgile Bundle</title>
    <style>
      :root {
        color-scheme: light;
      }
      body {
        margin: 0;
        background: #f8f6f1;
        color: #1f2430;
        font-family: "Space Grotesk", "Segoe UI", sans-serif;
      }
      .page {
        box-sizing: border-box;
        min-height: 100vh;
        padding: 24mm 18mm;
        page-break-after: always;
      }
      .page:last-child {
        page-break-after: auto;
      }
      .eyebrow {
        margin: 0 0 8px;
        font-size: 11px;
        letter-spacing: 0.12em;
        text-transform: uppercase;
      }
      h1 {
        margin: 0;
        font-size: 28px;
      }
      .description {
        margin: 10px 0 20px;
        font-size: 16px;
        line-height: 1.45;
      }
      .grid {
        display: grid;
        gap: 12px;
        grid-template-columns: 1fr 1fr;
      }
      article {
        border: 1px solid #d5dbe7;
        border-radius: 10px;
        padding: 12px;
      }
      h2 {
        margin: 0 0 8px;
        font-size: 15px;
      }
      p {
        margin: 0;
        line-height: 1.5;
      }
      @media print {
        body {
          background: #fff;
        }
      }
    </style>
  </head>
  <body>
    ${pages}
    <script>
      window.addEventListener("load", () => {
        setTimeout(() => window.print(), 120);
      });
    </script>
  </body>
</html>`;
  }

  function openPdfBundle(items, windowObj, alertFn) {
    const runtimeWindow = windowObj || globalScope.window;
    const runtimeAlert = alertFn || globalScope.alert;
    const printWindow = runtimeWindow.open("about:blank", "_blank");

    if (!printWindow || !printWindow.document) {
      if (typeof runtimeAlert === "function") {
        runtimeAlert("Unable to open the PDF preview window. Please allow pop-ups and try again.");
      }
      return false;
    }

    printWindow.document.open();
    printWindow.document.write(buildPdfBundleMarkup(items));
    printWindow.document.close();
    if (typeof printWindow.focus === "function") {
      printWindow.focus();
    }
    return true;
  }

  const api = {
    escapeHtml,
    buildPdfBundleMarkup,
    openPdfBundle,
  };

  if (typeof module !== "undefined" && module.exports) {
    module.exports = api;
  }

  if (globalScope.window) {
    globalScope.window.pdfExport = api;
  }
})(typeof globalThis !== "undefined" ? globalThis : this);
