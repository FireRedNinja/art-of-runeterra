import set1 from "./set1-en_us.json";
import set2 from "./set2-en_us.json";
import set3 from "./set3-en_us.json";
import set4 from "./set4-en_us.json";
import set5 from "./set5-en_us.json";
import set6 from "./set6-en_us.json";
import globals from "./globals-en_us.json";
import regions from "./regions.json";

const regionsData = regions.regions;
const data = [...set1, ...set2, ...set3, ...set4, ...set5, ...set6];
const cardCodes = data.map((card) => card.cardCode);
const getCardById = (id: any) => data.find((card) => card.cardCode === id);
const getCardsByRegion = (regionRef: any) =>
  data.filter((card) => card.regionRefs.includes(regionRef));
const getRegionByRegionRef = (regionRef: any) =>
  regionsData.find((region) => regionRef === region.nameRef);

export {
  data,
  globals,
  cardCodes,
  getCardById,
  getCardsByRegion,
  getRegionByRegionRef,
  regionsData,
};
