import { gemsSpentSoFar } from "@/data/cardSlots";
import { levels, getRequiredCards, getGroupData, getObtainedCards } from "@/data/cardLevels";

import { cards } from "@/data/cards";
import { getSpentStones, getRequiredStones } from "@/data/masteries";

import capitalize from "@/composables/capitalize";
import cardsFilter from "@/composables/cardsFilter";

const getSlotsExportString = () => `=== Slots ===\n${localStorage.getItem("ownedSlots")} slots owned | ${gemsSpentSoFar(localStorage.getItem("ownedSlots") || 1).toLocaleString()} gems spent`;

const getCardsDataExportString = (storageCards, isNotLast) => {
  let str = "";

  str += "==== Cards ====\n";

  const rarities = ["common", "rare", "epic"];

  rarities.forEach((r) => {
    str += `== ${capitalize(r)} ==\n`;

    Object.entries(cardsFilter(r)).forEach(([name, content]) => {
      str += `${name} - ${content.lvl}*`;
      str += [0, 7].includes(content.lvl) ? "" : ` - ${content.owned}/${levels[content.lvl]}`;
      str += content.lvl === 7 && content.mastery ? " - Mastery unlocked" : "";
      str += "\n";
    });

    str += "\n";
  });

  if (!isNotLast) {
    str = str.slice(0, -2);
  }

  return str;
};

const getTrackerExportString = (storageCards) => {
  const required_cards = getRequiredCards(storageCards);
  const obtained_cards = getObtainedCards(Object.keys(cards).length, required_cards);
  const commons = getGroupData("common");
  const rares = getGroupData("rare");
  const epics = getGroupData("epic");

  let str = "";

  str += "=== Cards tracker ===\n";
  str += "= Cards =\n";
  str += `${obtained_cards.toLocaleString()} cards obtained, ${required_cards.toLocaleString()} cards left\n`;
  str += `${((obtained_cards + required_cards) * 20 - required_cards * 20).toLocaleString()} gems spent, ${(required_cards * 20).toLocaleString()} gems left\n`;
  str += `${commons.obtained} (${commons.percent_finished}%) commons obtained | ${commons.gems_required.toLocaleString()} gems left\n`;
  str += `${rares.obtained} (${rares.percent_finished}%) rares obtained | ${rares.gems_required.toLocaleString()} gems left\n`;
  str += `${epics.obtained} (${epics.percent_finished}%) epics obtained | ${epics.gems_required.toLocaleString()} gems left\n`;
  str += "\n= Masteries =\n";
  str += `${getSpentStones(storageCards)} stones spent, ${getRequiredStones(storageCards)} stones required`;

  return str;
};

export { getSlotsExportString, getCardsDataExportString, getTrackerExportString };
