/* eslint-disable react/jsx-key */
/* eslint-disable react-hooks/rules-of-hooks */
"use client";
import React, { useEffect, useState } from "react";
import { ColorPicker } from "antd";
import Image from "next/image";
import type { ColorPickerProps } from "antd";
import { FaExchangeAlt } from "react-icons/fa";
import { FaRegTrashCan } from "react-icons/fa6";
import LibCvV2 from "@/components/CVComponent.v2/Lib/Lib.cv.v2";
import { useParams } from "next/navigation";
import Achivement from "./Components/Achivement/Achivement";
import Award from "./Components/Award/Award";
import Activate from "./Components/Activate/Activate";
import Hobby from "./Components/Hobby/Hobby";
import Persional from "./Components/Persional/Persional";
import Project from "./Components/Project/Project";
import Skill from "./Components/Skill/Skill";
import Study from "./Components/Study/Study";
import Experience from "./Components/Experience/Experience";
import CheckType from "./CheckType";

type Props = { id: any; funcLibrary: any };
const page = (props: Props) => {
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
  } = funcLibrary;

  return (
    <>
      {dataRequest && (
        <div
          className={`flex items-center  pr-32 justify-end pt-24 relative z-10 ${
            dataGhostDrag.part !== -1 && "cursor-pointer"
          }`}
        >
          <div
            className={`flex relative flex-col w-[794px] min-h-[988px] bg-orange-100 p-2 gap-y-2`}
          >
            {dataRequest?.map((dt: any, index: any) => {
              return (
                <div
                  className={`border-[1px] p-2  relative ${
                    handleCheckPass({ part: index })
                      ? " border-blue-700"
                      : "hover:border-gray-300 border-transparent"
                  } ${checkActive.part === index && "z-20"}`}
                  key={index}
                  onClick={(e: any) => {
                    handleOnClickPart(e, index);
                  }}
                >
                  <div
                    className={`flex relative min-h-20 ${
                      handleCheckPass({ part: index })
                        ? "z-20 border-blue-700"
                        : "z-10"
                    } ${checkActive.part === index ? "z-20" : ""}`}
                  >
                    {dt.data.map((dtt: any, indexItem: any) => {
                      return (
                        <div
                          className={` relative p-2 min-h-full border-[1px]  ${
                            handleCheckPass({ part: index, col: indexItem })
                              ? "z-20 border-blue-800"
                              : "hover:border-gray-300 border-transparent"
                          }`}
                          key={indexItem}
                          style={{
                            flexBasis: `${dt.layout[indexItem]}%`,
                            maxWidth: `${dt.layout[indexItem]}%`,
                            minWidth: `${dt.layout[indexItem]}%`,
                            backgroundColor: `${dt.color[indexItem]}`,
                          }}
                        >
                          <div className="flex flex-col max-w-full gap-y-2">
                            {dtt.map((dttt: any, item: any) => {
                              return (
                                <div
                                  className={`p-2 relative border-[1px] max-w-full z-10 ${
                                    handleCheckPass({
                                      part: index,
                                      col: indexItem,
                                      row: item,
                                    })
                                      ? "z-20 border-blue-800"
                                      : "hover:border-gray-300 border-transparent"
                                  } ${checkGhost(dttt) && "bg-green-300"}`}
                                  onClick={(e: any) => {
                                    handleOnClickRow(e, index, indexItem, item);
                                  }}
                                  onMouseMove={(e: any) => {
                                    handleOnMouseMoveRow(e, dttt);
                                  }}
                                  style={{ color: dttt.color }}
                                  key={item}
                                >
                                  <div
                                    className="h-full max-w-full"
                                    onClick={(e: any) => {
                                      handleOnClickRow(
                                        e,
                                        index,
                                        indexItem,
                                        item
                                      );
                                    }}
                                  >
                                    {/* {TypeComponent(
                                      dttt,
                                      index,
                                      indexItem,
                                      item
                                    )} */}
                                    <CheckType
                                      data={dttt}
                                      // handleOnClickRow={handleOnClickRow}
                                      funcLibrary={funcLibrary}
                                      index={index}
                                      indexItem={indexItem}
                                      item={item}
                                    />
                                  </div>
                                  <BGToolRow
                                    index={index}
                                    indexItem={indexItem}
                                    item={item}
                                    dttt={dttt}
                                  />
                                </div>
                              );
                            })}
                          </div>
                          <BGChooseCol index={index} indexItem={indexItem} />
                          <div
                            className={`absolute bottom-full -translate-y-1 left-0 flex gap-x-2 z-20  ${
                              checkActive.col === indexItem &&
                              checkActive.part === index &&
                              checkActive.row === -1
                                ? ""
                                : "hidden"
                            }`}
                          >
                            <ColorPicker
                              trigger="click"
                              value={dt.color[indexItem]}
                              onChange={(e: any) => {
                                handleChangeColor(e.toHex(), index, indexItem);
                              }}
                            >
                              <div className="p-2 bg-blue-500 text-white flex rounded-lg gap-x-2 cursor-pointer">
                                <p>Màu sắc</p>
                                <button
                                  className="w-6 h-6 rounded-full"
                                  style={{
                                    backgroundColor:
                                      dt.color[indexItem] === "#"
                                        ? "rgba(255, 255, 255, 0.1)"
                                        : dt.color[indexItem],
                                  }}
                                ></button>
                              </div>
                            </ColorPicker>
                          </div>
                        </div>
                      );
                    })}
                    {/* <BGCol /> */}
                  </div>

                  <BGChoosePart index={index} />
                  <BGToolPart index={index} />
                  <BGLayout index={index} />
                </div>
              );
            })}
            {/* <BGPart /> */}
          </div>
        </div>
      )}
    </>
  );
};

export default page;
