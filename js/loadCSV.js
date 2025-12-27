export async function loadCSV() {
  const res = await fetch('./data/lp.csv');
  const text = await res.text();

  const lines = text.split('\n');
  const headers = lines[0].split(',');
  const data = [];

  for (let i = 1; i < lines.length; i++) {
    if (!lines[i].trim()) continue;

    const cols = lines[i].split(/,(?=(?:[^"]*"[^"]*")*[^"]*$)/);

    data.push({
      id: cols[0],
      name: cols[1],
      image: cols[2],
      category: cols[3],
      date: cols[4],
      country: cols[5],
      location: cols[6],
      artist: cols[7],
      side1: cols[8],
      side2: cols[9],
      memo: cols[10],
      note: cols[11],
    });
  }

  return data;
}