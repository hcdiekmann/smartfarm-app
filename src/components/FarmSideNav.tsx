import { Badge } from "@/components/ui/badge";
import { UsersIcon, LayoutPanelLeft } from "lucide-react";
import { LogoIcon, MoneyIcon, TractorIcon } from "@/components/Icons";
import { Link, useParams, useLocation } from "react-router-dom";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "./ui/tooltip";
import { Separator } from "./ui/separator";

export default function FarmSideNav() {
  const { shortRef } = useParams<{ shortRef: string }>();
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  return (
    <div className="hidden border-r bg-muted/40 md:block">
      <div className="flex h-full max-h-screen flex-col gap-2">
        <TooltipProvider>
          <div className="flex h-14 items-center border-b px-2 lg:h-[60px] lg:px-2">
            <Tooltip>
              <TooltipTrigger asChild>
                <Link to="/" className="flex items-center gap-1">
                  <LogoIcon className="mx-auto w-12 h-12 lg:w-16 lg:h-16 fill-current text-sfagreen dark:text-current" />
                  <span className="lg:text-xl font-baloo text-sfagreen dark:text-white pt-1">
                    Smart Farming Africa
                  </span>
                </Link>
              </TooltipTrigger>
              <TooltipContent>Home</TooltipContent>
            </Tooltip>
          </div>
        </TooltipProvider>
        <div className="flex-1">
          <nav className="grid items-start px-2 text-sm font-medium lg:px-4">
            <Link
              to={shortRef ? `/farm/${shortRef}` : "/farm"}
              className={`flex items-center gap-3 rounded-lg px-3 py-2 transition-all hover:text-primary ${
                isActive(shortRef ? `/farm/${shortRef}` : "/farm")
                  ? "bg-muted text-primary"
                  : "text-muted-foreground"
              }`}
            >
              <LayoutPanelLeft className="h-6 w-6" />
              Overview
            </Link>
            <Link
              to={shortRef ? `/farm/${shortRef}/assets` : "#"}
              className={`flex items-center gap-3 rounded-lg px-3 py-2 transition-all hover:text-primary ${
                isActive(`/farm/${shortRef}/assets`) ? "bg-muted text-primary" : "text-muted-foreground"
              }`}
            >
              <TractorIcon className="h-6 w-6" />
              Assets
              <Badge className="ml-auto flex h-6 w-6 shrink-0 items-center bg-muted text-current justify-center rounded-full">
                0
              </Badge>
            </Link>
            <Link
              to={shortRef ? `/farm/${shortRef}/people` : "#"}
              className={`flex items-center gap-3 rounded-lg px-3 py-2 transition-all hover:text-primary ${
                isActive(`/farm/${shortRef}/people`) ? "bg-muted text-primary" : "text-muted-foreground"
              }`}
            >
              <UsersIcon className="h-6 w-6" />
              People
              <Badge className="ml-auto flex h-6 w-6 shrink-0 items-center bg-muted text-current justify-center rounded-full">
                1
              </Badge>
            </Link>
            <Separator className="mt-1 mb-1" />
            <Link
              to={shortRef ? `/farm/${shortRef}/finances` : "#"}
              className={`flex items-center gap-3 rounded-lg px-3 py-2 transition-all hover:text-primary ${
                isActive(`/farm/${shortRef}/finances`) ? "bg-muted text-primary" : "text-muted-foreground"
              }`}
            >
              <MoneyIcon className="h-6 w-6" />
              Finances
            </Link>
          </nav>
        </div>
        <div className="mt-auto p-2"></div>
      </div>
    </div>
  );
}