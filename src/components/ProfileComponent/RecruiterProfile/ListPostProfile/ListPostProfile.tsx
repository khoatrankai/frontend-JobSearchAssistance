import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/redux";
import { Tabs } from "antd";
import ListPost from "./ListPost/ListPost";

type Props = {};

const ListPostProfile = (props: Props) => {
  const languageRedux = useSelector(
    (state: RootState) => state.changeLaguage.language
  );
  const items = [
    {
      key: "1",
      label: languageRedux === 1 ? "Bài viết" : "Employer view profile",
      children: <ListPost />,
    },
  ];

  return (
    <Tabs
      className="mt-5 h-screen"
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

export default ListPostProfile;
