import { Routes, Route, NavLink, Link } from "react-router-dom";
import { LogoIcon, HomeIcon } from "@/components/Icons";
import { UserIcon, Store, Newspaper } from "lucide-react";
import Home from "./Home";
import Account from "./Account";
import Header from "@/components/header/Header";

const Nav = () => {
  return (
    <div className="hidden border-r bg-muted/40 md:block">
      <div className="flex h-full max-h-screen flex-col gap-2">
        <div className="flex h-14 items-center border-b px-2 lg:h-[60px] lg:px-2">
          <Link to="/" className="flex items-center gap-1 ">
            <LogoIcon className="mx-auto w-12 h-12 lg:w-16 lg:h-16 fill-current text-sfagreen dark:text-current" />
            <span className="lg:text-xl font-baloo text-sfagreen dark:text-white pt-1">
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
              to="/store"
              className={({ isActive }) =>
                `flex items-center gap-3 rounded-lg px-3 py-2 transition-all ${
                  isActive
                    ? "bg-muted text-primary"
                    : "text-muted-foreground hover:text-primary"
                }`
              }
            >
              <Store className="h-6 w-6" />
              Our Products
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

// const Header = () => {
//   const location = useLocation();
//   const pathNames = location.pathname.split("/").filter((x) => x);

//   return (
//     <header className="flex h-14 items-center gap-2 border-b bg-muted/40 px-1 lg:h-[60px] lg:px-6">
//       <div className="md:hidden">
//         <a href="/">
//           <LogoIcon className="w-12 h-12 fill-current text-sfagreen dark:text-current" />
//         </a>
//       </div>
//       <div className="flex-1">
//         <Breadcrumb>
//           <BreadcrumbList>
//             {pathNames.map((name, index) => {
//               const routeTo = `/${pathNames.slice(0, index + 1).join("/")}`;
//               const isLast = index === pathNames.length - 1;
//               return (
//                 <BreadcrumbItem key={name}>
//                   {isLast ? (
//                     <span>{name.charAt(0).toUpperCase() + name.slice(1)}</span>
//                   ) : (
//                     <BreadcrumbLink href={routeTo}>
//                       {name.charAt(0).toUpperCase() + name.slice(1)}
//                     </BreadcrumbLink>
//                   )}
//                   {!isLast && <BreadcrumbSeparator />}
//                 </BreadcrumbItem>
//               );
//             })}
//           </BreadcrumbList>
//         </Breadcrumb>
//       </div>
//     </header>
//   );
// };

const RootPage = () => {
  return (
    <div className="grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">
      <Nav />
      <div className="flex flex-col">
        <Header />
        <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/account" element={<Account />} />
            {/* Add more routes here as needed */}
          </Routes>
        </main>
      </div>
    </div>
  );
};

export default RootPage;
