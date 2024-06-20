import React from "react";
import RecruitmentSuccessList from "./RecruitmentSuccessList/RecruitmentSuccessList";
import { useSelector } from "react-redux";
import { RootState } from "@/redux";
import RecruitmentRejectList from "./RecruitmentRejectList/RecruitmentRejectList";
import RecruitmentWaitingList from "./RecruitmentWaitingList/RecruitmentWaitingList";
import { Tabs } from "antd";

type Props = {};

const RecruitmentList = (props: Props) => {
  const languageRedux = useSelector(
    (state: RootState) => state.changeLaguage.language
  );
  const items = [
    {
      key: "1",
      label:
        languageRedux === 1 ? "Danh sách đã duyệt" : "Employer view profile",
      children: <RecruitmentSuccessList />,
    },
    {
      key: "2",
      label: languageRedux === 1 ? "Danh sách từ chối" : "Follow company",
      children: <RecruitmentRejectList />,
    },
    {
      key: "3",
      label:
        languageRedux === 1 ? "Danh sách đang chờ duyệt" : "Follow company",
      children: <RecruitmentWaitingList />,
    },
  ];

  return (
    <Tabs
      className="mt-5 h-screen max-w-[100vw] overflow-x-scroll"
      style={{
        backgroundColor: "white",
        padding: "20px",
        borderRadius: "10px",
        boxShadow: "0 0 10px 0 rgba(0, 0, 0, 0.1)",
        maxHeight: "65.5%",
        overflow: "auto",
      }}
      defaultActiveKey="1"
      items={items}
    />
  );
};

export default RecruitmentList;
