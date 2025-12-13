"use client";


import Sidebar from "./Components/Sidebar";
import Header from "./Components/Header";

export default function WorkerLayout({ children }: { children: React.ReactNode }) {
  

  return (
    <div className="flex h-screen bg-gray-900 text-white">
      {/* Sidebar */}
      <Sidebar isOpen={false} setIsOpen={function (): void {
              throw new Error("Function not implemented.");
          } }  />

      {/* Main Section */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header onMenuClick={function (): void {
                  throw new Error("Function not implemented.");
              } }  />
        <main className="flex-1 overflow-y-auto p-4">{children}</main>
      </div>
    </div>
  );
}