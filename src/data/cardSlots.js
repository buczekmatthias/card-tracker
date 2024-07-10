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
};

const slotsCostToMax = (owned) => {
  let cost = 0;
  owned = parseInt(owned) + 1;

  for (let i = owned; i <= Object.keys(slots).length; i++) {
    cost += slots[i];
  }

  return cost;
};

const costToTarget = (owned, target) => {
  let cost = 0;
  owned = parseInt(owned) + 1;

  for (let i = owned; i <= target; i++) {
    cost += slots[i];
  }

  return cost;
};

const gemsSpentSoFar = (owned) => {
  let cost = 0;

  owned = parseInt(owned);

  for (let i = 1; i <= owned; i++) {
    cost += slots[i];
  }

  return cost;
};

export { slots, slotsCostToMax, costToTarget, gemsSpentSoFar };
