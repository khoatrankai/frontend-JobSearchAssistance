import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";
import { GrServices } from "react-icons/gr";

import "./MenuRecruiter.scss";
import { useDispatch, useSelector } from "react-redux";
import { fetchProfileRecruiter } from "@/redux/reducer/profileReducer/profileSliceRecruiter";
import { Router } from "next/router";
import { useRouter } from "next/navigation";
import { AiFillDashboard, AiFillMessage } from "react-icons/ai";
import {
  MdContactSupport,
  MdEditDocument,
  MdNewReleases,
  MdOutlineManageHistory,
  MdWork,
} from "react-icons/md";
import { FaBuilding, FaHeart, FaUser, FaUserTie } from "react-icons/fa";
import { IoIosPricetag, IoMdNotifications, IoMdSettings } from "react-icons/io";
import { CiLogout } from "react-icons/ci";
import { useSrollContext } from "@/context/AppProvider";
import notificationApi from "@/api/notification/notificationApi";
import historyRecruiter from "@/api/history/historyRecruiter";
import ShortText from "@/util/ShortText";
import {
  RiCloseFill,
  RiMenuFill,
  RiMoneyDollarCircleFill,
} from "react-icons/ri";
import { IoDocumentText } from "react-icons/io5";
import { FaListCheck } from "react-icons/fa6";
import CookieCustom from "@/util/CookieCustom";
import ModalBG from "@/util/ModalBG/ModalBG";
import ShowActiveRecruiter from "@/components/ShowActiveRecruiter/ShowActiveRecruiter";
import { PiFlagBannerFill } from "react-icons/pi";

type Props = {};
interface INotification {
  code: number;
  data: any;
}
const MenuRecruiter = (props: Props) => {
  const {
    reponsiveMobile,
    setSelectProfileRecruiter,
    checkPage,
    setTabAlertCatalog,
    setSelectItemProfileRecruiter,
    setIdPostNotify,
    positionScrollJob,
  } = useSrollContext();
  const [selectionMenu, setSelectionMenu] = useState<number>(0);
  const [dataNotification, setDataNotification] = useState<any>([]);
  const { handleShortTextHome, ChangeNumber } = ShortText();
  const [onMenuAll, setOnMenuAll] = useState<boolean>(false);
  const [tabMenuChoose, setTabMenuChoose] = useState<any>(0);
  const { signOutRecruiter } = CookieCustom();
  const dispatch = useDispatch();
  const profile = useSelector((state: any) => state.profileRecruiter.profile);
  const handleClickNoty = async (
    postId: number,
    commentId: number,
    applicationId: number,
    typeText: string,
    notificateId: any
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
          // window.open(
          //   `candidate-detail/${res?.data?.applicationProfile.account_id}?post-id=${postId}&application_id=${applicationId}`,
          //   "_parent"
          // );
          setSelectItemProfileRecruiter(3);
          setSelectProfileRecruiter(3);
          setIdPostNotify(postId);
          router.push("/recruiter/profile");
        }
      };

      fetchData();
    }
    if (typeText === "applicator") {
      window.open(`/recruiter/post-detail/${postId}`, "_parent");
    }
    if (typeText === "communicationComment") {
      window.open(`detail-community?post-community=${commentId}`, "_parent");
    }
    await historyRecruiter.updateNotificationRecruiter(
      notificateId,
      1,
      typeText
    );
    await fetchDataOK();
  };
  useEffect(() => {
    dispatch(fetchProfileRecruiter("vi") as any);
  }, []);
  const fetchDataOK = async () => {
    const res = (await notificationApi.getNotificationRecruiter(
      "vi"
    )) as unknown as INotification;

    if (res && res.code === 200) {
      setDataNotification(res.data);
    }
  };
  useEffect(() => {
    const dataObj = JSON.parse(localStorage.getItem("dataRequest") || "{}");

    const fetchData = async () => {
      const res = (await notificationApi.getNotificationRecruiter(
        "vi"
      )) as unknown as INotification;

      if (res && res.code === 200) {
        setDataNotification(res.data);
      }
    };

    fetchData();
  }, []);
  const router = useRouter();
  return (
    <div className="h-20 ">
      <div className="fixed top-0 inset-x-0 h-20 z-50  flex justify-center gradient-bg-menu">
        <div className="max-w-6xl w-full flex justify-between px-4 items-center ">
          <div className="flex items-center gap-x-12">
            <Image
              onClick={() => {
                window.location.href = "/recruiter";
              }}
              style={{ cursor: "pointer" }}
              alt="logo"
              className="w-20 scale-150"
              width="500"
              height="500"
              src="/logo/2024recruiter.png"
            />
            {reponsiveMobile > 700 && (
              <div className="flex gap-x-8 font-medium text-lg text-white">
                <div
                  className="cursor-pointer"
                  onClick={() => {
                    router.push("/recruiter");
                  }}
                >
                  Giới thiệu
                </div>
                <div
                  className="cursor-pointer"
                  onClick={() => {
                    router.push("/recruiter/product-catalog");
                  }}
                >
                  Báo giá
                </div>
                <div
                  className="cursor-pointer"
                  onClick={() => {
                    if (checkPage === "/recruiter") {
                      positionScrollJob[0]?.scrollIntoView({
                        behavior: "smooth",
                      });
                    } else {
                      router.push("/recruiter");
                    }
                    setSelectionMenu(0);
                  }}
                >
                  Dịch vụ
                </div>
                <div
                  className="cursor-pointer"
                  onClick={() => {
                    router.push("/recruiter/blog");
                  }}
                >
                  Blog
                </div>
                <div
                  className="cursor-pointer"
                  onClick={() => {
                    router.push("/recruiter/help-contact");
                  }}
                >
                  Hỗ trợ
                </div>
                {Object.keys(profile).length !== 0 &&
                  profile.companyInfomation.isActive === 1 && (
                    <div
                      className="cursor-pointer"
                      onClick={() => {
                        if (profile.companyInfomation.isActive === 1)
                          router.push("/recruiter/candidate");
                        else {
                          setTabAlertCatalog(true);
                        }
                      }}
                    >
                      Ứng viên
                    </div>
                  )}
              </div>
            )}
          </div>
          <div
            className={`${reponsiveMobile > 1350 ? "  " : ""} ${
              !profile
                ? "hover:bg-blue-700 bg-blue-500 hover:shadow-[0_8px_30px_rgb(0,0,0,0.12)]"
                : "shadow-[0_8px_30px_rgb(0,0,0,0.12)]"
            } flex items-center gap-x-4 rounded-3xl ml-2 border-black py-2 px-4`}
          >
            {reponsiveMobile > 1350 ? (
              Object.keys(profile).length === 0 ? (
                <>
                  <div>
                    <div
                      className={`flex rounded-l-3xl justify-center cursor-pointer  overflow-hidden p-1 items-center transition-all duration-500 font-bold text-white`}
                      onClick={() => {
                        localStorage.setItem(
                          "backurlrecruiter",
                          window.location.pathname
                        );
                        window.location.href = "/recruiter/login";
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
                      color={` ${selectionMenu === 1 ? "#2563eb" : "white"}`}
                      fontSize="1.5em"
                    />
                    {dataNotification.total_is_not_read > 0 && (
                      <div className="flex justify-center items-center w-5 h-5 absolute bottom-full right-0 bg-red-500 text-xs rounded-full translate-y-2">
                        <p className="text-white">
                          {dataNotification.total_is_not_read}
                        </p>
                      </div>
                    )}

                    <div
                      className={`flex flex-col gap-y-4 absolute text-black ${
                        selectionMenu === 1
                          ? "h-fit opacity-100"
                          : "opacity-0 invisible"
                      } top-full transition-all max-h-64 translate-y-2 right-0 w-96 overflow-hidden duration-300 px-4 py-6 bg-white rounded-lg shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px]`}
                    >
                      <div className="max-h-full overflow-y-scroll flex flex-col gap-4">
                        {dataNotification &&
                          dataNotification?.notifications?.map(
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
                                      notificate.data.typeText,
                                      notificate.data.notificationId
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
                        {(dataNotification === undefined ||
                          dataNotification?.length === 0) && (
                          <div>Chưa có thông báo</div>
                        )}
                      </div>
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
                      router.push("/recruiter/chat");
                    }}
                  >
                    <AiFillMessage
                      color={` ${selectionMenu === 2 ? "#2563eb" : "white"}`}
                      fontSize="1.5em"
                    />
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
                      color={` ${selectionMenu === 3 ? "#2563eb" : "white"}`}
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
                          className="shadow-sm rounded-full w-12 h-12"
                          alt=""
                          src={
                            profile?.companyInfomation?.logoPath ??
                            "/goapply.png"
                          }
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
                            router.push("/recruiter/profile");
                          }}
                        >
                          Cập nhật hồ sơ
                        </div>
                      </div>
                      <div className="flex flex-col gap-y-2">
                        {profile &&
                          profile?.companyInfomation?.isActive === 1 && (
                            <div
                              className="flex items-center py-2 pl-4 transition-all duration-300 w-full border-2 hover:border-blue-600 border-transparent hover:font-semibold hover:bg-blue-100 rounded-lg pointer-events-auto"
                              onClick={() => {
                                setSelectProfileRecruiter(1);
                                if (checkPage !== "/recruiter/profile")
                                  router.push("/recruiter/profile");
                              }}
                            >
                              <AiFillDashboard />
                              <p className="ml-2">Tổng quan</p>
                            </div>
                          )}

                        <div
                          className="flex items-center py-2 pl-4 transition-all duration-300 w-full border-2 hover:border-blue-600 border-transparent hover:font-semibold hover:bg-blue-100 rounded-lg pointer-events-auto"
                          onClick={() => {
                            setSelectProfileRecruiter(2);
                            if (checkPage !== "/recruiter/profile")
                              router.push("/recruiter/profile");
                          }}
                        >
                          <MdEditDocument />
                          <p className="ml-2">Thông tin công ty</p>
                        </div>
                        {profile &&
                          profile?.companyInfomation?.isActive === 1 && (
                            <div
                              className="flex items-center py-2 pl-4 transition-all duration-300 w-full border-2 hover:border-blue-600 border-transparent hover:font-semibold hover:bg-blue-100 rounded-lg pointer-events-auto"
                              onClick={() => {
                                setSelectProfileRecruiter(3);
                                if (checkPage !== "/recruiter/profile")
                                  router.push("/recruiter/profile");
                              }}
                            >
                              <FaBuilding />
                              <p className="ml-2">Hồ sơ tuyển dụng</p>
                            </div>
                          )}

                        {profile &&
                          profile?.companyInfomation?.isActive === 1 &&
                          (profile?.isV1 ||
                            profile?.isV2 ||
                            profile?.isV3 ||
                            profile?.isV4) && (
                            <div
                              className="flex items-center py-2 pl-4 transition-all duration-300 w-full border-2 hover:border-blue-600 border-transparent hover:font-semibold hover:bg-blue-100 rounded-lg pointer-events-auto"
                              onClick={() => {
                                setSelectProfileRecruiter(4);
                                if (checkPage !== "/recruiter/profile")
                                  router.push("/recruiter/profile");
                              }}
                            >
                              <MdWork />
                              <p className="ml-2">Ứng viên tiềm năng</p>
                            </div>
                          )}
                        {profile &&
                          profile?.companyInfomation?.isActive === 1 && (
                            <>
                              <div
                                className="flex items-center py-2 pl-4 transition-all duration-300 w-full border-2 hover:border-blue-600 border-transparent hover:font-semibold hover:bg-blue-100 rounded-lg pointer-events-auto"
                                onClick={() => {
                                  setSelectProfileRecruiter(5);
                                  if (checkPage !== "/recruiter/profile")
                                    router.push("/recruiter/profile");
                                }}
                              >
                                <FaListCheck />
                                <p className="ml-2">Danh sách bài viết</p>
                              </div>
                              <div
                                className="flex items-center py-2 pl-4 transition-all duration-300 w-full border-2 hover:border-blue-600 border-transparent hover:font-semibold hover:bg-blue-100 rounded-lg pointer-events-auto"
                                onClick={() => {
                                  setSelectProfileRecruiter(6);
                                  if (checkPage !== "/recruiter/profile")
                                    router.push("/recruiter/profile");
                                }}
                              >
                                <RiMoneyDollarCircleFill />
                                <p className="ml-2">Nạp tiền</p>
                              </div>
                              <div
                                className="flex items-center py-2 pl-4 transition-all duration-300 w-full border-2 hover:border-blue-600 border-transparent hover:font-semibold hover:bg-blue-100 rounded-lg pointer-events-auto"
                                onClick={() => {
                                  setSelectProfileRecruiter(7);
                                  if (checkPage !== "/recruiter/profile")
                                    router.push("/recruiter/profile");
                                }}
                              >
                                <MdOutlineManageHistory />
                                <p className="ml-2">Dịch vụ</p>
                              </div>
                            </>
                          )}

                        <div
                          className="flex items-center py-2 pl-4 transition-all duration-300 w-full border-2 hover:border-blue-600 border-transparent hover:font-semibold hover:bg-blue-100 rounded-lg pointer-events-auto"
                          onClick={() => {
                            setSelectProfileRecruiter(8);
                            if (checkPage !== "/recruiter/profile")
                              router.push("/recruiter/profile");
                          }}
                        >
                          <IoMdSettings />
                          <p className="ml-2">Quản lý tài khoản</p>
                        </div>
                        {profile?.isV1 === true && (
                          <div
                            className="flex items-center py-2 pl-4 transition-all duration-300 w-full border-2 hover:border-blue-600 border-transparent hover:font-semibold hover:bg-blue-100 rounded-lg pointer-events-auto"
                            onClick={() => {
                              setSelectProfileRecruiter(9);
                              if (checkPage !== "/recruiter/profile")
                                router.push("/recruiter/profile");
                            }}
                          >
                            <PiFlagBannerFill />
                            <p className="ml-2">Quản lý Banner</p>
                          </div>
                        )}

                        <div
                          className="flex items-center py-2 pl-4 transition-all duration-300 w-full border-2 hover:border-blue-600 border-transparent hover:font-semibold hover:bg-blue-100 rounded-lg pointer-events-auto"
                          onClick={() => {
                            signOutRecruiter();
                          }}
                        >
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
                    setSelectionMenu(0);
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
                        ? " left-0  max-h-screen overflow-y-scroll min-h-full"
                        : "left-full opacity-0"
                      : onMenuAll
                      ? " left-1/4"
                      : "left-full opacity-0"
                  }  shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px] z-[41] right-0`}
                >
                  <div className="w-full min-h-fit">
                    <div className={`flex items-center gap-4 p-4 mt-16`}>
                      <Image
                        className="shadow-sm rounded-full h-24 w-24"
                        alt=""
                        src={profile?.companyInfomation?.logoPath}
                        width={100}
                        height={100}
                      />
                      <div className="flex flex-col gap-1">
                        <p className="font-semibold text-xl capitalize text-blue-500">
                          {profile?.companyInfomation?.name}
                        </p>
                        <p className="font-semibold capitalize">
                          POINT:
                          <span className="font-bold text-yellow-500">
                            {ChangeNumber(profile?.point, false, ",")}
                          </span>
                        </p>
                        {Object.keys(profile).length > 0 && (
                          <div className="flex-1 flex items-center gap-2">
                            <div
                              className={`rounded-full p-2 bg-black cursor-pointer  ${
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
                              <div className="w-full h-full relative">
                                {dataNotification.total_is_not_read > 0 && (
                                  <div className="flex justify-center items-center w-5 h-5 absolute bottom-full right-0 bg-red-500 text-xs rounded-full translate-y-2">
                                    <p className="text-white">
                                      {dataNotification.total_is_not_read}
                                    </p>
                                  </div>
                                )}
                              </div>

                              <div
                                className={`flex flex-col gap-y-4 absolute text-black ${
                                  selectionMenu === 1
                                    ? "h-fit opacity-100"
                                    : "opacity-0 invisible"
                                } top-[206px] transition-all max-h-64 translate-y-2 inset-x-1 overflow-hidden duration-300 px-4 py-6 bg-white rounded-lg shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px] z-50`}
                                onClick={(e: any) => {
                                  e.stopPropagation();
                                }}
                              >
                                <div className="max-h-full overflow-y-scroll flex flex-col gap-4">
                                  {dataNotification &&
                                    dataNotification?.notifications?.map(
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
                                                notificate.data.typeText,
                                                notificate.data.notificationId
                                              );
                                            }}
                                          >
                                            <h3>
                                              {notificate.content_app.title}
                                            </h3>
                                            <h5
                                              dangerouslySetInnerHTML={{
                                                __html:
                                                  notificate.content_app.body,
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
                                  {(dataNotification === undefined ||
                                    dataNotification?.length === 0) && (
                                    <div>Chưa có thông báo</div>
                                  )}
                                </div>
                              </div>
                            </div>
                            <div
                              className={`rounded-full p-2 bg-black cursor-pointer relative w-fit`}
                              onClick={() => {
                                setOnMenuAll(false);
                                router.push("/recruiter/chat");
                              }}
                            >
                              <AiFillMessage color={"white"} fontSize="1.5em" />
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                    <div className={` flex flex-col`}>
                      <div className="hover:bg-gray-50 overflow-hidden">
                        <button
                          className="w-full h-16 text-lg font-semibold text-black flex gap-2 items-center justify-start px-5"
                          onClick={() => {
                            router.push("/recruiter");
                            setOnMenuAll(false);
                            setSelectionMenu(0);
                            // if (tabMenuChoose === 1) {
                            //   setTabMenuChoose(0);
                            // } else {
                            //   setTabMenuChoose(1);
                            // }
                          }}
                        >
                          <MdNewReleases />
                          <p>Giới thiệu</p>
                        </button>
                      </div>
                      <div className="hover:bg-gray-50 overflow-hidden">
                        <button
                          className="w-full h-16 text-lg font-semibold text-black flex gap-2 items-center justify-start px-5"
                          onClick={() => {
                            router.push("/recruiter/product-catalog");
                            setOnMenuAll(false);
                            setSelectionMenu(0);
                            // if (tabMenuChoose === 2) {
                            //   setTabMenuChoose(0);
                            // } else {
                            //   setTabMenuChoose(2);
                            // }
                          }}
                        >
                          <IoIosPricetag />
                          <p>Báo giá</p>
                        </button>
                      </div>
                      <div className="hover:bg-gray-50 overflow-hidden">
                        <button
                          className="w-full h-16 text-lg font-semibold text-black flex gap-2 items-center justify-start px-5"
                          onClick={() => {
                            // if (tabMenuChoose === 3) {
                            //   setTabMenuChoose(0);
                            // } else {
                            //   setTabMenuChoose(3);
                            // }
                            if (checkPage === "/recruiter") {
                              positionScrollJob[0]?.scrollIntoView({
                                behavior: "smooth",
                              });
                            } else {
                              router.push("/recruiter");
                            }
                            setSelectionMenu(0);
                            setOnMenuAll(false);
                          }}
                        >
                          <GrServices />
                          <p>Dịch vụ</p>
                        </button>
                      </div>
                      <div className="hover:bg-gray-50 overflow-hidden">
                        <button
                          className="w-full h-16 text-lg font-semibold text-black flex gap-2 items-center justify-start px-5"
                          onClick={() => {
                            // if (tabMenuChoose === 4) {
                            //   setTabMenuChoose(0);
                            // } else {
                            //   setTabMenuChoose(4);
                            // }
                            router.push("/recruiter/blog");
                            setSelectionMenu(0);
                            setOnMenuAll(false);
                          }}
                        >
                          <FaHeart />
                          <p>Blog</p>
                        </button>
                      </div>
                      <div className="hover:bg-gray-50 overflow-hidden">
                        <button
                          className="w-full h-16 text-lg font-semibold text-black flex gap-2 items-center justify-start px-5"
                          onClick={() => {
                            // if (tabMenuChoose === 4) {
                            //   setTabMenuChoose(0);
                            // } else {
                            //   setTabMenuChoose(4);
                            // }
                            router.push("/recruiter/help-contact");
                            setOnMenuAll(false);
                            setSelectionMenu(0);
                          }}
                        >
                          <MdContactSupport />
                          <p>Hỗ trợ</p>
                        </button>
                      </div>
                      {Object.keys(profile).length !== 0 && (
                        <div className="hover:bg-gray-50 overflow-hidden">
                          <button
                            className="w-full h-16 text-lg font-semibold text-black flex gap-2 items-center justify-start px-5"
                            onClick={() => {
                              // if (tabMenuChoose === 4) {
                              //   setTabMenuChoose(0);
                              // } else {
                              //   setTabMenuChoose(4);
                              // }
                              router.push("/recruiter/candidate");
                              setOnMenuAll(false);
                              setSelectionMenu(0);
                            }}
                          >
                            <FaUserTie />
                            <p>Ứng viên</p>
                          </button>
                        </div>
                      )}

                      {Object.keys(profile).length !== 0 ? (
                        <div className="hover:bg-gray-50 overflow-hidden">
                          <button
                            className="w-full h-16 text-lg font-semibold text-black flex gap-2 items-center justify-start px-5"
                            onClick={() => {
                              setSelectionMenu(0);
                              if (tabMenuChoose === 5) {
                                setTabMenuChoose(0);
                              } else {
                                setTabMenuChoose(5);
                              }
                            }}
                          >
                            <IoMdSettings />
                            <p>Thông tin công ty</p>
                          </button>

                          <div
                            className={`flex flex-col font-medium bg-black text-white transition-all duration-500 items-start px-5 ${
                              tabMenuChoose === 5 ? "py-2" : "h-0 opacity-0"
                            }`}
                          >
                            <button
                              className="py-2 hover:text-blue-500"
                              onClick={() => {
                                setSelectionMenu(0);
                                router.push("/recruiter/profile");
                                setSelectProfileRecruiter(1);
                                setOnMenuAll(false);
                              }}
                            >
                              Tổng quan
                            </button>
                            <button
                              className="py-2 hover:text-blue-500"
                              onClick={() => {
                                router.push("/recruiter/profile");

                                setSelectProfileRecruiter(2);
                                setOnMenuAll(false);
                                setSelectionMenu(0);
                              }}
                            >
                              Hồ sơ thông tin
                            </button>
                            <button
                              className="py-2 hover:text-blue-500"
                              onClick={() => {
                                setSelectProfileRecruiter(3);
                                setOnMenuAll(false);
                                setSelectionMenu(0);
                              }}
                            >
                              Hồ sơ tuyển dụng
                            </button>
                            {profile &&
                              profile?.companyInfomation?.isActive !== 0 && (
                                <button
                                  className="py-2 hover:text-blue-500"
                                  onClick={() => {
                                    router.push("/recruiter/profile");
                                    setSelectionMenu(0);
                                    setSelectProfileRecruiter(4);
                                    setOnMenuAll(false);
                                  }}
                                >
                                  Ứng viên tiềm năng
                                </button>
                              )}

                            <button
                              className="py-2 hover:text-blue-500"
                              onClick={() => {
                                router.push("/recruiter/profile");
                                setSelectionMenu(0);
                                setSelectProfileRecruiter(5);
                                setOnMenuAll(false);
                              }}
                            >
                              Danh sách bài viết
                            </button>
                            <button
                              className="py-2 hover:text-blue-500"
                              onClick={() => {
                                router.push("/recruiter/profile");
                                setSelectionMenu(0);
                                setSelectProfileRecruiter(6);
                                setOnMenuAll(false);
                              }}
                            >
                              Nạp tiền
                            </button>
                            <button
                              className="py-2 hover:text-blue-500"
                              onClick={() => {
                                router.push("/recruiter/profile");
                                setSelectionMenu(0);
                                setSelectProfileRecruiter(7);
                                setOnMenuAll(false);
                              }}
                            >
                              Quản lý tài khoản
                            </button>
                            <button
                              className="py-2 hover:text-blue-500"
                              onClick={() => {
                                signOutRecruiter();
                                setSelectionMenu(0);
                              }}
                            >
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
                                localStorage.setItem(
                                  "backurlrecruiter",
                                  window.location.pathname
                                );

                                window.location.href = "/recruiter/login";
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
      </div>
      {!(selectionMenu === 0) && <ModalBG setTab={setSelectionMenu} />}
      <ShowActiveRecruiter />
    </div>
  );
};

export default MenuRecruiter;
