"use client";
import { usePathname, useRouter } from "next/navigation";
import { TabBar } from "@/components/ui";

export default function MainLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname() ?? "/";
  const router = useRouter();
  const active =
    pathname === "/"
      ? "top"
      : pathname.startsWith("/pricing")
        ? "pricing"
        : pathname.startsWith("/check")
          ? "check"
          : pathname.startsWith("/consult")
            ? "order"
            : null;

  return (
    <>
      <div style={{ paddingBottom: "var(--tab-bar-height)" }}>{children}</div>
      <TabBar
        active={active}
        onGo={(t) => {
          if (t === "top") router.push("/");
          else if (t === "pricing") router.push("/pricing");
          else if (t === "check") router.push("/check");
          else if (t === "order") router.push("/consult");
        }}
      />
    </>
  );
}
