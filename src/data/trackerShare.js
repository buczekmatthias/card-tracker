import { gemsSpentSoFar } from "@/data/cardSlots";
import { levels, getRequiredCards, getGroupData } from "@/data/cardLevels";

import cards from "./cards.json";
import { getSpentStones, getRequiredStones } from "./masteries";

const getSlotsExportString = () => `=== Slots ===\n${localStorage.getItem("ownedSlots")} slots owned | ${gemsSpentSoFar(localStorage.getItem("ownedSlots") || 1).toLocaleString()} gems spent`;

const getCardsDataExportString = (storageCards, isNotLast) => {
  let str = "";

  str += "=== Cards ===\n";

  storageCards.forEach((group, i) => {
    str += `= ${group.name} =\n`;

    group.cards.forEach((card) => {
      str += `${card.name} - ${card.lvl}* - `;
      str += card.lvl === 0 ? "Locked" : card.lvl === 7 ? "Maxed" : `${card.owned}/${levels[card.lvl]}`;
      str += ` - Mastery ${card.masteryUnlocked ? "unlocked" : "locked"}`;
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
  const obtained_cards = cards.length * 80 - required_cards;
  const commons = getGroupData(0);
  const rares = getGroupData(1);
  const epics = getGroupData(2);

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
