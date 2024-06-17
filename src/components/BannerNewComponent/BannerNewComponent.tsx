import React, { ReactNode, useState } from "react";
import Image from "next/image";
import "./BannerNewComponent.scss";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { useSrollContext } from "@/context/AppProvider";
import SkeletonAll from "@/util/SkeletonAll";
type Props = {
  children: ReactNode;
};

const BannerNewComponent = ({ children }: Props) => {
  const [dataCompany, setDataCompany] = useState<any>([
    {
      name: "acb",
      link: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRyl95Fmt8o-cd4mVbb9lv1PngEjF68fXCOJFIa7Fsk8Q&s",
      title: "ACB",
      content: "Ngân hàng của mọi nhà",
      contentClick: "Apply Now",
    },
    {
      name: "agribank",
      link: "https://www.acer.com/",
      title: "Agribank",
      content: "Mang phồn thịnh đến với khách hàng",
      contentClick: "Join Team",
    },
    {
      name: "techcombank",
      link: "https://www.acer.com/",
      title: "Techcombank",
      content: "Giữ trọn niềm tin",
      contentClick: "Join us",
    },
    {
      name: "vcb",
      link: "https://www.acer.com/",
      title: "Vietcombank",
      content: "Chung niềm tin, Vững tương lai",
      contentClick: "Join our expert team",
    },
    {
      name: "vpbank",
      link: "https://www.acer.com/",
      title: "VP Bank",
      content: "Hành động vì ước mơ của bạn",
      contentClick: "Tham gia",
    },
    {
      name: "lenovo",
      link: "https://www.acer.com/",
      title: "Lenovo",
      content: "Chung niềm tin, Vững tương lai",
      contentClick: "Join our expert team",
    },
    { name: "microsoft", link: "https://www.acer.com/" },
    { name: "razer", link: "https://www.acer.com/" },
    { name: "rog", link: "https://www.acer.com/" },
    { name: "disney", link: "https://www.acer.com/" },
    { name: "hcmute", link: "https://www.acer.com/" },
    { name: "just", link: "https://www.acer.com/" },
    { name: "nike", link: "https://www.acer.com/" },
    { name: "nissan", link: "https://www.acer.com/" },
    { name: "tesla", link: "https://www.acer.com/" },
  ]);
  const { setBgHome, dataBgHome, reponsiveMobile } = useSrollContext();
  return (
    <div className="w-full h-[850px] relative flex flex-col items-center justify-between pt-16 px-4">
      {children}

      <div className="absolute left-[20%] top-1/4 text-white">
        <SkeletonAll data={dataCompany} type={2}>
          <div
            className={`h-10 overflow-hidden text-white/70 font-bold uppercase  ${
              reponsiveMobile < 1152 ? "text-2xl" : "text-3xl"
            }`}
          >
            <div
              className="h-fit transition-all duration-700"
              style={{ transform: `translateY(-${2.5 * dataBgHome}rem)` }}
            >
              {dataCompany.map((dt: any, index: any) => {
                if (index < 6)
                  return (
                    <p
                      className="h-10 w-full max-w-96 flex items-center"
                      key={index}
                    >
                      {dt.title}
                    </p>
                  );
              })}
            </div>
          </div>
          <div
            className={` h-36 overflow-hidden  font-bold uppercase  ${
              reponsiveMobile < 1152 ? "text-3xl" : "text-4xl"
            }`}
          >
            <div
              className="h-fit transition-all duration-700"
              style={{ transform: `translateY(-${9 * dataBgHome}rem)` }}
            >
              {dataCompany.map((dt: any, index: any) => {
                if (index < 6)
                  return (
                    <p className="h-36 w-full max-w-96 pt-2 " key={index}>
                      {dt.content}
                    </p>
                  );
              })}
            </div>
          </div>
          <div className="  h-[56px] overflow-hidden">
            <div
              className="h-fit transition-all duration-700 flex flex-col gap-y-1"
              style={{ transform: `translateY(-${60 * dataBgHome}px)` }}
            >
              {dataCompany.map((dt: any, index: any) => {
                if (index < 6)
                  return (
                    <button
                      className="px-4 h-14 flex justify-center items-center rounded-xl border-[2px] bg-black text-white  font-semibold w-fit hover:bg-white hover:text-black transition-all duration-500"
                      key={index}
                    >
                      {dt.contentClick}
                    </button>
                  );
              })}
            </div>
          </div>
        </SkeletonAll>
      </div>
      <div className="flex max-w-6xl w-full relative -translate-y-32 gap-x-4 overflow-hidden justify-center">
        <SkeletonAll data={dataCompany} type={1}>
          {dataCompany.map((dt: any, index: any) => {
            if (index < 6)
              return (
                <div
                  className={`w-[180px]  h-28 rounded-xl p-4 bg-white/70 border-2 border-transparent  cursor-pointer transition-all duration-500  shadow-[inset_-12px_-8px_40px_#46464620] ${
                    dataBgHome === index
                      ? ""
                      : "  hover:border-blue-500 hover:bg-black/50 opacity-10"
                  } ${
                    reponsiveMobile < 1200 && dataBgHome !== index
                      ? "hidden"
                      : ""
                  }`}
                  onClick={() => {
                    setBgHome(index);
                  }}
                  key={index}
                >
                  <Image
                    className="h-full"
                    width={500}
                    height={500}
                    alt=""
                    src={`/company/logo${dt.name}.png`}
                  />
                </div>
              );
          })}
        </SkeletonAll>
      </div>
      <div className="absolute inset-x-0 gap-6 bottom-10  px-4 flex justify-center items-center">
        <button
          className="text-3xl p-2 text-black/80 hover:text-white transition-all duration-300 rounded-full border-2 flex justify-center items-center"
          onClick={() => {
            if (dataBgHome === 0) {
              setBgHome(5);
            } else {
              setBgHome(dataBgHome - 1);
            }
          }}
        >
          <IoIosArrowBack />
        </button>
        {reponsiveMobile < 1200 && (
          <div className="flex gap-2">
            {dataCompany.map((dt: any, index: any) => {
              if (index < 6) {
                return (
                  <button
                    key={index}
                    className={`w-8 h-1 rounded-full transition-all duration-500 ${
                      dataBgHome === index ? "bg-white" : "bg-white/40"
                    }`}
                    onClick={() => {
                      setBgHome(index);
                    }}
                  ></button>
                );
              }
            })}
          </div>
        )}

        <button
          className="text-3xl p-2 text-black/80 hover:text-white transition-all duration-300 rounded-full border-2 flex justify-center items-center"
          onClick={() => {
            if (dataBgHome === 5) {
              setBgHome(0);
            } else {
              setBgHome(dataBgHome + 1);
            }
          }}
        >
          <IoIosArrowForward />
        </button>
      </div>
      {/* <div className="absolute left-1/2 bottom-10 right-0 px-4 flex justify-start items-center">
        
      </div> */}
    </div>
  );
};

export default BannerNewComponent;
