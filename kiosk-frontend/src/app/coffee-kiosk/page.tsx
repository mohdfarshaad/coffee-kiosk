"use client";

import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Alert, AlertDescription } from "@/components/ui/alert";
import {
  Coffee,
  Smartphone,
  CheckCircle,
  AlertCircle,
  Sun,
  Moon,
  HandHeart,
  CoffeeIcon,
  LucideIcon,
  CupSodaIcon,
} from "lucide-react";

interface Drink {
  id: number;
  name: string;
  price: number;
  icon: LucideIcon;
}

const CoffeeKiosk = () => {
  const [step, setStep] = useState("menu");
  const [selectedDrink, setSelectedDrink] = useState<Drink>();
  const [darkMode, setDarkMode] = useState(false);
  const [cupDetected, setCupDetected] = useState(false);
  const [progress, setProgress] = useState(0);

  const drinks: Drink[] = [
    { id: 1, name: "Coffee", price: 15, icon: CoffeeIcon },
    { id: 2, name: "Tea", price: 10, icon: CupSodaIcon },
    { id: 3, name: "Boost", price: 20, icon: CoffeeIcon },
    { id: 4, name: "Horlicks", price: 18, icon: CupSodaIcon },
  ];

  const payments = [
    { id: "upi", name: "UPI", icon: Smartphone },
    { id: "free", name: "Free", icon: HandHeart },
  ];

  useEffect(() => {
    if (step === "brewing") {
      const timer = setInterval(() => {
        setProgress((prev) => (prev >= 100 ? 100 : prev + 10));
      }, 300);

      if (progress >= 100) {
        setTimeout(() => setStep("complete"), 1000);
      }

      return () => clearInterval(timer);
    }
  }, [step, progress]);

  const selectDrink = (drink: Drink) => {
    setSelectedDrink(drink);
    setStep("payment");
  };

  const selectPayment = () => {
    setStep("cup");
  };

  const startBrewing = async () => {
    if (!cupDetected || !selectedDrink) return;

    try {
      // Trigger relay via FastAPI
      const res = await fetch(
        `http://10.109.4.83:8000/relay/${selectedDrink.id}`,
        {
          method: "POST",
        }
      );

      const data = await res.json();
      console.log(data.message);

      // Start brewing UI
      setStep("brewing");
      setProgress(0);
    } catch (error) {
      console.error("Failed to trigger relay:", error);
      alert("Error: Could not start brewing. Please try again.");
    }
  };

  const reset = () => {
    setStep("menu");
    setSelectedDrink(undefined);
    setCupDetected(false);
    setProgress(0);
  };

  return (
    <div className={darkMode ? "dark" : ""}>
      <div className="min-h-screen bg-background text-foreground p-4">
        {/* Header */}
        <div className="flex justify-between items-center mb-6 p-4 border-b">
          <h1 className="text-2xl font-bold">Smart Coffee Kiosk</h1>
          <Button variant="outline" onClick={() => setDarkMode(!darkMode)}>
            {darkMode ? (
              <Sun className="h-4 w-4" />
            ) : (
              <Moon className="h-4 w-4" />
            )}
          </Button>
        </div>

        <div className="max-w-4xl mx-auto">
          {/* Menu Selection */}
          {step === "menu" && (
            <Card>
              <CardHeader>
                <CardTitle>Select Your Drink</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {drinks.map((drink) => {
                    const Icon = drink.icon;
                    return (
                      <Card
                        key={drink.id}
                        className="cursor-pointer hover:shadow-md transition-shadow"
                        onClick={() => selectDrink(drink)}
                      >
                        <CardContent className="p-4 text-center">
                          <Icon className="h-8 w-8 mx-auto mb-2" />
                          <h3 className="font-semibold">{drink.name}</h3>
                          <Badge>₹{drink.price}</Badge>
                        </CardContent>
                      </Card>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          )}

          {/* Payment Selection */}
          {step === "payment" && (
            <Card>
              <CardHeader>
                <CardTitle>
                  Pay for {selectedDrink?.name} - ₹{selectedDrink?.price}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-3 gap-4 mb-4">
                  {payments.map((payment) => {
                    const Icon = payment.icon;
                    return (
                      <Card
                        key={payment.id}
                        className="cursor-pointer hover:shadow-md transition-shadow"
                        onClick={selectPayment}
                      >
                        <CardContent className="p-4 text-center">
                          <Icon className="h-8 w-8 mx-auto mb-2" />
                          <span>{payment.name}</span>
                        </CardContent>
                      </Card>
                    );
                  })}
                </div>
                <Button variant="outline" onClick={() => setStep("menu")}>
                  Back
                </Button>
              </CardContent>
            </Card>
          )}

          {/* Cup Placement */}
          {step === "cup" && (
            <Card>
              <CardHeader>
                <CardTitle>Place Your Cup</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <div className="mb-6">
                  <div
                    className={`w-20 h-20 rounded-full mx-auto mb-4 flex items-center justify-center ${
                      cupDetected ? "bg-green-100" : "bg-red-100"
                    }`}
                  >
                    {cupDetected ? (
                      <CheckCircle className="h-10 w-10 text-green-600" />
                    ) : (
                      <AlertCircle className="h-10 w-10 text-red-600" />
                    )}
                  </div>
                  <p className="mb-4">
                    {cupDetected ? "Cup detected!" : "Please place a cup"}
                  </p>

                  {/* Demo button */}
                  <Button
                    variant="outline"
                    className="mb-4"
                    onClick={() => setCupDetected(!cupDetected)}
                  >
                    {cupDetected ? "Remove Cup" : "Place Cup"} (Demo)
                  </Button>
                </div>

                <div className="space-y-2">
                  <Button
                    onClick={startBrewing}
                    disabled={!cupDetected}
                    className="w-full"
                  >
                    Start Brewing
                  </Button>
                  <Button variant="outline" onClick={() => setStep("payment")}>
                    Back
                  </Button>
                </div>

                {!cupDetected && (
                  <Alert className="mt-4">
                    <AlertCircle className="h-4 w-4" />
                    <AlertDescription>
                      Please place a cup under the dispenser
                    </AlertDescription>
                  </Alert>
                )}
              </CardContent>
            </Card>
          )}

          {/* Brewing */}
          {step === "brewing" && (
            <Card>
              <CardHeader>
                <CardTitle>Brewing {selectedDrink?.name}</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <Coffee className="h-16 w-16 mx-auto mb-4 animate-pulse" />
                <Progress value={progress} className="w-full mb-4" />
                <p>{progress}% Complete</p>
              </CardContent>
            </Card>
          )}

          {/* Complete */}
          {step === "complete" && (
            <Card>
              <CardHeader>
                <CardTitle>Enjoy Your Drink!</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <CheckCircle className="h-16 w-16 mx-auto mb-4 text-green-500" />
                <p className="mb-4">Your {selectedDrink?.name} is ready!</p>
                <Button onClick={reset}>Order Another</Button>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};

export default CoffeeKiosk;
