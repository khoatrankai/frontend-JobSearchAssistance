import { useSrollContext } from "@/context/AppProvider";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React from "react";

type Props = {};

const InfoHomeCompany = (props: Props) => {
  const router = useRouter();
  const { reponsiveMobile } = useSrollContext();
  return (
    <div className="flex justify-center bg-blue-50 py-8">
      <div
        className={`max-w-6xl w-full  overflow-hidden  h-80 relative ${
          reponsiveMobile < 1152 ? "" : "rounded-md"
        }`}
      >
        <button
          className={`p-4 rounded-lg border-2 text-lg absolute text-white font-semibold bottom-16  hover:bg-white hover:text-black ${
            reponsiveMobile < 980 ? "right-32" : "right-72"
          }`}
          onClick={() => {
            router.push("/more-suggest");
          }}
        >
          Việc làm gợi ý
        </button>
        <Image
          alt=""
          src={"/banner.png"}
          width={1152}
          height={300}
          className="h-full"
        />
      </div>
    </div>
  );
};

export default InfoHomeCompany;
