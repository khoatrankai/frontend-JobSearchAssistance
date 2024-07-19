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
import { saveAs } from "file-saver";
import { useSelector } from "react-redux";
import { IoMdAdd } from "react-icons/io";
import { FaArrowUp } from "react-icons/fa";
import imageCompression from "browser-image-compression";
import html2pdf from "html2pdf.js";
import axiosClient from "@/configs/axiosClient";
import { AiOutlineExpandAlt } from "react-icons/ai";
import AlertOne from "@/util/Alert/AlertOne";
import { useSrollContext } from "@/context/AppProvider";
import { MdTableRows, MdViewColumn } from "react-icons/md";
import { HiDocumentText } from "react-icons/hi";
import cvsApi from "@/api/cvs";
import { captureElementAsFile } from "@/util/ConvertPdf";
import TimeStamp from "@/util/TimeStamp/TimeStamp";
import ToastCustom from "@/util/ToastCustom";
import CookieCustom from "@/util/CookieCustom";
import ConvertImgToPdf from "@/util/ConvertImgToPdf";
import { Modal } from "@mui/material";
import { scale } from "pdf-lib";
import { format } from "path";
import ConvertBase64ToImg from "@/util/ConvertBase64ToImg";

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
  const { getCookie } = CookieCustom();
  const { convertImgtoPdf } = ConvertImgToPdf();
  const { convertBaseToImg } = ConvertBase64ToImg();
  const { hdError, hdSuccess } = ToastCustom();
  const profile = useSelector((state: any) => state.profile.profile);
  const [checkBlurItem, setCheckBlurItem] = useState<boolean>(false);
  const { handleConvertToDate } = TimeStamp();
  const [maxWidthPage, setMaxWidthPage] = useState<any>(794);
  const [nameCv, setNameCv] = useState<any>("Tiêu đề CV");
  const [filePdf, setFilePdf] = useState<any>("");
  const [checkAddCategory, setAddCategory] = useState<boolean>(false);
  const [positionAddType, setPositionAddType] = useState<any>();
  const [scaleForm, setScaleForm] = useState<any>(95);
  const [listRatio, setListRatio] = useState<any>([
    "100",
    "50,50",
    "66.67,33.33",
    "33.33,66.67",
    "75,25",
    "25,75",
    "58.33,41.67",
    "41.67,58.33",
    "33.33,33.34,33.33",
    "25,50,25",
    "25,25,50",
    "50,25,25",
    "25,33.33,41.67",
    "33.33,25,41.67",
    "41.67,33.33,25",
    "25,41.67,33.33",
    "33.33,41.67,25",
    "25,25,25,25",
  ]);
  const {
    setTabAlert,
    setHandleAlert,
    updateHandleAlert,
    setContentAlert,
    handleOffTabLoading,
    handlePersistGateLoaded,
    dataDocsCv,
    reponsiveMobile,
  } = useSrollContext();
  const [dataForm, setDataForm] = useState<any>({
    cvIndex: 0,
    layout: ["33.33,66.67", "25,75", "75,25"],
    color: ["#,#", "#,#", "#,#"],
    colorText: ["#,#", "#,#", "#,#"],
  });
  const [backNext, setBackNext] = useState<any>();
  const [dataGhostDrag, setDataGhostDrag] = useState<any>({
    part: -1,
    col: -1,
    row: -1,
  });
  const [listDataForm, setListDataForm] = useState<any>([
    {
      layout: "35,65",
      colorCol: "#626262,#",
      colorText: "#ffffff,#222228",
      colorTopic: "#FFB156,#00AFD3,#777777",
      data: "1.9.5.4.2.0,8.3.7.6",
    },
    {
      layout: "100:100:33.33,33.34,33.33",
      colorTopic: "#529300,#212F3F,#BC4922,#994787,#247796,#595758",
      colorCol: "#:#:#,#,#",
      colorText: "#000000:#000000:#000000,#000000,#000000",
      data: "1:7.8.3.2.0:0,9,5",
    },
    {
      layout: "25,75",
      colorCol: "#353A3D,#",
      colorText: "#ffffff,#222228",
      colorTopic: "#EC8F00,#14ABE2",
      data: "1.9.5.4.2.0,8.3.7.6",
    },
    {
      layout: "100:100",
      colorCol: "#:#",
      colorText: "#000000:#000000",
      colorTopic: "#000000,#529300,#3B82F6",
      data: "1:2.3.4.5.6.7.8.9",
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
  const [dataLoad, setDataLoad] = useState<any>([]);
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
          name: "",
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
      name: "",
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
    const colorCol = listDataForm[temId].colorCol.split(":");
    const colorText = listDataForm[temId].colorText.split(":");
    const pad = layout.map((dt: any) => {
      const lengthPadCol = dt.split(",").length;
      const result = ",1".repeat(lengthPadCol).slice(1);
      return result;
    });
    const padPart = layout.map((dt: any) => {
      return 1;
    });
    let dataNew: any = [];
    // const color = colorCol.map((dt: any) => {

    //   const lengthdt = dt.split(",").length;
    //   if(lengthdt>0 && dt[0] == "#"){
    //     return dt
    //   }else{
    //     const resultdt = ",#".repeat(lengthdt).slice(1);
    //     return resultdt;
    //   }

    // });

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
      color: colorCol,
      colorText: colorText,
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
    // switch (type) {
    //   case "typeName":
    //   case "phone":
    //   case "address":
    //   case "email":
    //   case "name":
    //   case "link":
    //   case "avatar":
    //   case "intent":
    //console.log(part, col, row, type, index, dataNew);
    if (index != null || index === 0) {
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
        present: { ...backNext.present, dataLoad: newData2 },
        next: {},
      });
    } else {
      // break;
      // default:
      const newData = dataLoad.map((dt: any) => {
        if (dt.part === part && dt.col === col && dt.row === row) {
          return { ...dt, [type]: dataNew };
        }
        return dt;
      });
      //console.log("vao day", newData);

      setDataLoad(newData);
      setBackNext({
        back: backNext,
        present: { ...backNext.present, dataLoad: newData },
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
        ...backNext.present,
        dataForm: { ...dataForm, color: dataNew },
      },
      next: {},
    });
  };
  const handleChangeColorText = (color: any, part: any, col: any) => {
    let arrayColor = dataRequest[part].colorText.slice();
    arrayColor[col] = "#" + color;
    const dataColor = arrayColor.join(",");
    const dataNew = dataForm.color.slice();
    dataNew[part] = dataColor;
    setDataForm({ ...dataForm, colorText: dataNew });
    setBackNext({
      back: backNext,
      present: {
        ...backNext.present,
        dataForm: { ...dataForm, colorText: dataNew },
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
        setBackNext({
          back: backNext,
          present: {
            ...backNext.present,
            dataLoad: [
              ...dataLoad,
              { ...addType, part: part, col: col, row: maxRow.row + 1 },
            ],
          },
          next: {},
        });
        setDataGhostDrag({ part: part, col: col, row: maxRow.row + 1 });
        //console.log("2");
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
                //console.log("3");
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
          setBackNext({
            back: backNext,
            present: { ...backNext.present, dataLoad: dataNew },
            next: {},
          });
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
              //console.log("4");
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
          setBackNext({
            back: backNext,
            present: { ...backNext.present, dataLoad: dataNew },
            next: {},
          });
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
    //console.log("6");
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
              //console.log("7");
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
                  //console.log("8");
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
        // setBackNext({
        //   back: backNext,
        //   present: {
        //     ...backNext.present,
        //     dataLoad: [
        //       ...dataNew,
        //       { ...addType, part: data.part, col: data.col, row: data.row },
        //     ],
        //   },
        //   next: {},
        // });
      } else {
        setDataLoad(dataNew);
        // setBackNext({
        //   back: backNext,
        //   present: { ...backNext.present, dataLoad: dataNew },
        //   next: {},
        // });
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
        // setBackNext({
        //   back: backNext,
        //   present: {
        //     ...backNext.present,
        //     dataLoad: [
        //       ...dataNew,
        //       { ...addType, part: data.part, col: data.col, row: data.row + 1 },
        //     ],
        //   },
        //   next: {},
        // });
      } else {
        setDataLoad(dataNew);
        // setBackNext({
        //   back: backNext,
        //   present: { ...backNext.present, dataLoad: dataNew },
        //   next: {},
        // });
      }
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
        setBackNext({
          back: backNext,
          present: { ...backNext.present, dataLoad: dataNew },
          next: {},
        });
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
        // //console.log(dataNew);
        setCheckActive({ ...checkActive, col: checkActive.col - 1 });

        setDataLoad(dataNew);
        setBackNext({
          back: backNext,
          present: { ...backNext.present, dataLoad: dataNew },
          next: {},
        });
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
      const dataNewColorText = dataForm.colorText.map((dt: any, i: any) => {
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
        colorText: dataNewColorText,
        layout: dataNewLayout,
        pad: dataNewPad,
      });

      // //console.log(dataNew, "part 1");
      setCheckActive({ ...checkActive, part: checkActive.part - 1 });

      setDataLoad(dataNew);
      setBackNext({
        back: backNext,
        present: {
          dataForm: {
            ...dataForm,
            color: dataNewColor,
            colorText: dataNewColorText,
            layout: dataNewLayout,
            pad: dataNewPad,
          },
          dataLoad: dataNew,
        },
        next: {},
      });
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
        setBackNext({
          back: backNext,
          present: { ...backNext.present, dataLoad: dataNew },
          next: {},
        });
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
        setBackNext({
          back: backNext,
          present: { ...backNext.present, dataLoad: dataNew },
          next: {},
        });
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
      const dataNewColorText = dataForm.colorText.map((dt: any, i: any) => {
        if (checkActive.part + 1 === i) {
          return dataForm.colorText[checkActive.part];
        }
        if (checkActive.part === i) {
          return dataForm.colorText[checkActive.part + 1];
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
        colorText: dataNewColorText,
        layout: dataNewLayout,
        pad: dataNewPad,
      });
      setDataLoad(dataNew);
      setBackNext({
        back: backNext,
        present: {
          dataForm: {
            ...dataForm,
            color: dataNewColor,
            colorText: dataNewColorText,
            layout: dataNewLayout,
            pad: dataNewPad,
          },
          dataLoad: dataNew,
        },
        next: {},
      });
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
    // //console.log(e, data);
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
    setBackNext({
      back: backNext,
      present: { ...backNext.present, dataLoad: newData },
      next: {},
    });
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
    let dataColorTextOld = dataForm.colorText[index].split(",");
    let dataPadOld = dataForm.pad[index].split(",");

    const changeLayout = () => {
      let dataNew = dataForm.layout.slice();
      let dataNewColor = dataForm.color.slice();
      let dataNewColorText = dataForm.colorText.slice();
      dataNewColor.splice(index, 1, dataColorOld);
      dataNewColorText.splice(index, 1, dataColorTextOld);
      //console.log(dataNewColor);
      let dataNewPad = dataForm.pad.slice();
      dataNewPad.splice(index, 1, dataPadOld);
      switch (type) {
        case 0:
          dataNew.splice(index, 1, "100");
          setDataForm({
            ...dataForm,
            layout: dataNew,
            color: dataNewColor,
            colorText: dataNewColorText,
            pad: dataNewPad,
          });
          setBackNext({
            back: backNext,
            present: {
              ...backNext.present,
              dataForm: {
                ...dataForm,
                layout: dataNew,
                color: dataNewColor,
                colorText: dataNewColorText,

                pad: dataNewPad,
              },
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
            colorText: dataNewColorText,

            pad: dataNewPad,
          });
          setBackNext({
            back: backNext,
            present: {
              ...backNext.present,
              dataForm: {
                ...dataForm,
                layout: dataNew,
                color: dataNewColor,
                colorText: dataNewColorText,

                pad: dataNewPad,
              },
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
            colorText: dataNewColorText,

            pad: dataNewPad,
          });
          setBackNext({
            back: backNext,
            present: {
              ...backNext.present,
              dataForm: {
                ...dataForm,
                layout: dataNew,
                color: dataNewColor,
                colorText: dataNewColorText,

                pad: dataNewPad,
              },
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
            colorText: dataNewColorText,

            pad: dataNewPad,
          });
          setBackNext({
            back: backNext,
            present: {
              ...backNext.present,
              dataForm: {
                ...dataForm,
                layout: dataNew,
                color: dataNewColor,
                colorText: dataNewColorText,

                pad: dataNewPad,
              },
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
            colorText: dataNewColorText,

            pad: dataNewPad,
          });
          setBackNext({
            back: backNext,
            present: {
              ...backNext.present,
              dataForm: {
                ...dataForm,
                layout: dataNew,
                color: dataNewColor,
                colorText: dataNewColorText,

                pad: dataNewPad,
              },
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
            colorText: dataNewColorText,

            pad: dataNewPad,
          });
          setBackNext({
            back: backNext,
            present: {
              ...backNext.present,
              dataForm: {
                ...dataForm,
                layout: dataNew,
                color: dataNewColor,
                colorText: dataNewColorText,

                pad: dataNewPad,
              },
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
            colorText: dataNewColorText,

            pad: dataNewPad,
          });
          setBackNext({
            back: backNext,
            present: {
              ...backNext.present,
              dataForm: {
                ...dataForm,
                layout: dataNew,
                color: dataNewColor,
                colorText: dataNewColorText,

                pad: dataNewPad,
              },
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
            colorText: dataNewColorText,

            pad: dataNewPad,
          });
          setBackNext({
            back: backNext,
            present: {
              ...backNext.present,
              dataForm: {
                ...dataForm,
                layout: dataNew,
                color: dataNewColor,
                colorText: dataNewColorText,

                pad: dataNewPad,
              },
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
            colorText: dataNewColorText,

            pad: dataNewPad,
          });
          setBackNext({
            back: backNext,
            present: {
              ...backNext.present,
              dataForm: {
                ...dataForm,
                layout: dataNew,
                color: dataNewColor,
                colorText: dataNewColorText,

                pad: dataNewPad,
              },
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
            colorText: dataNewColorText,

            pad: dataNewPad,
          });
          setBackNext({
            back: backNext,
            present: {
              ...backNext.present,
              dataForm: {
                ...dataForm,
                layout: dataNew,
                color: dataNewColor,
                colorText: dataNewColorText,

                pad: dataNewPad,
              },
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
            colorText: dataNewColorText,
            pad: dataNewPad,
          });
          setBackNext({
            back: backNext,
            present: {
              ...backNext.present,
              dataForm: {
                ...dataForm,
                layout: dataNew,
                color: dataNewColor,
                colorText: dataNewColorText,

                pad: dataNewPad,
              },
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
            colorText: dataNewColorText,
            pad: dataNewPad,
          });
          setBackNext({
            back: backNext,
            present: {
              ...backNext.present,
              dataForm: {
                ...dataForm,
                layout: dataNew,
                color: dataNewColor,
                colorText: dataNewColorText,
                pad: dataNewPad,
              },
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
            colorText: dataNewColorText,
            pad: dataNewPad,
          });
          setBackNext({
            back: backNext,
            present: {
              ...backNext.present,
              dataForm: {
                ...dataForm,
                layout: dataNew,
                color: dataNewColor,
                colorText: dataNewColorText,
                pad: dataNewPad,
              },
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
            colorText: dataNewColorText,
            pad: dataNewPad,
          });
          setBackNext({
            back: backNext,
            present: {
              ...backNext.present,
              dataForm: {
                ...dataForm,
                layout: dataNew,
                color: dataNewColor,
                colorText: dataNewColorText,
                pad: dataNewPad,
              },
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
            colorText: dataNewColorText,
            pad: dataNewPad,
          });
          setBackNext({
            back: backNext,
            present: {
              ...backNext.present,
              dataForm: {
                ...dataForm,
                layout: dataNew,
                color: dataNewColor,
                colorText: dataNewColorText,
                pad: dataNewPad,
              },
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
            colorText: dataNewColorText,
            pad: dataNewPad,
          });
          setBackNext({
            back: backNext,
            present: {
              ...backNext.present,
              dataForm: {
                ...dataForm,
                layout: dataNew,
                color: dataNewColor,
                colorText: dataNewColorText,
                pad: dataNewPad,
              },
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
            colorText: dataNewColorText,
            pad: dataNewPad,
          });
          setBackNext({
            back: backNext,
            present: {
              ...backNext.present,
              dataForm: {
                ...dataForm,
                layout: dataNew,
                color: dataNewColor,
                colorText: dataNewColorText,
                pad: dataNewPad,
              },
            },
            next: {},
          });
          break;
        default:
          dataNew.splice(index, 1, "25,25,25,25");
          setDataForm({
            ...dataForm,
            layout: dataNew,
            colorText: dataNewColorText,
            color: dataNewColor,
            pad: dataNewPad,
          });
          setBackNext({
            back: backNext,
            present: {
              ...backNext.present,
              dataForm: {
                ...dataForm,
                layout: dataNew,
                color: dataNewColor,
                colorText: dataNewColorText,
                pad: dataNewPad,
              },
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
      // //console.log(dataNew, dataLoad, countRow, sizeCol);
      setDataLoad(dataNew);
      setBackNext({
        back: backNext,
        present: { ...backNext.present, dataLoad: dataNew },
        next: {},
      });
    };
    if (type === 0) {
      changeSize(0);
    }
    if (type > 0 && type < 8) {
      if (dataColorOld.length === 1) {
        dataColorOld = [...dataColorOld, "#"];
        dataColorTextOld = [...dataColorTextOld, "#000000"];
        dataPadOld = [...dataPadOld, "1"];
      }
      if (dataColorOld.length === 3) {
        dataColorOld.splice(2, 1);
        dataColorTextOld.splice(2, 1);
        dataPadOld.splice(2, 1);
      }
      if (dataColorOld.length === 4) {
        dataColorOld.splice(2, 2);
        dataColorTextOld.splice(2, 2);

        dataPadOld.splice(2, 2);
      }
      changeSize(1);
    }
    if (type > 7 && type < 17) {
      if (dataColorOld.length === 1) {
        dataColorOld = [...dataColorOld, "#"];
        dataColorTextOld = [...dataColorTextOld, "#000000"];
        dataPadOld = [...dataPadOld, "1"];
      }
      if (dataColorOld.length === 2) {
        dataColorOld = [...dataColorOld, "#"];
        dataColorTextOld = [...dataColorTextOld, "#000000"];

        dataPadOld = [...dataPadOld, "1"];
      }
      if (dataColorOld.length === 4) {
        dataColorOld.splice(3, 1);
        dataColorTextOld.splice(3, 1);
        dataPadOld.splice(3, 1);
      }
      changeSize(2);
    }
    if (type === 17) {
      if (dataColorOld.length === 1) {
        dataColorOld = [...dataColorOld, "#", "#", "#"];
        dataColorTextOld = [
          ...dataColorTextOld,
          "#000000",
          "#000000",
          "#000000",
        ];
        dataPadOld = [...dataPadOld, "1", "1", "1"];
      }
      if (dataColorOld.length === 2) {
        dataColorOld = [...dataColorOld, "#", "#"];
        dataColorTextOld = [...dataColorTextOld, "#000000", "#000000"];

        dataPadOld = [...dataPadOld, "1", "1"];
      }
      if (dataColorOld.length === 3) {
        dataColorOld = [...dataColorOld, "#"];
        dataColorTextOld = [...dataColorTextOld, "#000000"];

        dataPadOld = [...dataPadOld, "1"];
      }
    }
    dataColorOld = dataColorOld.join(",");
    dataColorTextOld = dataColorTextOld.join(",");
    dataPadOld = dataPadOld.join(",");

    changeLayout();
  };
  const handleLoadData = async () => {
    const fetchData = async () => {
      const res = (await axiosClient.get(
        `https://backend-hcmute-nestjs.onrender.com/api/v3/cv-extra-information/?cvIndex=${cvIndex}`
      )) as unknown as ILoad;
      const res2 = (await axiosClient.get(
        `https://backend-hcmute-nestjs.onrender.com/api/v3/cv-project/?cvIndex=${cvIndex}`
      )) as unknown as ILoad;
      const res3 = (await axiosClient.get(
        `https://backend-hcmute-nestjs.onrender.com/api/v3/cv-information/?cvIndex=${cvIndex}`
      )) as unknown as ILoad;
      const res4 = (await axiosClient.get(
        `https://backend-hcmute-nestjs.onrender.com/api/v3/cv-layout/?cvIndex=${cvIndex}`
      )) as unknown as ILoad;
      const dataNew = [...res.data, ...res2.data, res3.data];
      // //console.log(res, res2, res3, res4, profile);
      setDataLoad(dataNew);
      setDataForm(res4.data);
      setBackNext({
        back: {},
        present: { template: template, dataForm: res4.data, dataLoad: dataNew },
        next: {},
      });
    };

    fetchData();
  };
  const handleLoadBackData = async (cvNew: any) => {
    const fetchData = async () => {
      const res = (await axiosClient.get(
        `https://backend-hcmute-nestjs.onrender.com/api/v3/cv-extra-information/?cvIndex=${cvIndex}`
      )) as unknown as ILoad;
      const res2 = (await axiosClient.get(
        `https://backend-hcmute-nestjs.onrender.com/api/v3/cv-project/?cvIndex=${cvIndex}`
      )) as unknown as ILoad;
      const res3 = (await axiosClient.get(
        `https://backend-hcmute-nestjs.onrender.com/api/v3/cv-information/?cvIndex=${cvIndex}`
      )) as unknown as ILoad;
      const res4 = (await axiosClient.get(
        `https://backend-hcmute-nestjs.onrender.com/api/v3/cv-layout/?cvIndex=${cvIndex}`
      )) as unknown as ILoad;
      const dataNew = [...res.data, ...res2.data, res3.data];
      //console.log(res, res2, res3, res4, profile, cvNew);
      const templateIDOld = profile?.profilesCvs?.filter((dt: any) => {
        return dt.cvIndex == cvIndex;
      })[0].templateId;
      setDataLoad(
        dataNew.map((dt: any) => {
          return { ...dt, cvIndex: cvNew };
        })
      );
      setTemplateId(templateIDOld.toString());
      setDataForm({ ...res4.data, cvIndex: cvNew });
      setBackNext({
        back: {},
        present: {
          template: templateIDOld.toString(),
          dataForm: { ...res4.data, cvIndex: cvNew },
          dataLoad: dataNew.map((dt: any) => {
            return { ...dt, cvIndex: cvNew };
          }),
        },
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
    setBackNext({
      back: backNext,
      present: { ...backNext.present, dataLoad: newData },
      next: {},
    });
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
    setBackNext({
      back: backNext,
      present: { ...backNext.present, dataLoad: newData },
      next: {},
    });
    setCheckActive({ ...checkActive, index: checkActive.index + 1 });
  };
  const handleNext = () => {
    if (Object.keys(backNext.next).length !== 0) {
      setDataLoad(backNext.next.present.dataLoad);
      setDataForm(backNext.next.present.dataForm);
      setTemplateId(backNext.next.present.template);

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
      setDataLoad(backNext.back.present.dataLoad);
      setDataForm(backNext.back.present.dataForm);
      setTemplateId(backNext.back.present.template);
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
              //console.log(dtt);
              return { ...dtt, padIndex: dtt.padIndex ? 0 : 1 };
            }
            return dtt;
          });
          return { ...dt, [propertyName]: newDataIndex };
        }
        return dt;
      });
      setDataLoad(newDataLoad);
      setBackNext({
        back: backNext,
        present: { ...backNext.present, dataLoad: newDataLoad },
        next: {},
      });
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
      //console.log(newDataLoad);
      setDataLoad(newDataLoad);
      setBackNext({
        back: backNext,
        present: { ...backNext.present, dataLoad: newDataLoad },
        next: {},
      });
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
      setBackNext({
        back: backNext,
        present: {
          ...backNext.present,
          dataForm: { ...dataForm, pad: dataNew },
        },
        next: {},
      });
      return;
    }
    const dataNew = dataForm?.padPart.map((dt: any, iPart: any) => {
      if (iPart === checkActive.part) {
        return dt ? 0 : 1;
      }
      return dt;
    });
    setDataForm({ ...dataForm, padPart: dataNew });
    setBackNext({
      back: backNext,
      present: {
        ...backNext.present,
        dataForm: { ...dataForm, padPart: dataNew },
      },
      next: {},
    });
  };
  const handleRemove = () => {
    handleResetActive();
    if (dataGhostDrag.part !== 100) {
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
        setBackNext({
          back: backNext,
          present: {
            ...backNext.present,
            dataLoad: dataNewLoad,
          },
          next: {},
        });
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
        //console.log(removeDataFil);
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
        setBackNext({
          back: backNext,
          present: {
            ...backNext.present,
            dataLoad: newDataLoad,
          },
          next: {},
        });
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
        //console.log(newDataColor, newDataLoad, newDataLayout, newDataPad);
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
      const newDataColorText = dataForm.colorText.filter(
        (dt: any, iPart: any) => {
          return !(iPart === checkActive.part);
        }
      );
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
        colorText: newDataColorText,
        layout: newDataLayout,
        pad: newDataPad,
      });
      setBackNext({
        back: backNext,
        present: {
          dataForm: {
            ...dataForm,
            color: newDataColor,
            colorText: newDataColorText,
            layout: newDataLayout,
            pad: newDataPad,
          },
          dataLoad: newDataLoad,
        },
        next: {},
      });
    }
  };

  const handleCheckPadCol = () => {
    const iCol = dataRequest[checkActive.part]?.pad[checkActive.col];
    return iCol;
  };
  // const handleBtnSave = async (file: any) => {
  //   if (cvIndex === cvID) {
  //     setContentAlert({
  //       title: "Bạn muốn lưu lại",
  //       confirmAgain: "Bạn có chắc muốn cập nhật",
  //     });
  //   }

  //   const element = document.querySelector(".canvas-pdf");
  //   const fileName = `${nameCv}.jpg`; // Tên tệp mới
  //   captureElementAsFile(element, fileName)
  //     .then((imageFile: any) => {
  //       const fetchData = async () => {
  //         handlePersistGateLoaded("Vui lòng chờ AI đang quét");
  //         const blobPdf = await convertImgtoPdf(imageFile);
  //         // console.log(blobPdf);
  //         // saveAs(blobPdf);
  //         const newData = dataLoad.map((dt: any) => {
  //           const { id, ...rest } = dt;
  //           return rest;
  //         });

  //         const result = await cvsApi.totalPosts(newData, dataForm, cvID);
  //         if (result) {
  //           const resultCV = await cvsApi.postCvIndex(
  //             nameCv,
  //             cvID,
  //             templateId,
  //             blobPdf,
  //             imageFile,
  //             1
  //           );
  //           const dataAI = await cvsApi.postCV(
  //             newData,
  //             cvID,
  //             profile?.accountId
  //           );
  //           if (cvID === cvIndex) {
  //             if (resultCV && dataAI) {
  //               // downloadPDF();
  //               handleOffTabLoading();

  //               hdSuccess("Đã cập nhật thành cập");
  //               imageFile;
  //             } else {
  //               handleOffTabLoading();
  //               hdError("Cập nhật thất bại");
  //             }
  //           } else {
  //             if (resultCV && dataAI) {
  //               // downloadPDF();
  //               handleOffTabLoading();
  //               hdSuccess("Đã tạo CV thành công");
  //             } else {
  //               handleOffTabLoading();

  //               hdError("Tạo CV thất bại");
  //             }
  //           }
  //         }
  //       };
  //       if (cvIndex === cvID) {
  //         updateHandleAlert(fetchData);
  //       } else {
  //         fetchData();
  //       }
  //     })
  //     .catch((error: any) => {
  //       console.error(error);
  //     });
  // };

  const handleNewPDFSave = async () => {
    const opt = {
      margin: 0,
      filename: "document.pdf",
      image: { type: "jpeg", quality: 0.98 },
      html2canvas: { scale: 1 },
      jsPDF: { unit: "in", format: "letter", orientation: "portrait" },
    };
    const element = document.querySelector(".canvas-pdf");
    const pdf = await html2pdf()
      .from(element)
      .set(opt)
      .outputPdf("blob", `${nameCv}.pdf`);
    await html2pdf()
      .from(element)
      .set(opt)
      .outputImg("img")
      .then(async (img: any) => {
        const dataImg = await convertBaseToImg(img.src);
        const fetchData = async () => {
          handlePersistGateLoaded("Vui lòng chờ AI đang quét");
          const newData = dataLoad.map((dt: any) => {
            const { id, ...rest } = dt;
            return rest;
          });
          const checkWar = await cvsApi.checkWarCV(newData);
          if (checkWar) {
            const result = await cvsApi.totalPosts(newData, dataForm, cvID);
            if (result) {
              const resultCV = await cvsApi.postCvIndex(
                nameCv,
                cvID,
                templateId,
                pdf,
                dataImg,
                1
              );
              const dataAI = await cvsApi.postCV(
                newData,
                cvID,
                profile?.accountId
              );
              if (cvID === cvIndex) {
                if (resultCV && dataAI) {
                  // downloadPDF();
                  handleOffTabLoading();
                  saveAs(pdf, `${nameCv}.pdf`);
                  hdSuccess("Đã cập nhật thành công");
                } else {
                  handleOffTabLoading();
                  hdError("Cập nhật thất bại");
                }
              } else {
                if (resultCV && dataAI) {
                  // downloadPDF();
                  handleOffTabLoading();
                  saveAs(pdf, `${nameCv}.pdf`);
                  hdSuccess("Đã tạo CV thành công");
                } else {
                  handleOffTabLoading();

                  hdError("Tạo CV thất bại");
                }
              }
            }
          } else {
            hdError(
              "Vui lòng kiểm tra lại thông tin vì có từ không đúng chuẩn mực"
            );
            handleOffTabLoading();
          }
        };
        if (cvIndex === cvID) {
          setContentAlert({
            title: "Bạn muốn lưu lại",
            confirmAgain: "Bạn có chắc muốn cập nhật",
          });
          updateHandleAlert(fetchData);
        } else {
          fetchData();
        }
      });
  };
  const handleNewPDF = async () => {
    const opt = {
      margin: 0,
      filename: "document.pdf",
      image: { type: "jpeg", quality: 0.98 },
      html2canvas: { scale: 1 },
      jsPDF: { unit: "in", format: "letter", orientation: "portrait" },
    };
    const element = document.querySelector(".canvas-pdf");
    const pdf = await html2pdf()
      .from(element)
      .set(opt)
      .outputPdf("blob", `${nameCv}.pdf`);
    await html2pdf()
      .from(element)
      .set(opt)
      .outputImg("img")
      .then(async (img: any) => {
        const dataImg = await convertBaseToImg(img.src);
        const fetchData = async () => {
          handlePersistGateLoaded("Vui lòng chờ AI đang quét");
          const newData = dataLoad.map((dt: any) => {
            const { id, ...rest } = dt;
            return rest;
          });
          const checkWar = await cvsApi.checkWarCV(newData);
          if (checkWar) {
            const result = await cvsApi.totalPosts(newData, dataForm, cvID);
            if (result) {
              const resultCV = await cvsApi.postCvIndex(
                nameCv,
                cvID,
                templateId,
                pdf,
                dataImg,
                1
              );
              const dataAI = await cvsApi.postCV(
                newData,
                cvID,
                profile?.accountId
              );
              if (cvID === cvIndex) {
                if (resultCV && dataAI) {
                  // downloadPDF();
                  handleOffTabLoading();
                  hdSuccess("Đã cập nhật thành cập");
                } else {
                  handleOffTabLoading();
                  hdError("Cập nhật thất bại");
                }
              } else {
                if (resultCV && dataAI) {
                  // downloadPDF();
                  handleOffTabLoading();
                  hdSuccess("Đã tạo CV thành công");
                } else {
                  handleOffTabLoading();
                  hdError("Tạo CV thất bại");
                }
              }
            }
          } else {
            hdError(
              "Vui lòng kiểm tra lại thông tin vì có từ không đúng chuẩn mực"
            );
            handleOffTabLoading();
          }
        };
        if (cvIndex === cvID) {
          setContentAlert({
            title: "Bạn muốn lưu lại",
            confirmAgain: "Bạn có chắc muốn cập nhật",
          });
          updateHandleAlert(fetchData);
        } else {
          fetchData();
        }
      });
  };
  const handleChangeUploadDocs = (cvNew: any) => {
    const data: any = getCookie("cvsDocs") || {};
    localStorage.removeItem("cvsDocs");
    let row = -1;
    const cvIndexDocs = cvNew;
    const readDataDoc = Object.keys(data).map((dt: any) => {
      row += 1;
      if (dt === "info_project") {
        return {
          col: 0,
          cvIndex: cvIndexDocs,
          padIndex: 1,
          part: 0,
          row: row,
          type: dt,
          moreCvProjects: data[dt],
        };
      } else if (dt === "info_person") {
        return {
          col: 0,
          cvIndex: cvIndexDocs,
          padIndex: 1,
          part: 0,
          row: row,
          type: dt,
          ...data[dt],
        };
      } else {
        return {
          col: 0,
          cvIndex: cvIndexDocs,
          padIndex: 1,
          part: 0,
          row: row,
          type: dt,
          moreCvExtraInformations: data[dt],
        };
      }
    });

    return readDataDoc;
  };
  const handleAddPartPage = () => {
    setDataForm({
      ...dataForm,
      color: [...dataForm.color, "#"],
      colorText: [...dataForm.colorText, "#000000"],
      layout: [...dataForm.layout, "100"],
      pad: [...dataForm.pad, "1"],
      padPart: [...dataForm.padPart, 1],
    });
    setBackNext({
      back: backNext,
      present: {
        ...backNext.present,
        dataForm: {
          ...dataForm,
          color: [...dataForm.color, "#"],
          colorText: [...dataForm.colorText, "#000000"],
          layout: [...dataForm.layout, "100"],
          pad: [...dataForm.pad, "1"],
          padPart: [...dataForm.padPart, 1],
        },
      },
      next: {},
    });
  };
  const handleAddType = (type: any) => {
    setPositionAddType(undefined);
    const maxRow =
      dataRequest[positionAddType.part].data[positionAddType.col].length;
    switch (type) {
      case "info_person":
        setDataLoad([
          ...dataLoad,
          {
            ...formType[0],
            type: type,
            part: positionAddType.part,
            col: positionAddType.col,
            row: maxRow,
          },
        ]);
        setBackNext({
          back: backNext,
          present: {
            ...backNext.present,
            dataLoad: [
              ...dataLoad,
              {
                ...formType[0],
                type: type,
                part: positionAddType.part,
                col: positionAddType.col,
                row: maxRow,
              },
            ],
          },
          next: {},
        });
        break;
      case "info_project":
        setDataLoad([
          ...dataLoad,
          {
            ...formType[2],
            type: type,
            part: positionAddType.part,
            col: positionAddType.col,
            row: maxRow,
          },
        ]);
        setBackNext({
          back: backNext,
          present: {
            ...backNext.present,
            dataLoad: [
              ...dataLoad,
              {
                ...formType[2],
                type: type,
                part: positionAddType.part,
                col: positionAddType.col,
                row: maxRow,
              },
            ],
          },
          next: {},
        });
        break;
      case "info_study":
      case "info_activate":
      case "info_experience":
        setDataLoad([
          ...dataLoad,
          {
            ...formType[1],
            type: type,
            part: positionAddType.part,
            col: positionAddType.col,
            row: maxRow,
          },
        ]);
        setBackNext({
          back: backNext,
          present: {
            ...backNext.present,
            dataLoad: [
              ...dataLoad,
              {
                ...formType[1],
                type: type,
                part: positionAddType.part,
                col: positionAddType.col,
                row: maxRow,
              },
            ],
          },
          next: {},
        });
        break;
      default:
        setDataLoad([
          ...dataLoad,
          {
            ...formType[3],
            type: type,
            part: positionAddType.part,
            col: positionAddType.col,
            row: maxRow,
          },
        ]);
        setBackNext({
          back: backNext,
          present: {
            ...backNext.present,
            dataLoad: [
              ...dataLoad,
              {
                ...formType[3],
                type: type,
                part: positionAddType.part,
                col: positionAddType.col,
                row: maxRow,
              },
            ],
          },
          next: {},
        });
    }
  };
  const handleChangeTemplate = (templateNew: any) => {
    const dataNew = handleLoadTempData(templateNew);

    const dataNewTemplate = dataNew.data.map((dt: any) => {
      const data = dataLoad.filter((dtt: any) => {
        return dtt.type === dt.type;
      });
      if (data.length > 0) {
        return { ...data[0], part: dt.part, col: dt.col, row: dt.row };
      }
      return dt;
    });
    let infoRemove = "";
    const dataRemove = dataLoad.map((dt: any) => {
      const data = dataNewTemplate.filter((dtt: any) => {
        return dtt.type === dt.type;
      });
      if (data.length === 0) {
        switch (dt.type) {
          case "info_more":
            infoRemove = infoRemove + "|Thông tin thêm";
            break;
          case "info_person":
            infoRemove = infoRemove + "|Thông tin cá nhân";
            break;
          case "info_award":
            infoRemove = infoRemove + "|Giải thưởng";
            break;
          case "info_activate":
            infoRemove = infoRemove + "|Hoạt động";
            break;
          case "info_hobby":
            infoRemove = infoRemove + "|Sở thích";
            break;
          case "info_achivement":
            infoRemove = infoRemove + "|Chứng chỉ";
            break;
          case "info_project":
            infoRemove = infoRemove + "|Dự án";
            break;
          case "info_study":
            infoRemove = infoRemove + "|Học vấn";
            break;
          case "info_experience":
            infoRemove = infoRemove + "|Kinh nghiệm";
            break;
          case "info_skill":
            infoRemove = infoRemove + "|Kỹ năng";
            break;
          case "info_target":
            infoRemove = infoRemove + "|Mục tiêu";
            break;
        }
      }
    });
    const handleUpdateTemplate = () => {
      setTemplateId(templateNew);
      setDataLoad(dataNewTemplate);
      setDataForm({
        ...dataForm,
        layout: dataNew.layout,
        color: dataNew.color,
        pad: dataNew.pad,
        padPart: dataNew.padPart,
        colorText: dataNew.colorText,
        colorTopic: dataNew.colorTopic,
        indexTopic: 0,
      });
      setBackNext({
        back: backNext,
        present: {
          template: templateNew,
          dataForm: {
            ...dataForm,
            layout: dataNew.layout,
            color: dataNew.color,
            pad: dataNew.pad,
            padPart: dataNew.padPart,
            colorText: dataNew.colorText,
            colorTopic: dataNew.colorTopic,
            indexTopic: 0,
          },
          dataLoad: dataNewTemplate,
        },
        next: {},
      });
    };
    if (infoRemove === "") {
      handleUpdateTemplate();
    } else {
      setContentAlert({
        title: `${infoRemove} là các thông tin sẽ bị mất`,
        confirmAgain: `Bạn có chắc muốn chuyển qua template ${
          Number(templateNew) + 1
        }`,
      });
      updateHandleAlert(handleUpdateTemplate);
    }
  };
  const handleUpMobileRow = () => {
    const newDataLoad = dataLoad.map((dt: any) => {
      if (
        dt.part === checkActive.part &&
        dt.col === checkActive.col &&
        checkActive.row === dt.row
      ) {
        return { ...dt, row: dt.row - 1 };
      }
      if (
        dt.part === checkActive.part &&
        dt.col === checkActive.col &&
        checkActive.row - 1 === dt.row
      ) {
        return { ...dt, row: dt.row + 1 };
      }
      return dt;
    });
    setBackNext({
      back: backNext,
      present: { ...backNext.present, dataLoad: newDataLoad },
      next: {},
    });
    setDataLoad(newDataLoad);
    setCheckActive({ ...checkActive, row: checkActive.row - 1 });
  };
  const handleDownMobileRow = () => {
    const newDataLoad = dataLoad.map((dt: any) => {
      if (
        dt.part === checkActive.part &&
        dt.col === checkActive.col &&
        checkActive.row === dt.row
      ) {
        return { ...dt, row: dt.row + 1 };
      }
      if (
        dt.part === checkActive.part &&
        dt.col === checkActive.col &&
        checkActive.row + 1 === dt.row
      ) {
        return { ...dt, row: dt.row - 1 };
      }
      return dt;
    });
    setBackNext({
      back: backNext,
      present: { ...backNext.present, dataLoad: newDataLoad },
      next: {},
    });
    setDataLoad(newDataLoad);
    setCheckActive({ ...checkActive, row: checkActive.row + 1 });
  };
  useEffect(() => {
    if (reponsiveMobile < 850) {
      setScaleForm(42);
    }
  }, [reponsiveMobile]);
  useEffect(() => {
    console.log(dataLoad);
  }, [dataLoad]);
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
    if (template === "create-back" && profile) {
      if (handleCheckCvs(cvIndex) === cvIndex) {
        handleLoadBackData(handleCheckCvs("new"));
        // const templateIDOld = profile?.profilesCvs?.filter((dt: any) => {
        //   return dt.cvIndex == cvIndex;
        // })[0].templateId;
        // //console.log(templateIDOld, templateId);
        // setTemplateId(templateIDOld.toString());
      }
    } else {
      if (cvIndex === "upload") {
        const dataNewLoad: any = handleChangeUploadDocs(handleCheckCvs("new"));
        if (dataNewLoad?.length > 0) {
          const dataNewMerch: any = dataNewLoad.filter((dt: any) => {
            if (dt?.type === "info_person") {
              return dt;
            } else {
              if (dt?.type === "info_project") {
                if (dt?.moreCvProjects?.length > 0) {
                  return dt;
                }
              } else {
                if (dt?.moreCvExtraInformations?.length > 0) {
                  return dt;
                }
              }
            }
          });
          const dataNewForm = handleLoadTempData(template);
          const dataMergeLoad = dataNewForm.data.map((dt: any) => {
            const dataFilterLoad = dataNewMerch.filter((dtt: any) => {
              return dt.type === dtt.type;
            })?.[0];
            if (dataFilterLoad && dataFilterLoad.type === dt.type) {
              return {
                ...dataFilterLoad,
                part: dt.part,
                col: dt.col,
                row: dt.row,
              };
            }
            return dt;
          });

          setDataLoad(dataMergeLoad);
          setDataForm({
            layout: dataNewForm.layout,
            color: dataNewForm.color,
            colorText: dataNewForm.colorText,
            pad: dataNewForm.pad,
            padPart: dataNewForm.padPart,
            cvIndex: handleCheckCvs("new"),
            colorTopic: dataNewForm.colorTopic,
            indexTopic: 0,
          });
          setBackNext({
            back: {},
            present: {
              template: template,
              dataForm: {
                layout: dataNewForm.layout,
                color: dataNewForm.color,
                pad: dataNewForm.pad,
                padPart: dataNewForm.padPart,
                cvIndex: handleCheckCvs("new"),
                colorTopic: dataNewForm.colorTopic,
                indexTopic: 0,
              },
              dataLoad: dataMergeLoad.map((dt: any) => {
                return { ...dt, cvIndex: handleCheckCvs("new") };
              }),
            },
            next: {},
          });
          setTemplateId(template);
        }
      } else {
        // console.log("Vao ne");
        if (Object.keys(profile).length !== 0) {
          if (handleCheckCvs(cvIndex) === cvIndex) {
            handleLoadData();
          } else {
            const dataNew = handleLoadTempData(templateId);
            setDataForm({
              layout: dataNew.layout,
              color: dataNew.color,
              pad: dataNew.pad,
              colorText: dataNew.colorText,
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
            const dataNewLoad = newDataLoad.map((dt: any) => {
              if (dt.type === "info_person") {
                return {
                  ...dt,
                  cvIndex: handleCheckCvs("new"),
                  phone: profile?.phone,
                  email: profile?.email,
                  name: profile?.name,
                  address: profile?.addressText?.fullName,
                  link: profile?.facebook,
                  intent: handleConvertToDate(profile?.birthday).toString(),
                };
              }
              return { ...dt, cvIndex: handleCheckCvs("new") };
            });
            setDataLoad(dataNewLoad);
            setBackNext({
              back: {},
              present: {
                dataForm: {
                  layout: dataNew.layout,
                  color: dataNew.color,
                  colorText: dataNew.colorText,

                  pad: dataNew.pad,
                  padPart: dataNew.padPart,
                  cvIndex: handleCheckCvs("new"),
                  colorTopic: dataNew.colorTopic,
                  indexTopic: 0,
                },
                dataLoad: dataNewLoad,
                template: template,
              },
              next: {},
            });
          }
        }
      }
    }
  }, [cvIndex, template, profile]);

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
        // //console.log(newDataaa);
        dataa.push(dataaa);
      });
      return {
        layout: dt.split(",").map(Number),
        color: dataForm.color[index].split(","),
        colorText: dataForm.colorText[index].split(","),
        padPart: dataForm.padPart?.[index],
        pad: dataForm.pad?.[index]?.split(",").map((padItem: any) => {
          return Number(padItem);
        }),
        data: dataa,
      };
    });
    //console.log(data);
    setDataRequest(data);
  }, [dataLoad, dataForm]);
  useEffect(() => {
    const nameCVS = profile?.profilesCvs?.filter((dt: any) => {
      return dt.cvIndex == cvID;
    })?.[0]?.name;
    setNameCv(nameCVS ?? "Tiêu đề CV");
  }, [profile, cvID]);
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
          {index != 0 && (
            <div
              className="w-8 h-8 flex justify-center items-center  text-white border-blue-700 border-[1px] transition-all  bg-blue-700 text-base rounded-md hover:bg-blue-600 cursor-pointer shadow-[rgba(17,_17,_26,_0.1)_0px_0px_16px] font-bold"
              onMouseDown={() => {
                handleChangePositionV2(true);
              }}
            >
              <FaArrowUp />
            </div>
          )}
          {dataRequest.length != 1 && dataRequest.length - 1 != index && (
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
              if (checkActive.col !== -1)
                //console.log("22");
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
              if (checkActive.row !== -1)
                //console.log("23");
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
              if (checkActive.index !== -1)
                //console.log("24");
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
        <div
          className="w-8 h-8 text-blue-500 font-bold text-lg flex justify-center items-center rounded-md bg-black border-blue-500 border-[1px] hover:bg-blue-500 hover:text-white cursor-pointer"
          onMouseDown={() => {
            setPositionAddType({ part: index, col: indexItem });
          }}
        >
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
        {item > 0 && (
          <button
            className={`p-2 rounded-md   text-white border-blue-700 border-[1px] transition-all  bg-blue-700 text-base hover:bg-blue-600 `}
            onMouseDown={(e: any) => {
              handleUpMobileRow();
              // blurSave.current.click();
            }}
          >
            <FaArrowUp />
          </button>
        )}
        {dataRequest?.[index]?.data?.[indexItem]?.length - 1 > item && (
          <button
            className={`p-2 rounded-md   text-white border-blue-700 border-[1px] transition-all  bg-blue-700 text-base hover:bg-blue-600 `}
            onMouseDown={(e: any) => {
              handleDownMobileRow();
              // blurSave.current.click();
            }}
          >
            <FaArrowDown />
          </button>
        )}

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
          {maxData?.length > 1 && (
            <div
              className="w-max p-2 h-8 flex gap-x-2 justify-center items-center bg-black text-red-500 border-red-700 border-[1px] transition-all hover:text-white hover:bg-red-700 text-base rounded-md cursor-pointer shadow-[rgba(17,_17,_26,_0.1)_0px_0px_16px] font-bold"
              onMouseDown={() => {
                setTabAlert(true);
                updateHandleAlert(handleRemove);
              }}
            >
              <FaRegTrashCan />
            </div>
          )}
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
      <>
        {handleCheckPass({ part: checkActive.part }) && checkLayout && (
          <Modal
            open={handleCheckPass({ part: checkActive.part }) && checkLayout}
          >
            <div
              className={`fixed inset-0 bg-black/50 flex justify-center items-center z-[80] ${
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
                className="w-full h-full max-w-3xl max-h-72 bg-white rounded-lg p-4 gap-y-4 flex flex-col"
                onMouseUp={(e: any) => {
                  e.stopPropagation();
                }}
              >
                <p className="font-bold text-xl">Đổi bố cục theo tỉ lệ</p>
                <p className="text-xs text-red-500">
                  *Click để thay đổi kích thước
                </p>
                <div className="flex flex-wrap gap-4 flex-1 overflow-y-scroll">
                  {listRatio.map((dt: any, index: any) => {
                    return (
                      <>
                        <div
                          className="p-2 rounded-xl bg-gray-200 cursor-pointer flex flex-col justify-center items-center"
                          onMouseUp={() => {
                            handleChangeLayout(checkActive.part, index);
                            setCheckLayout(false);
                          }}
                          key={index}
                        >
                          <p className="text-xs font-semibold mb-2">
                            {dt.replaceAll(/,/g, " x ")}
                          </p>
                          <div className="h-12 w-52 flex gap-1">
                            {dt.split(",").map((dtt: any, i: any) => {
                              return (
                                <>
                                  <div
                                    className="h-full bg-blue-200 rounded-xl"
                                    style={{ width: `${dtt}%` }}
                                    key={i}
                                  ></div>
                                </>
                              );
                            })}
                          </div>
                        </div>
                      </>
                    );
                  })}
                </div>
                <div className="w-full flex justify-end gap-2">
                  <button
                    className="px-2 py-1 rounded-lg bg-slate-200 hover:bg-slate-100 font-bold text-gray-300"
                    onMouseUp={() => {
                      setCheckLayout(false);
                    }}
                  >
                    Quay lại
                  </button>
                </div>
              </div>
            </div>
          </Modal>
        )}
      </>
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
    setNameCv,
    nameCv,
    setTemplateId,
    BGChooseRow,
    // handleBtnSave,
    BGToolType,
    setFilePdf,
    cvID,
    handleAddPartPage,
    setPositionAddType,
    handleAddType,
    positionAddType,
    handleChangeTemplate,
    handleChangeColorText,
    listRatio,
    // handleBtnSavePDF,
    setScaleForm,
    scaleForm,
    handleNewPDF,
    handleNewPDFSave,
  };
};

export default LibCvV2;
