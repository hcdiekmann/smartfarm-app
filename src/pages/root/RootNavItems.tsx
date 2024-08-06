import React from 'react';
import { NavLink } from "react-router-dom";
import { HomeIcon, Newspaper, Store, UserIcon } from "lucide-react";

interface RootNavItemsProps {
  onCloseSheet?: () => void;
}

export const RootNavItems: React.FC<RootNavItemsProps> = ({ onCloseSheet }) => {
  const navItems = [
    { to: "/", icon: HomeIcon, label: "Home" },
    { to: "/news", icon: Newspaper, label: "News" },
    { to: "/products", icon: Store, label: "Store" },
    { to: "/account", icon: UserIcon, label: "Account" },
  ];

  return (
    <nav className="grid items-start px-2 text-sm font-medium lg:px-4">
      {navItems.map((item) => (
        <NavLink
          key={item.to}
          to={item.to}
          className={({ isActive }) =>
            `flex items-center gap-3 rounded-lg px-3 py-2 transition-all ${
              isActive
                ? "bg-muted text-primary"
                : "text-muted-foreground hover:text-primary"
            }`
          }
          onClick={onCloseSheet}
        >
          <item.icon className="h-6 w-6" />
          {item.label}
        </NavLink>
      ))}
    </nav>
  );
};