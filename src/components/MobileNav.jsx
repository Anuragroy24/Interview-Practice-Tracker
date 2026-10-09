import React from "react";
import { NavLink } from "react-router";
import { LayoutDashboard, ListChecks, Plus } from "lucide-react";
import { useTracker } from "../hooks/useTracker";
import Logo from "./Logo";

const tabClass = ({ isActive }) =>
  `flex flex-col items-center gap-1 text-xs font-semibold ${
    isActive ? "text-ink" : "text-ink-mute"
  }`;

const pillClass = (isActive) =>
  `flex h-8 w-14 items-center justify-center rounded-full transition-colors ${
    isActive ? "bg-mark" : ""
  }`;

// top bar + bottom tabs for small screens
const MobileNav = () => {
  const { stats, openAddForm } = useTracker();

  return (
    <>
      {/* Top bar */}
      <header className="sticky top-0 z-30 flex items-center justify-between border-b border-line bg-white/90 px-4 py-3 backdrop-blur md:hidden">
        <Logo />
        <span className="font-display text-lg font-bold">
          {stats.percentage}%
        </span>
      </header>

      {/* Bottom tabs */}
      <nav className="fixed inset-x-0 bottom-0 z-30 grid grid-cols-3 items-center border-t border-line bg-white px-4 pt-2 pb-[max(0.5rem,env(safe-area-inset-bottom))] md:hidden">
        <NavLink to={"/"} end className={tabClass}>
          {({ isActive }) => (
            <>
              <span className={pillClass(isActive)}>
                <LayoutDashboard size={20} />
              </span>
              Dashboard
            </>
          )}
        </NavLink>

        <button
          type="button"
          onClick={openAddForm}
          aria-label="Add question"
          className="mx-auto -mt-6 flex h-14 w-14 cursor-pointer items-center justify-center rounded-full bg-ink text-white shadow-lg ring-4 ring-white"
        >
          <Plus size={26} />
        </button>

        <NavLink to={"/tracker"} className={tabClass}>
          {({ isActive }) => (
            <>
              <span className={pillClass(isActive)}>
                <ListChecks size={20} />
              </span>
              Questions
            </>
          )}
        </NavLink>
      </nav>
    </>
  );
};

export default MobileNav;
