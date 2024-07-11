"use client";
import React from "react";

import { useSelector } from "react-redux";
import { RootState } from "@/redux";

import { Tabs } from "antd";

import AllPackage from "./AllPackage/AllPackage";
import HistoryPackage from "./HistoryPackage/HistoryPackage";
import { useSrollContext } from "@/context/AppProvider";

type Props = {};

const PackageService = (props: Props) => {
  const languageRedux = useSelector(
    (state: RootState) => state.changeLaguage.language
  );
  const { selectItemProfileRecruiter } = useSrollContext();
  const items = [
    {
      key: "1",
      label: languageRedux === 1 ? "Các loại dịch vụ" : "Employer view profile",
      children: <AllPackage />,
    },
    {
      key: "2",
      label: languageRedux === 1 ? "Lịch sử dịch vụ" : "Follow company",
      children: <HistoryPackage />,
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
      defaultActiveKey={selectItemProfileRecruiter ?? "1"}
      items={items}
    />
  );
};

export default PackageService;
