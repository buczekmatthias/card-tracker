import { masteries } from "./masteries";

const levels = {
  0: 1,
  1: 3,
  2: 5,
  3: 8,
  4: 12,
  5: 20,
  6: 32,
};

const getRequiredCards = (groups) => {
  let required = 0;

  for (let group of groups) {
    for (let card of group.cards) {
      required += getRequiredToMax(card.lvl, card.owned);
    }
  }

  return required;
};

const getRequiredToMax = (level, owned) => {
  switch (level) {
    case 0:
      return 80;
    case 1:
      return 80 - owned;
    case 2:
      return 80 - 3 - owned;
    case 3:
      return 80 - 8 - owned;
    case 4:
      return 80 - 16 - owned;
    case 5:
      return 80 - 28 - owned;
    case 6:
      return 80 - 48 - owned;
    case 7:
      return 0;
  }
};

const getPercentageOfMax = (required) => (100 - (required / 80) * 100).toFixed(1);

const getCardChance = () => {
  const cards = JSON.parse(localStorage.getItem("cards"));

  // If commons are not maxed
  if (cards[0].cards.some((card) => card.lvl < 7)) return { Common: 80, Rare: 17, Epic: 3 };

  // If rares are not maxed
  if (cards[1].cards.some((card) => card.lvl < 7)) return { Common: 0, Rare: 97, Epic: 3 };

  return { Common: 0, Rare: 0, Epic: 100 };
};

const getGroupData = (group_id) => {
  let cards = JSON.parse(localStorage.getItem("cards"))[group_id].cards;

  let required = 0;

  for (let card of cards) {
    required += getRequiredToMax(card.lvl, card.owned);
  }

  let obtained = cards.length * 80 - required;

  return {
    required: required,
    obtained: obtained,
    gems_required: required * 20,
    gems_spent: obtained * 20,
    percent_finished: (100 - (required / (80 * cards.length)) * 100).toFixed(2),
  };
};

export { levels, getRequiredCards, getRequiredToMax, getPercentageOfMax, getCardChance, getGroupData };
