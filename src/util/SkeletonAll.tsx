import { Skeleton } from "@mui/material";
import React, { ReactElement, ReactNode } from "react";

type Props = {
  data: any;
  children: ReactNode;
};

const SkeletonAll = ({ data, children }: Props) => {
  return (
    <>
      {data.length > 0 ? (
        <>{children}</>
      ) : (
        <>
          <Skeleton>
            <div className="w-96 mb-2">123</div>
          </Skeleton>
          <Skeleton>
            <div className="w-96 mb-2">123</div>
          </Skeleton>
          <Skeleton>
            <div className="w-96 mb-2">123</div>
          </Skeleton>
          <Skeleton>
            <div className="w-96 mb-2">123</div>
          </Skeleton>
        </>
      )}
    </>
  );
};

export default SkeletonAll;
