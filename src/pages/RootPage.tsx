import { useAuth } from "@/provider/AuthProvider";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
} from "@/components/ui/breadcrumb";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import {
  LineChartIcon,
  MenuIcon,
  ShoppingCartIcon,
  UsersIcon,
} from "lucide-react";
import { ThemeToggle } from "@/components/ThemeToggle";
import { FarmIcon, LogoIcon } from "@/components/Icons";
import { AvatarMenu } from "@/components/AvatarMenu";

const RootPage = () => {
  const { user } = useAuth();

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
                href="#"
                className="flex items-center gap-3 rounded-lg px-3 py-2 bg-muted text-primary text-muted-foreground transition-all hover:text-primary"
              >
                <FarmIcon className="h-5 w-5" />
                Farms
                <Badge className="ml-auto flex h-6 w-6 shrink-0 items-center bg-sfagreen dark:text-white justify-center rounded-full">
                  0
                </Badge>
              </a>
              <a
                href="#"
                className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
              >
                <UsersIcon className="h-5 w-5" />
                Employees
              </a>
              <a
                href="#"
                className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
              >
                <LineChartIcon className="h-5 w-5" />
                Finances
              </a>
              <a
                href="#"
                className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
              >
                <ShoppingCartIcon className="h-5 w-5" />
                Our Products{" "}
              </a>
            </nav>
          </div>
          <div className="mt-auto p-2">
            <ThemeToggle />
          </div>
        </div>
      </div>
      <div className="flex flex-col">
        <header className="flex h-14 items-center gap-4 border-b bg-muted/40 px-4 lg:h-[60px] lg:px-6">
          <div className="md:hidden">
            <a href="/">
              <LogoIcon className="w-12 h-12 fill-current text-sfagreen dark:text-current" />
            </a>
          </div>
          <div className="flex-1">
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem>
                  <BreadcrumbLink href="/">/</BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbItem>
                  <BreadcrumbLink href="/dashboard">Farms</BreadcrumbLink>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
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
              <nav className="grid gap-2 text-lg font-medium">
                <a
                  href="#"
                  className="mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 text-muted-foreground hover:text-foreground"
                >
                  <FarmIcon className="h-5 w-5" />
                  Farms
                </a>
                
                <a
                  href="#"
                  className="mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 text-muted-foreground hover:text-foreground"
                >
                  <UsersIcon className="h-5 w-5" />
                  Employees
                </a>
                <a
                  href="#"
                  className="mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 text-muted-foreground hover:text-foreground"
                >
                  <LineChartIcon className="h-5 w-5" />
                  Finances
                </a>
                <a
                  href="#"
                  className="mx-[-0.65rem] flex items-center gap-4 rounded-xl bg-muted px-3 py-2 text-foreground hover:text-foreground"
                >
                  <ShoppingCartIcon className="h-5 w-5" />
                  Our Products
                  <Badge className="ml-auto flex h-6 w-6 shrink-0 items-center justify-center rounded-full">
                    6
                  </Badge>
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
          <div className="flex items-center">
            <h1 className="text-lg font-semibold md:text-2xl">
              Welcome, {user?.user_metadata.name}
            </h1>
          </div>
          <div className="flex flex-1 items-center justify-center rounded-lg border border-dashed shadow-sm">
            <div className="flex flex-col items-center gap-1 text-center">
              <FarmIcon className="w-24 h-24 " />
              <h3 className="text-2xl font-bold tracking-tight">
                You have no farms
              </h3>
              <p className="text-sm text-muted-foreground">
                Get started by adding your first farm instance.
              </p>
              <Button className="mt-4">Create Farm</Button>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default RootPage;
