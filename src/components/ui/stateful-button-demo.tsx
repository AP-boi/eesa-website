"use client";

import React from "react";
import { Button } from "@/components/ui/stateful-button";

export default function StatefulButtonDemo() {
  const handleClick = () => {
    return new Promise((resolve) => {
      setTimeout(resolve, 2000);
    });
  };
  return (
    <div className="flex h-40 w-full items-center justify-center">
      <Button onClick={handleClick}>Send message</Button>
    </div>
  );
}
