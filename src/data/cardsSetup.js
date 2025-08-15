export default () => {
  const common = ["Damage", "Attack speed", "Health", "Health regen", "Range", "Cash", "Coins", "Slow aura", "Critical chance", "Enemy balance", "Extra defense", "Fortress"],
    rare = ["Free upgrades", "Inner orb", "Plasma cannon", "Critical coin", "Wave skip", "Intro skip", "Land mine stun", "Package change"],
    epic = ["Death ray", "Energy net", "Super tower", "Second wind", "Demon mode", "Energy shield", "Wave accelerator", "Berserker", "Ultimate crit", "Nuke", "Area of effect"];

  const cards = {};

  common.forEach((c) => {
    cards[c] = {
      lvl: 0,
      owned: 0,
      mastery: false,
      rarity: "common",
    };
  });

  rare.forEach((c) => {
    cards[c] = {
      lvl: 0,
      owned: 0,
      mastery: false,
      rarity: "rare",
    };
  });

  epic.forEach((c) => {
    cards[c] = {
      lvl: 0,
      owned: 0,
      mastery: false,
      rarity: "epic",
    };
  });

  return cards;
};
