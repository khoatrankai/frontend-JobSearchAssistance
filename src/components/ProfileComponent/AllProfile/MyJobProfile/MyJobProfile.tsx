import React, { useRef } from "react";
import { Tabs } from "antd";
import { useSelector } from "react-redux";
import { RootState } from "@/redux";
import AppliedJobComponent from "./AppliedJobComponent/page";
import SavedJobComponent from "./SavedJobComponent/page";
import ViewedJobComponent from "./ViewedJobComponent/page";
import { useSrollContext } from "@/context/AppProvider";

type Props = {};

const MyJobProfile = (props: Props) => {
  const { selectItemProfileUser } = useSrollContext();
  const languageRedux = useSelector(
    (state: RootState) => state.changeLaguage.language
  );
  const items = [
    {
      key: "1",
      label: languageRedux === 1 ? "Việc làm ứng tuyển" : "Applied Jobs",
      children: <AppliedJobComponent />,
    },
    {
      key: "2",
      label: languageRedux === 1 ? "Việc làm đã lưu" : "Saved Jobs",
      children: <SavedJobComponent />,
    },
    {
      key: "3",
      label: languageRedux === 1 ? "Việc làm đã xem" : "Viewed Jobs",
      children: <ViewedJobComponent />,
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
        maxHeight: "67%",
        overflow: "auto",
      }}
      defaultActiveKey={selectItemProfileUser.toString()}
      items={items}
    />
  );
};

export default MyJobProfile;
