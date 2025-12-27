import { loadCSV } from './loadCSV.js';

const list = document.getElementById('album-list');
const search = document.getElementById('search');

let albums = [];

function render(data) {
  list.innerHTML = '';
  data.forEach(lp => {
    const div = document.createElement('div');
    div.className = 'album-card';
    div.innerHTML = `
      <img src="${lp.image || 'images/no-image.png'}">
      <h3>${lp.name}</h3>
      <p>${lp.artist}</p>
      <span>${lp.category}</span>
    `;
    div.onclick = () => {
      location.href = `detail.html?id=${lp.id}`;
    };
    list.appendChild(div);
  });
}

loadCSV().then(data => {
  albums = data;
  render(albums);
});

search.addEventListener('input', e => {
  const q = e.target.value.toLowerCase();
  render(
    albums.filter(lp =>
      lp.name.toLowerCase().includes(q) ||
      lp.artist.toLowerCase().includes(q)
    )
  );
});