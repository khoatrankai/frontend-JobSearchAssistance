"use client";
// Import specific react components instead of importing all of React
import React, { useEffect, useRef, useState } from "react";
import { persistStore } from "redux-persist";
import { PersistGate } from "redux-persist/integration/react";
import BannerComponent from "@/components/BannerComponent/BannerComponent";
import TopCompanyComponent from "@/components/TopCompanyComponent/TopCompanyComponent";
import ListJobComponent from "@/components/ListJobComponent/ListJobComponent";
import SuggestJobComponent from "@/components/SuggestJobComponent/SuggestJobComponent";
import HotJobComponent from "@/components/HotJobComponent/HotJobComponent";
import AllCompanyComponent from "@/components/AllCompanyComponent/page";
import { store } from "@/redux/store";
import { useSelector } from "react-redux";
import AppliedPostedJob from "@/components/AppliedPostedJob";
import FooterComponent from "@/components/FooterComponent/FooterComponent";
import PageHome from "@/page/Home/Home";
import LoadingPageComponent from "@/components/LoadingPageComponent/LoadingPageComponent";
import { useSrollContext } from "@/context/AppProvider";

interface PageProps {}

const Home = () => {
  const persistor = persistStore(store);
  const { isLoading, handlePersistGateLoaded } = useSrollContext();
  const [checkPage, setCheckPage] = useState<string>("/");
  const categoryId = useSelector((state: any) => state.categoryId);
  const hotJobRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setCheckPage(location.pathname);
  }, []);

  useEffect(() => {
    if (hotJobRef.current && location.pathname === "/") {
      hotJobRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [categoryId]);

  return (
    <>
      {isLoading && <LoadingPageComponent />}
      <PersistGate
        loading={false}
        persistor={persistor}
        onBeforeLift={handlePersistGateLoaded}
      >
        <div className="w-full h-full -z-10">
          <PageHome />
        </div>
      </PersistGate>
    </>
  );
};

export default Home;
