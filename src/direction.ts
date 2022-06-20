export const Direction = {
  North: "NORTH",
  East: "EAST",
  South: "SOUTH",
  West: "West",
} as const;

// an Object has been used instead of an enum since TS does not support reverse lookups for string enums yet
export type Direction = typeof Direction[keyof typeof Direction];
