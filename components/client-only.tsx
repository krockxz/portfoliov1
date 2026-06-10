"use client";

import { useSyncExternalStore, type ReactNode } from "react";

const emptySubscribe = () => () => {};

function useIsMounted() {
  return useSyncExternalStore(
    emptySubscribe,
    () => true,
    () => false,
  );
}

export default function ClientOnly({ children }: { children: ReactNode }) {
  const mounted = useIsMounted();

  if (!mounted) return null;
  return <>{children}</>;
}