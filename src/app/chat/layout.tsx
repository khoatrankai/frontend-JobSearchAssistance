"use client"
export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      {typeof window !== "undefined" &&
        typeof document !== "undefined" &&
        children}
    </>
  );
}
