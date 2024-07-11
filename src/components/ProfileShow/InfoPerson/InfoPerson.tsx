import React from "react";
import "./InfoPerson.scss";
import Image from "next/image";
import { FaFacebookF, FaPhone } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import TimeStamp from "@/util/TimeStamp/TimeStamp";
type Props = {
  dataProfile?: any;
};

const InfoPerson = ({ dataProfile }: Props) => {
  const { handleConvertToDate } = TimeStamp();
  return (
    <div className="h-screen w-full bg-white flex flex-col px-12 justify-center gap-y-8">
      <div className=" flex flex-col">
        <p className="text-7xl font-extrabold text-blue-700 uppercase">
          {dataProfile?.name}
        </p>
        <div className="flex gap-x-1 text-2xl font-semibold text-gray-600 uppercase">
          <p>{handleConvertToDate(Number(dataProfile?.birthday))}</p>
          <span>-</span>
          <p className="text-blue-700">{dataProfile?.gender ? "Nam" : "Nữ"}</p>
          <span>-</span>
          <p>{dataProfile?.addressText?.fullName}</p>
        </div>
      </div>

      <p className="text-gray-400 text-lg font-medium">
        {dataProfile?.introduction ?? "Chưa có mô tả"}
      </p>
      <div className="flex gap-x-8 text-white text-2xl font-bold">
        <a
          target="_blank"
          className="w-12 h-12 flex justify-center items-center rounded-full bg-gray-600 cursor-pointer"
          href={dataProfile?.facebook}
        >
          <FaFacebookF />
        </a>
        <a
          target="_blank"
          className="w-12 h-12 flex justify-center items-center  rounded-full bg-gray-600"
          href={`tel:${dataProfile?.email}`}
        >
          <FaPhone />
        </a>
        <a
          target="_blank"
          className="w-12 h-12 flex justify-center items-center  rounded-full bg-gray-600"
          href={`mailto:${dataProfile?.email}`}
        >
          <MdEmail />
        </a>
        <a
          target="_blank"
          className="w-12 h-12 flex justify-center items-center  rounded-full bg-gray-600 cursor-pointer"
          href={dataProfile?.linkedin}
        >
          <g>in</g>
        </a>
      </div>
    </div>
  );
};

export default InfoPerson;
