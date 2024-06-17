/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import Link from "next/link";
import React, { useRef } from "react";
import Image from "next/image";
import "./MenuUser.scss";
import { useState, useEffect } from "react";
import NavbarComponent from "../../NavbarComponent/NavbarComponent";
import { useSrollContext } from "@/context/AppProvider";
import FilterComponent from "../../FilterComponent/FilterComponent";
import { getCookie, setCookie } from "@/cookies";
import jobApi from "../../../api/job/jobApi";
import numeral from "numeral";
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
import { MdEditDocument, MdWork } from "react-icons/md";
import { CiLogout } from "react-icons/ci";

import { IoMdNotifications } from "react-icons/io";
import { AiFillDashboard, AiFillMessage } from "react-icons/ai";
import { IoMdSettings } from "react-icons/io";
import SearchAllComponent from "../../SearchAllComponent/SearchAllComponent";
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
import ModalNoteCreateCompany from "../../ModalNoteCreateCompany";
import AssistantPhotoIcon from "@mui/icons-material/AssistantPhoto";
import searchApi from "@/api/search/apiSearch";
import ManageSearchIcon from "@mui/icons-material/ManageSearch";
import { useLocation } from "react-router-dom";
import axiosClient from "@/configs/axiosClient";
import ModalBG from "@/util/ModalBG/ModalBG";
import ShortText from "@/util/ShortText";

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
  const {
    scrollPosition,
    checkPage,
    handleLoadHrefPage,
    reponsiveMobile,
    positionScrollJob,
    setSelectItemProfileUser,
    setSelectProfileUser,
    setCheckPage,
  } = useSrollContext();
  const [tabMenuChoose, setTabMenuChoose] = useState<any>(0);
  const { handleShortTextHome } = ShortText();
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
  const { handlePersistGateLoaded } = useSrollContext();
  const [tabNotify, setTabNotify] = useState<boolean>(false);
  const [tabSuggest, setTabSuggest] = useState<boolean>(false);
  const [profileData, setProfileData] = useState<any>({});
  const profile = useSelector((state: any) => state.profile.profile);
  const [openModalProfile, setOpenModalProfile] = useState<boolean>(false);
  const [dataNotification, setDataNotification] = useState<any>([]);
  const dispatch = useDispatch();
  const [tabMenu, setTabMenu] = useState<boolean>(false);
  const router = useRouter();
  const [openModalTurnOffStatus, setOpenModalTurnOffStatus] = useState(false);
  const language = useSelector((state: any) => state.changeLaguage.language);
  const [openModalNoteCreateCompany, setOpenModalNoteCreateCompany] =
    React.useState(false);
  const [scrollPositionSearch, setScrollPositionSearch] = useState<any>(false);
  const [searchActive, setSearchActive] = useState<boolean>(false);
  const [onMenuAll, setOnMenuAll] = useState<boolean>(false);
  const [selectionMenu, setSelectionMenu] = useState<number>(0);
  useEffect(() => {
    //console.log(profile);
  }, [profile]);

  useEffect(() => {
    if (typeof document !== "undefined") {
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
    }
  }, [onMenuAll, document]);

  useEffect(() => {
    // //console.log(scrollPositionSearch);
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
    //console.log(profileData);
  }, [profileData]);
  useEffect(() => {
    dispatch(fetchProfile(language === 1 ? "vi" : "en") as any);
  }, [language]);
  useEffect(() => {
    if (typeof document !== "undefined") {
      const handleBlurTab = (e: any) => {
        if (tabNotify && !ref_btn_notify.current.contains(e.target)) {
          setTabNotify(false);
        }
      };
      document.addEventListener("click", handleBlurTab);
      return () => {
        document.removeEventListener("click", handleBlurTab);
      };
    }
  }, [tabNotify, document]);
  useEffect(() => {
    if (typeof document !== "undefined") {
      const handleBlurTab = (e: any) => {
        if (tabMenu && !ref_btn_menu.current?.contains(e.target)) {
          setTabMenu(false);
        }
      };
      document.addEventListener("click", handleBlurTab);
      return () => {
        document.removeEventListener("click", handleBlurTab);
      };
    }
  }, [tabMenu, document]);
  useEffect(() => {
    if (typeof document !== "undefined") {
      const handleBlurTab = (e: any) => {
        if (tabSuggest && !ref_input.current?.contains(e.target)) {
          setTabSuggest(false);
        }
      };
      document.addEventListener("click", handleBlurTab);
      return () => {
        document.removeEventListener("click", handleBlurTab);
      };
    }
  }, [tabSuggest, document]);
  useEffect(() => {
    if (typeof document !== "undefined") {
      const handleBlurTab = (e: any) => {
        if (openModalProfile && !ref_btn_profile.current.contains(e.target)) {
          setOpenModalProfile(false);
        }
      };
      document.addEventListener("click", handleBlurTab);
      return () => {
        document.removeEventListener("click", handleBlurTab);
      };
    }
  }, [openModalProfile, document]);
  useEffect(() => {
    //console.log(profile);
    setProfileData(profile);
  }, [profile]);
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
    console.log("bấm");
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
        // //console.log('ket noi thanh cong');
      });
    }
  }, []);

  useEffect(() => {
    const fetchData = async () => {};

    fetchData();
  }, []);

  return (
    <>
      <div className={`h-20 `} ref={ref_menu}>
        <div
          className={`fixed z-50  w-full transition-all duration-700 ${
            !scrollPositionSearch && checkPage === "/"
              ? " bg-transparent text-white border-transparent"
              : "bg-white"
          }  border-b-2 flex flex-col items-center justify-center`}
        >
          <nav className="w-full max-w-full h-20 flex items-center justify-between z-30 px-6 gap-x-2">
            <div
              className={`flex justify-between flex-1 ${
                reponsiveMobile ? "" : ""
              }`}
            >
              <div className="flex justify-between">
                <div
                  onClick={() => {
                    router.push("/");
                    handlePersistGateLoaded();
                    setCheckPage("/");
                  }}
                >
                  {!scrollPositionSearch && checkPage === "/" ? (
                    <Image
                      style={{ cursor: "pointer" }}
                      alt="logo"
                      className="w-24 scale-125"
                      width="500"
                      height="500"
                      src="/logo/2024it.png"
                    />
                  ) : (
                    <Image
                      style={{ cursor: "pointer" }}
                      alt="logo"
                      className="w-24 scale-125"
                      width="500"
                      height="500"
                      src="/logo/2023.png"
                    />
                  )}
                </div>

                <div
                  className={`flex font-semibold gap-x-2 cursor-pointer  ${
                    searchActive || reponsiveMobile < 1350 ? "hidden" : ""
                  }`}
                >
                  <div className="flex p-8 gap-x-1 items-center  relative  hover:text-blue-500 group ">
                    <MdWork />
                    <h1>Việc làm</h1>
                    <div className="px-8 py-6 font-medium rounded-xl invisible opacity-0 group-hover:visible bg-slate-100 absolute top-full -mt-4 shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px] w-max text-black flex group-hover:opacity-100 transition-all flex-col gap-y-3">
                      <div
                        onClick={() => {
                          if (checkPage === "/") {
                            positionScrollJob[0]?.scrollIntoView({
                              behavior: "smooth",
                            });
                          } else {
                            router.push("/");
                            setCheckPage("/");
                          }
                        }}
                      >
                        <h2 className="hover:text-blue-800">
                          Công việc nổi bật
                        </h2>
                      </div>
                      <div
                        onClick={() => {
                          if (checkPage === "/") {
                            positionScrollJob[1]?.scrollIntoView({
                              behavior: "smooth",
                            });
                          } else {
                            router.push("/");
                            setCheckPage("/");
                          }
                        }}
                      >
                        <h2 className="hover:text-blue-800">Việc làm mới</h2>
                      </div>
                      <div
                        onClick={() => {
                          if (checkPage === "/") {
                            positionScrollJob[2]?.scrollIntoView({
                              behavior: "smooth",
                            });
                          } else {
                            router.push("/");
                            setCheckPage("/");
                          }
                        }}
                      >
                        <h2 className="hover:text-blue-800">
                          Công việc chủ đề
                        </h2>
                      </div>
                      <div
                        onClick={() => {
                          setSelectItemProfileUser(2);
                          setSelectProfileUser(4);
                          if (checkPage !== "/profile") router.push("/profile");
                        }}
                      >
                        <h2 className="hover:text-blue-800">Việc làm đã lưu</h2>
                      </div>
                    </div>
                  </div>
                  <div className="flex p-8 gap-x-1 items-center relative  hover:text-blue-500 group">
                    <FaBuilding />
                    <h1>Công ty</h1>
                    <div className="px-8 py-6 font-medium rounded-xl invisible opacity-0 group-hover:visible bg-slate-100 absolute top-full -mt-4 shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px] w-max text-black flex group-hover:opacity-100 transition-all flex-col gap-y-3">
                      <div
                        onClick={() => {
                          // if (checkPage === "/") {
                          //   positionScrollJob[3].scrollIntoView({
                          //     behavior: "smooth",
                          //   });
                          // } else {
                          //   router.push("/");
                          //   setCheckPage("/");
                          // }
                        }}
                      >
                        <h2 className="hover:text-blue-800">Công ty nổi bật</h2>
                      </div>
                      <div
                        onClick={() => {
                          router.push("/company-all");
                          setCheckPage("/company-all");
                        }}
                      >
                        <h2 className="hover:text-blue-800">Các công ty</h2>
                      </div>
                    </div>
                  </div>
                  <div className="flex p-8 gap-x-1 items-center  hover:text-blue-500 group relative">
                    <FaHeart />
                    <h1>Blog</h1>
                    <div className="px-8 py-6 font-medium rounded-xl invisible opacity-0 group-hover:visible bg-slate-100 absolute top-full -mt-4 shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px] w-max text-black flex group-hover:opacity-100 transition-all flex-col gap-y-3">
                      <div
                        onClick={() => {
                          router.push("/blog");
                          setCheckPage("/blog");
                        }}
                      >
                        <h2 className="hover:text-blue-800">Các bài viết</h2>
                      </div>
                      <div
                        onClick={() => {
                          router.push("/community-create");
                          setCheckPage("/community-create");
                        }}
                      >
                        <h2 className="hover:text-blue-800">Tạo bài viết</h2>
                      </div>
                      {/* <div>
                        <h2 className="">Việc làm mới</h2>
                      </div>
                      <div>
                        <h2 className="">Việc làm mới</h2>
                      </div> */}
                    </div>
                  </div>
                  <div className="flex p-8 gap-x-1 items-center  hover:text-blue-500 group relative">
                    <IoDocumentText />
                    <h1>Hồ sơ CV</h1>
                    <div className="px-8 py-6 font-medium rounded-xl invisible opacity-0 group-hover:visible bg-slate-100 absolute top-full -mt-4 shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px] w-max text-black flex group-hover:opacity-100 transition-all flex-col gap-y-3">
                      <div
                        onClick={() => {
                          if (profile) {
                            router.push("/manage-cv");
                            // window.location.href = "/manage-cv";
                          } else {
                            router.push("");
                          }
                        }}
                      >
                        <h2 className="hover:text-blue-800">Quản lý hồ sơ</h2>
                      </div>
                      <div
                        onClick={() => {
                          router.push("/cv-all");
                        }}
                      >
                        <h2 className="hover:text-blue-800">Tạo mới CV</h2>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div
                className={`${
                  searchActive || reponsiveMobile < 1350 ? "flex-1" : "w-32"
                }  flex items-center relative transition-all duration-500 justify-end`}
              >
                <div
                  className={`
                  ${searchActive ? "absolute w-full right-0" : "w-full"}
                  ${
                    scrollPositionSearch &&
                    reponsiveMobile > 580 &&
                    checkPage !== "/search-result"
                      ? ""
                      : "invisible opacity-0"
                  } transition-all duration-300 justify-end  flex items-center`}
                >
                  <SearchAllComponent setSearchActive={setSearchActive} />
                </div>
              </div>
            </div>

            <div className="flex gap-x-2">
              <div
                className={`flex items-center border-l-2 ${
                  reponsiveMobile < 768 ? "hidden" : ""
                }`}
              >
                <button
                  className="font-extrabold px-4 text-blue-600 hover:text-red-500 uppercase"
                  onClick={() => {
                    router.push("/recruiter");
                  }}
                >
                  Nhà tuyển dụng
                </button>
              </div>
              <div
                className={`${reponsiveMobile > 1350 ? "  " : ""} ${
                  !profileData
                    ? "hover:bg-blue-700 bg-blue-500 hover:shadow-[0_8px_30px_rgb(0,0,0,0.12)]"
                    : "shadow-[0_8px_30px_rgb(0,0,0,0.12)]"
                } flex items-center gap-x-4 rounded-3xl ml-2 border-black py-2 px-4`}
              >
                {reponsiveMobile > 1350 ? (
                  Object.keys(profileData).length === 0 ? (
                    <>
                      <div>
                        <div
                          className={`flex rounded-l-3xl justify-center cursor-pointer  overflow-hidden p-1 items-center transition-all duration-500 font-bold  ${
                            scrollPositionSearch ? "text-black" : "text-white"
                          }`}
                          onClick={() => {
                            window.location.href = "/login";
                            // router.push("/candidate/login");
                          }}
                        >
                          <FaUser />

                          <h2 className="ml-1">Đăng Nhập</h2>
                        </div>
                      </div>
                    </>
                  ) : (
                    <div className="flex gap-x-4">
                      <div
                        className={`rounded-full p-2 bg-black cursor-pointer relative  ${
                          selectionMenu === 1 ? "" : "hover:bg-gray-700"
                        }`}
                        onClick={() => {
                          if (selectionMenu === 1) {
                            setSelectionMenu(0);
                          } else setSelectionMenu(1);
                        }}
                      >
                        <IoMdNotifications
                          color={` ${
                            selectionMenu === 1 ? "#2563eb" : "white"
                          }`}
                          fontSize="1.5em"
                        />
                        <div
                          className={`flex flex-col gap-y-4 absolute text-black ${
                            selectionMenu === 1
                              ? "h-fit opacity-100"
                              : "opacity-0 invisible"
                          } top-full transition-all translate-y-2 right-0 w-96 overflow-hidden duration-300 px-4 py-6 bg-white rounded-lg shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px]`}
                          // onClick={(e: any) => {
                          //   e.stopPropagation();
                          // }}
                        >
                          {dataNotification &&
                            dataNotification?.map(
                              (notificate: any, index: number) => {
                                return (
                                  <div
                                    key={index}
                                    className={`wrap-notificate_system ${
                                      notificate.data.isRead === false
                                        ? `bg-orange-100`
                                        : ""
                                    }`}
                                    onClick={() => {
                                      handleClickNoty(
                                        notificate.data.postId,
                                        notificate.data.communicationId,
                                        notificate.data.applicationId,
                                        notificate.data.typeText
                                      );
                                    }}
                                  >
                                    <h3>{notificate.content_app.title}</h3>
                                    <h5
                                      dangerouslySetInnerHTML={{
                                        __html: notificate.content_app.body,
                                      }}
                                    />
                                    <div className="wrap-time">
                                      <p>
                                        {new Date(
                                          notificate.data.createdAt
                                        ).toLocaleTimeString([], {
                                          hour: "2-digit",
                                          minute: "2-digit",
                                        })}
                                      </p>
                                      <p>
                                        {new Date(
                                          notificate.data.createdAt
                                        ).toLocaleDateString("en-GB")}
                                      </p>
                                    </div>
                                  </div>
                                );
                              }
                            )}
                          {dataNotification === undefined && (
                            <div>Chưa có thông báo</div>
                          )}
                        </div>
                      </div>
                      <div
                        className={`rounded-full p-2 bg-black cursor-pointer relative  ${
                          selectionMenu === 2 ? "" : "hover:bg-gray-700"
                        }`}
                        onClick={() => {
                          if (selectionMenu === 2) {
                            setSelectionMenu(0);
                          } else setSelectionMenu(2);
                          router.push("/chat");
                        }}
                      >
                        <AiFillMessage
                          color={` ${
                            selectionMenu === 2 ? "#2563eb" : "white"
                          }`}
                          fontSize="1.5em"
                        />
                        {/* <div
                          className={`flex flex-col gap-y-4 absolute  pointer-events-none ${
                            selectionMenu === 2
                              ? "h-fit opacity-100"
                              : "opacity-0"
                          } top-full transition-all translate-y-2 right-0 w-96 overflow-hidden duration-300 px-4 py-6 bg-white rounded-lg shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px]`}
                        >
                          Chat
                        </div> */}
                      </div>
                      <div
                        className={`rounded-full p-2 cursor-pointer transition-all text-black bg-black duration-300 relative  ${
                          selectionMenu === 3 ? "" : "hover:bg-gray-700 "
                        }`}
                        onClick={() => {
                          if (selectionMenu === 3) {
                            setSelectionMenu(0);
                          } else setSelectionMenu(3);
                        }}
                      >
                        <IoMdSettings
                          color={` ${
                            selectionMenu === 3 ? "#2563eb" : "white"
                          }`}
                          fontSize="1.5em"
                        />
                        <div
                          className={`flex flex-col gap-y-4 absolute  pointer-events-none ${
                            selectionMenu === 3
                              ? "h-fit opacity-100 visible"
                              : "opacity-0 invisible"
                          } top-full transition-all translate-y-2 right-0 w-96 overflow-hidden duration-300 px-4 py-6 bg-white rounded-lg shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px]`}
                        >
                          <div className="flex items-center justify-between">
                            <Image
                              className="shadow-sm rounded-full"
                              alt=""
                              src={profile?.avatarPath}
                              width={50}
                              height={50}
                            />
                            <div>
                              <p className="font-semibold capitalize text-blue-500">
                                {handleShortTextHome(profile?.name, 12)}
                              </p>
                              <p className="text-xs font-medium capitalize text-gray-400 w-36 break-words">
                                {handleShortTextHome(profile?.email, 12)}
                              </p>
                            </div>
                            <div
                              className="rounded-xl font-semibold border-blue-700 text-xs text-blue-700 hover:bg-blue-100 p-2 border-[1px] pointer-events-auto"
                              onClick={() => {
                                router.push("/profile");
                              }}
                            >
                              Cập nhật hồ sơ
                            </div>
                          </div>
                          <div className="flex flex-col gap-y-2">
                            <div
                              className="flex items-center py-2 pl-4 transition-all duration-300 w-full border-2 hover:border-blue-600 border-transparent hover:font-semibold hover:bg-blue-100 rounded-lg pointer-events-auto"
                              onClick={() => {
                                setSelectProfileUser(1);
                                if (checkPage !== "/profile")
                                  router.push("/profile");
                              }}
                            >
                              <AiFillDashboard />
                              <p className="ml-2">Tổng quan</p>
                            </div>
                            <div
                              className="flex items-center py-2 pl-4 transition-all duration-300 w-full border-2 hover:border-blue-600 border-transparent hover:font-semibold hover:bg-blue-100 rounded-lg pointer-events-auto"
                              onClick={() => {
                                setSelectProfileUser(2);
                                if (checkPage !== "/profile")
                                  router.push("/profile");
                              }}
                            >
                              <MdEditDocument />
                              <p className="ml-2">Hồ sơ cá nhân</p>
                            </div>
                            <div
                              className="flex items-center py-2 pl-4 transition-all duration-300 w-full border-2 hover:border-blue-600 border-transparent hover:font-semibold hover:bg-blue-100 rounded-lg pointer-events-auto"
                              onClick={() => {
                                setSelectProfileUser(3);
                                if (checkPage !== "/profile")
                                  router.push("/profile");
                              }}
                            >
                              <FaBuilding />
                              <p className="ml-2">Công ty của tôi</p>
                            </div>
                            <div
                              className="flex items-center py-2 pl-4 transition-all duration-300 w-full border-2 hover:border-blue-600 border-transparent hover:font-semibold hover:bg-blue-100 rounded-lg pointer-events-auto"
                              onClick={() => {
                                setSelectProfileUser(4);
                                if (checkPage !== "/profile")
                                  router.push("/profile");
                              }}
                            >
                              <MdWork />
                              <p className="ml-2">Việc làm của tôi</p>
                            </div>
                            <div
                              className="flex items-center py-2 pl-4 transition-all duration-300 w-full border-2 hover:border-blue-600 border-transparent hover:font-semibold hover:bg-blue-100 rounded-lg pointer-events-auto"
                              onClick={() => {
                                setSelectProfileUser(5);
                                if (checkPage !== "/profile")
                                  router.push("/profile");
                              }}
                            >
                              <IoMdSettings />
                              <p className="ml-2">Quản lý tài khoản</p>
                            </div>
                            <div className="flex items-center py-2 pl-4 transition-all duration-300 w-full border-2 hover:border-blue-600 border-transparent hover:font-semibold hover:bg-blue-100 rounded-lg pointer-events-auto">
                              <CiLogout />
                              <p className="ml-2">Đăng xuất</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )
                ) : (
                  <>
                    <div
                      className={`rounded-full ${
                        onMenuAll || reponsiveMobile < 768
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
                      className={`bg-white fixed inset-y-0 transition-all duration-300 ${
                        reponsiveMobile > 1152
                          ? onMenuAll
                            ? " left-2/3"
                            : "left-full opacity-0"
                          : reponsiveMobile <= 580
                          ? onMenuAll
                            ? " left-0"
                            : "left-full opacity-0"
                          : onMenuAll
                          ? " left-1/4"
                          : "left-full opacity-0"
                      }  shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px] z-[41] right-0`}
                    >
                      <div className={`flex items-center gap-4 p-4 mt-16`}>
                        <Image
                          className="shadow-sm rounded-full"
                          alt=""
                          src={profile?.avatarPath || "/goapply.png"}
                          width={100}
                          height={100}
                        />
                        <div>
                          <p className="font-semibold text-xl capitalize text-blue-500">
                            {profile?.name}
                          </p>
                        </div>
                      </div>
                      <div
                        className={`px-2 text-black ${
                          reponsiveMobile > 580 ? "hidden" : ""
                        }`}
                      >
                        <SearchAllComponent />
                      </div>
                      <div className={` flex flex-col`}>
                        <div className="hover:bg-gray-50 overflow-hidden">
                          <button
                            className="w-full h-16 text-lg font-semibold text-black flex gap-2 items-center justify-start px-5"
                            onClick={() => {
                              if (tabMenuChoose === 1) {
                                setTabMenuChoose(0);
                              } else {
                                setTabMenuChoose(1);
                              }
                            }}
                          >
                            <MdWork />
                            <p>Việc làm</p>
                          </button>

                          <div
                            className={`flex flex-col font-medium bg-black text-white transition-all duration-500 items-start px-5 ${
                              tabMenuChoose === 1 ? "py-2" : "h-0 opacity-0"
                            }`}
                          >
                            <button
                              className="py-2 hover:text-blue-500"
                              onClick={() => {
                                setOnMenuAll(false);
                                if (checkPage === "/") {
                                  positionScrollJob[0].scrollIntoView({
                                    behavior: "smooth",
                                  });
                                } else {
                                  router.push("/");
                                  setCheckPage("/");
                                }
                              }}
                            >
                              Công việc nổi bật
                            </button>
                            <button
                              className="py-2 hover:text-blue-500"
                              onClick={() => {
                                setOnMenuAll(false);
                                if (checkPage === "/") {
                                  positionScrollJob[1].scrollIntoView({
                                    behavior: "smooth",
                                  });
                                } else {
                                  router.push("/");
                                  setCheckPage("/");
                                }
                              }}
                            >
                              Việc làm mới
                            </button>
                            <button
                              className="py-2 hover:text-blue-500"
                              onClick={() => {
                                setOnMenuAll(false);
                                if (checkPage === "/") {
                                  positionScrollJob[2].scrollIntoView({
                                    behavior: "smooth",
                                  });
                                } else {
                                  router.push("/");
                                  setCheckPage("/");
                                }
                              }}
                            >
                              Công việc chủ đề
                            </button>
                            <button
                              className="py-2 hover:text-blue-500"
                              onClick={() => {
                                setOnMenuAll(false);
                                setSelectItemProfileUser(2);
                                setSelectProfileUser(4);
                                if (checkPage !== "/profile")
                                  router.push("/profile");
                              }}
                            >
                              Việc làm đã lưu
                            </button>
                          </div>
                        </div>
                        <div className="hover:bg-gray-50 overflow-hidden">
                          <button
                            className="w-full h-16 text-lg font-semibold text-black flex gap-2 items-center justify-start px-5"
                            onClick={() => {
                              if (tabMenuChoose === 2) {
                                setTabMenuChoose(0);
                              } else {
                                setTabMenuChoose(2);
                              }
                            }}
                          >
                            <FaBuilding />
                            <p>Công ty</p>
                          </button>

                          <div
                            className={`flex flex-col font-medium bg-black text-white transition-all duration-500 items-start px-5 ${
                              tabMenuChoose === 2 ? "py-2" : "h-0 opacity-0"
                            }`}
                          >
                            <button
                              className="py-2 hover:text-blue-500"
                              onClick={() => {
                                setOnMenuAll(false);
                                if (checkPage === "/") {
                                  positionScrollJob[3].scrollIntoView({
                                    behavior: "smooth",
                                  });
                                } else {
                                  router.push("/");
                                  setCheckPage("/");
                                }
                              }}
                            >
                              Công ty nổi bật
                            </button>
                            <button
                              className="py-2 hover:text-blue-500"
                              onClick={() => {
                                setOnMenuAll(false);
                                router.push("/company-all");
                                setCheckPage("/company-all");
                              }}
                            >
                              Các công ty
                            </button>
                          </div>
                        </div>
                        <div className="hover:bg-gray-50 overflow-hidden">
                          <button
                            className="w-full h-16 text-lg font-semibold text-black flex gap-2 items-center justify-start px-5"
                            onClick={() => {
                              if (tabMenuChoose === 3) {
                                setTabMenuChoose(0);
                              } else {
                                setTabMenuChoose(3);
                              }
                            }}
                          >
                            <FaHeart />
                            <p>Blog</p>
                          </button>

                          <div
                            className={`flex flex-col font-medium bg-black text-white transition-all duration-500 items-start px-5 ${
                              tabMenuChoose === 3 ? "py-2" : "h-0 opacity-0"
                            }`}
                          >
                            <button
                              className="py-2 hover:text-blue-500"
                              onClick={() => {
                                setOnMenuAll(false);
                                router.push("/blog");
                                setCheckPage("/blog");
                              }}
                            >
                              Các bài viết
                            </button>
                            <button
                              className="py-2 hover:text-blue-500"
                              onClick={() => {
                                setOnMenuAll(false);
                                router.push("/community-create");
                                setCheckPage("/community-create");
                              }}
                            >
                              Tạo bài viết
                            </button>
                          </div>
                        </div>
                        <div className="hover:bg-gray-50 overflow-hidden">
                          <button
                            className="w-full h-16 text-lg font-semibold text-black flex gap-2 items-center justify-start px-5"
                            onClick={() => {
                              if (tabMenuChoose === 4) {
                                setTabMenuChoose(0);
                              } else {
                                setTabMenuChoose(4);
                              }
                            }}
                          >
                            <IoDocumentText />
                            <p>Hồ sơ CV</p>
                          </button>

                          <div
                            className={`flex flex-col font-medium bg-black text-white transition-all duration-500 items-start px-5 ${
                              tabMenuChoose === 4 ? "py-2" : "h-0 opacity-0"
                            }`}
                          >
                            <button
                              className="py-2 hover:text-blue-500"
                              onClick={() => {
                                setOnMenuAll(false);
                                if (profile) {
                                  router.push("/manage-cv");
                                  // window.location.href = "/manage-cv";
                                } else {
                                  router.push("");
                                }
                              }}
                            >
                              Quản lý hồ sơ
                            </button>
                            <button
                              className="py-2 hover:text-blue-500"
                              onClick={() => {
                                setOnMenuAll(false);
                                router.push("/cv-all");
                              }}
                            >
                              Tạo mới CV
                            </button>
                          </div>
                        </div>
                        {Object.keys(profileData).length !== 0 ? (
                          <div className="hover:bg-gray-50 overflow-hidden">
                            <button
                              className="w-full h-16 text-lg font-semibold text-black flex gap-2 items-center justify-start px-5"
                              onClick={() => {
                                if (tabMenuChoose === 5) {
                                  setTabMenuChoose(0);
                                } else {
                                  setTabMenuChoose(5);
                                }
                              }}
                            >
                              <IoMdSettings />
                              <p>Thông tin cá nhân</p>
                            </button>

                            <div
                              className={`flex flex-col font-medium bg-black text-white transition-all duration-500 items-start px-5 ${
                                tabMenuChoose === 5 ? "py-2" : "h-0 opacity-0"
                              }`}
                            >
                              <button
                                className="py-2 hover:text-blue-500"
                                onClick={() => {
                                  setOnMenuAll(false);
                                  setSelectProfileUser(1);
                                  if (checkPage !== "/profile")
                                    router.push("/profile");
                                }}
                              >
                                Tổng quan
                              </button>
                              <button
                                className="py-2 hover:text-blue-500"
                                onClick={() => {
                                  setOnMenuAll(false);
                                  setSelectProfileUser(2);
                                  if (checkPage !== "/profile")
                                    router.push("/profile");
                                }}
                              >
                                Hồ sơ cá nhân
                              </button>
                              <button
                                className="py-2 hover:text-blue-500"
                                onClick={() => {
                                  setOnMenuAll(false);
                                  setSelectProfileUser(3);
                                  if (checkPage !== "/profile")
                                    router.push("/profile");
                                }}
                              >
                                Công ty của tôi
                              </button>
                              <button
                                className="py-2 hover:text-blue-500"
                                onClick={() => {
                                  setOnMenuAll(false);
                                  setSelectProfileUser(4);
                                  if (checkPage !== "/profile")
                                    router.push("/profile");
                                }}
                              >
                                Việc làm của tôi
                              </button>
                              <button
                                className="py-2 hover:text-blue-500"
                                onClick={() => {
                                  setOnMenuAll(false);
                                  setSelectProfileUser(5);
                                  if (checkPage !== "/profile")
                                    router.push("/profile");
                                }}
                              >
                                Quản lý tài khoản
                              </button>
                              <button className="py-2 hover:text-blue-500">
                                Đăng xuất
                              </button>
                            </div>
                          </div>
                        ) : (
                          <>
                            <div className="hover:bg-gray-50 overflow-hidden">
                              <button
                                className="w-full h-16 text-lg font-semibold text-black flex gap-2 items-center justify-start px-5"
                                onClick={() => {
                                  window.location.href = "/login";
                                  // router.push("/candidate/login");
                                }}
                              >
                                <FaUser />
                                <p>Đăng nhập</p>
                              </button>
                            </div>
                            <div className="hover:bg-gray-50 overflow-hidden">
                              {/* <button
                            className="w-full h-16 text-lg font-semibold text-black flex gap-2 items-center justify-start px-5"
                            onClick={() => {
                            
                            }}
                          >
                            <FaUser />
                            <p>Đăng ký</p>
                          </button> */}
                            </div>
                          </>
                        )}
                      </div>
                    </div>
                    <div
                      className={`inset-0 ${
                        onMenuAll ? "opacity-100" : "invisible opacity-0"
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
        </div>

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
      </div>
      <ModalNoteCreateCompany
        openModalNoteCreateCompany={openModalNoteCreateCompany}
        setOpenModalNoteCreateCompany={setOpenModalNoteCreateCompany}
      />
      {!(selectionMenu === 0) && <ModalBG setTab={setSelectionMenu} />}
    </>
  );
};

export default MenuComponent;
