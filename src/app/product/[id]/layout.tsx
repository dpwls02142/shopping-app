"use client";

import { ReactNode, useRef } from "react";

import { MAIN_CONTAINER } from "@/lib/styles";

import { useScrollActivity } from "@/_shared/modules/point/hooks/useScrollActivity";

import { AppHeader } from "@/_shared/components/AppHeader";
import { PointDisplay } from "@/_shared/modules/point/components/PointDisplay";

interface ProductLayoutProps {
  children: ReactNode;
}

export default function ProductLayout({ children }: ProductLayoutProps) {
  const mainRef = useRef<HTMLElement>(null);

  useScrollActivity({ mainRef, isEnabled: true });

  return (
    <div className="h-full flex flex-col">
      <AppHeader />
      <PointDisplay />
      <main ref={mainRef} className={MAIN_CONTAINER}>
        {children}
      </main>
    </div>
  );
}
