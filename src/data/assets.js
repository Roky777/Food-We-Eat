const foodArt = (path) => new URL(`../../assets/GRADE 3/Food We Eat/${path}`, import.meta.url).href;
const sharedArt = (path) => new URL(`../../assets/${path}`, import.meta.url).href;

const levelArt = {
  level1: {
    cabbage: foodArt("LEVEL 1/cabbage (1) (1).png"), spinach: foodArt("LEVEL 1/spinach (1).png"),
    mango: foodArt("LEVEL 1/mango (1).png"), apple: foodArt("LEVEL 1/apple (1).png"),
    potato: foodArt("LEVEL 1/potato (1).png"), ginger: foodArt("LEVEL 1/GINGER (1).png"),
    carrot: foodArt("LEVEL 1/carrot (1) (1).png"), beetroot: foodArt("LEVEL 1/beetroot (1).png"),
    pulses: foodArt("LEVEL 1/pulses.png"), dryfruits: foodArt("LEVEL 1/dry_fruits (1).png"),
  },
  level2: {
    mango: foodArt("level 2/mango (1).png"), potato: foodArt("level 2/potato (1).png"),
    radish: foodArt("level 2/raddish (1).png"), onion: foodArt("level 2/onion (1).png"),
    grains: foodArt("level 2/grains (1).png"), spinach: foodArt("level 2/spinach (1).png"),
    egg: foodArt("level 2/eggs (1).png"), milk: sharedArt("GRADE 4/science game/level 1/milk (1).png"),
    chicken: foodArt("level 2/CHICKEN.png"), honey: foodArt("level 2/honey (1).png"),
  },
};

export function resolveMathArt(artId, assetSet) {
  return levelArt?.[assetSet]?.[artId] ?? levelArt.level1.mango;
}

const blankBin = "assets/ui/sorting-bin-blank.png";

export const assets = {
  characters: { idle: "assets/characters/idle.png", presentation: "assets/characters/final_presentation_clean.png" },
  backgrounds: {},
  items: { math: levelArt.level1, mathByLevel: levelArt },
  ui: {
    conveyorRims: "assets/ui/conveyor-rims.png",
    conveyorFrame: "assets/ui/conveyor-frame.png",
    conveyorTrackMask: "assets/ui/conveyor-track.png",
    sortingBins: Object.fromEntries(["fruits", "leaves", "stems", "roots", "seeds", "plants", "animals"].map((id) => [id, blankBin])),
    boxLeaves: "assets/ui/ui-box-leaves.png",
  },
  audio: {},
  fx: {},
};

const imageRequests = new Map();

export function preloadImage(src) {
  if (!src) return Promise.resolve();
  if (imageRequests.has(src)) return imageRequests.get(src);
  const request = new Promise((resolve) => {
    const image = new Image();
    image.decoding = "async";
    image.onload = async () => {
      await image.decode?.().catch(() => {});
      resolve({ src, loaded: true });
    };
    image.onerror = () => resolve({ src, loaded: false });
    image.src = src;
  });
  imageRequests.set(src, request);
  return request;
}

export function hydrateDeferredImages(root = document) {
  const images = [...root.querySelectorAll("img[data-src]")];
  return Promise.all(images.map((image) => {
    const src = image.dataset.src;
    delete image.dataset.src;
    image.src = src;
    return image.decode?.().catch(() => {}) ?? preloadImage(src);
  }));
}

export function preloadLevelAssets(level) {
  if (!level) return Promise.resolve([]);
  const urls = new Set([
    assets.ui.boxLeaves,
    ...level.items.map((entry) => resolveMathArt(entry.art, entry.assetSet)),
    ...level.bins.flatMap((entry) => [resolveMathArt(entry.art, entry.assetSet), assets.ui.sortingBins[entry.id] ?? blankBin]),
  ]);
  return Promise.all([...urls].map(preloadImage));
}
