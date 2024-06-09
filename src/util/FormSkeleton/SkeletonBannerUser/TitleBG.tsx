import { useSrollContext } from "@/context/AppProvider";
import { Skeleton } from "@mui/material";
import React from "react";

type Props = {};

const TitleBG = (props: Props) => {
  const { reponsiveMobile } = useSrollContext();
  return (
    <>
      <Skeleton>
        <div
          className={`h-10 overflow-hidden text-white/70 font-bold uppercase  ${
            reponsiveMobile < 1152 ? "text-2xl w-60" : "text-3xl w-96"
          }`}
        >
          <div className="h-fit transition-all duration-700">
            <p className="h-10 w-full max-w-96 flex items-center">vip</p>
          </div>
        </div>
      </Skeleton>
      <Skeleton>
        <div
          className={`h-36 overflow-hidden  font-bold uppercase  ${
            reponsiveMobile < 1152 ? "text-3xl w-60" : "text-4xl w-96 "
          }`}
        >
          <div className="h-fit transition-all duration-700">
            <p className="h-36 w-full max-w-96 pt-2 ">123</p>
          </div>
        </div>
      </Skeleton>
      <Skeleton>
        <div className="  w-96 h-[56px] overflow-hidden">
          <div className="h-fit transition-all duration-700 flex flex-col gap-y-1">
            <button className="px-4 h-14 flex justify-center items-center rounded-xl border-[2px] bg-black text-white  font-semibold w-fit hover:bg-white hover:text-black transition-all duration-500">
              123
            </button>
          </div>
        </div>
      </Skeleton>
    </>
  );
};

export default TitleBG;
