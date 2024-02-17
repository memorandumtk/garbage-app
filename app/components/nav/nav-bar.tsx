import React from "react";
import { NavBarButtons } from "./nav-bar-buttons";
import { NavBarTabs } from "./nav-bar-tabs";

export const NavBar: React.FC = () => {
  return (
    <div className="nav-bar__container">
        <h1 className="nav-bar__logo">Garbage Box Finder</h1>
      <nav className="nav-bar">
        <NavBarTabs />
        <NavBarButtons />
      </nav>
    </div>
  );
};
