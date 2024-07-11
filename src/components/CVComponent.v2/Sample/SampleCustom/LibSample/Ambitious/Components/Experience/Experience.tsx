import TextEditorOne from "@/util/TextEditor/TextEditorOne";
import React, { useRef } from "react";
import { MdWork } from "react-icons/md";

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
      <div className="flex flex-col gap-1">
        <div
          className="relative flex gap-2 items-center"
          style={{
            maxWidth: `${data.maxWidth}px`,
          }}
        >
          <div
            className="p-2  w-fit relative z-10 font-medium "
            style={{
              color: dataForm.colorTopic?.split(",")[dataForm.indexTopic],
            }}
          >
            <p className="uppercase">Kinh nghiệm làm việc</p>
          </div>
          <div className="flex-1 h-full flex items-center">
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
          {data?.moreCvExtraInformations?.map((dt: any, i: any) => {
            return (
              <>
                <div
                  className={`flex flex-col duration-500 transition-all outline-[1px] outline relative ${
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
                  <div className="flex items-center flex-wrap">
                    <div className="flex gap-1 items-center">
                      <MdWork
                        style={{
                          color:
                            dataForm.colorTopic?.split(",")[
                              dataForm.indexTopic
                            ],
                        }}
                      />
                      <TextEditorOne
                        placeholder={"Vị trí công việc"}
                        className={"text-sm !min-w-32"}
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
                          maxWidth: `${dt.maxWidth}px`,
                        }}
                      >
                        {dt.position}
                      </TextEditorOne>
                    </div>

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
                      style={{
                        maxWidth: `${dt.maxWidth}px`,
                      }}
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
                      style={{
                        maxWidth: `${dt.maxWidth}px`,
                      }}
                    >
                      {handleTimes(dt)[1]}
                    </TextEditorOne>
                  </div>
                  <TextEditorOne
                    placeholder={"Tên công ty"}
                    className={"text-sm"}
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
                      maxWidth: `${dt.maxWidth}px`,
                    }}
                  >
                    {dt.company}
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
                        "description",
                        i,
                        e.target.value
                      );
                    }}
                    style={{
                      maxWidth: `${dt.maxWidth}px`,
                    }}
                  >
                    {dt.description}
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

export default Experience;
