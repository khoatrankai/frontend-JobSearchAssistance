'use client'
import React from "react";
import { Tabs } from "antd";
import { useSelector } from "react-redux";
import { RootState } from "@/redux";
import CompanyViewProfileComponent from "./CompanyViewProfileComponent/page";
import CompanyFollowComponent from "./FollowCompanyComponent/page";

type Props = {};

const MyCompanyProfile = (props: Props) => {
  const languageRedux = useSelector(
    (state: RootState) => state.changeLaguage.language
  );
  const items = [
    {
      key: '1',
      label: languageRedux === 1 ? 'Nhà tuyển dụng xem hồ sơ' : 'Employer view profile',
      children: <CompanyViewProfileComponent/>,
    },
    {
      key: '2',
      label: languageRedux === 1 ? 'Theo dõi công ty' : 'Follow company',
      children: <CompanyFollowComponent/>,
    },
  ];


  return <Tabs className="mt-5 h-screen" 
    style={{
    backgroundColor: "white",
    padding: "20px",
    borderRadius: "10px",
    boxShadow: "0 0 10px 0 rgba(0, 0, 0, 0.1)",
    maxHeight: "65.5%",
    overflow: "auto",
  }} defaultActiveKey="1" items={items} />;
};

export default MyCompanyProfile;
