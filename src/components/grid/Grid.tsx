import React, { Component } from "react";
import { GridButton } from "../../components/buttons";
import { TNode } from "../../models";

declare type point = [number, number];
interface IProps {
  startHandler: (
    grid: TNode[][],
    source: point,
    target: point,
    setGrid: () => void
  ) => void;
}

interface IState {
  grid: TNode[];
}

enum ClickType {
  source,
  target,
  obstacle,
}

export default class BfsPage extends Component<IProps, IState> {
  private grid: TNode[][];
  private size = 20;
  private source: [number, number] = [3, 3];
  private target: [number, number] = [6, 8];
  private clickType = ClickType.obstacle;

  public constructor(props: IProps) {
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
          <div className="mb-3">
            <button
              type="button"
              className="text-white bg-gray-500 hover:bg-gray-700 rounded-lg p-2.5 dark:border-gray-700 mr-2"
              onClick={() =>
                this.props.startHandler?.(
                  this.grid,
                  this.source,
                  this.target,
                  this.setGrid
                )
              }
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

  private reset() {
    for (let i = 0; i < this.size; ++i) {
      for (let j = 0; j < this.size; ++j) {
        this.grid[i][j].visited = false;
        this.grid[i][j].isPath = false;
      }
    }

    this.setGrid();
  }

  private setGrid = (): void => {
    this.setState({
      grid: this.grid.flat(),
    });
  };
}
