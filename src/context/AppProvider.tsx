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
import CookieCustom from "@/util/CookieCustom";
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
  titleIsLoading: any;
  setTitleIsLoading: any;
  handleOffTabLoading: any;
  setMaxBGHome: any;
  setTabAlertCatalog: any;
  tabAlertCatalog: any;
  setIdToken: any;
  selectItemProfileRecruiter: any;
  setSelectItemProfileRecruiter: any;
  idPostNotify: any;
  setIdPostNotify: any;
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
  const [selectProfileUser, setSelectProfileUser] = useState<any>(1);
  const [selectProfileRecruiter, setSelectProfileRecruiter] = useState<any>(1);
  const [selectItemProfileUser, setSelectItemProfileUser] = useState<any>(1);
  const [selectItemProfileRecruiter, setSelectItemProfileRecruiter] =
    useState<any>(1);
  const [idPostNotify, setIdPostNotify] = useState<any>();
  const [handleAlert, setHandleAlert] = useState<any>();
  const [contentAlert, setContentAlert] = useState<any>();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [maxBGHome, setMaxBGHome] = useState<any>(5);
  const [titleIsLoading, setTitleIsLoading] = useState<any>();
  const [dataDocsCv, setDataDocsCv] = useState<any>();
  const [tabAlert, setTabAlert] = useState<boolean>(false);
  const [idToken, setIdToken] = useState<any>();
  const [tabAlertCatalog, setTabAlertCatalog] = useState<boolean>(false);
  const [listPathTitle, setListPathTitle] = useState<any>([
    {
      path: "/",
      title: "Trang chủ",
    },
    {
      path: "/recruiter",
      title: "Trang chủ",
    },
    {
      path: "/blog",
      title: "Blog",
    },
    {
      path: "/manage-cv",
      title: "Quản lý CV",
    },
    {
      path: "/cv-all",
      title: "Mẫu CV",
    },
    {
      path: "/chat",
      title: "Nhắn tin",
    },
    {
      path: "/community-create",
      title: "Tạo bài viết mới",
    },
    {
      path: "/company-all",
      title: "Tất cả công ty",
    },
    {
      path: "/forgot-password",
      title: "Quên mật khẩu",
    },
    {
      path: "/login",
      title: "Đăng nhập",
    },
    {
      path: "/more-hotjob",
      title: "Việc làm nổi bật",
    },
    {
      path: "/more-new",
      title: "Việc làm mới",
    },
    {
      path: "/more-suggest",
      title: "Việc làm đề xuất",
    },
    {
      path: "/more-topic",
      title: "Việc làm theo địa danh",
    },
    {
      path: "/profile",
      title: "Thông tin hồ sơ",
    },
    {
      path: "/search-result",
      title: "Kết quả tìm kiếm",
    },
    {
      path: "/sign-up",
      title: "Đăng ký",
    },
    {
      path: "/update-password",
      title: "Cập nhật password",
    },
    {
      path: "/new-post",
      title: "Tạo bài viết mới",
    },
    {
      path: "/product-catalog",
      title: "Báo giá",
    },
    {
      path: "/help-contact",
      title: "Hỗ trợ",
    },
    {
      path: "/recruiter/candidate",
      title: "Tìm kiếm ứng viên",
    },
  ]);
  const router = useRouter();
  useEffect(() => {
    console.log(idToken);
  }, [idToken]);
  const handleLoadHrefPage = () => {
    setCheckPage(pathname);
  };
  useEffect(() => {
    setCheckPage(pathname);
    const titleDoc = listPathTitle.filter((dt: any) => {
      if (pathname.includes(dt.path)) {
        return dt;
      }
    });

    if (pathname.includes("/recruiter")) {
      if (pathname === "/recruiter") {
        document.title = titleDoc[1]?.title;
      } else {
        document.title = titleDoc[2]?.title;
      }
    } else {
      if (pathname === "/") {
        document.title = titleDoc[0]?.title;
      } else {
        document.title = titleDoc[1]?.title;
      }
    }
    if (document.title == "undefined") {
      document.title = "JOBIT2024";
    }

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
    if (dataBgHome >= maxBGHome) {
      setBgHome(0);
    } else {
      setBgHome(dataBgHome + 1);
    }
  };
  useEffect(() => {
    if (pathname === "/") {
      const timeoutID = setTimeout(handleTimeBG, 4000);
      return () => {
        clearTimeout(timeoutID);
      };
    }
  }, [dataBgHome, pathname]);
  const updateHandleAlert = (handle: any) => {
    setHandleAlert([handle]);
  };
  const callHandleAlert = () => {
    handleAlert[0]();
  };
  const handlePersistGateLoaded = (data = "") => {
    setTitleIsLoading(data);
    setIsLoading(true);
  };
  const handleOffTabLoading = () => {
    setTitleIsLoading("");
    setIsLoading(false);
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
              titleIsLoading,
              setTitleIsLoading,
              handleOffTabLoading,
              setMaxBGHome,
              tabAlertCatalog,
              setTabAlertCatalog,
              setIdToken,
              selectItemProfileRecruiter,
              setSelectItemProfileRecruiter,
              setIdPostNotify,
              idPostNotify,
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
