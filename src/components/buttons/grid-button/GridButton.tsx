import { TNode } from "../../../models";

export default function GridButton(props: TNode) {
  return (
    <button
      type="button"
      className={
        "w-8 h-8 text-white font-medium rounded-sm text-sm p-2.5 dark:border-gray-700" +
        (props.visited ? " bg-gray-500" : " bg-gray-800 hover:bg-gray-900") +
        (props.isSource ? ` bg-fuchsia-600` : "  ") +
        (props.isTarget ? ` bg-lime-500` : "  ") +
        (props.isPath ? ` bg-red-700` : "  ") +
        (props.isObstacle ? ` bg-blue-500` : "  ")
      }
      onClick={(event) => props.clickHandler?.(event)}
      onContextMenu={(event) => props.clickHandler?.(event)}
      onMouseEnter={(event) => props.clickHandler?.(event)}
    >
      {/* {props.id} */}
    </button>
  );
}
