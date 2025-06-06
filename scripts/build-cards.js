import fs from "fs";
import path from "path";
import AdmZip from "adm-zip";
import { fileURLToPath } from "url";

// Support __dirname in ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const SET_URLS = [
  { name: "set1", url: "https://dd.b.pvp.net/latest/set1-en_us.zip" },
  { name: "set2", url: "https://dd.b.pvp.net/latest/set2-en_us.zip" },
  { name: "set3", url: "https://dd.b.pvp.net/latest/set3-en_us.zip" },
  { name: "set4", url: "https://dd.b.pvp.net/latest/set4-en_us.zip" },
  { name: "set5", url: "https://dd.b.pvp.net/latest/set5-en_us.zip" },
  { name: "set6", url: "https://dd.b.pvp.net/latest/set6-en_us.zip" },
  { name: "set7", url: "https://dd.b.pvp.net/latest/set7-en_us.zip" },
  { name: "set8", url: "https://dd.b.pvp.net/latest/set8-en_us.zip" },
];

const TEMP_DIR = path.join(__dirname, "../.tmp");
const DATA_DIR = path.join(__dirname, "../src/data");

const CORE_BUNDLE = {
  name: "core",
  url: "https://dd.b.pvp.net/latest/core-en_us.zip",
  jsonPath: path.join(
    TEMP_DIR,
    "core-en_us",
    "en_us/data",
    "globals-en_us.json"
  ),
};

// Helper to download and extract ZIPs
const downloadAndExtract = async (name, url) => {
  console.log(`📥 Downloading ${name}...`);
  const res = await fetch(url);
  const buffer = await res.arrayBuffer();
  const zipPath = path.join(TEMP_DIR, `${name}.zip`);
  fs.writeFileSync(zipPath, Buffer.from(buffer));
  const zip = new AdmZip(zipPath);
  zip.extractAllTo(path.join(TEMP_DIR, name), true);
  console.log(`📦 Extracted ${name}`);
};

// Helper to convert nameRefs to name
const buildRefLookup = (arr) =>
  Object.fromEntries(arr.map((item) => [item.nameRef, item.name]));

// Extract and normalize cards from a set
const extractCards = (setName, regionMap, rarityMap, keywordMap) => {
  const jsonPath = path.join(
    TEMP_DIR,
    setName,
    "en_us/data",
    `${setName}-en_us.json`
  );
  const raw = fs.readFileSync(jsonPath, "utf8");
  const cards = JSON.parse(raw);

  return cards.map((card) => ({
    code: card.cardCode,
    name: card.name,
    description: card.descriptionRaw,
    flavourText: card.flavorText,
    artist: card.artistName,
    region: (card.regionRefs ?? []).map((r) => regionMap[r] ?? r),
    type: card.type,
    rarity: card.rarityRef,
    keywords: (card.keywordRefs ?? []).map((k) => keywordMap[k] ?? k),
    fullArtUrl: card.assets?.[0]?.fullAbsolutePath ?? null,
    associatedCards: card?.associatedCardRefs ?? [],
  }));
};

const build = async () => {
  fs.mkdirSync(TEMP_DIR, { recursive: true });
  fs.mkdirSync(DATA_DIR, { recursive: true });

  // Download core bundle if needed
  if (fs.existsSync(CORE_BUNDLE.jsonPath)) {
    console.log("✅ Core bundle already downloaded.");
  } else {
    await downloadAndExtract("core-en_us", CORE_BUNDLE.url);
  }

  // Load and index global vocab
  const globalsRaw = fs.readFileSync(CORE_BUNDLE.jsonPath, "utf8");
  const globals = JSON.parse(globalsRaw);

  const regionMap = buildRefLookup(globals.regions);
  const rarityMap = buildRefLookup(globals.rarities);
  const keywordMap = buildRefLookup(globals.keywords);

  const allCards = [];

  for (const { name, url } of SET_URLS) {
    const jsonPath = path.join(
      TEMP_DIR,
      name,
      "en_us/data",
      `${name}-en_us.json`
    );
    if (fs.existsSync(jsonPath)) {
      console.log(`⏭️  Skipping ${name}, already downloaded`);
    } else {
      await downloadAndExtract(name, url);
    }

    console.log(`🔍 Extracting cards from ${name}...`);
    const cards = extractCards(name, regionMap, rarityMap, keywordMap);
    allCards.push(...cards);
  }

  fs.writeFileSync(
    path.join(DATA_DIR, "cards.json"),
    JSON.stringify(allCards, null, 2)
  );
  console.log(`🎉 Built ${allCards.length} cards into data/cards.json`);
};

build();
