import logo from "../../logo.svg";
import NavbarItem from "./NavbarItem";

export default function Navbar() {
  const items = [
    {
      title: "BFS",
      path: "/bfs",
    },
    {
      title: "Dijkstra",
      path: "/dijkstra",
    },
  ];

  return (
    <nav className="bg-gray-800">
      <div className="max-w-7xl mx-auto px-2 px-8">
        <div className="relative flex items-center justify-between h-16">
          <div className="flex-1 flex items-stretch justify-start">
            <div className="flex-shrink-0 flex items-center">
              <img className="block h-8 w-auto" src={logo} alt="Workflow" />
            </div>
            <div className="ml-6">
              <div className="flex space-x-2">
                {items.map((item) => (
                  <NavbarItem {...item} key={item.path} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
