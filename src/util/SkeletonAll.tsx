import { Skeleton } from "@mui/material";
import React, { ReactElement, ReactNode } from "react";
import SkeletonBannerUser from "./FormSkeleton/SkeletonBannerUser";
import BannerBG from "./FormSkeleton/SkeletonBannerUser/BannerBG";
import TitleBG from "./FormSkeleton/SkeletonBannerUser/TitleBG";
import SkeletonHotJobUser from "./FormSkeleton/SkeletonHotJobUser/SkeletonHotJobUser";
import TopJobMonth from "./FormSkeleton/TopJobMonth/TopJobMonth";
import AmountApply from "./FormSkeleton/TopJobMonth/AmountApply";
import SkeletonListNewJob from "./FormSkeleton/SkeletonNewJobUser/SkeletonListNewJob";
import SkeletonJobTopicUser from "./FormSkeleton/SkeletonJobTopicUser/SkeletonJobTopicUser";
import SkeletonMoreJobUser from "./FormSkeleton/SkeletonMoreJobUser/SkeletonMoreJobUser";

type Props = {
  data: any;
  children: ReactNode;
  type?: any;
};

const SkeletonAll = ({ data, children, type }: Props) => {
  // const { BannerBG, TitleBG } = SkeletonBannerUser();
  return (
    <>
      {data && data.length > 0 ? (
        <>{children}</>
      ) : type === undefined ? (
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
      ) : type === 1 ? (
        <BannerBG></BannerBG>
      ) : type === 2 ? (
        <TitleBG></TitleBG>
      ) : type === 3 ? (
        <SkeletonHotJobUser></SkeletonHotJobUser>
      ) : type === 4 ? (
        <TopJobMonth></TopJobMonth>
      ) : type === 5 ? (
        <AmountApply></AmountApply>
      ) : type === "newJob" ? (
        <SkeletonListNewJob></SkeletonListNewJob>
      ) : type === "jobTopic" ? (
        <SkeletonJobTopicUser></SkeletonJobTopicUser>
      ) : type === "moreJob" ? (
        <SkeletonMoreJobUser></SkeletonMoreJobUser>
      ) : (
        <></>
      )}
    </>
  );
};

export default SkeletonAll;
