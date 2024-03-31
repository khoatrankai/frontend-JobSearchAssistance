/* eslint-disable react/jsx-key */
import React, { useState } from "react";
import Passion from "./Passion/Passion";
import Image from "next/image";

type Props = {
  id: any;
  funcLibrary: any;
};

const Sample = (props: Props) => {
  const { id, funcLibrary } = props;

  return (
    <>
      <Passion funcLibrary={funcLibrary} id={id} />
    </>
  );
};

export default Sample;
