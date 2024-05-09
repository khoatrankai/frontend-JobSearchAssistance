/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import { ColorPicker } from "antd";
import React, { useEffect, useState } from "react";
import {
  FaArrowDown,
  FaCompressArrowsAlt,
  FaExchangeAlt,
  FaExpandArrowsAlt,
  FaSignOutAlt,
} from "react-icons/fa";
import { FaRegTrashCan } from "react-icons/fa6";
import { FaArrowsAlt } from "react-icons/fa";
import { useSelector } from "react-redux";
import { IoMdAdd } from "react-icons/io";
import { FaArrowUp } from "react-icons/fa";
import imageCompression from "browser-image-compression";

import axiosClient from "@/configs/axiosClient";
import { AiOutlineExpandAlt } from "react-icons/ai";
import AlertOne from "@/util/Alert/AlertOne";
import { useSrollContext } from "@/context/AppProvider";
import { MdTableRows, MdViewColumn } from "react-icons/md";
import { HiDocumentText } from "react-icons/hi";
import cvsApi from "@/api/cvs";

type Props = {
  cvIndex?: any;
  template?: any;
};

interface ILoad {
  status: number;
  data: any;
}

const LibCvV2 = (props: Props) => {
  const { cvIndex, template } = props;
  const profile = useSelector((state: any) => state.profile.profile);
  const [checkBlurItem, setCheckBlurItem] = useState<boolean>(false);
  const [maxWidthPage, setMaxWidthPage] = useState<any>(794);
  const [checkAddCategory, setAddCategory] = useState<boolean>(false);
  const { setTabAlert, setHandleAlert, updateHandleAlert } = useSrollContext();
  const [dataForm, setDataForm] = useState<any>({
    cvIndex: 0,
    layout: ["33.33,66.67", "25,75", "75,25"],
    color: ["#,#", "#,#", "#,#"],
  });
  const [backNext, setBackNext] = useState<any>();
  const [dataGhostDrag, setDataGhostDrag] = useState<any>({
    part: -1,
    col: -1,
    row: -1,
  });
  const [listDataForm, setListDataForm] = useState<any>([
    {
      layout: "100:100",
      colorTopic: "#529300,#3B82F6",
      data: "1:7.8.3.2.0.0.9.5",
    },
    {
      layout: "100:100:33.33,33.34,33.33",
      colorTopic: "#529300,#3B82F6",

      data: "1:7.8.3.2.0:0,9,5",
    },
    {
      layout: "100",
      colorTopic: "#529300,#3B82F6",
      data: "1.4.5.6.9.7.8.3.2.0",
    },
    {
      layout: "100:100:50,50:33.33,33.34,33.33:33.33,33.34,33.33",
      colorTopic: "#529300",
      data: "1:2.3:4,5,6:7,8,9:0,0,0",
    },
    {
      layout: "50,50",
      colorTopic: "#529300",
      data: "1.2.3.4.5,6.7.8.9",
    },
    {
      layout: "100:66.67,33.33",
      colorTopic: "#529300",
      data: "1:2.3.4.5.6.7,8.9",
    },
  ]);

  const [checkActive, setCheckActive] = useState<any>({
    row: -1,
    col: -1,
    part: -1,
    index: -1,
  });
  const [dataLoad, setDataLoad] = useState<any>([
    // {
    //   id: 78,
    //   email: "",
    //   name: "",
    //   phone: "",
    //   address: "",
    //   intent: "",
    //   type: "info_person",
    //   avatar: null,
    //   link: "",
    //   row: 0,
    //   part: 0,
    //   col: 0,
    //   cvIndex: 0,
    //   moreCvInformations: [
    //     {
    //       content: "",
    //     },
    //   ],
    // },
    // {
    //   type: "info_activate",
    //   row: 0,
    //   col: 0,
    //   cvIndex: 0,
    //   part: 1,
    //   moreCvExtraInformations: [
    //     {
    //       position: "",
    //       time: "",
    //       company: "",
    //       description: "",
    //       index: 0,
    //     },
    //   ],
    // },
    // {
    //   type: "info_hobby",
    //   row: 0,
    //   col: 1,
    //   cvIndex: 0,
    //   part: 0,
    //   moreCvExtraInformations: [
    //     {
    //       position: "",
    //       time: "",
    //       company: "",
    //       description: "",
    //       index: 0,
    //     },
    //   ],
    // },
    // {
    //   type: "info_achivement",
    //   row: 0,
    //   col: 1,
    //   cvIndex: 0,
    //   part: 1,
    //   moreCvExtraInformations: [
    //     {
    //       position: "",
    //       time: "",
    //       company: "",
    //       description: "",
    //       index: 0,
    //     },
    //   ],
    // },
    // {
    //   type: "info_project",
    //   row: 1,
    //   part: 0,
    //   col: 1,
    //   cvIndex: 0,
    //   moreCvProjects: [
    //     {
    //       time: "",
    //       link: "",
    //       participant: "",
    //       position: "",
    //       functionality: "",
    //       technology: "",
    //       index: 0,
    //     },
    //   ],
    // },
  ]);
  const [imageAvatar, setImgAvatar] = useState<any>();

  const [addType, setAddType] = useState<any>({
    id: 78,
    email: "",
    name: "",
    phone: "",
    address: "",
    intent: "",
    type: "info_person",
    avatar: null,
    link: "",
    row: 0,
    part: 0,
    col: 0,
    cvIndex: 0,
    moreCvInformations: [
      {
        content: "",
      },
    ],
  });
  const [formType, setFormType] = useState<any>([
    {
      id: 78,
      email: "",
      name: "",
      phone: "",
      address: "",
      intent: "",
      type: "info_person",
      avatar: null,
      link: "",
      row: 0,
      part: 0,
      col: 0,
      padIndex: 1,
      cvIndex: 0,
      moreCvInformations: [
        {
          padIndex: 1,
          content: "",
        },
      ],
    },
    {
      type: "type1",
      row: 0,
      col: 0,
      cvIndex: 0,
      part: 0,

      padIndex: 1,

      moreCvExtraInformations: [
        {
          padIndex: 1,
          position: "",
          time: "",
          company: "",
          description: "",
          index: 0,
        },
      ],
    },
    {
      type: "info_project",
      row: 0,
      part: 0,
      col: 0,
      cvIndex: 0,

      padIndex: 1,

      moreCvProjects: [
        {
          padIndex: 1,
          time: "",
          link: "",
          participant: "",
          position: "",
          functionality: "",
          technology: "",
          index: 0,
        },
      ],
    },
    {
      type: "type1",
      row: 0,
      col: 0,
      cvIndex: 0,
      part: 0,

      padIndex: 1,

      moreCvExtraInformations: [
        {
          padIndex: 1,

          position: "",
          time: "",
          company: "",
          description: "",
          index: 0,
        },
      ],
    },
  ]);
  const [formMore, setFormMore] = useState<any>([
    {
      padIndex: 1,
      content: "",
    },
    {
      padIndex: 1,
      position: "",
      time: "",
      company: "",
      description: "",
      index: 0,
    },
    {
      padIndex: 1,
      time: "",
      link: "",
      participant: "",
      position: "",
      functionality: "",
      technology: "",
      index: 0,
    },
  ]);
  const [checkLayout, setCheckLayout] = useState<boolean>(false);
  const [templateId, setTemplateId] = useState<any>(template);
  const [dataRequest, setDataRequest] = useState<any>();
  const [cvID, setCvID] = useState<any>(0);
  const handleCreateGhost = (e: any, data: any) => {
    let divGhost = document.createElement("div");
    divGhost.className =
      "p-2 bg-green-700 rounded-xl fixed pointer-events-none ghost-title cursor-pointer text-white z-50";
    divGhost.textContent = data.name;
    document.body.appendChild(divGhost);
  };
  const handleLoadType = (type: any) => {
    switch (type) {
      case "0":
        return { ...formType[1], type: "info_more" };
      case "1":
        return { ...formType[0], type: "info_person" };
      case "2":
        return { ...formType[1], type: "info_award" };
      case "3":
        return { ...formType[1], type: "info_activate" };
      case "4":
        return { ...formType[1], type: "info_hobby" };
      case "5":
        return { ...formType[1], type: "info_achivement" };
      case "6":
        return { ...formType[2], type: "info_project" };
      case "7":
        return { ...formType[1], type: "info_study" };
      case "8":
        return { ...formType[1], type: "info_experience" };
      case "9":
        return { ...formType[1], type: "info_skill" };
      case "10":
        return { ...formType[1], type: "info_target" };
      default:
        return {};
    }
  };
  const handleLoadTempData = (temId: any) => {
    const layout = listDataForm[temId].layout.split(":");
    const pad = layout.map((dt: any) => {
      const lengthPadCol = dt.split(",").length;
      const result = ",1".repeat(lengthPadCol).slice(1);
      return result;
    });
    const padPart = layout.map((dt: any) => {
      return 1;
    });
    let dataNew: any = [];
    const color = layout.map((dt: any) => {
      const lengthdt = dt.split(",").length;
      const resultdt = ",#".repeat(lengthdt).slice(1);
      return resultdt;
    });

    listDataForm[temId].data.split(":").map((dt: any, part: any) => {
      dt.split(",").map((dtt: any, col: any) => {
        dtt.split(".").map((dttt: any, row: any) => {
          dataNew.push({
            ...handleLoadType(dttt),
            part: part,
            col: col,
            row: row,
          });
        });
      });
    });
    return {
      ...listDataForm[temId],
      layout: layout,
      color: color,
      data: dataNew,
      padPart: padPart,
      pad: pad,
    };
  };

  const handleChangeData = (
    part: any,
    col: any,
    row: any,
    type: any,
    index: any,
    dataNew: any
  ) => {
    switch (type) {
      case "typeName":
      case "phone":
      case "address":
      case "email":
      case "name":
      case "link":
      case "avatar":
      case "intent":
        const newData = dataLoad.map((dt: any) => {
          if (dt.part === part && dt.col === col && dt.row === row) {
            return { ...dt, [type]: dataNew };
          }
          return dt;
        });
        setDataLoad(newData);
        setBackNext({
          back: backNext,
          present: { dataForm: backNext.present.dataForm, dataLoad: newData },
          next: {},
        });
        break;
      default:
        const newData2 = dataLoad.map((dt: any) => {
          if (dt.part === part && dt.col === col && dt.row === row) {
            let newItem =
              dt?.moreCvInformations ||
              dt?.moreCvProjects ||
              dt?.moreCvExtraInformations;
            newItem = newItem.map((dtt: any, i: any) => {
              if (i === index) {
                return { ...dtt, [type]: dataNew };
              }
              return dtt;
            });
            if (dt?.moreCvInformations) {
              return { ...dt, moreCvInformations: newItem };
            }
            if (dt?.moreCvProjects) {
              return { ...dt, moreCvProjects: newItem };
            }
            if (dt?.moreCvExtraInformations) {
              return { ...dt, moreCvExtraInformations: newItem };
            }
          }
          return dt;
        });

        setDataLoad(newData2);
        setBackNext({
          back: backNext,
          present: { dataForm: backNext.present.dataForm, dataLoad: newData2 },
          next: {},
        });
    }
  };
  const handleTimes = (data: any) => {
    if (data?.time?.includes("-")) {
      const dataTime = data?.time?.split("-");
      return dataTime;
    } else {
      return ["", ""];
    }
  };
  const handleChangeTimeFirst = (
    dataChange: any,
    part: any,
    col: any,
    row: any,
    data: any,
    index: any
  ) => {
    const newTime = dataChange + "-" + handleTimes(data)?.[1];

    handleChangeData(part, col, row, "time", index, newTime);
  };
  const handleChangeTimeEnd = (
    dataChange: any,
    part: any,
    col: any,
    row: any,
    data: any,
    index: any
  ) => {
    const newTime = handleTimes(data)?.[0] + "-" + dataChange;
    handleChangeData(part, col, row, "time", index, newTime);
  };
  const handleUpSetImage = (data: any) => {
    if (Array.isArray(data?.avatar)) {
      const readerImg = new FileReader();
      readerImg.readAsDataURL(data.avatar[0]);
      readerImg.addEventListener("load", function () {
        const buffer = readerImg.result;
        setImgAvatar(buffer);
      });
    } else {
      setImgAvatar(data.avatar ? "" : "/goapply.png");
    }
  };
  const handleChangeColor = (color: any, part: any, col: any) => {
    let arrayColor = dataRequest[part].color.slice();
    arrayColor[col] = "#" + color;
    const dataColor = arrayColor.join(",");
    const dataNew = dataForm.color.slice();
    dataNew[part] = dataColor;
    setDataForm({ ...dataForm, color: dataNew });
    setBackNext({
      back: backNext,
      present: {
        dataForm: { ...dataForm, color: dataNew },
        dataLoad: backNext.present.dataLoad,
      },
      next: {},
    });
  };
  const handleUploadImage = (e: any, index: any, indexItem: any, item: any) => {
    const options = {
      maxSizeMB: 1,
      maxWidthOrHeight: 840,
    };

    const file = e.target.files[0];
    const reader = new FileReader();
    const readerImg = new FileReader();
    if (e.target.files[0]) {
      reader.readAsArrayBuffer(file);
    }
    reader.addEventListener("load", async function () {
      const compressedImages: any = [];
      const compressedImage = await imageCompression(file, options);
      compressedImages.push(
        new File([compressedImage], compressedImage.name, {
          type: compressedImage.type,
        }) as never
      );
      handleChangeData(
        index,
        indexItem,
        item,
        "avatar",
        null,
        compressedImages
      );
    });
  };
  const handleChooseCol = (part: any, col: any) => {
    if (dataGhostDrag.part !== -1) {
      const dataFilter = dataLoad.filter((dt: any) => {
        return dt.part === part && dt.col === col;
      });
      const maxRow = dataFilter.length
        ? dataFilter.reduce((max: any, current: any) => {
            if (current.row > max.row) {
              return current;
            }
            return max;
          })
        : { row: -1 };
      if (dataGhostDrag.part === 100) {
        setDataLoad([
          ...dataLoad,
          { ...addType, part: part, col: col, row: maxRow.row + 1 },
        ]);
        setDataGhostDrag({ part: part, col: col, row: maxRow.row + 1 });
        console.log("2");
        setCheckActive({
          part: part,
          col: col,
          row: maxRow.row + 1,
          index: -1,
        });
      } else {
        if (dataGhostDrag.part === part && dataGhostDrag.col === col) {
          const dataNew = dataLoad.map((dt: any) => {
            if (dt.part === part && dt.col === col) {
              if (dt.row > dataGhostDrag.row) {
                return {
                  ...dt,
                  row: dt.row - 1,
                };
              }
              if (dt.row === dataGhostDrag.row) {
                setDataGhostDrag({ ...dataGhostDrag, row: maxRow.row });
                console.log("3");
                setCheckActive({
                  ...dataGhostDrag,
                  row: maxRow.row,
                  index: -1,
                });
                return {
                  ...dt,
                  row: maxRow.row,
                };
              }
            }

            return dt;
          });
          setDataLoad(dataNew);
        } else {
          const dataNew = dataLoad.map((dt: any) => {
            if (
              dt.part === dataGhostDrag.part &&
              dt.col === dataGhostDrag.col &&
              dt.row > dataGhostDrag.row
            ) {
              return { ...dt, row: dt.row - 1 };
            }
            if (
              dt.part === dataGhostDrag.part &&
              dt.col === dataGhostDrag.col &&
              dt.row === dataGhostDrag.row
            ) {
              setDataGhostDrag({ part: part, col: col, row: maxRow.row + 1 });
              console.log("4");
              setCheckActive({
                part: part,
                col: col,
                row: maxRow.row + 1,
                index: -1,
              });

              return { ...dt, part: part, col: col, row: maxRow.row + 1 };
            }
            return dt;
          });
          setDataLoad(dataNew);
        }
      }
    }
  };
  const handleCheckPass = ({ part = -1, col = -1, row = -1, index = -1 }) => {
    if (
      part === checkActive.part &&
      col === checkActive.col &&
      row === checkActive.row &&
      index === checkActive.index
    ) {
      return true;
    }
    return false;
  };
  const handleResetActive = () => {
    setCheckActive({
      row: -1,
      col: -1,
      part: -1,
      index: -1,
    });
  };
  const handleChangeActive = ({
    part = -1,
    col = -1,
    row = -1,
    index = -1,
  }) => {
    console.log("6");
    setCheckActive({ part: part, col: col, row: row, index: index });
  };
  const handleChangePosition = (e: any, data: any) => {
    const handleUp = () => {
      const dataNew = dataLoad.map((dt: any) => {
        if (dataGhostDrag.part === 100) {
          if (dt.part === data.part && dt.col === data.col) {
            if (dt.row >= data.row) {
              return {
                ...dt,
                row: dt.row + 1,
              };
            }
          }
        } else {
          if (
            data.part !== dataGhostDrag.part ||
            data.col !== dataGhostDrag.col
          ) {
            if (
              dt.part === dataGhostDrag.part &&
              dt.col === dataGhostDrag.col &&
              dt.row === dataGhostDrag.row
            ) {
              setDataGhostDrag({
                col: data.col,
                row: data.row,
                part: data.part,
              });
              console.log("7");
              setCheckActive({
                col: data.col,
                row: data.row,
                part: data.part,
                index: -1,
              });
              return {
                ...dt,
                part: data.part,
                col: data.col,
                row: data.row,
              };
            }
            if (
              dt.part === data.part &&
              dt.col === data.col &&
              dt.row >= data.row
            ) {
              return {
                ...dt,
                row: dt.row + 1,
              };
            }
            if (
              dt.part === dataGhostDrag.part &&
              dt.col === dataGhostDrag.col &&
              dt.row > dataGhostDrag.row
            ) {
              return {
                ...dt,
                row: dt.row - 1,
              };
            }
          } else {
            if (data.part === dt.part && data.col === dt.col) {
              if (data.row > dataGhostDrag.row) {
                if (dt.row > dataGhostDrag.row && dt.row < data.row) {
                  return {
                    ...dt,
                    row: dt.row - 1,
                  };
                }
                if (dt.row === dataGhostDrag.row) {
                  setDataGhostDrag({
                    col: data.col,
                    row: data.row - 1,
                    part: data.part,
                  });
                  console.log("8");
                  setCheckActive({
                    col: data.col,
                    row: data.row - 1,
                    part: data.part,
                    index: -1,
                  });

                  return {
                    ...dt,
                    row: data.row - 1,
                  };
                }
              }
              if (data.row < dataGhostDrag.row) {
                if (dt.row < dataGhostDrag.row && dt.row >= data.row) {
                  return {
                    ...dt,
                    row: dt.row + 1,
                  };
                }
                if (dt.row === dataGhostDrag.row) {
                  setDataGhostDrag({
                    col: data.col,
                    row: data.row,
                    part: data.part,
                  });
                  setCheckActive({
                    col: data.col,
                    row: data.row,
                    part: data.part,
                    index: -1,
                  });
                  return {
                    ...dt,
                    row: data.row,
                  };
                }
              }
            }
          }
        }

        return dt;
      });
      if (dataGhostDrag.part === 100) {
        setDataGhostDrag({ part: data.part, col: data.col, row: data.row });
        setDataLoad([
          ...dataNew,
          { ...addType, part: data.part, col: data.col, row: data.row },
        ]);
        setCheckActive({
          part: data.part,
          col: data.col,
          row: data.row,
          index: -1,
        });
      } else {
        setDataLoad(dataNew);
      }
    };
    const handleDown = () => {
      const dataNew = dataLoad.map((dt: any) => {
        if (dataGhostDrag.part === 100) {
          if (dt.part === data.part && dt.col === data.col) {
            if (dt.row > data.row) {
              return {
                ...dt,
                row: dt.row + 2,
              };
            }
          }
        } else {
          if (
            data.part !== dataGhostDrag.part ||
            data.col !== dataGhostDrag.col
          ) {
            if (
              dt.part === dataGhostDrag.part &&
              dt.col === dataGhostDrag.col &&
              dt.row > dataGhostDrag.row
            ) {
              return {
                ...dt,
                row: dt.row - 1,
              };
            }
            if (
              dt.part === dataGhostDrag.part &&
              dt.col === dataGhostDrag.col &&
              dt.row === dataGhostDrag.row
            ) {
              setDataGhostDrag({
                col: data.col,
                row: data.row + 1,
                part: data.part,
              });
              setCheckActive({
                col: data.col,
                row: data.row + 1,
                part: data.part,
                index: -1,
              });
              return {
                ...dt,
                part: data.part,
                col: data.col,
                row: data.row + 1,
              };
            }
            if (
              dt.part === data.part &&
              dt.col === data.col &&
              dt.row > data.row
            ) {
              return {
                ...dt,
                row: dt.row + 1,
              };
            }
          } else {
            if (data.part === dt.part && data.col === dt.col) {
              if (data.row > dataGhostDrag.row) {
                if (dt.row > dataGhostDrag.row && dt.row <= data.row) {
                  return {
                    ...dt,
                    row: dt.row - 1,
                  };
                }
                if (dt.row === dataGhostDrag.row) {
                  setDataGhostDrag({
                    col: data.col,
                    row: data.row,
                    part: data.part,
                  });
                  setCheckActive({
                    col: data.col,
                    row: data.row,
                    part: data.part,
                    index: -1,
                  });
                  return {
                    ...dt,
                    row: data.row,
                  };
                }
              }
              if (data.row < dataGhostDrag.row) {
                if (dt.row < dataGhostDrag.row && dt.row > data.row) {
                  return {
                    ...dt,
                    row: dt.row + 1,
                  };
                }
                if (dt.row === dataGhostDrag.row) {
                  setDataGhostDrag({
                    col: data.col,
                    row: data.row + 1,
                    part: data.part,
                  });
                  setCheckActive({
                    col: data.col,
                    row: data.row + 1,
                    part: data.part,
                    index: -1,
                  });
                  return {
                    ...dt,
                    row: data.row + 1,
                  };
                }
              }
            }
          }
        }

        return dt;
      });
      if (dataGhostDrag.part === 100) {
        setDataGhostDrag({ part: data.part, col: data.col, row: data.row + 1 });
        setCheckActive({
          part: data.part,
          col: data.col,
          row: data.row + 1,
          index: -1,
        });
        setDataLoad([
          ...dataNew,
          { ...addType, part: data.part, col: data.col, row: data.row + 1 },
        ]);
      } else setDataLoad(dataNew);
    };
    const vt =
      e.target.getBoundingClientRect().y +
      e.target.getBoundingClientRect().height / 2;
    const y = e.clientY;
    if (vt > y) {
      if (
        (dataGhostDrag.part === data.part &&
          dataGhostDrag.col === data.col &&
          dataGhostDrag.row + 1 === data.row) ||
        (dataGhostDrag.part === data.part &&
          dataGhostDrag.col === data.col &&
          dataGhostDrag.row === data.row)
      ) {
      } else {
        handleUp();
      }
    } else {
      if (
        (dataGhostDrag.part === data.part &&
          dataGhostDrag.col === data.col &&
          dataGhostDrag.row - 1 === data.row) ||
        (dataGhostDrag.part === data.part &&
          dataGhostDrag.col === data.col &&
          dataGhostDrag.row === data.row)
      ) {
      } else {
        handleDown();
      }
    }
  };
  const handleRemoveGhost = () => {
    document.getElementsByClassName("ghost-title")[0]?.remove();
  };
  const handleChangePositionV2 = (check: any) => {
    if (checkActive.index !== -1) return;
    if (check) {
      if (checkActive.row !== -1) {
        const dataNew = dataLoad.map((dt: any) => {
          if (
            checkActive.row - 1 === dt.row &&
            checkActive.col === dt.col &&
            checkActive.part === dt.part
          ) {
            return { ...dt, row: checkActive.row };
          }
          if (
            checkActive.row === dt.row &&
            checkActive.col === dt.col &&
            checkActive.part === dt.part
          ) {
            return { ...dt, row: checkActive.row - 1 };
          }
          return dt;
        });
        setCheckActive({ ...checkActive, row: checkActive.row - 1 });
        setDataLoad(dataNew);
        return;
      }
      if (checkActive.col !== -1) {
        const dataNew = dataLoad.map((dt: any) => {
          if (checkActive.col - 1 === dt.col && checkActive.part === dt.part) {
            return { ...dt, col: checkActive.col };
          }
          if (checkActive.col === dt.col && checkActive.part === dt.part) {
            return { ...dt, col: checkActive.col - 1 };
          }
          return dt;
        });
        // console.log(dataNew);
        setCheckActive({ ...checkActive, col: checkActive.col - 1 });

        setDataLoad(dataNew);

        return;
      }
      const dataNew = dataLoad.map((dt: any) => {
        if (checkActive.part - 1 === dt.part) {
          return { ...dt, part: checkActive.part };
        }
        if (checkActive.part === dt.part) {
          return { ...dt, part: checkActive.part - 1 };
        }
        return dt;
      });
      const dataNewColor = dataForm.color.map((dt: any, i: any) => {
        if (checkActive.part - 1 === i) {
          return dataForm.color[checkActive.part];
        }
        if (checkActive.part === i) {
          return dataForm.color[checkActive.part - 1];
        }
        return dt;
      });
      const dataNewLayout = dataForm.layout.map((dt: any, i: any) => {
        if (checkActive.part - 1 === i) {
          return dataForm.layout[checkActive.part];
        }
        if (checkActive.part === i) {
          return dataForm.layout[checkActive.part - 1];
        }
        return dt;
      });
      const dataNewPad = dataForm.pad.map((dt: any, i: any) => {
        if (checkActive.part - 1 === i) {
          return dataForm.pad[checkActive.part];
        }
        if (checkActive.part === i) {
          return dataForm.pad[checkActive.part - 1];
        }
        return dt;
      });
      setDataForm({
        ...dataForm,
        color: dataNewColor,
        layout: dataNewLayout,
        pad: dataNewPad,
      });
      // console.log(dataNew, "part 1");
      setCheckActive({ ...checkActive, part: checkActive.part - 1 });

      setDataLoad(dataNew);
      return;
    } else {
      if (checkActive.row !== -1) {
        const dataNew = dataLoad.map((dt: any) => {
          if (
            checkActive.row + 1 === dt.row &&
            checkActive.col === dt.col &&
            checkActive.part === dt.part
          ) {
            return { ...dt, row: checkActive.row };
          }
          if (
            checkActive.row === dt.row &&
            checkActive.col === dt.col &&
            checkActive.part === dt.part
          ) {
            return { ...dt, row: checkActive.row + 1 };
          }
          return dt;
        });
        setCheckActive({ ...checkActive, row: checkActive.row + 1 });

        setDataLoad(dataNew);
        return;
      }
      if (checkActive.col !== -1) {
        const dataNew = dataLoad.map((dt: any) => {
          if (checkActive.col + 1 === dt.col && checkActive.part === dt.part) {
            return { ...dt, col: checkActive.col };
          }
          if (checkActive.col === dt.col && checkActive.part === dt.part) {
            return { ...dt, col: checkActive.col + 1 };
          }
          return dt;
        });
        setCheckActive({ ...checkActive, col: checkActive.col + 1 });

        setDataLoad(dataNew);
        return;
      }
      const dataNew = dataLoad.map((dt: any) => {
        if (checkActive.part + 1 === dt.part) {
          return { ...dt, part: checkActive.part };
        }
        if (checkActive.part === dt.part) {
          return { ...dt, part: checkActive.part + 1 };
        }
        return dt;
      });
      setCheckActive({ ...checkActive, part: checkActive.part + 1 });
      const dataNewColor = dataForm.color.map((dt: any, i: any) => {
        if (checkActive.part + 1 === i) {
          return dataForm.color[checkActive.part];
        }
        if (checkActive.part === i) {
          return dataForm.color[checkActive.part + 1];
        }
        return dt;
      });
      const dataNewLayout = dataForm.layout.map((dt: any, i: any) => {
        if (checkActive.part + 1 === i) {
          return dataForm.layout[checkActive.part];
        }
        if (checkActive.part === i) {
          return dataForm.layout[checkActive.part + 1];
        }
        return dt;
      });
      const dataNewPad = dataForm.pad.map((dt: any, i: any) => {
        if (checkActive.part + 1 === i) {
          return dataForm.pad[checkActive.part];
        }
        if (checkActive.part === i) {
          return dataForm.pad[checkActive.part + 1];
        }
        return dt;
      });
      setDataForm({
        ...dataForm,
        color: dataNewColor,
        layout: dataNewLayout,
        pad: dataNewPad,
      });
      setDataLoad(dataNew);
      return;
    }
  };
  const checkGhost = (data: any) => {
    return (
      data?.part === dataGhostDrag.part &&
      data?.col === dataGhostDrag.col &&
      data?.row === dataGhostDrag.row
    );
  };
  const handleOnClickPart = (e: any, index: any) => {
    if (e.currentTarget === e.target) {
      handleChangeActive({
        part: index,
      });
    }
  };
  const handleOnClickRow = (e: any, index: any, indexItem: any, item: any) => {
    if (e.currentTarget === e.target) {
      e.stopPropagation();
      handleChangeActive({
        part: index,
        col: indexItem,
        row: item,
      });
    }
  };
  const handleOnClickRowItem = (
    e: any,
    index: any,
    indexItem: any,
    item: any,
    i: any
  ) => {
    e.stopPropagation();

    handleChangeActive({
      part: index,
      col: indexItem,
      row: item,
      index: i,
    });
  };
  const handleOnMouseMoveRow = (e: any, data: any) => {
    // console.log(e, data);
    if (dataGhostDrag.part !== -1) handleChangePosition(e, data);
  };
  const handleAddMore = (part: any, col: any, row: any) => {
    const newData = dataLoad.map((dt: any) => {
      if (dt.part === part && dt.col === col && dt.row === row) {
        if (dt?.moreCvInformations) {
          return {
            ...dt,
            moreCvInformations: [...dt.moreCvInformations, formMore[0]],
          };
        }
        if (dt?.moreCvExtraInformations) {
          return {
            ...dt,
            moreCvExtraInformations: [
              ...dt.moreCvExtraInformations,
              formMore[1],
            ],
          };
        }
        if (dt?.moreCvProjects) {
          return { ...dt, moreCvProjects: [...dt.moreCvProjects, formMore[2]] };
        }
      }
      return dt;
    });
    setDataLoad(newData);
  };
  const handleToolMouseMoveTransRow = (e: any, data: any) => {
    e.preventDefault();
    setAddCategory(true);
    setDataGhostDrag({ part: 100, col: 100, row: 100 });
    switch (data.type) {
      case "info_person":
        setAddType({ ...formType[0], type: data.type });
        break;
      case "info_project":
        setAddType({ ...formType[2], type: data.type });
        break;
      case "info_study":
      case "info_activate":
      case "info_experience":
        setAddType({ ...formType[1], type: data.type });
        break;
      default:
        setAddType({ ...formType[3], type: data.type });
    }
    handleCreateGhost(e, { name: data.name });
  };
  const handleChangeLayout = (index: any, type: any) => {
    let dataColorOld = dataForm.color[index].split(",");
    let dataPadOld = dataForm.pad[index].split(",");

    const changeLayout = () => {
      let dataNew = dataForm.layout.slice();
      let dataNewColor = dataForm.color.slice();
      dataNewColor.splice(index, 1, dataColorOld);
      console.log(dataNewColor);
      let dataNewPad = dataForm.pad.slice();
      dataNewPad.splice(index, 1, dataPadOld);
      switch (type) {
        case 0:
          dataNew.splice(index, 1, "100");
          setDataForm({
            ...dataForm,
            layout: dataNew,
            color: dataNewColor,
            pad: dataNewPad,
          });
          setBackNext({
            back: backNext,
            present: {
              dataForm: {
                ...dataForm,
                layout: dataNew,
                color: dataNewColor,
                pad: dataNewPad,
              },
              dataLoad: backNext.present.dataLoad,
            },
            next: {},
          });
          break;
        case 1:
          dataNew.splice(index, 1, "50,50");
          setDataForm({
            ...dataForm,
            layout: dataNew,
            color: dataNewColor,
            pad: dataNewPad,
          });
          setBackNext({
            back: backNext,
            present: {
              dataForm: {
                ...dataForm,
                layout: dataNew,
                color: dataNewColor,
                pad: dataNewPad,
              },
              dataLoad: backNext.present.dataLoad,
            },
            next: {},
          });
          break;
        case 2:
          dataNew.splice(index, 1, "66.67,33.33");
          setDataForm({
            ...dataForm,
            layout: dataNew,
            color: dataNewColor,
            pad: dataNewPad,
          });
          setBackNext({
            back: backNext,
            present: {
              dataForm: {
                ...dataForm,
                layout: dataNew,
                color: dataNewColor,
                pad: dataNewPad,
              },
              dataLoad: backNext.present.dataLoad,
            },
            next: {},
          });
          break;
        case 3:
          dataNew.splice(index, 1, "33.33,66.67");
          setDataForm({
            ...dataForm,
            layout: dataNew,
            color: dataNewColor,
            pad: dataNewPad,
          });
          setBackNext({
            back: backNext,
            present: {
              dataForm: {
                ...dataForm,
                layout: dataNew,
                color: dataNewColor,
                pad: dataNewPad,
              },
              dataLoad: backNext.present.dataLoad,
            },
            next: {},
          });
          break;
        case 4:
          dataNew.splice(index, 1, "75,25");
          setDataForm({
            ...dataForm,
            layout: dataNew,
            color: dataNewColor,
            pad: dataNewPad,
          });
          setBackNext({
            back: backNext,
            present: {
              dataForm: {
                ...dataForm,
                layout: dataNew,
                color: dataNewColor,
                pad: dataNewPad,
              },
              dataLoad: backNext.present.dataLoad,
            },
            next: {},
          });
          break;
        case 5:
          dataNew.splice(index, 1, "25,75");
          setDataForm({
            ...dataForm,
            layout: dataNew,
            color: dataNewColor,
            pad: dataNewPad,
          });
          setBackNext({
            back: backNext,
            present: {
              dataForm: {
                ...dataForm,
                layout: dataNew,
                color: dataNewColor,
                pad: dataNewPad,
              },
              dataLoad: backNext.present.dataLoad,
            },
            next: {},
          });
          break;
        case 6:
          dataNew.splice(index, 1, "58.33,41.67");
          setDataForm({
            ...dataForm,
            layout: dataNew,
            color: dataNewColor,
            pad: dataNewPad,
          });
          setBackNext({
            back: backNext,
            present: {
              dataForm: {
                ...dataForm,
                layout: dataNew,
                color: dataNewColor,
                pad: dataNewPad,
              },
              dataLoad: backNext.present.dataLoad,
            },
            next: {},
          });
          break;
        case 7:
          dataNew.splice(index, 1, "41.67,58.33");
          setDataForm({
            ...dataForm,
            layout: dataNew,
            color: dataNewColor,
            pad: dataNewPad,
          });
          setBackNext({
            back: backNext,
            present: {
              dataForm: {
                ...dataForm,
                layout: dataNew,
                color: dataNewColor,
                pad: dataNewPad,
              },
              dataLoad: backNext.present.dataLoad,
            },
            next: {},
          });
          break;
        case 8:
          dataNew.splice(index, 1, "33.33,33.34,33.33");
          setDataForm({
            ...dataForm,
            layout: dataNew,
            color: dataNewColor,
            pad: dataNewPad,
          });
          setBackNext({
            back: backNext,
            present: {
              dataForm: {
                ...dataForm,
                layout: dataNew,
                color: dataNewColor,
                pad: dataNewPad,
              },
              dataLoad: backNext.present.dataLoad,
            },
            next: {},
          });
          break;
        case 9:
          dataNew.splice(index, 1, "25,50,25");
          setDataForm({
            ...dataForm,
            layout: dataNew,
            color: dataNewColor,
            pad: dataNewPad,
          });
          setBackNext({
            back: backNext,
            present: {
              dataForm: {
                ...dataForm,
                layout: dataNew,
                color: dataNewColor,
                pad: dataNewPad,
              },
              dataLoad: backNext.present.dataLoad,
            },
            next: {},
          });
          break;
        case 10:
          dataNew.splice(index, 1, "25,25,50");
          setDataForm({
            ...dataForm,
            layout: dataNew,
            color: dataNewColor,
          });
          setBackNext({
            back: backNext,
            present: {
              dataForm: {
                ...dataForm,
                layout: dataNew,
                color: dataNewColor,
                pad: dataNewPad,
              },
              dataLoad: backNext.present.dataLoad,
            },
            next: {},
          });
          break;
        case 11:
          dataNew.splice(index, 1, "50,25,25");
          setDataForm({
            ...dataForm,
            layout: dataNew,
            color: dataNewColor,
            pad: dataNewPad,
          });
          setBackNext({
            back: backNext,
            present: {
              dataForm: {
                ...dataForm,
                layout: dataNew,
                color: dataNewColor,
                pad: dataNewPad,
              },
              dataLoad: backNext.present.dataLoad,
            },
            next: {},
          });
          break;
        case 12:
          dataNew.splice(index, 1, "25,33.33,41.67");
          setDataForm({
            ...dataForm,
            layout: dataNew,
            color: dataNewColor,
            pad: dataNewPad,
          });
          setBackNext({
            back: backNext,
            present: {
              dataForm: {
                ...dataForm,
                layout: dataNew,
                color: dataNewColor,
                pad: dataNewPad,
              },
              dataLoad: backNext.present.dataLoad,
            },
            next: {},
          });
          break;
        case 13:
          dataNew.splice(index, 1, "33.33,25,41.67");
          setDataForm({
            ...dataForm,
            layout: dataNew,
            color: dataNewColor,
            pad: dataNewPad,
          });
          setBackNext({
            back: backNext,
            present: {
              dataForm: {
                ...dataForm,
                layout: dataNew,
                color: dataNewColor,
                pad: dataNewPad,
              },
              dataLoad: backNext.present.dataLoad,
            },
            next: {},
          });
          break;
        case 14:
          dataNew.splice(index, 1, "41.67,33.33,25");
          setDataForm({
            ...dataForm,
            layout: dataNew,
            color: dataNewColor,
            pad: dataNewPad,
          });
          setBackNext({
            back: backNext,
            present: {
              dataForm: {
                ...dataForm,
                layout: dataNew,
                color: dataNewColor,
                pad: dataNewPad,
              },
              dataLoad: backNext.present.dataLoad,
            },
            next: {},
          });
          break;
        case 15:
          dataNew.splice(index, 1, "25,41.67,33.33");
          setDataForm({
            ...dataForm,
            layout: dataNew,
            color: dataNewColor,
            pad: dataNewPad,
          });
          setBackNext({
            back: backNext,
            present: {
              dataForm: {
                ...dataForm,
                layout: dataNew,
                color: dataNewColor,
                pad: dataNewPad,
              },
              dataLoad: backNext.present.dataLoad,
            },
            next: {},
          });
          break;
        case 16:
          dataNew.splice(index, 1, "33.33,41.67,25");
          setDataForm({
            ...dataForm,
            layout: dataNew,
            color: dataNewColor,
            pad: dataNewPad,
          });
          setBackNext({
            back: backNext,
            present: {
              dataForm: {
                ...dataForm,
                layout: dataNew,
                color: dataNewColor,
                pad: dataNewPad,
              },
              dataLoad: backNext.present.dataLoad,
            },
            next: {},
          });
          break;
        default:
          dataNew.splice(index, 1, "25,25,25,25");
          setDataForm({
            ...dataForm,
            layout: dataNew,
            color: dataNewColor,
            pad: dataNewPad,
          });
          setBackNext({
            back: backNext,
            present: {
              dataForm: {
                ...dataForm,
                layout: dataNew,
                color: dataNewColor,
                pad: dataNewPad,
              },
              dataLoad: backNext.present.dataLoad,
            },
            next: {},
          });
          break;
      }
    };
    const changeSize = (sizeCol = 0) => {
      const dataFilter = dataLoad.filter((dt: any) => {
        return dt.part === index && dt.col === sizeCol;
      });
      const maxRow = dataFilter.length
        ? dataFilter.reduce((max: any, current: any) => {
            if (current.row > max.row) {
              return current;
            }
            return max;
          })
        : { row: -1 };
      let countRow = maxRow.row;
      const dataNew = dataLoad.map((dt: any) => {
        if (dt.part === index && dt.col > sizeCol) {
          countRow = countRow + 1;
          return { ...dt, col: sizeCol, row: countRow };
        }
        return dt;
      });
      // console.log(dataNew, dataLoad, countRow, sizeCol);
      setDataLoad(dataNew);
    };
    if (type === 0) {
      changeSize(0);
    }
    if (type > 0 && type < 8) {
      if (dataColorOld.length === 1) {
        dataColorOld = [...dataColorOld, "#"];
        dataPadOld = [...dataPadOld, "1"];
      }
      if (dataColorOld.length === 3) {
        dataColorOld.splice(2, 1);
        dataPadOld.splice(2, 1);
      }
      if (dataColorOld.length === 4) {
        dataColorOld.splice(2, 2);
        dataPadOld.splice(2, 2);
      }
      changeSize(1);
    }
    if (type > 7 && type < 17) {
      if (dataColorOld.length === 1) {
        dataColorOld = [...dataColorOld, "#"];
        dataPadOld = [...dataPadOld, "1"];
      }
      if (dataColorOld.length === 2) {
        dataColorOld = [...dataColorOld, "#"];
        dataPadOld = [...dataPadOld, "1"];
      }
      if (dataColorOld.length === 4) {
        dataColorOld.splice(3, 1);
        dataPadOld.splice(3, 1);
      }
      changeSize(2);
    }
    if (type === 17) {
      if (dataColorOld.length === 1) {
        dataColorOld = [...dataColorOld, "#", "#", "#"];
        dataPadOld = [...dataPadOld, "1", "1", "1"];
      }
      if (dataColorOld.length === 2) {
        dataColorOld = [...dataColorOld, "#", "#"];
        dataPadOld = [...dataPadOld, "1", "1"];
      }
      if (dataColorOld.length === 3) {
        dataColorOld = [...dataColorOld, "#"];
        dataPadOld = [...dataPadOld, "1"];
      }
    }
    dataColorOld = dataColorOld.join(",");
    dataPadOld = dataPadOld.join(",");

    changeLayout();
  };
  const handleLoadData = async () => {
    const fetchData = async () => {
      const res = (await axiosClient.get(
        `http://localhost:1902/api/v3/cv-extra-information/?cvIndex=${cvIndex}`
      )) as unknown as ILoad;
      const res2 = (await axiosClient.get(
        `http://localhost:1902/api/v3/cv-project/?cvIndex=${cvIndex}`
      )) as unknown as ILoad;
      const res3 = (await axiosClient.get(
        `http://localhost:1902/api/v3/cv-information/?cvIndex=${cvIndex}`
      )) as unknown as ILoad;
      const res4 = (await axiosClient.get(
        `http://localhost:1902/api/v3/cv-layout/?cvIndex=${cvIndex}`
      )) as unknown as ILoad;
      const dataNew = [...res.data, ...res2.data, res3.data];
      // console.log(res, res2, res3, res4, profile);
      setDataLoad(dataNew);
      setDataForm(res4.data);
      setBackNext({
        back: {},
        present: { dataForm: res4.data, dataLoad: dataNew },
        next: {},
      });
    };

    fetchData();
  };
  const handleUpItem = () => {
    const newData = dataLoad.map((dt: any) => {
      if (
        dt.part === checkActive.part &&
        dt.col === checkActive.col &&
        dt.row === checkActive.row
      ) {
        const itemData =
          dt?.moreCvInformations ||
          dt?.moreCvProjects ||
          dt?.moreCvExtraInformations;
        const newItem = itemData.map((dtt: any, i: any) => {
          if (i === checkActive.index - 1) {
            return itemData[checkActive.index];
          }
          if (i === checkActive.index) {
            return itemData[checkActive.index - 1];
          }
          return dtt;
        });
        if (dt?.moreCvInformations) {
          return { ...dt, moreCvInformations: newItem };
        }
        if (dt?.moreCvProjects) {
          return { ...dt, moreCvProjects: newItem };
        }
        if (dt?.moreCvExtraInformations) {
          return { ...dt, moreCvExtraInformations: newItem };
        }
      }
      return dt;
    });
    setDataLoad(newData);
    setCheckActive({ ...checkActive, index: checkActive.index - 1 });
  };
  const handleDownItem = () => {
    const newData = dataLoad.map((dt: any) => {
      if (
        dt.part === checkActive.part &&
        dt.col === checkActive.col &&
        dt.row === checkActive.row
      ) {
        const itemData =
          dt?.moreCvInformations ||
          dt?.moreCvProjects ||
          dt?.moreCvExtraInformations;
        const newItem = itemData.map((dtt: any, i: any) => {
          if (i === checkActive.index) {
            return itemData[checkActive.index + 1];
          }
          if (i === checkActive.index + 1) {
            return itemData[checkActive.index];
          }

          return dtt;
        });
        if (dt?.moreCvInformations) {
          return { ...dt, moreCvInformations: newItem };
        }
        if (dt?.moreCvProjects) {
          return { ...dt, moreCvProjects: newItem };
        }
        if (dt?.moreCvExtraInformations) {
          return { ...dt, moreCvExtraInformations: newItem };
        }
      }
      return dt;
    });
    setDataLoad(newData);
    setCheckActive({ ...checkActive, index: checkActive.index + 1 });
  };
  const handleNext = () => {
    if (Object.keys(backNext.next).length !== 0) {
      setDataLoad(backNext.next.present.dataLoad);
      setDataForm(backNext.next.present.dataForm);
      setBackNext({
        ...backNext,
        back: backNext.next.back,
        present: backNext.next.present,
        next: backNext.next.next,
      });
    }
  };
  const handlePrev = () => {
    if (Object.keys(backNext.back).length !== 0) {
      setDataLoad(backNext.back.present);
      setDataLoad(backNext.back.present.dataLoad);
      setDataForm(backNext.back.present.dataForm);
      setBackNext({
        ...backNext,
        back: backNext.back.back,
        present: backNext.back.present,
        next: backNext,
      });
    }
  };
  const handleChangePad = () => {
    if (checkActive.index !== -1) {
      const newDataLoad = dataLoad.map((dt: any) => {
        if (
          checkActive.part === dt.part &&
          checkActive.col === dt.col &&
          checkActive.row === dt.row
        ) {
          const dataMore =
            dt?.moreCvInformations ||
            dt?.moreCvExtraInformations ||
            dt?.moreCvProjects;
          let propertyName = dt?.moreCvInformations
            ? "moreCvInformations"
            : dt?.moreCvExtraInformations
            ? "moreCvExtraInformations"
            : "moreCvProjects";
          const newDataIndex = dataMore.map((dtt: any, index: any) => {
            if (index === checkActive.index) {
              console.log(dtt);
              return { ...dtt, padIndex: dtt.padIndex ? 0 : 1 };
            }
            return dtt;
          });
          return { ...dt, [propertyName]: newDataIndex };
        }
        return dt;
      });
      setDataLoad(newDataLoad);
      return;
    }
    if (checkActive.row !== -1) {
      const newDataLoad = dataLoad.map((dt: any) => {
        if (
          dt.part === checkActive.part &&
          dt.col === checkActive.col &&
          dt.row === checkActive.row
        ) {
          return { ...dt, padIndex: dt.padIndex ? 0 : 1 };
        }
        return dt;
      });
      console.log(newDataLoad);
      setDataLoad(newDataLoad);
      return;
    }
    if (checkActive.col !== -1) {
      const dataNew = dataForm?.pad.map((dt: any, iRow: any) => {
        if (iRow === checkActive.part) {
          const newDataPad = dt
            .split(",")
            .map((dtt: any, iCol: any) => {
              if (checkActive.col === iCol) {
                return Number(dtt) ? 0 : 1;
              }
              return dtt;
            })
            .join(",");
          return newDataPad;
        }
        return dt;
      });
      setDataForm({ ...dataForm, pad: dataNew });
      return;
    }
    const dataNew = dataForm?.padPart.map((dt: any, iPart: any) => {
      if (iPart === checkActive.part) {
        return dt ? 0 : 1;
      }
      return dt;
    });
    setDataForm({ ...dataForm, padPart: dataNew });
  };
  const handleRemove = () => {
    handleResetActive();
    if (checkActive.index !== -1) {
      let dataNewLoad = dataLoad.filter((dt: any) => {
        return (
          checkActive.part === dt.part &&
          checkActive.col === dt.col &&
          checkActive.row === dt.row
        );
      });

      const dataNewItem =
        dataNewLoad[0]?.moreCvInformations ||
        dataNewLoad[0]?.moreCvExtraInformations ||
        dataNewLoad[0]?.moreCvProjects;

      let propertyName = dataNewLoad[0]?.moreCvInformations
        ? "moreCvInformations"
        : dataNewLoad[0]?.moreCvExtraInformations
        ? "moreCvExtraInformations"
        : "moreCvProjects";
      dataNewItem?.splice(checkActive.index, 1);
      dataNewLoad = dataLoad.map((dt: any) => {
        if (
          checkActive.part === dt.part &&
          checkActive.col === dt.col &&
          checkActive.row === dt.row
        ) {
          return { ...dt, [propertyName]: dataNewItem };
        }
        return dt;
      });
      setDataLoad(dataNewLoad);
      return;
    }
    if (checkActive.row !== -1) {
      const removeDataFil = dataLoad.filter((dt: any) => {
        return !(
          checkActive.part === dt.part &&
          checkActive.col === dt.col &&
          checkActive.row === dt.row
        );
      });
      console.log(removeDataFil);
      const newDataLoad = removeDataFil.map((dt: any) => {
        if (
          checkActive.part === dt.part &&
          checkActive.col === dt.col &&
          checkActive.row < dt.row
        ) {
          return { ...dt, row: dt.row - 1 };
        }

        return dt;
      });
      setDataLoad(newDataLoad);
      return;
    }
    if (checkActive.col !== -1) {
      const newDataLoad = dataLoad.filter((dt: any) => {
        return !(checkActive.part === dt.part && checkActive.col === dt.col);
      });
      const newColorCol = dataForm.color[checkActive.part]
        .split(",")
        .filter((dt: any, iCol: any) => {
          return !(iCol === checkActive.col);
        })
        .join(",");
      const newDataColor = dataForm.color.map((dt: any, iPart: any) => {
        if (checkActive.part === iPart) {
          return newColorCol;
        }
      });
      const newLayoutCol = dataForm.layout[checkActive.part]
        .split(",")
        .filter((dt: any, iCol: any) => {
          return !(iCol === checkActive.col);
        })
        .join(",");
      const newDataLayout = dataForm.layout.map((dt: any, iPart: any) => {
        if (checkActive.part === iPart) {
          return newLayoutCol;
        }
      });
      const newPadCol = dataForm.pad[checkActive.part]
        .split(",")
        .filter((dt: any, iCol: any) => {
          return !(iCol === checkActive.col);
        })
        .join(",");
      const newDataPad = dataForm.pad.map((dt: any, iPart: any) => {
        if (checkActive.part === iPart) {
          return newPadCol;
        }
      });
      console.log(newDataColor, newDataLoad, newDataLayout, newDataPad);
      return;
    }
    const newDataRemove = dataLoad.filter((dt: any) => {
      return !(checkActive.part === dt.part);
    });
    const newDataLoad = newDataRemove.map((dt: any) => {
      if (checkActive.part < dt.part) {
        return { ...dt, part: dt.part - 1 };
      }
      return dt;
    });
    const newDataColor = dataForm.color.filter((dt: any, iPart: any) => {
      return !(iPart === checkActive.part);
    });

    const newDataLayout = dataForm.layout.filter((dt: any, iPart: any) => {
      return !(iPart === checkActive.part);
    });

    const newDataPad = dataForm.pad.filter((dt: any, iPart: any) => {
      return !(iPart === checkActive.part);
    });

    setDataLoad(newDataLoad);
    setDataForm({
      ...dataForm,
      color: newDataColor,
      layout: newDataLayout,
      pad: newDataPad,
    });
  };

  const handleCheckPadCol = () => {
    const iCol = dataRequest[checkActive.part]?.pad[checkActive.col];
    return iCol;
  };
  const handleBtnSave = async () => {
    console.log(profile);

    // const result = await cvsApi.totalPosts(dataLoad, dataForm, cvID);
  };

  useEffect(() => {
    console.log(dataLoad, dataRequest, dataForm);
  }, [dataLoad, dataRequest, dataForm]);
  useEffect(() => {
    const handleCheckCvs = (cvs: any) => {
      let dataCvID = 0;
      if (profile.profilesCvs?.length > 0) {
        const dataCheck = profile.profilesCvs?.filter((dt: any) => {
          return dt.cvIndex == cvs;
        });
        if (dataCheck.length > 0) {
          setCvID(cvs);
          return cvs;
        }
        dataCvID = profile.profilesCvs?.reduce((dt: any, current: any) => {
          if (current.cvIndex > dt?.cvIndex) {
            return current;
          }
          return dt;
        }).cvIndex;
        setCvID(dataCvID + 1);

        return dataCvID + 1;
      }
      setCvID(dataCvID);

      return dataCvID;
    };
    if (profile) {
      if (handleCheckCvs(cvIndex) === cvIndex) {
        handleLoadData();
      } else {
        const dataNew = handleLoadTempData(templateId);

        setDataForm({
          layout: dataNew.layout,
          color: dataNew.color,
          pad: dataNew.pad,
          padPart: dataNew.padPart,
          cvIndex: handleCheckCvs("new"),
          colorTopic: dataNew.colorTopic,
          indexTopic: 0,
        });
        const newDataLoad = dataNew.data.map((dt: any) => {
          const dataOld = dataLoad.filter((dtt: any) => {
            return dtt.type === dt.type;
          });
          if (dataOld.length === 1) {
            const dataMore =
              dataOld[0]?.moreCvInformations ||
              dataOld[0]?.moreCvExtraInformations ||
              dataOld[0]?.moreCvProjects;
            let propertyName = dataOld[0]?.moreCvInformations
              ? "moreCvInformations"
              : dataOld[0]?.moreCvExtraInformations
              ? "moreCvExtraInformations"
              : "moreCvProjects";
            return { ...dt, [propertyName]: dataMore };
          }
          return dt;
        });
        setDataLoad(
          newDataLoad.map((dt: any) => {
            return { ...dt, cvIndex: handleCheckCvs("new") };
          })
        );
        setBackNext({
          back: {},
          present: {
            dataForm: {
              layout: dataNew.layout,
              color: dataNew.color,
              pad: dataNew.pad,
              padPart: dataNew.padPart,
              cvIndex: handleCheckCvs("new"),
              colorTopic: dataNew.colorTopic,
              indexTopic: 0,
            },
            dataLoad: dataNew.data.map((dt: any) => {
              return { ...dt, cvIndex: handleCheckCvs("new") };
            }),
          },
          next: {},
        });
      }
    }
  }, [cvIndex, templateId, profile]);

  useEffect(() => {
    const handleUpGhost = () => {
      setDataGhostDrag({ part: -1, col: -1, row: -1 });
      handleRemoveGhost();
    };
    const handleEditPosition = (e: any) => {
      if (dataGhostDrag.part !== -1) {
        const divGhost = document.getElementsByClassName(
          "ghost-title"
        )[0] as HTMLElement;
        divGhost.style.left = e.clientX - 5 + "px";
        divGhost.style.top = e.clientY - 5 + "px";
      }
    };
    window.addEventListener("mouseup", handleUpGhost);
    window.addEventListener("mousemove", handleEditPosition);
    return () => {
      window.removeEventListener("mouseup", handleUpGhost);
      window.removeEventListener("mousemove", handleEditPosition);
    };
  }, [dataGhostDrag]);
  useEffect(() => {
    let data = dataForm.layout.map((dt: any, index: any) => {
      let dataa: any = [];
      const padPart = Number(dataForm.padPart?.[index]);

      dt.split(",").map((j: any, i: any) => {
        let dataaa = dataLoad.filter((dtt: any) => {
          if (dtt.type === "info_person") {
            handleUpSetImage(dtt);
          }
          return dtt.part === index && dtt.col === i;
        });
        dataaa = dataaa.sort((a: any, b: any) => {
          return a.row - b.row;
        });

        dataaa = dataaa.map((dtaaa: any) => {
          const padCol = Number(dataForm.pad?.[index].split(",")?.[dtaaa.col]);
          const padRow = Number(dtaaa.padIndex);

          if (dtaaa.type === "info_person") {
            const maxWidthRow =
              (maxWidthPage * Number(j)) / 100 -
              (padCol + padPart + padRow) * 10 * 2;

            const moreInfo = dtaaa?.moreCvInformations?.map((dtmore: any) => {
              const padTotal =
                Number(dtmore.padIndex) + padCol + padPart + padRow;
              const maxWidth =
                (maxWidthPage * Number(j)) / 100 - padTotal * 10 * 2;
              return { ...dtmore, maxWidth: maxWidth };
            });
            return {
              ...dtaaa,
              maxWidth: maxWidthRow,
              moreCvInformations: moreInfo,
            };
          } else {
            if (dtaaa.type === "info_project") {
              const maxWidth =
                (maxWidthPage * Number(j)) / 100 -
                (padCol + padPart + padRow) * 10 * 2;

              const moreInfo = dtaaa?.moreCvProjects?.map((dtmore: any) => {
                const padTotal =
                  Number(dtmore.padIndex) + padCol + padPart + padRow;
                const maxWidth =
                  (maxWidthPage * Number(j)) / 100 - padTotal * 10 * 2;
                return { ...dtmore, maxWidth: maxWidth };
              });
              return {
                ...dtaaa,
                maxWidth: maxWidth,
                moreCvProjects: moreInfo,
              };
            } else {
              const maxWidth =
                (maxWidthPage * Number(j)) / 100 -
                (padCol + padPart + padRow) * 10 * 2;

              const moreInfo = dtaaa?.moreCvExtraInformations?.map(
                (dtmore: any) => {
                  const padTotal =
                    Number(dtmore.padIndex) + padCol + padPart + padRow;
                  const maxWidth =
                    (maxWidthPage * Number(j)) / 100 - padTotal * 10 * 2;
                  return { ...dtmore, maxWidth: maxWidth };
                }
              );
              return {
                ...dtaaa,
                maxWidth: maxWidth,
                moreCvExtraInformations: moreInfo,
              };
            }
          }
        });
        // console.log(newDataaa);
        dataa.push(dataaa);
      });
      return {
        layout: dt.split(",").map(Number),
        color: dataForm.color[index].split(","),
        padPart: dataForm.padPart?.[index],
        pad: dataForm.pad?.[index]?.split(",").map((padItem: any) => {
          return Number(padItem);
        }),
        data: dataa,
      };
    });
    setDataRequest(data);
  }, [dataLoad, dataForm]);
  const BGPart = () => {
    return (
      <>
        <div
          className={`absolute inset-0 bg-white/70 ${
            checkActive.part !== -1 && dataGhostDrag.part === -1
              ? "z-10"
              : "hidden"
          }`}
          onMouseUp={() => {
            handleChangeActive({});
          }}
        ></div>
      </>
    );
  };
  const BGChoosePart = ({ index }: any) => {
    return (
      <>
        <div
          className="absolute inset-0"
          onMouseUp={(e: any) => {
            if (e.currentTarget === e.target) {
              e.stopPropagation();
              handleChangeActive({ part: index, col: -1, row: -1 });
            }
          }}
        ></div>
      </>
    );
  };
  const BGToolPart = ({ index, checkForm }: any) => {
    return (
      <>
        <div
          className={`absolute left-2 flex gap-x-1 bottom-full -translate-y-1  ${
            handleCheckPass({ part: index }) ? "z-20" : "hidden"
          }`}
        >
          {dataRequest.length > 1 &&
            !(checkForm === index - 1) &&
            index != 0 && (
              <div
                className="w-8 h-8 flex justify-center items-center  text-white border-blue-700 border-[1px] transition-all  bg-blue-700 text-base rounded-md hover:bg-blue-600 cursor-pointer shadow-[rgba(17,_17,_26,_0.1)_0px_0px_16px] font-bold"
                onMouseDown={() => {
                  handleChangePositionV2(true);
                }}
              >
                <FaArrowUp />
              </div>
            )}
          {dataRequest.length > 1 &&
            !(checkForm === index + 1) &&
            index != dataRequest.length - 1 && (
              <div
                className="w-8 h-8 flex justify-center items-center  text-white border-blue-700 border-[1px] transition-all  bg-blue-700 text-base rounded-md hover:bg-blue-600 cursor-pointer shadow-[rgba(17,_17,_26,_0.1)_0px_0px_16px] font-bold"
                onMouseDown={() => {
                  handleChangePositionV2(false);
                }}
              >
                <FaArrowDown />
              </div>
            )}

          <div
            className="w-8 h-8 flex justify-center items-center  text-white border-blue-700 border-[1px] transition-all  bg-blue-700 text-base rounded-md hover:bg-blue-600 cursor-pointer shadow-[rgba(17,_17,_26,_0.1)_0px_0px_16px] font-bold"
            onMouseDown={handleChangePad}
          >
            {dataRequest[index]?.padPart ? (
              <FaExpandArrowsAlt />
            ) : (
              <FaCompressArrowsAlt />
            )}
          </div>
          <div
            className="w-max p-2 h-8 flex gap-x-2 justify-center items-center bg-black text-blue-500 border-blue-700 border-[1px] transition-all hover:text-white hover:bg-blue-700 text-base rounded-md cursor-pointer shadow-[rgba(17,_17,_26,_0.1)_0px_0px_16px] font-bold"
            onMouseUp={() => {
              setCheckLayout(true);
            }}
          >
            <FaExchangeAlt />
          </div>

          <div
            className="w-max p-2 h-8 flex gap-x-2 justify-center items-center bg-black text-red-500 border-red-700 border-[1px] transition-all hover:text-white hover:bg-red-700 text-base rounded-md cursor-pointer shadow-[rgba(17,_17,_26,_0.1)_0px_0px_16px] font-bold"
            onMouseDown={() => {
              setTabAlert(true);
              updateHandleAlert(handleRemove);
            }}
          >
            <FaRegTrashCan />
          </div>
        </div>
      </>
    );
  };
  const BGToolType = ({
    iPart = -1,
    iCol = -1,
    iRow = -1,
    index = -1,
  }: any) => {
    return (
      <div
        className={`absolute left-full flex flex-col gap-y-1 top-0  ${
          handleCheckPass({ part: iPart, col: iCol, row: iRow, index: index })
            ? "z-20"
            : "hidden"
        }
        ${dataGhostDrag.part !== -1 && "hidden"}
        `}
      >
        {checkActive.part !== -1 && (
          <div
            className={`w-36 pl-4 h-8 flex gap-x-2 items-center  border-blue-700 border-[1px] transition-all  text-base rounded-r-md cursor-pointer shadow-[rgba(17,_17,_26,_0.1)_0px_0px_16px] font-bold
      ${
        checkActive.col === -1
          ? "text-white bg-blue-700"
          : "bg-black text-blue-500 hover:text-white hover:bg-blue-700"
      }
      `}
            onMouseUp={() => {
              if (checkActive.col !== -1) console.log("22");
              setCheckActive({ ...checkActive, row: -1, col: -1, index: -1 });
            }}
          >
            <MdTableRows />
            <span className="text-sm">Hàng</span>
          </div>
        )}
        {checkActive.col !== -1 && (
          <div
            className={`w-36 pl-4 h-8 flex gap-x-2 items-center  border-blue-700 border-[1px] transition-all  text-base rounded-r-md cursor-pointer shadow-[rgba(17,_17,_26,_0.1)_0px_0px_16px] font-bold
      ${
        checkActive.row === -1
          ? "text-white bg-blue-700"
          : "bg-black text-blue-500 hover:text-white hover:bg-blue-700"
      }
      `}
            onMouseUp={() => {
              if (checkActive.row !== -1) console.log("23");
              setCheckActive({ ...checkActive, row: -1, index: -1 });
            }}
          >
            <MdViewColumn />
            <span className="text-sm">Cột</span>
          </div>
        )}
        {checkActive.row !== -1 && (
          <div
            className={`w-36 pl-4 h-8 flex gap-x-2  items-center  border-blue-700 border-[1px] transition-all  text-base rounded-r-md cursor-pointer shadow-[rgba(17,_17,_26,_0.1)_0px_0px_16px] font-bold
      ${
        checkActive.index === -1
          ? "text-white bg-blue-700"
          : "bg-black text-blue-500 hover:text-white hover:bg-blue-700"
      }
      `}
            onMouseUp={() => {
              if (checkActive.index !== -1) console.log("24");
              setCheckActive({ ...checkActive, index: -1 });
            }}
          >
            <HiDocumentText />
            <span className="text-sm">Mục</span>
          </div>
        )}
        <div
          className="w-36 pl-4 h-8 flex gap-x-2  items-center bg-black text-red-500 border-red-700 border-[1px] transition-all hover:text-white hover:bg-red-700 text-base rounded-r-md cursor-pointer shadow-[rgba(17,_17,_26,_0.1)_0px_0px_16px] font-bold"
          onMouseDown={() => {
            handleResetActive();
          }}
        >
          <FaSignOutAlt />
          <span className="text-sm">Thoát</span>
        </div>
      </div>
    );
  };
  const BGCol = () => {
    return (
      <div
        className={`absolute inset-0 bg-white/70 ${
          checkActive.col !== -1 && dataGhostDrag.part === -1
            ? "z-10"
            : "hidden"
        }`}
        onMouseUp={() => {
          handleChangeActive({});
        }}
      ></div>
    );
  };
  const BGChooseCol = ({ index, indexItem }: any) => {
    return (
      <div
        className="absolute inset-0"
        onMouseUp={(e: any) => {
          e.stopPropagation();
          handleChangeActive({
            part: index,
            col: indexItem,
            row: -1,
          });
        }}
        onMouseMove={(e: any) => {
          handleChooseCol(index, indexItem);
        }}
      ></div>
    );
  };

  const BGChooseRow = ({ data }: any) => {
    return (
      <div
        className={`absolute inset-0 ${
          dataGhostDrag.row !== -1 ? "z-20" : "-z-10"
        }`}
        // onMouseUp={(e: any) => {
        //   if (e.currentTarget === e.target) {
        //     e.stopPropagation();
        //   }
        // }}
        onMouseMove={(e: any) => {
          handleOnMouseMoveRow(e, data);
        }}
      ></div>
    );
  };
  const BGToolCol = ({ dt, indexItem, index }: any) => {
    return (
      <>
        <div className="w-8 h-8 text-blue-500 font-bold text-lg flex justify-center items-center rounded-md bg-black border-blue-500 border-[1px] hover:bg-blue-500 hover:text-white cursor-pointer">
          <IoMdAdd />
        </div>
        <div
          className="w-8 h-8 text-blue-500 font-bold text-lg flex justify-center items-center rounded-md bg-black border-blue-500 border-[1px] hover:bg-blue-500 hover:text-white cursor-pointer"
          onMouseDown={() => {
            handleChangePad();
          }}
        >
          {handleCheckPadCol() ? (
            <FaCompressArrowsAlt />
          ) : (
            <FaExpandArrowsAlt />
          )}
        </div>
      </>
    );
  };
  const BGToolRow = ({ item, index, indexItem, dttt }: any) => {
    return (
      <div
        className={`absolute bottom-full left-0 flex gap-x-1 -translate-y-1 ${
          checkActive.row === item &&
          checkActive.part === index &&
          checkActive.col === indexItem &&
          checkActive.index === -1
            ? ""
            : "hidden"
        }`}
      >
        <button
          className={`p-2 rounded-md text-white hover:bg-blue-600 bg-blue-700 ${
            dataGhostDrag.part !== -1 && "hidden"
          }`}
          onMouseDown={(e: any) => {
            e.preventDefault();
            setDataGhostDrag({
              part: dttt.part,
              col: dttt.col,
              row: dttt.row,
            });
            handleCreateGhost(e, { ...dttt, name: dttt.type });
          }}
        >
          <FaArrowsAlt />
        </button>

        <button
          className={`p-2 rounded-md text-white hover:bg-blue-600 bg-blue-700  ${
            dataGhostDrag.part !== -1 && "hidden"
          }`}
          onMouseDown={(e: any) => {
            handleChangePad();
          }}
        >
          {dttt.padIndex ? <FaCompressArrowsAlt /> : <FaExpandArrowsAlt />}
        </button>
        <button
          className={`p-2 rounded-md bg-black text-blue-500 border-blue-700 border-[1px] transition-all hover:text-white hover:bg-blue-700 ${
            dataGhostDrag.part !== -1 && "hidden"
          }`}
          onMouseDown={(e: any) => {
            e.preventDefault();
            handleAddMore(index, indexItem, item);
          }}
        >
          <IoMdAdd />
        </button>
        <button
          className={`p-2 rounded-md bg-black text-red-500 border-red-700 border-[1px] transition-all hover:text-white hover:bg-red-700 ${
            dataGhostDrag.part !== -1 && "hidden"
          }`}
          onMouseDown={(e: any) => {
            setTabAlert(true);
            updateHandleAlert(handleRemove);
          }}
        >
          <FaRegTrashCan />
        </button>
      </div>
    );
  };
  const BGToolRowItem = ({ item, index, indexItem, i }: any) => {
    let maxData = dataLoad.filter((dt: any) => {
      return dt.part === index && dt.col === indexItem && dt.row === item;
    });
    maxData =
      maxData?.[0]?.moreCvInformations ||
      maxData?.[0]?.moreCvProjects ||
      maxData?.[0]?.moreCvExtraInformations;
    return (
      <div
        className={`absolute bottom-full left-0 flex gap-x-1 z-20 -translate-y-1 ${
          checkActive.row === item &&
          checkActive.part === index &&
          checkActive.col === indexItem &&
          checkActive.index === i
            ? ""
            : "hidden"
        }`}
      >
        {/* {checkBlurItem && maxData?.length !== 1 ? (
          <button
            className={`p-2 rounded-md !text-black !bg-blue-500 `}
            onMouseDown={(e: any) => {
              setCheckBlurItem(false);
              // blurSave.current.click();
            }}
          >
            Chỉnh vị trí
          </button>
        ) : ( */}
        <>
          {maxData?.length !== 1 && i !== 0 && (
            <button
              className={`p-2 rounded-md   text-white border-blue-700 border-[1px] transition-all  bg-blue-700 text-base hover:bg-blue-600 `}
              onMouseDown={(e: any) => {
                handleUpItem();
                e.preventDefault();
                e.stopPropagation();
                // blurSave.current.click();
              }}
            >
              <FaArrowUp />
            </button>
          )}

          {i + 1 < maxData?.length && (
            <button
              className={`p-2   text-white border-blue-700 border-[1px] transition-all  bg-blue-700 text-base rounded-md hover:bg-blue-600 `}
              onMouseDown={(e: any) => {
                handleDownItem();
                e.preventDefault();
                e.stopPropagation();
                // blurSave.current.click();
              }}
            >
              <FaArrowDown />
            </button>
          )}
          <div
            className="w-8 h-8 flex justify-center items-center text-white border-blue-700 border-[1px] transition-all  bg-blue-700 text-base rounded-md hover:bg-blue-600 cursor-pointer shadow-[rgba(17,_17,_26,_0.1)_0px_0px_16px] font-bold"
            onMouseDown={handleChangePad}
          >
            {maxData?.[i]?.padIndex ? (
              <FaExpandArrowsAlt />
            ) : (
              <FaCompressArrowsAlt />
            )}
          </div>
          <div
            className="w-max p-2 h-8 flex gap-x-2 justify-center items-center bg-black text-red-500 border-red-700 border-[1px] transition-all hover:text-white hover:bg-red-700 text-base rounded-md cursor-pointer shadow-[rgba(17,_17,_26,_0.1)_0px_0px_16px] font-bold"
            onMouseDown={() => {
              setTabAlert(true);
              updateHandleAlert(handleRemove);
            }}
          >
            <FaRegTrashCan />
          </div>
        </>
        {/* )} */}
      </div>
    );
  };
  const BGRow = () => {
    return (
      <div
        className={`absolute inset-0 bg-white/70 
                                  
                                  ${
                                    checkActive.row !== -1 &&
                                    dataGhostDrag.part === -1
                                      ? "z-10"
                                      : "hidden"
                                  }`}
        onClick={() => {
          handleChangeActive({});
        }}
      ></div>
    );
  };
  const BGLayout = () => {
    return (
      <div
        className={`fixed inset-0 bg-black/20 flex justify-center items-center z-[80] ${
          handleCheckPass({ part: checkActive.part }) && checkLayout
            ? ""
            : "hidden"
        }`}
        onMouseUp={() => {
          setCheckLayout(false);
        }}
        onClick={(e: any) => {
          e.stopPropagation();
        }}
      >
        <div
          className="w-full h-full max-w-3xl max-h-96 bg-white rounded-lg p-4 gap-y-8 flex flex-col"
          onMouseUp={(e: any) => {
            e.stopPropagation();
          }}
        >
          <p className="font-bold text-xl">Đổi bố cục</p>
          <div className="flex flex-wrap gap-x-4">
            <div
              className="p-2 rounded-xl border-2 cursor-pointer"
              onMouseUp={() => {
                handleChangeLayout(checkActive.part, 10);
              }}
            >
              1 | 2 | 1 | 1
            </div>
            <div
              className="p-2 rounded-xl border-2 cursor-pointer"
              onMouseUp={() => {
                handleChangeLayout(checkActive.part, 5);
              }}
            >
              1 | 1 | 1 | 1
            </div>
            <div
              className="p-2 rounded-xl border-2 cursor-pointer"
              onMouseUp={() => {
                handleChangeLayout(checkActive.part, 0);
              }}
            >
              1 | 2 | 2 | 1
            </div>
            <div
              className="p-2 rounded-xl border-2 cursor-pointer"
              onMouseUp={() => {
                handleChangeLayout(checkActive.part, 17);
              }}
            >
              1 | 2 | 2
            </div>
          </div>
        </div>
      </div>
    );
  };
  return {
    handleTimes,
    handleChangeTimeEnd,
    handleChangeTimeFirst,
    BGChooseCol,
    BGChoosePart,
    BGCol,
    BGPart,
    BGRow,
    BGToolCol,
    BGToolPart,
    BGToolRow,
    addType,
    checkActive,
    dataRequest,
    handleChangeActive,
    handleChangeColor,
    handleChangePosition,
    handleCheckPass,
    handleChooseCol,
    handleCreateGhost,
    handleOnClickPart,
    handleOnClickRow,
    handleOnMouseMoveRow,
    handleRemoveGhost,
    handleRemove,
    handleToolMouseMoveTransRow,
    setAddCategory,
    checkAddCategory,
    dataGhostDrag,
    checkGhost,
    dataForm,
    checkLayout,
    setCheckLayout,
    dataLoad,
    setDataLoad,
    setDataForm,
    handleChangeLayout,
    BGLayout,
    handleChangeData,
    handleAddMore,
    BGToolRowItem,
    handleOnClickRowItem,
    setCheckBlurItem,
    handleResetActive,
    handleUploadImage,
    imageAvatar,
    handleNext,
    handlePrev,
    backNext,
    setBackNext,
    templateId,
    setTemplateId,
    BGChooseRow,
    handleBtnSave,
    BGToolType,
  };
};

export default LibCvV2;
