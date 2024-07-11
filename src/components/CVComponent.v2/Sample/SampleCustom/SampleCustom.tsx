import Image from "next/image";
import React, { useEffect, useState } from "react";
import { MdDateRange } from "react-icons/md";
import { FaPhone } from "react-icons/fa6";
import { MdOutlineEmail } from "react-icons/md";
import { TbWorld } from "react-icons/tb";
import { LiaAddressCard } from "react-icons/lia";
import { FaInfo } from "react-icons/fa";
import CheckSample from "./CheckSample";
import { TextareaAutosize } from "@mui/base/TextareaAutosize";
import TextEditorOne from "@/util/TextEditor/TextEditorOne";
import { ColorPicker } from "antd";
import { IoAdd } from "react-icons/io5";

type Props = { id: any; funcLibrary: any };

const SampleCustom = (props: Props) => {
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
        onTouchStart={onClick}
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
    handleAddPartPage,
    setPositionAddType,
    handleChangeColorText,
  } = funcLibrary;
  useEffect(() => {
    console.log(dataRequest);
  }, [dataRequest]);
  return (
    <div className="w-[794px] min-h-48 bg-white flex flex-col canvas-pdf relative">
      {dataRequest &&
        dataRequest.map((dt: any, iPart: any) => {
          return (
            <>
              <div
                className={`min-h-[100px] w-full relative flex outline-1 outline outline-transparent transition-all duration-500  ${
                  handleCheckPass({ part: iPart })
                    ? "z-20 outline-blue-800"
                    : "hover:outline-gray-300 "
                }`}
                style={{ padding: dt.padPart ? "10px" : "" }}
              >
                {dt.data.map((dtt: any, iCol: any) => {
                  return (
                    <>
                      <div
                        className={`w-full flex  relative flex-col border-[1px] transition-all duration-500 z-10 group ${
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
                          color: `${dt.colorText[iCol]}`,
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
                                className={`relative z-10 transition-all outline-1 outline duration-500 ${
                                  handleCheckPass({
                                    part: iPart,
                                    col: iCol,
                                    row: iRow,
                                  })
                                    ? "z-20 outline-blue-800"
                                    : "hover:outline-gray-300 outline-transparent"
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
                                  <CheckSample
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
                        {dtt.length === 0 && (
                          <div className="absolute inset-0 hidden justify-center items-center z-30 group-hover:flex">
                            <button
                              className="p-2 rounded-xl flex gap-1 items-center bg-blue-100 hover:bg-blue-500 text-blue-500 hover:text-white font-semibold text-sm"
                              onClick={() => {
                                // handleAddPartPage();
                                setPositionAddType({ part: iPart, col: iCol });
                              }}
                            >
                              <IoAdd className="font-bold" />
                              <span>Thêm phần</span>
                            </button>
                          </div>
                        )}
                        {dtt.length > 0 && (
                          <div className="absolute inset-x-0 bottom-0  justify-center items-center z-30 group-hover:!z-50 hidden group-hover:flex">
                            <button
                              className="p-2 rounded-xl flex gap-1 items-center bg-blue-100 hover:bg-blue-500 text-blue-500 hover:text-white font-semibold text-sm"
                              onClick={() => {
                                // handleAddPartPage();
                                setPositionAddType({ part: iPart, col: iCol });
                              }}
                            >
                              <IoAdd className="font-bold" />
                              <span>Thêm phần</span>
                            </button>
                          </div>
                        )}

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
                            <div className="px-2 py-1 bg-blue-500 text-white text-xs flex items-center rounded-lg gap-x-1 cursor-pointer">
                              <p>Màu nền</p>
                              <button
                                className="w-6 h-6 rounded-full border-[1px]"
                                style={{
                                  backgroundColor:
                                    dt.color[iCol] === "#"
                                      ? "rgba(255, 255, 255, 0.1)"
                                      : dt.color[iCol],
                                }}
                              ></button>
                            </div>
                          </ColorPicker>
                          <ColorPicker
                            trigger="click"
                            value={dt.colorText[iCol]}
                            onChange={(e: any) => {
                              handleChangeColorText(e.toHex(), iPart, iCol);
                            }}
                          >
                            <div className="px-2 py-1 bg-blue-500 text-white text-xs flex items-center rounded-lg gap-x-1 cursor-pointer">
                              <p>Màu chữ</p>
                              <button
                                className="w-6 h-6 rounded-full border-[1px]"
                                style={{
                                  backgroundColor:
                                    dt.colorText[iCol] === "#"
                                      ? "rgba(255, 255, 255, 0.1)"
                                      : dt.colorText[iCol],
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
        })}
      <div className="absolute top-full inset-x-0 flex justify-center items-center translate-y-4">
        <button
          className="p-2 rounded-xl flex gap-1 items-center bg-blue-100 hover:bg-blue-500 text-blue-500 hover:text-white font-semibold text-sm"
          onClick={() => {
            handleAddPartPage();
          }}
        >
          <IoAdd className="font-bold" />
          <span>Thêm hàng</span>
        </button>
      </div>
    </div>
  );
};

export default SampleCustom;
