"use client";
import { usePathname, useRouter } from "next/navigation";
import { TabBar } from "@/components/ui";

export default function MainLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname() ?? "/";
  const router = useRouter();
  const active =
    pathname === "/"
      ? "top"
      : pathname.startsWith("/check")
        ? "check"
        : pathname.startsWith("/consult")
          ? "order"
          : pathname.startsWith("/me")
            ? "me"
            : null;

  return (
    <>
      <div style={{ paddingBottom: "calc(var(--tab-bar-height) + env(safe-area-inset-bottom, 0px))" }}>
        {children}
      </div>
      <TabBar
        active={active}
        onGo={(t) => {
          if (t === "top") router.push("/");
          else if (t === "check") router.push("/check");
          else if (t === "order") router.push("/consult");
          else if (t === "me") router.push("/me");
        }}
      />
    </>
  );
}
