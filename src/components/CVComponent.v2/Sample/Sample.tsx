/* eslint-disable react/jsx-key */
import React, { useState } from "react";
import Passion from "./Passion/Passion";
import Image from "next/image";
import Delicate from "./Delicate/Delicate";

type Props = {
  id: any;
  funcLibrary: any;
  template: any;
};

const Sample = (props: Props) => {
  const { id, funcLibrary, template } = props;
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
    templateId,
    setTemplateId,
  } = funcLibrary;
  return (
    <>
      <div
        className={`flex items-center pt-8 justify-center relative  ${
          dataGhostDrag.part !== -1 && "cursor-pointer"
        }`}
      >
        {templateId === "2" && <Passion funcLibrary={funcLibrary} id={id} />}
        {templateId === "1" && <Delicate funcLibrary={funcLibrary} id={id} />}
      </div>
    </>
  );
};

export default Sample;
