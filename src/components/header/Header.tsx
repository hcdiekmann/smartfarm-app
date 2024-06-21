import {
  Sheet,
  MenuIcon,
  UsersIcon,
  LineChartIcon,
  ShoppingCartIcon,
} from "lucide-react";
import { AvatarMenu } from "./AvatarMenu";
import { LogoIcon, FarmIcon } from "../Icons";
import { ThemeToggle } from "./ThemeToggle";
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbSeparator,
  BreadcrumbItem,
  BreadcrumbLink,
} from "../ui/breadcrumb";
import { Button } from "../ui/button";
import { SheetTrigger, SheetContent } from "../ui/sheet";

const Header = () => {
  return (
    <header className="flex h-14 items-center gap-4 border-b bg-muted/40 px-2 lg:h-[60px] lg:px-6">
      <div className="md:hidden">
        <a href="/">
          <LogoIcon className="w-12 h-12 fill-current text-sfagreen dark:text-current" />
        </a>
      </div>
      <div className="flex-1">
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink href="/farms">Farms</BreadcrumbLink>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>
      <div className="hidden md:block">
        <ThemeToggle />
      </div>
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="outline" size="icon" className="shrink-0 md:hidden">
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
              <FarmIcon className="h-5 w-5" />
              Farms
            </a>

            <a
              href="/employees"
              className="mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 text-muted-foreground hover:text-foreground"
            >
              <UsersIcon className="h-5 w-5" />
              Employees
            </a>
            <a
              href="/finances"
              className="mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 text-muted-foreground hover:text-foreground"
            >
              <LineChartIcon className="h-5 w-5" />
              Finances
            </a>
            <a
              href="#"
              className="mx-[-0.65rem] flex items-center gap-4 rounded-xl  px-3 py-2 text-muted-foreground hover:text-foreground"
            >
              <ShoppingCartIcon className="h-5 w-5" />
              Our Products
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
