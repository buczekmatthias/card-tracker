import loadout from "./loadout";

export default () => {
  if (!localStorage.getItem("presets")) {
    const presets = Array(5).fill(loadout);

    localStorage.setItem("presets", JSON.stringify(presets));
  }
};
