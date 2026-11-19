"use client";
import { useEffect } from "react";
import { pushEvent } from "@/lib/analytics";

/** マウント時にページ固有のイベントを1回送る（例：flow_page_view） */
export default function PageEvent({ event }: { event: string }) {
  useEffect(() => {
    pushEvent(event, { page_path: window.location.pathname });
  }, [event]);
  return null;
}
