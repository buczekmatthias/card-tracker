const masteries = {
  Damage: { cost: 750, description: "Increases card's stat multiplier and unlocks Damage mastery research", researchName: "Damage+", research: "Increase bonus damage" },
  "Attack speed": { cost: 750, description: "Increases card's stat multiplier and unlocks Attack Speed mastery research", researchName: "Attack Speed+", research: "Increase bonus attack speed" },
  Health: { cost: 750, description: "Increases card's stat multiplier and unlocks Health mastery research", researchName: "Health+", research: "Increase bonus health" },
  "Health regen": { cost: 750, description: "Increases card's stat multiplier and unlocks Health Regen mastery research", researchName: "Health Regen+", research: "Increase bonus health regen" },
  Range: { cost: 750, description: "Increases card's stat multiplier and unlocks Damage / Meter mastery research", researchName: "Damage / Meter", research: "Increase bonus damage / meter" },
  Cash: { cost: 500, description: "Adds a chance for elites to drop Reroll Dice", researchName: "Elite Farming", research: "Adds a chance for elites to drop Reroll Dice" },
  Coins: { cost: 1250, description: "Increases card's stat multiplier and unlocks Coin mastery research", researchName: "Coins+", research: "Increase bonus coins" },
  "Slow aura": { cost: 1000, description: "Adds an additional affect to show enemies attack speed and unlocks Slow Attack mastery research", researchName: "Slow Attack", research: "Time delay between enemy attacks" },
  "Critical chance": { cost: 750, description: "Adds an additional bonus to increase Crit Chance, Super Crit Chance, and Super Crit Factor and unlocks Super Critical Chance mastery research", researchName: "Super Critical Chance", research: "Bonus to Super Crit Chance" },
  "Enemy balance": { cost: 1000, description: "Adds a chance to double spawn elites and locks Elite Balance mastery research", researchName: "Elite Balance", research: "Chance for a double elite spawn to occur" },
  "Extra defense": { cost: 1000, description: "Increases card's stat multiplier and unlocks Extra Defense mastery research", researchName: "Extra Defense+", research: "Increase bonus defense percent" },
  Fortress: { cost: 750, description: "Reduces wall rebuild time and unlocks Fortress Walls mastery research", researchName: "Fortress Walls", research: "Reduce wall rebuild time" },
  "Free upgrades": { cost: 500, description: "Adds a number of locked stats that are not impacted by free upgrades and unlocks Locked Upgrade research. This is set before the run starts and cannot by changed during run.", researchName: "Locked Upgrade", research: "Select stats not impacted by free upgrades" },
  "Inner orb": { cost: 750, description: "Adds a coin bonus to enemies hit by orbs and unlocks Coin Orb research", researchName: "Coin Orb", research: "Enemies hit by orbs drop bonus coins" },
  "Plasma cannon": { cost: 1250, description: "Plasma cannon fires at elite enemies for reduced damage and unlocks Elite Cannon mastery research", researchName: "Elite Cannon", research: "Percent of regular plasma cannon damage to elites" },
  "Critical coin": { cost: 1000, description: "Adds a chance to drop two coins instead of one and unlocks Double Coins mastery research", researchName: "Double Coins", research: "Percent chance to drop two coins instead of one" },
  "Wave skip": { cost: 1000, description: "Adds a distinct chance to double wave skip and unlocks Double Wave Skip mastery research. This chance can be stacked with other skips.", researchName: "Double Wave Skip", research: "Percent chance to double wave skip" },
  "Intro skip": { cost: 1250, description: "Dramatically increase how many waves Intro Sprint stays active and unlocks Warp Speed mastery research", researchName: "Warp Speed", research: "Increase how many waves Intro Sprint stays active" },
  "Land mine stun": { cost: 1000, description: "Unlocks flashbang which causes enemies stunned by a land mine to have a chance to miss their attacks and unlocks Flashbang mastery research", researchName: "Flashbang", research: "Chance for enemies stunned by land mines to miss their attacks" },
  "Package change": { cost: 1000, description: "Unlocks care package which gives packages a chance to also deliver a common module and unlocks Care Package mastery research", researchName: "Care Package", research: "Chance for packages to deliver a common module" },
  "Death ray": { cost: 750, description: "Allows death ray to partially pierce protector's shields and unlocks Enhanced Ray mastery research", researchName: "Enhanced Ray", research: "Protector shield piercing effect" },
  "Energy net": { cost: 750, description: "Adds a damage multiplier to enemies while they are trapped by the net and lingers for 10 seconds after and unlock Electrified Net mastery research", researchName: "Electrified Net", research: "Energy net damage multiplier" },
  "Super tower": { cost: 1000, description: "Causes 35% cards multiplier effect to increase all Ultimate Weapon damage and decreases Super Tower cooldown and unlocks Ultimate Tower mastery research", researchName: "Ultimate Tower", research: "Reduces Super Tower cooldown time" },
  "Second wind": { cost: 1000, description: "Unlocks a lingering health regen buff when activated which lasts for 400 waves and unlocks Angel Wings mastery research", researchName: "Angel Wings", research: "Increase lingering health regen multiplier" },
  "Demon mode": { cost: 1000, description: "Unlocks a lingering damage buff when activated which lasts for 300 waves and unlocks Demon Revenge mastery research", researchName: "Demon Revenge", research: "Increase lingering damage multiplier" },
  "Energy shield": { cost: 1000, description: "Energy shield activates a blast that repels all enemies back by a percent of tower max range and destroy all enemy projectiles. The charge times of Rays are reset. Also unlocks Repel mastery research.", researchName: "Repel", research: "Increase the pushback as a percent of tower range" },
  "Wave accelerator": { cost: 1000, description: "Increases the rate at which spawn rates accelerate causing more enemies to spawn in earlier waves and unlocks Spawn Accelerator mastery research", researchName: "Spawn Accelerator", research: "Increases the rate at which spawn rates accelerate" },
  Berserker: { cost: 750, description: "Increases the damage cap to x500 for a duration when Death Defy is activated and unlocks Viking Funeral mastery research", researchName: "Viking Funeral", research: "Berserker damage cap of x500 for a duration of time" },
  "Ultimate crit": { cost: 750, description: "Increases the card's stat multiplier and unlocks Ultimate Crit mastery research", researchName: "Ultimate Crit+", research: "Increase Ultimate Crit chance" },
  Nuke: { cost: 750, description: "Unlocks a lingering attack speed slow which lasts for 300 waves after the nuke and unlocks Radiation mastery research", researchName: "Radiation", research: "Slows enemy attack speed for 300 waves" },
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
