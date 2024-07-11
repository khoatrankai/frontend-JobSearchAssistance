"use client";

// import CheckRoleRecruiter from "@/util/CheckRoleRecruiter";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      {typeof window !== "undefined" &&
        typeof document !== "undefined" &&
        children}
    </>
  );
}
