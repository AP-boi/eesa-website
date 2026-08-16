"use client";
import React from "react";
import { SquigglyText } from "@/components/ui/squiggly-text";

export default function SquigglyTextDemo() {
  return (
    <div className="flex h-[20rem] w-full items-center justify-center p-4">
      <h2 className="text-center text-3xl sm:text-5xl leading-tight font-bold text-slate-900">
        Master{" "}
        <SquigglyText
          stepDuration={70}
          scale={[6, 9]}
          className="text-blue-600"
        >
          Spoken English
        </SquigglyText>{" "}
        <br />
        & Ace <SquigglyText scale={5} className="text-emerald-600">IELTS Band 8.0</SquigglyText> Today!
      </h2>
    </div>
  );
}
