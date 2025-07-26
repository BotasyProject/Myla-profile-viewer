fetch("test-receipt.json?t=" + Date.now())
  .then(res => res.json())
  .then(({ htmlFile, css }) => {
    return Promise.all([
      fetch(htmlFile).then(res => res.text()),
      Promise.resolve(css)
    ]);
  })
  .then(([html, css]) => {
    const iframe = document.getElementById("preview");
    const doc = iframe.contentDocument || iframe.contentWindow.document;
    doc.open();
    doc.write(`<style>@import: url(${css});</style>${html}`);
    doc.close();
  });
