"use client";
import ScreenConsult from "@/components/ScreenConsult";
import { useGo } from "@/components/navigation";

export default function Page() {
  const go = useGo();
  return <ScreenConsult go={go} />;
}
