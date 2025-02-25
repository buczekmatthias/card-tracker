const info = {
  Damage: { description: "Increase tower damage by pvs", values: ["1.50", "2.00", "2.40", "2.80", "3.20", "3.60", "4.00"], prefix: "x", suffix: "", card: "dmg.webp", glow: "glow-blue" },
  "Attack speed": { description: "Increase tower attack speed by pvs", values: ["1.25", "1.40", "1.55", "1.70", "1.85", "2.00", "2.15"], prefix: "x", suffix: "", card: "as.webp", glow: "glow-red" },
  Health: { description: "Increase tower health by pvs", values: ["1.50", "2.00", "2.40", "2.80", "3.20", "3.60", "4.00"], prefix: "x", suffix: "", card: "hp.webp", glow: "glow-yellow" },
  "Health regen": { description: "Increase tower health regen by pvs", values: ["1.40", "1.60", "1.80", "2.00", "2.20", "2.40", "2.60"], prefix: "x", suffix: "", card: "regen.webp", glow: "glow-green" },
  Range: { description: "Increase tower max range by pvs", values: ["1.15", "1.20", "1.25", "1.30", "1.35", "1.40", "1.45"], prefix: "x", suffix: "", card: "range.webp", glow: "glow-blue" },
  Cash: { description: "Increase all cash earned by pvs", values: ["1.20", "1.40", "1.60", "1.80", "2.00", "2.20", "2.40"], prefix: "x", suffix: "", card: "cash.webp", glow: "glow-red" },
  Coins: { description: "Increase all coins earned by pvs", values: ["1.15", "1.20", "1.25", "1.30", "1.35", "1.40", "1.45"], prefix: "x", suffix: "", card: "coins.webp", glow: "glow-yellow" },
  "Slow aura": { description: "All enemies in tower range will have speed decreased by pvs", values: ["13", "16", "19", "22", "25", "28", "31"], prefix: "", suffix: "%", card: "aura.webp", glow: "glow-green" },
  "Critical chance": { description: "Increase critical chance by pvs", values: ["5", "6", "7", "8", "9", "10", "11"], prefix: "+", suffix: "%", card: "crit.webp", glow: "glow-red" },
  "Enemy balance": { description: "Increase enemies spawned each wave, increase cash earned per kill by pvs", values: ["1.30", "1.40", "1.50", "1.60", "1.70", "1.80", "1.90"], prefix: "x", suffix: "", card: "eb.webp", glow: "glow-blue" },
  "Extra defense": { description: "Increase tower percent defense by pvs", values: ["5", "6", "7", "8", "9", "10", "11"], prefix: "+", suffix: "%", card: "def.webp", glow: "glow-blue" },
  Fortress: { description: "Increase tower absolute defense by pvs", values: ["1.30", "1.45", "1.60", "1.75", "1.90", "2.05", "2.20"], prefix: "x", suffix: "", card: "fort.webp", glow: "glow-blue" },
  "Free upgrades": { description: "Increase all free upgrade chances per wave by pvs", values: ["4", "5", "6", "7", "8", "9", "10"], prefix: "", suffix: "%", card: "frups.webp", glow: "glow-yellow" },
  "Inner orb": { description: "A spinning orb with speed of pvs that destroys enemies on contact (except bosses and elites)", values: ["30", "40", "50", "60", "70", "80", "90"], labs: ["Adjuster", "Extra orbs"], prefix: ".", suffix: "", card: "orb.webp", glow: "glow-blue" },
  "Plasma cannon": { description: "Fire one big plasma shot at boss to drop its health by pvs", values: ["30", "34", "38", "42", "46", "50", "54"], prefix: "", suffix: "%", card: "pc.webp", glow: "glow-red" },
  "Critical coin": { description: "Basic enemies destroyed by critical damage have a chance of dropping coins of pvs", values: ["15", "18", "21", "24", "27", "30", "33"], prefix: "", suffix: "%", card: "cc.webp", glow: "glow-yellow" },
  "Wave skip": { description: "Gain a pvs chance of skipping waves while still earning cash, coins and cells equal to x1.10 the value of the wave enemies, also will roll for modules/reroll dices if boss wave got skipped", values: ["9", "10", "11", "13", "15", "17", "19"], prefix: "", suffix: "%", card: "ws.webp", glow: "glow-blue" },
  "Intro skip": { description: "Waves increment by 10 for the first pvs waves or up to your highest wave. A boss spawns every wave and no coins are earned for duration.", values: ["20", "30", "40", "50", "60", "80", "100"], prefix: "", suffix: "", card: "is.webp", glow: "glow-yellow" },
  "Land mine stun": { description: "Landmines have 40% of stunning enemies (except bosses) for pvs", values: ["1.4", "1.8", "2.2", "2.6", "3.0", "3.4", "3.8"], unlocks: "tier 7 wave 250", prefix: "", suffix: " sec", card: "lms.webp", glow: "glow-yellow" },
  "Package change": { description: "Increase recovery package spawn chance by pvs", values: ["15", "18", "21", "24", "27", "30", "33"], unlocks: "tier 2 wave 750", prefix: "+", suffix: "%", card: "rpc.webp", glow: "glow-yellow" },
  "Death ray": { description: "A powerful ray that destroys enemies on contact (except bosses and elites) for pvs", values: ["2.3", "2.7", "3.1", "3.5", "3.9", "4.4", "4.9"], labs: ["Double ray chance"], prefix: "", suffix: " sec", card: "dr.webp", glow: "glow-red" },
  "Energy net": { description: "Fire a special net at a boss immobilizing it for pvs", values: ["2.5", "2.8", "3.1", "3.4", "3.7", "4.0", "4.3"], prefix: "", suffix: " sec", card: "net.webp", glow: "glow-green" },
  "Super tower": { description: "The tower becomes super for 15 sec, tower projectile damage is increased by pvs (30 sec cooldown)", values: ["2.80", "3.25", "3.70", "4.14", "4.59", "5.04", "5.60"], labs: ["Bonus"], prefix: "x", suffix: "", card: "st.webp", glow: "glow-blue" },
  "Second wind": { description: "Revive the tower with half health and create an invincible shield for pvs", values: ["10", "15", "20", "25", "30", "35", "40"], labs: ["Kill on-screen enemies", "Recharge"], prefix: "", suffix: " sec", card: "sw.webp", glow: "glow-orange" },
  "Demon mode": { description: "Enter demon mode: damage increased by x3 and become invincible for pvs", values: ["180", "200", "220", "240", "260", "280", "300"], labs: ["Recharge"], prefix: "", suffix: " sec", card: "dm.webp", glow: "glow-red" },
  "Energy shield": { description: "Shield that ignores a single attack, replenishes after pvs", values: ["20", "18", "16", "14", "12", "10", "8"], labs: ["Extra charges"], prefix: "", suffix: " min", card: "es.webp", glow: "glow-blue" },
  "Wave accelerator": { description: "Reduce the cooldown between waves by pvs", values: ["30", "34", "38", "42", "46", "50", "54"], prefix: "", suffix: "%", card: "wa.webp", glow: "glow-orange" },
  Berserker: { description: "Increase damage by pvs of total damage absorbed this round (max of x8 tower damage)", values: ["0.8", "0.9", "1.0", "1.1", "1.2", "1.3", "1.4"], prefix: "", suffix: "%", card: "zerk.webp", glow: "glow-orange" },
  "Ultimate crit": { description: "Ultimate weapons gain a chance of pvs to deal critical damage of x25.50 (tower critical factor)", values: ["1", "1.33", "1.66", "2", "2.33", "2.66", "3"], unlocks: "tier 14 wave 50", prefix: "", suffix: "%", card: "uwc.webp", glow: "glow-red" },
  Nuke: { description: "Destroy pvs of enemies on screen", values: ["25", "35", "45", "55", "65", "80", "100"], labs: ["Recharge"], unlocks: "tier 11 wave 10", prefix: "", suffix: "%", card: "nuke.webp", glow: "glow-yellow" },
};

const getCardInfo = (cardName) => info[cardName];

const getCardImgAndGlow = (cardName) => ({ glow: getCardInfo(cardName).glow, card: getCardInfo(cardName).card });

export { info, getCardInfo, getCardImgAndGlow };
