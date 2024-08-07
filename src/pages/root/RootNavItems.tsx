import React from 'react';
import { Link, useLocation } from "react-router-dom";
import { HomeIcon, Newspaper, SettingsIcon, Store, UserIcon } from "lucide-react";
import { Separator } from "@/components/ui/separator";

interface RootNavItemsProps {
  orientation?: 'vertical' | 'horizontal';
  onCloseSheet?: () => void;
}

export const RootNavItems: React.FC<RootNavItemsProps> = ({ orientation='vertical', onCloseSheet }) => {
    const location = useLocation();
  const isActive = (path: string) => location.pathname === path;
  
  const navItems = [
    { to: "/", icon: HomeIcon, label: "Home" },
    { to: "/news", icon: Newspaper, label: "News" },
    { to: "/products", icon: Store, label: "Store" },
    { to: "/settings", icon: SettingsIcon, label: "Settings" },
    { to: "/account", icon: UserIcon, label: "Account" },
  ];

  const commonClasses = "flex items-center md:text-sm font-medium gap-3 rounded-lg px-3 py-2 transition-all hover:text-primary";
  const activeClasses = "bg-muted text-primary";
  const inactiveClasses = "text-muted-foreground";

  return (

       <nav className={`grid items-start ${orientation === 'vertical' ? 'gap-1' : 'gap-2'}`}>

         {navItems.map((item, index) => (
        <React.Fragment key={item.to}>
          {index === 3 && <Separator className="my-1" />}
          <Link
            to={item.to}
            className={`${commonClasses} ${
              isActive(item.to) ? activeClasses : inactiveClasses
            }`}
            onClick={onCloseSheet}
          >
            <item.icon className="h-5 w-5" />
            <span>{item.label}</span>
            
          </Link>
          {index === 6 && <Separator className="my-1" />}
        </React.Fragment>
      ))}
    </nav>
  );
};