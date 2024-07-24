import React from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Check, ChevronsUpDown, MenuIcon, UsersIcon } from "lucide-react";
import { AvatarMenu } from "./AvatarMenu";
import { FarmIcon, LogoIcon, MoneyIcon, TractorIcon } from "../Icons";
import { ThemeToggle } from "./ThemeToggle";
import { Button } from "@/components/ui/button";
import { Sheet, SheetTrigger, SheetContent } from "@/components/ui/sheet";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useFetchFarms } from "@/hooks/useFarms";

const Header = () => {
  const navigate = useNavigate();
  const { shortRef } = useParams<{ shortRef: string }>();
  const { data: farms, isLoading, isError } = useFetchFarms();
  const [open, setOpen] = React.useState(false);

  const handleFarmChange = (farm_reference: string | null ) => {
    navigate(`/farm/${farm_reference}`);
    setOpen(false);
  };

  const currentFarm = React.useMemo(() => 
    farms?.find(farm => farm.short_reference === shortRef),
    [farms, shortRef]
  );

  return (
    <header className="flex h-14 items-center gap-2 border-b px-2 lg:h-[60px] lg:px-6">
      <div className="md:hidden">
        <Link to="/" >
          <LogoIcon className="w-12 h-12 fill-current text-sfagreen dark:text-current" />
          </Link>
      </div>
      <div className="flex-1">
        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger asChild>
            <Button
              variant="ghost"
              role="combobox"
              aria-expanded={open}
              className="w-[200px] justify-between"
            >
              <FarmIcon className="h-4 w-4 " />
              {currentFarm ? currentFarm.name : "Select a farm"}
              <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-[200px] p-0">
            <Command>
              <CommandInput placeholder="Search farms..." />
              <CommandEmpty>No farm found.</CommandEmpty>
              <CommandGroup>
                {isLoading ? (
                  <CommandItem disabled>Loading farms...</CommandItem>
                ) : isError ? (
                  <CommandItem disabled>Error loading farms</CommandItem>
                ) : farms && farms.length > 0 ? (
                  farms.map((farm) => (
                    <CommandItem
                      key={farm.short_reference}
                      value={farm.name}
                      onSelect={() => handleFarmChange(farm.short_reference)}
                    >
                      {shortRef === farm.short_reference ? (
                        <Check className="mr-2 h-4 w-4" />
                      ) : (
                        <FarmIcon className="mr-2 h-4 w-4 opacity-50" />
                      )}
                      {farm.name}
                    </CommandItem>
                  ))
                ) : (
                  <CommandItem disabled>No farms available</CommandItem>
                )}
              </CommandGroup>
            </Command>
          </PopoverContent>
        </Popover>
      </div>
      <div className="hidden md:block">
        <ThemeToggle />
      </div>
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
          <nav className="grid gap-2 mt-8 text-lg font-medium">
            <a
              href={`/farm/${shortRef}/assets`}
              className="mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 bg-muted text-foreground hover:text-foreground"
            >
              <TractorIcon className="h-5 w-5" />
              Assets
            </a>
            <a
              href={`/farm/${shortRef}/people`}
              className="mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 text-muted-foreground hover:text-foreground"
            >
              <UsersIcon className="h-5 w-5" />
              People
            </a>
            <a
              href={`/farm/${shortRef}/finances`}
              className="mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 text-muted-foreground hover:text-foreground"
            >
              <MoneyIcon className="h-5 w-5" />
              Finances
            </a>
          </nav>
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

export default Header;