/* eslint-disable react/jsx-key */

import React, { useEffect, useRef, useState } from "react";
import LibCvV2 from "../Lib/Lib.cv.v2";
import Image from "next/image";
import { MdKeyboardArrowRight, MdKeyboardArrowLeft } from "react-icons/md";
import axios from "axios";
import { PDFDownloadLink } from "@react-pdf/renderer";
import Passion from "../PDF/Sample/Passion/Passion";

type Props = { id: any; funcLibrary: any };

const Option = (props: Props) => {
  const { id, funcLibrary } = props;
  const [titleCV, setTitleCV] = useState<any>("");
  const [backNext, setBackNext] = useState<any>();
  const refBtnMenu = useRef<any>();
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
    BGLayout,
  } = funcLibrary;
  const [func, setFunc] = useState<any>(0);
  const [typeTemplate, setTypeTemplate] = useState<any>([
    { id: 0 },
    { id: 1 },
    { id: 2 },
    { id: 0 },
    { id: 1 },
    { id: 2 },
    { id: 0 },
    { id: 1 },
    { id: 2 },
    { id: 0 },
    { id: 1 },
    { id: 2 },
    { id: 0 },
    { id: 1 },
    { id: 2 },
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
  const [templateId, setTemplateId] = useState<any>(id);
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
  const handleNext = () => {
    if (Object.keys(backNext.next).length !== 0) {
      setDataLoad(backNext.next.present);
      setBackNext({
        ...backNext,
        back: backNext.next.back,
        present: backNext.next.present,
        next: backNext.next.next,
      });
    }
  };
  const handlePrev = () => {
    if (Object.keys(backNext.back).length !== 0) {
      setDataLoad(backNext.back.present);

      setBackNext({
        ...backNext,
        back: backNext.back.back,
        present: backNext.back.present,
        next: backNext,
      });
    }
  };

  return (
    <>
      <div className="fixed flex flex-col top-40 gap-y-4 h-full z-[20]">
        <div
          className={`p-3 rounded-lg  shadow-[rgba(17,_17,_26,_0.1)_0px_0px_16px] ${
            func === 0 ? "bg-blue-50" : "bg-white"
          }`}
          onClick={() => {
            setFunc(0);
          }}
        >
          <Image
            className="w-8"
            src={"/iconmanyfile.svg"}
            alt=""
            width={200}
            height={200}
          />
          <div
            className={`absolute bg-white shadow-[rgba(17,_17,_26,_0.1)_0px_0px_16px] inset-y-0 bottom-8 left-full translate-x-4 rounded-lg w-96 p-2  transition-all${
              func === 0 ? "" : "hidden"
            }`}
          >
            <h1 className="font-bold text-base mb-10">Template</h1>
            <ul className="flex flex-wrap gap-2 overflow-y-scroll">
              {typeTemplate?.map((dt: any, index: any) => {
                return (
                  <li
                    className={`w-24 h-24 object-contain rounded-xl overflow-hidden  text-sm font-bold uppercase  cursor-pointer  ${
                      templateId == dt.id
                        ? "bg-black/10"
                        : "bg-black/20 hover:bg-black/10"
                    }`}
                    onClick={() => {
                      setTemplateId(dt.id);
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
          className={`p-3 rounded-lg  shadow-[rgba(17,_17,_26,_0.1)_0px_0px_16px] ${
            func === 1 ? "bg-blue-50" : "bg-white"
          }`}
          onClick={() => {
            setFunc(1);
          }}
        >
          <Image
            className="w-8"
            src={"/iconaddfile.svg"}
            alt=""
            width={200}
            height={200}
          />
          <div
            className={`absolute bg-white shadow-[rgba(17,_17,_26,_0.1)_0px_0px_16px] top-0 left-full translate-x-4 rounded-lg w-80 h-full p-2 transition-all ${
              func === 1 ? "" : "hidden"
            }`}
          >
            <h1 className="font-bold text-base mb-10">Mục lục chức năng</h1>
            <ul className="flex flex-wrap gap-2">
              {dataType.map((dt: any) => {
                return (
                  <li
                    className={`p-2 w-24 h-24 rounded-xl  text-sm font-bold uppercase ${
                      handleCheckType(dt.type)
                        ? "bg-black/30 text-black/40 cursor-not-allowed "
                        : "bg-black/20 cursor-pointer hover:bg-black/10"
                    }`}
                    onMouseDown={(e: any) => {
                      e.preventDefault();
                      if (!handleCheckType(dt.type))
                        handleToolMouseMoveTransRow(e, dt);
                    }}
                    onMouseUp={() => {}}
                  >
                    <span className="select-none">{dt.name}</span>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </div>
      <div className="fixed top-20 flex justify-between py-3 w-full z-40 gap-x-10 bg-white  px-8">
        <div className="flex-1">
          <input
            className="outline-none text-lg font-semibold h-full w-full"
            type="text"
            value={titleCV ?? ""}
            placeholder="Tiêu đề"
            onChange={(e: any) => {
              setTitleCV(e.target.value);
            }}
          />
        </div>
        <div className={`flex gap-x-4  text-white`} ref={refBtnMenu}>
          {true && (
            <div className="flex gap-x-2 text-black text-3xl">
              <button
                className={`p-2 rounded-xl  shadow-[rgba(17,_17,_26,_0.1)_0px_0px_16px] ${
                  false ? "cursor-not-allowed" : " hover:bg-blue-50"
                }`}
                onMouseDown={handlePrev}
              >
                <MdKeyboardArrowLeft />
              </button>
              <button
                className={`p-2 rounded-xl  shadow-[rgba(17,_17,_26,_0.1)_0px_0px_16px]  ${
                  false ? "cursor-not-allowed" : " hover:bg-blue-50"
                }`}
                // onClick={handleNext}
                onMouseDown={handleNext}
              >
                <MdKeyboardArrowRight />
              </button>
            </div>
          )}

          <button
            className="p-2 font-semibold text-blue-500  shadow-[rgba(17,_17,_26,_0.1)_0px_0px_16px] border-2 hover:bg-blue-500 hover:text-white rounded-lg"
            // onClick={handleBtnSave}
          >
            <PDFDownloadLink
              document={<Passion funcLibrary={funcLibrary} />}
              fileName={`${titleCV ? titleCV : "CV-old"}-${id}.pdf`}
            >
              {({ blob, url, loading, error }) =>
                loading ? "Đang cập nhật..." : "Lưu và tải xuống"
              }
            </PDFDownloadLink>
          </button>
          <button
            className="p-2 font-semibold bg-blue-500 rounded-lg"
            // onClick={handleBtnSave}
          >
            Lưu lại
          </button>
        </div>
      </div>
    </>
  );
};

export default Option;
