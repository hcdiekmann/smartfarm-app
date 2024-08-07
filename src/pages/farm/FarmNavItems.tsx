import React from 'react';
import { Link, useLocation } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { UsersIcon, LayoutPanelLeft, ScrollText, ClipboardList, Receipt, HandCoins  } from "lucide-react";
import { TractorIcon } from "@/components/ui/icons";
import { useFetchPeople } from '@/hooks/farm/usePeople';
import { useFetchAssets } from '@/hooks/farm/useAssets';
import { useFarm } from '@/provider/FarmProvider';

interface FarmNavItemsProps {
  shortRef: string;
  orientation?: 'vertical' | 'horizontal';
  onCloseSheet?: () => void;
}

export const FarmNavItems: React.FC<FarmNavItemsProps> = ({ shortRef, orientation = 'vertical', onCloseSheet }) => {
  const location = useLocation();
  const isActive = (path: string) => location.pathname === path;
  const { currentFarm } = useFarm();

  const { data: people, isLoading: isPeopleLoading } = useFetchPeople(currentFarm?.id);
  const { data: assets, isLoading: isAssetsLoading } = useFetchAssets(currentFarm?.id);

  const navItems = [
    { to: `/farm/${shortRef}`, icon: LayoutPanelLeft, label: 'Overview' },
    { to: `/farm/${shortRef}/assets`, icon: TractorIcon, label: 'Assets', badge: isAssetsLoading ? "" : assets?.length.toString() },
    { to: `/farm/${shortRef}/people`, icon: UsersIcon, label: 'People', badge: isPeopleLoading ? "" : people?.length.toString() },
    { to: `/farm/${shortRef}/tasks`, icon: ClipboardList, label: 'Tasks' },
    { to: `/farm/${shortRef}/logs`, icon: ScrollText, label: 'Logs' },
    { to: `/farm/${shortRef}/invoices`, icon: Receipt, label: 'Invoices' },
    { to: `/farm/${shortRef}/finances`, icon: HandCoins , label: 'Finances' },
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
            onClick={onCloseSheet}
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