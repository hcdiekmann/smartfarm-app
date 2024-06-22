import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import {
  MenuIcon,
  UsersIcon,
} from "lucide-react";
import { ThemeToggle } from "@/components/header/ThemeToggle";
import { LogoIcon, MoneyIcon, ShoppingBasketIcon, TractorIcon } from "@/components/Icons";
import { AvatarMenu } from "@/components/header/AvatarMenu";
import OverviewPage from "./OverviewPage";

const RootPage = () => {
  return (
    <div className="grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">
      <div className="hidden border-r bg-muted/40 md:block">
        <div className="flex h-full max-h-screen flex-col gap-2">
          <div className="flex h-14 items-center border-b px-2 lg:h-[60px] lg:px-2">
            <a href="/" className="flex items-center gap-1 ">
              <LogoIcon className="mx-auto w-12 h-12 lg:w-16 lg:h-16 fill-current text-sfagreen dark:text-current" />
              <span className="lg:text-xl font-baloo text-sfagreen dark:text-white pt-1">
                Smart Farming Africa
              </span>
            </a>
          </div>
          <div className="flex-1">
            <nav className="grid items-start px-2 text-sm font-medium lg:px-4">
              <a
                href="/assets"
                className="flex items-center gap-3 rounded-lg px-3 py-2 bg-muted text-primary text-muted-foreground transition-all hover:text-primary"
              >
                <TractorIcon className="h-6 w-6" />
                Assets
                <Badge className="ml-auto flex h-6 w-6 shrink-0 items-center dark:text-muted justify-center rounded-full">
                  0
                </Badge>
              </a>
              <a
                href="#"
                className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
              >
                <UsersIcon className="h-6 w-6" />
                People
                <Badge className="ml-auto flex h-6 w-6 shrink-0 items-center bg-muted text-current justify-center rounded-full">
                  0
                </Badge>
              </a>
              <a
                href="#"
                className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
              >
                <MoneyIcon className="h-6 w-6" />
                Finances
              </a>
              <a
                href="#"
                className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
              >
                <ShoppingBasketIcon className="h-6 w-6" />
                Our Products
              </a>
            </nav>
          </div>
          <div className="mt-auto p-2"></div>
        </div>
      </div>
      <div className="flex flex-col">
        <header className="flex h-14 items-center gap-2 border-b bg-muted/40 px-1 lg:h-[60px] lg:px-6">
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
                <a
                  href="#"
                  className="mx-[-0.65rem] flex items-center gap-4 rounded-xl  px-3 py-2 text-muted-foreground hover:text-foreground"
                >
                  <ShoppingBasketIcon className="h-5 w-5" />
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
        <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
          <OverviewPage />
        </main>
      </div>
    </div>
  );
};

export default RootPage;
