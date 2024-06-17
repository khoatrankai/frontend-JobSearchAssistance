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
    BGToolType,
    handleChangeActive,
    dataForm,
  } = funcLibrary;
  const timeKey = (data: any) => {
    const currentDate = new Date();
    const timestamp = currentDate.getTime();
    return timestamp + data;
  };
  return (
    <>
      <TextEditorOne
        className={"font-semibold text-xl min-w-36"}
        placeholder={"Dự án"}
        onFocus={() => {}}
        onBlur={() => {}}
        style={{
          color: dataForm.colorTopic?.split(",")[dataForm.indexTopic],
          maxWidth: `${data.maxWidth}px`,
        }}
      ></TextEditorOne>
      <div
        className="h-1 w-14 my-4"
        style={{
          backgroundColor: dataForm.colorTopic?.split(",")[dataForm.indexTopic],
        }}
      ></div>
      <div className="flex flex-col gap-2  text-sm">
        {data?.moreCvProjects?.map((dt: any, i: any) => {
          return (
            <>
              <div
                className={`flex flex-wrap gap-x-4 border-[1px] text-sm relative transition-all duration-500 ${
                  handleCheckPass({
                    part: index,
                    col: indexItem,
                    row: item,
                    index: i,
                  })
                    ? "border-blue-700"
                    : "hover:border-gray-300 border-transparent"
                }`}
                style={{ padding: dt?.padIndex ? "10px" : "4px" }}
                onClick={(e: any) => {
                  e.stopPropagation();
                  handleChangeActive({
                    part: index,
                    col: indexItem,
                    row: item,
                    index: i,
                  });
                }}
              >
                <div className="flex flex-col gap-y-2">
                  <TextEditorOne
                    className={"text-sm min-w-36"}
                    placeholder={"Vị trí dự án"}
                    onFocus={() => {
                      setCheckBlurItem(true);
                    }}
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
                    style={{
                      color:
                        dataForm.colorTopic?.split(",")[dataForm.indexTopic],
                    }}
                  >
                    {dt.position}
                  </TextEditorOne>
                  <div
                    className="flex gap-x-2  items-center p-2 flex-wrap"
                    style={{
                      backgroundColor:
                        dataForm.colorTopic?.split(",")[dataForm.indexTopic],
                      maxWidth: `${dt.maxWidth}px`,
                    }}
                  >
                    <TextEditorOne
                      className={"text-sm bg-transparent text-white min-w-16"}
                      placeholder={"Bắt đầu"}
                      onFocus={() => {
                        setCheckBlurItem(true);
                      }}
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
                      style={{ maxWidth: `${dt.maxWidth}px` }}
                    >
                      {handleTimes(dt)[0]}
                    </TextEditorOne>
                    <span className="text-white">-</span>
                    <TextEditorOne
                      className={"text-sm bg-transparent text-white min-w-16"}
                      placeholder={"Kết thúc"}
                      onFocus={() => {
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
                      style={{ maxWidth: `${dt.maxWidth}px` }}
                    >
                      {handleTimes(dt)[1]}
                    </TextEditorOne>
                  </div>
                </div>
                <div className="flex flex-col items-center h-auto">
                  <div
                    className="w-2 h-2 rounded-full"
                    style={{
                      backgroundColor:
                        dataForm.colorTopic?.split(",")[dataForm.indexTopic],
                    }}
                  ></div>
                  <div
                    className="w-[1px] flex-1 rounded-full"
                    style={{
                      backgroundColor:
                        dataForm.colorTopic?.split(",")[dataForm.indexTopic],
                    }}
                  ></div>
                </div>
                <div>
                  <TextEditorOne
                    className={" "}
                    placeholder={"Tên dự án"}
                    onFocus={() => {
                      setCheckBlurItem(true);
                    }}
                    onBlur={(e: any) => {
                      handleChangeData(
                        index,
                        indexItem,
                        item,
                        "name",
                        i,
                        e.target.value
                      );
                    }}
                    style={{
                      color:
                        dataForm.colorTopic?.split(",")[dataForm.indexTopic],
                      maxWidth: `${dt.maxWidth}px`,
                    }}
                  >
                    {dt.participant}
                  </TextEditorOne>
                  <TextEditorOne
                    className={"text-sm text-black "}
                    placeholder={"Mô tả"}
                    onFocus={() => {
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
                    style={{ maxWidth: `${dt.maxWidth}px` }}
                  >
                    {dt.functionality}
                  </TextEditorOne>
                  <TextEditorOne
                    className={"text-sm text-black "}
                    placeholder={"Mô tả công nghệ"}
                    onFocus={() => {
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
                    style={{ maxWidth: `${dt.maxWidth}px` }}
                  >
                    {dt.technology}
                  </TextEditorOne>
                </div>
                <BGToolRowItem
                  index={index}
                  indexItem={indexItem}
                  item={item}
                  i={i}
                />
                <BGToolType
                  iPart={index}
                  iCol={indexItem}
                  iRow={item}
                  index={i}
                />
              </div>
            </>
          );
        })}
      </div>
    </>
  );
};

export default Project;
