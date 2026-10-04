"use client";
import { useRouter } from "next/navigation";

export type Go = (name: string, pid?: string, query?: Record<string, string | undefined>) => void;

function withQuery(path: string, query?: Record<string, string | undefined>) {
  if (!query) return path;
  const params = new URLSearchParams();
  for (const [k, v] of Object.entries(query)) if (v) params.set(k, v);
  const qs = params.toString();
  return qs ? `${path}?${qs}` : path;
}

export function useGo(): Go {
  const router = useRouter();
  return (name, pid, query) => {
    if (name === "top") router.push(withQuery("/", query));
    else if (name === "pricing") router.push(withQuery("/pricing", query));
    else if (name === "detail" && pid) router.push(withQuery(`/products/${pid}`, query));
    else if (name === "check") router.push(withQuery("/check", query));
    else if (name === "order") router.push(withQuery("/consult", query));
  };
}
