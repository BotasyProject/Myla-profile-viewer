const iframe = document.getElementById("preview");

// Parse URL parameters
const urlParams = new URLSearchParams(window.location.search);
const htmlFile = urlParams.get("htmlFile");
const cssFile = urlParams.get("cssFile");

if (!htmlFile) {
  console.error("No htmlFile parameter found.");
} else {
  fetch(htmlFile)
    .then(response => {
      if (!response.ok) throw new Error(`Failed to load HTML: ${response.status}`);
      return response.text();
    })
    .then(htmlContent => {
      // Compute base href from htmlFile URL (directory of the file)
      const url = new URL(htmlFile);
      const baseHref = url.origin + url.pathname.replace(/\/[^\/]*$/, "/");

      // Build full HTML document with <base> and CSS link
      const fullDocument = `
        <!DOCTYPE html>
        <html>
          <head>
            <meta charset="UTF-8">
            <base href="${baseHref}">
            ${cssFile ? `<link rel="stylesheet" href="${cssFile}">` : ""}
          </head>
          <body>
            ${htmlContent}
          </body>
        </html>
      `;

      // Write into iframe
      const doc = iframe.contentDocument || iframe.contentWindow.document;
      doc.open();
      doc.write(fullDocument);
      doc.close();
    })
    .catch(error => {
      console.error("Error loading preview:", error);
      const doc = iframe.contentDocument || iframe.contentWindow.document;
      doc.open();
      doc.write(`<p style="color:red;">Error loading preview: ${error.message}</p>`);
      doc.close();
    });
}
