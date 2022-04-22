export interface TNode {
  id: string;
  visited?: boolean;
  isSource?:boolean;
  isTarget?:boolean;
  isPath?:boolean;
  isObstacle?: boolean;
  previous?: [number, number];
  clickHandler?: (...params: any) => any;
}
