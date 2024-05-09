/* eslint-disable react-hooks/rules-of-hooks */
"use client";
import React, { useEffect, useRef } from "react";
import Sample from "@/components/CVComponent.v2/Sample/Sample";
import { useParams, useRouter } from "next/navigation";
import Option from "@/components/CVComponent.v2/Option/Option";
import LibCvV2 from "@/components/CVComponent.v2/Libs/Lib.cv.v2";
import axios, { Axios } from "axios";
import { useSelector } from "react-redux";
import CheckPageLogin from "@/util/CheckPageLogin";

type Props = {};

const page = (props: Props) => {
  CheckPageLogin();

  const { id } = useParams();
  const funcLibrary = LibCvV2({ cvIndex: id });
  return (
    <>
      <Option id={id} funcLibrary={funcLibrary} />
      <Sample id={id} funcLibrary={funcLibrary} />
    </>
  );
};

export default page;
