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

  useEffect(() => {
    let data = dataForm.layout.map((dt: any, index: any) => {
      let dataa: any = [];
      dt.split(",").map((j: any, i: any) => {
        let dataaa = dataLoad.filter((dtt: any) => {
          return dtt.part === index && dtt.col === i;
        });
        dataaa = dataaa.sort((a: any, b: any) => {
          return a.row - b.row;
        });
        dataa.push(dataaa);
      });

      return {
        layout: dt.split(",").map(Number),
        color: dataForm.color[index].split(","),
        data: dataa,
      };
    });
    console.log(data);
    setDataRequest(data);
  }, [dataLoad, dataForm]);
  return (
    <div className="flex items-center justify-center p-6">
      <div className="w-[665px] min-h-[988px] bg-black"></div>;
    </div>
  );
};

export default page;
