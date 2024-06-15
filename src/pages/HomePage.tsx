import { useState } from "react";
import { useAuth } from "@/provider/AuthProvider";
import useLogout from "@/hooks/useLogout";
import { Button } from "@/components/ui/button";
import { Toggle } from "@/components/ui/toggle";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { LogOut, Settings, User } from "lucide-react";

const HomePage = () => {
  const { user } = useAuth();
  const handleSignOut = useLogout();
  const [isDarkMode, setIsDarkMode] = useState(false);
  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    document.documentElement.classList.toggle("dark", !isDarkMode);
  };

  return (
    <div
      className={`grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr] ${
        isDarkMode ? "dark" : ""
      }`}
    >
      <div className="hidden border-r bg-muted/40 md:block">
        <div className="flex h-full max-h-screen flex-col gap-2">
          <div className="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6">
            <a href="#" className="flex items-center gap-2">
              <LogoIcon className="h-10 w-10" />
              <span className="font-baloo mt-1">Smart Farming Africa</span>
            </a>
          </div>
          <div className="flex-1">
            <nav className="grid items-start px-2 text-sm font-medium lg:px-4">
              <a
                href="#"
                className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
              >
                <HomeIcon className="h-4 w-4" />
                Dashboard
              </a>
              <a
                href="#"
                className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
              >
                <ShoppingCartIcon className="h-4 w-4" />
                Orders
                <Badge className="ml-auto flex h-6 w-6 shrink-0 items-center justify-center rounded-full">
                  6
                </Badge>
              </a>
              <a
                href="#"
                className="flex items-center gap-3 rounded-lg bg-muted px-3 py-2 text-primary transition-all hover:text-primary"
              >
                <PackageIcon className="h-4 w-4" />
                Products{" "}
              </a>
              <a
                href="#"
                className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
              >
                <UsersIcon className="h-4 w-4" />
                Customers
              </a>
              <a
                href="#"
                className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
              >
                <LineChartIcon className="h-4 w-4" />
                Analytics
              </a>
            </nav>
          </div>
          <div className="mt-auto p-4">
            <Card>
              <CardHeader className="p-2 pt-0 md:p-4">
                <CardTitle>Upgrade to Pro</CardTitle>
                <CardDescription>
                  Unlock all features and get unlimited access to our support
                  team.
                </CardDescription>
              </CardHeader>
              <CardContent className="p-2 pt-0 md:p-4 md:pt-0">
                <Button size="sm" className="w-full">
                  Upgrade
                </Button>
              </CardContent>
            </Card>
            <div className="mt-4 flex items-center justify-center">
              <Toggle aria-label="Toggle theme" onClick={toggleDarkMode}>
                <SunIcon className="h-5 w-5" />
                <MoonIcon className="h-5 w-5" />
              </Toggle>
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-col">
        <header className="flex h-14 items-center gap-4 border-b bg-muted/40 px-4 lg:h-[60px] lg:px-6">
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
            <SheetContent side="left" className="flex flex-col">
              <nav className="grid gap-2 text-lg font-medium">
                <a
                  href="#"
                  className="flex items-center gap-2 text-lg"
                >
                  <LogoIcon className="h-10 w-10" />
                  <span className="font-baloo">Smart Farming Africa</span>
                </a>
                <a
                  href="#"
                  className="mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 text-muted-foreground hover:text-foreground"
                >
                  <HomeIcon className="h-5 w-5" />
                  Dashboard
                </a>
                <a
                  href="#"
                  className="mx-[-0.65rem] flex items-center gap-4 rounded-xl bg-muted px-3 py-2 text-foreground hover:text-foreground"
                >
                  <ShoppingCartIcon className="h-5 w-5" />
                  Orders
                  <Badge className="ml-auto flex h-6 w-6 shrink-0 items-center justify-center rounded-full">
                    6
                  </Badge>
                </a>
                <a
                  href="#"
                  className="mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 text-muted-foreground hover:text-foreground"
                >
                  <PackageIcon className="h-5 w-5" />
                  Products
                </a>
                <a
                  href="#"
                  className="mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 text-muted-foreground hover:text-foreground"
                >
                  <UsersIcon className="h-5 w-5" />
                  Customers
                </a>
                <a
                  href="#"
                  className="mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 text-muted-foreground hover:text-foreground"
                >
                  <LineChartIcon className="h-5 w-5" />
                  Analytics
                </a>
              </nav>
              <div className="mt-auto">
                <Card>
                  <CardHeader>
                    <CardTitle>Upgrade to Pro</CardTitle>
                    <CardDescription>
                      Unlock all features and get unlimited access to our
                      support team.
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Button size="sm" className="w-full">
                      Upgrade
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </SheetContent>
          </Sheet>
          <div className="flex-1">
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem>
                  <BreadcrumbLink href="/">Home</BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbLink href="/products">Products</BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbPage>Inventory</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="secondary" size="icon" className="rounded-full">
                <CircleUserIcon className="h-5 w-5" />
                <span className="sr-only">Toggle user menu</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <User className="mr-2 h-4 w-4" />
                <span>Profile</span>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Settings className="mr-2 h-4 w-4" />
                <span>Settings</span>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={handleSignOut}>
                <LogOut className="mr-2 h-4 w-4" />
                <span>Logout</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </header>
        <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
          <div className="flex items-center">
            <h1 className="text-lg font-semibold md:text-2xl">
              Welcome, {user?.user_metadata.name}
            </h1>
          </div>
          <div className="flex flex-1 items-center justify-center rounded-lg border border-dashed shadow-sm">
            <div className="flex flex-col items-center gap-1 text-center">
              <h3 className="text-2xl font-bold tracking-tight">
                You have no products
              </h3>
              <p className="text-sm text-muted-foreground">
                You can start selling as soon as you add a product.
              </p>
              <Button className="mt-4">Add Product</Button>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

function CircleUserIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="10" />
      <circle cx="12" cy="10" r="3" />
      <path d="M7 20.662V19a2 2 0 0 1 2-2h6a2 2 0 0 1 2 2v1.662" />
    </svg>
  );
}

function HomeIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
      <polyline points="9 22 9 12 15 12 15 22" />
    </svg>
  );
}

function LineChartIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M3 3v18h18" />
      <path d="m19 9-5 5-4-4-3 3" />
    </svg>
  );
}

function MenuIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <line x1="4" x2="20" y1="12" y2="12" />
      <line x1="4" x2="20" y1="6" y2="6" />
      <line x1="4" x2="20" y1="18" y2="18" />
    </svg>
  );
}

function MoonIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z" />
    </svg>
  );
}

function LogoIcon(props: any) {
  return (
    <svg
      {...props}
      viewBox="100 100 824 824"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g
        transform="matrix(0.10000000149011612, 0, 0, -0.10000000149011612, 0, 1024)"
        fill="#00431C"
        stroke="none"
      >
        <path d="M 4585 8050 L 4557 8021 L 4605 7963 C 4631 7931 4667 7876 4684 7840 C 4712 7781 4715 7766 4715 7674 C 4715 7579 4713 7570 4685 7524 C 4647 7463 4569 7414 4496 7405 C 4468 7402 4175 7400 3845 7402 C 3177 7405 3202 7403 3143 7474 C 3040 7599 3070 7840 3204 7975 L 3248 8018 L 3221 8044 C 3206 8058 3190 8070 3185 8070 C 3166 8070 3026 7954 2969 7891 C 2810 7716 2773 7460 2878 7266 C 2911 7206 2988 7119 3036 7089 L 3070 7068 L 3050 7036 C 3020 6987 2984 6884 2970 6805 C 2958 6741 2952 6728 2890 6655 C 2853 6611 2781 6530 2730 6475 C 2679 6420 2631 6361 2624 6343 C 2615 6322 2610 6271 2610 6195 C 2610 6068 2617 6045 2670 5995 L 2701 5965 L 2903 5960 C 3087 5955 3109 5953 3151 5932 C 3249 5884 3333 5784 3376 5664 C 3410 5573 3420 5442 3420 5118 C 3420 4651 3441 4465 3516 4249 C 3569 4097 3619 3998 3705 3877 C 3747 3817 3788 3754 3795 3737 C 3802 3719 3834 3606 3865 3485 C 3896 3364 3937 3224 3956 3174 L 3990 3082 L 3990 2601 L 3990 2120 L 4183 2122 L 4375 2125 L 4380 2600 C 4383 2861 4389 3082 4393 3091 C 4403 3111 4443 3130 4476 3130 C 4491 3130 4514 3118 4531 3101 L 4560 3072 L 4560 2601 C 4560 2343 4563 2130 4568 2128 C 4572 2126 4659 2126 4763 2128 L 4950 2131 L 4950 2601 C 4950 2935 4953 3078 4961 3093 C 4968 3105 4988 3132 5006 3153 L 5040 3190 L 5040 3903 L 5040 4615 L 5219 4795 C 5318 4894 5407 4976 5417 4978 C 5429 4980 5489 4926 5595 4820 L 5755 4660 L 6128 4660 L 6501 4660 L 6598 4567 L 6695 4474 L 6725 4489 C 6781 4517 6839 4515 6900 4483 C 6979 4441 7013 4389 7018 4302 C 7021 4246 7018 4228 6998 4190 C 6931 4065 6761 4043 6655 4145 C 6612 4187 6590 4236 6590 4290 C 6590 4308 6568 4337 6512 4393 L 6435 4470 L 6048 4470 L 5662 4470 L 5541 4598 L 5420 4725 L 5330 4634 L 5240 4543 L 5240 4106 C 5240 3866 5243 3670 5248 3670 C 5252 3670 5278 3685 5305 3703 C 5491 3827 5839 3990 5918 3990 C 5954 3990 6009 3928 6114 3770 C 6163 3696 6267 3543 6344 3430 L 6485 3225 L 6490 2675 L 6495 2125 L 6667 2122 L 6838 2120 L 6842 2782 L 6846 3445 L 6802 3528 C 6778 3574 6760 3614 6763 3616 C 6765 3619 6799 3575 6838 3518 C 6876 3461 6935 3381 6969 3340 L 7030 3266 L 7030 2693 L 7030 2120 L 7213 2122 L 7395 2125 L 7400 2757 C 7403 3104 7408 3391 7411 3395 C 7419 3403 7499 3249 7539 3148 C 7586 3028 7630 2943 7666 2902 L 7698 2865 L 7693 2955 C 7688 3029 7692 3068 7715 3174 C 7736 3272 7741 3321 7738 3379 C 7733 3470 7714 3515 7625 3654 C 7506 3841 7516 3786 7509 4320 C 7502 4818 7499 4848 7444 5012 C 7356 5278 7160 5514 6932 5629 L 6647.653 5743.125 L 6641.158 5001.572 C 6633.759 4584.004 6802.916 4909.248 6766.822 4914.641 C 6692.513 4925.743 6744 4799 6688 4849 C 6656 4877 6655 4881 6658 4942 C 6660 4977 6662 5171 6663 5373 C 6665 5734 6661.87 5740.804 6641.87 5744.804 C 6630.87 5746.804 6603 5754 6575 5759 C 6482 5779 6391 5790 6133 5815 C 5689 5858 5648 5873 5439 6067 C 5386 6116 5320 6173 5291 6193 L 5240 6230 L 5240 5802 C 5240 5482 5243 5371 5252 5362 C 5261 5353 5368 5350 5672 5350 L 6080 5350 L 6117 5391 C 6137 5413 6167 5439 6184 5447 C 6229 5471 6325 5468 6375 5443 C 6425 5417 6443 5397 6469 5340 C 6521 5226 6467 5096 6351 5055 C 6264 5025 6195 5042 6126 5111 L 6077 5160 L 5637 5162 L 5196 5165 L 5118 5255 L 5040 5345 L 5038 5835 L 5035 6324 L 4935 6357 C 4880 6375 4825 6389 4812 6390 L 4790 6390 L 4796 5843 L 4802 5295 L 4845 5258 C 4922 5190 4942 5083 4895 4990 C 4861 4923 4810 4890 4731 4883 C 4649 4875 4571 4912 4529 4978 C 4472 5068 4478 5153 4545 5228 L 4590 5278 L 4590 5844 L 4590 6410 L 4465 6410 L 4340 6410 L 4340 5686 L 4340 4961 L 4365 4892 C 4379 4853 4406 4788 4425 4746 L 4460 4669 L 4460 4371 L 4460 4074 L 4490 4052 C 4536 4017 4564 3955 4565 3884 C 4565 3762 4478 3678 4350 3679 C 4235 3679 4150 3757 4142 3870 C 4136 3950 4153 3991 4210 4043 L 4259 4088 L 4260 4363 L 4261 4638 L 4198 4761 L 4135 4885 L 4130 5505 L 4125 6125 L 4008 6011 L 3890 5897 L 3890 5318 L 3890 4739 L 3943 4687 C 3984 4647 3999 4624 4009 4587 C 4028 4507 4009 4441 3948 4383 C 3905 4342 3872 4330 3798 4330 C 3751 4330 3727 4336 3695 4354 C 3569 4428 3554 4608 3665 4697 L 3700 4725 L 3700 5351 L 3700 5977 L 3833 6106 C 3906 6177 4001 6268 4043 6309 L 4120 6382 L 4120 6516 L 4120 6649 L 4184 6619 C 4282 6573 4351 6564 4441 6584 C 4510 6599 4633 6659 4698 6709 L 4722 6726 L 4643 6778 C 4477 6887 4368 6908 4210 6860 C 4191 6855 4163 6850 4148 6850 L 4120 6850 L 4120 6944 L 4120 7038 L 4348 7043 C 4589 7048 4634 7055 4735 7104 C 4801 7137 4899 7239 4934 7313 C 4963 7376 4990 7478 4990 7530 C 4990 7649 4927 7800 4836 7897 C 4788 7949 4672 8045 4624 8073 C 4618 8076 4600 8066 4585 8050 Z M 3856 6865 C 3844 6833 3770 6731 3744 6711 C 3720 6692 3704 6690 3599 6690 C 3533 6690 3480 6693 3480 6696 C 3480 6706 3610 6868 3623 6873 C 3629 6876 3686 6879 3749 6879 C 3846 6880 3861 6878 3856 6865 Z" />
        <path
          d="M6227 5302 c-22 -25 -21 -75 1 -95 28 -25 87 -22 106 5 22 32 20 61&#10;-7 86 -29 27 -78 29 -100 4z"
        />
        <path
          d="M4665 5148 c-64 -56 -1 -152 74 -113 44 22 54 67 24 103 -29 34 -66&#10;37 -98 10z"
        />
        <path
          d="M3755 4585 c-14 -13 -25 -33 -25 -45 0 -29 44 -70 75 -70 30 0 75 41&#10;75 67 0 23 -9 35 -40 56 -34 23 -57 21 -85 -8z"
        />
        <path
          d="M6762 4344 c-32 -22 -30 -76 4 -103 15 -12 34 -21 44 -21 10 0 29 9&#10;44 21 53 41 24 119 -44 119 -14 0 -36 -7 -48 -16z"
        />
        <path
          d="M4300 3940 c-42 -42 -10 -120 49 -120 43 0 74 30 73 71 -2 62 -78 93&#10;-122 49z"
        />
      </g>
    </svg>
  );
}

function PackageIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m7.5 4.27 9 5.15" />
      <path d="M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z" />
      <path d="m3.3 7 8.7 5 8.7-5" />
      <path d="M12 22V12" />
    </svg>
  );
}

function ShoppingCartIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="8" cy="21" r="1" />
      <circle cx="19" cy="21" r="1" />
      <path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12" />
    </svg>
  );
}

function SunIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2v2" />
      <path d="M12 20v2" />
      <path d="m4.93 4.93 1.41 1.41" />
      <path d="m17.66 17.66 1.41 1.41" />
      <path d="M2 12h2" />
      <path d="M20 12h2" />
      <path d="m6.34 17.66-1.41 1.41" />
      <path d="m19.07 4.93-1.41 1.41" />
    </svg>
  );
}

function UsersIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
  );
}

export default HomePage;
