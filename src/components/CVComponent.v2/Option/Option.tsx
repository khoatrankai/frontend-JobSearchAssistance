/* eslint-disable react/jsx-key */

import React, { useEffect, useRef, useState } from "react";
import LibCvV2 from "../Libs/Lib.cv.v2";
import Image from "next/image";
import { MdKeyboardArrowRight, MdKeyboardArrowLeft } from "react-icons/md";
import axios from "axios";
import { PDFDownloadLink } from "@react-pdf/renderer";
import Passion from "../PDF/Sample/Passion/Passion";
import {
  AiFillContainer,
  AiFillLike,
  AiOutlineAreaChart,
} from "react-icons/ai";
import { HiDocumentAdd } from "react-icons/hi";
import { BsBriefcaseFill } from "react-icons/bs";
import { AiFillExclamationCircle } from "react-icons/ai";
import { RiProfileFill } from "react-icons/ri";
import { BsFillAwardFill } from "react-icons/bs";
import { FaRunning } from "react-icons/fa";
import { HiDocumentCheck, HiDocumentPlus } from "react-icons/hi2";
import { PiProjectorScreenChartFill, PiStudentFill } from "react-icons/pi";
import { GiSkills } from "react-icons/gi";

type Props = { id: any; funcLibrary: any };

const Option = (props: Props) => {
  const { id, funcLibrary } = props;
  const {
    dataForm,
    dataRequest,
    dataGhostDrag,
    handleCheckPass,
    checkActive,
    handleOnClickPart,
    checkGhost,
    handleOnClickRow,
    handleOnMouseMoveRow,
    BGChooseCol,
    checkLayout,
    BGCol,
    BGChoosePart,
    BGPart,
    BGRow,
    BGToolPart,
    BGToolRow,
    handleChangeColor,
    handleToolMouseMoveTransRow,
    setCheckLayout,
    dataLoad,
    setDataLoad,
    setDataForm,
    handleChangeLayout,
    checkAddCategory,
    handleRemove,
    setAddCategory,
    BGLayout,
    templateId,
    setTemplateId,
  } = funcLibrary;
  const [func, setFunc] = useState<any>(1);
  const [typeTemplate, setTypeTemplate] = useState<any>([
    { id: 0 },
    { id: 1 },
    { id: 2 },
    { id: 3 },
    { id: 4 },
    { id: 5 },
    { id: 6 },
    { id: 8 },
    { id: 9 },
    { id: 7 },
    { id: 10 },
    { id: 11 },
    { id: 12 },
    { id: 13 },
    { id: 14 },
  ]);
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
  const handleCheckType = (data: any) => {
    // console.log(dataLoad);
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
      <div className="fixed flex flex-col left-2 top-52 gap-y-4 h-full z-[10] w-24">
        <div
          className={`p-4 w-full  group  flex justify-center items-center cursor-pointer flex-col gap-y-2 rounded-lg  shadow-[rgba(17,_17,_26,_0.1)_0px_0px_16px] ${
            func === 0 ? "bg-blue-500" : "bg-white hover:bg-blue-500"
          }`}
          onClick={() => {
            if (func === 0) {
              setFunc(-1);
            } else setFunc(0);
          }}
        >
          <AiFillContainer
            className={`text-3xl   ${
              func === 0 ? "text-white" : "text-blue-500 group-hover:text-white"
            }`}
          />
          <button
            className={`font-medium text-xs text-center  ${
              func === 0 ? "text-white" : "group-hover:text-white"
            }`}
          >
            Đổi mẫu CV
          </button>
          <div
            className={`absolute bg-white shadow-[rgba(17,_17,_26,_0.1)_0px_0px_16px] inset-y-0 bottom-8 left-full translate-x-4 rounded-lg w-96 p-2  transition-all ${
              func === 0 ? "" : "hidden"
            }`}
          >
            <h1 className="font-medium text-xl mb-10">Template</h1>
            <ul className="flex flex-wrap gap-2 overflow-y-scroll">
              {typeTemplate?.map((dt: any, index: any) => {
                return (
                  <li
                    className={`w-24 h-24 object-contain rounded-xl overflow-hidden  text-sm font-bold uppercase  cursor-pointer  ${
                      templateId === dt.id.toString()
                        ? "bg-black/10"
                        : "bg-black/20 hover:bg-black/10"
                    }`}
                    onClick={(e: any) => {
                      e.stopPropagation();
                      setTemplateId(dt.id.toString());
                    }}
                  >
                    {/* <span className="select-none">{dt.id}</span>
                     */}
                    <Image
                      className="hover:scale-150 transition-all duration-700"
                      width={200}
                      height={200}
                      alt=""
                      src={`/formCV/cv${index + 1}.webp`}
                    />
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
        <div
          className={`p-4 w-full group flex justify-center items-center cursor-pointer flex-col gap-y-2 rounded-lg  shadow-[rgba(17,_17,_26,_0.1)_0px_0px_16px] ${
            func === 1 ? "bg-blue-500" : "bg-white hover:bg-blue-500"
          }`}
          onClick={() => {
            if (func === 1) {
              setFunc(-1);
            } else setFunc(1);
          }}
        >
          <HiDocumentAdd
            className={`text-3xl   ${
              func === 1 ? "text-white" : "text-blue-500 group-hover:text-white"
            }`}
          />
          <button
            className={`font-medium text-xs text-center  ${
              func === 1 ? "text-white" : "group-hover:text-white"
            }`}
          >
            Thêm mục
          </button>
          <div
            className={`absolute bg-white shadow-[rgba(17,_17,_26,_0.1)_0px_0px_16px] top-0 left-full translate-x-4 rounded-lg w-80 h-full p-2 transition-all ${
              func === 1 ? "" : "hidden"
            }`}
            onClick={(e: any) => {
              e.stopPropagation();
            }}
            onMouseUp={(e: any) => {
              // e.stopPropagation();

              if (checkAddCategory) {
                handleRemove();
                setAddCategory(false);
              }
            }}
          >
            <h1 className="font-medium text-xl mb-10">Mục lục chức năng</h1>
            <ul className="flex flex-col gap-y-3">
              <li
                className={`px-2 py-3 rounded-lg flex gap-x-2 items-center  text-sm font-bold uppercase ${
                  handleCheckType(dataType[9].type)
                    ? "bg-black/30 text-blue-500 cursor-not-allowed "
                    : "bg-black/20 cursor-pointer hover:bg-blue-500 hover:text-white"
                }`}
                onMouseDown={(e: any) => {
                  e.preventDefault();
                  if (!handleCheckType(dataType[9].type))
                    handleToolMouseMoveTransRow(e, dataType[9]);
                }}
                onMouseUp={() => {}}
              >
                <HiDocumentPlus />
                <span className="select-none">{dataType[9].name}</span>
              </li>
              <li
                className={`px-2 py-3 rounded-lg flex gap-x-2 items-center  text-sm font-bold uppercase ${
                  handleCheckType(dataType[0].type)
                    ? "bg-black/30 text-blue-500 cursor-not-allowed "
                    : "bg-black/20 cursor-pointer hover:bg-blue-500 hover:text-white"
                }`}
                onMouseDown={(e: any) => {
                  e.preventDefault();
                  if (!handleCheckType(dataType[0].type))
                    handleToolMouseMoveTransRow(e, dataType[0]);
                }}
                onMouseUp={() => {}}
              >
                <RiProfileFill />
                <span className="select-none">{dataType[0].name}</span>
              </li>
              <li
                className={`px-2 py-3 rounded-lg flex gap-x-2 items-center  text-sm font-bold uppercase ${
                  handleCheckType(dataType[1].type)
                    ? "bg-black/30 text-blue-500 cursor-not-allowed "
                    : "bg-black/20 cursor-pointer hover:bg-blue-500 hover:text-white"
                }`}
                onMouseDown={(e: any) => {
                  e.preventDefault();
                  if (!handleCheckType(dataType[1].type))
                    handleToolMouseMoveTransRow(e, dataType[1]);
                }}
                onMouseUp={() => {}}
              >
                <BsFillAwardFill />
                <span className="select-none">{dataType[1].name}</span>
              </li>
              <li
                className={`px-2 py-3 rounded-lg flex gap-x-2 items-center  text-sm font-bold uppercase ${
                  handleCheckType(dataType[2].type)
                    ? "bg-black/30 text-blue-500 cursor-not-allowed "
                    : "bg-black/20 cursor-pointer hover:bg-blue-500 hover:text-white"
                }`}
                onMouseDown={(e: any) => {
                  e.preventDefault();
                  if (!handleCheckType(dataType[2].type))
                    handleToolMouseMoveTransRow(e, dataType[1]);
                }}
                onMouseUp={() => {}}
              >
                <FaRunning />
                <span className="select-none">{dataType[2].name}</span>
              </li>
              <li
                className={`px-2 py-3 rounded-lg flex gap-x-2 items-center  text-sm font-bold uppercase ${
                  handleCheckType(dataType[3].type)
                    ? "bg-black/30 text-blue-500 cursor-not-allowed "
                    : "bg-black/20 cursor-pointer hover:bg-blue-500 hover:text-white"
                }`}
                onMouseDown={(e: any) => {
                  e.preventDefault();
                  if (!handleCheckType(dataType[3].type))
                    handleToolMouseMoveTransRow(e, dataType[3]);
                }}
                onMouseUp={() => {}}
              >
                <AiFillLike />
                <span className="select-none">{dataType[3].name}</span>
              </li>
              <li
                className={`px-2 py-3 rounded-lg flex gap-x-2 items-center  text-sm font-bold uppercase ${
                  handleCheckType(dataType[4].type)
                    ? "bg-black/30 text-blue-500 cursor-not-allowed "
                    : "bg-black/20 cursor-pointer hover:bg-blue-500 hover:text-white"
                }`}
                onMouseDown={(e: any) => {
                  e.preventDefault();
                  if (!handleCheckType(dataType[4].type))
                    handleToolMouseMoveTransRow(e, dataType[4]);
                }}
                onMouseUp={() => {}}
              >
                <HiDocumentCheck />
                <span className="select-none">{dataType[4].name}</span>
              </li>
              <li
                className={`px-2 py-3 rounded-lg flex gap-x-2 items-center  text-sm font-bold uppercase ${
                  handleCheckType(dataType[5].type)
                    ? "bg-black/30 text-blue-500 cursor-not-allowed "
                    : "bg-black/20 cursor-pointer hover:bg-blue-500 hover:text-white"
                }`}
                onMouseDown={(e: any) => {
                  e.preventDefault();
                  if (!handleCheckType(dataType[5].type))
                    handleToolMouseMoveTransRow(e, dataType[5]);
                }}
                onMouseUp={() => {}}
              >
                <PiProjectorScreenChartFill />
                <span className="select-none">{dataType[5].name}</span>
              </li>
              <li
                className={`px-2 py-3 rounded-lg flex gap-x-2 items-center  text-sm font-bold uppercase ${
                  handleCheckType(dataType[6].type)
                    ? "bg-black/30 text-blue-500 cursor-not-allowed "
                    : "bg-black/20 cursor-pointer hover:bg-blue-500 hover:text-white"
                }`}
                onMouseDown={(e: any) => {
                  e.preventDefault();
                  if (!handleCheckType(dataType[6].type))
                    handleToolMouseMoveTransRow(e, dataType[6]);
                }}
                onMouseUp={() => {}}
              >
                <PiStudentFill />
                <span className="select-none">{dataType[6].name}</span>
              </li>
              <li
                className={`px-2 py-3 rounded-lg flex gap-x-2 items-center  text-sm font-bold uppercase ${
                  handleCheckType(dataType[7].type)
                    ? "bg-black/30 text-blue-500 cursor-not-allowed "
                    : "bg-black/20 cursor-pointer hover:bg-blue-500 hover:text-white"
                }`}
                onMouseDown={(e: any) => {
                  e.preventDefault();
                  if (!handleCheckType(dataType[7].type))
                    handleToolMouseMoveTransRow(e, dataType[7]);
                }}
                onMouseUp={() => {}}
              >
                <AiOutlineAreaChart />
                <span className="select-none">{dataType[7].name}</span>
              </li>
              <li
                className={`px-2 py-3 rounded-lg flex gap-x-2 items-center  text-sm font-bold uppercase ${
                  handleCheckType(dataType[8].type)
                    ? "bg-black/30 text-blue-500 cursor-not-allowed "
                    : "bg-black/20 cursor-pointer hover:bg-blue-500 hover:text-white"
                }`}
                onMouseDown={(e: any) => {
                  e.preventDefault();
                  if (!handleCheckType(dataType[8].type))
                    handleToolMouseMoveTransRow(e, dataType[8]);
                }}
                onMouseUp={() => {}}
              >
                <GiSkills />
                <span className="select-none">{dataType[8].name}</span>
              </li>
            </ul>
          </div>
        </div>
        <div
          className={`p-4 w-full flex group justify-center items-center cursor-pointer flex-col gap-y-2 rounded-lg  shadow-[rgba(17,_17,_26,_0.1)_0px_0px_16px] ${
            func === 2 ? "bg-blue-500" : "bg-white hover:bg-blue-500"
          }`}
          onClick={() => {
            if (func === 2) {
              setFunc(-1);
            } else setFunc(2);
          }}
        >
          <BsBriefcaseFill
            className={`text-3xl   ${
              func === 2 ? "text-white" : "text-blue-500 group-hover:text-white"
            }`}
          />
          <button
            className={`font-medium text-xs text-center  ${
              func === 2 ? "text-white" : "group-hover:text-white"
            }`}
          >
            Việc làm gợi ý
          </button>
          <div
            className={`absolute bg-white shadow-[rgba(17,_17,_26,_0.1)_0px_0px_16px] top-0 left-full translate-x-4 rounded-lg w-80 h-full p-2 transition-all ${
              func === 2 ? "" : "hidden"
            }`}
          >
            <h1 className="font-medium text-xl mb-10">
              Việc làm phù hợp với CV
            </h1>
          </div>
        </div>
        <div
          className={`p-4 w-full flex justify-center group items-center cursor-pointer flex-col gap-y-2 rounded-lg  shadow-[rgba(17,_17,_26,_0.1)_0px_0px_16px] ${
            func === 3 ? "bg-blue-500" : "bg-white hover:bg-blue-500"
          }`}
          onClick={() => {
            if (func === 3) {
              setFunc(-1);
            } else setFunc(3);
          }}
        >
          <AiFillExclamationCircle
            className={`text-3xl   ${
              func === 3 ? "text-white" : "text-blue-500 group-hover:text-white"
            }`}
          />
          <button
            className={`font-medium text-xs text-center  ${
              func === 3 ? "text-white" : "group-hover:text-white"
            }`}
          >
            Hướng dẫn sử dụng
          </button>
          <div
            className={`absolute bg-white shadow-[rgba(17,_17,_26,_0.1)_0px_0px_16px] top-0 left-full translate-x-4 rounded-lg w-80 h-full p-2 transition-all ${
              func === 3 ? "" : "hidden"
            }`}
          >
            <h1 className="font-medium text-xl mb-10">Tip hướng dẫn</h1>
          </div>
        </div>
      </div>
      <BGLayout />
    </>
  );
};

export default Option;
