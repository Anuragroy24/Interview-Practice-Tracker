import React from "react";
import { NavLink } from "react-router";
import { LayoutDashboard, ListChecks, Plus } from "lucide-react";
import { useTracker } from "../hooks/useTracker";
import Logo from "./Logo";
import ProgressBar from "./ProgressBar";
import Button from "./Button";

const linkClass = ({ isActive }) =>
  `flex items-center gap-3 rounded-xl px-3.5 py-2.5 font-medium transition-colors ${
    isActive
      ? "bg-mark font-semibold text-ink"
      : "text-ink-soft hover:bg-paper hover:text-ink"
  }`;

// desktop sidebar (mobile uses MobileNav)
const Navbar = () => {
  const { stats, openAddForm } = useTracker();

  return (
    <aside className="sticky top-0 hidden h-screen flex-col justify-between self-start border-r border-line bg-white px-5 py-6 md:flex">
      <div className="flex flex-col gap-10">
        <Logo />

        <nav className="flex flex-col gap-1.5">
          <NavLink to={"/"} end className={linkClass}>
            <LayoutDashboard size={19} />
            Dashboard
          </NavLink>
          <NavLink to={"/tracker"} className={linkClass}>
            <ListChecks size={19} />
            Questions
          </NavLink>
        </nav>
      </div>

      <div className="flex flex-col gap-4">
        {/* Mini progress */}
        <div className="rounded-2xl bg-paper p-4">
          <div className="flex items-baseline justify-between">
            <p className="text-sm font-semibold">This week</p>
            <p className="font-display text-xl font-bold">
              {stats.percentage}%
            </p>
          </div>
          <div className="mt-3">
            <ProgressBar value={stats.percentage} label="Overall progress" />
          </div>
          <p className="mt-2 text-sm text-ink-mute">
            {stats.completed} of {stats.total} completed
          </p>
        </div>

        <Button icon={Plus} onClick={openAddForm}>
          Add question
        </Button>
      </div>
    </aside>
  );
};

export default Navbar;
