/* eslint-disable react-hooks/rules-of-hooks */
"use client";
import BannerSignRecruiterComponent from "@/components/BannerSignRecruiterComponent/BannerSignRecruiterComponent";
import BlogRecruiterComponent from "@/components/BlogRecruiterComponent/BlogRecruiterComponent";
import ServiceRecruiterCompany from "@/components/ServiceRecruiterCompany/ServiceRecruiterCompany";
import { useSrollContext } from "@/context/AppProvider";
import { fetchProfileRecruiter } from "@/redux/reducer/profileReducer/profileSliceRecruiter";
import CheckRoleRecruiter from "@/util/CheckRoleRecruiter";
import ShowModal from "@/util/ShowModal/ShowModal";
import { Button } from "antd";
import React, { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";

type Props = {};

const page = (props: Props) => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  // CheckRoleRecruiter();
  // const dispatch = useDispatch();
  const refService = useRef<any>();
  // dispatch(fetchProfileRecruiter("vi") as any);
  const profile = useSelector((state: any) => state.profileRecruiter.profile);
  const { setPositionScrollJob } = useSrollContext();
  useEffect(() => {
    if (refService) {
      setPositionScrollJob([refService.current]);
    }
  }, [refService]);

  return (
    <div>
      <BannerSignRecruiterComponent />
      <div className="service-recruiter" ref={refService}>
        <ServiceRecruiterCompany />
      </div>
      <BlogRecruiterComponent />
    </div>
  );
};

export default page;
