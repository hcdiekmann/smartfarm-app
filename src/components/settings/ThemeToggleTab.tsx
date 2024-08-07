import { Theme, useTheme } from "@/provider/ThemeProvider";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Sun, Moon, SunMoon } from "lucide-react";

const ThemeToggleTab = () => {
  const { theme, setTheme } = useTheme();

  return (
    <Tabs defaultValue={theme} onValueChange={(value) => setTheme(value as Theme)}>
      <TabsList className="border p-1 h-8">
        <TabsTrigger 
          value="light" 
          className="px-2 py-1 text-xs"
        >
          <Sun className="h-3 w-3 mr-1" />
          Light
        </TabsTrigger>
        <TabsTrigger 
          value="dark" 
          className=" px-2 py-1 text-xs"
        >
          <Moon className="h-3 w-3 mr-1" />
          Dark
        </TabsTrigger>
        <TabsTrigger 
          value="system" 
          className=" px-2 py-1 text-xs"
        >
          <SunMoon className="h-3 w-3 mr-1" />
          System
        </TabsTrigger>
      </TabsList>
    </Tabs>
  );
};

export default ThemeToggleTab;