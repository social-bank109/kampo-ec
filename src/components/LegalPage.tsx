"use client";
import React from "react";
import { useRouter } from "next/navigation";
import { AppBar, Footer, Palette, SectionHead } from "./ui";

export default function LegalPage({
  title,
  kicker,
  children,
}: {
  title: string;
  kicker?: string;
  children: React.ReactNode;
}) {
  const router = useRouter();
  return (
    <div style={{ background: Palette.paper, minHeight: "100%" }}>
      <AppBar title={title} variant="paper" onBack={() => router.back()} />
      <article style={{ padding: "22px 22px 24px" }}>
        <SectionHead kicker={kicker} title={title} />
        <div style={{ fontSize: 13, color: Palette.ink2, lineHeight: 1.95 }}>{children}</div>
      </article>
      <Footer />
    </div>
  );
}

export function PlaceholderNotice() {
  return (
    <div
      style={{
        marginTop: 12,
        padding: "10px 12px",
        background: Palette.paper2,
        border: `0.5px dashed ${Palette.line}`,
        borderRadius: 8,
        fontSize: 11.5,
        color: Palette.ink3,
        lineHeight: 1.7,
      }}
    >
      ※本ページは仮掲載です。最終的な文面は、提携クリニック・法務確認のうえ更新予定です。
    </div>
  );
}
