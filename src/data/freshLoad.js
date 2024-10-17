import cards from "./cards";

export default () => {
  localStorage.setItem("cards", JSON.stringify(cards));

  localStorage.setItem("ownedSlots", 1);

  localStorage.setItem("targetSlot", 2);
};
