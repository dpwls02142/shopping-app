"use client";

import { ReactNode } from "react";

import { MAIN_CONTAINER } from "@/lib/styles";

import { AppHeader } from "@/_shared/components/AppHeader";

interface CartLayoutProps {
  children: ReactNode;
}

export default function CartLayout({ children }: CartLayoutProps) {
  return (
    <div className="h-full flex flex-col">
      <AppHeader />
      <main className={MAIN_CONTAINER}>{children}</main>
    </div>
  );
}
