import { useSrollContext } from "@/context/AppProvider";
import { Skeleton } from "@mui/material";
import React, { ReactElement, ReactNode } from "react";

type Props = {};

const SkeletonBannerUser = () => {
  const { reponsiveMobile } = useSrollContext();
  const BannerBG = () => {};
  const TitleBG = () => {
    return (
      <>
        <div className="absolute left-[20%] top-1/4 text-white">
          <div
            className={`h-10 overflow-hidden text-white/70 font-bold uppercase  ${
              reponsiveMobile < 1152 ? "text-2xl" : "text-3xl"
            }`}
          >
            <div className="h-fit transition-all duration-700">
              <p className="h-10 w-full max-w-96 flex items-center">vip</p>
              );
            </div>
          </div>
          <div
            className={` h-36 overflow-hidden  font-bold uppercase  ${
              reponsiveMobile < 1152 ? "text-3xl" : "text-4xl"
            }`}
          >
            <div className="h-fit transition-all duration-700">
              <p className="h-36 w-full max-w-96 pt-2 ">123</p>
            </div>
          </div>
          <div className="  h-[56px] overflow-hidden">
            <div className="h-fit transition-all duration-700 flex flex-col gap-y-1">
              <button className="px-4 h-14 flex justify-center items-center rounded-xl border-[2px] bg-black text-white  font-semibold w-fit hover:bg-white hover:text-black transition-all duration-500">
                123
              </button>
              );
            </div>
          </div>
        </div>
      </>
    );
  };
  return { BannerBG, TitleBG };
};

export default SkeletonBannerUser;
