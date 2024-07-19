/* eslint-disable react/jsx-key */
import TextEditorOne from "@/util/TextEditor/TextEditorOne";
import React, { useRef } from "react";
import { PiProjectorScreenChartDuotone } from "react-icons/pi";

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
      <div className="flex flex-col">
        <div
          className="relative pl-8"
          style={{
            maxWidth: `${data.maxWidth}px`,
          }}
        >
          <div
            className="p-2 rounded-lg border-[1px] w-fit relative z-10"
            style={{
              borderColor: dataForm.colorTopic?.split(",")[dataForm.indexTopic],
            }}
          >
            <p className="uppercase">Dự án</p>
          </div>
          <div className="absolute inset-0 flex items-center z">
            <div
              className="h-[1px] w-full "
              style={{
                backgroundColor:
                  dataForm.colorTopic?.split(",")[dataForm.indexTopic],
              }}
            ></div>
          </div>
        </div>
        <div className="flex flex-col gap-1">
          {data?.moreCvProjects?.map((dt: any, i: any) => {
            return (
              <>
                <div
                  className={`flex flex-col  outline-[1px] outline relative transition-all duration-500 ${
                    handleCheckPass({
                      part: index,
                      col: indexItem,
                      row: item,
                      index: i,
                    })
                      ? "outline-blue-700"
                      : "hover:outline-gray-300 outline-transparent"
                  }`}
                  key={i}
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
                  <div className="flex items-center">
                    <div className="flex gap-1 items-center">
                      <PiProjectorScreenChartDuotone
                        style={{
                          color:
                            dataForm.colorTopic?.split(",")[
                              dataForm.indexTopic
                            ],
                        }}
                      />
                      <TextEditorOne
                        placeholder={"Tên dự án"}
                        className={"text-sm"}
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
                        style={{ maxWidth: `${dt.maxWidth}px` }}
                      >
                        {dt.name}
                      </TextEditorOne>
                    </div>
                    <span>/</span>

                    <TextEditorOne
                      placeholder={"Bắt đầu"}
                      className={"text-sm"}
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
                    <TextEditorOne
                      placeholder={"Kết thúc"}
                      className={"text-sm"}
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
                  <TextEditorOne
                    placeholder={"Số lượng người tham gia"}
                    className={"text-sm"}
                    onFocus={() => {
                      setCheckBlurItem(true);
                    }}
                    onBlur={(e: any) => {
                      handleChangeData(
                        index,
                        indexItem,
                        item,
                        "participant",
                        i,
                        e.target.value
                      );
                    }}
                    style={{ maxWidth: `${dt.maxWidth}px` }}
                  >
                    {dt.participant}
                  </TextEditorOne>
                  <TextEditorOne
                    placeholder={"Vị trí của bạn"}
                    className={"text-sm"}
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
                    style={{ maxWidth: `${dt.maxWidth}px` }}
                  >
                    {dt.position}
                  </TextEditorOne>

                  <TextEditorOne
                    placeholder={"Công nghệ sử dụng"}
                    className={"text-sm"}
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
                  <TextEditorOne
                    placeholder={"Mô tả"}
                    className={"text-sm"}
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
      </div>
    </>
  );
};

export default Project;
