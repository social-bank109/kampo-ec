"use client";
import Link from "next/link";
import { trackFlowLinkClick } from "@/lib/analytics";

/** 「予約から再診までの流れ」ページへのリンク（flow_link_click を計測） */
export default function FlowLink({
  position,
  className,
  children,
}: {
  position: string;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <Link href="/consult" className={className} onClick={() => trackFlowLinkClick(position)}>
      {children}
    </Link>
  );
}
