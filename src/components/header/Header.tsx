import {
  MenuIcon,
  UsersIcon,
} from "lucide-react";
import { AvatarMenu } from "./AvatarMenu";
import { LogoIcon, MoneyIcon, TractorIcon } from "../Icons";
import { ThemeToggle } from "./ThemeToggle";
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
} from "../ui/breadcrumb";
import { Button } from "../ui/button";
import { Sheet, SheetTrigger, SheetContent } from "../ui/sheet";

const Header = () => {
  return (
    <header className="flex h-14 items-center gap-2 border-b bg-muted/40 px-1 lg:h-[60px] lg:px-6">
          <div className="md:hidden">
            <a href="/">
              <LogoIcon className="w-12 h-12 fill-current text-sfagreen dark:text-current" />
            </a>
          </div>
          <div className="flex-1">
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem>
                  <BreadcrumbLink href="/farm">Farm Name</BreadcrumbLink>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
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
                  href="/farms"
                  className="mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 bg-muted text-foreground hover:text-foreground"
                >
                  <TractorIcon className="h-5 w-5" />
                  Assets
                </a>

                <a
                  href="/employees"
                  className="mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 text-muted-foreground hover:text-foreground"
                >
                  <UsersIcon className="h-5 w-5" />
                  People
                </a>
                <a
                  href="/finances"
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
