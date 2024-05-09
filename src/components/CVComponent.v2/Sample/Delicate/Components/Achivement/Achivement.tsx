import TextEditorOne from "@/util/TextEditor/TextEditorOne";
import React, { useRef } from "react";

type Props = {
  index: any;
  indexItem: any;
  item: any;
  funcLibrary: any;
  data: any;
};

const Achivement = (props: Props) => {
  const { data, funcLibrary, index, indexItem, item } = props;
  const {
    handleOnClickRow,
    handleChangeData,
    BGToolRowItem,
    handleOnClickRowItem,
    setCheckBlurItem,
    dataForm,
    handleChangeActive,
    checkActive,
    handleCheckPass,
    BGToolType,
  } = funcLibrary;
  return (
    <>
      {data && (
        <>
          <div className="w-full flex flex-col">
            <div className="w-full min-h-[100px]">
              <TextEditorOne
                className={"font-semibold text-xl min-w-36"}
                placeholder={"Chứng chỉ"}
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
                  backgroundColor:
                    dataForm.colorTopic?.split(",")[dataForm.indexTopic],
                }}
              ></div>
              <div className="flex flex-col gap-y-2">
                <div className="flex flex-col gap-x-4 p-1">
                  {data?.moreCvExtraInformations?.map((dt: any, i: any) => {
                    return (
                      <>
                        {" "}
                        <div
                          className={`flex flex-col gap-y-2 border-[1px] text-sm relative transition-all duration-500 w-full ${
                            handleCheckPass({
                              part: index,
                              col: indexItem,
                              row: item,
                              index: i,
                            })
                              ? "border-blue-700"
                              : "hover:border-gray-300 border-transparent"
                          }`}
                          style={{ padding: dt.padIndex ? "10px" : "4px" }}
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
                          <TextEditorOne
                            className={
                              "border-[1px] border-transparent text-wrap max-w-full  focus:border-dotted focus:border-black/80"
                            }
                            placeholder={"Thời gian"}
                            onFocus={() => {
                              setCheckBlurItem(true);
                            }}
                            onBlur={(e: any) => {
                              handleChangeData(
                                index,
                                indexItem,
                                item,
                                "time",
                                i,
                                e.target.value
                              );
                            }}
                            style={{
                              color:
                                dataForm.colorTopic?.split(",")[
                                  dataForm.indexTopic
                                ],
                              maxWidth: `${dt.maxWidth}px`,
                            }}
                          >
                            {dt.time}
                          </TextEditorOne>
                          <TextEditorOne
                            className={
                              "border-[1px] text-black border-transparent text-wrap max-w-full  focus:border-dotted focus:border-black/80"
                            }
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
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default Achivement;
