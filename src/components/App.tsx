"use client";
import React from "react";
import { IOSStatusBar, TabBar } from "./ui";
import ScreenTop from "./ScreenTop";
import ScreenDetail from "./ScreenDetail";
import ScreenSelfCheck from "./ScreenSelfCheck";
import { ScreenConsult, ScreenMe } from "./ScreenOther";

type Route = { name: "top" | "check" | "detail" | "order" | "me"; pid?: string };

export default function App() {
  const [route, setRoute] = React.useState<Route>({ name: "top" });
  const scrollRef = React.useRef<HTMLDivElement | null>(null);

  function go(name: string, pid?: string) {
    setRoute({ name: name as Route["name"], pid });
    setTimeout(() => {
      if (scrollRef.current) scrollRef.current.scrollTop = 0;
    }, 10);
  }

  let content: React.ReactNode;
  if (route.name === "top") content = <ScreenTop go={go} />;
  else if (route.name === "detail") content = <ScreenDetail productId={route.pid} go={go} />;
  else if (route.name === "check") content = <ScreenSelfCheck go={go} />;
  else if (route.name === "order") content = <ScreenConsult go={go} />;
  else if (route.name === "me") content = <ScreenMe go={go} />;
  else content = <ScreenTop go={go} />;

  const tabActive = (["top", "check", "order", "me"] as const).includes(route.name as never) ? route.name : null;
  const showTab = tabActive != null;

  return (
    <div
      style={{
        width: 402,
        height: 874,
        borderRadius: 48,
        overflow: "hidden",
        position: "relative",
        background: "#F2F2F7",
        boxShadow: "0 40px 80px rgba(0,0,0,0.18), 0 0 0 1px rgba(0,0,0,0.12), 0 0 0 10px #1a1a1a",
        fontFamily: "var(--font-sans-stack)",
        WebkitFontSmoothing: "antialiased",
      }}
    >
      <div
        style={{
          position: "absolute",
          top: 11,
          left: "50%",
          transform: "translateX(-50%)",
          width: 126,
          height: 37,
          borderRadius: 24,
          background: "#000",
          zIndex: 50,
        }}
      />
      <div style={{ position: "absolute", top: 0, left: 0, right: 0, zIndex: 10 }}>
        <IOSStatusBar dark={false} />
      </div>

      <div
        ref={scrollRef}
        className="scroll"
        key={route.name + (route.pid || "")}
        style={{
          position: "absolute",
          inset: 0,
          paddingTop: 54,
          overflowY: "auto",
          WebkitOverflowScrolling: "touch",
        }}
      >
        {content}
      </div>

      {showTab && <TabBar active={tabActive} onGo={(t) => go(t)} />}

      <div
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          zIndex: 60,
          height: 34,
          display: "flex",
          justifyContent: "center",
          alignItems: "flex-end",
          paddingBottom: 8,
          pointerEvents: "none",
        }}
      >
        <div style={{ width: 139, height: 5, borderRadius: 100, background: "rgba(0,0,0,0.25)" }} />
      </div>
    </div>
  );
}
