export default () => {
  const cards = localStorage.getItem("cards");
  const cardsObject = JSON.parse(cards);

  //  cardsObject[""] = {
  //    lvl: 0,
  //    owned: 0,
  //    mastery: false,
  //    rarity: ""
  //  }
  //
  // if (!cards.includes("masteryUnlocked")) {
  //   cards.forEach((group) => {
  //    group.cards.forEach((card) => {
  //      if (!("masteryUnlocked" in card)) {
  //         card["masteryUnlocked"] = false;
  //      }
  //    });
  //  });
  // }

  localStorage.setItem("cards", JSON.stringify(cardsObject));
};
