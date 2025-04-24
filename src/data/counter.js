import cardsFilter from "@/composables/cardsFilter";
import { cards } from "@/data/cards";

const getCardsCounts = () => ({
  common: Object.keys(cardsFilter("common")).length,
  rare: Object.keys(cardsFilter("rare")).length,
  epic: Object.keys(cardsFilter("epic")).length,
  total: cards.length,
});

export { getCardsCounts };
