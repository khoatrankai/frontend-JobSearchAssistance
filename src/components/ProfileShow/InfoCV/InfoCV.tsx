import React from "react";
import Image from "next/image";
type Props = {};

const InfoCV = (props: Props) => {
  return (
    <div className="py-12 px-8 flex flex-col items-center gap-y-6 justify-center">
      <p className="text-3xl font-bold text-blue-700">CV ứng tuyển</p>
      <div className="w-[500px] h-[800px]">
        <Image
          src={"/recruiter/cvtest.png"}
          alt=""
          width={1000}
          height={2000}
        />
      </div>
    </div>
  );
};

export default InfoCV;
