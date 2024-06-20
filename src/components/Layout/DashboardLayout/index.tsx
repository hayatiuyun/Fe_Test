import React from "react";
import Header from "./Header";

interface DashboardLayoutProps {
  children: React.ReactNode;
  title: string | null | any;
}

const DashboardLayout = ({ children, title }: DashboardLayoutProps) => {
  return (
    <main className="min-h-screen w-full relative ">
             <div className="relative">
             <Header />
             </div>

      <div className=" m-2 md:m-4 lg:mx-10">
        <div className="mb-4">
          <h1 className="font-bold text-2xl">{title}</h1>
        </div>
        <div className="bg-white/30 backdrop-blur-sm border-2 rounded-lg p-5 border-primary-700/5">
          {children}
        </div>
      </div>
    </main>
  );
};

export default DashboardLayout;
