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
import ToolBar from "@/components/CVComponent.v2/ToolBar/ToolBar";

type Props = {};

const page = (props: Props) => {
  // CheckPageLogin();

  const { id, template } = useParams();

  const funcLibrary = LibCvV2({ template: template, cvIndex: id });
  const { handleResetActive } = funcLibrary;

  return (
    <>
      <div className="flex flex-col">
        <div className="h-24">
          <ToolBar id={id} funcLibrary={funcLibrary} />
        </div>
        <div
          className="flex items-center flex-1 bg-blue-50"
          onClick={handleResetActive}
        >
          <div className="basis-1/4 h-full z-30">
            <Option id={id} funcLibrary={funcLibrary} />
          </div>
          <div className="flex-1 mb-32">
            <Sample id={id} template={template} funcLibrary={funcLibrary} />
          </div>
        </div>
      </div>
    </>
  );
};

export default page;
