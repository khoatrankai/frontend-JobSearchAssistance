import TextEditorOne from "@/util/TextEditor/TextEditorOne";
import React, { useRef } from "react";

type Props = {
  index: any;
  indexItem: any;
  item: any;
  funcLibrary: any;
  data: any;
};

const InfoMore = (props: Props) => {
  const { data, funcLibrary, index, indexItem, item } = props;
  const refItem = useRef<any>();
  const {
    handleOnClickRow,
    handleChangeData,
    BGToolRowItem,
    handleCheckPass,
    BGToolType,
    handleOnClickRowItem,
    handleChangeActive,
    setCheckBlurItem,
    dataForm,
  } = funcLibrary;

  return (
    <>
      <TextEditorOne
        className={"font-semibold text-xl min-w-36"}
        placeholder={"Thông tin thêm"}
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
      <div className="flex flex-col gap-y-2">
        {data?.moreCvExtraInformations?.map((dt: any, iItem: any) => {
          return (
            <>
              <div
                className={`flex flex-wrap gap-x-4 border-[1px] text-sm relative transition-all duration-500 ${
                  handleCheckPass({
                    part: index,
                    col: indexItem,
                    row: item,
                    index: iItem,
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
                    index: iItem,
                  });
                }}
              >
                <div className="flex items-center gap-x-2 text-sm">
                  <TextEditorOne
                    classNamePlaceholder={" text-black/50 !p-1"}
                    className={"  text-black !p-1"}
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
                        iItem,
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
                  i={iItem}
                />
                <BGToolType
                  iPart={index}
                  iCol={indexItem}
                  iRow={item}
                  index={iItem}
                />
              </div>
            </>
          );
        })}
      </div>
    </>
  );
};

export default InfoMore;
