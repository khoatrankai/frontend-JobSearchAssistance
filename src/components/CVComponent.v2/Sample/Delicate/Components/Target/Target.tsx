import TextEditorOne from "@/util/TextEditor/TextEditorOne";
import React, { useRef } from "react";

type Props = {
  index: any;
  indexItem: any;
  item: any;
  funcLibrary: any;
  data: any;
};

const Target = (props: Props) => {
  const { data, funcLibrary, index, indexItem, item } = props;
  const refItem = useRef<any>();
  const {
    handleOnClickRow,
    handleChangeData,
    BGToolRowItem,
    handleOnClickRowItem,
    setCheckBlurItem,
    dataForm,
  } = funcLibrary;

  return (
    <>
      <TextEditorOne
        className={"font-semibold text-xl min-w-36"}
        placeholder={"Mục tiêu"}
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
                className="flex gap-x-4"
                style={{ padding: dt?.padIndex ? "10px" : "4px" }}
              >
                <TextEditorOne
                  className={"text-sm min-w-36"}
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
                  style={{
                    color: dataForm.colorTopic?.split(",")[dataForm.indexTopic],
                    maxWidth: `${dt.maxWidth}px`,
                  }}
                >
                  {dt.description}
                </TextEditorOne>
              </div>
            </>
          );
        })}
      </div>
    </>
  );
};

export default Target;
