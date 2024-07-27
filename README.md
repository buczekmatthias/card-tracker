# Card tracker

Web version of [this stylesheet](https://docs.google.com/spreadsheets/d/1xb32S9aE5W4QYCyziB2t9IF_qfCYdz8tcMhq-BU6Fu4/edit#gid=292235292) made for mobile game [The Tower](https://play.google.com/store/apps/details?id=com.TechTreeGames.TheTower&hl=en)

# Data update guide

- Changes to `/src/data/cardSlots.js`

  - Add new value at end of `slots` array[^1] for not included slots in format `slot: gem cost`

- Changes to `/src/data/cards.json`

  - Add new cards name at end of array

- Changes to `/src/data/updateData.js`

  - Uncomment card push, provide proper index for [rarity](#rarity-table) and data for [card](#card-data)
  - Uncomment card slots available and provide new value, if slot number changes

- Changes to `/src/data/updateLoadout.js`

  - Uncomment card push, provide [preset](#loadout-presets), name[^2] and used[^3]

- Changes to `src/data/cards.js`

  - Add new cards as needed

- Changes to `src/data/loadout.js`

  - Add new cards as needed

## Rarity table

| Rarity | Index |
| ------ | ----- |
| Common | 0     |
| Rare   | 1     |
| Epic   | 2     |

## Card data

| Property | Type   | Default | Desc                                  |
| -------- | ------ | ------- | ------------------------------------- |
| Name     | String | ---     | Name of the card, can't be empty      |
| Lvl      | Number | 0       | Level of owned card                   |
| Owned    | Number | 0       | Amount of owned cards for given level |

## Loadout presets

| Preset | Index |
| ------ | ----- |
| 1      | 0     |
| 2      | 1     |
| 3      | 2     |
| 4      | 3     |
| 5      | 4     |

[^1]: Notation for array is based on actual slot number starting from 1
[^2]: Name of card added in `updateData.js`
[^3]: Boolean value (should be `false` by default), which defines if card is used in preset
