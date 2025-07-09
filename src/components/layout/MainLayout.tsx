
import React, { useState } from 'react';
import Header from './Header';
import Sidebar from './Sidebar';
import MobileSidebarToggle from './MobileSidebarToggle';

interface MainLayoutProps {
  children: React.ReactNode;
}

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      {/* Mobile: Floating hamburger to open sidebar, only visible if sidebar is closed */}
      {!sidebarOpen && <MobileSidebarToggle onClick={() => setSidebarOpen(true)} />}
      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar:
            - Hidden on mobile unless toggled
            - Shown always on md+ screens
        */}
        <Sidebar
          className={`
            ${sidebarOpen ? 'fixed top-0 left-0 z-50 flex flex-col w-64 max-w-[80vw] bg-background h-full shadow-lg md:shadow-none' : 'hidden md:flex'}
            transition-transform
          `}
          open={sidebarOpen}
          onClose={() => setSidebarOpen(false)}
        />
        {/* Overlay for mobile when sidebar is open */}
        {sidebarOpen && (
          <div
            className="fixed inset-0 z-40 bg-black/40 md:hidden"
            onClick={() => setSidebarOpen(false)}
            aria-label="Sidebar overlay"
          />
        )}
        <main className="flex-1 overflow-auto p-3 sm:p-6">{children}</main>
      </div>
    </div>
  );
};

export default MainLayout;
