import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";
import "./MenuRecruiter.scss";
import { useDispatch, useSelector } from "react-redux";
import { fetchProfileRecruiter } from "@/redux/reducer/profileReducer/profileSliceRecruiter";
import { Router } from "next/router";
import { useRouter } from "next/navigation";
import { AiFillDashboard, AiFillMessage } from "react-icons/ai";
import { MdEditDocument, MdWork } from "react-icons/md";
import { FaBuilding, FaHeart, FaUser } from "react-icons/fa";
import { IoMdNotifications, IoMdSettings } from "react-icons/io";
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

type Props = {};
interface INotification {
  code: number;
  data: any;
}
const MenuRecruiter = (props: Props) => {
  const { reponsiveMobile, setSelectProfileRecruiter, checkPage } =
    useSrollContext();
  const [selectionMenu, setSelectionMenu] = useState<number>(0);
  const [dataNotification, setDataNotification] = useState<any>([]);
  const { handleShortTextHome } = ShortText();
  const [onMenuAll, setOnMenuAll] = useState<boolean>(false);
  const [tabMenuChoose, setTabMenuChoose] = useState<any>(0);

  const dispatch = useDispatch();
  const profile = useSelector((state: any) => state.profileRecruiter.profile);
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
  useEffect(() => {
    dispatch(fetchProfileRecruiter("vi") as any);
  }, []);
  useEffect(() => {
    //console.log(profile);
  }, [profile]);
  useEffect(() => {
    const dataObj = JSON.parse(localStorage.getItem("dataRequest") || "{}");

    const fetchData = async () => {
      const res = (await notificationApi.getNotificationRecruiter(
        "vi"
      )) as unknown as INotification;

      if (res && res.code === 200) {
        //console.log(res);
        setDataNotification(res.data);
      }
    };

    fetchData();
  }, []);
  const router = useRouter();
  useEffect(() => {
    //console.log(profile);
  }, [profile]);
  return (
    <div className="h-20 ">
      <div className="fixed top-0 inset-x-0 h-20 z-40  flex justify-center gradient-bg-menu">
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
                    router.push("/recruiter");
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
                <div
                  className="cursor-pointer"
                  onClick={() => {
                    router.push("/recruiter/candidate");
                  }}
                >
                  Ứng viên
                </div>
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
                    <div className="flex justify-center items-center w-5 h-5 absolute bottom-full right-0 bg-red-500 text-xs rounded-full translate-y-2">
                      <p className="text-white">
                        {dataNotification.total_is_not_read}
                      </p>
                    </div>
                    <div
                      className={`flex flex-col gap-y-4 absolute text-black ${
                        selectionMenu === 1 ? "h-fit opacity-100" : "opacity-0"
                      } top-full transition-all translate-y-2 right-0 w-96 overflow-hidden duration-300 px-4 py-6 bg-white rounded-lg shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px]`}
                    >
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
                          className="shadow-sm rounded-full"
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
                    {/* <Image
                      className="shadow-sm rounded-full"
                      alt=""
                      src={profile?.avatarPath}
                      width={100}
                      height={100}
                    /> */}
                    <div>
                      {/* <p className="font-semibold text-xl capitalize text-blue-500">
                        {profile?.name}
                      </p> */}
                    </div>
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
                          }}
                        >
                          Công việc nổi bật
                        </button>
                        <button
                          className="py-2 hover:text-blue-500"
                          onClick={() => {
                            setOnMenuAll(false);
                          }}
                        >
                          Việc làm mới
                        </button>
                        <button
                          className="py-2 hover:text-blue-500"
                          onClick={() => {
                            setOnMenuAll(false);
                          }}
                        >
                          Công việc chủ đề
                        </button>
                        <button
                          className="py-2 hover:text-blue-500"
                          onClick={() => {
                            setOnMenuAll(false);
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
                          }}
                        >
                          Công ty nổi bật
                        </button>
                        <button
                          className="py-2 hover:text-blue-500"
                          onClick={() => {
                            setOnMenuAll(false);
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
                          }}
                        >
                          Các bài viết
                        </button>
                        <button
                          className="py-2 hover:text-blue-500"
                          onClick={() => {
                            setOnMenuAll(false);
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
                    {Object.keys(profile).length !== 0 ? (
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
                            }}
                          >
                            Tổng quan
                          </button>
                          <button
                            className="py-2 hover:text-blue-500"
                            onClick={() => {
                              setOnMenuAll(false);
                            }}
                          >
                            Hồ sơ cá nhân
                          </button>
                          <button
                            className="py-2 hover:text-blue-500"
                            onClick={() => {
                              setOnMenuAll(false);
                            }}
                          >
                            Công ty của tôi
                          </button>
                          <button
                            className="py-2 hover:text-blue-500"
                            onClick={() => {
                              setOnMenuAll(false);
                            }}
                          >
                            Việc làm của tôi
                          </button>
                          <button
                            className="py-2 hover:text-blue-500"
                            onClick={() => {
                              setOnMenuAll(false);
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
      </div>
    </div>
  );
};

export default MenuRecruiter;
