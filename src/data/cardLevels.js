import cardsFilter from "@/composables/cardsFilter";

const MAX_LEVEL_CARDS_COUNT = 80;

const levels = {
  0: 1,
  1: 3,
  2: 5,
  3: 8,
  4: 12,
  5: 20,
  6: 32,
};

const getRequiredCards = (cards) => {
  let required = 0;

  Object.values(cards).forEach((c) => (required += getRequiredToMax(c)));

  return required;
};

const getRequiredToMax = (card) => {
  switch (card.lvl) {
    case 0:
      return MAX_LEVEL_CARDS_COUNT;
    case 1:
      return MAX_LEVEL_CARDS_COUNT - card.owned;
    case 2:
      return MAX_LEVEL_CARDS_COUNT - 3 - card.owned;
    case 3:
      return MAX_LEVEL_CARDS_COUNT - 8 - card.owned;
    case 4:
      return MAX_LEVEL_CARDS_COUNT - 16 - card.owned;
    case 5:
      return MAX_LEVEL_CARDS_COUNT - 28 - card.owned;
    case 6:
      return MAX_LEVEL_CARDS_COUNT - 48 - card.owned;
    case 7:
      return 0;
  }
};

const getCardProgress = (card) => MAX_LEVEL_CARDS_COUNT - getRequiredToMax(card);

const getObtainedCards = (cardsAmount, cardsLeft) => cardsAmount * MAX_LEVEL_CARDS_COUNT - cardsLeft;

const getPercentageOfMax = (required) => (100 - (required / MAX_LEVEL_CARDS_COUNT) * 100).toFixed(1);

const getCardChance = () => {
  // If commons are not maxed
  if (Object.values(cardsFilter("common")).some((card) => card.lvl < 7)) return { Common: 80, Rare: 17, Epic: 3 };

  // If rares are not maxed
  if (Object.values(cardsFilter("rare")).some((card) => card.lvl < 7)) return { Common: 0, Rare: 97, Epic: 3 };

  return { Common: 0, Rare: 0, Epic: 100 };
};

const getGroupData = (rarity) => {
  let cards = cardsFilter(rarity);

  let required = 0;

  Object.values(cards).forEach((c) => (required += getRequiredToMax(c)));

  let obtained = getObtainedCards(Object.keys(cards).length, required);

  return {
    required: required,
    obtained: obtained,
    gems_required: required * 20,
    gems_spent: obtained * 20,
    percent_finished: (100 - (required / (MAX_LEVEL_CARDS_COUNT * Object.keys(cards).length)) * 100).toFixed(2),
  };
};

export { levels, MAX_LEVEL_CARDS_COUNT, getCardProgress, getRequiredCards, getRequiredToMax, getObtainedCards, getPercentageOfMax, getCardChance, getGroupData };
