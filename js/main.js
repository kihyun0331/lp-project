const list = document.getElementById("album-list");
const search = document.getElementById("search");

let albums = [];

fetch("./data/lp.json")
  .then(r => r.json())
  .then(data => {
    albums = data;
    render(albums);
  });

function render(data) {
  list.innerHTML = "";
  data.forEach(lp => {
    const div = document.createElement("div");
    div.className = "lp-card";
    div.innerHTML = `
  <img src="${lp.image || 'images/no-image.png'}">
  <div class="lp-info">
    <div class="lp-title">${lp.name}</div>
    <div class="lp-artist">${lp.가수 || ""}</div>
    <div class="lp-meta">${lp.category || ""}</div>
  </div>
`;

    div.onclick = () => {
      location.href = `detail.html?id=${lp.id}`;
    };
    list.appendChild(div);
  });
}

search.addEventListener("input", e => {
  const q = e.target.value.toLowerCase();
  render(albums.filter(lp =>
    lp.name.toLowerCase().includes(q) ||
    (lp.가수 || "").toLowerCase().includes(q)
  ));
});