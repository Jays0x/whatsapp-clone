"use client";
import Link from "next/link";
// import { useTheme } from "next-themes";
// import { useEffect, useState } from "react";

export default function Home() {
 

  return (
    <div className="flex flex-col lg:flex-col justify-center items-center h-[100vh] font-[family-name:var(--font-geist-mono)]">

      <h1 className="lg:text-2xl text-xl font-semibold">
        This is the landing page
      </h1>

      <Link href='/login' className="bg-[var(--component)] px-4 py-3 mt-8 rounded-md">Log in</Link>
      
    </div>
  );
}
