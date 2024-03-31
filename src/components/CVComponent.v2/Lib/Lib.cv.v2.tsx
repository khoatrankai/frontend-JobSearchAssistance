"use client";
import { ColorPicker } from "antd";
import React, { useEffect, useState } from "react";
import { FaArrowDown, FaExchangeAlt } from "react-icons/fa";
import { FaRegTrashCan } from "react-icons/fa6";
import { FaArrowsAlt } from "react-icons/fa";
import { useSelector } from "react-redux";
import { IoMdAdd } from "react-icons/io";
import { FaArrowUp } from "react-icons/fa";

import axiosClient from "@/configs/axiosClient";

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
  const [dataForm, setDataForm] = useState<any>({
    cvIndex: 1,
    layout: ["33.33,66.67", "25,75", "75,25"],
    color: ["#,#", "#,#", "#,#"],
  });

  const [dataGhostDrag, setDataGhostDrag] = useState<any>({
    part: -1,
    col: -1,
    row: -1,
  });
  const [listDataForm, setListDataForm] = useState<any>([
    {
      cvIndex: 0,
      layout: ["100", "100"],
      color: ["#04A08C", "#"],
    },
    {
      cvIndex: 0,
      layout: ["100"],
      color: ["#"],
    },
    {
      cvIndex: 0,
      layout: ["66.67,33.33"],
      color: ["#,#F2FBFD"],
    },
    {
      cvIndex: 0,
      layout: ["33.33,66.67"],
      color: ["#F2FBFD,#"],
    },
    {
      cvIndex: 0,
      layout: ["100", "66.67,33.33"],
      color: ["#", "#,#F2FBFD"],
    },
    {
      cvIndex: 0,
      layout: ["33.33,33.34,33.33"],
      color: ["#,#,#"],
    },
  ]);

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
        const newData = dataLoad.map((dt: any) => {
          if (dt.part === part && dt.col === col && dt.row === row) {
            return { ...dt, [type]: dataNew };
          }
          return dt;
        });
        setDataLoad(newData);
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
    }
  };
  const handleTimes = (data: any) => {
    const dataTime = data?.time?.split("-");
    return dataTime;
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
  const [checkActive, setCheckActive] = useState<any>({
    row: -1,
    col: -1,
    part: -1,
    index: -1,
  });
  const [dataLoad, setDataLoad] = useState<any>([
    {
      id: 78,
      email: "Test",
      name: "Test",
      phone: "Test",
      address: "Test",
      intent: "Test",
      type: "info_person",
      avatar: null,
      link: "Test",
      row: 0,
      part: 0,
      col: 0,
      cvIndex: 0,
      moreCvInformations: [
        {
          content: "Hoc",
        },
      ],
    },
    {
      type: "info_activate",
      row: 0,
      col: 0,
      cvIndex: 0,
      part: 1,
      moreCvExtraInformations: [
        {
          position: "Hoc",
          time: "20-36",
          company: "Test",
          description: "Test",
          index: 0,
        },
      ],
    },
    {
      type: "info_hobby",
      row: 0,
      col: 1,
      cvIndex: 0,
      part: 0,
      moreCvExtraInformations: [
        {
          position: "Test",
          time: "20-36",
          company: "Test",
          description: "Test",
          index: 0,
        },
      ],
    },
    {
      type: "info_achivement",
      row: 0,
      col: 1,
      cvIndex: 0,
      part: 1,
      moreCvExtraInformations: [
        {
          position: "Test",
          time: "20-36",
          company: "Test",
          description: "Test",
          index: 0,
        },
      ],
    },
    {
      type: "info_project",
      row: 1,
      part: 0,
      col: 1,
      cvIndex: 0,
      moreCvProjects: [
        {
          time: "20-36",
          link: "Test",
          participant: "Test",
          position: "Test",
          functionality: "Test",
          technology: "Test",
          index: 0,
        },
      ],
    },
  ]);
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
      cvIndex: 0,
      moreCvInformations: [
        {
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
      moreCvExtraInformations: [
        {
          position: "",
          time: "20-36",
          company: "",
          description: "",
          index: 0,
        },
      ],
    },
    {
      type: "Project Title",
      row: 0,
      part: 0,
      col: 0,
      cvIndex: 0,
      moreCvProjects: [
        {
          time: "20-36",
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
      moreCvExtraInformations: [
        {
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
      content: "",
    },
    {
      position: "",
      time: "-",
      company: "",
      description: "",
      index: 0,
    },
    {
      time: "-",
      link: "",
      participant: "",
      position: "",
      functionality: "",
      technology: "",
      index: 0,
    },
  ]);
  const [checkLayout, setCheckLayout] = useState<boolean>(false);
  const [templateId, setTemplateId] = useState<any>();
  const [dataRequest, setDataRequest] = useState<any>();
  const [cvID, setCvID] = useState<any>();
  const handleCreateGhost = (e: any, data: any) => {
    let divGhost = document.createElement("div");
    divGhost.className =
      "p-2 bg-green-700 rounded-xl fixed pointer-events-none ghost-title cursor-pointer text-white z-50";
    divGhost.textContent = data.name;
    document.body.appendChild(divGhost);
  };
  const [listDataLoad, setListDataLoad] = useState<any>([
    [
      {
        ...formType[0],
        part: 0,
        col: 0,
        row: 0,
        type: "info_person",
      },
    ],
  ]);
  useEffect(() => {
    console.log(checkActive);
  }, [checkActive]);
  const handleChangeColor = (color: any, part: any, col: any) => {
    let arrayColor = dataRequest[part].color.slice();
    arrayColor[col] = "#" + color;
    const dataColor = arrayColor.join(",");
    const dataNew = dataForm.color.slice();
    dataNew[part] = dataColor;
    setDataForm({ ...dataForm, color: dataNew });
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
  const handleChangeActive = ({
    part = -1,
    col = -1,
    row = -1,
    index = -1,
  }) => {
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

    const changeLayout = () => {
      let dataNew = dataForm.layout.slice();
      let dataNewColor = dataForm.color.slice();
      dataNewColor.splice(index, 1, dataColorOld);
      switch (type) {
        case 0:
          dataNew.splice(index, 1, "100");
          setDataForm({ ...dataForm, layout: dataNew, color: dataNewColor });
          break;
        case 1:
          dataNew.splice(index, 1, "50,50");
          setDataForm({ ...dataForm, layout: dataNew, color: dataNewColor });
          break;
        case 2:
          dataNew.splice(index, 1, "66.67,33.33");
          setDataForm({ ...dataForm, layout: dataNew, color: dataNewColor });
          break;
        case 3:
          dataNew.splice(index, 1, "33.33,66.67");
          setDataForm({ ...dataForm, layout: dataNew, color: dataNewColor });
          break;
        case 4:
          dataNew.splice(index, 1, "75,25");
          setDataForm({ ...dataForm, layout: dataNew, color: dataNewColor });
          break;
        case 5:
          dataNew.splice(index, 1, "25,75");
          setDataForm({ ...dataForm, layout: dataNew, color: dataNewColor });
          break;
        case 6:
          dataNew.splice(index, 1, "58.33,41.67");
          setDataForm({ ...dataForm, layout: dataNew, color: dataNewColor });
          break;
        case 7:
          dataNew.splice(index, 1, "41.67,58.33");
          setDataForm({ ...dataForm, layout: dataNew, color: dataNewColor });
          break;
        case 8:
          dataNew.splice(index, 1, "33.33,33.34,33.33");
          setDataForm({ ...dataForm, layout: dataNew, color: dataNewColor });
          break;
        case 9:
          dataNew.splice(index, 1, "25,50,25");
          setDataForm({ ...dataForm, layout: dataNew, color: dataNewColor });
          break;
        case 10:
          dataNew.splice(index, 1, "25,25,50");
          setDataForm({
            ...dataForm,
            layout: dataNew,
            color: dataNewColor,
          });
          break;
        case 11:
          dataNew.splice(index, 1, "50,25,25");
          setDataForm({ ...dataForm, layout: dataNew, color: dataNewColor });
          break;
        case 12:
          dataNew.splice(index, 1, "25,33.33,41.67");
          setDataForm({ ...dataForm, layout: dataNew, color: dataNewColor });
          break;
        case 13:
          dataNew.splice(index, 1, "33.33,25,41.67");
          setDataForm({ ...dataForm, layout: dataNew, color: dataNewColor });
          break;
        case 14:
          dataNew.splice(index, 1, "41.67,33.33,25");
          setDataForm({ ...dataForm, layout: dataNew, color: dataNewColor });
          break;
        case 15:
          dataNew.splice(index, 1, "25,41.67,33.33");
          setDataForm({ ...dataForm, layout: dataNew, color: dataNewColor });
          break;
        case 16:
          dataNew.splice(index, 1, "33.33,41.67,25");
          setDataForm({ ...dataForm, layout: dataNew, color: dataNewColor });
          break;
        default:
          dataNew.splice(index, 1, "25,25,25,25");
          setDataForm({ ...dataForm, layout: dataNew, color: dataNewColor });
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
      }
      if (dataColorOld.length === 3) {
        dataColorOld.splice(2, 1);
      }
      if (dataColorOld.length === 4) {
        dataColorOld.splice(2, 2);
      }
      changeSize(1);
    }
    if (type > 7 && type < 17) {
      if (dataColorOld.length === 1) {
        dataColorOld = [...dataColorOld, "#"];
      }
      if (dataColorOld.length === 2) {
        dataColorOld = [...dataColorOld, "#"];
      }
      if (dataColorOld.length === 4) {
        dataColorOld.splice(3, 1);
      }
      changeSize(2);
    }
    if (type === 17) {
      if (dataColorOld.length === 1) {
        dataColorOld = [...dataColorOld, "#", "#", "#"];
      }
      if (dataColorOld.length === 2) {
        dataColorOld = [...dataColorOld, "#", "#"];
      }
      if (dataColorOld.length === 3) {
        dataColorOld = [...dataColorOld, "#"];
      }
    }
    dataColorOld = dataColorOld.join(",");
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
      setDataLoad(dataNew);
      setDataForm(res4.data);
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
  useEffect(() => {
    console.log(dataLoad, dataRequest);
  }, [dataLoad, dataRequest]);
  useEffect(() => {
    if (profile) {
      if (cvIndex) {
        handleLoadData();

        const dataCvs = profile.profilesCvs?.filter((dt: any) => {
          return +dt.cvIndex === +cvIndex;
        });
        if (dataCvs?.length > 0) {
          setTemplateId(dataCvs[0].templateId);
        }
      } else {
        if (profile.profilesCvs?.length > 0) {
          const dataCvID = profile.profilesCvs?.reduce(
            (dt: any, current: any) => {
              if (current.cvIndex > dt?.cvIndex) {
                return current;
              }
              return dt;
            }
          ).cvIndex;
          setCvID(dataCvID + 1);
        }
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
      dt.split(",").map((j: any, i: any) => {
        let dataaa = dataLoad.filter((dtt: any) => {
          return dtt.part === index && dtt.col === i;
        });
        dataaa = dataaa.sort((a: any, b: any) => {
          return a.row - b.row;
        });
        dataa.push(dataaa);
      });

      return {
        layout: dt.split(",").map(Number),
        color: dataForm.color[index].split(","),
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
  const BGToolPart = ({ index }: any) => {
    return (
      <div
        className={`absolute left-full flex flex-col gap-y-2 top-0  ${
          handleCheckPass({ part: index }) ? "z-20" : "hidden"
        }`}
      >
        <div
          className="p-2 !bg-blue-700 !text-white text-base rounded-r-xl cursor-pointer shadow-[rgba(17,_17,_26,_0.1)_0px_0px_16px] font-bold"
          onMouseUp={() => {
            setCheckLayout(true);
          }}
        >
          <FaExchangeAlt />
        </div>
        <div className="p-2 bg-red-700 text-white text-base rounded-r-xl cursor-pointer shadow-[rgba(17,_17,_26,_0.1)_0px_0px_16px] font-bold">
          <FaRegTrashCan />
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
          if (e.currentTarget === e.target) {
            // e.stopPropagation();
            handleChangeActive({
              part: index,
              col: indexItem,
              row: -1,
            });
          }
        }}
        onMouseEnter={(e: any) => {
          if (e.target === e.currentTarget) {
            handleChooseCol(index, indexItem);
          }
        }}
      ></div>
    );
  };
  const BGToolCol = ({ dt, indexItem, index }: any) => {
    return (
      <div
        className={`absolute bottom-full translate-y-4 left-0 flex gap-x-2 z-20  ${
          checkActive.col === indexItem &&
          checkActive.part === index &&
          checkActive.row === -1
            ? ""
            : "hidden"
        }`}
      >
        <ColorPicker
          value={dt.color[indexItem]}
          onChange={(e: any) => {
            handleChangeColor(e.toHex(), index, indexItem);
          }}
        >
          <div className="p-2 !bg-blue-500 !text-white flex rounded-lg gap-x-2 cursor-pointer">
            <p>Màu sắc a</p>
            <button
              className="w-6 h-6 rounded-full"
              style={{
                backgroundColor: dt.color[indexItem],
              }}
            ></button>
          </div>
        </ColorPicker>
      </div>
    );
  };
  const BGToolRow = ({ item, index, indexItem, dttt }: any) => {
    return (
      <div
        className={`absolute bottom-full left-0 flex gap-x-2 -translate-y-1 ${
          checkActive.row === item &&
          checkActive.part === index &&
          checkActive.col === indexItem &&
          checkActive.index === -1
            ? ""
            : "hidden"
        }`}
      >
        <button
          className={`p-2 rounded-md !text-black !bg-blue-500 ${
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
          className={`p-2 rounded-md !text-black !bg-green-500 ${
            dataGhostDrag.part !== -1 && "hidden"
          }`}
          onMouseDown={(e: any) => {
            e.preventDefault();
            handleAddMore(index, indexItem, item);
          }}
        >
          <IoMdAdd />
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
        className={`absolute bottom-full left-0 flex gap-x-2 z-20 -translate-y-1 ${
          checkActive.row === item &&
          checkActive.part === index &&
          checkActive.col === indexItem &&
          checkActive.index === i
            ? ""
            : "hidden"
        }`}
      >
        {checkBlurItem && maxData?.length !== 1 ? (
          <button
            className={`p-2 rounded-md !text-black !bg-blue-500 `}
            onMouseDown={(e: any) => {
              setCheckBlurItem(false);
              // blurSave.current.click();
            }}
          >
            Chỉnh vị trí
          </button>
        ) : (
          <>
            {maxData?.length !== 1 && i !== 0 && (
              <button
                className={`p-2 rounded-md !text-black !bg-green-500 `}
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
                className={`p-2 rounded-md !text-black !bg-green-500 `}
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
          </>
        )}
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
  const BGLayout = ({ index }: any) => {
    return (
      <div
        className={`fixed inset-0 bg-black/20 flex justify-center items-center z-[80] ${
          handleCheckPass({ part: index }) && checkLayout ? "" : "hidden"
        }`}
        onMouseUp={() => {
          setCheckLayout(false);
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
                handleChangeLayout(index, 10);
              }}
            >
              1 | 2 | 1 | 1
            </div>
            <div
              className="p-2 rounded-xl border-2 cursor-pointer"
              onMouseUp={() => {
                handleChangeLayout(index, 5);
              }}
            >
              1 | 1 | 1 | 1
            </div>
            <div
              className="p-2 rounded-xl border-2 cursor-pointer"
              onMouseUp={() => {
                handleChangeLayout(index, 0);
              }}
            >
              1 | 2 | 2 | 1
            </div>
            <div
              className="p-2 rounded-xl border-2 cursor-pointer"
              onMouseUp={() => {
                handleChangeLayout(index, 17);
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
    handleToolMouseMoveTransRow,
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
  };
};

export default LibCvV2;
