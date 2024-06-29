import { Menu } from "lucide-react";
import { usePathname } from "next/navigation";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { dancing_script } from "./fonts";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ModeToggle } from "./theme-toggle";
import { signOut, useSession } from "next-auth/react";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/dashboard", label: "Dashboard" },
  { href: "/reserve", label: "Reserve" },
  { href: "/review", label: "Reviews" },
];

export default function Navbar() {
  const { data: session, status } = useSession();
  const isLoggedIn = status === "authenticated";
  // const router = useRouter();
  // const currentPath = router.pathname;
  // console.log(currentPath);
  const currentPath = usePathname();
  return (
    <header className="top-0 flex h-16 items-center gap-4 border-b bg-background px-4 md:px-6">
      <nav className="hidden flex-col gap-6 text-lg font-medium md:flex md:flex-row md:items-center md:gap-5 md:text-sm lg:gap-6">
        <Link
          href="/"
          className="flex items-center gap-2 text-lg font-semibold md:text-base flex-shrink-0 overflow-hidden whitespace-nowrap"
        >
          <span className={`${dancing_script.className} text-2xl font-bold`}>
            Sea Salon
          </span>
        </Link>
        {navLinks.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className={`transition-colors ${currentPath === link.href ? "text-foreground " : "text-muted-foreground hover:text-foreground"}`}
          >
            {link.label}
          </Link>
        ))}
      </nav>
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="outline" size="icon" className="shrink-0 md:hidden">
            <Menu className="h-5 w-5" />
            <span className="sr-only">Toggle navigation menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="left">
          <nav className="grid gap-6 text-lg font-medium">
            <Link
              href="#"
              className="flex items-center gap-2 text-lg font-semibold"
            >
              <span>Sea Salon</span>
            </Link>
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`transition-colors ${currentPath === link.href ? "text-foreground" : "text-muted-foreground hover:text-foreground"}`}
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </SheetContent>
      </Sheet>
      <div className="flex w-full items-center gap-4 md:ml-auto md:gap-2 lg:gap-4">
        <div className="ml-auto flex items-center gap-4">
          {!isLoggedIn ? (
            <Link href="/signin">
              <Button variant="outline">Sign In</Button>
            </Link>
          ) : (
            <Button variant="outline" onClick={() => signOut()}>
              Sign Out
            </Button>
          )}
          <ModeToggle />
        </div>
      </div>
    </header>
  );
}
