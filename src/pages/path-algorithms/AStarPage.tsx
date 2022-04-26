import React from "react";
import Grid from "../../components/grid";
import { isInBounds, sleep } from "../../helpers/utils";
import { TNode } from "../../models";

declare type point = [number, number];

export default function AStarPage() {
  return <Grid startHandler={aStar} />;
}

const aStar = async (
  grid: TNode[][],
  source: point,
  target: point,
  setGrid: () => void
): Promise<TNode[][]> => {
  const sleepTime = 50;
  const open: { [key: string]: Tile } = {};
  open[`${source[0]}-${source[1]}`] = {
    x: source[0],
    y: source[1],
    g: 0,
    h: Math.abs(source[0] - target[0]) + Math.abs(source[1] - target[1]),
    f: Math.abs(source[0] - target[0]) + Math.abs(source[1] - target[1]),
  };
  const closed: { [key: string]: Tile } = {};
  const difX = [0, 0, 1, -1];
  const difY = [-1, 1, 0, 0];

  while (Object.keys(open).length) {
    let tile: Tile = {} as Tile;
    let min = Number.MAX_SAFE_INTEGER;
    for (const key in open) {
      if (
        Object.prototype.hasOwnProperty.call(open, key) &&
        !closed[`${open[key].x}-${open[key].y}`] &&
        min >= open[key].f
      ) {
        tile = open[key];
        min = open[key].f;
      }
    }

    closed[`${tile.x}-${tile.y}`] = tile;

    grid[tile.x][tile.y].visited = true;
    setGrid();
    await sleep(sleepTime);
    if (tile.x === target[0] && tile.y === target[1]) {
      break;
    }

    for (let i = 0; i < 4; ++i) {
      if (
        !isInBounds(tile.x + difX[i], tile.y + difY[i], grid.length) ||
        closed[`${tile.x + difX[i]}-${tile.y + difY[i]}`]
      ) {
        continue;
      }

      const h =
        Math.abs(tile.x + difX[i] - target[0]) +
        Math.abs(tile.y + difY[i] - target[1]);
      const existedTile = open[`${tile.x + difX[i]}-${tile.y + difY[i]}`];
      if (
        !existedTile &&
        !grid[tile.x + difX[i]][tile.y + difY[i]].isObstacle
      ) {
        open[`${tile.x + difX[i]}-${tile.y + difY[i]}`] = {
          x: tile.x + difX[i],
          y: tile.y + difY[i],
          g: tile.g + 1,
          h: h,
          f: tile.g + 1 + h,
        };
      } else if (existedTile) {
        existedTile.f = Math.min(existedTile.f, existedTile.g + h);
      }
    }
  }

  // Backtracking
  let node = open[`${target[0]}-${target[1]}`];
  const path = [];

  while (node.x !== source[0] || node.y !== source[1]) {
    path.push(node);
    let min = Number.MAX_SAFE_INTEGER;
    let minNode: Tile = node;
    for (let i = 0; i < 4; ++i) {
      if (
        open[`${node.x + difX[i]}-${node.y + difY[i]}`] &&
        closed[`${node.x + difX[i]}-${node.y + difY[i]}`] &&
        min > open[`${node.x + difX[i]}-${node.y + difY[i]}`].g
      ) {
        minNode = open[`${node.x + difX[i]}-${node.y + difY[i]}`];
        min = minNode.g;
      }
    }
    node = minNode;
  }
  path.reverse();
  path.pop(); // remove target
  
  for (const tile of path) {
    await sleep(sleepTime);
    grid[tile.x][tile.y].isPath = true;
    setGrid();
  }

  setGrid();
  return grid;
};

interface Tile {
  x: number;
  y: number;
  g: number; // G is our current movement cost we have to spend to move from the starting point to the current considered tile.
  h: number; // H is the estimated movement cost from the current considered tile to target tile. H = |x1 – x2| + |y1 – y2|
  f: number; // F is just the sum of G and H: F = G + H
}
