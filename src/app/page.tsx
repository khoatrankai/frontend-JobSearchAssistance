import Image from "next/image";
import PageHome from "@/page/Home/Home";
import MapComponent from "@/components/MapComponent/MapComponent";
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
