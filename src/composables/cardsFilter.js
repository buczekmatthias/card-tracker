export default (rarity) => {
  const cards = JSON.parse(localStorage.getItem("cards"));

  return Object.keys(cards).reduce((filtered, key) => {
    if (cards[key].rarity === rarity) {
      filtered[key] = cards[key];
    }

    return filtered;
  }, {});
};
