"use client";
import { use } from "react";
import ScreenDetail from "@/components/ScreenDetail";
import { useGo } from "@/components/navigation";

export default function Page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const go = useGo();
  return <ScreenDetail productId={id} go={go} />;
}
