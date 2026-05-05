"use client";
import { useRouter } from "next/navigation";

export type Go = (name: string, pid?: string) => void;

export function useGo(): Go {
  const router = useRouter();
  return (name, pid) => {
    if (name === "top") router.push("/");
    else if (name === "pricing") router.push("/pricing");
    else if (name === "detail" && pid) router.push(`/products/${pid}`);
    else if (name === "check") router.push("/check");
    else if (name === "order") router.push("/consult");
  };
}
