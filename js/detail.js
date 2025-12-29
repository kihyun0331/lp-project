const id = new URLSearchParams(location.search).get("id");
const box = document.getElementById("detail");

fetch("./data/lp.json")
  .then(r => r.json())
  .then(data => {
    const lp = data.find(d => d.id == id);
    if (!lp) return;

    box.innerHTML = `
      <h2>${lp.name}</h2>
      <img src="${lp.image || 'images/no-image.png'}">
      <p><b>가수:</b> ${lp.가수 || ""}</p>
      <p><b>발매:</b> ${lp.수록일자 || ""}</p>
      <p><b>국가:</b> ${lp.국가 || ""}</p>
      <p><b>위치:</b> ${lp.위치 || ""}</p>
      <pre>${lp.side1 || ""}</pre>
      <pre>${lp.side2 || ""}</pre>
      <p>${lp.memo || ""}</p>
    `;
  });