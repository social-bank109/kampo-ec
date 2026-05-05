"use client";
import { ScreenConsult } from "@/components/ScreenOther";
import { useGo } from "@/components/navigation";

export default function Page() {
  const go = useGo();
  return <ScreenConsult go={go} />;
}
