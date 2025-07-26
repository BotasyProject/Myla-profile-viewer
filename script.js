// script.js

const iframe = document.getElementById("preview");

// Load the simulated message from test-receipt.json
fetch(`test-receipt.json?t=${Date.now()}`) // Add ?t=... to bypass GitHub Pages cache
  .then(response => {
    if (!response.ok) {
      throw new Error(`Failed to load test-receipt.json: ${response.status}`);
    }
    return response.json();
  })
  .then(({ htmlFile, cssFile }) => {
    // Load the actual HTML and CSS files from the message
    return Promise.all([
      fetch(htmlFile).then(res => res.text()),
      Promise.resolve(cssFile)
    ]);
  })
  .then(([htmlContent, cssFile]) => {
    // Build a full document with a linked stylesheet
    const fullDocument = `
      <!DOCTYPE html>
      <html>
      <head>
        <link rel="stylesheet" href="${cssFile}">
      </head>
      <body>
        ${htmlContent}
      </body>
      </html>
    `;

    // Inject the document into the iframe
    const doc = iframe.contentDocument || iframe.contentWindow.document;
    doc.open();
    doc.write(fullDocument);
    doc.close();
  })
  .catch(error => {
    console.error("Preview error:", error);

    const doc = iframe.contentDocument || iframe.contentWindow.document;
    doc.open();
    doc.write(`<p style="color: red;">Error loading preview.</p>`);
    doc.close();
  });
