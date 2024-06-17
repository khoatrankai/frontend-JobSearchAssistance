/* eslint-disable react-hooks/rules-of-hooks */
"use client";
import React, { useEffect, useRef, useState } from "react";
import Sample from "@/components/CVComponent.v2/Sample/Sample";
import { useParams, useRouter } from "next/navigation";
import Option from "@/components/CVComponent.v2/Option/Option";
import LibCvV2 from "@/components/CVComponent.v2/Libs/Lib.cv.v2";
import axios, { Axios } from "axios";
import { useSelector } from "react-redux";
import CheckPageLogin from "@/util/CheckPageLogin";
import ToolBar from "@/components/CVComponent.v2/ToolBar/ToolBar";
import { HiDocumentCheck, HiDocumentPlus } from "react-icons/hi2";
import { RiProfileFill } from "react-icons/ri";
import { BsFillAwardFill } from "react-icons/bs";
import { FaRunning } from "react-icons/fa";
import { AiFillLike, AiOutlineAreaChart } from "react-icons/ai";
import { PiProjectorScreenChartFill, PiStudentFill } from "react-icons/pi";
import { GiSkills } from "react-icons/gi";

type Props = {};

const page = (props: Props) => {
  // CheckPageLogin();

  const { id, template } = useParams();
  const [dataType, setDataType] = useState<any>([
    {
      type: "info_person",
      name: "Thông tin cá nhân",
    },
    {
      type: "info_award",
      name: "giải thưởng",
    },
    {
      type: "info_activate",
      name: "Hoạt động",
    },
    {
      type: "info_hobby",
      name: "sở thích",
    },
    {
      type: "info_achivement",
      name: "chứng chỉ",
    },
    {
      type: "info_project",
      name: "dự án",
    },
    {
      type: "info_study",
      name: "học vấn",
    },
    {
      type: "info_experience",
      name: "kinh nghiệm làm việc",
    },
    {
      type: "info_skill",
      name: "các kỹ năng",
    },
    {
      type: "info_more",
      name: "Thông tin thêm",
    },
  ]);

  const funcLibrary = LibCvV2({ template: template, cvIndex: id });
  const {
    handleResetActive,
    dataLoad,
    handleAddType,
    positionAddType,
    setPositionAddType,
  } = funcLibrary;
  const [typeChoose, setTypeChoose] = useState<any>();
  const handleCheckType = (data: any) => {
    // //console.log(dataLoad);
    if (data === "info_more") return false;
    const checkData = dataLoad.filter((dt: any) => {
      return dt.type === data;
    });
    if (checkData.length > 0) {
      return true;
    }
    return false;
  };

  return (
    <>
      <div className="flex flex-col">
        <div className="h-24">
          <ToolBar id={id} funcLibrary={funcLibrary} />
        </div>
        <div
          className="flex items-center flex-1 bg-blue-50"
          onClick={handleResetActive}
        >
          <div className="basis-1/4 h-full z-30">
            <Option id={id} funcLibrary={funcLibrary} />
          </div>
          <div className="flex-1 mb-32">
            <Sample id={id} template={template} funcLibrary={funcLibrary} />
          </div>
        </div>
        <div
          className={`fixed inset-0 bg-black/20 flex justify-center items-center z-[80] ${
            !positionAddType && "hidden"
          }`}
          onClick={(e: any) => {
            setPositionAddType(undefined);
          }}
        >
          <div
            className="w-full h-full max-w-3xl max-h-96 bg-white rounded-lg p-4 gap-y-8 flex flex-col"
            onClick={(e: any) => {
              e.stopPropagation();
            }}
          >
            <p className="font-bold text-xl">Thêm mục lục vào cột</p>
            <p className="text-red-500 text-xs">
              *Click double hoặc chọn và ấn nút thêm
            </p>
            <div className="flex flex-wrap gap-x-4">
              <ul className="flex flex-wrap gap-3">
                <li
                  className={`px-2 py-3 rounded-lg flex gap-x-2 items-center  text-sm font-bold uppercase ${
                    handleCheckType(dataType[9].type)
                      ? "bg-black/30 text-blue-500 cursor-not-allowed "
                      : typeChoose == dataType[9].type
                      ? "text-white bg-green-500 cursor-pointer"
                      : "bg-black/20 cursor-pointer hover:bg-blue-500 hover:text-white"
                  }`}
                  onClick={() => {
                    setTypeChoose(dataType[9].type);
                  }}
                >
                  <HiDocumentPlus />
                  <span className="select-none">{dataType[9].name}</span>
                </li>
                <li
                  className={`px-2 py-3 rounded-lg flex gap-x-2 items-center  text-sm font-bold uppercase ${
                    handleCheckType(dataType[0].type)
                      ? "bg-black/30 text-blue-500 cursor-not-allowed "
                      : typeChoose == dataType[0].type
                      ? "text-white bg-green-500 cursor-pointer"
                      : "bg-black/20 cursor-pointer hover:bg-blue-500 hover:text-white"
                  }`}
                  onClick={() => {
                    setTypeChoose(dataType[0].type);
                  }}
                >
                  <RiProfileFill />
                  <span className="select-none">{dataType[0].name}</span>
                </li>
                <li
                  className={`px-2 py-3 rounded-lg flex gap-x-2 items-center  text-sm font-bold uppercase ${
                    handleCheckType(dataType[1].type)
                      ? "bg-black/30 text-blue-500 cursor-not-allowed "
                      : typeChoose == dataType[1].type
                      ? "text-white bg-green-500 cursor-pointer"
                      : "bg-black/20 cursor-pointer hover:bg-blue-500 hover:text-white"
                  }`}
                  onClick={() => {
                    setTypeChoose(dataType[1].type);
                  }}
                >
                  <BsFillAwardFill />
                  <span className="select-none">{dataType[1].name}</span>
                </li>
                <li
                  className={`px-2 py-3 rounded-lg flex gap-x-2 items-center  text-sm font-bold uppercase ${
                    handleCheckType(dataType[2].type)
                      ? "bg-black/30 text-blue-500 cursor-not-allowed "
                      : typeChoose == dataType[2].type
                      ? "text-white bg-green-500 cursor-pointer"
                      : "bg-black/20 cursor-pointer hover:bg-blue-500 hover:text-white"
                  }`}
                  onClick={() => {
                    setTypeChoose(dataType[2].type);
                  }}
                >
                  <FaRunning />
                  <span className="select-none">{dataType[2].name}</span>
                </li>
                <li
                  className={`px-2 py-3 rounded-lg flex gap-x-2 items-center  text-sm font-bold uppercase ${
                    handleCheckType(dataType[3].type)
                      ? "bg-black/30 text-blue-500 cursor-not-allowed "
                      : typeChoose == dataType[3].type
                      ? "text-white bg-green-500 cursor-pointer"
                      : "bg-black/20 cursor-pointer hover:bg-blue-500 hover:text-white"
                  }`}
                  onClick={() => {
                    setTypeChoose(dataType[3].type);
                  }}
                >
                  <AiFillLike />
                  <span className="select-none">{dataType[3].name}</span>
                </li>
                <li
                  className={`px-2 py-3 rounded-lg flex gap-x-2 items-center  text-sm font-bold uppercase ${
                    handleCheckType(dataType[4].type)
                      ? "bg-black/30 text-blue-500 cursor-not-allowed "
                      : typeChoose == dataType[4].type
                      ? "text-white bg-green-500 cursor-pointer"
                      : "bg-black/20 cursor-pointer hover:bg-blue-500 hover:text-white"
                  }`}
                  onClick={() => {
                    setTypeChoose(dataType[4].type);
                  }}
                >
                  <HiDocumentCheck />
                  <span className="select-none">{dataType[4].name}</span>
                </li>
                <li
                  className={`px-2 py-3 rounded-lg flex gap-x-2 items-center  text-sm font-bold uppercase ${
                    handleCheckType(dataType[5].type)
                      ? "bg-black/30 text-blue-500 cursor-not-allowed "
                      : typeChoose == dataType[5].type
                      ? "text-white bg-green-500 cursor-pointer"
                      : "bg-black/20 cursor-pointer hover:bg-blue-500 hover:text-white"
                  }`}
                  onClick={() => {
                    setTypeChoose(dataType[5].type);
                  }}
                >
                  <PiProjectorScreenChartFill />
                  <span className="select-none">{dataType[5].name}</span>
                </li>
                <li
                  className={`px-2 py-3 rounded-lg flex gap-x-2 items-center  text-sm font-bold uppercase ${
                    handleCheckType(dataType[6].type)
                      ? "bg-black/30 text-blue-500 cursor-not-allowed "
                      : typeChoose == dataType[6].type
                      ? "text-white bg-green-500 cursor-pointer"
                      : "bg-black/20 cursor-pointer hover:bg-blue-500 hover:text-white"
                  }`}
                  onClick={() => {
                    setTypeChoose(dataType[6].type);
                  }}
                >
                  <PiStudentFill />
                  <span className="select-none">{dataType[6].name}</span>
                </li>
                <li
                  className={`px-2 py-3 rounded-lg flex gap-x-2 items-center  text-sm font-bold uppercase ${
                    handleCheckType(dataType[7].type)
                      ? "bg-black/30 text-blue-500 cursor-not-allowed "
                      : typeChoose == dataType[7].type
                      ? "text-white bg-green-500 cursor-pointer"
                      : "bg-black/20 cursor-pointer hover:bg-blue-500 hover:text-white"
                  }`}
                  onClick={() => {
                    setTypeChoose(dataType[7].type);
                  }}
                >
                  <AiOutlineAreaChart />
                  <span className="select-none">{dataType[7].name}</span>
                </li>
                <li
                  className={`px-2 py-3 rounded-lg flex gap-x-2 items-center  text-sm font-bold uppercase ${
                    handleCheckType(dataType[8].type)
                      ? "bg-black/30 text-blue-500 cursor-not-allowed "
                      : typeChoose == dataType[8].type
                      ? "text-white bg-green-500 cursor-pointer"
                      : "bg-black/20 cursor-pointer hover:bg-blue-500 hover:text-white"
                  }`}
                  onClick={() => {
                    setTypeChoose(dataType[8].type);
                  }}
                >
                  <GiSkills />
                  <span className="select-none">{dataType[8].name}</span>
                </li>
              </ul>
            </div>
            <div className="flex gap-2 text-sm font-semibold w-full justify-end">
              <button
                className="border-2 rounded-lg px-2 py-1 hover:border-red-500 transition-all duration-500"
                onClick={() => {
                  setPositionAddType(undefined);
                }}
              >
                Hủy
              </button>
              <button
                className={` text-white rounded-lg px-2 py-1  transition-all duration-500 ${
                  typeChoose
                    ? handleCheckType(typeChoose)
                      ? "bg-red-500 cursor-not-allowed"
                      : "bg-green-500 hover:bg-green-400"
                    : "bg-blue-500 "
                }`}
                onClick={() => {
                  if (typeChoose && !handleCheckType(typeChoose)) {
                    handleAddType(typeChoose);
                  }
                }}
              >
                Thêm
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default page;
