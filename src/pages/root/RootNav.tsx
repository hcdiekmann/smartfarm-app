import { LogoIcon } from "@/components/ui/icons";
import { HomeIcon, Newspaper, Store, UserIcon } from "lucide-react";
import { Link, NavLink } from "react-router-dom";

export default function RootNav() {
        return (
          <div className="hidden border-r bg-muted/40 md:block">
            <div className="flex h-full max-h-screen flex-col gap-2">
              <div className="flex h-14 items-center border-b px-2 lg:h-[60px] lg:px-2">
                <Link to="/" className="flex items-center gap-1 ">
                  <LogoIcon className="mx-auto w-12 h-12 lg:w-16 lg:h-16 fill-current text-sfagreen dark:text-current" />
                  <span className="lg:text-xl font-baloo text-sfagreen dark:text-white pt-2">
                    Smart Farming Africa
                  </span>
                </Link>
              </div>
              <div className="flex-1">
                <nav className="grid items-start px-2 text-sm font-medium lg:px-4">
                  <NavLink
                    to="/"
                    className={({ isActive }) =>
                      `flex items-center gap-3 rounded-lg px-3 py-2 transition-all ${
                        isActive
                          ? "bg-muted text-primary"
                          : "text-muted-foreground hover:text-primary"
                      }`
                    }
                  >
                    <HomeIcon className="h-6 w-6" />
                    Home
                  </NavLink>
                  <NavLink
                    to="/news"
                    className={({ isActive }) =>
                      `flex items-center gap-3 rounded-lg px-3 py-2 transition-all ${
                        isActive
                          ? "bg-muted text-primary"
                          : "text-muted-foreground hover:text-primary"
                      }`
                    }
                  >
                    <Newspaper className="h-6 w-6" />
                    News
                  </NavLink>
                  <NavLink
                    to="/products"
                    className={({ isActive }) =>
                      `flex items-center gap-3 rounded-lg px-3 py-2 transition-all ${
                        isActive
                          ? "bg-muted text-primary"
                          : "text-muted-foreground hover:text-primary"
                      }`
                    }
                  >
                    <Store className="h-6 w-6" />
                    Store
                  </NavLink>
                  <NavLink
                    to="/account"
                    className={({ isActive }) =>
                      `flex items-center gap-3 rounded-lg px-3 py-2 transition-all ${
                        isActive
                          ? "bg-muted text-primary"
                          : "text-muted-foreground hover:text-primary"
                      }`
                    }
                  >
                    <UserIcon className="h-6 w-6" />
                    Account
                  </NavLink>
                </nav>
              </div>
            </div>
          </div>
        );
      };