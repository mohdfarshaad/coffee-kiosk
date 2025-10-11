"use client";

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export function DispenseMonitor() {
  const data = {
    coffeeDispensed: 120,
    teaDispensed: 85,
    milkLeft: "40%",
    teaBoxStatus: "Low",
    machineTemp: "72°C",
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Dispensing Status</CardTitle>
      </CardHeader>
      <CardContent className="grid grid-cols-2 gap-4">
        <div>Coffee Dispensed: {data.coffeeDispensed}</div>
        <div>Tea Dispensed: {data.teaDispensed}</div>
        <div>Milk Left: {data.milkLeft}</div>
        <div>Machine Temp: {data.machineTemp}</div>
        <div>
          Tea Box:{" "}
          <Badge
            variant={data.teaBoxStatus === "Low" ? "destructive" : "default"}
          >
            {data.teaBoxStatus}
          </Badge>
        </div>
      </CardContent>
    </Card>
  );
}
