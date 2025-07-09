import React from 'react';
import {
  BarChart3,
  FileText,
  Home,
  LayoutDashboard,
  MessageSquare,
  Settings,
  Users,
  X
} from 'lucide-react';
import { NavLink } from 'react-router-dom';
import { cn } from '@/lib/utils';

interface SidebarProps {
  className?: string;
  open?: boolean; // for mobile drawer
  onClose?: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ className, open, onClose }) => {
  const navItems = [
    { name: 'Dashboard', icon: Home, path: '/' },
    { name: 'Forms', icon: FileText, path: '/forms' },
    { name: 'Responses', icon: MessageSquare, path: '/responses' },
    { name: 'Analytics', icon: BarChart3, path: '/analytics' },
    { name: 'Templates', icon: LayoutDashboard, path: '/templates' },
    { name: 'Team', icon: Users, path: '/team' },
    { name: 'Settings', icon: Settings, path: '/settings' },
  ];

  // On mobile: show if open, else hide.
  return (
    <aside
      className={cn(
        " flex flex-col w-64 border-r  shrink-0 z-50",
        "fixed md:static h-full md:h-auto bg-white",
        open ? 'block' : 'hidden md:flex',
        className
      )}
      role="navigation"
    >
      {/* Mobile close button */}
      <div className="flex md:hidden items-center bg-white justify-between p-4 border-b">
        <span className="font-bold text-flowform-600">FlowForm</span>
        <button onClick={onClose} aria-label="Close sidebar">
          <X className="h-6 w-6" />
        </button>
      </div>
      <div className="p-6 flex bg-white flex-col space-y-6">
        {navItems.map((item) => {
          return (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                cn(
                  "flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium transition-colors",
                  isActive
                    ? "bg-flowform-100 text-flowform-800"
                    : "text-muted-foreground hover:bg-muted"
                )
              }
              onClick={onClose}
            >
              <item.icon size={18} />
              <span>{item.name}</span>
            </NavLink>
          );
        })}
      </div>
    </aside>
  );
};

export default Sidebar;