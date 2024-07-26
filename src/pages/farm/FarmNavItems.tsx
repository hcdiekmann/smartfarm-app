import React from 'react';
import { Link, useLocation } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { UsersIcon, LayoutPanelLeft, ScrollText, ClipboardList, Cctv, Receipt, SmartphoneNfc, Joystick,HandCoins  } from "lucide-react";
import { TractorIcon } from "@/components/Icons";

interface FarmNavItemsProps {
  shortRef: string;
  orientation?: 'vertical' | 'horizontal';
}

export const FarmNavItems: React.FC<FarmNavItemsProps> = ({ shortRef, orientation = 'vertical' }) => {
  const location = useLocation();
  const isActive = (path: string) => location.pathname === path;

  const navItems = [
    { to: `/farm/${shortRef}`, icon: LayoutPanelLeft, label: 'Overview' },
    { to: `/farm/${shortRef}/assets`, icon: TractorIcon, label: 'Assets', badge: '0' },
    { to: `/farm/${shortRef}/people`, icon: UsersIcon, label: 'People', badge: '1' },
    { to: `/farm/${shortRef}/tasks`, icon: ClipboardList, label: 'Tasks' },
    { to: `/farm/${shortRef}/logs`, icon: ScrollText, label: 'Logs' },
    { to: `/farm/${shortRef}/invoices`, icon: Receipt, label: 'Invoices' },
    { to: `/farm/${shortRef}/finances`, icon: HandCoins , label: 'Finances' },
    // { to: '#', icon: Cctv, label: 'Cameras' },
    // { to: '#', icon: SmartphoneNfc , label: 'Sensors' },
    // { to: '#', icon: Joystick, label: 'Actuators' },
  ];

  const commonClasses = "flex items-center md:text-sm font-medium gap-3 rounded-lg px-3 py-2 transition-all hover:text-primary";
  const activeClasses = "bg-muted text-primary";
  const inactiveClasses = "text-muted-foreground";

  return (
    <nav className={`grid items-start ${orientation === 'vertical' ? 'gap-1' : 'gap-2'}`}>
      {navItems.map((item, index) => (
        <React.Fragment key={item.to}>
          {index === 5 && <Separator className="my-1" />}
          <Link
            to={item.to}
            className={`${commonClasses} ${
              isActive(item.to) ? activeClasses : inactiveClasses
            }`}
          >
            <item.icon className="h-5 w-5" />
            <span>{item.label}</span>
            {item.badge && (
              <Badge className="ml-auto flex h-5 w-5 shrink-0 items-center bg-muted text-current justify-center rounded-full">
                {item.badge}
              </Badge>
            )}
          </Link>
          {index === 6 && <Separator className="my-1" />}
        </React.Fragment>
      ))}
    </nav>
  );
};