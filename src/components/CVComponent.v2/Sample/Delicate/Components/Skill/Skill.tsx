import TextEditorOne from "@/util/TextEditor/TextEditorOne";
import React, { useRef } from "react";

type Props = {
  index: any;
  indexItem: any;
  item: any;
  funcLibrary: any;
  data: any;
};

const Skill = (props: Props) => {
  const { data, funcLibrary, index, indexItem, item } = props;
  const refItem = useRef<any>();
  const {
    handleOnClickRow,
    handleChangeData,
    BGToolRowItem,
    handleOnClickRowItem,
    setCheckBlurItem,
    BGToolType,
    handleCheckPass,
    handleChangeActive,
    dataForm,
  } = funcLibrary;

  return (
    <>
      {data && (
        <div className="w-full flex flex-col">
          <div className="w-full min-h-[100px]">
            <TextEditorOne
              className={"font-semibold text-xl min-w-36"}
              placeholder={"Các kỹ năng"}
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
            <div className="flex flex-col gap-2  text-sm">
              {data?.moreCvExtraInformations?.map((dt: any, i: any) => {
                return (
                  <>
                    <div
                      className={`flex flex-col gap-y-2 outline-[1px] outline text-sm relative transition-all duration-500 ${
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
                      <TextEditorOne
                        className={"font-medium "}
                        placeholder={"Tên kỹ năng"}
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
                            dataForm.colorTopic?.split(",")[
                              dataForm.indexTopic
                            ],
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
      )}
    </>
  );
};

export default Skill;
