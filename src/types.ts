/** Normalized card data type */
export interface Card {
  /** Unique card code */
  code: string;
  /** Card display name */
  name: string;
  /** Raw card description */
  description: string;
  /** Flavor text or null if none */
  flavourText: string | null;
  /** Artist name */
  artist: string;
  /** Regions or factions for the card */
  region: string[];
  /** Card type, e.g., Unit, Spell */
  type: string;
  /** Rarity, e.g., Common, Rare */
  rarity: string;
  /** Keywords associated with the card */
  keywords: string[];
  /** Absolute URL for full art image or null */
  fullArtUrl: string | null;
}

/** Array of Card objects */
export type Cards = Card[];