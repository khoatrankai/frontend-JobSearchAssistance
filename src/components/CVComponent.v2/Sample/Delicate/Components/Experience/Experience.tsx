import TextEditorOne from "@/util/TextEditor/TextEditorOne";
import React, { useRef } from "react";

type Props = {
  index: any;
  indexItem: any;
  item: any;
  funcLibrary: any;
  data: any;
};

const Experience = (props: Props) => {
  const { data, funcLibrary, index, indexItem, item } = props;
  const refItem = useRef<any>();
  const {
    handleOnClickRow,
    handleChangeData,
    handleChangeTimeEnd,
    handleChangeTimeFirst,
    handleTimes,
    BGToolRowItem,
    handleChangeActive,
    handleOnClickRowItem,
    setCheckBlurItem,
    BGToolType,
    handleCheckPass,
    dataForm,
  } = funcLibrary;

  return (
    <>
      <TextEditorOne
        className={"font-semibold text-xl min-w-36"}
        placeholder={"Kinh nghiệm làm việc"}
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
        {data?.moreCvExtraInformations?.map((dt: any, i: any) => {
          return (
            <>
              <div
                className={`flex flex-wrap gap-x-4 outline-[1px] outline text-sm relative transition-all duration-500 ${
                  handleCheckPass({
                    part: index,
                    col: indexItem,
                    row: item,
                    index: i,
                  })
                    ? "outline-blue-700"
                    : "hover:outline-gray-300 outline-transparent"
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
                    placeholder={"Vị trí công việc"}
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
                      maxWidth: `${dt.maxWidth}px`,
                    }}
                  >
                    {dt.position}
                  </TextEditorOne>
                  <div
                    className="flex gap-x-2  items-center p-2 flex-wrap"
                    style={{
                      backgroundColor:
                        dataForm.colorTopic?.split(",")[dataForm.indexTopic],
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
                    placeholder={"Tên công ty"}
                    onFocus={() => {
                      setCheckBlurItem(true);
                    }}
                    onBlur={(e: any) => {
                      handleChangeData(
                        index,
                        indexItem,
                        item,
                        "company",
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
                    {dt.company}
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
                        "description",
                        i,
                        e.target.value
                      );
                    }}
                    style={{ maxWidth: `${dt.maxWidth}px` }}
                  >
                    {dt.description}
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

export default Experience;
