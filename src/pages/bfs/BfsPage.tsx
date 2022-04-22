import React, { Component } from "react";
import { GridButton } from "../../components/buttons";
import { TNode } from "../../models";

interface IState {
  grid: TNode[];
}

enum ClickType {
  source,
  target,
  obstacle,
}

export default class BfsPage extends Component<any, IState> {
  private grid: TNode[][];
  private size = 20;
  private source: [number, number] = [3, 3];
  private target: [number, number] = [6, 8];
  private static sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));
  private clickType = ClickType.obstacle;

  public constructor(props: any) {
    super(props);
    this.grid = new Array(this.size);
    this.state = {
      grid: [],
    };
  }

  componentDidMount() {
    this.grid = new Array(this.size);
    for (let i = 0; i < this.size; ++i) {
      this.grid[i] = new Array(this.size);
      for (let j = 0; j < this.size; ++j) {
        this.grid[i][j] = {
          id: `${i}-${j}`,
        };
      }
    }

    this.grid[this.source[0]][this.source[1]].isSource = true;
    this.grid[this.target[0]][this.target[1]].isTarget = true;

    this.setGrid();
  }

  render() {
    return (
      <>
        <div className="m-8 text-center">
          <div>
            <button
              type="button"
              className="text-white bg-gray-500 hover:bg-gray-700 rounded-lg p-2.5 dark:border-gray-700 mr-2"
              onClick={() => this.bfs()}
            >
              Start
            </button>
            <button
              type="button"
              className="text-white bg-gray-500 hover:bg-gray-700 rounded-lg p-2.5 dark:border-gray-700 mr-2"
              onClick={() => this.reset()}
            >
              Reset
            </button>
            <button
              type="button"
              className="text-white bg-gray-500 hover:bg-gray-700 rounded-lg p-2.5 dark:border-gray-700 mr-2"
              onClick={() => (this.clickType = ClickType.source)}
            >
              Set source
            </button>
            <button
              type="button"
              className="text-white bg-gray-500 hover:bg-gray-700 rounded-lg p-2.5 dark:border-gray-700 mr-2"
              onClick={() => (this.clickType = ClickType.target)}
            >
              Set target
            </button>
            <button
              type="button"
              className="text-white bg-gray-500 hover:bg-gray-700 rounded-lg p-2.5 dark:border-gray-700 mr-2"
              onClick={() => (this.clickType = ClickType.obstacle)}
            >
              Set obstacle
            </button>
          </div>
          <div
            onContextMenu={(event) => event.preventDefault()}
            className="justify-self-center inline-grid gap-1 p-2 rounded-lg dark:bg-gray-700 grid-cols-20"
          >
            {this.state.grid.map((node) => (
              <GridButton
                clickHandler={(event) => this.handleClick(event, node)}
                {...node}
                key={node.id}
              />
            ))}
          </div>
        </div>
      </>
    );
  }

  private handleClick(event: MouseEvent, node: TNode): void {
    switch (this.clickType) {
      case event.type !== "mouseenter" && ClickType.source:
        this.grid[this.source[0]][this.source[1]].isSource = false;
        node.isSource = true;
        this.source = node.id.split("-").map((x) => +x) as [number, number];
        break;
      case event.type !== "mouseenter" && ClickType.target:
        this.grid[this.target[0]][this.target[1]].isTarget = false;
        node.isTarget = true;
        this.target = node.id.split("-").map((x) => +x) as [number, number];
        break;
      case ((event.type === "mouseenter" && event.buttons === 1) ||
        event.type !== "mouseenter") &&
        ClickType.obstacle:
        node.isObstacle = !node.isObstacle;
        break;

      default:
        break;
    }

    this.setGrid();
  }

  private async bfs() {
    const queue = [this.source];
    const path: { [key: string]: [number, number] | null } = {};
    path[`${this.source[0]}-${this.source[1]}`] = null;
    let x, y;

    while (queue.length) {
      await BfsPage.sleep(1);

      [x, y] = queue.shift() as [number, number];
      if (!this.isInBounds(x, y) || this.grid[x][y].visited) {
        continue;
      }

      this.grid[x][y].visited = true;
      this.setGrid();

      if (this.target[0] === x && this.target[1] === y) {
        break;
      }

      const previous: [number, number] = [x, y];
      if (this.canVisit(x - 1, y)) {
        queue.push([x - 1, y]);
        path[`${x - 1}-${y}`] = previous;
      }
      if (this.canVisit(x, y + 1)) {
        queue.push([x, y + 1]);
        path[`${x}-${y + 1}`] = previous;
      }
      if (this.canVisit(x + 1, y)) {
        queue.push([x + 1, y]);
        path[`${x + 1}-${y}`] = previous;
      }
      if (this.canVisit(x, y - 1)) {
        queue.push([x, y - 1]);
        path[`${x}-${y - 1}`] = previous;
      }
    }

    let previous: [number, number] | null = this.target;
    while (previous) {
      previous = path[`${previous[0]}-${previous[1]}`];
      if (!previous) {
        break;
      }
      this.grid[previous[0]][previous[1]].isPath = true;
      await BfsPage.sleep(1);
      this.setGrid();
    }
  }

  private reset() {
    for (let i = 0; i < this.size; ++i) {
      for (let j = 0; j < this.size; ++j) {
        this.grid[i][j].visited = false;
        this.grid[i][j].isPath = false;
      }
    }

    this.setGrid();
  }

  private isInBounds(x: number, y: number): boolean {
    return x >= 0 && y >= 0 && x < this.size && y < this.size;
  }

  private canVisit(x: number, y: number): boolean {
    return (
      this.isInBounds(x, y) &&
      !this.grid[x][y].visited &&
      !this.grid[x][y].isObstacle
    );
  }

  private setGrid(): void {
    this.setState({
      grid: this.grid.flat(),
    });
  }
}
