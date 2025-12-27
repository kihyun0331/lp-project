import { loadCSV } from './loadCSV.js';

const params = new URLSearchParams(location.search);
const id = params.get('id');
const box = document.getElementById('detail');

loadCSV().then(data => {
  const lp = data.find(d => d.id === id);
  if (!lp) return;

  box.innerHTML = `
    <h2>${lp.name}</h2>
    <img src="${lp.image || 'images/no-image.png'}">
    <p><b>가수:</b> ${lp.artist}</p>
    <p><b>장르:</b> ${lp.category}</p>
    <p><b>국가:</b> ${lp.country}</p>
    <p><b>보관 위치:</b> ${lp.location}</p>

    <h3>Side A</h3>
    <pre>${lp.side1 || ''}</pre>

    <h3>Side B</h3>
    <pre>${lp.side2 || ''}</pre>

    <p>${lp.memo || ''}</p>
  `;
});