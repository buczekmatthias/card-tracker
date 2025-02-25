const getPresetExportString = (set) => {
  const joined = set.join(", ");

  return joined.length > 0 ? joined : "Preset is empty";
};

const getAllPresetsExportString = (presets) => {
  let str = "";

  presets.forEach((set, i) => {
    str += `=== Preset ${i + 1} ===\n`;

    str += getPresetExportString(set);

    if (i !== 4) {
      str += "\n\n";
    }
  });

  return str;
};

export { getPresetExportString, getAllPresetsExportString };
