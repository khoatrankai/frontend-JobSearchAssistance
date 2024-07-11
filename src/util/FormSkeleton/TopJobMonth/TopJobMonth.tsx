import { Skeleton } from "@mui/material";
import React from "react";

type Props = {};

const TopJobMonth = (props: Props) => {
  return (
    <>
      <div className="basis-1/3 w-full p-2 flex gap-x-2 items-center cursor-pointer">
        <Skeleton>
          <div className="h-16 w-16 rounded-lg">123</div>
        </Skeleton>
        <div className="flex flex-col h-full justify-around">
          <Skeleton>
            <p className="font-semibold text-white text-sm w-32">123</p>
          </Skeleton>
          <Skeleton>
            <p className="font-medium text-xs text-gray-400 w-32">123</p>
          </Skeleton>
          <Skeleton>
            <p className="font-medium text-xs text-gray-400 w-32">123</p>
          </Skeleton>
        </div>
      </div>
      <div className="basis-1/3 w-full p-2 flex gap-x-2 items-center cursor-pointer">
        <Skeleton>
          <div className="h-16 w-16 rounded-lg">123</div>
        </Skeleton>
        <div className="flex flex-col h-full justify-around">
          <Skeleton>
            <p className="font-semibold text-white text-sm w-32">123</p>
          </Skeleton>
          <Skeleton>
            <p className="font-medium text-xs text-gray-400 w-32">123</p>
          </Skeleton>
          <Skeleton>
            <p className="font-medium text-xs text-gray-400 w-32">123</p>
          </Skeleton>
        </div>
      </div>
      <div className="basis-1/3 w-full p-2 flex gap-x-2 items-center cursor-pointer">
        <Skeleton>
          <div className="h-16 w-16 rounded-lg">123</div>
        </Skeleton>
        <div className="flex flex-col h-full justify-around">
          <Skeleton>
            <p className="font-semibold text-white text-sm w-32">123</p>
          </Skeleton>
          <Skeleton>
            <p className="font-medium text-xs text-gray-400 w-32">123</p>
          </Skeleton>
          <Skeleton>
            <p className="font-medium text-xs text-gray-400 w-32">123</p>
          </Skeleton>
        </div>
      </div>
    </>
  );
};

export default TopJobMonth;
