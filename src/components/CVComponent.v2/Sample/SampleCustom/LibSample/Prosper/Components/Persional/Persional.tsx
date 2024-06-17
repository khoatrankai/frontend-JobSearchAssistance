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
        <div className="flex flex-col">
          <div
            className="w-full rounded-md overflow-hidden cursor-pointer relative flex justify-center "
            onClick={() => {
              ref_inputImg.current.click();
            }}
          >
            <Image
              className="peer"
              src={imageAvatar || "/goapply.png"}
              width={300}
              height={300}
              alt=""
            />
            <span className="absolute inset-0 hidden justify-center items-center group-hover:bg-black/40 peer-hover:flex hover:flex">
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
          <div>
            <p className="text-base font-bold uppercase">Thông tin cá nhân</p>
            <div className="flex flex-col gap-1">
              <div className="flex gap-1 items-center">
                <MdOutlineEmail />{" "}
                <TextEditorOne
                  className={"text-sm"}
                  placeholder={"Email của bạn"}
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
                >
                  {data.email}
                </TextEditorOne>
              </div>
              <div className="flex gap-1 items-center">
                <FaPhone />{" "}
                <TextEditorOne
                  className={"text-sm"}
                  placeholder={"Số điện thoại"}
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
                >
                  {data.phone}
                </TextEditorOne>
              </div>
              <div className="flex gap-1 items-center">
                <TbWorld />{" "}
                <TextEditorOne
                  className={"text-sm"}
                  placeholder={"Facebook.com"}
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
                >
                  {data.link}
                </TextEditorOne>
              </div>
              <div className="flex gap-1 items-center">
                <LiaAddressCard />{" "}
                <TextEditorOne
                  className={"text-sm"}
                  placeholder={"Địa chỉ"}
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
