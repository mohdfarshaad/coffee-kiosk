"use client";

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

export function PaymentStats() {
  const totalSales = 1250;
  const pendingPayments = 5;
  const completedPayments = 120;

  return (
    <Card>
      <CardHeader>
        <CardTitle>Payment Summary</CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        <p>Total Sales: ₹{totalSales}</p>
        <p>Completed: {completedPayments}</p>
        <p>Pending: {pendingPayments}</p>
        <Progress
          value={
            (completedPayments / (completedPayments + pendingPayments)) * 100
          }
        />
      </CardContent>
    </Card>
  );
}
