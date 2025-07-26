const iframe = document.getElementById("preview");

// Load the simulated message containing file URLs
fetch(`test-receipt.json?t=${Date.now()}`) // Cache-busting
  .then(response => {
    if (!response.ok) {
      throw new Error(`Failed to load test-receipt.json: ${response.status}`);
    }
    return response.json();
  })
  .then(({ htmlFile, cssFile }) => {
    // Fetch the actual HTML content
    return fetch(htmlFile)
      .then(res => {
        if (!res.ok) {
          throw new Error(`Failed to load HTML file: ${res.status}`);
        }
        return res.text();
      })
      .then(htmlContent => {
        return { htmlContent, cssFile }; // Pass both to next step
      });
  })
  .then(({ htmlContent, cssFile }) => {
    // Build a full HTML document string with a <link> to the stylesheet
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

    // Write it into the iframe
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

