import React, { Component } from "react";
import Grid from "../../components/grid";
import { canVisit, isInBounds, sleep } from "../../helpers/utils";
import { TNode } from "../../models";

declare type point = [number, number];

export default class BfsPage extends Component {
  render() {
    return <Grid startHandler={this.bfs} />;
  }

  private async bfs(
    grid: TNode[][],
    source: point,
    target: point,
    setGrid: () => void
  ): Promise<TNode[][]> {
    const queue = [source];
    const path: { [key: string]: point | null } = {};
    path[`${source[0]}-${source[1]}`] = null;
    let x, y;

    while (queue.length) {
      await sleep(1);

      [x, y] = queue.shift() as point;
      if (!isInBounds(x, y, grid.length) || grid[x][y].visited) {
        continue;
      }

      grid[x][y].visited = true;
      setGrid();

      if (target[0] === x && target[1] === y) {
        break;
      }

      const previous: point = [x, y];
      const difX = [0, 0, 1, -1];
      const difY = [-1, 1, 0, 0];

      for (let i = 0; i < 4; ++i) {
        if (canVisit(grid, x + difX[i], y + difY[i])) {
          queue.push([x + difX[i], y + difY[i]]);
          path[`${x + difX[i]}-${y + difY[i]}`] = previous;
        }
      }
    }

    let previous: point | null = target;
    while (previous) {
      previous = path[`${previous[0]}-${previous[1]}`];
      if (
        !previous ||
        (previous[0] === source[0] && previous[1] === source[1])
      ) {
        break;
      }
      grid[previous[0]][previous[1]].isPath = true;
      await sleep(1);
      setGrid();
    }

    return grid;
  }
}
