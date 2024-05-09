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
  scrollPosition: number;
  setScrollPosition: Dispatch<SetStateAction<number>>;
  menuPosition: number;
  setMenuPosition: Dispatch<SetStateAction<number>>;
  selectProfileUser: any;
  setSelectProfileUser: any;
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
};

export const Context = createContext<ScrollPosition>({} as ScrollPosition);

export const ScrollContext = ({ children }: { children: ReactNode }) => {
  const [dataFilter, setDataFilter] = useState<DataFilter | any>();
  const [dataBgHome, setBgHome] = useState<any>(0);
  const [scrollPosition, setScrollPosition] = useState<number>(-1);
  const [menuPosition, setMenuPosition] = useState<number>(-1);
  const [transPosition, setTransPosition] = useState<number>(0);
  const [checkPage, setCheckPage] = useState<string>("/");
  const [reponsiveMobile, setReponsiveMobile] = useState<number>(2000);
  const [positionScrollJob, setPositionScrollJob] = useState<any>([]);
  const [selectProfileUser, setSelectProfileUser] = useState<any>(0);
  const [selectItemProfileUser, setSelectItemProfileUser] = useState<any>(1);
  const [handleAlert, setHandleAlert] = useState<any>();
  const [tabAlert, setTabAlert] = useState<boolean>(false);
  const router = useRouter();

  const handleLoadHrefPage = () => {
    console.log(location.pathname);
    setCheckPage(location.pathname);
  };
  const updateHandleAlert = (handle: any) => {
    setHandleAlert([handle]);
  };
  const callHandleAlert = () => {
    handleAlert[0]();
  };
  useEffect(() => {
    window.addEventListener("load", (e: any) => {
      setReponsiveMobile(window.innerWidth);
    });
    window.addEventListener("resize", (e: any) => {
      setReponsiveMobile(window.innerWidth);
    });
  }, [reponsiveMobile]);

  useEffect(() => {
    handleLoadHrefPage();
    const handlePopstate = (e: any) => {
      handleLoadHrefPage();
    };
    window.addEventListener("popstate", handlePopstate);
    return () => window.removeEventListener("popstate", handlePopstate);
  }, []);
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
