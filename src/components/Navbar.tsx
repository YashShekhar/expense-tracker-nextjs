"use client";
import Link from "next/link";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { signOut, useSession } from "next-auth/react";
import { User } from "@/model/User";

const Navbar = () => {
  const { data: session } = useSession();
  const user: User = session?.user as User;

  return (
    <nav className="p-2 md:p-4 shadow-md">
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center">
        <a className="text-2xl font-bold mb-4 md:mb-0" href="#">
          Expense Tracker
        </a>
        {!session ? (
          <NavigationMenu>
            <NavigationMenuList>
              <NavigationMenuItem>
                <Link href="/sign-in" legacyBehavior passHref>
                  <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                    SignIn
                  </NavigationMenuLink>
                </Link>
                <Link href="/sign-up" legacyBehavior passHref>
                  <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                    SignUp
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
        ) : (
          <NavigationMenu>
            <NavigationMenuList>
              <NavigationMenuItem>
                <Link href="#" onClick={() => signOut()}>
                  <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                    SignOut
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
