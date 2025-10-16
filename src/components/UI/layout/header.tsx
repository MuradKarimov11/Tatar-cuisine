"use client";

import { layoutConfig } from "@/config/layout.config";
import { SITE_CONFIG } from "@/config/site.config";
import {Navbar, NavbarBrand, NavbarContent, NavbarItem, Link, Button} from "@heroui/react";
import Image from "next/image";
import { usePathname } from "next/navigation";
import RegistrationModal from "../modals/registration.modal";
import LoginModal from "../modals/login.modal";
import {  useState } from "react";
import { signOutFunc } from "@/actions/sign-out";
import { useAuthStore } from "@/store/auth-store";

export const Logo = () => {
  return (
    <Image src="/vercel.svg" alt={SITE_CONFIG.title} width={26} height={26} priority/>
  );
};

export default function Header() {

  const [isRegistrationOpen, setIsRegistrationOpen] = useState(false);
  const [isLoginOpen, setIsLoginOpen] = useState(false);

  const {isAuth, session, status, setAuthState} = useAuthStore();

  const pathname = usePathname();

  const { navItems } = SITE_CONFIG;

  const handleSignOut = async () => {
    try {
      await signOutFunc();
    } catch (error) {
      console.log("error", error);
    }

    setAuthState(null, "unauthenticated");
  }

  const getNavItems = () => {
    return (navItems.map((item) => {
      const isActive = pathname === item.href;
      return (
        <NavbarItem key={item.href}>
          <Link color="foreground" href={item.href} 
            className={`px-3 py-1 ${isActive ? "text-blue-500" : "text-foreground"} 
            hover:text-blue-300 hover:border hover:border-blue-300 hover:rounded-md transition-colors transition-border duration-200`}
          >
            {item.label}
          </Link>
        </NavbarItem>
      )      
    }));
  };

  return (
    <Navbar style={{height: layoutConfig.headerHeight}}>
      <NavbarBrand>
        <Link href="/" className="flex  gap-1">
          <Logo />
          <p className="font-bold text-inherit">{SITE_CONFIG.title}</p>
        </Link>
      </NavbarBrand>

      <NavbarContent className="hidden sm:flex gap-4" justify="center">
          {getNavItems()}
      </NavbarContent>

      
      <NavbarContent justify="end">
        {isAuth && <p>Welcome, {session?.user?.email}!</p> }
        {status === "loading" ? <p>Loading...</p> :  !isAuth ? (
          <>
            <NavbarItem>
              <Button 
                as={Link} 
                color="secondary" 
                href="#" 
                variant="flat"
                onPress={() => setIsLoginOpen(true)}
              >
                Sign Up
              </Button>
            </NavbarItem>

            <NavbarItem>
              <Button 
                as={Link} 
                color="primary" 
                href="#" 
                variant="flat"
                onPress={() => setIsRegistrationOpen(true)}
              >
                Sign Up
              </Button>
            </NavbarItem>

          </> ) : (
          <NavbarItem className="hidden lg:flex">
            <Button 
              as={Link} 
              color="primary" 
              href="#" 
              variant="flat"
              onPress={handleSignOut}
            >
              Login
            </Button>
          </NavbarItem>
        )       
      }
      </NavbarContent>
      


      <RegistrationModal 
        isOpen={isRegistrationOpen} 
        onClose={() => setIsRegistrationOpen(false)} 
      />   
      <LoginModal 
        isOpen={isLoginOpen}
        onClose={() => setIsLoginOpen(false)}
      />

    </Navbar>
  );
}

