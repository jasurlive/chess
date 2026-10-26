import { useState, type ReactNode } from "react";
import { NavLink } from "react-router";
import {
  FiChevronLeft,
  FiChevronRight,
  FiHome,
  FiWifi,
  FiMaximize,
  FiMinimize,
  FiSun,
  FiMoon,
} from "react-icons/fi";
import { FaChess, FaChessKing, FaMagnifyingGlassChart } from "react-icons/fa6";
import "../css/menu.css";
import { useTheme } from "../hooks/LOCAL/useTheme";
import { useShortcuts } from "../hooks/LOCAL/useShortcuts";
import { useFullscreen } from "../hooks/LOCAL/useFullscreen";

export type MenuItem = {
  label: string;
  icon: ReactNode;
  href?: string;
  onClick?: () => void;
  mobile?: boolean;
};

export default function Menu({
  items = [
    { label: "Home", icon: <FiHome />, href: "/", mobile: true },
    { label: "Chess 1 side", icon: <FaChess />, href: "/chess-1", mobile: true },
    { label: "Analysis", icon: <FaMagnifyingGlassChart />, href: "/chess-analysis", mobile: true },
    { label: "Chess 2 sides", icon: <FaChessKing />, href: "/chess-2", mobile: true },
    { label: "Online", icon: <FiWifi />, href: "/chess-online" },
  ],
}: {
  items?: MenuItem[];
}) {
  const [collapsed, setCollapsed] = useState(true);
  const { theme, toggleTheme } = useTheme();

  const { isFullscreen, toggleFullscreen } = useFullscreen();

  useShortcuts({ "ctrl+j": toggleTheme });

  const menuItems: MenuItem[] = [
    ...items,
    {
      label: isFullscreen ? "Exit full screen" : "Full screen",
      icon: isFullscreen ? <FiMinimize /> : <FiMaximize />,
      onClick: toggleFullscreen,
      mobile: true,
    },
    {
      label: theme === "dark" ? "Light theme" : "Dark theme",
      icon: theme === "dark" ? <FiSun /> : <FiMoon />,
      onClick: toggleTheme,
      mobile: true,
    },
  ];

  return (
    <nav className={`menu ${collapsed ? "menu-collapsed" : ""}`}>
      <button
        type="button"
        className="menu-toggle"
        onClick={() => setCollapsed((value) => !value)}
        aria-label="Toggle sidebar"
      >
        {collapsed ? <FiChevronRight /> : <FiChevronLeft />}
      </button>

      {menuItems.map((item) => {
        const className = `menu-item ${
          item.mobile ? "menu-mobile-visible" : "menu-desktop-only"
        }`;

        const content = (
          <>
            <span className="menu-icon">{item.icon}</span>
            <span className="menu-label">{item.label}</span>
          </>
        );

        return item.onClick ? (
          <button
            key={item.label}
            type="button"
            className={className}
            onClick={item.onClick}
            title={item.label}
          >
            {content}
          </button>
        ) : item.href ? (
          // NavLink adds .active on the current page; `end` so "/" isn't active everywhere
          <NavLink
            key={item.href}
            to={item.href}
            end={item.href === "/"}
            className={className}
            title={item.label}
          >
            {content}
          </NavLink>
        ) : null;
      })}
    </nav>
  );
}
