import TextEditorOne from "@/util/TextEditor/TextEditorOne";
import React, { useRef } from "react";
import { FaUserGraduate } from "react-icons/fa";

type Props = {
  index: any;
  indexItem: any;
  item: any;
  funcLibrary: any;
  data: any;
};

const Study = (props: Props) => {
  const { data, funcLibrary, index, indexItem, item } = props;
  const refItem = useRef<any>();
  const {
    handleOnClickRow,
    handleChangeData,
    handleChangeTimeEnd,
    handleChangeTimeFirst,
    handleTimes,
    BGToolType,
    handleCheckPass,
    BGToolRowItem,
    handleChangeActive,
    handleOnClickRowItem,
    setCheckBlurItem,
    dataForm,
  } = funcLibrary;

  return (
    <>
      <div className="flex flex-col gap-1">
        <div
          className="relative pl-8"
          style={{
            maxWidth: `${data.maxWidth}px`,
          }}
        >
          <div
            className="p-2 rounded-lg border-[1px] w-fit relative z-10 bg-white"
            style={{
              borderColor: dataForm.colorTopic?.split(",")[dataForm.indexTopic],
            }}
          >
            <p className="uppercase">Học vấn</p>
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
                      <FaUserGraduate
                        style={{
                          color:
                            dataForm.colorTopic?.split(",")[
                              dataForm.indexTopic
                            ],
                        }}
                      />
                      <TextEditorOne
                        placeholder={"Ngành học/Môn học"}
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
                    placeholder={"Tên trường học"}
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

export default Study;
