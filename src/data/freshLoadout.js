import loadout from "./loadout";

export default () => {
  const presets = Array(5).fill(loadout);

  localStorage.setItem("presets", JSON.stringify(presets));
};
