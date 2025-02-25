export default () => {
  // ============== CARDS FORMAT =============
  const oldFormatCards = JSON.parse(localStorage.getItem("cards"));
  if (typeof oldFormatCards !== "object") {
    const newFormatCards = {};

    Object.keys(oldFormatCards).forEach((k) => {
      oldFormatCards[k].cards.forEach((card) => {
        newFormatCards[card.name] = {
          lvl: card.lvl,
          owned: card.owned,
          mastery: card.masteryUnlocked,
          rarity: oldFormatCards[k].name.toLowerCase(),
        };
      });
    });

    localStorage.setItem("cards", JSON.stringify(newFormatCards));
  }
  // ============== END CARDS FORMAT =============

  // ============== LOADOUT FORMAT =============
  const oldFormatLoadout = JSON.parse(localStorage.getItem("presets"));
  if (typeof oldFormatLoadout[0]?.[0] === "object") {
    const newFormatLoadout = [[], [], [], [], []];

    oldFormatLoadout.forEach((preset, i) => {
      preset.forEach((card) => {
        if (card.used) {
          newFormatLoadout[i].push(card.name);
        }
      });
    });

    localStorage.setItem("presets", JSON.stringify(newFormatLoadout));
  }
  // ============== END LOADOUT FORMAT =============
};
