"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ProductsContentComponent } from "./components-products-content";
import { AlertsContentComponent } from "./components-alerts-content";
import { StatisticsContentComponent } from "./components-statistics-content";
import { UsersContentComponent } from "./components-users-content";
import { UnauthorizedContentComponent } from "./components-unauthorized-content";
import { SettingsContentComponent } from "./components-settings-content";
import { SidebarComponent } from "./components-sidebar";
import { TopBarComponent } from "./components-top-bar";
import { HomeContentComponent } from "./components-home-content";

export default interface UserProps {
  id: number;
  name: string;
  email: string;
  role: string;
  password: string;
}

interface LoginProps {
  onLogin: (email: string, password: string) => void;
  error: string;
}

const users: UserProps[] = [
  {
    id: 1,
    name: "Admin User",
    email: "admin@example.com",
    role: "administrator",
    password: "admin123",
  },
  {
    id: 2,
    name: "FFO User",
    email: "ffo@example.com",
    role: "ffo",
    password: "ffo123",
  },
  {
    id: 3,
    name: "Producer User",
    email: "producer@example.com",
    role: "producer",
    password: "producer123",
  },
  {
    id: 4,
    name: "Cooperative User",
    email: "coop@example.com",
    role: "cooperative",
    password: "coop123",
  },
  {
    id: 5,
    name: "Consumer User",
    email: "consumer@example.com",
    role: "consumer",
    password: "consumer123",
  },
];

export function AppComponent() {
  const [activeSection, setActiveSection] = useState("home");
  const [currentUser, setCurrentUser] = useState<UserProps | null>(null);
  const [loginError, setLoginError] = useState("");

  const handleLogin = (email: string, password: string) => {
    const user = users.find(
      (u) => u.email === email && u.password === password
    );
    if (user) {
      setCurrentUser(user);
      setActiveSection("home");
      setLoginError("");
    } else {
      setLoginError("Invalid email or password");
    }
  };

  const handleLogout = () => {
    setCurrentUser(null);
    setActiveSection("home");
  };

  const handleUpdateUser = (updatedUser: UserProps) => {
    setCurrentUser((prevUser) => ({ ...prevUser, ...updatedUser }));
  };

  const renderContent = () => {
    if (!currentUser) {
      return <LoginForm onLogin={handleLogin} error={loginError} />;
    }

    switch (activeSection) {
      case "home":
        return <HomeContentComponent />;
      case "products":
        return <ProductsContentComponent />;
      case "alerts":
        return <AlertsContentComponent />;
      case "statistics":
        return <StatisticsContentComponent />;
      case "users":
        return currentUser.role === "administrator" ? (
          <UsersContentComponent
            users={users}
            onUpdateUser={handleUpdateUser}
          />
        ) : (
          <UnauthorizedContentComponent />
        );
      case "settings":
        return (
          <SettingsContentComponent
            currentUser={currentUser}
            onUpdateUser={handleUpdateUser}
          />
        );
      default:
        return <HomeContentComponent />;
    }
  };

  if (!currentUser) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        {renderContent()}
      </div>
    );
  }

  return (
    <div className="flex h-screen bg-gray-100">
      <SidebarComponent
        activeSection={activeSection}
        onNavigation={setActiveSection}
        userType={currentUser.role}
      />
      <main className="flex-1 overflow-y-auto">
        <TopBarComponent
          activeSection={activeSection}
          currentUser={currentUser}
          onLogout={handleLogout}
        />
        <div className="p-6">{renderContent()}</div>
      </main>
    </div>
  );
}

function LoginForm({ onLogin, error }: LoginProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onLogin(email, password);
  };

  return (
    <Card className="w-[350px]">
      <CardHeader>
        <CardTitle>Login</CardTitle>
        <CardDescription>
          Enter your email and password to access the platform.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit}>
          <div className="grid w-full items-center gap-4">
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                placeholder="Enter your email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                placeholder="Enter your password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            {error && <p className="text-sm text-red-500">{error}</p>}
            <Button type="submit">Log in</Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
