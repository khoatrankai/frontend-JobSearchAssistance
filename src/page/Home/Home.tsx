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
  const [scrollPosition, setScrollPosition] = useState<any>(false);
  const { setPositionScrollJob, dataBgHome } = useSrollContext();
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
  ]);
  useEffect(() => {
    window.addEventListener("scroll", (e) => {
      let currentScrollPosition = window.scrollY || window.pageYOffset;
      if (currentScrollPosition > 24) {
        setScrollPosition(true);
      } else {
        setScrollPosition(false);
      }
    });
  }, []);
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
        <div className="fixed -z-50 inset-0 flex">
          <div className="fixed inset-0 z-10 bg-black/30"></div>
          {/* <ReactPlayer
          url={"/videos/introip.mp4"}
          playing={true}
          loop={true}
          muted={true}
          height=""
          width="100vw"
        /> */}
          {dataBannerHome.map((dt: any, index: any) => {
            return (
              <>
                <Image
                  className={` h-vh transition-all  duration-700 ${
                    dataBgHome === index ? "!w-full" : "!w-0 opacity-0 "
                  }`}
                  alt=""
                  src={dt.image}
                  height={5000}
                  width={dataBgHome === index ? 5000 : 0}
                />
              </>
            );
          })}
        </div>
        <BannerNewComponent>
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

        {/* <BannerComponent /> */}
        {/* <div ref={refCompanyHot} className="w-full">
            <AllCompanyComponent />
          </div> */}

        <div className="flex flex-col w-full z-40">
          <div ref={refJobHot}>
            <HotJobComponent />
          </div>
          {/* <AllCompanyComponent /> */}
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
