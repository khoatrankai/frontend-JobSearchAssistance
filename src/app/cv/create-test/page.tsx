/* eslint-disable react-hooks/rules-of-hooks */
"use client";
import React, { useEffect, useState } from "react";

type Props = {};

const page = (props: Props) => {
  const [dataForm, setDataForm] = useState<any>({
    cvIndex: 1,
    layout: ["1,2,1", "1,3"],
    color: ["#fffff,#000000,#000000", "#fffff,#000000"],
  });
  const [dataLoad, setDataLoad] = useState<any>([
    {
      part: 1,
      col: 0,
      row: 1,
      typeName: "Skill",
      content: "mô tả",
    },
    {
      part: 1,
      col: 0,
      row: 0,
      typeName: "Hoạt động",
      content: "mô tả",
    },
    {
      part: 0,
      col: 0,
      row: 1,
      typeName: "Dự án",
      content: "mô tả",
    },
    {
      part: 0,
      col: 0,
      row: 0,
      typeName: "Cá nhân",
      content: "mô tả",
    },
    {
      part: 0,
      col: 1,
      row: 1,
      typeName: "Hoc van",
      content: "mô tả",
    },
    {
      part: 0,
      col: 1,
      row: 0,
      typeName: "Ngoại ngữ",
      content: "mô tả",
    },
  ]);
  const [dataRequest, setDataRequest] = useState<any>();
  const [dataRequestForm, setDataRequestForm] = useState<any>();

  useEffect(() => {
    let data = dataForm.layout.map((dt: any, index: any) => {
      const data = dataLoad.filter((dtt: any, i: any) => {
        return dtt.part === index;
      });
      return {
        layout: dt.split(",").map(Number),
        color: dataForm.color[index].split(","),
        data: data,
      };
    });
    console.log(data);
  }, [dataLoad, dataForm]);
  return (
    <div className="flex items-center justify-center p-6">
      <div className="w-[665px] min-h-[988px] bg-black"></div>;
    </div>
  );
};

export default page;
