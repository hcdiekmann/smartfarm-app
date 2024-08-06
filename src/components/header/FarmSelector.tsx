import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Check, ChevronsUpDown } from "lucide-react";
import { Button } from "@/components/ui/button";
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
import { useFarm } from "@/provider/FarmProvider";
import { FarmIcon } from '@/components/ui/icons';

interface FarmSelectorProps {
  currentFarmRef?: string;
  onFarmChange?: (farmRef: string) => void;
}

export const FarmSelector: React.FC<FarmSelectorProps> = ({ currentFarmRef, onFarmChange }) => {
  const navigate = useNavigate();
  const { farms, isLoading, isError } = useFarm();
  const [open, setOpen] = React.useState(false);

  const currentFarm = React.useMemo(() => {
    return farms.find(farm => farm.short_reference === currentFarmRef) || null;
  }, [farms, currentFarmRef]);

  const handleFarmChange = (farm_reference: string) => {
    if (onFarmChange) {
      onFarmChange(farm_reference);
    } else {
      navigate(`/farm/${farm_reference}`);
    }
    setOpen(false);
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="ghost"
          role="combobox"
          aria-expanded={open}
          className="w-[200px] justify-between"
        >
          <FarmIcon className="h-4 w-4" />
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
                  onSelect={() => handleFarmChange(farm.short_reference!)}
                >
                  {currentFarm && currentFarm.short_reference === farm.short_reference ? (
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
  );
};