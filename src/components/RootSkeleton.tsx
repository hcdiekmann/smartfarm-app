import { Skeleton } from "@/components/ui/skeleton";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList } from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { MenuIcon } from "lucide-react";
import { LogoIcon } from "@/components/Icons";

const RootSkeleton = () => {
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
              <Skeleton className="h-10 w-full mb-2 rounded-lg" />
              <Skeleton className="h-10 w-full mb-2 rounded-lg" />
              <Skeleton className="h-10 w-full mb-2 rounded-lg" />
              <Skeleton className="h-10 w-full mb-2 rounded-lg" />
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
                <BreadcrumbItem>
                  <BreadcrumbLink href="#">
                    <Skeleton className="h-4 w-20" />
                  </BreadcrumbLink>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>
          <div className="hidden md:block">
            <Skeleton className="h-[1.1rem] w-[1.2rem]" />
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
                <Skeleton className="h-10 w-full mb-2 rounded-lg" />
                <Skeleton className="h-10 w-full mb-2 rounded-lg" />
                <Skeleton className="h-10 w-full mb-2 rounded-lg" />
                <Skeleton className="h-10 w-full mb-2 rounded-lg" />
              </nav>
              <div className="mt-auto flex items-center justify-between">
              <Skeleton className="h-[1.1rem] w-[1.2rem]" />
              <Skeleton className="h-10 w-10 rounded-full" />
              </div>
            </SheetContent>
          </Sheet>
          <div className="hidden md:block">
            <Skeleton className="h-10 w-10 rounded-full" />
          </div>
        </header>
        <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
          <div className="flex flex-1 items-center justify-center rounded-lg border border-dashed shadow-sm">
            <div className="flex flex-col items-center gap-1 text-center">
              <Skeleton className="w-24 h-24 rounded-full" />
              <Skeleton className="h-8 w-40 mt-4" />
              <Skeleton className="h-4 w-64 mt-2" />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default RootSkeleton;
