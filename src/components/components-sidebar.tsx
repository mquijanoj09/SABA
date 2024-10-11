"use client";

import { Home, Package, Bell, BarChart2, Users, Settings } from "lucide-react";
import { Button } from "@/components/ui/button";

interface Props {
  activeSection: string;
  onNavigation: (section: string) => void;
  userType: string;
}

export function SidebarComponent({
  activeSection,
  onNavigation,
  userType,
}: Props) {
  const navItems = [
    { name: "home", icon: Home, label: "Home" },
    { name: "products", icon: Package, label: "Products" },
    { name: "alerts", icon: Bell, label: "Alerts" },
    { name: "statistics", icon: BarChart2, label: "Statistics" },
    { name: "users", icon: Users, label: "Users", adminOnly: true },
    { name: "settings", icon: Settings, label: "Settings" },
  ];

  return (
    <div className="bg-white w-64 h-full shadow-md">
      <div className="p-4">
        <h1 className="text-2xl font-bold text-gray-800">SABA</h1>
      </div>
      <nav className="mt-8">
        {navItems.map((item) => {
          if (item.adminOnly && userType !== "administrator") return null;
          return (
            <Button
              key={item.name}
              variant={activeSection === item.name ? "secondary" : "ghost"}
              className="w-full justify-start"
              onClick={() => onNavigation(item.name)}
            >
              <item.icon className="mr-2 h-4 w-4" />
              {item.label}
            </Button>
          );
        })}
      </nav>
    </div>
  );
}
