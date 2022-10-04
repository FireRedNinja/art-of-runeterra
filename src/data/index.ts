import set1 from "./set1-en_us.json";
import set2 from "./set2-en_us.json";
import set3 from "./set3-en_us.json";
import set4 from "./set4-en_us.json";
import set5 from "./set5-en_us.json";
import set6 from "./set6-en_us.json";
import globals from './globals-en_us.json';

const setMap = {
  "Set1": set1,
  "Set2": set2,
  "Set3": set3,
  "Set4": set4,
  "Set5": set5,
  "Set6": set6,
}

const data = [...set1, ...set2, ...set3, ...set4, ...set5, ...set6]
const cardCodes = data.map(card => card.cardCode)
const getCardById = (id) => data.find(card => card.cardCode === id)
const getCardsBySet = (set) => setMap[set]
const getSetById = (id => globals.sets.find(set => set.nameRef === id))


export { data, globals, cardCodes, getCardById, getSetById, getCardsBySet };
