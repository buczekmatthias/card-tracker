export default () => {
  const cards = localStorage.getItem("cards");
  const cardsObject = JSON.parse(cards);

  if (!cards.includes("masteryUnlocked")) {
    //   cards[2].cards.push({
    //     name: "Test",
    //     lvl: 55,
    //     owned: 21,
    //   });

    cards.forEach((group) => {
      group.cards.forEach((card) => {
        if (!("masteryUnlocked" in card)) {
          card["masteryUnlocked"] = false;
        }
      });
    });
  }

  localStorage.setItem("cards", JSON.stringify(cardsObject));
};
