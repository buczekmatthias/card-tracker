import getCards from "./cardsSetup";

export default () => {
  if (!localStorage.getItem("cards")) {
    localStorage.setItem("cards", JSON.stringify(getCards()));
  }

  if (!localStorage.getItem("ownedSlots")) {
    localStorage.setItem("ownedSlots", 1);
  }

  if (!localStorage.getItem("vaultSlots")) {
    localStorage.setItem("vaultSlots", 0);
  }
};
