export default () => {
  const cards = localStorage.getItem("cards");
  const cardsObject = JSON.parse(cards);

  //  cardsObject[""] = {
  //    lvl: 0,
  //    owned: 0,
  //    mastery: false,
  //    rarity: ""
  // }

  if (!Object.keys(cardsObject).includes("Area of effect")) {
    cardsObject["Area of effect"] = {
      lvl: 0,
      owned: 0,
      mastery: false,
      rarity: "epic",
    };
  }

  localStorage.setItem("cards", JSON.stringify(cardsObject));
};
