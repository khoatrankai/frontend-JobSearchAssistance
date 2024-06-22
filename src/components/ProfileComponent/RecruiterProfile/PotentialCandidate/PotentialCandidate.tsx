"use client";
import React from "react";

import { useSelector } from "react-redux";
import { RootState } from "@/redux";

import { Tabs } from "antd";
import CandidateSuggested from "./CandidateSuggested/CandidateSuggested";
import PostCandidate from "./PostCandidate/PostCandidate";
import SuggestApplicationComponent from "@/components/SuggestApplicationComponent/SuggestApplicationComponent";

type Props = {};

const PotentialCandidate = (props: Props) => {
  const languageRedux = useSelector(
    (state: RootState) => state.changeLaguage.language
  );
  const items = [
    {
      key: "1",
      label: languageRedux === 1 ? "Gợi ý ứng viên" : "Employer view profile",
      children: <CandidateSuggested />,
    },
    {
      key: "2",
      label: languageRedux === 1 ? "Gợi ý theo bài đăng" : "Follow company",
      children: <SuggestApplicationComponent />,
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

export default PotentialCandidate;
