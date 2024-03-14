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
};

export const Context = createContext<ScrollPosition>({} as ScrollPosition);

export const ScrollContext = ({ children }: { children: ReactNode }) => {
  const [dataFilter, setDataFilter] = useState<DataFilter | any>();
  const [scrollPosition, setScrollPosition] = useState<number>(-1);
  const [menuPosition, setMenuPosition] = useState<number>(-1);
  const [transPosition, setTransPosition] = useState<number>(0);
  const [checkPage, setCheckPage] = useState<string>("/");
  const [reponsiveMobile, setReponsiveMobile] = useState<number>(2000);
  const [positionScrollJob, setPositionScrollJob] = useState<any>([]);
  const [selectProfileUser, setSelectProfileUser] = useState<any>(0);
  const [selectItemProfileUser, setSelectItemProfileUser] = useState<any>(1);
  const handleLoadHrefPage = () => {
    setCheckPage(location.pathname);
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
  }, []);
  useEffect(() => {}, [dataFilter]);
  return (
    <BrowserRouter>
      <Provider store={store}>
        <ChatContextProvider>
          <Context.Provider
            value={{
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
