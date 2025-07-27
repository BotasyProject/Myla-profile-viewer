const iframe = document.getElementById("preview");

// Parse htmlFile and cssFile from URL query params
const urlParams = new URLSearchParams(window.location.search);
const htmlFile = urlParams.get("htmlFile");
const cssFile = urlParams.get("cssFile");

if (!htmlFile || !cssFile) {
  const doc = iframe.contentDocument || iframe.contentWindow.document;
  doc.open();
  doc.write(`<p style="color: red;">Missing htmlFile or cssFile URL parameter.</p>`);
  doc.close();
} else {
  // Fetch the HTML content
  fetch(htmlFile)
    .then(res => {
      if (!res.ok) {
        throw new Error(`Failed to load HTML file: ${res.status}`);
      }
      return res.text();
    })
    .then(htmlContent => {
      const fullDocument = `
        <!DOCTYPE html>
        <html>
          <head>
            <meta charset="UTF-8">
            <link rel="stylesheet" href="${cssFile}">
          </head>
          <body>
            ${htmlContent}
          </body>
        </html>
      `;

      const doc = iframe.contentDocument || iframe.contentWindow.document;
      doc.open();
      doc.write(fullDocument);
      doc.close();
    })
    .catch(error => {
      console.error("Preview error:", error);
      const doc = iframe.contentDocument || iframe.contentWindow.document;
      doc.open();
      doc.write(`<p style="color: red;">Error loading preview: ${error.message}</p>`);
      doc.close();
    });
}
