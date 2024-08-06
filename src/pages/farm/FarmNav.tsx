import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { LogoIcon } from "@/components/ui/icons";
import { FarmNavItems } from "./FarmNavItems";

export default function FarmNav() {
  const { shortRef } = useParams<{ shortRef: string }>();

  return (
    <div className="hidden border-r bg-muted/40 md:block">
      <div className="flex h-full max-h-screen flex-col gap-2">
        <TooltipProvider>
          <div className="flex h-14 items-center border-b px-2 lg:h-[60px] lg:px-2">
            <Tooltip>
              <TooltipTrigger asChild>
                <Link to="/" className="flex items-center gap-1">
                  <LogoIcon className="mx-auto w-12 h-12 lg:w-16 lg:h-16 fill-current text-sfagreen dark:text-current" />
                  <span className="lg:text-xl font-baloo text-sfagreen dark:text-white pt-2">
                    Smart Farming Africa
                  </span>
                </Link>
              </TooltipTrigger>
              <TooltipContent>Home</TooltipContent>
            </Tooltip>
          </div>
        </TooltipProvider>
        <div className="flex-1 px-2 lg:px-4">
          <FarmNavItems shortRef={shortRef!} />
        </div>
        <div className="mt-auto p-2"></div>
      </div>
    </div>
  );
}