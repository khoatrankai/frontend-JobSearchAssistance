/* eslint-disable react-hooks/rules-of-hooks */
"use client";
import BannerSignRecruiterComponent from "@/components/BannerSignRecruiterComponent/BannerSignRecruiterComponent";
import BlogRecruiterComponent from "@/components/BlogRecruiterComponent/BlogRecruiterComponent";
import ServiceRecruiterCompany from "@/components/ServiceRecruiterCompany/ServiceRecruiterCompany";
import { fetchProfileRecruiter } from "@/redux/reducer/profileReducer/profileSliceRecruiter";
import CheckRoleRecruiter from "@/util/CheckRoleRecruiter";
import React, { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";

type Props = {};

const page = (props: Props) => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  CheckRoleRecruiter();
  // const dispatch = useDispatch();
  const refService = useRef<any>();
  // dispatch(fetchProfileRecruiter("vi") as any);
  const profile = useSelector((state: any) => state.profileRecruiter.profile);
  return (
    <div>
      <BannerSignRecruiterComponent />
      <div className="service-recruiter">
        <ServiceRecruiterCompany />
      </div>
      <BlogRecruiterComponent />
    </div>
  );
};

export default page;
