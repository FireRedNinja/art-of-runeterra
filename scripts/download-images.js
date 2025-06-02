import fs from "fs";
import path from "path";
import fetch from "node-fetch"; // or native fetch if using Node 18+
import { fileURLToPath } from "url";

// __dirname shim for ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const CARDS_PATH = path.join(__dirname, "../data/cards.json");
const OUTPUT_DIR = path.join(__dirname, "../public/images/cards");

const downloadImage = async (url, destPath) => {
  try {
    const res = await fetch(url);
    if (!res.ok) throw new Error(`Failed to fetch: ${url}`);
    const buffer = await res.buffer();
    fs.writeFileSync(destPath, buffer);
    console.log(`✅ Saved ${path.basename(destPath)}`);
  } catch (err) {
    console.warn(`⚠️ Error downloading ${url}: ${err.message}`);
  }
};

const run = async () => {
  if (!fs.existsSync(OUTPUT_DIR)) {
    fs.mkdirSync(OUTPUT_DIR, { recursive: true });
  }

  const cards = JSON.parse(fs.readFileSync(CARDS_PATH, "utf-8"));

  for (const card of cards) {
    if (!card.fullArtUrl) continue;

    const ext = path.extname(card.fullArtUrl).split("?")[0] || ".png";
    const filename = `${card.code}${ext}`;
    const dest = path.join(OUTPUT_DIR, filename);

    if (fs.existsSync(dest)) {
      console.log(`⏭️  Skipping ${filename}, already exists`);
      continue;
    }

    await downloadImage(card.fullArtUrl, dest);
  }

  console.log("🎉 Done downloading images!");
};

run();
