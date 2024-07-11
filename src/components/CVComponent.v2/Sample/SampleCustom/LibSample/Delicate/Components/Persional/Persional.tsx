import React, { useRef } from "react";
import { MdDateRange } from "react-icons/md";
import { FaPhone } from "react-icons/fa6";
import { MdOutlineEmail } from "react-icons/md";
import { TbWorld } from "react-icons/tb";
import { LiaAddressCard } from "react-icons/lia";
import { FaCamera, FaInfo } from "react-icons/fa";

import Image from "next/image";
import TextEditorOne from "@/util/TextEditor/TextEditorOne";

type Props = {
  index: any;
  indexItem: any;
  item: any;
  funcLibrary: any;
  data: any;
};

const Persional = (props: Props) => {
  const { data, funcLibrary, index, indexItem, item } = props;
  // //console.log(data);
  const refItem = useRef<any>();
  const {
    handleOnClickRow,
    handleChangeData,
    BGToolRowItem,
    setCheckBlurItem,
    dataForm,
    imageAvatar,
    handleUploadImage,
  } = funcLibrary;
  const ref_inputImg = useRef<any>();
  return (
    <>
      {data && (
        <div className="flex justify-between min-h-[250px]">
          <div
            className="w-[200px] h-full relative cursor-pointer group"
            onClick={() => {
              ref_inputImg.current.click();
            }}
          >
            <Image alt="" src={imageAvatar} height={250} width={200} />

            <span className="absolute inset-0 hidden justify-center items-center group-hover:bg-black/40 group-hover:flex">
              <FaCamera className="w-8 h-8 text-white" />
            </span>
            <input
              type="file"
              hidden
              ref={ref_inputImg}
              onChange={(e: any) => {
                handleUploadImage(e, index, indexItem, item);
              }}
            />
          </div>
          <div className="flex flex-col gap-y-2 w-[330px] px-4 pt-8">
            <TextEditorOne
              classNamePlaceholder={"font-semibold text-2xl text-black/50"}
              className={
                " font-semibold text-3xl  border-[1px] border-transparent text-wrap  focus:border-dotted focus:border-black/80"
              }
              onFocus={() => {
                setCheckBlurItem(true);
              }}
              onBlur={(e: any) => {
                handleChangeData(
                  index,
                  indexItem,
                  item,
                  "name",
                  null,
                  e.target.value
                );
              }}
              placeholder={"Tên bạn"}
            >
              {data.name}
            </TextEditorOne>
            <TextEditorOne
              classNamePlaceholder={"text-sm font-light text-gray-300"}
              className={
                "  text-sm font-light text-gray-500 border-[1px] border-transparent text-wrap  focus:border-dotted focus:border-black/80"
              }
              onFocus={() => {
                setCheckBlurItem(true);
              }}
              onBlur={(e: any) => {
                handleChangeData(
                  index,
                  indexItem,
                  item,
                  "content",
                  0,
                  e.target.value
                );
              }}
              placeholder={"Vị trí ứng tuyển"}
            >
              {data?.moreCvInformations?.[0]?.content}
            </TextEditorOne>
          </div>
          <div className="flex flex-col flex-1">
            <div className="flex items-center gap-x-4  h-full">
              <span
                className="px-2 h-full flex justify-center items-center"
                style={{
                  backgroundColor:
                    dataForm.colorTopic?.split(",")[dataForm.indexTopic],
                  color: "white",
                }}
              >
                <FaPhone />
              </span>
              <div className="p-2 w-full">
                <TextEditorOne
                  classNamePlaceholder={"text-sm font-light text-black/50"}
                  className={
                    "  text-sm font-light border-[1px] border-transparent text-wrap  focus:border-dotted focus:border-black/80"
                  }
                  onFocus={() => {
                    setCheckBlurItem(true);
                  }}
                  onBlur={(e: any) => {
                    handleChangeData(
                      index,
                      indexItem,
                      item,
                      "phone",
                      null,
                      e.target.value
                    );
                  }}
                  placeholder={"012345678"}
                >
                  {data.phone}
                </TextEditorOne>
              </div>
            </div>
            <div className="flex items-center gap-x-4  h-full">
              <span
                className="px-2 h-full flex justify-center items-center"
                style={{
                  backgroundColor:
                    dataForm.colorTopic?.split(",")[dataForm.indexTopic],
                  color: "white",
                }}
              >
                <MdDateRange />
              </span>
              <div className="p-2 w-full">
                <TextEditorOne
                  classNamePlaceholder={"text-sm font-light text-black/50"}
                  className={
                    "  text-sm font-light border-[1px] border-transparent text-wrap  focus:border-dotted focus:border-black/80"
                  }
                  onFocus={() => {
                    setCheckBlurItem(true);
                  }}
                  onBlur={(e: any) => {
                    handleChangeData(
                      index,
                      indexItem,
                      item,
                      "intent",
                      null,
                      e.target.value
                    );
                  }}
                  placeholder={"DD/MM/YY"}
                >
                  {data.intent}
                </TextEditorOne>
              </div>
            </div>
            <div className="flex items-center gap-x-4  h-full">
              <span
                className="px-2 h-full flex justify-center items-center"
                style={{
                  backgroundColor:
                    dataForm.colorTopic?.split(",")[dataForm.indexTopic],
                  color: "white",
                }}
              >
                <MdOutlineEmail />
              </span>
              <div className="p-2 w-full">
                <TextEditorOne
                  classNamePlaceholder={"text-sm font-light text-black/50"}
                  className={
                    "  text-sm font-light border-[1px] border-transparent text-wrap  focus:border-dotted focus:border-black/80"
                  }
                  onFocus={() => {
                    setCheckBlurItem(true);
                  }}
                  onBlur={(e: any) => {
                    handleChangeData(
                      index,
                      indexItem,
                      item,
                      "email",
                      null,
                      e.target.value
                    );
                  }}
                  placeholder={"email@gmail.com"}
                >
                  {data.email}
                </TextEditorOne>
              </div>
            </div>
            <div className="flex items-center gap-x-4  h-full">
              <span
                className="px-2 h-full flex justify-center items-center"
                style={{
                  backgroundColor:
                    dataForm.colorTopic?.split(",")[dataForm.indexTopic],
                  color: "white",
                }}
              >
                <TbWorld />
              </span>
              <div className="p-2 w-full">
                <TextEditorOne
                  classNamePlaceholder={"text-sm font-light text-black/50"}
                  className={
                    "  text-sm font-light border-[1px] border-transparent text-wrap  focus:border-dotted focus:border-black/80"
                  }
                  onFocus={() => {
                    setCheckBlurItem(true);
                  }}
                  onBlur={(e: any) => {
                    handleChangeData(
                      index,
                      indexItem,
                      item,
                      "link",
                      null,
                      e.target.value
                    );
                  }}
                  placeholder={"facebook.com"}
                >
                  {data.link}
                </TextEditorOne>
              </div>
            </div>
            <div className="flex items-center gap-x-4  h-full">
              <span
                className="px-2 h-full flex justify-center items-center"
                style={{
                  backgroundColor:
                    dataForm.colorTopic?.split(",")[dataForm.indexTopic],
                  color: "white",
                }}
              >
                <LiaAddressCard />
              </span>
              <div className="p-2 w-full">
                <TextEditorOne
                  classNamePlaceholder={"text-sm font-light text-black/50"}
                  className={
                    "  text-sm font-light border-[1px] border-transparent text-wrap  focus:border-dotted focus:border-black/80"
                  }
                  onFocus={() => {
                    setCheckBlurItem(true);
                  }}
                  onBlur={(e: any) => {
                    handleChangeData(
                      index,
                      indexItem,
                      item,
                      "address",
                      null,
                      e.target.value
                    );
                  }}
                  placeholder={"27/4 duong 123"}
                >
                  {data.address}
                </TextEditorOne>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Persional;
