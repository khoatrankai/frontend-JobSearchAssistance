/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import "./TopCompanyComponent.scss";
import themeApi from "@/api/theme/themeApi";
import postsApi from "@/api/posts/postsApi";
import Link from "next/link";
import useSwiperAutoSlider from "@/util/SwiperAutoSlider";
import { SaveIconFill, SaveIconOutline } from "@/icons";
import { ToastContainer, toast } from "react-toastify";
import bookMarkApi from "@/api/bookmarks/bookMarkApi";

import ShortText from "@/util/ShortText";
import { useSelector } from "react-redux";
import SkeletonAll from "@/util/SkeletonAll";
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md";
import DescriptionHoverProvider from "@/util/DescriptionHoverProvider/DescriptionHoverProvider";
import { useRouter } from "next/navigation";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import ModalApply from "../ModalApply/ModalApply";
import appplicationApi from "@/api/applicationApi";
import { useSrollContext } from "@/context/AppProvider";

type Props = {};

interface IPostTopic {
  success: boolean;
  data: any;
}

interface IBookmark {
  code: number;
  message: string;
}

const TopCompanyComponent = (props: Props) => {
  const { handleShortTextHome, handleShortValueNumber } = ShortText();
  const languageRedux = useSelector(
    (state: any) => state.changeLaguage.language
  );
  const profile = useSelector((state: any) => state.profile.profile);
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
      const res = (await appplicationApi.applyAplication(appData)) as any;

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

  const [theme, setTheme] = useState<any>([]);
  const { reponsiveMobile } = useSrollContext();
  const { DescriptionHover, handleUpdatePosition } = DescriptionHoverProvider();
  const [pageNewJob, setPageNewJob] = useState<number>(0);
  const [pageTotal, setPageTotal] = useState<number>(0);
  const [positionFocus, setPostionFocus] = useState<number>(1);
  const refHoverPosition = useRef<any>();
  const [thresholdNewJob, setThresholdNewJob] = useState<number>(0);
  const [idPrev, setIdPrev] = useState<number>(0);
  const [listJob, setListJob] = useState<any[]>([]);
  const [themeId, setThemeId] = useState<number>(-1);
  const [bookmarked, setBookmarked] = React.useState(false);
  const accountId = localStorage.getItem("accountId");
  const [openModalLogin, setOpenModalLogin] = useState<boolean>(false);
  const language = useSelector((state: any) => state.changeLaguage.language);
  const [postDetail, setPostDetail] = useState<any>({});

  const [idCv, setIdCv] = useState<number>(0);
  const [openModalApply, setOpenModalApply] = useState<boolean>(false);
  const [filePDFParent, setFilePDFParent] = useState<File | null>(null);
  const {
    ref_list_slider,
    handleNext,
    checkNext,
    checkPrev,
    handleClickDownTouch,
    handlePrev,
    handleClickDown,
    handleUpData,
    checkClick,
    setCheckClick,
  } = useSwiperAutoSlider(13);
  const router = useRouter();
  useEffect(() => {
    handleUpData();
  }, [theme]);
  useEffect(() => {
    const fetchDataa = async () => {
      try {
        const reponse = (await themeApi.getThemesEnable("vi")) as any;
        //console.log(reponse);
        if (reponse && reponse?.status === 200) {
          setTheme(reponse.data.data);
          setThemeId(reponse.data.data?.[0]?.id);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchDataa();
  }, []);
  useEffect(() => {
    //console.log(listJob);
  }, [listJob]);
  const fetchData = async () => {
    const res = (await postsApi.getPostByThemeId(
      Number(themeId),
      4,
      thresholdNewJob,
      language === 1 ? "vi" : "en",
      pageNewJob
    )) as any;
    //console.log(res);
    if (res && res.success === true) {
      setListJob(res.data?.posts);
      setPageTotal(res.data?.totalPage);
    }
  };

  const handleGetData = (id: number) => {
    setThemeId(id);
    setPageNewJob(0);
  };
  useEffect(() => {
    //console.log(themeId);
    if (themeId != -1) {
      setListJob([]);
      fetchData();
    }
  }, [pageNewJob, themeId, bookmarked, language]);

  const handleNextNewJob = () => {
    if (pageNewJob <= pageTotal) setPageNewJob(pageNewJob + 1);
  };

  const handlePrevNewJob = () => {
    if (pageNewJob !== 0) setPageNewJob(pageNewJob - 1);
  };

  const handleBookmarked = (id: number) => {
    try {
      const fetchData = async () => {
        const res = (await bookMarkApi.createBookMark(
          id
        )) as unknown as IBookmark;

        if (res && res.code === 200) {
          toast.success(
            language === 1 ? "Lưu bài viết thành công" : "Save post success",
            {
              position: "bottom-center",
              autoClose: 2000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "dark",
            }
          );
          setBookmarked(!bookmarked);
        } else {
          setOpenModalLogin(true);
        }
      };

      fetchData();
    } catch (error) {
      toast.error(
        language === 1
          ? "Bạn không thể đánh dấu bài viết của chính mình"
          : "You cannot bookmark your own post",
        {
          position: "bottom-center",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        }
      );
    }
  };

  const handleDeleteBookmarked = (id: number) => {
    try {
      const fetchData = async () => {
        const res = (await bookMarkApi.deleteBookMark(
          id
        )) as unknown as IBookmark;

        if (res && res.code === 200) {
          toast.success(
            language === 1
              ? "Bỏ lưu bài đăng thành công"
              : "Unsave post success",
            {
              position: "bottom-center",
              autoClose: 2000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "dark",
            }
          );
          setBookmarked(!bookmarked);
        } else {
          setOpenModalLogin(true);
        }
      };

      fetchData();
    } catch (error) {
      toast.error(
        language === 1
          ? "Bạn không thể xóa bài viết của chính mình"
          : "You cannot delete your own post",
        {
          position: "bottom-center",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        }
      );
    }
  };

  const handleToggleModal = () => {
    setOpenModalLogin(false);
  };

  return (
    <div className="flex justify-center w-full px-5 bg-blue-50">
      <div className="py-10 max-w-6xl w-full overflow-hidden">
        <div className="flex justify-between items-center mb-8">
          <h1
            className={`font-bold  text-blue-700 ${
              reponsiveMobile < 700 ? "text-base" : "text-2xl"
            }`}
          >
            {language === 1 ? `Công việc theo địa danh` : `Subject work`}
          </h1>

          <div className="flex items-center gap-5">
            <Link
              href="/more-topic"
              className=" text-blue-500 cursor-pointer underline hover:text-blue-600 text-sm"
            >
              {language === 1 ? `Xem thêm` : `See more`}
            </Link>

            <div className="flex justify-between">
              <button
                className="w-10 h-10 flex justify-center items-center rounded-full border-2 border-blue-500 hover:bg-blue-500 hover:text-white"
                onClick={() => handlePrevNewJob()}
              >
                <IoIosArrowBack />
              </button>
              <button
                className="w-10 h-10 flex justify-center items-center rounded-full border-2 border-blue-500 hover:bg-blue-500 hover:text-white ml-2"
                onClick={() => handleNextNewJob()}
              >
                <IoIosArrowForward />
              </button>
            </div>
          </div>
        </div>
        <SkeletonAll data={theme} type={3}>
          <div className="relative" style={{ marginBottom: "0px" }}>
            {checkPrev && (
              <div className="absolute group bg-white bg-opacity-20 inset-y-0 flex items-center left-0 w-12 justify-center z-10">
                <button
                  className="p-1 border-2 rounded-full text-white transition-all group-hover:p-2"
                  onClick={handlePrev}
                >
                  <MdKeyboardArrowLeft />
                </button>
              </div>
            )}
            <ul
              ref={ref_list_slider}
              className={` select-none inline-flex justify-center relative`}
              onTouchStart={handleClickDownTouch}
              onMouseDown={handleClickDown}
            >
              {theme &&
                theme?.length > 0 &&
                theme.map((item: any, index: number) => (
                  <li
                    key={index}
                    className={`w-[278.25px] h-[200px] group border-[1px] relative hover:border-blue-500 transition-all cursor-pointer rounded-lg flex flex-col items-center justify-center item-company overflow-hidden`}
                    onClick={() => {
                      if (checkClick) {
                        handleGetData(item.id);
                        refHoverPosition.current.style.transform = `translateX(${
                          index * 291.25
                        }px)`;
                      } else {
                        setCheckClick(true);
                      }
                    }}
                  >
                    <Image
                      src={item.image}
                      className="pointer-events-none w-full h-full"
                      width={160}
                      height={160}
                      alt="Kinh doanh"
                    />
                    <div
                      className={`absolute inset-0  z-10 ${
                        themeId === item.id
                          ? "bg-black/20"
                          : "bg-black/50 group-hover:bg-black/20"
                      }`}
                    ></div>
                    <h2 className="font-bold absolute bottom-8 text-white z-20 group-hover:shadow-black">
                      {handleShortTextHome(item.title, 15)}
                    </h2>
                    <p className="font-bold absolute bottom-3 text-white  z-20 group-hover:shadow-black">
                      {item.number_of_posts} việc làm
                    </p>
                  </li>
                ))}
              {theme?.length > 0 && (
                <div
                  className={`w-[278.25px] h-2 rounded-xl bg-blue-500 left-0 absolute -bottom-4 transition-all duration-500`}
                  ref={refHoverPosition}
                ></div>
              )}
            </ul>
            {checkNext && (
              <div className="absolute group bg-white text-white bg-opacity-20 inset-y-0 flex items-center right-0 w-12 justify-center z-10">
                <button
                  className="p-1 border-2 group-hover:p-2 transition-all rounded-full"
                  onClick={handleNext}
                >
                  <MdKeyboardArrowRight />
                </button>
              </div>
            )}
          </div>
        </SkeletonAll>

        <div className="flex justify-center">
          <SkeletonAll type={"jobTopic"} data={listJob}>
            <ul className="inline-flex flex-wrap justify-center list-job gap-[13px] py-8 min-w-full">
              {listJob &&
                listJob.length > 0 &&
                listJob.map((item, index) => (
                  <li key={index} className="relative">
                    <Link
                      href={`/post-detail/${item.id}`}
                      className={` h-fit group gap-x-2  px-4 border-[1px] hover:border-blue-500 transition-all duration-500  hover:bg-blue-50 bg-white hover:shadow-[rgba(17,_17,_26,_0.1)_0px_0px_16px] rounded-md  py-6 flex justify-between items-center item-job ${
                        reponsiveMobile < 650 ? "w-[86vw]" : "w-[569.5px]"
                      }`}
                    >
                      <div className="basis-3/12">
                        <div className="w-16 h-16 rounded-full overflow-hidden group-hover:shadow-[rgba(17,_17,_26,_0.1)_0px_0px_16px]  object-cover">
                          <Image
                            className="group-hover:scale-110 transition-all duration-500"
                            src={
                              item?.companyResourceData?.logo ?? item.image
                                ? item.image
                                : "/logo/logo.png"
                            }
                            alt="anh"
                            width={200}
                            height={200}
                          />
                        </div>
                      </div>
                      <div className="basis-8/12 h-full flex flex-col justify-between capitalize">
                        <div>
                          <h2
                            className="text-sm font-bold peer group-hover:drop-shadow-xl  group-hover:text-blue-500 max-w-full w-fit"
                            onMouseEnter={(e: any) => {
                              handleUpdatePosition(e);
                            }}
                          >
                            {handleShortTextHome(item.title, 20)}
                          </h2>
                          <div className="opacity-0 invisible transition-all relative z-50 duration-200 peer-hover:opacity-100 peer-hover:visible hover:visible hover:opacity-100 w-fit h-fit cursor-default">
                            <DescriptionHover>
                              <div className="flex flex-col gap-y-4 max-h-full">
                                <div className="flex items-center basis-1/6 gap-x-4">
                                  <Image
                                    className="w-20 h-20"
                                    alt=""
                                    src={
                                      item?.companyResourceData?.logo ??
                                      item.image
                                        ? item.image
                                        : "/logo/logo.png"
                                    }
                                    width={100}
                                    height={100}
                                  />
                                  <div className="flex flex-col gap-y-2  cursor-auto">
                                    <p className="text-base font-bold">
                                      {item.title}
                                    </p>
                                    <p className="text-sm font-semibold text-gray-400">
                                      {item.company_name}
                                    </p>
                                    <div className="flex text-white text-xs font-semibold gap-x-4">
                                      <p className="p-1 rounded-lg bg-blue-400">
                                        {handleShortValueNumber(
                                          item.salary_min.toString()
                                        )}{" "}
                                        -{" "}
                                        {handleShortValueNumber(
                                          item.salary_max.toString()
                                        )}{" "}
                                        {item.money_type_text}
                                      </p>
                                      <p className="p-1 rounded-lg bg-blue-400">
                                        {item?.job_type.job_type_name}
                                      </p>
                                      <p className="p-1 rounded-lg bg-blue-400">
                                        Thời hạn 5 ngày
                                      </p>
                                    </div>
                                  </div>
                                </div>
                                <div className="flex-1 flex flex-col gap-y-8 max-h-full overflow-y-scroll  cursor-auto">
                                  <div className="flex flex-col gap-y-2">
                                    <p className="font-bold py-1 px-2 border-l-4 border-blue-500">
                                      Mô tả công việc
                                    </p>
                                    <p className="text-sm font-medium">
                                      - Gọi điện chăm sóc KH cũ và tư vấn KH mới
                                      về các sản phẩm in ấn và quà tặng - Giải
                                      đáp các thắc mắc của khách hàng về sản
                                      phẩm qua gọi điện, chat, mail,... - Làm
                                      việc trực tiếp với khách hàng, ghi nhận
                                      thông tin và báo cáo nội dung cho trưởng
                                      phòng. - Thực hiện các vấn đề liên quan
                                      như trao đổi với khách hàng, kí kết và
                                      thực hiện hợp đồng. - Theo dõi quá trình
                                      thanh lý hợp đồng, công nợ, và các công
                                      việc chăm sóc khách hàng trước, trong và
                                      sau hợp đồng. - Công việc cụ thể trao đổi
                                      thêm khi phỏng vấn.
                                    </p>
                                  </div>
                                  <div className="flex flex-col gap-y-2">
                                    <p className="font-bold py-1 px-2 border-l-4 border-blue-500">
                                      Yêu cầu ứng viên
                                    </p>
                                    <p className="text-sm font-medium">
                                      - Gọi điện chăm sóc KH cũ và tư vấn KH mới
                                      về các sản phẩm in ấn và quà tặng - Giải
                                      đáp các thắc mắc của khách hàng về sản
                                      phẩm qua gọi điện, chat, mail,... - Làm
                                      việc trực tiếp với khách hàng, ghi nhận
                                      thông tin và báo cáo nội dung cho trưởng
                                      phòng. - Thực hiện các vấn đề liên quan
                                      như trao đổi với khách hàng, kí kết và
                                      thực hiện hợp đồng. - Theo dõi quá trình
                                      thanh lý hợp đồng, công nợ, và các công
                                      việc chăm sóc khách hàng trước, trong và
                                      sau hợp đồng. - Công việc cụ thể trao đổi
                                      thêm khi phỏng vấn.
                                    </p>
                                  </div>
                                </div>
                                <div className="flex basis-2/6 gap-x-2 cursor-pointer">
                                  <div className="flex justify-center items-center px-2">
                                    <div
                                      className="h-fit"
                                      onClick={(e) => {
                                        e.preventDefault();
                                        if (item.bookmarked === false) {
                                          handleBookmarked(item.id);
                                        } else {
                                          handleDeleteBookmarked(item.id);
                                        }
                                      }}
                                    >
                                      {item.accountId !== accountId &&
                                        (item.bookmarked === true ? (
                                          <SaveIconFill
                                            width={24}
                                            height={24}
                                          />
                                        ) : (
                                          <SaveIconOutline
                                            width={24}
                                            height={24}
                                          />
                                        ))}
                                    </div>
                                  </div>

                                  <div
                                    className="font-bold flex-1 p-2 rounded-xl bg-red-500 hover:bg-red-600 flex justify-center items-center text-white"
                                    onClick={() => {
                                      router.push(`/post-detail/${item.id}`);
                                    }}
                                  >
                                    Xem chi tiết
                                  </div>
                                  {item?.companyResourceData?.id === 2 && (
                                    <div
                                      className="font-bold flex-1 p-2 rounded-xl bg-blue-500 hover:bg-blue-600 flex justify-center items-center text-white"
                                      onClick={() => {
                                        if (item?.isActive) {
                                          setPostDetail(item);
                                          setOpenModalApply(true);
                                        }
                                      }}
                                    >
                                      Nộp đơn
                                    </div>
                                  )}
                                </div>
                              </div>
                            </DescriptionHover>
                          </div>
                        </div>
                        <div className="my-2 flex flex-col gap-y-1 font-medium">
                          <div className="flex items-center">
                            <Image
                              className="w-4 mr-1"
                              src={"/iconcompany.svg"}
                              alt="anh"
                              width={200}
                              height={200}
                            />
                            <p className="text-[9px]  drop-shadow-xl">
                              {handleShortTextHome(item.company_name, 30)}
                            </p>
                          </div>
                          {/* <div className="flex items-center">
                          <Image
                            className="w-4 mr-1"
                            src={"/icontime.svg"}
                            alt="anh"
                            width={200}
                            height={200}
                          />
                          <p className="text-[9px]  drop-shadow-xl">
                            {item.created_at_text}
                          </p>
                        </div>
                        <div className="flex items-center">
                          <Image
                            className="w-4 mr-1"
                            src={"/iconlocation.svg"}
                            alt="anh"
                            width={200}
                            height={200}
                          />
                          <p className="text-[9px]  drop-shadow-xl">
                            {item?.district}
                          </p>
                        </div> */}
                        </div>
                        <div className="inline-flex flex-wrap justify-start gap-1 font-extrabold">
                          <h3 className="text-[9px] py-1 px-2 rounded-md min-w-fit bg-blue-50 group-hover:text-blue-500">
                            {handleShortValueNumber(item.salary_min.toString())}{" "}
                            -{" "}
                            {handleShortValueNumber(item.salary_max.toString())}{" "}
                            {item.money_type_text}
                          </h3>
                          <h3 className="text-[9px] py-1 px-2 rounded-md min-w-fit bg-blue-50 group-hover:text-blue-500">
                            {item?.district}
                          </h3>
                        </div>
                      </div>

                      <div className="flex justify-start min-h-[70px] flex-1 relative ">
                        <div
                          className={` py-1 px-2 group-hover:text-white rounded-2xl h-fit transition-all duration-500 ${
                            item?.serviceType == "v2"
                              ? "bg-red-100 group-hover:bg-red-500 text-red-500"
                              : item?.serviceType == "v1"
                              ? "bg-green-100 group-hover:bg-green-500 text-green-500"
                              : item?.serviceType == "v3"
                              ? "bg-yellow-100 group-hover:bg-yellow-500 text-yellow-500"
                              : item?.serviceType == "v4"
                              ? "bg-violet-100 group-hover:bg-violet-500 text-violet-500"
                              : "bg-gray-100 group-hover:bg-gray-500  text-gray-500"
                          }   text-xs font-medium `}
                        >
                          {item?.serviceType == "v2"
                            ? "hot"
                            : item?.serviceType == "v1"
                            ? "new"
                            : item?.serviceType == "v3"
                            ? "trending"
                            : item?.serviceType == "v4"
                            ? "vip"
                            : "nor"}
                        </div>
                      </div>
                    </Link>
                  </li>
                ))}
            </ul>
          </SkeletonAll>
        </div>
        <div className="flex w-full justify-center gap-x-2 items-center">
          <button
            className="w-10 h-10 flex justify-center items-center rounded-full border-2 border-blue-500 hover:bg-blue-500 hover:text-white"
            onClick={() => {
              handlePrevNewJob();
            }}
          >
            <IoIosArrowBack />
          </button>
          <div>
            <p className="flex items-center gap-x-1">
              <span className="text-blue-500">{pageNewJob + 1}</span>/
              <span>{pageTotal + 1}</span>trang
            </p>
          </div>
          <button
            className="w-10 h-10 flex justify-center items-center rounded-full border-2 border-blue-500 hover:bg-blue-500 hover:text-white"
            onClick={() => {
              handleNextNewJob();
            }}
          >
            <IoIosArrowForward />
          </button>
        </div>
        {/* <div className="absolute top-0 right-0 flex items-center">
          <a
            className="mr-4 font-bold text-black hover:text-black/80 cursor-pointer"
            href="#"
          >
            Xem thêm
          </a>
          <div className="w-20 flex justify-between">
            <button
              className="bg-black hover:shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px] w-10 h-10 rounded-lg flex justify-center items-center group"
              onClick={() => handlePrevNewJob()}
            >
              <MdKeyboardArrowLeft color="white" fontSize="1.8em" />
            </button>
            <button
              className="bg-black hover:shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px] w-10 h-10 rounded-lg flex justify-center items-center group ml-2"
              onClick={() => handleNextNewJob()}
            >
              <MdKeyboardArrowRight color="white" fontSize="1.8em" />
            </button>
          </div>
        </div> */}
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

export default TopCompanyComponent;
