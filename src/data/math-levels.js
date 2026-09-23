const item = (name, art, answer) => ({ name, art, answer });

const LEVELS = [
  {
    title: "Parts of Plants We Eat",
    instruction: "Sort each food by the plant part we eat.",
    showNames: true,
    maxOnBelt: 3,
    beltTravelRate: 0.07,
    bins: [
      { id: "fruits", label: "Fruits", art: "mango" },
      { id: "leaves", label: "Leaves", art: "cabbage" },
      { id: "stems", label: "Stems", art: "potato" },
      { id: "roots", label: "Roots", art: "carrot" },
      { id: "seeds", label: "Seeds", art: "pulses" },
    ],
    items: [
      item("Cabbage", "cabbage", "leaves"), item("Spinach", "spinach", "leaves"),
      item("Mango", "mango", "fruits"), item("Apple", "apple", "fruits"),
      item("Potato", "potato", "stems"), item("Ginger", "ginger", "stems"),
      item("Carrot", "carrot", "roots"), item("Beetroot", "beetroot", "roots"),
      item("Pulses", "pulses", "seeds"), item("Dry fruits", "dryfruits", "seeds"),
    ],
  },
  {
    title: "Plants or Animals?",
    instruction: "Sort each food by where it comes from.",
    showNames: true,
    maxOnBelt: 4,
    beltTravelRate: 0.08,
    bins: [
      { id: "plants", label: "Plants", art: "mango" },
      { id: "animals", label: "Animals", art: "egg" },
    ],
    items: [
      item("Mango", "mango", "plants"), item("Potato", "potato", "plants"),
      item("Radish", "radish", "plants"), item("Onion", "onion", "plants"),
      item("Grains", "grains", "plants"), item("Spinach", "spinach", "plants"),
      item("Egg", "egg", "animals"), item("Milk", "milk", "animals"),
      item("Chicken", "chicken", "animals"), item("Honey", "honey", "animals"),
    ],
  },
];

function buildTutorial(level, levelIndex) {
  const examples = level.bins.map((bin) => level.items.find((entry) => entry.answer === bin.id)).filter(Boolean);
  const demonstration = examples[0] ?? level.items[0];
  const interactive = examples[1] ?? level.items[1] ?? demonstration;
  const labelFor = (entry) => level.bins.find((bin) => bin.id === entry.answer)?.label ?? entry.answer;
  return {
    concept: level.title,
    intro: level.instruction,
    mandatory: levelIndex === 0,
    steps: [
      { type: "concept", instruction: level.instruction },
      { type: "demonstration", objectName: demonstration.name, instruction: `${demonstration.name} → ${labelFor(demonstration)}` },
      { type: "interactive", objectName: interactive.name, instruction: `Sort ${interactive.name}!`, allowHints: true },
      { type: "completion", instruction: "You're ready!" },
    ],
  };
}

export const MATH_LEVELS = LEVELS.map((level, index) => ({
  ...level,
  goal: level.items.length,
  requiredCorrectPerItem: 1,
  assetSet: `level${index + 1}`,
  bins: level.bins.map((entry) => ({ ...entry, assetSet: `level${index + 1}` })),
  items: level.items.map((entry) => ({ ...entry, assetSet: `level${index + 1}` })),
  tutorial: buildTutorial(level, index),
}));

export const getLevel = (index) => MATH_LEVELS[index];
