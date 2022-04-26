import React from "react";
import Grid from "../../components/grid";
import { TNode } from "../../models";

declare type point = [number, number];

export default function DijkstraPage() {
  return <Grid startHandler={dijkstra} />;
}

const dijkstra = async (
  grid: TNode[][],
  source: point,
  target: point,
  setGrid: () => void
): Promise<TNode[][]> => {
  return grid;
};
