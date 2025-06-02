// scripts/build-cards.js
import fs from "fs";
import path from "path";
import AdmZip from "adm-zip";
import fetch from "node-fetch";

const SET_URLS = [
  {
    name: "set1",
    url: "https://dd.b.pvp.net/latest/set1-en_us.zip",
  },
  {
    name: "set2",
    url: "https://dd.b.pvp.net/latest/set2-en_us.zip",
  },
  {
    name: "set3",
    url: "https://dd.b.pvp.net/latest/set3-en_us.zip",
  },
  {
    name: "set4",
    url: "https://dd.b.pvp.net/latest/set4-en_us.zip",
  },
  {
    name: "set5",
    url: "https://dd.b.pvp.net/latest/set5-en_us.zip",
  },
  {
    name: "set6",
    url: "https://dd.b.pvp.net/latest/set6-en_us.zip",
  },
  {
    name: "set7",
    url: "https://dd.b.pvp.net/latest/set7-en_us.zip",
  },
  {
    name: "set8",
    url: "https://dd.b.pvp.net/latest/set8-en_us.zip",
  },
];

const TEMP_DIR = "./.tmp";
const DATA_DIR = "./src/data";

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

const buildRefLookup = (arr) =>
  Object.fromEntries(arr.map((item) => [item.nameRef, item.name]));

const downloadAndExtract = async (name, url) => {
  console.log(`Downloading ${name}...`);
  const res = await fetch(url);
  if (!res.ok) {
    throw new Error(`Failed to download ${name}: ${res.statusText}`);
  }
  console.log(`✅ Downloaded ${name} from ${url}`);
  console.log(`Extracting ${name}...`);
  const buffer = await res.arrayBuffer();

  console.log(`✅ Fetched ${name} data, size: ${buffer.byteLength} bytes`);

  console.log(`Saving ${name} to temporary zip file...`);
  const zipPath = path.join(TEMP_DIR, `${name}.zip`);
  fs.writeFileSync(zipPath, Buffer.from(buffer));
  console.log(`✅ Saved ${name} to ${zipPath}`);

  console.log(`Extracting ${name} from zip...`);
  const zip = new AdmZip(zipPath);
  zip.extractAllTo(path.join(TEMP_DIR, name), true);
  console.log(`✅ Extracted ${name} to ${path.join(TEMP_DIR, name)}`);

  fs.unlinkSync(zipPath); // Clean up zip file
  console.log(`🗑️ Deleted temporary zip file: ${zipPath}`);
};

const extractCards = (setName, regionMap, rarityMap, keywordMap) => {
  console.log(`Extracting cards for ${setName}...`);
  const jsonPath = path.join(
    TEMP_DIR,
    setName,
    "en_us/data",
    `${setName}-en_us.json`
  );
  const raw = fs.readFileSync(jsonPath, "utf8");
  const cards = JSON.parse(raw);

  console.log(`✅ Extracted ${cards.length} cards from ${setName}`);

  return cards.map((card) => ({
    code: card.cardCode,
    name: card.name,
    description: card.descriptionRaw,
    artist: card.artistName,
    region: regionMap[card.regionRef] ?? card.regionRef,
    type: card.type,
    rarity: rarityMap[card.rarityRef] ?? card.rarityRef,
    keywords: (card.keywordRefs ?? []).map((k) => keywordMap[k] ?? k),
    fullArtUrl: card.assets?.[0]?.fullAbsolutePath ?? null,
  }));
};

const build = async () => {
  fs.mkdirSync(TEMP_DIR, { recursive: true });
  fs.mkdirSync(DATA_DIR, { recursive: true });

  // Fetch and extract core bundle if not present
  if (fs.existsSync(CORE_BUNDLE.jsonPath)) {
    console.log(`Skipping download for core bundle, file exists.`);
  } else {
    await downloadAndExtract("core-en_us", CORE_BUNDLE.url);
  }

  console.log(`Processing core bundle...`);
  const globalsRaw = fs.readFileSync(CORE_BUNDLE.jsonPath, "utf8");
  const globals = JSON.parse(globalsRaw);

  const regionMap = buildRefLookup(globals.regions);
  const rarityMap = buildRefLookup(globals.rarities);
  const keywordMap = buildRefLookup(globals.keywords);
  console.log(
    `✅ Processed core bundle: ${Object.keys(regionMap).length} regions, ${
      Object.keys(rarityMap).length
    } rarities, ${Object.keys(keywordMap).length} keywords`
  );

  const allCards = [];

  for (const { name, url } of SET_URLS) {
    const jsonPath = path.join(
      TEMP_DIR,
      name,
      "en_us/data",
      `${name}-en_us.json`
    );
    if (fs.existsSync(jsonPath)) {
      console.log(`Skipping download for ${name}, file exists.`);
    } else {
      await downloadAndExtract(name, url);
    }

    console.log(`Processing ${name}...`);

    const cards = extractCards(name, regionMap, rarityMap, keywordMap);
    console.log(`✅ Processed ${cards.length} cards from ${name}`);
    allCards.push(...cards);
  }

  console.log(`Total cards extracted: ${allCards.length}`);
  fs.writeFileSync(
    path.join(DATA_DIR, "cards.json"),
    JSON.stringify(allCards, null, 2)
  );
  console.log(`✅ Built ${allCards.length} cards into data/cards.json`);
};

build();
