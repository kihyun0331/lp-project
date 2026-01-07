const id = new URLSearchParams(location.search).get("id");
const box = document.getElementById("detail");

fetch("./data/lp.json")
  .then(r => r.json())
  .then(data => {
    const lp = data.find(d => d.id == id);
    if (!lp) return;

    box.innerHTML = `
  <div class="detail-paper">
    <div class="detail-left">
      <img src="${lp.image || 'images/no-image.png'}">
    </div>

    <div class="detail-right">
      <h2 class="detail-title">${lp.name}</h2>

      <div class="detail-meta">
        <p><span>아티스트</span>${lp.가수 || "-"}</p>
        <p><span>장르</span>${lp.category || "-"}</p>
        <p><span>발매</span>${lp.수록일자 || "-"}</p>
        <p><span>국가</span>${lp.국가 || "-"}</p>
        <p><span>보관 위치</span>${lp.위치 || "-"}</p>
      </div>

      <div class="detail-tracks">
        <h3>Side A</h3>
        <pre>${lp.side1 || "-"}</pre>

        <h3>Side B</h3>
        <pre>${lp.side2 || "-"}</pre>
      </div>

      ${lp.memo ? `<div class="detail-memo">${lp.memo}</div>` : ""}
    </div>
  </div>
`;

  });