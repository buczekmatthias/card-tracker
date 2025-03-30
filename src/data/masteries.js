const masteries = {
  Damage: { cost: 750, description: "Increases card's stat multiplier", researchName: "Damage+", research: "Increase bonus damage", value: "xv", values: [1.4, 1.8, 2.2, 2.6, 3, 3.4, 3.8, 4.2, 4.6, 5] },
  "Attack speed": { cost: 750, description: "Increases card's stat multiplier", researchName: "Attack Speed+", research: "Increase bonus attack speed", value: "xv", values: [1.03, 1.06, 1.09, 1.12, 1.15, 1.18, 1.21, 1.24, 1.27, 1.3] },
  Health: { cost: 750, description: "Increases card's stat multiplier", researchName: "Health+", research: "Increase bonus health", value: "xv", values: [1.2, 1.4, 1.6, 1.8, 2, 2.2, 2.4, 2.6, 2.8, 3] },
  "Health regen": { cost: 750, description: "Increases card's stat multiplier", researchName: "Health Regen+", research: "Increase bonus health regen", value: "xv", values: [1.4, 1.8, 2.2, 2.6, 3, 3.4, 3.8, 4.2, 4.6, 5] },
  Range: { cost: 750, description: "Increases card's stat multiplier", researchName: "Damage / Meter", research: "Increase bonus damage / meter", value: "xv", values: [1.2, 1.4, 1.6, 1.8, 2, 2.2, 2.4, 2.6, 2.8, 3] },
  Cash: { cost: 500, description: "Adds a chance for elites to drop Reroll Dice", researchName: "Elite Farming", research: "Adds a chance for elites to drop Reroll Dice", value: "v%", values: [0.4, 0.8, 1.2, 1.6, 2, 2.4, 2.8, 3.2, 3.6, 4] },
  Coins: { cost: 1250, description: "Increases card's stat multiplier", researchName: "Coins+", research: "Increase bonus coins", value: "xv", values: [1.03, 1.06, 1.09, 1.12, 1.15, 1.18, 1.21, 1.24, 1.27, 1.3] },
  "Slow aura": { cost: 1000, description: "Adds an additional affect to show enemies attack speed", researchName: "Slow Attack", research: "Time delay between enemy attacks", value: "xv", values: [1.05, 1.1, 1.15, 1.2, 1.25, 1.3, 1.35, 1.4, 1.45, 1.5] },
  "Critical chance": { cost: 750, description: "Adds an additional bonus to increase Crit Chance, Super Crit Chance, and Super Crit Factor", researchName: "Super Critical Chance", research: "Bonus to Super Crit Chance", value: "+v%", values: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10] },
  "Enemy balance": { cost: 1000, description: "Adds a chance to double spawn elites", researchName: "Elite Balance", research: "Chance for a double elite spawn to occur", value: "v%", values: [6, 12, 18, 24, 30, 36, 42, 48, 54, 60] },
  "Extra defense": { cost: 1000, description: "Increases card's stat multiplier", researchName: "Extra Defense+", research: "Increase bonus defense percent", value: "+v%", values: [0.7, 1.4, 2.1, 2.8, 3.5, 4.2, 4.9, 5.6, 6.3, 7] },
  Fortress: { cost: 750, description: "Reduces wall rebuild time", researchName: "Fortress Walls", research: "Reduce wall rebuild time", value: "-vs", values: [10, 20, 30, 40, 50, 60, 70, 80, 90, 100] },
  "Free upgrades": { cost: 500, description: "Adds a number of locked stats that are not impacted by free upgrades. This is set before the run starts and cannot by changed during run.", researchName: "Locked Upgrade", research: "Select stats not impacted by free upgrades", value: "v", values: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10] },
  "Inner orb": { cost: 750, description: "Adds a coin bonus to enemies hit by orbs", researchName: "Coin Orb", research: "Enemies hit by orbs drop bonus coins", value: "xv", values: [1.04, 1.08, 1.12, 1.16, 1.2, 1.24, 1.28, 1.32, 1.36, 1.4] },
  "Plasma cannon": { cost: 1250, description: "Plasma cannon fires at elite enemies for reduced damagerch", researchName: "Elite Cannon", research: "Percent of regular plasma cannon damage to elites", value: "v%", values: [5, 10, 15, 20, 25, 30, 35, 40, 45, 50] },
  "Critical coin": { cost: 1000, description: "Adds a chance to drop two coins instead of one", researchName: "Double Coins", research: "Percent chance to drop two coins instead of one", value: "v%", values: [10, 20, 30, 40, 50, 60, 70, 80, 90, 100] },
  "Wave skip": { cost: 1000, description: "Adds a distinct chance to double wave skip. This chance can be stacked with other skips.", researchName: "Double Wave Skip", research: "Percent chance to double wave skip", value: "v%", values: [10, 15, 20, 25, 30, 35, 40, 45, 50, 55] },
  "Intro skip": { cost: 1250, description: "Dramatically increase how many waves Intro Sprint stays active", researchName: "Warp Speed", research: "Increase how many waves Intro Sprint stays active", value: "xv", values: [1.8, 3.6, 5.4, 7.2, 9, 10.8, 12.6, 14.4, 16.2, 18] },
  "Land mine stun": { cost: 1000, description: "Unlocks flashbang which causes enemies stunned by a land mine to have a chance to miss their attacks", researchName: "Flashbang", research: "Chance for enemies stunned by land mines to miss their attacks", value: "v%", values: [2.5, 5.4, 8.1, 10.8, 13.5, 16.2, 18.9, 21.6, 24.3, 27] },
  "Package change": { cost: 1000, description: "Unlocks care package which gives packages a chance to also deliver a common module", researchName: "Care Package", research: "Chance for packages to deliver a common module", value: "v%", values: [0.4, 0.8, 1.2, 1.6, 2, 2.4, 2.8, 3.2, 3.6, 4] },
  "Death ray": { cost: 750, description: "Allows death ray to partially pierce protector's shields", researchName: "Enhanced Ray", research: "Protector shield piercing effect", value: "v%", values: [5, 10, 15, 20, 25, 30, 35, 40, 45, 50] },
  "Energy net": { cost: 750, description: "Adds a damage multiplier to enemies while they are trapped by the net and lingers for 10 seconds after", researchName: "Electrified Net", research: "Energy net damage multiplier", value: "xv", values: [2, 4, 6, 8, 10, 12, 14, 16, 18, 20] },
  "Super tower": { cost: 1000, description: "Causes 35% cards multiplier effect to increase all Ultimate Weapon damage and decreases Super Tower cooldown", researchName: "Ultimate Tower", research: "Reduces Super Tower cooldown time", value: "-vs", values: [3, 6, 9, 12, 15, 18, 21, 24, 27, 30] },
  "Second wind": { cost: 1000, description: "Unlocks a lingering health regen buff when activated which lasts for 400 waves", researchName: "Angel Wings", research: "Increase lingering health regen multiplier", value: "xv", values: [1.9, 2.8, 3.7, 4.6, 5.5, 6.4, 7.3, 8.2, 9.1, 10] },
  "Demon mode": { cost: 1000, description: "Unlocks a lingering damage buff when activated which lasts for 300 waves", researchName: "Demon Revenge", research: "Increase lingering damage multiplier", value: "xv", values: [1.5, 2, 2.5, 3, 3.5, 4, 4.5, 5, 5.5, 6] },
  "Energy shield": { cost: 1000, description: "Energy shield activates a blast that repels all enemies back by a percent of tower max range and destroy all enemy projectiles. The charge times of Rays are reset", researchName: "Repel", research: "Increase the pushback as a percent of tower range", value: "v%", values: [5, 10, 15, 20, 25, 30, 35, 40, 45, 50] },
  "Wave accelerator": { cost: 1000, description: "Increases the rate at which spawn rates accelerate causing more enemies to spawn in earlier waves", researchName: "Spawn Accelerator", research: "Increases the rate at which spawn rates accelerate", value: "+v%", values: [110, 120, 130, 140, 150, 160, 170, 180, 190, 200] },
  Berserker: { cost: 750, description: "Increases the damage cap to x500 for a duration when Death Defy is activated", researchName: "Viking Funeral", research: "Berserker damage cap of x500 for a duration of time", value: "vs", values: [30, 60, 90, 120, 150, 180, 210, 240, 270, 300] },
  "Ultimate crit": { cost: 750, description: "Increases the card's stat multiplier", researchName: "Ultimate Crit+", research: "Increase Ultimate Crit chance", value: "+v%", values: [0.3, 0.7, 1, 1.3, 1.7, 2, 2.3, 2.7, 3, 3.3] },
  Nuke: { cost: 750, description: "Unlocks a lingering attack speed slow which lasts for 300 waves after the nuke", researchName: "Radiation", research: "Slows enemy attack speed for 300 waves", value: "v%", values: [5, 10, 15, 20, 25, 30, 35, 40, 45, 50] },
};

const getTotalCost = () => {
  let total = 0;

  Object.entries(masteries).forEach(([card, content]) => {
    total += content.cost;
  });

  return total;
};

const getSpentStones = (cards) => {
  let total = 0;

  Object.entries(cards).forEach(([name, card]) => {
    if (card.mastery) {
      total += masteries[name].cost;
    }
  });

  return total;
};

const getRequiredStones = (cards) => getTotalCost() - getSpentStones(cards);

const getCardMastery = (cardName) => masteries[cardName];

export { masteries, getSpentStones, getRequiredStones, getCardMastery };
