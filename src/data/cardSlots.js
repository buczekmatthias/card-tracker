const slots = {
  1: 0,
  2: 50,
  3: 100,
  4: 200,
  5: 300,
  6: 400,
  7: 500,
  8: 600,
  9: 750,
  10: 1000,
  11: 1200,
  12: 1400,
  13: 1600,
  14: 1800,
  15: 2500,
  16: 3500,
  17: 4500,
  18: 5500,
  19: 6500,
  20: 7500,
  21: 8500,
};

const vaultSlots = {
  1: { unlock: 10, path: 10 },
  2: { unlock: 15, path: 20 },
  3: { unlock: 20, path: 10 },
  4: { unlock: 25, path: 10 },
  5: { unlock: 35, path: 10 },
  6: { unlock: 45, path: 20 },
};

const getGemSlotsCount = () => parseInt(Object.keys(slots).pop());

const getVaultSlotsCount = () => parseInt(Object.keys(vaultSlots).pop());

//
// Gem slots functions
//

const slotsCostToMax = (owned) => {
  const gemSlotsCount = getGemSlotsCount();

  owned = owned >= gemSlotsCount ? gemSlotsCount + 1 : parseInt(owned) + 1;

  let cost = 0;

  for (let i = owned; i <= Object.keys(slots).length; i++) {
    cost += slots[i];
  }

  return cost;
};

const costToTarget = (owned, target) => {
  const gemSlotsCount = getGemSlotsCount();
  if (target > gemSlotsCount) {
    target = gemSlotsCount;
  }

  let cost = 0;

  for (let i = owned; i <= target; i++) {
    cost += slots[i];
  }

  return cost;
};

const gemsSpentSoFar = (owned) => costToTarget(1, owned);

const costOfNextSlot = (owned) => slots[owned + 1] || "Maxed";

//
// Vault slots functions
//

const pathCost = (owned, target) => {
  let pathCost = 0;
  owned = owned + 1;

  for (let i = owned; i <= target; i++) {
    pathCost += vaultSlots[i].path;
  }

  return pathCost;
};

const getTotalCost = (owned, target = null) => {
  let cost = 0;
  owned = owned + 1;
  const vaultSlotsCount = getVaultSlotsCount();
  if (target === null || target > vaultSlotsCount) {
    target = vaultSlotsCount;
  }

  for (let i = owned; i <= target; i++) {
    cost += vaultSlots[i].unlock + vaultSlots[i].path;
  }

  return cost;
};

const keysSpentSoFar = (owned) => getTotalCost(0, owned);

export { slots, vaultSlots, getGemSlotsCount, getVaultSlotsCount, slotsCostToMax, costToTarget, gemsSpentSoFar, pathCost, getTotalCost, costOfNextSlot, keysSpentSoFar };
