import { Skeleton } from "@mui/material";
import React from "react";

type Props = {
  className?: any;
  children: any;
  data: any;
};

const SkeletonCustom = ({ children, data, className }: Props) => {
  return (
    <>
      {data ? (
        children
      ) : (
        <Skeleton>
          <div className={className}>123</div>
        </Skeleton>
      )}
    </>
  );
};

export default SkeletonCustom;
