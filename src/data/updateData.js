export default () => {
  const cards = JSON.parse(localStorage.getItem("cards"));

  //   cards[2].cards.push({
  //     name: "Test",
  //     lvl: 55,
  //     owned: 21,
  //   });

  localStorage.setItem("cards", JSON.stringify(cards));

  localStorage.setItem("slots", 19);
};
