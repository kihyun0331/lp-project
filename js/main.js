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
    div.className = "album-card";
    div.innerHTML = `
      <img src="${lp.image || 'images/no-image.png'}">
      <h3>${lp.name}</h3>
      <p>${lp.가수 || ""}</p>
      <span>${lp.category || ""}</span>
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