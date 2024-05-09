import Image from "next/image";
import React from "react";

type Props = {};

const InfoHomeCompany = (props: Props) => {
  return (
    <div className="flex justify-center bg-blue-50 py-8">
      <div className="max-w-6xl w-full rounded-md overflow-hidden  h-80 relative">
        <button className="p-4 rounded-lg border-2 text-lg absolute text-white font-semibold bottom-16 right-72 hover:bg-white hover:text-black">
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
