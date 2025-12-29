import fs from "fs";
import fetch from "node-fetch";
import csv from "csv-parser";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const csvPath = path.join(__dirname, "../data/lp.csv");
const jsonPath = path.join(__dirname, "../data/lp.json");

const DISCOGS_TOKEN = "bzBbLBOcNGEcYiPPwnICsthhMXeRdfRoqxxyiEAl";

const rows = [];

fs.createReadStream(csvPath)
  .pipe(csv())
  .on("data", row => {
    // BOM 제거
    const clean = {};
    for (const k in row) {
      clean[k.replace(/^\uFEFF/, "")] = row[k];
    }
    rows.push(clean);
  })
  .on("end", async () => {
    console.log("CSV rows:", rows.length);
    console.log("첫 row:", rows[0]);

    const output = [];

    for (const row of rows) {
      const name = row["name (LP이름)"];
      if (!name) continue;

      // 이미 데이터가 있으면 그대로
      if (row.image && row.가수 && row.수록일자) {
        output.push(row);
        continue;
      }

      const q = encodeURIComponent(name);
      const url = `https://api.discogs.com/database/search?q=${q}&type=release&token=${DISCOGS_TOKEN}`;

      try {
        const res = await fetch(url);
        const json = await res.json();
        const d = json.results?.[0];

        if (!d) {
          output.push(row);
          continue;
        }

        output.push({
          ...row,
          image: row.image || d.cover_image || "",
          가수: row.가수 || d.title.split(" - ")[0] || "",
          수록일자: row.수록일자 || d.year || "",
          국가: row.국가 || d.country || "",
          category: row.category || (d.genre ? d.genre.join("/") : "")
        });

        console.log(`✔ ${name} 보완 완료`);
        await new Promise(r => setTimeout(r, 800));
      } catch (e) {
        console.log(`❌ 실패: ${name}`, e.message);
        output.push(row);
      }
    }

    fs.writeFileSync(jsonPath, JSON.stringify(output, null, 2), "utf-8");
    console.log("🎉 lp.json 생성 완료:", output.length);
  });
