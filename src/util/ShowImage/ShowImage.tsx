import { useSrollContext } from "@/context/AppProvider";
import Image from "next/image";
import React, { useState } from "react";
import { FaTrashCan } from "react-icons/fa6";

type Props = {};

const ShowImage = (props: Props) => {
  const { soureImageShow, setSoureImage } = useSrollContext();
  const [tabScale, setTabScale] = useState<boolean>(false);
  return (
    <div
      className={`bg-black/80 flex justify-center items-center fixed inset-0 p-8 z-50 overflow-scroll ${
        soureImageShow ? "" : "hidden"
      }`}
      onClick={() => {
        setSoureImage(null);
        setTabScale(false);
      }}
    >
      <img
        src={soureImageShow ?? ""}
        alt=""
        className={`h-full transition-all duration-500 ${
          tabScale ? "scale-150" : ""
        }`}
        onClick={(e: any) => {
          e.stopPropagation();
        }}
      />
      <div className="absolute top-0 right-0 text-white gap-2 flex">
        <button
          onClick={(e: any) => {
            e.stopPropagation();

            setTabScale(!tabScale);
          }}
        >
          Zoom
        </button>
        <button
          onClick={(e: any) => {
            e.stopPropagation();
            setSoureImage(null);
            setTabScale(false);
          }}
        >
          Tắt
        </button>
      </div>
    </div>
  );
};

export default ShowImage;
