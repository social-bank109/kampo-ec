"use client";
import { useEffect, useRef } from "react";

declare global {
  interface Window {
    hbspt?: {
      forms: {
        create: (config: { portalId: string; formId: string; region: string; target?: string }) => void;
      };
    };
  }
}

const PORTAL_ID = "20633516";
const FORM_ID = "a6ad77f9-bed7-408e-b3e0-c2b563030047";
const REGION = "na2";
const SCRIPT_SRC = "https://js-na2.hsforms.net/forms/embed/v2.js";

export default function HubspotForm() {
  const targetRef = useRef<HTMLDivElement | null>(null);
  const createdRef = useRef(false);

  useEffect(() => {
    function createForm() {
      if (createdRef.current) return;
      if (!window.hbspt || !targetRef.current) return;
      createdRef.current = true;
      window.hbspt.forms.create({
        portalId: PORTAL_ID,
        formId: FORM_ID,
        region: REGION,
        target: `#${targetRef.current.id}`,
      });
    }

    if (window.hbspt) {
      createForm();
      return;
    }

    const existing = document.querySelector<HTMLScriptElement>(`script[src="${SCRIPT_SRC}"]`);
    if (existing) {
      existing.addEventListener("load", createForm);
      return () => existing.removeEventListener("load", createForm);
    }
    const script = document.createElement("script");
    script.src = SCRIPT_SRC;
    script.charset = "utf-8";
    script.type = "text/javascript";
    script.async = true;
    script.addEventListener("load", createForm);
    document.body.appendChild(script);
  }, []);

  return <div id="hubspot-contact-form" ref={targetRef} style={{ marginTop: 16 }} />;
}
