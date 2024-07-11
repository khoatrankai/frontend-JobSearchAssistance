"use client";
import SearchJobComponent from "@/components/SearchJobComponent/SearchJobComponent";
import React, { useEffect } from "react";
import "./style.scss";
type Props = {};

const page = (props: Props) => {
  return (
    <div className="bg-slate-50 h-fit">
      <SearchJobComponent />
    </div>
  );
};

export default page;
