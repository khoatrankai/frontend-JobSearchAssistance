import Image from "next/image";
import PageHome from "@/page/Home/Home";
export default function Home() {
  return (
    <>
      {/* {typeof window !== "undefined" && typeof document !== "undefined" && ( */}
      <main className="w-full h-full -z-10">
        <PageHome />
      </main>
      {/* )} */}
    </>
  );
}
