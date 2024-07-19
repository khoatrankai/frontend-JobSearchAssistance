/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
"use client";
import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import "./page.scss";
import { useParams, useRouter } from "next/navigation";
import postsApi from "@/api/posts/postsApi";
import StoreIcon from "@mui/icons-material/Store";
import DnsIcon from "@mui/icons-material/Dns";
import DateRangeIcon from "@mui/icons-material/DateRange";
import AssignmentIcon from "@mui/icons-material/Assignment";
import AlarmOnIcon from "@mui/icons-material/AlarmOn";
import WeekendIcon from "@mui/icons-material/Weekend";
import SettingsRemoteIcon from "@mui/icons-material/SettingsRemote";
import CurrencyExchangeIcon from "@mui/icons-material/CurrencyExchange";
import CategoryIcon from "@mui/icons-material/Category";
import EventBusyIcon from "@mui/icons-material/EventBusy";
import useSwiperAutoSlider from "@/util/SwiperAutoSlider";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { ToastContainer, toast } from "react-toastify";
import bookMarkApi from "@/api/bookmarks/bookMarkApi";
import "react-toastify/dist/ReactToastify.css";
import { ChatIcon, SaveIconFill, SaveIconOutline } from "@/icons";
import moment from "moment";
import applicationApi from "@/api/applicationApi";
import EncodingDescription from "@/util/EncodingDescription/EncodingDescription";
import BookmarksIcon from "@mui/icons-material/Bookmarks";
import { useSelector } from "react-redux";
import { useSrollContext } from "@/context/AppProvider";

import axiosClient from "@/configs/axiosClient";
import ShortText from "@/util/ShortText";
import ModalApply from "@/components/ModalApply/ModalApply";
import { TbFilePercent } from "react-icons/tb";
import searchApi from "@/api/search/apiSearch";
import { Link } from "react-router-dom";
import TimeStamp from "@/util/TimeStamp/TimeStamp";

type Props = {};

interface IPostDetail {
  code: number;
  data: any;
}

interface IBookmark {
  code: any;
  message: string;
}

interface IApplication {
  data: number;
  message: string;
}

const page = (props: Props) => {
  const { id } = useParams();
  const { handleShortTextHome, handleShortValueNumber } = ShortText();
  const { handleDecodingDescription } = EncodingDescription();
  const [checkSize, setCheckSize] = useState<boolean>(false);
  const { handleConvertToDate } = TimeStamp();
  const [dataCompany, setDataCompany] = useState<any>();
  const [checkScroll, setCheckScroll] = useState<boolean>(false);
  const { reponsiveMobile } = useSrollContext();
  const ref_slider = useRef<any>();
  const ref_des = useRef<any>();
  const [postDetail, setPostDetail] = useState<any>({});
  const [list_category, setListCategory] = useState<any>("");
  const [listSameJob, setListSameJob] = useState<any>([]);
  const [bookmarked, setBookmarked] = React.useState(false);
  const profile = useSelector((state: any) => state.profile.profile);
  const { handleLoadHrefPage, setSoureImage } = useSrollContext();
  const languageRedux = useSelector(
    (state: any) => state.changeLaguage.language
  );
  const router = useRouter();
  const [openModalApply, setOpenModalApply] = useState<boolean>(false);
  const [openModalLogin, setOpenModalLogin] = useState<boolean>(false);
  const [filePDFParent, setFilePDFParent] = useState<File | null>(null);
  const [idCv, setIdCv] = useState<number>(0);
  const {
    checkNext,
    checkPrev,
    handleNext,
    handlePrev,
    handleUpData,
    ref_list_slider,
  } = useSwiperAutoSlider(0);
  useEffect(() => {
    const fetchData = async () => {
      // handleLoadHrefPage();
      const res = (await postsApi.getPostbyId(
        id as any,
        languageRedux === 1 ? "vi" : "en"
      )) as unknown as IPostDetail;
      // //console.log(res.data?.company_name);
      const res2 = (await axiosClient.get(
        `https://lending-advantage-pale-xp.trycloudflare.com/api/v3/companies/by-name?name=${res?.data?.company_name}`
      )) as unknown as { status: any; data: any };

      if (res && (res?.code as any) === 200) {
        setPostDetail(res.data);
        document.title = res.data?.title;
        const data = res.data.categories.map((item: any) => {
          return item.child_category;
        });
        const dataString = data.join(",");
        setListCategory(dataString);
        const dataListSame = await searchApi.getSearchByQueryV2(
          null,
          0,
          null,
          null,
          null,
          1,
          null,
          null,
          null,
          null,
          [],
          res.data.categories.map((dt: any) => {
            return dt.child_category_id;
          }),
          [res.data.district_id],
          null,
          languageRedux === 1 ? "vi" : "en"
        );
        setListSameJob(dataListSame.data.posts);
      } else {
        // router.push("/not-found");
      }
      if (res2 && (res2?.status as any) === 200) {
        setDataCompany(res2.data);
      } else {
        // router.push("/not-found");
      }
    };
    fetchData();
  }, [bookmarked, languageRedux]);
  const handleResize = () => {
    handleUpData();
    const widthMaxSlide = ref_slider.current.getBoundingClientRect().width;
    if (window.innerWidth < 1152) {
      setCheckSize(true);
      const height = widthMaxSlide / (732 / 411.75);
      ref_slider.current.style.height = `${height}px`;
    } else {
      setCheckSize(false);
      ref_slider.current.style.height = `411.75px`;
    }
  };
  useEffect(() => {
    // //console.log(postDetail);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [postDetail]);
  useEffect(() => {
    const handleScroll = () => {
      const scroll = ref_des.current?.getBoundingClientRect().y;
      if (scroll < 120) {
        setCheckScroll(true);
      } else {
        setCheckScroll(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleBookmarked = (idPost: number) => {
    try {
      const fetchData = async () => {
        const res = (await bookMarkApi.createBookMark(
          idPost
        )) as unknown as IBookmark;
        console.log(res);
        if (res && res.code === 200) {
          toast.success(
            languageRedux === 1
              ? "Lưu bài viết thành công"
              : "Save post success",
            {
              position: "bottom-center",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "dark",
            }
          );
          if (id == idPost.toString()) {
            setBookmarked(!bookmarked);
          } else {
            setListSameJob(
              listSameJob.map((dt: any) => {
                if (dt.id == idPost) {
                  return { ...dt, bookmarked: true };
                }
                return dt;
              })
            );
          }
        } else {
          setOpenModalLogin(true);
        }
      };

      fetchData();
    } catch (error) {
      toast.error(
        languageRedux === 1
          ? "Bạn không thể đánh dấu bài viết của chính mình"
          : "You cannot bookmark your own post",
        {
          position: "bottom-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
        }
      );
    }
  };

  const handleDeleteBookmarked = (idPost: number) => {
    try {
      const fetchData = async () => {
        const res = (await bookMarkApi.deleteBookMark(
          idPost
        )) as unknown as IBookmark;

        if (res && res.code === 200) {
          toast.success(
            languageRedux === 1
              ? "Xóa bài viết thành công"
              : "Delete post success",
            {
              position: "bottom-center",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "dark",
            }
          );
          if (id == idPost.toString()) {
            setBookmarked(!bookmarked);
          } else {
            setListSameJob(
              listSameJob.map((dt: any) => {
                if (dt.id == idPost) {
                  return { ...dt, bookmarked: false };
                }
                return dt;
              })
            );
          }
        }
      };

      fetchData();
    } catch (error) {
      toast.error(
        languageRedux === 1
          ? "Bạn không thể xóa bài viết của chính mình"
          : "You cannot delete your own post",
        {
          position: "bottom-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
        }
      );
    }
  };

  const handleToMessage = (accountId: string, postId: number) => {
    if (window.localStorage.getItem("accessToken")) {
      if (
        profile.roleData === 0 ||
        profile.roleData === 1 ||
        profile.roleData === 2
      ) {
        window.location.href = `/chat?post_id=${postId}&user_id=${accountId}`;
      } else {
        setOpenModalLogin(true);
      }
    } else {
      toast.warning(
        languageRedux === 1
          ? "Bạn cần đăng nhập để sử dụng tính năng này"
          : "You need to login to use this feature",
        {
          position: "bottom-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
        }
      );
    }
  };

  const handleApply = async (type: string) => {
    // type = 'upload' => upload cv
    // type = 'near' => select cv in near cv
    // type = 'all' => select cv in all cv
    const dataApply = new FormData();
    if (profile?.roleData === undefined || profile?.roleData === null) {
      // setOpenModalLogin(true);
      toast.warning(
        languageRedux === 1
          ? "Bạn cần đăng nhập để sử dụng tính năng này"
          : "You need to login to use this feature",
        {
          position: "bottom-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
        }
      );
      return;
    }
    let errorResponse: any = null; // Sử dụng kiểu any

    try {
      const appData = new FormData();

      appData.append("type", type);
      appData.append("postId", postDetail?.id);
      appData.append("accountId", profile.accountId);

      if (type === "near" || type === "all") {
        appData.append("idCv", idCv as any);
      }

      if (type === "upload") {
        if (!filePDFParent) {
          toast.warning(
            languageRedux === 1
              ? "Vui lòng chọn file CV"
              : "Please select CV file",
            {
              position: "bottom-center",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "dark",
            }
          );
          return;
        }
        appData.append("pdf", filePDFParent);
      }
      const res = (await applicationApi.applyAplication(appData)) as any;

      if (res && (res.data as any).code === 201) {
        toast.success(
          languageRedux === 1
            ? "Ứng tuyển thành công"
            : "Successful application",
          {
            position: "bottom-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            theme: "dark",
          }
        );
      } else {
        errorResponse = res.message;
      }
    } catch (error: any) {
      errorResponse = error?.response?.data.message;
    }

    if (errorResponse) {
      toast.warning(errorResponse, {
        position: "bottom-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "dark",
      });
    }
  };

  const handleViewPost = () => {
    window.location.href = postDetail?.resource?.url;
  };

  const handleClickShowMap = () => {
    window.open(
      "https://www.google.com/maps/place/" +
        `${postDetail?.address}, ${postDetail?.ward} ${postDetail.district} ${postDetail?.province_name}`
    );
  };

  const handleToggleModal = () => {
    setOpenModalLogin(false);
  };
  const CheckApplyProfile = () => {
    if (Object.keys(profile).length === 0) {
      localStorage.setItem("backurl", window.location.pathname);
      router.push("/login");
    } else {
      if (profile?.isActive) {
        if (profile.roleData === 0) {
          setOpenModalApply(true);
        }
      } else {
        toast.error("Vui lòng xác thực", {
          position: "bottom-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          theme: "dark",
        });
      }
    }
  };
  const handleSendChat = () => {
    if (Object.keys(profile).length === 0) {
      localStorage.setItem("backurl", window.location.pathname);
      router.push("/login");
    } else {
      if (profile?.isActive === 1) {
        if (profile.roleData === 0 || profile.roleData === 3) {
          handleToMessage(postDetail.account_id, postDetail.id);
        } else {
          toast.error("Vui lòng xác thực", {
            position: "bottom-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            theme: "dark",
          });
        }

        // handleViewPost();
      }
    }
  };
  return (
    <div
      className="w-ful flex justify-center "
      style={{ backgroundColor: "#f4f5f5" }}
    >
      {" "}
      <div className="max-w-6xl inline-flex flex-wrap justify-between w-full my-6">
        <div className={`${checkSize ? "mx-7" : "max-w-[780px]"}  w-full`}>
          <div className="rounded-lg bg-white p-6">
            <h1 className="font-semibold text-lg text-black/70 capitalize">
              {postDetail && postDetail?.title}
            </h1>
            <div
              className={`w-full h-[411.75px] overflow-hidden rounded-xl relative my-4`}
              ref={ref_slider}
            >
              <ul
                className="flex h-full transition-all duration-500"
                ref={ref_list_slider}
              >
                {postDetail &&
                  postDetail?.images?.map((item: any, index: number) => (
                    <li
                      key={index}
                      className="min-w-full min-h-full "
                      onClick={() => {
                        setSoureImage(item.image);
                      }}
                    >
                      <Image
                        className="h-full"
                        src={item.image || "/goapply.png"}
                        alt="anh"
                        width={1900}
                        height={1332}
                      />
                    </li>
                  ))}
              </ul>
              {checkPrev && (
                <div className="absolute inset-y-0 left-0 w-14 bg-black/50 flex items-center justify-center group">
                  <button
                    className="bg-white p-2 rounded-full group-hover:-translate-x-1 transition-all"
                    onClick={handlePrev}
                  >
                    <Image
                      className="w-6"
                      src={"/iconleft.svg"}
                      alt="anh"
                      width={200}
                      height={200}
                    />
                  </button>
                </div>
              )}
              {checkNext && postDetail?.images?.length > 1 && (
                <div className="absolute inset-y-0 right-0 w-14 bg-black/50 flex items-center justify-center group">
                  <button
                    className="bg-white p-2 rounded-full group-hover:translate-x-1 transition-all"
                    onClick={handleNext}
                  >
                    <Image
                      className="w-6"
                      src={"/iconright.svg"}
                      alt="anh"
                      width={200}
                      height={200}
                    />
                  </button>
                </div>
              )}
            </div>
            <div className={`mb-10 flow-root text-sm`}>
              <button className="w-fit p-4 flex items-center justify-center hover:bg-blue-400/20 rounded-xl">
                <div className="w-10 p-2 bg-blue-700 rounded-full mr-2 text-white">
                  <StoreIcon />
                </div>
                <div className="flex flex-col items-start justify-center">
                  <h2 className="font-light">
                    {languageRedux === 1 ? "Công ty" : "Company"}
                  </h2>
                  <h2 className="font-semibold text-start capitalize">
                    {postDetail?.company_name}
                  </h2>
                </div>
              </button>
              <button className="w-fit p-4 flex items-center justify-center hover:bg-blue-400/20 rounded-xl">
                <div className="w-10 p-2 bg-blue-700 rounded-full mr-2 text-white">
                  <DnsIcon />
                </div>
                <div
                  className="flex flex-col items-start justify-center"
                  onClick={() => handleClickShowMap()}
                >
                  <h2 className="font-light">
                    {languageRedux === 1 ? "Địa chỉ" : "Address"}
                  </h2>
                  <h2 className="font-semibold text-start capitalize">
                    {postDetail.address},{postDetail?.ward},
                    {postDetail?.district}, {postDetail?.province}
                  </h2>
                </div>
              </button>
              <button className="w-fit p-4 flex items-center justify-center hover:bg-blue-400/20 rounded-xl">
                <div className="w-10 p-2 bg-blue-700 rounded-full mr-2 text-white">
                  <DateRangeIcon />
                </div>
                <div className="flex flex-col items-start justify-center">
                  <h2 className="font-light">
                    {languageRedux === 1 ? "Ngày đăng" : "Date post"}
                  </h2>
                  <h2 className="font-semibold text-start capitalize">
                    {postDetail?.created_at
                      ? new Date(postDetail.created_at).toLocaleString()
                      : "No date available"}
                  </h2>
                </div>
              </button>
              <button className="w-fit p-4 flex items-center justify-center hover:bg-blue-400/20 rounded-xl">
                <div className="w-10 h-10 p-2 bg-blue-700 rounded-full mr-2 text-white">
                  <TbFilePercent className="w-full h-full" />
                </div>
                <div className="flex flex-col items-start justify-center">
                  <h2 className="font-light">
                    {languageRedux === 1 ? "Tỉ lệ phù hơp" : "Percent fit"}
                  </h2>
                  <h2 className="font-semibold text-start capitalize">
                    {postDetail.fit}%
                  </h2>
                </div>
              </button>
            </div>
            {
              <div className={`flex flex-wrap justify-center gap-4`}>
                {/* {!(
                  postDetail?.resource?.company_resource_id === 2 &&
                  profile.roleData === 3
                ) && ( */}
                <button className="flex flex-1 px-2 gap-2 text-sm items-center h-10 min-w-[12rem] bg-blue-600/95 hover:bg-blue-600 justify-center rounded-lg  text-white">
                  <BookmarksIcon />
                  {postDetail?.resource?.company_resource_id === 2 ? (
                    postDetail?.applied ? (
                      <h2 className="font-semibold flex gap-1">
                        {languageRedux === 1 ? "Đã ứng tuyển" : "Apply now"}
                        {postDetail?.cvApplication && (
                          <a
                            href={postDetail?.cvApplication}
                            target="_blank"
                            className="underline text-sm"
                          >
                            Xem cv
                          </a>
                        )}
                      </h2>
                    ) : (
                      <h2
                        className="font-semibold"
                        onClick={() => {
                          CheckApplyProfile();
                        }}
                      >
                        {languageRedux === 1 ? "Ứng tuyển ngay" : "Apply now"}
                      </h2>
                    )
                  ) : (
                    <h2
                      className="font-semibold  text-sm"
                      onClick={() => handleViewPost()}
                    >
                      {languageRedux === 1 ? "Xem tin" : "View post"}
                    </h2>
                  )}
                </button>
                {/* )} */}
                {/* {postDetail?.resource?.company_resource_id === 2 &&
                  profile.roleData !== 3 && ( */}
                <button
                  onClick={() => {
                    handleSendChat();
                  }}
                  className={`flex items-center text-sm gap-2 px-2  h-10 border-2 border-blue-500/70 hover:border-blue-500 rounded-lg justify-center`}
                >
                  <ChatIcon width={19} height={18} />
                  {reponsiveMobile > 420 && (
                    <h2 className="font-bold">
                      {languageRedux === 1 ? "Nhắn tin" : "Send message"}
                    </h2>
                  )}
                </button>
                {postDetail.account_id !== profile.accountId && (
                  <button
                    onClick={() => {
                      if (Object.keys(profile).length === 0) {
                        localStorage.setItem(
                          "backurl",
                          window.location.pathname
                        );
                        router.push("/login");
                      } else {
                        if (profile?.isActive) {
                          if (postDetail.bookmarked) {
                            handleDeleteBookmarked(postDetail.id);
                          } else {
                            handleBookmarked(postDetail.id);
                          }
                        } else {
                          toast.error("Vui lòng xác thực", {
                            position: "bottom-center",
                            autoClose: 5000,
                            hideProgressBar: false,
                            closeOnClick: true,
                            pauseOnHover: true,
                            draggable: true,
                            theme: "dark",
                          });
                        }
                      }
                    }}
                    className={`flex items-center min-w-[10rem] h-10 border-2 border-blue-500/70 hover:border-blue-500 rounded-lg justify-center ${
                      postDetail.bookmarked ? "bg-blue-500/70" : ""
                    } ${reponsiveMobile < 600 ? "w-full" : ""}`}
                  >
                    {postDetail.bookmarked ? (
                      <FavoriteIcon
                        sx={{
                          marginRight: "0.5rem",
                        }}
                      />
                    ) : (
                      <FavoriteBorderIcon
                        sx={{
                          marginRight: "0.5rem",
                        }}
                      />
                    )}
                    {reponsiveMobile > 420 && (
                      <h2 className="font-bold text-black  text-sm">
                        {postDetail.bookmarked ? "Đã lưu" : "Lưu tin"}
                      </h2>
                    )}
                  </button>
                )}
              </div>
            }
          </div>
          <div className="rounded-lg bg-white p-6 mt-8" ref={ref_des}>
            <div className="flex h-10 items-center">
              <div className="h-full w-3 bg-blue-500 mr-4"></div>
              <h1 className="text-xl font-semibold">
                {languageRedux === 1
                  ? "Chi tiết tin tuyển dụng"
                  : "Recruitment details"}
              </h1>
            </div>
            <div>
              <ul>
                <li className="my-8 ">
                  <h2 className="font-semibold mb-2">
                    {languageRedux === 1
                      ? "Mô tả công việc"
                      : "Job description"}
                  </h2>
                  <pre className="whitespace-pre-wrap font-medium text-black text-sm">
                    {
                      handleDecodingDescription(
                        postDetail?.description ?? ""
                      )[0]
                    }
                  </pre>
                </li>
                {handleDecodingDescription(postDetail?.description ?? "")[1] !==
                  undefined && (
                  <li className="my-8 ">
                    <h2 className="font-semibold mb-2">
                      {languageRedux === 1
                        ? "Yêu cầu công việc"
                        : "Job requirements"}
                    </h2>
                    <pre className="whitespace-pre-wrap font-medium text-black text-sm">
                      {
                        handleDecodingDescription(
                          postDetail?.description ?? ""
                        )[1]
                      }
                    </pre>
                  </li>
                )}

                {handleDecodingDescription(postDetail?.description ?? "")[2] !==
                  undefined && (
                  <li className="my-8 ">
                    <h2 className="font-semibold mb-2">
                      {languageRedux === 1
                        ? "Quyền lợi được hưởng"
                        : "Benefits"}
                    </h2>
                    <pre className="whitespace-pre-wrap font-medium text-black text-sm">
                      {
                        handleDecodingDescription(
                          postDetail?.description ?? ""
                        )[2]
                      }
                    </pre>
                  </li>
                )}
              </ul>
            </div>
          </div>
        </div>
        <div
          className={`${
            checkSize ? "mx-7 my-10" : "max-w-[350px]"
          }  w-full gap-y-4 flex-col flex`}
        >
          <div className="rounded-lg bg-white p-6 flex flex-col gap-y-4">
            <div className="flex gap-x-4">
              <div className="rounded-lg overflow-hidden w-16 h-16">
                <Image
                  alt=""
                  width={500}
                  height={500}
                  className=""
                  src={
                    postDetail?.images?.[0]?.image ??
                    postDetail?.image ??
                    "/goapply.png"
                  }
                />
              </div>
              <div className="font-semibold text-lg">
                {postDetail?.company_name}
              </div>
            </div>
            <div className="flex flex-col gap-y-2">
              <div className="flex gap-x-2">
                <p className="text-gray-400 text-nowrap">Quy mô:</p>
                <p>{postDetail?.company_size}</p>
              </div>
              <div className="flex gap-x-2">
                <p className="text-gray-400 text-nowrap">Địa điểm:</p>
                <p className="text-sm">
                  {postDetail?.address &&
                    handleShortTextHome(
                      postDetail.address +
                        "," +
                        postDetail?.ward +
                        "," +
                        postDetail?.district +
                        "," +
                        postDetail?.province,
                      40
                    )}
                </p>
              </div>
            </div>
          </div>
          <div className="rounded-lg bg-white p-6">
            <div className="flex h-10 items-center mb-8">
              <div className="h-full w-3 bg-blue-500 mr-4"></div>
              <h1 className="font-semibold text-xl">
                {languageRedux === 1
                  ? "Thông tin công việc"
                  : "Job information"}
              </h1>
            </div>
            <ul className="text-sm">
              <li className="flex items-center my-6">
                <div className="w-12 mr-4 p-3 bg-blue-600 text-white rounded-full">
                  <AssignmentIcon />
                </div>
                <div>
                  <h2 className="text-black/50 font-semibold">
                    {languageRedux === 1 ? "Loại công việc" : "Job type"}
                  </h2>
                  <h2 className="font-semibold">
                    {postDetail?.job_type?.job_type_name}
                  </h2>
                </div>
              </li>
              <li className="flex items-center my-6">
                <div className="w-12 mr-4 p-3 bg-blue-600 text-white rounded-full">
                  <AlarmOnIcon />
                </div>
                <div>
                  <h2 className="text-black/50 font-semibold">
                    {languageRedux === 1 ? "Giờ làm việc" : "Work time"}
                  </h2>
                  <h2 className="font-semibold">
                    {moment(postDetail?.start_time).format("HH:mm:ss")} -{" "}
                    {moment(postDetail?.end_time).format("HH:mm:ss")}
                  </h2>
                </div>
              </li>
              <li className="flex items-center my-6">
                <div className="w-12 mr-4 p-3 bg-blue-600 text-white rounded-full">
                  <WeekendIcon />
                </div>
                <div>
                  <h2 className="text-black/50 font-semibold">
                    {languageRedux === 1
                      ? "Làm việc cuối tuần"
                      : "Work on weekends"}
                  </h2>
                  <h2 className="text-black font-semibold">
                    {postDetail?.is_working_weekend
                      ? languageRedux === 1
                        ? "Có làm việc cuối tuần"
                        : "There is work on weekends"
                      : languageRedux === 1
                      ? "Không làm việc cuối tuần"
                      : "Do not work weekends"}
                  </h2>
                </div>
              </li>
              <li className="flex items-center my-6">
                <div className="w-12 mr-4 p-3 bg-blue-600 text-white rounded-full">
                  <SettingsRemoteIcon />
                </div>
                <div>
                  <h2 className="text-black/50 font-semibold">
                    {languageRedux === 1 ? "Làm việc từ xa" : "Work remotely"}
                  </h2>
                  <h2 className="text-black font-semibold">
                    {postDetail?.is_remotely
                      ? languageRedux === 1
                        ? "Có làm việc từ xa"
                        : "There is remote work"
                      : languageRedux === 1
                      ? "Không làm việc từ xa"
                      : "Do not work remotely"}
                  </h2>
                </div>
              </li>
              <li className="flex items-center my-6">
                <div className="w-12 mr-4 p-3 bg-blue-600 text-white rounded-full">
                  <CurrencyExchangeIcon />
                </div>
                <div>
                  <h2 className="text-black/50 font-semibold">
                    {languageRedux === 1 ? "Mức lương" : "Salary"}
                  </h2>
                  <h2 className="font-semibold">
                    {postDetail?.salary_min} VND - {postDetail?.salary_max} VND
                  </h2>
                </div>
              </li>
              <li className="flex items-center my-6">
                <div className="w-12 mr-4 p-3 bg-blue-600 text-white rounded-full">
                  <CategoryIcon />
                </div>
                <div>
                  <h2 className="text-black/50 font-semibold">
                    {languageRedux === 1 ? "Ngành nghề" : "Industry"}
                  </h2>
                  <h2 className="font-semibold">{list_category}</h2>
                </div>
              </li>
              <li className="flex items-center my-6">
                <div className="w-12 mr-4 p-3 bg-blue-600 text-white rounded-full">
                  <EventBusyIcon />
                </div>
                <div>
                  <h2 className="text-black/50 font-semibold">
                    {languageRedux === 1
                      ? "Hạn nộp hồ sơ"
                      : "Deadline for submission"}
                  </h2>
                  <h2 className="font-semibold">
                    {postDetail?.expired_date
                      ? handleConvertToDate(postDetail.expired_date)
                      : "Vô thời hạn"}
                  </h2>
                </div>
              </li>
            </ul>
          </div>
          <div className="rounded-lg bg-white p-6">
            <div className="flex h-10 items-center mb-8">
              <div className="h-full w-3 bg-blue-500 mr-4"></div>
              <h1 className="font-semibold text-xl">
                {languageRedux === 1 ? "Công việc tương tự" : "Job information"}
              </h1>
            </div>
            <ul className="flex flex-col gap-4">
              {listSameJob.map((dt: any, ikey: any) => {
                if (ikey < 6 && id != dt?.id) {
                  return (
                    <>
                      <li
                        key={ikey}
                        onClick={() => {
                          router.push(`/post-detail/${dt?.id}`);
                        }}
                      >
                        <div className="w-full h-fit p-2 rounded-md flex items-center gap-4 cursor-pointer hover:shadow-[rgba(17,_17,_26,_0.1)_0px_0px_16px] hover:text-blue-500">
                          <div className="rounded-full overflow-hidden w-16 h-16">
                            <Image
                              alt=""
                              src={dt?.image ?? "/goapply.png"}
                              width={500}
                              height={500}
                            />
                          </div>
                          <div className="flex flex-col flex-1">
                            <div>
                              <h2 className="text-sm font-bold peer group-hover:drop-shadow-xl  group-hover:text-blue-500 max-w-full w-fit">
                                {handleShortTextHome(dt?.title, 15)}
                              </h2>
                            </div>

                            <div className="my-2 flex flex-col gap-y-1 font-medium">
                              <div className="flex items-center">
                                <p className="text-xs text-gray-500  drop-shadow-xl">
                                  {handleShortTextHome(dt?.company_name, 17)}
                                </p>
                              </div>
                            </div>
                            <div className="inline-flex flex-wrap justify-start gap-1 font-extrabold">
                              <h3 className="text-[9px] py-1 px-2 rounded-md min-w-fit bg-blue-50 group-hover:text-blue-500  ">
                                {handleShortValueNumber(
                                  dt?.salary_min.toString()
                                )}{" "}
                                -{" "}
                                {handleShortValueNumber(
                                  dt?.salary_max.toString()
                                )}{" "}
                                {dt?.money_type_text}
                              </h3>
                              <h3 className="text-[9px] py-1 px-2 rounded-md min-w-fit bg-blue-50 group-hover:text-blue-500  ">
                                {dt?.district}
                              </h3>
                            </div>
                          </div>
                          {Object.keys(profile).length > 0 && (
                            <div className="h-full w-12 flex items-center">
                              <div
                                className="cursor-pointer"
                                onClick={(e: any) => {
                                  e.stopPropagation();
                                  // if (profile?.isActive) {
                                  if (dt?.bookmarked) {
                                    handleDeleteBookmarked(dt?.id);
                                  } else {
                                    handleBookmarked(dt?.id);
                                  }
                                  // }
                                }}
                              >
                                {dt?.bookmarked ? (
                                  <SaveIconFill width={24} height={24} />
                                ) : (
                                  <SaveIconOutline width={24} height={24} />
                                )}
                              </div>
                            </div>
                          )}
                        </div>
                      </li>
                    </>
                  );
                }
              })}
            </ul>
          </div>
        </div>
      </div>
      {/* <ToastContainer /> */}
      {openModalApply && (
        <ModalApply
          namePost={postDetail?.title}
          openModalApply={openModalApply}
          setOpenModalApply={setOpenModalApply}
          profile={profile}
          handleApply={handleApply}
          setFilePDFParent={setFilePDFParent}
          setIdCv={setIdCv}
        />
      )}
    </div>
  );
};

export default page;
