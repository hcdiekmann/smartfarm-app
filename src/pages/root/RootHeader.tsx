import React from 'react';
import { FarmSelector } from "@/components/header/FarmSelector";
import { LogoIcon } from "@/components/ui/icons";
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Link, useLocation } from "react-router-dom";
import { AvatarMenu } from "@/components/header/AvatarMenu";
import { Button } from "@/components/ui/button";
import { Sheet, SheetTrigger, SheetContent } from "@/components/ui/sheet";
import { MenuIcon } from "lucide-react";
import { RootNavItems } from './RootNavItems';

export default function RootHeader() {
  const location = useLocation();
  const [open, setOpen] = React.useState(false);

  const handleCloseSheet = () => {
    setOpen(false);
  };

  if (location.pathname === "/")
    return (
      <header className="flex h-14 items-center gap-2 border-b px-2 lg:h-[60px] lg:px-6">
        <div className="md:hidden">
          <Link to="/">
            <LogoIcon className="w-12 h-12 fill-current text-sfagreen dark:text-current" />
          </Link>
        </div>
        <div className="flex-1">
          <FarmSelector />
        </div>
        
        {/* Mobile only Sheet component */}
        <Sheet open={open} onOpenChange={setOpen}>
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
              <RootNavItems onCloseSheet={handleCloseSheet} />
            </div>
          </SheetContent>
        </Sheet>

        {/* Desktop only */}
        <div className="hidden md:block">
          <AvatarMenu />
        </div>
      </header>
    );

  const pathNames = location.pathname.split("/").filter((x) => x);

  return (
    <header className="flex h-14 items-center gap-2 border-b bg-muted/40 px-1 lg:h-[60px] lg:px-6">
      <div className="md:hidden">
        <Link to="/">
          <LogoIcon className="w-12 h-12 fill-current text-sfagreen dark:text-current" />
        </Link>
      </div>
      <div className="flex-1 pl-2">
        <Breadcrumb>
          <BreadcrumbList>
            {pathNames.map((name, index) => {
              const routeTo = `/${pathNames.slice(0, index + 1).join("/")}`;
              const isLast = index === pathNames.length - 1;
              return (
                <BreadcrumbItem key={name}>
                  {isLast ? (
                    <span>{name.charAt(0).toUpperCase() + name.slice(1)}</span>
                  ) : (
                    <BreadcrumbLink href={routeTo}>
                      {name.charAt(0).toUpperCase() + name.slice(1)}
                    </BreadcrumbLink>
                  )}
                  {!isLast && <BreadcrumbSeparator />}
                </BreadcrumbItem>
              );
            })}
          </BreadcrumbList>
        </Breadcrumb>
      </div>
      
      {/* Mobile only Sheet component for non-root pages */}
      <Sheet open={open} onOpenChange={setOpen}>
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
            <RootNavItems onCloseSheet={handleCloseSheet} />
          </div>
        </SheetContent>
      </Sheet>

      {/* Desktop only */}
      <div className="hidden md:block">
          <AvatarMenu />
        </div>
    </header>
  );
}