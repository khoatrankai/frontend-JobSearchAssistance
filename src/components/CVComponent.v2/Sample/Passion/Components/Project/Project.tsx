/* eslint-disable react/jsx-key */
import TextEditorOne from "@/util/TextEditor/TextEditorOne";
import React, { useRef } from "react";

type Props = {
  index: any;
  indexItem: any;
  item: any;
  funcLibrary: any;
  data: any;
};

const Project = (props: Props) => {
  const { data, funcLibrary, index, indexItem, item } = props;
  const {
    handleOnClickRow,
    handleTimes,
    handleChangeTimeEnd,
    handleChangeTimeFirst,
    handleChangeData,
    BGToolRowItem,
    handleOnClickRowItem,
    handleCheckPass,
    setCheckBlurItem,
    dataForm,
  } = funcLibrary;
  const timeKey = (data: any) => {
    const currentDate = new Date();
    const timestamp = currentDate.getTime();
    return timestamp + data;
  };
  return (
    <>
      <div
        className="py-2 max-w-full px-2 font-light text-base border-2 mb-8 border-black flex justify-center"
        onClick={(e: any) => {
          handleOnClickRow(e, index, indexItem, item);
        }}
      >
        <div
          contentEditable="true"
          className="outline-none border-[1px] border-transparent focus:border-gray-400 p-2 uppercase"
          style={{
            color: dataForm.colorTopic?.split(",")[dataForm.indexTopic],
          }}
        >
          Dự án
        </div>
      </div>
      <div className="  text-sm max-w-full flex flex-col gap-y-8">
        {data.moreCvProjects?.map((dt: any, i: any) => {
          return (
            <div
              className={`relative flex flex-col gap-2 max-w-full border-[1px] ${
                handleCheckPass({
                  part: index,
                  col: indexItem,
                  row: item,
                  index: i,
                })
                  ? " border-blue-700"
                  : ""
              }`}
              onMouseDown={(e: any) => {
                setCheckBlurItem(false);

                handleOnClickRowItem(e, index, indexItem, item, i);
              }}
            >
              <div className="flex items-center flex-wrap gap-1 max-w-full">
                {/* <div className="relative max-w-full">
                  <div
                    contentEditable
                    role="textbox"
                    spellCheck="true"
                    aria-autocomplete="list"
                    className="outline-none px-2 py-1 z-10 border-[1px] border-transparent first-letter:  max-w-full min-w-32 focus:border-dotted focus:border-black/80 peer relative"
                    onBlur={(e: any) => {
                      handleChangeData(
                        index,
                        indexItem,
                        item,
                        "participant",
                        i,
                        e.target.innerText
                      );
                    }}
                    onFocus={(e: any) => {
                      setCheckBlurItem(true);
                    }}
                  >
                    {dt.participant}
                  </div>
                  {dt.participant === "" ? (
                    <span className="peer-focus:hidden h-full left-1 absolute inset-0 flex items-center text-black/50">
                      Tên dự án
                    </span>
                  ) : (
                    ""
                  )}
                </div> */}
                <TextEditorOne
                  className={
                    " min-w-32 border-[1px] border-transparent focus:border-dotted focus:border-black/80 peer"
                  }
                  onBlur={(e: any) => {
                    handleChangeData(
                      index,
                      indexItem,
                      item,
                      "participant",
                      i,
                      e.target.innerText
                    );
                  }}
                  onFocus={(e: any) => {
                    setCheckBlurItem(true);
                  }}
                  placeholder={"Tên dự án"}
                  classNamePlaceholder={" text-black/50"}
                  style={{ maxWidth: `${dt.maxWidth}px` }}
                >
                  {dt.participant}
                </TextEditorOne>
                <span>|</span>
                <div className="relative">
                  <div
                    contentEditable
                    className="outline-none px-2 py-1 z-10 border-[1px] border-transparent text-wrap max-w-full min-w-16 focus:border-dotted focus:border-black/80 peer relative"
                    onBlur={(e: any) => {
                      handleChangeTimeFirst(
                        e.target.value,
                        index,
                        indexItem,
                        item,
                        dt,
                        i
                      );
                    }}
                    onFocus={() => {
                      setCheckBlurItem(true);
                    }}
                  >
                    {handleTimes(dt)[0]}
                  </div>
                  {handleTimes(dt)[0] === "" ? (
                    <span className="peer-focus:hidden h-full left-1 absolute inset-0 flex items-center text-black/50">
                      Bắt đầu
                    </span>
                  ) : (
                    ""
                  )}
                </div>
                <span>-</span>
                <div className="relative">
                  <div
                    contentEditable
                    className="outline-none px-2 py-1 z-10 border-[1px] border-transparent text-wrap max-w-full min-w-20 focus:border-dotted focus:border-black/80 peer relative"
                    onFocus={(e: any) => {
                      setCheckBlurItem(true);
                    }}
                    onBlur={(e: any) => {
                      handleChangeTimeEnd(
                        e.target.value,
                        index,
                        indexItem,
                        item,
                        dt,
                        i
                      );
                    }}
                  >
                    {handleTimes(dt)[1]}
                  </div>
                  {handleTimes(dt)[1] === "" ? (
                    <span className="peer-focus:hidden h-full left-1 absolute inset-0 flex items-center text-black/50">
                      Kết thúc
                    </span>
                  ) : (
                    ""
                  )}
                </div>
              </div>
              {/* <div className="flex items-center flex-wrap gap-2">
          <div className="relative">
            <div
              contentEditable
              className="outline-none px-2 py-1 z-10 border-[1px] border-transparent text-wrap max-w-full min-w-32 focus:border-dotted focus:border-black/80 peer relative"
            ></div>
            <span className="peer-focus:hidden h-full left-1 absolute inset-0 flex items-center text-black/50">
              Khách hàng
            </span>
          </div>

          <div className="relative">
            <div
              contentEditable
              className="outline-none px-2 py-1 z-10 border-[1px] border-transparent text-wrap max-w-full min-w-32 focus:border-dotted focus:border-black/80 peer relative"
            ></div>
            <span className="peer-focus:hidden h-full left-1 absolute inset-0 flex items-center text-black/50">
              Tên khách hàng
            </span>
          </div>
        </div> */}
              {/* <div className="flex items-center flex-wrap gap-2">
          <div className="relative">
            <div
              contentEditable
              className="outline-none px-2 py-1 z-10 border-[1px] border-transparent text-wrap max-w-full min-w-32 focus:border-dotted focus:border-black/80 peer relative"
            ></div>
            <span className="peer-focus:hidden h-full left-1 absolute inset-0 flex items-center text-black/50">
              Số lượng người tham gia
            </span>
          </div>

          <div className="relative">
            <div
              contentEditable
              className="outline-none px-2 py-1 z-10 border-[1px] border-transparent text-wrap max-w-full min-w-16 focus:border-dotted focus:border-black/80 peer relative"
            ></div>
            <span className="peer-focus:hidden h-full left-1 absolute inset-0 flex items-center text-black/50">
              Số lượng
            </span>
          </div>
        </div> */}
              <div className="flex items-center flex-wrap gap-2">
                <div className="relative">
                  <div
                    contentEditable
                    className="outline-none px-2 py-1 z-10 border-[1px] border-transparent text-wrap max-w-full min-w-32 focus:border-dotted focus:border-black/80 peer relative"
                    onBlur={(e: any) => {
                      handleChangeData(
                        index,
                        indexItem,
                        item,
                        "position",
                        i,
                        e.target.value
                      );
                    }}
                    onFocus={(e: any) => {
                      setCheckBlurItem(true);
                    }}
                  >
                    {dt.position}
                  </div>
                  {dt.position === "" ? (
                    <span className="peer-focus:hidden h-full left-1 absolute inset-0 flex items-center text-black/50">
                      Vị trí
                    </span>
                  ) : (
                    ""
                  )}
                </div>

                {/* <div className="relative">
            <div
              contentEditable
              className="outline-none px-2 py-1 z-10 border-[1px] border-transparent text-wrap max-w-full min-w-32 focus:border-dotted focus:border-black/80 peer relative"
            ></div>
            <span className="peer-focus:hidden h-full left-1 absolute inset-0 flex items-center text-black/50">
              Vị trí trong dự án của bạn
            </span>
          </div> */}
              </div>
              <div className="relative">
                <div
                  contentEditable
                  className="outline-none px-2 py-1 z-10 border-[1px] border-transparent text-wrap max-w-full min-w-32 focus:border-dotted focus:border-black/80 peer relative"
                  onFocus={(e: any) => {
                    setCheckBlurItem(true);
                  }}
                  onBlur={(e: any) => {
                    handleChangeData(
                      index,
                      indexItem,
                      item,
                      "functionality",
                      i,
                      e.target.value
                    );
                  }}
                >
                  {dt.functionality}
                </div>
                {dt.functionality === "" ? (
                  <span className="peer-focus:hidden h-full left-1 absolute inset-0 flex items-center text-black/50">
                    Mô tả
                  </span>
                ) : (
                  ""
                )}
              </div>
              <div className="relative">
                <div
                  contentEditable
                  className="outline-none px-2 py-1 z-10 border-[1px] border-transparent text-wrap max-w-full min-w-32 focus:border-dotted focus:border-black/80 peer relative"
                  onFocus={(e: any) => {
                    setCheckBlurItem(true);
                  }}
                  onBlur={(e: any) => {
                    handleChangeData(
                      index,
                      indexItem,
                      item,
                      "technology",
                      i,
                      e.target.value
                    );
                  }}
                >
                  {dt.technology}
                </div>
                {dt.technology === "" ? (
                  <span className="peer-focus:hidden h-full left-1 absolute inset-0 flex items-center text-black/50">
                    Mô tả công nghệ
                  </span>
                ) : (
                  ""
                )}
              </div>
              {/* <div className="relative">
                <div
                  contentEditable
                  className="outline-none px-2 py-1 z-10 border-[1px] border-transparent text-wrap max-w-full min-w-32 focus:border-dotted focus:border-black/80 peer relative"
                ></div>
                <span className="peer-focus:hidden h-full left-1 absolute inset-0 flex items-center text-black/50">
                  Mô tả công nghệ
                </span>
              </div> */}
              <BGToolRowItem
                index={index}
                indexItem={indexItem}
                item={item}
                i={i}
              />
            </div>
          );
        })}
      </div>
    </>
  );
};

export default Project;
