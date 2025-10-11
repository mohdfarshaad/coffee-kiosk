"use client";

import { Moon, Sun } from "lucide-react";
import { AddDrinkForm } from "./components/AddDrinkForm";
import { DispenseMonitor } from "./components/DispenseMonitor";
import { PaymentStats } from "./components/PaymentStats";
import { SummaryCards } from "./components/SummaryCards";
import { Button } from "@/components/ui/button";
import { useState } from "react";

export default function AdminPage() {
  const [darkMode, setDarkMode] = useState(false);
  return (
    <div className={darkMode ? "dark" : ""}>
      <div className="min-h-screen flex p-4">
        <div className="space-y-8">
          <div className="flex justify-between">
            <h1 className="text-3xl font-bold">☕ Admin Panel</h1>
            <Button variant="outline" onClick={() => setDarkMode(!darkMode)}>
              {darkMode ? (
                <Sun className="h-4 w-4" />
              ) : (
                <Moon className="h-4 w-4" />
              )}
            </Button>
          </div>
          <SummaryCards />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <AddDrinkForm />
            <PaymentStats />
          </div>
          <DispenseMonitor />
        </div>
        ;
      </div>
      ;
    </div>
  );
}
