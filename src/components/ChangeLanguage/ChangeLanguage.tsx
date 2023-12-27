"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { getCookie, setCookie } from "@/cookies";
import { useDispatch, useSelector } from "react-redux";
import { setLanguage } from "@/redux/reducer/changeLanguageReducer/changeLanguage";

type Props = {};

const ChangeLanguage = (props: Props) => {
  const language = useSelector((state: any) => state.changeLaguage.language);
  const dispatch = useDispatch();
  const [bg_language, set_bg_language] = useState(false);
  const [reponsiveMobile, setReponsiveMobile] = useState<boolean>(false);

  const handleOnChangeBackgroundLanguage = () => {
    setCookie("languageId", bg_language ? "2" : "1", 1);

    if (bg_language === true) {
      dispatch(setLanguage(0));
    } else {
      dispatch(setLanguage(1));
    }

    set_bg_language(!bg_language);
  };
  useEffect(() => {
    set_bg_language(getCookie("languageId") === "2" ? false : true);
  }, []);
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 480) {
        setReponsiveMobile(true);
      } else {
        setReponsiveMobile(false);
      }
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  return (
    <button
      className={` rounded-full fixed right-9 overflow-hidden border-4 bg-blue-700 hover:bg-black ${
        reponsiveMobile
          ? "w-12 h-12 bottom-[190px]"
          : "w-[60px] h-[60px] bottom-[200px]"
      }`}
    >
      <Image
        className="w-full h-full"
        src={bg_language ? "/logo/vn.png" : "/logo/eng.png"}
        onClick={() => handleOnChangeBackgroundLanguage()}
        alt="anh"
        width={1920}
        height={1080}
      />
    </button>
  );
};

export default ChangeLanguage;
