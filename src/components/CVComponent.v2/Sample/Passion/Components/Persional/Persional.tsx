import React, { useRef } from "react";
import { MdDateRange } from "react-icons/md";
import { FaPhone } from "react-icons/fa6";
import { MdOutlineEmail } from "react-icons/md";
import { TbWorld } from "react-icons/tb";
import { LiaAddressCard } from "react-icons/lia";
import { FaInfo } from "react-icons/fa";

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
  console.log(data);
  const refItem = useRef<any>();
  const {
    handleOnClickRow,
    handleChangeData,
    BGToolRowItem,
    setCheckBlurItem,
  } = funcLibrary;

  return (
    <>
      <div className="flex flex-col items-center gap-y-2 mb-4">
        <div className="w-32 h-32 rounded-full overflow-hidden">
          <Image alt="" src={"/goapply.png"} width={128} height={128} />
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
                e.target.innerHTML
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
        >
          Thông tin cá nhân
        </div>
      </div>
      <div className="flex flex-col gap-2  text-sm">
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
                  e.target.innerHTML
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
                  e.target.innerHTML
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
                  e.target.innerHTML
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
                  e.target.innerHTML
                );
              }}
              className="outline-none px-2 py-1 z-10 border-[1px] border-transparent text-wrap max-w-full min-w-32 focus:border-dotted focus:border-black/80 peer relative"
            >
              {data.link}
            </div>
            {data?.email === "" ? (
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
                  e.target.innerHTML
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
                        e.target.innerHTML
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
