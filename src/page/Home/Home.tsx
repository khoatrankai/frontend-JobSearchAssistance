import AllCompanyComponent from "@/components/AllCompanyComponent/page";
import BannerComponent from "@/components/BannerComponent/BannerComponent";
import HotJobComponent from "@/components/HotJobComponent/HotJobComponent";
import ListJobComponent from "@/components/ListJobComponent/ListJobComponent";
import SearchAllComponent from "@/components/SearchAllComponent/SearchAllComponent";
import TopCompanyComponent from "@/components/TopCompanyComponent/TopCompanyComponent";
import "./Home.scss";
import React, { useEffect, useRef, useState } from "react";
import { useSrollContext } from "@/context/AppProvider";
import TopAchivementComponent from "@/components/TopAchivementComponent/TopAchivementComponent";
import InfoHomeCompany from "@/components/InfoHomeCompany/InfoHomeCompany";
import InfoJobMail from "@/components/InfoJobMail/InfoJobMail";
import BannerReceiveEmail from "@/components/BannerReceiveEmail/BannerReceiveEmail";
import BannerNewComponent from "@/components/BannerNewComponent/BannerNewComponent";
import BlogRecruiter from "@/components/BlogRecruiter/BlogRecruiter";
import Image from "next/image";

type Props = {};

const Home = (props: Props) => {
  const refJobHot = useRef<any>();
  const refJobNew = useRef<any>();
  const refJobTopic = useRef<any>();
  const refCompanyHot = useRef<any>();
  const { setPositionScrollJob, dataBgHome, scrollPosition } =
    useSrollContext();
  const [dataBannerHome, setBannerHome] = useState<any>([
    {
      image: "/bgacb.jpg",
    },
    {
      image: "/bgagribank.jpg",
    },
    {
      image: "/bgtechcombank.jpg",
    },
    {
      image: "/bgvcb.jpg",
    },
    {
      image: "/bgvpbank.jpg",
    },
    {
      image: "/bgvcb.jpg",
    },
  ]);

  useEffect(() => {
    if (refJobHot && refJobHot && refJobTopic) {
      setPositionScrollJob([
        refJobHot.current,

        refJobNew.current,
        refJobTopic.current,
        refCompanyHot.current,
      ]);
    }
  }, [refJobHot, refJobNew, refJobTopic, setPositionScrollJob]);

  return (
    <>
      <div className="flex flex-col items-center">
        <div
          className="fixed -z-50 inset-0 inline-block w-fit duration-500 transition-all "
          style={{ transform: `translateY(${-dataBgHome * 100}%)` }}
          key={""}
        >
          {dataBannerHome.map((dt: any, index: any) => {
            return (
              <div className="w-screen h-full relative" key={index}>
                <div
                  className="absolute inset-0 z-10 bg-black"
                  style={{ opacity: 0.4 }}
                ></div>
                <Image
                  className={`w-full h-full object-fill transition-all  duration-700`}
                  alt=""
                  src={dt.image}
                  height={5000}
                  width={5000}
                />
              </div>
            );
          })}
        </div>
        <BannerNewComponent setBannerHome={setBannerHome}>
          <div className=" w-full flex flex-col items-center">
            <div
              className={`max-w-6xl w-full transition-all duration-700 ${
                scrollPosition ? "invisible opacity-0" : "opacity-100"
              }`}
            >
              <SearchAllComponent DefaultActive={true} />
            </div>
          </div>
        </BannerNewComponent>

        <div className="flex flex-col w-full z-40">
          <div ref={refJobHot}>
            <HotJobComponent />
          </div>
          <InfoJobMail />
          <TopAchivementComponent />
          <div ref={refJobNew}>
            <ListJobComponent />
          </div>
          <InfoHomeCompany />

          <div ref={refJobTopic}>
            <TopCompanyComponent />
          </div>
          <BannerReceiveEmail />

          <BlogRecruiter />
        </div>
      </div>
    </>
  );
};

export default Home;
