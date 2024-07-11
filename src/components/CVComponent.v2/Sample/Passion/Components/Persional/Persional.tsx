import React, { ReactNode, useRef } from "react";
import { MdDateRange } from "react-icons/md";
import { FaPhone } from "react-icons/fa6";
import { MdOutlineEmail } from "react-icons/md";
import { TbWorld } from "react-icons/tb";
import { LiaAddressCard } from "react-icons/lia";
import { FaCamera, FaInfo } from "react-icons/fa";

import Image from "next/image";

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

  const TextInput = ({ className, onBlur }: any, children: ReactNode) => {
    return (
      <>
        <div
          contentEditable
          onFocus={() => {
            setCheckBlurItem(true);
          }}
          className={className}
          onBlur={onBlur}
        ></div>
      </>
    );
  };
  return (
    <>
      <div
        className="flex flex-col items-center gap-y-2 mb-4"
        onClick={(e: any) => {
          handleOnClickRow(e, index, indexItem, item);
        }}
      >
        <div
          className="w-32 h-32 rounded-full overflow-hidden relative cursor-pointer group"
          onClick={() => {
            ref_inputImg.current.click();
          }}
        >
          <Image alt="" src={imageAvatar} width={128} height={128} />
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
        <div className="relative flex items-center justify-center text-center">
          <div
            contentEditable
            ref={refItem}
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
            className="outline-none px-2 py-1 z-10 border-[1px] border-transparent text-wrap max-w-full min-w-32 focus:border-dotted focus:border-black/80 peer relative"
          >
            {data.name}
          </div>
          {data.name === "" ? (
            <span className="peer-focus:hidden h-full justify-center absolute inset-0 flex items-center text-black/50">
              Tên bạn
            </span>
          ) : (
            ""
          )}
        </div>
      </div>
      <div
        className="py-2 max-w-full px-2 font-light text-base border-2 mb-8 border-black flex justify-center"
        onClick={(e: any) => {
          handleOnClickRow(e, index, indexItem, item);
        }}
      >
        <div
          contentEditable="true"
          ref={refItem}
          className="outline-none border-[1px] border-transparent focus:border-gray-400 p-2 uppercase"
          style={{
            color: dataForm.colorTopic?.split(",")[dataForm.indexTopic],
          }}
        >
          Thông tin cá nhân
        </div>
      </div>
      <div
        className="flex flex-col gap-2  text-sm"
        onClick={(e: any) => {
          handleOnClickRow(e, index, indexItem, item);
        }}
      >
        <div className="relative flex items-center">
          <span>
            <MdDateRange />
          </span>
          <div className="relative flex items-center">
            <div
              contentEditable
              ref={refItem}
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
              className="outline-none px-2 py-1 z-10 border-[1px] border-transparent text-wrap max-w-full min-w-32 focus:border-dotted focus:border-black/80 peer relative"
            >
              {data.address}
            </div>
            {data?.address === "" ? (
              <span className="peer-focus:hidden h-full left-1 absolute inset-0 flex items-center text-black/50">
                DD/MM/YY
              </span>
            ) : (
              ""
            )}
          </div>
        </div>
        <div className="relative flex items-center">
          <span>
            <FaPhone />
          </span>
          <div className="relative flex items-center">
            <div
              contentEditable
              ref={refItem}
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
              className="outline-none px-2 py-1 z-10 border-[1px] border-transparent text-wrap max-w-full min-w-32 focus:border-dotted focus:border-black/80 peer relative"
            >
              {data.phone}
            </div>
            {data?.phone === "" ? (
              <span className="peer-focus:hidden h-full left-1 absolute inset-0 flex items-center text-black/50">
                012345678
              </span>
            ) : (
              ""
            )}
          </div>
        </div>
        <div className="relative flex items-center">
          <span>
            <MdOutlineEmail />
          </span>
          <div className="relative flex items-center">
            <div
              contentEditable
              ref={refItem}
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
              className="outline-none px-2 py-1 z-10 border-[1px] border-transparent text-wrap max-w-full min-w-32 focus:border-dotted focus:border-black/80 peer relative"
            >
              {data.email}
            </div>
            {data?.email === "" ? (
              <span className="peer-focus:hidden h-full left-1 absolute inset-0 flex items-center text-black/50">
                email@gmail.com
              </span>
            ) : (
              ""
            )}
          </div>
        </div>
        <div className="relative flex items-center">
          <span>
            <TbWorld />
          </span>
          <div className="relative flex items-center">
            <div
              contentEditable
              ref={refItem}
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
              className="outline-none px-2 py-1 z-10 border-[1px] border-transparent text-wrap max-w-full min-w-32 focus:border-dotted focus:border-black/80 peer relative"
            >
              {data.link}
            </div>
            {data?.link === "" ? (
              <span className="peer-focus:hidden h-full left-1 absolute inset-0 flex items-center text-black/50">
                facebook.com
              </span>
            ) : (
              ""
            )}
          </div>
        </div>
        <div className="relative flex items-center">
          <span>
            <LiaAddressCard />
          </span>
          <div className="relative flex items-center">
            <div
              contentEditable
              ref={refItem}
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
              className="outline-none px-2 py-1 z-10 border-[1px] border-transparent text-wrap max-w-full min-w-32 focus:border-dotted focus:border-black/80 peer relative"
            >
              {data.address}
            </div>
            {data?.address === "" ? (
              <span className="peer-focus:hidden h-full left-1 absolute inset-0 flex items-center text-black/50">
                số abc đường 123
              </span>
            ) : (
              ""
            )}
          </div>
        </div>
        {data?.moreCvInformations?.map((dt: any, i: any) => {
          return (
            <>
              <div className="relative flex items-center">
                <span>
                  <FaInfo />
                </span>
                <div className="relative flex items-center">
                  <div
                    contentEditable
                    ref={refItem}
                    onFocus={() => {
                      setCheckBlurItem(true);
                    }}
                    onBlur={(e: any) => {
                      handleChangeData(
                        index,
                        indexItem,
                        item,
                        "content",
                        i,
                        e.target.value
                      );
                    }}
                    className="outline-none px-2 py-1 z-10 border-[1px] border-transparent text-wrap max-w-full min-w-32 focus:border-dotted focus:border-black/80 peer relative"
                  >
                    {dt.content}
                  </div>
                  {dt?.content === "" ? (
                    <span className="peer-focus:hidden h-full left-1 absolute inset-0 flex items-center text-black/50">
                      số abc đường 123
                    </span>
                  ) : (
                    ""
                  )}
                </div>
              </div>
            </>
          );
        })}
      </div>
    </>
  );
};

export default Persional;
