"use client";
import { ScreenMe } from "@/components/ScreenOther";
import { useGo } from "@/components/navigation";

export default function Page() {
  const go = useGo();
  return <ScreenMe go={go} />;
}
