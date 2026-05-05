"use client";
import ScreenPricing from "@/components/ScreenPricing";
import { useGo } from "@/components/navigation";

export default function Page() {
  const go = useGo();
  return <ScreenPricing go={go} />;
}
