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

  for (let i = owned; i <= Object.keys(slots).length; i++) {
    cost += slots[i];
  }

  return cost;
};

const getSlotMaxPercent = (owned) => (100 - (owned / Object.keys(slots).length) * 100).toFixed(1);

export { slots, slotsCostToMax, getSlotMaxPercent };
