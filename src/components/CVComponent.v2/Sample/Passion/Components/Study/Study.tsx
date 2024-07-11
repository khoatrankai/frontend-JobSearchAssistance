import React, { useRef } from "react";

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
    BGToolRowItem,
    handleOnClickRowItem,
    setCheckBlurItem,
    dataForm,
  } = funcLibrary;

  return (
    <>
      <div
        className="py-2 max-w-full px-2 font-light text-base border-2 mb-8 border-black flex justify-center"
        onClick={(e: any) => {
          handleOnClickRow(e, index, indexItem, item);
        }}
      >
        <div
          contentEditable="true"
          ref={refItem}
          className="outline-none border-[1px] border-transparent focus:border-gray-400 p-2 uppercase"
          style={{
            color: dataForm.colorTopic?.split(",")[dataForm.indexTopic],
          }}
        >
          Học vấn
        </div>
      </div>
      <div className="flex flex-col gap-2  text-sm">
        {data?.moreCvExtraInformations?.map((dt: any, i: any) => {
          return (
            <>
              <div
                className="relative flex flex-col gap-1"
                onMouseDown={(e: any) => {
                  handleOnClickRowItem(e, index, indexItem, item, i);
                }}
              >
                <div className="flex items-center flex-wrap gap-2">
                  <div className="relative">
                    <div
                      contentEditable
                      ref={refItem}
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
                      className="outline-none px-2 py-1 z-10 border-[1px] border-transparent text-wrap max-w-[98%] min-w-32 focus:border-dotted focus:border-black/80 peer relative"
                    >
                      {dt.company}
                    </div>
                    {dt.company === "" ? (
                      <span className="peer-focus:hidden h-full left-1 absolute inset-0 flex items-center text-black/50">
                        Tên trường học
                      </span>
                    ) : (
                      ""
                    )}
                  </div>

                  <span>|</span>
                  <div className="relative">
                    <div
                      contentEditable
                      ref={refItem}
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
                      className="outline-none px-2 py-1 z-10 border-[1px] border-transparent text-wrap max-w-full min-w-16 focus:border-dotted focus:border-black/80 peer relative"
                    >
                      {handleTimes(dt)[0]}
                    </div>
                    {handleTimes(dt)[0] === "" ? (
                      <span className="peer-focus:hidden h-full left-1 absolute inset-0 flex items-center text-black/50">
                        Bắt đầu
                      </span>
                    ) : (
                      ""
                    )}
                  </div>
                  <span>-</span>
                  <div className="relative">
                    <div
                      contentEditable
                      ref={refItem}
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
                      className="outline-none px-2 py-1 z-10 border-[1px] border-transparent text-wrap max-w-full min-w-20 focus:border-dotted focus:border-black/80 peer relative"
                    >
                      {handleTimes(dt)[1]}
                    </div>
                    {handleTimes(dt)[1] === "" ? (
                      <span className="peer-focus:hidden h-full left-1 absolute inset-0 flex items-center text-black/50">
                        Kết thúc
                      </span>
                    ) : (
                      ""
                    )}
                  </div>
                </div>
                <div className="relative">
                  <div
                    contentEditable
                    ref={refItem}
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
                    className="outline-none px-2 py-1 z-10 border-[1px] border-transparent text-wrap max-w-full min-w-32 focus:border-dotted focus:border-black/80 peer relative"
                  >
                    {dt.position}
                  </div>
                  {dt.position === "" ? (
                    <span className="peer-focus:hidden h-full left-1 absolute inset-0 flex items-center text-black/50">
                      Ngành học / Môn học
                    </span>
                  ) : (
                    ""
                  )}
                </div>
                <div className="relative">
                  <div
                    contentEditable
                    ref={refItem}
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
                    className="outline-none px-2 py-1 z-10 border-[1px] border-transparent text-wrap max-w-full min-w-32 focus:border-dotted focus:border-black/80 peer relative"
                  >
                    {dt.description}
                  </div>
                  {dt.description === "" ? (
                    <span className="peer-focus:hidden h-full left-1 absolute inset-0 flex items-center text-black/50">
                      Mô tả
                    </span>
                  ) : (
                    ""
                  )}
                </div>
                <BGToolRowItem
                  index={index}
                  indexItem={indexItem}
                  item={item}
                  blurSave={refItem}
                  i={i}
                />
              </div>
            </>
          );
        })}
      </div>
    </>
  );
};

export default Study;
