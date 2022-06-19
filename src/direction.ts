export const Direction = {
  North: "NORTH",
  East: "EAST",
  South: "SOUTH",
  West: "West",
} as const;

export type Direction = typeof Direction[keyof typeof Direction];
