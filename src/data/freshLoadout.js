export default () => {
  if (!localStorage.getItem("presets")) {
    const presets = Array(5).fill([]);

    localStorage.setItem("presets", JSON.stringify(presets));
  }
};
