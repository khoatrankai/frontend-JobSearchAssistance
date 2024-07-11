"use client";
import ComunityCreatePost from "@/components/CommunityComponent/CreateCommunityComponent.tsx";
import ComunityCreatePostRecruiter from "@/components/CommunityComponent/CreateCommunityRecruiterComponent.tsx";
import React, { useRef } from "react";

type Props = {};

const page = (props: Props) => {
  return (
    <>
      <ComunityCreatePostRecruiter />
    </>
  );
};

export default page;
