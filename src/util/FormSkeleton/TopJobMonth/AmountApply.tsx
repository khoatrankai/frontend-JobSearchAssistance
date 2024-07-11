import { Skeleton } from "@mui/material";
import React from "react";

type Props = {};

const AmountApply = (props: Props) => {
  return (
    <div className="w-full flex gap-x-2">
      <Skeleton>
        <div className="w-12 relative group">
          <div className="h-1 w-full">123</div>
          <div className=" w-full h-36">123</div>
          <p className="absolute bottom-full -translate-y-1 inset-x-0 flex justify-center text-xs font-semibold text-white transition-all duration-500 group-hover:text-green-400">
            123
          </p>
        </div>
      </Skeleton>
      <Skeleton>
        <div className="w-12 relative group">
          <div className="h-1 w-full">123</div>
          <div className=" w-full h-36">123</div>
          <p className="absolute bottom-full -translate-y-1 inset-x-0 flex justify-center text-xs font-semibold text-white transition-all duration-500 group-hover:text-green-400">
            123
          </p>
        </div>
      </Skeleton>
      <Skeleton>
        <div className="w-12 relative group">
          <div className="h-1 w-full">123</div>
          <div className=" w-full h-36">123</div>
          <p className="absolute bottom-full -translate-y-1 inset-x-0 flex justify-center text-xs font-semibold text-white transition-all duration-500 group-hover:text-green-400">
            123
          </p>
        </div>
      </Skeleton>
      <Skeleton>
        <div className="w-12 relative group">
          <div className="h-1 w-full">123</div>
          <div className=" w-full h-36">123</div>
          <p className="absolute bottom-full -translate-y-1 inset-x-0 flex justify-center text-xs font-semibold text-white transition-all duration-500 group-hover:text-green-400">
            123
          </p>
        </div>
      </Skeleton>
      <Skeleton>
        <div className="w-12 relative group">
          <div className="h-1 w-full">123</div>
          <div className=" w-full h-36">123</div>
          <p className="absolute bottom-full -translate-y-1 inset-x-0 flex justify-center text-xs font-semibold text-white transition-all duration-500 group-hover:text-green-400">
            123
          </p>
        </div>
      </Skeleton>
      <Skeleton>
        <div className="w-12 relative group">
          <div className="h-1 w-full">123</div>
          <div className=" w-full h-36">123</div>
          <p className="absolute bottom-full -translate-y-1 inset-x-0 flex justify-center text-xs font-semibold text-white transition-all duration-500 group-hover:text-green-400">
            123
          </p>
        </div>
      </Skeleton>
    </div>
  );
};

export default AmountApply;
