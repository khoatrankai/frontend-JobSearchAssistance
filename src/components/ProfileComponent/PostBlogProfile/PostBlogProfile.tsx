import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/redux";
import { Tabs } from "antd";
import ListBlog from "./ListBlog/ListBlog";
import SavedBlogComponent from "./SavedBlogComponent/page";

type Props = {};

const PostBlogProfile = (props: Props) => {
  const languageRedux = useSelector(
    (state: RootState) => state.changeLaguage.language
  );
  const items = [
    {
      key: "1",
      label: languageRedux === 1 ? "Bài blog" : "Employer view profile",
      children: <ListBlog />,
    },
    {
      key: "2",
      label: languageRedux === 1 ? "Bài blog đã lưu" : "Employer view profile",
      children: <SavedBlogComponent />,
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

export default PostBlogProfile;
