"use client";
import React from "react";

import { useSelector } from "react-redux";
import { RootState } from "@/redux";

import { Tabs } from "antd";
import HistoryRecharge from "./HistoryRecharge/HistoryRecharge";
import RechargeInfo from "./RechargeInfo/RechargeInfo";
import { useSrollContext } from "@/context/AppProvider";

type Props = {};

const RechargePrice = (props: Props) => {
  const languageRedux = useSelector(
    (state: RootState) => state.changeLaguage.language
  );
  const { selectItemProfileUser, selectItemProfileRecruiter } =
    useSrollContext();
  const items = [
    {
      key: "1",
      label: languageRedux === 1 ? "Nạp tiền" : "Employer view profile",
      children: <RechargeInfo />,
    },
    {
      key: "2",
      label: languageRedux === 1 ? "Lịch sử" : "Follow company",
      children: <HistoryRecharge />,
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
      defaultActiveKey={
        selectItemProfileRecruiter !== -1
          ? selectItemProfileRecruiter.toString()
          : "1"
      }
      items={items}
    />
  );
};

export default RechargePrice;
