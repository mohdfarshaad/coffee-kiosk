"use client";

import { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export function AddDrinkForm() {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    await fetch(`${process.env.NEXT_PUBLIC_API_URL}/drinks`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer YOUR_TOKEN",
      },
      body: JSON.stringify({ name, price: parseFloat(price) }),
    });
    setName("");
    setPrice("");
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Add New Drink</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            placeholder="Drink Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          <Input
            type="number"
            placeholder="Price"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            required
          />
          <Button type="submit" className="w-full">
            Add Drink
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
