export default () => {
  const presets = JSON.parse(localStorage.getItem("presets"));

  //   presets[0].push({
  //     name: "Test",
  //     used: false,
  //   });

  localStorage.setItem("presets", JSON.stringify(presets));
};
