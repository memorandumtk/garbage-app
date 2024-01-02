"use client";

import { useUser } from "@auth0/nextjs-auth0/client";
import { SignupButton } from "@/app/components/login-buttons/signup-button";
import { LoginButton } from "@/app/components/login-buttons/login-button";
import { LogoutButton } from "@/app/components/login-buttons/logout-button";
import { setCookie } from 'cookies-next';

export const NavBarButtons = () => {
  const { user } = useUser();

  setCookie('auth0userEmail', user?.email , {maxAge: 60 * 60 * 24});
  setCookie('auth0userSid', user?.sid , {maxAge: 60 * 60 * 24});


  return (
    <div className="nav-bar__buttons">
      {!user && (
        <>
          <SignupButton />
          <LoginButton />
        </>
      )}
      {user && (
        <>
          <LogoutButton />
        </>
      )}
    </div>
  );
};
