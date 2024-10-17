export default () => {
  const cards = JSON.parse(localStorage.getItem("cards"));

  //   cards[2].cards.push({
  //     name: "Test",
  //     lvl: 55,
  //     owned: 21,
  //   });

  cards.forEach((group) => {
    group.cards.forEach((card) => {
      card["masteryUnlocked"] = false;
    });
  });

  localStorage.setItem("cards", JSON.stringify(cards));
};
