import React from 'react';
import { Link, useParams } from 'react-router-dom';
import {  MenuIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetTrigger, SheetContent } from "@/components/ui/sheet";
import { useFarm } from "@/provider/FarmProvider";
import { FarmNavItems } from '@/pages/farm/FarmNavItems';
import { LogoIcon } from '@/components/Icons';
import { AvatarMenu } from '@/components/header/AvatarMenu';
import { ThemeToggle } from '@/components/header/ThemeToggle';
import { FarmSelector } from '@/components/header/FarmSelector';

const FarmHeader = () => {
  const { shortRef } = useParams<{ shortRef: string }>();
  const { setCurrentFarm, farms} = useFarm();

  const currentFarm = React.useMemo(() => {
    return farms.find(farm => farm.short_reference === shortRef) || null;
  }, [farms, shortRef]);

  React.useEffect(() => {
    if (currentFarm) {
      setCurrentFarm(currentFarm);
    }
  }, [currentFarm, setCurrentFarm]);

  return (
    <header className="flex h-14 items-center gap-2 border-b px-2 lg:h-[60px] lg:px-6">
      <div className="md:hidden">
        <Link to="/" >
          <LogoIcon className="w-12 h-12 fill-current text-sfagreen dark:text-current" />
          </Link>
      </div>
      <div className="flex-1">
        <FarmSelector currentFarmRef={shortRef} />
      </div>
      <div className="hidden md:block">
        {/* <ThemeToggle /> */}
      </div>
      {/* Mobile only */}
      <Sheet>
        <SheetTrigger asChild>
          <Button
            variant="outline"
            size="icon"
            className="shrink-0 md:hidden"
          >
            <MenuIcon className="h-5 w-5" />
            <span className="sr-only">Toggle navigation menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="right" className="flex flex-col">
          <div className="flex-1 mt-8">
            <FarmNavItems shortRef={shortRef!} />
          </div>
          <div className="mt-auto flex items-center justify-between">
            <ThemeToggle />
            <AvatarMenu />
          </div>
        </SheetContent>
      </Sheet>
      <div className="hidden md:block">
        <AvatarMenu />
      </div>
    </header>
  );
};

export default FarmHeader;