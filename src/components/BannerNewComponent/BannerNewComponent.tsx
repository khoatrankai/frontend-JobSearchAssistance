import React, { ReactNode, useEffect, useState } from "react";
import Image from "next/image";
import "./BannerNewComponent.scss";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { useSrollContext } from "@/context/AppProvider";
import SkeletonAll from "@/util/SkeletonAll";
import themeApi from "@/api/theme/themeApi";
import ShortText from "@/util/ShortText";
import useRouterCustom from "@/util/useRouterCustom/useRouterCustom";
type Props = {
  children: ReactNode;
  setBannerHome: any;
};

const BannerNewComponent = ({ children, setBannerHome }: Props) => {
  const [dataCompany, setDataCompany] = useState<any>([
    // {
    //   name: "acb",
    //   link: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRyl95Fmt8o-cd4mVbb9lv1PngEjF68fXCOJFIa7Fsk8Q&s",
    //   title: "ACB",
    //   content: "Ngân hàng của mọi nhà",
    //   contentClick: "Apply Now",
    // },
    // {
    //   name: "agribank",
    //   link: "https://www.acer.com/",
    //   title: "Agribank",
    //   content: "Mang phồn thịnh đến với khách hàng",
    //   contentClick: "Join Team",
    // },
    // {
    //   name: "techcombank",
    //   link: "https://www.acer.com/",
    //   title: "Techcombank",
    //   content: "Giữ trọn niềm tin",
    //   contentClick: "Join us",
    // },
    // {
    //   name: "vcb",
    //   link: "https://www.acer.com/",
    //   title: "Vietcombank",
    //   content: "Chung niềm tin, Vững tương lai",
    //   contentClick: "Join our expert team",
    // },
    // {
    //   name: "vpbank",
    //   link: "https://www.acer.com/",
    //   // title: "VP Bank",
    //   content: "Hành động vì ước mơ của bạn",
    //   contentClick: "Tham gia",
    // },
    {
      name: "lenovo",
      link: "https://www.acer.com/",
      // title: "Lenovo",
      description: "Chung niềm tin, Vững tương lai",
      nameButton: "Join our expert team",
    },
  ]);
  const { setBgHome, dataBgHome, reponsiveMobile, setMaxBGHome } =
    useSrollContext();
  const { handleShortTextHome } = ShortText();
  const { pushBlank } = useRouterCustom();
  useEffect(() => {
    const fetchData = async () => {
      const data: any = await themeApi.getThemeHome();
      if (data && data.statusCode === 200) {
        setDataCompany(data.data);
        setMaxBGHome(data.data.length - 1);
        setBannerHome(
          data.data.map((dt: any) => {
            return { image: dt.image };
          })
        );
        setBgHome(0);
      }
    };
    fetchData();
  }, []);
  return (
    <div className="w-full h-[80vh] relative flex flex-col items-center justify-between pt-16 px-4 max-h-[90vh]">
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
                if (index < dataCompany?.length)
                  return (
                    <p
                      className="h-10 w-full max-w-96 flex items-center"
                      key={index}
                    >
                      {handleShortTextHome(
                        dt.name,
                        reponsiveMobile < 400
                          ? 10
                          : reponsiveMobile < 800
                          ? 15
                          : 20
                      )}
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
                if (index < dataCompany?.length)
                  return (
                    <p className="h-36 w-full max-w-96 pt-2 " key={index}>
                      {handleShortTextHome(
                        dt.description,
                        reponsiveMobile < 400
                          ? 20
                          : reponsiveMobile < 800
                          ? 35
                          : 45
                      )}
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
                if (index < dataCompany?.length)
                  return (
                    <button
                      className="px-4 h-14 flex justify-center items-center rounded-xl border-[2px] bg-black text-white  font-semibold w-fit hover:bg-white hover:text-black transition-all duration-500"
                      key={index}
                      onClick={() => {
                        pushBlank(dt.link);
                      }}
                    >
                      {dt.nameButton}
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
            if (index < dataCompany?.length)
              return (
                <div
                  className={`w-[180px]  h-28 rounded-xl p-4 bg-white/70 border-2 border-transparent  cursor-pointer transition-all duration-500  shadow-[inset_-12px_-8px_40px_#46464620] ${
                    dataBgHome === index
                      ? ""
                      : "  hover:border-blue-500 hover:bg-black/50 opacity-10"
                  } ${reponsiveMobile < 1200 ? "hidden" : ""}`}
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
                    src={`${dt.logo ?? "/goapply.png"}`}
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
              setBgHome(dataCompany?.length - 1);
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
              if (index < dataCompany?.length) {
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
            if (dataBgHome >= dataCompany?.length - 1) {
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
