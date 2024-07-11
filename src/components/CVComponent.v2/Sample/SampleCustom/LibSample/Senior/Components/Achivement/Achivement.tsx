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
      <div className="flex flex-col">
        <div>
          <div
            className="relative flex flex-col gap-2 mb-2"
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
              <p className="uppercase">Chứng chỉ</p>
            </div>
            <div className="w-full h-full flex items-center">
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
            {data?.moreCvExtraInformations?.map((dt: any, iItem: any) => {
              return (
                <>
                  <div
                    className={`flex flex-col  outline-[1px] outline relative transition-all duration-500 ${
                      handleCheckPass({
                        part: index,
                        col: indexItem,
                        row: item,
                        index: iItem,
                      })
                        ? "outline-blue-700"
                        : "hover:outline-gray-300 outline-transparent"
                    }`}
                    key={iItem}
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
                    <div className="flex gap-1 items-center">
                      <TextEditorOne
                        className={"text-sm"}
                        placeholder={"Thời gian"}
                        style={{
                          maxWidth: `${dt.maxWidth}px`,
                        }}
                        onFocus={() => {
                          setCheckBlurItem(true);
                        }}
                        onBlur={(e: any) => {
                          handleChangeData(
                            index,
                            indexItem,
                            item,
                            "time",
                            iItem,
                            e.target.value
                          );
                        }}
                      >
                        {dt.time}
                      </TextEditorOne>
                    </div>
                    <div className="flex gap-1 items-center">
                      <TextEditorOne
                        className={"text-sm"}
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
                  </div>
                </>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
};

export default Achivement;
