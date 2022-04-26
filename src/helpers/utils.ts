import { TNode } from "../models";

export const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

export const isInBounds = (x: number, y: number, size: number): boolean => {
  return x >= 0 && y >= 0 && x < size && y < size;
};

export const canVisit = (grid: TNode[][], x: number, y: number): boolean => {
  return (
    isInBounds(x, y, grid.length) &&
    !grid[x][y].visited &&
    !grid[x][y].isObstacle
  );
};
