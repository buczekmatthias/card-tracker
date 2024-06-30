export default () => {
  const cards = [
    {
      name: "Common",
      cards: [
        {
          name: "Damage",
          lvl: 0,
          owned: 0,
        },
        {
          name: "Attack speed",
          lvl: 0,
          owned: 0,
        },
        {
          name: "Health",
          lvl: 0,
          owned: 0,
        },
        {
          name: "Health regen",
          lvl: 0,
          owned: 0,
        },
        {
          name: "Range",
          lvl: 0,
          owned: 0,
        },
        {
          name: "Cash",
          lvl: 0,
          owned: 0,
        },
        {
          name: "Coins",
          lvl: 0,
          owned: 0,
        },
        {
          name: "Slow aura",
          lvl: 0,
          owned: 0,
        },
        {
          name: "Critical chance",
          lvl: 0,
          owned: 0,
        },
        {
          name: "Enemy balance",
          lvl: 0,
          owned: 0,
        },
        {
          name: "Extra defense",
          lvl: 0,
          owned: 0,
        },
        {
          name: "Fortress",
          lvl: 0,
          owned: 0,
        },
      ],
    },
    {
      name: "Rare",
      cards: [
        {
          name: "Free upgrades",
          lvl: 0,
          owned: 0,
        },
        {
          name: "Inner orb",
          lvl: 0,
          owned: 0,
        },
        {
          name: "Plasma cannon",
          lvl: 0,
          owned: 0,
        },
        {
          name: "Critical coin",
          lvl: 0,
          owned: 0,
        },
        {
          name: "Wave skip",
          lvl: 0,
          owned: 0,
        },
        {
          name: "Intro skip",
          lvl: 0,
          owned: 0,
        },
        {
          name: "Land mine stun",
          lvl: 0,
          owned: 0,
        },
        {
          name: "Package change",
          lvl: 0,
          owned: 0,
        },
      ],
    },
    {
      name: "Epic",
      cards: [
        {
          name: "Death ray",
          lvl: 0,
          owned: 0,
        },
        {
          name: "Energy net",
          lvl: 0,
          owned: 0,
        },
        {
          name: "Super tower",
          lvl: 0,
          owned: 0,
        },
        {
          name: "Second wind",
          lvl: 0,
          owned: 0,
        },
        {
          name: "Demon mode",
          lvl: 0,
          owned: 0,
        },
        {
          name: "Energy shield",
          lvl: 0,
          owned: 0,
        },
        {
          name: "Wave accelerator",
          lvl: 0,
          owned: 0,
        },
        {
          name: "Berserker",
          lvl: 0,
          owned: 0,
        },
        {
          name: "Ultimate crit",
          lvl: 0,
          owned: 0,
        },
        {
          name: "Nuke",
          lvl: 0,
          owned: 0,
        },
      ],
    },
  ];

  localStorage.setItem("cards", JSON.stringify(cards));

  localStorage.setItem("slots", 19);

  localStorage.setItem("ownedSlots", 1);

  localStorage.setItem("targetSlot", 19);
};
