// script.js

// Select the preview iframe
const iframe = document.getElementById("preview");

// Load the test HTML and CSS from the simulated message file
fetch(`test-receipt.json?t=${Date.now()}`) // cache-busting query param
  .then(response => {
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    return response.json();
  })
  .then(({ html, css }) => {
    // Inject the HTML and CSS into the iframe
    const doc = iframe.contentDocument || iframe.contentWindow.document;
    doc.open();
    doc.write(`<style>${css}</style>${html}`);
    doc.close();
  })
  .catch(error => {
    console.error("Failed to load test data:", error);

    // Optional: fallback content or error message in iframe
    const doc = iframe.contentDocument || iframe.contentWindow.document;
    doc.open();
    doc.write(`<body><p style="color:red;">Error loading test data.</p></body>`);
    doc.close();
  });
