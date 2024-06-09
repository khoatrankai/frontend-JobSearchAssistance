import { Skeleton } from "@mui/material";
import React from "react";

type Props = {};

const SkeletonHotJobUser = (props: Props) => {
  return (
    <div className="flex gap-x-4">
      <Skeleton>
        <div className="w-[278.25px] h-[220px] relative bg-blue-800 text-white border-[1px] hover:border-blue-800 transition-all duration-500 hover:text-blue-800 hover:bg-white rounded-lg flex flex-col items-center justify-center gap-y-8 item-company overflow-hidden cursor-pointer">
          123
        </div>
      </Skeleton>
      <Skeleton>
        <div className="w-[278.25px] h-[220px] relative bg-blue-800 text-white border-[1px] hover:border-blue-800 transition-all duration-500 hover:text-blue-800 hover:bg-white rounded-lg flex flex-col items-center justify-center gap-y-8 item-company overflow-hidden cursor-pointer">
          123
        </div>
      </Skeleton>
      <Skeleton>
        <div className="w-[278.25px] h-[220px] relative bg-blue-800 text-white border-[1px] hover:border-blue-800 transition-all duration-500 hover:text-blue-800 hover:bg-white rounded-lg flex flex-col items-center justify-center gap-y-8 item-company overflow-hidden cursor-pointer">
          123
        </div>
      </Skeleton>
      <Skeleton>
        <div className="w-[278.25px] h-[220px] relative bg-blue-800 text-white border-[1px] hover:border-blue-800 transition-all duration-500 hover:text-blue-800 hover:bg-white rounded-lg flex flex-col items-center justify-center gap-y-8 item-company overflow-hidden cursor-pointer">
          123
        </div>
      </Skeleton>
    </div>
  );
};

export default SkeletonHotJobUser;
