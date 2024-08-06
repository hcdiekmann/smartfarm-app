import { Link } from "react-router-dom";
import { LogoIcon } from "@/components/ui/icons";
import { RootNavItems } from './RootNavItems';

export default function RootNav() {
  return (
    <div className="hidden border-r bg-muted/40 md:block">
      <div className="flex h-full max-h-screen flex-col">
        <div className="flex h-14 items-center border-b px-2 lg:h-[60px] lg:px-2">
          <Link to="/" className="flex items-center gap-1">
            <LogoIcon className="mx-auto w-12 h-12 lg:w-16 lg:h-16 fill-current text-sfagreen dark:text-current" />
            <span className="lg:text-xl font-baloo text-sfagreen dark:text-white pt-2">
              Smart Farming Africa
            </span>
          </Link>
        </div>
        <div className="flex-1 overflow-auto">
          <RootNavItems />
        </div>
      </div>
    </div>
  );
}