import React from "react";
import { Outlet } from "react-router";
import Navbar from "../components/Navbar";
import MobileNav from "../components/MobileNav";
import QuestionModal from "../components/QuestionModal";

const MainLayout = () => {
  return (
    <div className="min-h-screen md:grid md:grid-cols-[16rem_1fr]">
      <Navbar />
      <MobileNav />

      <main className="min-w-0 px-4 pt-6 pb-28 md:px-10 md:pt-10 md:pb-12">
        <div className="mx-auto max-w-6xl">
          <Outlet />
        </div>
      </main>

      <QuestionModal />
    </div>
  );
};

export default MainLayout;
