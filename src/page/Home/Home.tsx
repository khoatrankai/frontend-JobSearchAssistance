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

type Props = {};

const Home = (props: Props) => {
  const refJobHot = useRef<any>();
  const refJobNew = useRef<any>();
  const refJobTopic = useRef<any>();
  const refCompanyHot = useRef<any>();
  const [scrollPosition, setScrollPosition] = useState<any>(false);
  const { setPositionScrollJob } = useSrollContext();
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
        <div className="gradient-bg-banner w-full flex flex-col items-center">
          <div
            className={`max-w-6xl w-full transition-all duration-300 ${
              scrollPosition ? "invisible opacity-0" : "opacity-100"
            }`}
          >
            <SearchAllComponent DefaultActive={true} />
          </div>
          <BannerComponent />
          <div ref={refCompanyHot}>
            <AllCompanyComponent />
          </div>
        </div>

        <div className="flex flex-col w-full">
          <div ref={refJobNew}>
            <ListJobComponent />
          </div>

          <div ref={refJobHot}>
            <HotJobComponent />
          </div>
          <InfoJobMail />
          <TopAchivementComponent />

          <div ref={refJobTopic}>
            <TopCompanyComponent />
          </div>
          <InfoHomeCompany />
        </div>
      </div>
    </>
  );
};

export default Home;
