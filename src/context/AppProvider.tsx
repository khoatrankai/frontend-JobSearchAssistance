"use client";
import React, {
  useState,
  createContext,
  useContext,
  Dispatch,
  SetStateAction,
  ReactNode,
  useEffect,
} from "react";
import { Provider, useSelector } from "react-redux";
import { usePathname, useSearchParams } from "next/navigation";
import { store } from "@/redux/store";
import ChatContextProvider from "./ChatProvider";
import { BrowserRouter, useLocation } from "react-router-dom";
import { useRouter } from "next/navigation";
type DataFilter = {
  positionJob: Array<{
    province_id: string;
    province_fullName: string;
    province_name: string;
    districts: Array<{ district_id: string; district: string }>;
  }>;
  listJob: Array<{
    parent_category_id: number;
    parent_category: string;
    childs: Array<{ id: number; name: string }>;
  }>;
  typeJob: { typeJob: string; id: string };
  timeJob: { timeJob: string; id: string };
  salaryJob: { min: number; max: number; type: boolean };
  workPeriod: Array<{ typeWork: string; id: number }>;
};

type ScrollPosition = {
  positionScrollJob: any;
  setPositionScrollJob: any;
  selectItemProfileUser: any;
  setSelectItemProfileUser: any;
  setCheckPage: any;
  scrollPosition: boolean;
  setScrollPosition: Dispatch<SetStateAction<boolean>>;
  menuPosition: number;
  setMenuPosition: Dispatch<SetStateAction<number>>;
  selectProfileUser: any;
  setSelectProfileUser: any;
  selectProfileRecruiter: any;
  setSelectProfileRecruiter: any;
  transPosition: number;
  setTransPosition: Dispatch<SetStateAction<number>>;
  dataFilter: DataFilter;
  setDataFilter: Dispatch<SetStateAction<DataFilter | any>>;
  checkPage: string;
  reponsiveMobile: number;
  handleLoadHrefPage: () => void;
  dataBgHome: any;
  setBgHome: Dispatch<SetStateAction<DataFilter | any>>;
  handleAlert: any;
  setHandleAlert: any;
  tabAlert: boolean;
  setTabAlert: any;
  updateHandleAlert: any;
  callHandleAlert: any;
  soureImageShow: any;
  setSoureImage: any;
  isLoading: any;
  setIsLoading: any;
  dataDocsCv: any;
  setDataDocsCv: any;
  contentAlert: any;
  setContentAlert: any;
  handlePersistGateLoaded: any;
  scrollTopPosition: any;
};

export const Context = createContext<ScrollPosition>({} as ScrollPosition);

export const ScrollContext = ({ children }: { children: ReactNode }) => {
  const pathname = usePathname();
  const [dataFilter, setDataFilter] = useState<DataFilter | any>();
  const [dataBgHome, setBgHome] = useState<any>(0);
  const [soureImageShow, setSoureImage] = useState<any>(null);
  const [scrollPosition, setScrollPosition] = useState<boolean>(false);
  const [scrollTopPosition, setScrollTopPosition] = useState<any>(0);
  const [menuPosition, setMenuPosition] = useState<number>(-1);
  const [transPosition, setTransPosition] = useState<number>(0);
  const [checkPage, setCheckPage] = useState<string>("/");
  const [reponsiveMobile, setReponsiveMobile] = useState<number>(0);
  const [positionScrollJob, setPositionScrollJob] = useState<any>([]);
  const [selectProfileUser, setSelectProfileUser] = useState<any>(0);
  const [selectProfileRecruiter, setSelectProfileRecruiter] = useState<any>(0);
  const [selectItemProfileUser, setSelectItemProfileUser] = useState<any>(1);
  const [handleAlert, setHandleAlert] = useState<any>();
  const [contentAlert, setContentAlert] = useState<any>();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [dataDocsCv, setDataDocsCv] = useState<any>();
  const [tabAlert, setTabAlert] = useState<boolean>(false);
  const router = useRouter();

  const handleLoadHrefPage = () => {
    setCheckPage(pathname);
  };
  useEffect(() => {
    setCheckPage(pathname);
    //console.log(pathname);
    // handleLoadHrefPage();
  }, [pathname]);
  // setInterval(() => {
  //   if (dataBgHome === 4) {
  //     setBgHome(0);
  //   } else {
  //     setBgHome(dataBgHome + 1);
  //   }
  // }, 5000);
  const handleTimeBG = () => {
    if (dataBgHome === 5) {
      setBgHome(0);
    } else {
      setBgHome(dataBgHome + 1);
    }
  };
  useEffect(() => {
    const timeoutID = setTimeout(handleTimeBG, 4000);
    return () => {
      clearTimeout(timeoutID);
    };
  }, [dataBgHome]);
  const updateHandleAlert = (handle: any) => {
    setHandleAlert([handle]);
  };
  const callHandleAlert = () => {
    handleAlert[0]();
  };
  const handlePersistGateLoaded = () => {
    console.log("vao thay doi");
    setIsLoading(!isLoading);
  };
  useEffect(() => {
    const handleScrollFull = () => {
      let currentScrollPosition = window.scrollY || window.pageYOffset;
      setScrollTopPosition(currentScrollPosition);
      if (currentScrollPosition > 24) {
        setScrollPosition(true);
      } else {
        setScrollPosition(false);
      }
    };
    window.addEventListener("scroll", handleScrollFull);
    return () => {
      window.removeEventListener("scroll", handleScrollFull);
    };
  }, []);
  useEffect(() => {
    setReponsiveMobile(window.innerWidth);
  }, []);
  useEffect(() => {
    const handleResizeFull = () => {
      setReponsiveMobile(window.innerWidth);
    };
    // setReponsiveMobile(window.innerWidth);

    window.addEventListener("load", handleResizeFull);
    window.addEventListener("resize", handleResizeFull);
    return () => {
      window.removeEventListener("load", handleResizeFull);
      window.removeEventListener("resize", handleResizeFull);
    };
  }, []);

  // useEffect(() => {
  //   handleLoadHrefPage();
  //   const handlePopstate = (e: any) => {
  //     handleLoadHrefPage();
  //   };
  //   window.addEventListener("popstate", handlePopstate);
  //   return () => window.removeEventListener("popstate", handlePopstate);
  // }, []);
  useEffect(() => {}, [dataFilter]);
  return (
    <BrowserRouter>
      <Provider store={store}>
        <ChatContextProvider>
          <Context.Provider
            value={{
              dataBgHome,
              setBgHome,
              selectItemProfileUser,
              setSelectItemProfileUser,
              selectProfileUser,
              setSelectProfileUser,
              selectProfileRecruiter,
              setSelectProfileRecruiter,
              positionScrollJob,
              setPositionScrollJob,
              scrollPosition,
              handleLoadHrefPage,
              setScrollPosition,
              menuPosition,
              setMenuPosition,
              transPosition,
              setTransPosition,
              dataFilter,
              setDataFilter,
              checkPage,
              reponsiveMobile,
              setCheckPage,
              handleAlert,
              setHandleAlert,
              tabAlert,
              setTabAlert,
              updateHandleAlert,
              callHandleAlert,
              setSoureImage,
              soureImageShow,
              isLoading,
              setIsLoading,
              handlePersistGateLoaded,
              scrollTopPosition,
              contentAlert,
              setContentAlert,
              dataDocsCv,
              setDataDocsCv,
            }}
          >
            {children}
          </Context.Provider>
        </ChatContextProvider>
      </Provider>
    </BrowserRouter>
  );
};

export const useSrollContext = () => useContext(Context);
