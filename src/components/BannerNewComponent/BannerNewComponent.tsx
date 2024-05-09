import React, { ReactNode, useState } from "react";
import Image from "next/image";
import "./BannerNewComponent.scss";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { useSrollContext } from "@/context/AppProvider";
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
    { name: "lenovo", link: "https://www.acer.com/" },
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
  const { setBgHome, dataBgHome } = useSrollContext();
  return (
    <div className="w-full h-[850px] relative flex flex-col items-center justify-between pt-16">
      {children}

      <div className="absolute left-[20%] top-1/4 text-white">
        <div className="h-10 overflow-hidden text-white/70 font-bold uppercase text-3xl">
          <div
            className="h-fit transition-all duration-700"
            style={{ transform: `translateY(-${2.5 * dataBgHome}rem)` }}
          >
            {dataCompany.map((dt: any, index: any) => {
              if (index < 5)
                return (
                  <>
                    <p className="h-10 w-96">{dt.title}</p>
                  </>
                );
            })}
          </div>
        </div>
        <div className=" h-36 overflow-hidden  font-bold uppercase text-4xl">
          <div
            className="h-fit transition-all duration-700"
            style={{ transform: `translateY(-${9 * dataBgHome}rem)` }}
          >
            {dataCompany.map((dt: any, index: any) => {
              if (index < 5)
                return (
                  <>
                    <p className="h-36 w-96 pt-2">{dt.content}</p>
                  </>
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
              if (index < 5)
                return (
                  <>
                    <button className="px-4 h-14 flex justify-center items-center rounded-xl border-[2px] bg-black text-white  font-semibold w-fit hover:bg-white hover:text-black transition-all duration-500">
                      {dt.contentClick}
                    </button>
                  </>
                );
            })}
          </div>
        </div>
      </div>
      <div className="flex max-w-6xl w-full relative -translate-y-32 gap-x-4 overflow-hidden">
        {dataCompany.map((dt: any, index: any) => {
          if (index < 5)
            return (
              <>
                <div
                  className={`min-w-[217.59px] h-36 w-full rounded-xl p-4 bg-white/70 border-2 border-transparent  cursor-pointer transition-all duration-500  shadow-[inset_-12px_-8px_40px_#46464620] ${
                    dataBgHome === index
                      ? "opacity-10"
                      : "  hover:border-blue-500 hover:bg-black/50"
                  }`}
                  onClick={() => {
                    setBgHome(index);
                  }}
                >
                  <Image
                    className="h-full"
                    width={500}
                    height={500}
                    alt=""
                    src={`/company/logo${dt.name}.png`}
                  />
                </div>
              </>
            );
        })}
      </div>
      <div className="absolute right-1/2 bottom-10 left-0 px-4 flex justify-end items-center">
        <button
          className="text-3xl p-2 text-black/80 hover:text-white transition-all duration-300 rounded-full border-2 flex justify-center items-center"
          onClick={() => {
            if (dataBgHome === 0) {
              setBgHome(4);
            } else {
              setBgHome(dataBgHome - 1);
            }
          }}
        >
          <IoIosArrowBack />
        </button>
      </div>
      <div className="absolute left-1/2 bottom-10 right-0 px-4 flex justify-start items-center">
        <button
          className="text-3xl p-2 text-black/80 hover:text-white transition-all duration-300 rounded-full border-2 flex justify-center items-center"
          onClick={() => {
            if (dataBgHome === 4) {
              setBgHome(0);
            } else {
              setBgHome(dataBgHome + 1);
            }
          }}
        >
          <IoIosArrowForward />
        </button>
      </div>
    </div>
  );
};

export default BannerNewComponent;
