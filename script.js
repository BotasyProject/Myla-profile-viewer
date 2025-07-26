// Decode and render passed HTML and CSS
const url = new URL(window.location.href);
const html = decodeURIComponent(url.searchParams.get("html") || "");
const css = decodeURIComponent(url.searchParams.get("css") || "");

const iframe = document.getElementById("preview");
const doc = iframe.contentDocument || iframe.contentWindow.document;

doc.open();
doc.write(`
  <style>${css}</style>
  ${html}
`);
doc.close();
