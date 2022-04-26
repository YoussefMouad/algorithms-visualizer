import { NavLink } from "react-router-dom";

interface IProps {
  title: string;
  path: string;
}

export default function NavbarItem(props: IProps) {
  return (
    <NavLink
      to={props.path}
      className={({ isActive }): string =>
        isActive
          ? "bg-gray-900 text-white px-3 py-2 rounded-md text-sm font-medium"
          : "text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
      }
    >
      {props.title}
    </NavLink>
  );
}
