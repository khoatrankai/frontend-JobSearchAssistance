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
          <div className="flex flex-col gap-4 justify-center items-center">
            <TextEditorOne
              placeholder={"Họ tên"}
              className={"!text-3xl font-semibold text-center"}
            />
            <div className="flex flex-wrap">
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
                  className={"text-sm "}
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
