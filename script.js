const iframe = document.getElementById("preview");

fetch("https://botasyproject.github.io/tasyprofstrg/amiya.html")
  .then(response => {
    if (!response.ok) throw new Error(`Failed to load HTML: ${response.status}`);
    return response.text();
  })
  .then(htmlContent => {
    const doc = iframe.contentDocument || iframe.contentWindow.document;
    doc.open();
    doc.write(htmlContent);
    doc.close();
  })
  .catch(error => {
    console.error("Test fetch error:", error);
    const doc = iframe.contentDocument || iframe.contentWindow.document;
    doc.open();
    doc.write(`<p style="color:red;">Error loading HTML: ${error.message}</p>`);
    doc.close();
  });
