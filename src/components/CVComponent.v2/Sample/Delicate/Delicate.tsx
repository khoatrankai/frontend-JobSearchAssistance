import Image from "next/image";
import React, { useEffect, useState } from "react";
import { MdDateRange } from "react-icons/md";
import { FaPhone } from "react-icons/fa6";
import { MdOutlineEmail } from "react-icons/md";
import { TbWorld } from "react-icons/tb";
import { LiaAddressCard } from "react-icons/lia";
import { FaInfo } from "react-icons/fa";
import CheckType from "./CheckType";
import { TextareaAutosize } from "@mui/base/TextareaAutosize";
import TextEditorOne from "@/util/TextEditor/TextEditorOne";
import { ColorPicker } from "antd";

type Props = { id: any; funcLibrary: any };

const Delicate = (props: Props) => {
  const TextInput = ({ className, onClick }: any) => {
    const [isFocused, setIsFocused] = useState(false);

    const handleFocus = () => {
      setIsFocused(true);
    };

    const handleBlur = () => {
      setIsFocused(false);
    };

    return (
      <div
        className={className}
        onMouseDown={onClick}
        onFocus={handleFocus}
        onBlur={handleBlur}
      >
        <div contentEditable>{isFocused ? "Thay đổi" : ""}</div>
      </div>
    );
  };
  const { id, funcLibrary } = props;
  const {
    dataForm,
    dataRequest,
    dataGhostDrag,
    handleCheckPass,
    checkActive,
    handleOnClickPart,
    checkGhost,
    handleOnClickRow,
    handleOnMouseMoveRow,
    BGChooseCol,
    checkLayout,
    BGCol,
    BGChoosePart,
    BGPart,
    BGRow,
    BGToolPart,
    BGToolRow,
    handleChangeColor,
    handleToolMouseMoveTransRow,
    setCheckLayout,
    dataLoad,
    setDataLoad,
    setDataForm,
    handleChangeLayout,
    BGLayout,
    BGToolRowItem,
    handleChangeActive,
    BGChooseRow,
    BGToolCol,
    BGToolType,
  } = funcLibrary;
  return (
    <div className="w-[794px] min-h-48 bg-white flex flex-col canvas-pdf">
      {dataRequest && (
        <div
          className="min-h-[100px] w-full border-[1px]"
          style={{ padding: dataRequest[0].padPart ? "10px" : "" }}
        >
          <div
            className="w-full flex"
            style={{
              flexBasis: `${dataRequest[0].layout[0]}%`,
              maxWidth: `${dataRequest[0].layout[0]}%`,
              minWidth: `${dataRequest[0].layout[0]}%`,
              backgroundColor: `${dataRequest[0].color[0]}`,
              padding: `${dataRequest[0].pad?.[0] ? "10px" : ""}`,
            }}
          >
            <CheckType
              data={dataRequest[0].data[0][0]}
              funcLibrary={funcLibrary}
              index={0}
              indexItem={0}
              item={0}
            />
          </div>
        </div>
      )}

      {dataRequest &&
        dataRequest.map((dt: any, iPart: any) => {
          if (iPart !== 0) {
            return (
              <>
                <div
                  className={`min-h-[100px] w-full relative border-[1px] flex transition-all duration-500  ${
                    handleCheckPass({ part: iPart })
                      ? "z-20 border-blue-800"
                      : "hover:border-gray-300 border-transparent"
                  }`}
                  style={{ padding: dt.padPart ? "10px" : "" }}
                >
                  {dt.data.map((dtt: any, iCol: any) => {
                    return (
                      <>
                        <div
                          className={`w-full flex  relative flex-col border-[1px] transition-all duration-500 z-10 ${
                            handleCheckPass({ part: iPart, col: iCol })
                              ? "z-20 border-blue-800"
                              : "border-gray-300"
                          }
                          
                          ${
                            checkActive.part === iPart &&
                            checkActive.col === iCol &&
                            "!z-20"
                          }
                          `}
                          style={{
                            flexBasis: `${dt.layout[iCol]}%`,
                            maxWidth: `${dt.layout[iCol]}%`,
                            minWidth: `${dt.layout[iCol]}%`,

                            backgroundColor: `${
                              dt.color[iCol] !== "#" ? dt.color[iCol] : ""
                            }`,
                            padding: `${dt.pad?.[iCol] ? "10px" : ""}`,
                          }}
                        >
                          {dtt.map((dttt: any, iRow: any) => {
                            return (
                              <>
                                <div
                                  style={{
                                    padding: dttt.padIndex ? "10px" : "",
                                    // maxWidth: `${dttt.maxWidth}px`,
                                  }}
                                  className={`relative z-10 border-[1px] transition-all duration-500 ${
                                    handleCheckPass({
                                      part: iPart,
                                      col: iCol,
                                      row: iRow,
                                    })
                                      ? "z-20 border-blue-800"
                                      : "hover:border-gray-300 border-transparent"
                                  } ${checkGhost(dttt) && "bg-green-300"}`}
                                  onClick={(e: any) => {
                                    e.stopPropagation();
                                    handleChangeActive({
                                      part: iPart,
                                      col: iCol,
                                      row: iRow,
                                    });
                                  }}
                                >
                                  <div className="z-10">
                                    <CheckType
                                      data={dttt}
                                      funcLibrary={funcLibrary}
                                      index={iPart}
                                      indexItem={iCol}
                                      item={iRow}
                                    />
                                  </div>

                                  <BGToolRow
                                    index={iPart}
                                    indexItem={iCol}
                                    item={iRow}
                                    dttt={dttt}
                                  />
                                  <BGChooseRow data={dttt} />
                                  <BGToolType
                                    iPart={iPart}
                                    iCol={iCol}
                                    iRow={iRow}
                                  />
                                </div>
                              </>
                            );
                          })}
                          <BGChooseCol index={iPart} indexItem={iCol} />
                          <BGToolType iPart={iPart} iCol={iCol} />

                          <div
                            className={`absolute bottom-full -translate-y-1 left-0 flex gap-x-1 z-20  ${
                              checkActive.col === iCol &&
                              checkActive.part === iPart &&
                              checkActive.row === -1
                                ? ""
                                : "hidden"
                            }`}
                            onClick={(e: any) => {
                              e.stopPropagation();
                            }}
                          >
                            <BGToolCol dt={dt} index={iPart} indexItem={iCol} />

                            <ColorPicker
                              trigger="click"
                              value={dt.color[iCol]}
                              onChange={(e: any) => {
                                handleChangeColor(e.toHex(), iPart, iCol);
                              }}
                            >
                              <div className="px-2 py-1 bg-blue-500 text-white text-sm flex items-center rounded-lg gap-x-2 cursor-pointer">
                                <p>Màu sắc</p>
                                <button
                                  className="w-6 h-6 rounded-full"
                                  style={{
                                    backgroundColor:
                                      dt.color[iCol] === "#"
                                        ? "rgba(255, 255, 255, 0.1)"
                                        : dt.color[iCol],
                                  }}
                                ></button>
                              </div>
                            </ColorPicker>
                          </div>
                        </div>
                      </>
                    );
                  })}
                  <BGChoosePart index={iPart} />
                  <BGToolPart index={iPart} checkForm={0} />
                  <BGToolType iPart={iPart} />
                </div>
              </>
            );
          }
        })}
    </div>
  );
};

export default Delicate;
