import React from 'react';
import { Moon, Sun, Satellite, SunMoon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { MapTheme } from "@/map.types";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '../ui/dropdown-menu';

interface MapThemeSelectorProps {
  mapTheme: MapTheme;
  setMapTheme: (theme: MapTheme) => void;
}

const MapThemeSelector: React.FC<MapThemeSelectorProps> = ({ mapTheme, setMapTheme }) => {
  const getThemeIcon = () => {
    switch (mapTheme) {
      case 'light':
        return <Sun className="h-4 w-4" />;
      case 'dark':
        return <Moon className="h-4 w-4" />;
      case 'satellite':
        return <Satellite className="h-4 w-4" />;
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          size="icon"
          variant="outline"
          className="ghost"
        >
          {getThemeIcon()}
          <span className="sr-only">Toggle map style</span>
        </Button>

      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel>Map style</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={() => setMapTheme("light")}>
        <Sun className="mr-2 h-4 w-4" />
        <span>Light</span>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setMapTheme("dark")}>
            <Moon className="mr-2 h-4 w-4" />
            <span>Dark</span>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setMapTheme("satellite")}>
            <Satellite className="mr-2 h-4 w-4" />
          <span>Satellite</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default MapThemeSelector;