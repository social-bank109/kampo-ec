"use client";
import ScreenTop from "@/components/ScreenTop";
import { useGo } from "@/components/navigation";

export default function Page() {
  const go = useGo();
  return <ScreenTop go={go} />;
}
