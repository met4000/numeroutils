import { NumberCard } from "./basetypes.mjs";
import { FractionWildCard } from "./cardtypes/FractionWildCard.mjs";
import { PowerWildCard } from "./cardtypes/PowerWildCard.mjs";
import { RootWildCard } from "./cardtypes/RootWildCard.mjs";
import { SubWildCard } from "./cardtypes/SubWildCard.mjs";
import { dispResults } from "./display.mjs";
import { findLongestTake } from "./numeroutils.mjs";

let board = [
  new NumberCard(1),
  new NumberCard(6),

  new SubWildCard(3),
  new SubWildCard(5),

  new PowerWildCard(2),
  new RootWildCard(3),

  new FractionWildCard(1, 3),
  new FractionWildCard(1, 10),

  new NumberCard(9),
];

let hand = [
  new NumberCard(3),
  new NumberCard(5),
  new NumberCard(13),
];

dispResults(board, hand, findLongestTake(board, hand));
