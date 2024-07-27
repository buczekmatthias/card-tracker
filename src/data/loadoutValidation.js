import cards from "./cards.json";

export default (value) => {
  if (value.length > 5) {
    let arr = Array(4).fill([]);

    arr.unshift(validatePreset(value));

    return arr;
  }

  for (let preset of value) {
    preset = validatePreset(preset);
  }

  if (value.length < 5) {
    for (let i = value.length; i < 5; i++) {
      value.push([]);
    }
  }

  return value;
};

const validatePreset = (preset) => {
  const presetCards = preset.map((set) => set.name);

  if (JSON.stringify(presetCards.sort()) === JSON.stringify(cards.sort())) {
    preset.map((set) => {
      if (!("used" in set)) {
        set.used = false;
      }
    });
    console.log(preset);

    return preset;
  }

  // TODO: Handle not same arrays

  //   return preset;
};
