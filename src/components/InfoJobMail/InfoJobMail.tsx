import React, { useState } from "react";
import ReactPlayer from "react-player";
import "./InfoJobMail.scss";
import Image from "next/image";

type Props = {};

const InfoJobMail = (props: Props) => {
  const [dataChartTop, setDataChartTop] = useState<any>(-1);
  const [dataJobTop, setDataJobTop] = useState<any>([
    { name: "Kinh doanh" },
    { name: "Kỹ thuật máy tính" },
    { name: "Giáo viên" },
    { name: "Kỹ Sư" },
    { name: "Đầu bếp" },
  ]);
  return (
    <div className="flex justify-center h-[440px] mb-16">
      <div className="max-w-6xl w-full h-full relative rounded-lg overflow-hidden bg-black flex flex-col gap-y-4">
        <div className="absolute inset-0">
          <ReactPlayer
            url={"/videos/spark.mp4"}
            playing={true}
            loop={true}
            muted={true}
            height=""
            width="100%"
          />
        </div>
        <div className="px-4 py-3 relative z-10">
          <p className="font-bold text-blue-700 text-3xl">
            Top ngành tháng{" "}
            <span className="text-blue-400 drop-shadow-2xl">01/2024</span>
          </p>
        </div>
        <div className="flex gap-x-8">
          <div className="basis-1/3 flex flex-col p-4 gap-y-4">
            <div
              className={`${
                dataChartTop === 0
                  ? "relative translate-x-4 text-white bg-black border-white shadow-[5px_5px_rgba(209,213,219,_0.4),_10px_10px_rgba(209,213,219,_0.3),_15px_15px_rgba(209,213,219,_0.2),_20px_20px_rgba(209,213,219,_0.1),_25px_25px_rgba(209,213,219,_0.05)] cursor-pointer"
                  : "hover:shadow-[5px_5px_rgba(209,213,219,_0.4),_10px_10px_rgba(209,213,219,_0.3),_15px_15px_rgba(209,213,219,_0.2),_20px_20px_rgba(209,213,219,_0.1),_25px_25px_rgba(209,213,219,_0.05)] cursor-pointer text-black bg-white border-transparent"
              } p-2 flex gap-x-4 items-center border-[1px] group  hover:text-white   hover:bg-black hover:border-white rounded-xl drop-shadow-xl transition-all duration-700 `}
              onClick={() => {
                setDataChartTop(0);
              }}
            >
              <p className=" group-hover:font-extrabold font-bold text-xl uppercase ">
                #1
              </p>
              <p className="text-lg font-semibold capitalize ">
                {dataJobTop[0].name}
              </p>
            </div>
            <div className=" p-2 flex gap-x-4 items-center border-[1px] group text-black hover:text-white border-transparent bg-white hover:bg-black hover:border-white rounded-xl drop-shadow-xl transition-all duration-700 hover:shadow-[5px_5px_rgba(209,213,219,_0.4),_10px_10px_rgba(209,213,219,_0.3),_15px_15px_rgba(209,213,219,_0.2),_20px_20px_rgba(209,213,219,_0.1),_25px_25px_rgba(209,213,219,_0.05)] cursor-pointer">
              <p className=" group-hover:font-extrabold font-bold text-xl uppercase ">
                #2
              </p>
              <p className="text-lg font-semibold capitalize ">
                {dataJobTop[1].name}
              </p>
            </div>
            <div className=" p-2 flex gap-x-4 items-center border-[1px] group text-black hover:text-white border-transparent bg-white hover:bg-black hover:border-white rounded-xl drop-shadow-xl transition-all duration-700 hover:shadow-[5px_5px_rgba(209,213,219,_0.4),_10px_10px_rgba(209,213,219,_0.3),_15px_15px_rgba(209,213,219,_0.2),_20px_20px_rgba(209,213,219,_0.1),_25px_25px_rgba(209,213,219,_0.05)] cursor-pointer">
              <p className=" group-hover:font-extrabold font-bold text-xl uppercase ">
                #3
              </p>
              <p className="text-lg font-semibold capitalize ">
                {dataJobTop[2].name}
              </p>
            </div>
            <div className=" p-2 flex gap-x-4 items-center border-[1px] group text-black hover:text-white border-transparent bg-white hover:bg-black hover:border-white rounded-xl drop-shadow-xl transition-all duration-700 hover:shadow-[5px_5px_rgba(209,213,219,_0.4),_10px_10px_rgba(209,213,219,_0.3),_15px_15px_rgba(209,213,219,_0.2),_20px_20px_rgba(209,213,219,_0.1),_25px_25px_rgba(209,213,219,_0.05)] cursor-pointer">
              <p className=" group-hover:font-extrabold font-bold text-xl uppercase ">
                #4
              </p>
              <p className="text-lg font-semibold capitalize ">
                {dataJobTop[3].name}
              </p>
            </div>
            <div className=" p-2 flex gap-x-4 items-center border-[1px] group text-black hover:text-white border-transparent bg-white hover:bg-black hover:border-white rounded-xl drop-shadow-xl transition-all duration-700 hover:shadow-[5px_5px_rgba(209,213,219,_0.4),_10px_10px_rgba(209,213,219,_0.3),_15px_15px_rgba(209,213,219,_0.2),_20px_20px_rgba(209,213,219,_0.1),_25px_25px_rgba(209,213,219,_0.05)] cursor-pointer">
              <p className=" group-hover:font-extrabold font-bold text-xl uppercase ">
                #5
              </p>
              <p className="text-lg font-semibold capitalize ">
                {dataJobTop[4].name}
              </p>
            </div>
          </div>
          <div className="flex-1">
            <div className="w-[650px] relative rounded-xl h-80 overflow-hidden border-[1px]">
              <div
                className={`absolute inset-0 ${
                  dataChartTop === -1 ? "-translate-x-[650px]" : ""
                }  transition-all duration-700 rounded-xl overflow-hidden `}
              >
                <Image
                  className="w-full h-full"
                  width={650}
                  height={500}
                  alt=""
                  src={"/imageChart.jpg"}
                />
              </div>
              <div
                className={`relative  ${
                  dataChartTop !== -1 ? "translate-x-[650px]" : ""
                } transition-all duration-700 `}
              >
                <ReactPlayer
                  className=""
                  url={"/videos/introacer.mp4"}
                  playing={true}
                  loop={true}
                  muted={true}
                  height=""
                  width="100%"
                />
              </div>
            </div>
          </div>
        </div>
        {/* <div className="absolute inset-0">
          <ReactPlayer
            url={"/videos/introacer.mp4"}
            playing={true}
            loop={true}
            muted={true}
            height=""
            width="100%"
          />
        </div> */}
      </div>
    </div>
  );
};

export default InfoJobMail;
