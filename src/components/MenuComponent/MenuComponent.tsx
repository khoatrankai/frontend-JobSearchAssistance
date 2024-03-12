/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import Link from "next/link";
import React, { useRef } from "react";
import Image from "next/image";
import "./MenuComponent.scss";
import { useState, useEffect } from "react";
import NavbarComponent from "../NavbarComponent/NavbarComponent";
import { useSrollContext } from "@/context/AppProvider";
import FilterComponent from "../FilterComponent/FilterComponent";
import { getCookie, setCookie } from "@/cookies";
import jobApi from "../../api/job/jobApi";
import numeral from "numeral";
import ModalLogin from "../ModalLogin/ModalLogin";
import { useDispatch, useSelector } from "react-redux";
import { fetchProfile } from "@/redux/reducer/profileReducer/profileSlice";
import LogoutIcon from "@mui/icons-material/Logout";
import { Box, FormControlLabel, Typography } from "@mui/material";
import SystemUpdateAltIcon from "@mui/icons-material/SystemUpdateAlt";
import CardGiftcardIcon from "@mui/icons-material/CardGiftcard";
import BusinessIcon from "@mui/icons-material/Business";
import { styled } from "@mui/material/styles";
import Switch, { SwitchProps } from "@mui/material/Switch";
import { FaUser } from "react-icons/fa";
import { FaUserEdit } from "react-icons/fa";
import { MdWork } from "react-icons/md";
import { IoMdNotifications } from "react-icons/io";
import { AiFillMessage } from "react-icons/ai";
import { IoMdSettings } from "react-icons/io";
import SearchAllComponent from "../SearchAllComponent/SearchAllComponent";
import { FaBuilding } from "react-icons/fa";
import { FaHeart } from "react-icons/fa";
import { IoDocumentText } from "react-icons/io5";
import { RiMenuFill, RiMenu5Fill, RiCloseFill } from "react-icons/ri";

import {
  BellIcon,
  BlackSearchIcon,
  ChatIcon,
  FilterIcon,
  IconMenu,
} from "@/icons";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import notificationApi from "@/api/notification/notificationApi";
import BorderColorIcon from "@mui/icons-material/BorderColor";
import { useRouter } from "next/navigation";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import AddCommentIcon from "@mui/icons-material/AddComment";
import { toast } from "react-toastify";
import profileAPi from "@/api/profiles/profileApi";
import { Button, Modal } from "antd";
import historyRecruiter from "@/api/history/historyRecruiter";
import { fetchSearchResult } from "@/redux/reducer/searchReducer";
import { setLanguage } from "@/redux/reducer/changeLanguageReducer/changeLanguage";
// import { analytics } from "../../configs/firebase";
// import { logEvent } from "firebase/analytics";
import AnalyticsIcon from "@mui/icons-material/Analytics";
import { io } from "socket.io-client";
import ModalNoteCreateCompany from "../ModalNoteCreateCompany";
import AssistantPhotoIcon from "@mui/icons-material/AssistantPhoto";
import searchApi from "@/api/search/apiSearch";
import ManageSearchIcon from "@mui/icons-material/ManageSearch";
import { useLocation } from "react-router-dom";

type Props = {
  // scrollPosition: Number;
};

interface INotification {
  code: number;
  message: string;
  success: boolean;
  data: any;
}

interface INotification {
  code: number;
  data: any;
}

interface ITurnOffSerach {
  statusCode: number;
  message: string;
}
const MenuComponent = (props: Props) => {
  const location = useLocation();
  const { reponsiveMobile } = useSrollContext();
  const { scrollPosition, checkPage, handleLoadHrefPage } = useSrollContext();
  const ref_btn_notify = useRef<any>();
  const ref_btn_profile = useRef<any>();
  let socket = useRef<any>();
  const ref_btn_menu = useRef<any>();
  const ref_menu = useRef<any>();
  const ref_input = useRef<any>();
  const [dataRequest, setDataRequest] = useState<any>({
    is_working_weekend: 0,
    is_date_period: 0,
    money_type: 1,
    salary_min: 0,
    salary_max: 0,
  });
  const [tabNotify, setTabNotify] = useState<boolean>(false);
  const [tabSuggest, setTabSuggest] = useState<boolean>(false);
  // const [bg_language, set_bg_language] = useState(false);
  const [checkNav, setNav] = useState(false);
  const [checkScroll, setCheckScroll] = useState(true);
  const [positionScroll, setPositionScroll] = useState(0);
  const [tabFilter, setTabFilter] = useState<Boolean>(false);
  const [checkPageLoad, setCheckPageLoad] = useState<boolean>(false);
  const [checkReponsive, setCheckReponsive] = useState<boolean>(false);
  const [totalJob, setTotalJob] = useState<number>(0);
  const [openModalLogin, setOpenModalLogin] = useState<boolean>(false);
  const [profileData, setProfileData] = useState<any>({});
  const { profile } = useSelector((state: any) => state.profile);
  const [imageError, setImageError] = useState(false);
  const [openModalProfile, setOpenModalProfile] = useState<boolean>(false);
  const [dataNotification, setDataNotification] = useState<any>([]);
  const dispatch = useDispatch();
  const [tabMenu, setTabMenu] = useState<boolean>(false);
  const router = useRouter();
  const { } = router;
  const [openModalTurnOffStatus, setOpenModalTurnOffStatus] = useState(false);
  const language = useSelector((state: any) => state.changeLaguage.language);
  const [openModalNoteCreateCompany, setOpenModalNoteCreateCompany] =
    React.useState(false);
  const [scrollPositionSearch, setScrollPositionSearch] = useState<any>(false);
  const [searchActive, setSearchActive] = useState<boolean>(false);
  const [onMenuAll, setOnMenuAll] = useState<boolean>(false);
  useEffect(() => {
    handleLoadHrefPage();
  }, [location.pathname]);

  useEffect(() => {
    const funcStopScroll = () => {
      document.body.style.overflow = "hidden";
    };
    const funcScroll = () => {
      document.body.style.overflow = "scroll";
    };
    if (onMenuAll) {
      funcStopScroll();
    } else {
      funcScroll();
    }
  }, [onMenuAll]);

  useEffect(() => {
    if (checkPage !== "/") {
      setScrollPositionSearch(true);
    } else {
      window.addEventListener("scroll", (e) => {
        let currentScrollPosition = window.scrollY || window.pageYOffset;
        if (currentScrollPosition > 24) {
          setScrollPositionSearch(true);
        } else {
          setScrollPositionSearch(false);
        }
      });
    }
  }, [checkPage, scrollPositionSearch]);

  useEffect(() => {
    dispatch(fetchProfile(language === 1 ? "vi" : "en") as any);
  }, [language]);
  const [dataSuggest, setDataSuggest] = React.useState<any>([]);
  useEffect(() => {
    const handleBlurTab = (e: any) => {
      if (
        !ref_menu.current.contains(e.target) &&
        e.target.parentElement?.name !== "btn_close_filter"
      ) {
        setTabFilter(false);
      }
    };
    document.addEventListener("click", handleBlurTab);
    return () => {
      document.removeEventListener("click", handleBlurTab);
    };
  }, []);
  useEffect(() => {
    const handleBlurTab = (e: any) => {
      if (tabNotify && !ref_btn_notify.current.contains(e.target)) {
        setTabNotify(false);
      }
    };
    document.addEventListener("click", handleBlurTab);
    return () => {
      document.removeEventListener("click", handleBlurTab);
    };
  }, [tabNotify]);
  useEffect(() => {
    const handleBlurTab = (e: any) => {
      if (tabMenu && !ref_btn_menu.current?.contains(e.target)) {
        setTabMenu(false);
      }
    };
    document.addEventListener("click", handleBlurTab);
    return () => {
      document.removeEventListener("click", handleBlurTab);
    };
  }, [tabMenu]);
  useEffect(() => {
    const handleBlurTab = (e: any) => {
      if (tabSuggest && !ref_input.current?.contains(e.target)) {
        setTabSuggest(false);
      }
    };
    document.addEventListener("click", handleBlurTab);
    return () => {
      document.removeEventListener("click", handleBlurTab);
    };
  }, [tabSuggest]);
  useEffect(() => {
    const handleBlurTab = (e: any) => {
      if (openModalProfile && !ref_btn_profile.current.contains(e.target)) {
        setOpenModalProfile(false);
      }
    };
    document.addEventListener("click", handleBlurTab);
    return () => {
      document.removeEventListener("click", handleBlurTab);
    };
  }, [openModalProfile]);
  useEffect(() => {
    setProfileData(profile);
  }, [profile]);
  useEffect(() => {
    if (checkPage === "/") {
      setCheckPageLoad(true);
    } else {
      setCheckPageLoad(false);
    }
  }, [checkPage]);
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 700) {
        setCheckReponsive(true);
      } else {
        setCheckReponsive(false);
      }
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  useEffect(() => {
    if (scrollPosition != -1) {
      setNav(true);
    } else {
      setNav(true);
    }
  }, [scrollPosition]);
  const handleScroll = () => {
    const scroll = window.pageYOffset;
    if (scroll > positionScroll) {
      setCheckScroll(false);
    } else {
      setCheckScroll(true);
    }
    setPositionScroll(scroll);
  };
  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [positionScroll, checkScroll, handleScroll]);

  useEffect(() => {
    const fetchData = async () => {
      const res = await jobApi.getTotalJob("vi");

      if (res) {
        setTotalJob(res.data?.total);
      }
    };

    fetchData();
  }, []);

  const handleToggleModal = () => {
    setOpenModalLogin(false);
  };

  const handleLogOut = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    localStorage.removeItem("id");
    localStorage.removeItem("role");
    localStorage.removeItem("accountId");
    socket.current.disconnect();
    window.location.href = "/";
  };

  useEffect(() => {
    const dataObj = JSON.parse(localStorage.getItem("dataRequest") || "{}");
    setDataRequest({ ...dataRequest, q: dataObj.q || "" });
    const fetchData = async () => {
      const res = (await notificationApi.getNotification(
        language === 1 ? "vi" : "en"
      )) as unknown as INotification;

      if (res && res.code === 200) {
        setDataNotification(res.data.notifications);
      }
    };

    fetchData();
  }, [language]);

  const handleClickNoty = (
    postId: number,
    commentId: number,
    applicationId: number,
    typeText: string
  ) => {
    if (typeText === "recruiter") {
      let res;
      const fetchData = async () => {
        res = (await historyRecruiter.GetAJobApplication(
          postId,
          applicationId.toString(),
          "vi"
        )) as unknown as INotification;

        if (res && res.code === 200) {
          window.open(
            `candidate-detail/${res?.data?.applicationProfile.account_id}?post-id=${postId}&application_id=${applicationId}`,
            "_parent"
          );
        }
      };

      fetchData();
    }
    if (typeText === "applicator") {
      window.open(`post-detail/${postId}`, "_parent");
    }
    if (typeText === "communicationComment") {
      window.open(`detail-community?post-community=${commentId}`, "_parent");
    }
  };

  const handleRedirect = () => {
    if (!profile?.companyInfomation) {
      setTabMenu(false);
      setOpenModalNoteCreateCompany(true);
      return;
    }
    if (profile && profile.roleData === 3) {
      // logEvent(analytics, "select_post_recruitment");
      setTabMenu(false);
      router.push("/banner-recruiter");
    } else {
      toast.warning("Vui lòng đăng nhập bằng tài khoản tuyển dụng", {
        position: "bottom-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
      setOpenModalLogin(true);
    }
  };

  const IOSSwitch = styled((props: SwitchProps) => (
    <Switch
      focusVisibleClassName=".Mui-focusVisible"
      disableRipple
      {...props}
    />
  ))(({ theme }) => ({
    width: 42,
    height: 26,
    padding: 0,
    "& .MuiSwitch-switchBase": {
      padding: 0,
      margin: 2,
      transitionDuration: "300ms",
      "&.Mui-checked": {
        transform: "translateX(16px)",
        color: "#fff",
        "& + .MuiSwitch-track": {
          backgroundColor:
            theme.palette.mode === "dark" ? "#2ECA45" : "#65C466",
          opacity: 1,
          border: 0,
        },
        "&.Mui-disabled + .MuiSwitch-track": {
          opacity: 0.5,
        },
      },
      "&.Mui-focusVisible .MuiSwitch-thumb": {
        color: "#33cf4d",
        border: "6px solid #fff",
      },
      "&.Mui-disabled .MuiSwitch-thumb": {
        color:
          theme.palette.mode === "light"
            ? theme.palette.grey[100]
            : theme.palette.grey[600],
      },
      "&.Mui-disabled + .MuiSwitch-track": {
        opacity: theme.palette.mode === "light" ? 0.7 : 0.3,
      },
    },
    "& .MuiSwitch-thumb": {
      boxSizing: "border-box",
      width: 22,
      height: 22,
    },
    "& .MuiSwitch-track": {
      borderRadius: 26 / 2,
      backgroundColor: theme.palette.mode === "light" ? "#E9E9EA" : "#39393D",
      opacity: 1,
      transition: theme.transitions.create(["background-color"], {
        duration: 500,
      }),
    },
  }));

  const handleOnchangeSearch = async (e: any) => {
    if (profile.isSearch === 1) {
      setOpenModalTurnOffStatus(true);
    } else {
      await profileAPi.putProfileJobV3(null, 1);
      dispatch(fetchProfile("vi") as any);
    }
  };

  const handleCancel = () => {
    setOpenModalTurnOffStatus(false);
  };

  const handleTurnOff = async () => {
    const res = (await profileAPi.putProfileJobV3(
      null,
      0
    )) as unknown as ITurnOffSerach;
    if (res && res.statusCode === 200) {
      setOpenModalTurnOffStatus(false);
      dispatch(fetchProfile("vi") as any);
    }
  };

  const handleSearch = (keyword?: string) => {
    if (keyword) {
      localStorage.setItem(
        "dataRequest",
        JSON.stringify({ ...dataRequest, q: keyword })
      );
    } else {
      localStorage.setItem("dataRequest", JSON.stringify({ ...dataRequest }));
    }

    dispatch(
      fetchSearchResult({
        q: keyword ? keyword : dataRequest.q ? dataRequest.q.trim() : null,
        page: 0,
        moneyType: dataRequest.money_type ? dataRequest.money_type : null,
        isWorkingWeekend: dataRequest.is_working_weekend
          ? dataRequest.is_working_weekend
          : null,
        isDatePeriod: dataRequest.is_date_period
          ? dataRequest.is_date_period
          : null,
        salaryMin: dataRequest.salary_min ? dataRequest.salary_min : 0,
        salaryMax: dataRequest.salary_max ? dataRequest.salary_max : null,
        jobTypeId: dataRequest.jobTypeId ? [dataRequest.jobTypeId] : [],
        categoryIds: dataRequest.category_ids ? dataRequest.category_ids : null,
        districtIds: dataRequest.district_ids ? dataRequest.district_ids : null,
        salaryType: dataRequest.salary_type ? dataRequest.salary_type : null,
        lang: "vi",
      }) as unknown as any
    ).then(() => {
      router.push("/search-result");
    });
  };

  const handleModifyPassword = () => {
    setOpenModalProfile(false);
    router.push("/update-password");
  };

  React.useEffect(() => {
    if (socket.current === undefined && localStorage.getItem("accessToken")) {
      socket.current = io("http://localhost:8888", {
        extraHeaders: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      });

      socket.current.on("connect", () => {
        // console.log('ket noi thanh cong');
      });
    }
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      const res = await searchApi.getSuggestKeyWord(
        10,
        language === 1 ? "vi" : "en"
      );

      setDataSuggest(res && res.data);
    };

    fetchData();
  }, []);

  return (
    <>
      <div className="h-20 relative" ref={ref_menu}>
        <div className="fixed z-50 w-full bg-white border-b-2 flex flex-col items-center justify-center">
          <nav className="w-full max-w-full h-20 flex items-center justify-between z-30 px-6 gap-x-2">
            <div
              className={`flex justify-between flex-1 ${reponsiveMobile ? "" : ""
                }`}
            >
              <div className="flex justify-between">
                <Image
                  onClick={() => {
                    window.location.href = "/";
                  }}
                  style={{ cursor: "pointer" }}
                  alt="logo"
                  className="w-24"
                  width="500"
                  height="500"
                  src="/logo/2023.png"
                />
                <div
                  className={`flex font-semibold cursor-pointer text-black ${searchActive || reponsiveMobile < 1350 ? "hidden" : ""
                    }`}
                >
                  <div className="flex p-8 gap-x-1 items-center  relative  hover:text-blue-500 group">
                    <MdWork />
                    <h1>Việc làm</h1>
                    <div className="p-6 rounded-xl invisible opacity-0 group-hover:visible bg-slate-100 absolute top-full -mt-4 shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px] w-max text-black flex group-hover:opacity-100 transition-all flex-col gap-y-2">
                      <div>
                        <h2 className="">Việc làm mới</h2>
                      </div>
                      <div>
                        <h2 className="">Việc làm mới</h2>
                      </div>
                      <div>
                        <h2 className="">Việc làm mới</h2>
                      </div>
                    </div>
                  </div>
                  <div className="flex p-8 gap-x-1 items-center relative  hover:text-blue-500 group">
                    <FaBuilding />
                    <h1>Công ty</h1>
                    <div className="p-6 rounded-xl invisible opacity-0 group-hover:visible bg-slate-100 absolute top-full -mt-4 shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px] w-max text-black flex group-hover:opacity-100 transition-all flex-col gap-y-2">
                      <div>
                        <h2 className="">Việc làm mới</h2>
                      </div>
                      <div>
                        <h2 className="">Việc làm mới</h2>
                      </div>
                      <div>
                        <h2 className="">Việc làm mới</h2>
                      </div>
                    </div>
                  </div>
                  <div className="flex p-8 gap-x-1 items-center  hover:text-blue-500 group relative">
                    <FaHeart />
                    <h1>Việc làm của bạn</h1>
                    <div className="p-6 rounded-xl invisible opacity-0 group-hover:visible bg-slate-100 absolute top-full -mt-4 shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px] w-max text-black flex group-hover:opacity-100 transition-all flex-col gap-y-2">
                      <div>
                        <h2 className="">Việc làm mới</h2>
                      </div>
                      <div>
                        <h2 className="">Việc làm mới</h2>
                      </div>
                      <div>
                        <h2 className="">Việc làm mới</h2>
                      </div>
                    </div>
                  </div>
                  <div className="flex p-8 gap-x-1 items-center  hover:text-blue-500 group relative">
                    <IoDocumentText />
                    <h1>Hồ sơ CV</h1>
                    <div className="p-6 rounded-xl invisible opacity-0 group-hover:visible bg-slate-100 absolute top-full -mt-4 shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px] w-max text-black flex group-hover:opacity-100 transition-all flex-col gap-y-2">
                      <div>
                        <h2 className="">Việc làm mới</h2>
                      </div>
                      <div>
                        <h2 className="">Việc làm mới</h2>
                      </div>
                      <div>
                        <h2 className="">Việc làm mới</h2>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div
                className={`${searchActive || reponsiveMobile < 1350 ? "flex-1" : "w-32"
                  }  flex items-center relative transition-all duration-500`}
              >
                <div
                  className={`
                  ${searchActive ? "absolute w-full right-0" : "w-full"}
                  ${scrollPositionSearch && reponsiveMobile > 580
                      ? ""
                      : "invisible opacity-0"
                    } transition-all duration-500  flex items-center`}
                >
                  <SearchAllComponent setSearchActive={setSearchActive} />
                </div>
              </div>
            </div>

            <div className="flex gap-x-2">
              <div
                className={`flex items-center border-l-2 ${reponsiveMobile < 768 ? "hidden" : ""
                  }`}
              >
                <button className="font-extrabold px-4 text-blue-600 hover:text-red-500 uppercase">
                  Nhà tuyển dụng
                </button>
              </div>
              <div
                className={`${reponsiveMobile > 1350
                    ? "shadow-[0px_5px_20px_10px_#00000024]"
                    : ""
                  } flex items-center gap-x-4 rounded-3xl ml-2 border-black py-2 px-4`}
              >
                {reponsiveMobile > 1350 ? (
                  !profileData ? (
                    <>
                      <div>
                        <div className="flex rounded-l-3xl justify-center cursor-pointer  overflow-hidden p-3 items-center hover:bg-white font-bold hover:text-blue-500">
                          <FaUserEdit />

                          <h2 className="ml-1">Đăng Kí</h2>
                        </div>
                      </div>
                      <div>
                        <div className="flex rounded-l-3xl justify-center cursor-pointer  overflow-hidden p-3 items-center hover:bg-white font-bold hover:text-blue-500">
                          <FaUser />

                          <h2 className="ml-1">Đăng Nhập</h2>
                        </div>
                      </div>
                    </>
                  ) : (
                    <div className="flex gap-x-4">
                      <div className="rounded-full p-2 bg-black cursor-pointer hover:bg-blue-500">
                        <IoMdNotifications color="white" fontSize="1.5em" />
                      </div>
                      <div className="rounded-full p-2 bg-black cursor-pointer  hover:bg-blue-500">
                        <AiFillMessage color="white" fontSize="1.5em" />
                      </div>
                      <div className="rounded-full p-2 bg-black cursor-pointer relative  hover:bg-blue-500">
                        <IoMdSettings color="white" fontSize="1.5em" />
                        {/* <div className="absolute top-full translate-y-2 right-0 w-60 h-fit p-2 bg-white rounded-lg shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px]">
                          <div>
                            <Image alt="" src={""} width={100} height={100} />
                            <div>
                              <p>Khoa</p>
                              <p>khoanono@gmail.com</p>
                            </div>
                            <div>Hồ sơ</div>
                          </div>
                        </div> */}
                      </div>
                    </div>
                  )
                ) : (
                  <>
                    <div
                      className={`rounded-full ${onMenuAll || reponsiveMobile < 768
                          ? "-translate-x-[5px]"
                          : ""
                        } p-2 bg-black cursor-pointer relative z-[50] hover:bg-blue-500`}
                      onClick={() => {
                        setOnMenuAll(!onMenuAll);
                      }}
                    >
                      {!onMenuAll ? (
                        <RiMenuFill color="white" fontSize="1.5em" />
                      ) : (
                        <RiCloseFill color="white" fontSize="1.5em" />
                      )}
                    </div>

                    <div
                      className={`bg-white fixed inset-y-0 transition-all duration-300 ${reponsiveMobile > 1152
                          ? onMenuAll
                            ? " left-2/3"
                            : "left-full"
                          : reponsiveMobile <= 580
                            ? onMenuAll
                              ? " left-0"
                              : "left-full"
                            : onMenuAll
                              ? " left-1/4"
                              : "left-full"
                        }  shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px] z-[41] right-0`}
                    >
                      <div
                        className={`mt-16 px-2 ${reponsiveMobile > 580 ? "hidden" : ""
                          }`}
                      >
                        <SearchAllComponent />
                      </div>
                      <div className=""></div>
                    </div>
                    <div
                      className={`inset-0 ${onMenuAll ? "opacity-100" : "invisible opacity-0"
                        } fixed transition-all duration-300 bg-black/50 z-40`}
                      onClick={() => {
                        setOnMenuAll(!onMenuAll);
                      }}
                    ></div>
                  </>
                )}
              </div>
            </div>
          </nav>
          {/* <FilterComponent
            dataRequest={dataRequest}
            setDataRequest={setDataRequest}
            checkReponsive={checkReponsive}
            tabSearchFilter={tabFilter}
            setTabFilter={setTabFilter}
          /> */}
        </div>
        {/* {checkNav && checkPageLoad && (
          <div
            className={`w-full bg-white z-20 flex justify-center fixed top-20 border-b-2 transition-all duration-700 ${
              !checkScroll && "-translate-y-28"
            }`}
          >
            <NavbarComponent />
          </div>
        )} */}

        <Modal
          width={614}
          centered
          title={
            <h3
              style={{
                fontFamily: "Roboto",
                fontSize: "24px",
                lineHeight: "24px",
                letterSpacing: "0em",
                textAlign: "left",
              }}
            >
              {language === 1
                ? `Tắt trạng thái tìm việc`
                : `Turn off job search status`}
            </h3>
          }
          footer={null}
          open={openModalTurnOffStatus}
          // onOk={handleOk}
          onCancel={handleCancel}
        >
          <p
            style={{
              fontFamily: "Roboto",
              fontSize: "16px",
              fontWeight: "400",
              lineHeight: "24px",
              letterSpacing: "0.5px",
              textAlign: "left",
            }}
          >
            {language === 1
              ? `Sau khi tắt tìm kiếm việc làm, Nhà tuyển dụng có thể không tìm thấy
            bạn và cơ hội tìm được công việc phù hợp với bạn sẽ giảm đi.`
              : `After turning off job search, Employers may not be found
            you and your chances of finding the right job for you will decrease.`}
          </p>
          <div className="share-buttons-choose-cv-modal">
            <Button
              type="default"
              style={{
                backgroundColor: "#d4a650",
                marginRight: "10px",
              }}
              shape="round"
              onClick={handleTurnOff}
            >
              {language === 1 ? `Tắt` : `Off`}
            </Button>
            <Button type="default" shape="round" onClick={handleCancel}>
              {language === 1 ? `Hủy` : `Cancel`}
            </Button>
          </div>
        </Modal>

        <ModalLogin
          isOpen={openModalLogin}
          handleToggleModal={handleToggleModal}
        />
      </div>
      <ModalNoteCreateCompany
        openModalNoteCreateCompany={openModalNoteCreateCompany}
        setOpenModalNoteCreateCompany={setOpenModalNoteCreateCompany}
      />
    </>
  );
};

export default MenuComponent;
