"use client";
import ScreenSelfCheck from "@/components/ScreenSelfCheck";
import { useGo } from "@/components/navigation";

export default function Page() {
  const go = useGo();
  return <ScreenSelfCheck go={go} />;
}
