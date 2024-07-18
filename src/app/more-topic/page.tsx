/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import themeApi from "../../api/theme/themeApi";
import postsApi from "../../api/posts/postsApi";
import { useSrollContext } from "@/context/AppProvider";
import useSwiperAutoSlider from "@/util/SwiperAutoSlider";
import Link from "next/link";
import { SaveIconFill, SaveIconOutline } from "@/icons";
import bookMarkApi from "@/api/bookmarks/bookMarkApi";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import InfiniteScroll from "react-infinite-scroll-component";

import { useSelector } from "react-redux";
import { CircularProgress } from "@mui/material";
import ShortText from "@/util/ShortText";
import DescriptionHoverProvider from "@/util/DescriptionHoverProvider/DescriptionHoverProvider";
import { useRouter } from "next/navigation";
import EncodingDescription from "@/util/EncodingDescription/EncodingDescription";
import ModalApply from "@/components/ModalApply/ModalApply";
import appplicationApi from "@/api/applicationApi";
import SkeletonAll from "@/util/SkeletonAll";

type Props = {};

interface IPostTopic {
  success: boolean;
  data: any;
}

interface IBookmark {
  code: number;
  message: string;
}

const Page = (props: Props) => {
  const { handleShortTextHome, handleShortValueNumber } = ShortText();
  const { DescriptionHover, handleUpdatePosition } = DescriptionHoverProvider();
  const router = useRouter();
  const { handleDecodingDescription } = EncodingDescription();
  const { handleLoadHrefPage } = useSrollContext();
  const {
    ref_list_slider,
    handleNext,
    checkNext,
    checkPrev,
    handlePrev,
    handleClickDown,
    checkClick,
    setCheckClick,
    handleUpData,
    handleClickDownTouch,
  } = useSwiperAutoSlider(13);
  const [theme, setTheme] = useState<any>([]);
  const [thresholdNewJob, setThresholdNewJob] = useState<number>(0);
  const [pageNewJob, setPageNewJob] = useState<number>(0);
  const [listJob, setListJob] = useState<any[]>([]);
  const [themeId, setThemeId] = useState<number>(120);
  const [accountId, setAccountId] = useState<any>("");
  const [loading, setLoading] = useState(false);
  const [hasMoreData, setHasMoreData] = useState(true);
  const [openModalLogin, setOpenModalLogin] = useState<boolean>(false);
  const language = useSelector((state: any) => state.changeLaguage.language);
  const [loadingUi, setLoadingUi] = useState<boolean>(false);
  const languageRedux = useSelector(
    (state: any) => state.changeLaguage.language
  );
  const profile = useSelector((state: any) => state.profile.profile);
  const [postDetail, setPostDetail] = useState<any>({});

  const [idCv, setIdCv] = useState<number>(0);
  const [openModalApply, setOpenModalApply] = useState<boolean>(false);
  const [filePDFParent, setFilePDFParent] = useState<File | null>(null);
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
  useEffect(() => {
    setAccountId(localStorage.getItem("accountId"));
  }, []);
  useEffect(() => {
    // handleLoadHrefPage();
    const fetchData = async () => {
      try {
        const reponse = (await themeApi.getThemesEnable("vi")) as any;
        if (reponse && reponse?.status === 200) {
          setTheme(reponse.data.data);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);
  useEffect(() => {
    handleUpData();
  }, [theme]);

  const fetchData = async () => {
    setListJob([]);
    const res = (await postsApi.getPostByThemeId(
      Number(themeId),
      9,
      thresholdNewJob,
      language === 1 ? "vi" : "en",
      pageNewJob
    )) as unknown as IPostTopic;

    if (res && res.success === true) {
      setListJob(res.data?.posts);
      setLoadingUi(false);
    }
  };

  const handleGetData = (id: number) => {
    setThemeId(id);
  };

  useEffect(() => {
    setLoadingUi(true);
    fetchData();
  }, [themeId, language]);

  const handleToggleModal = () => {
    setOpenModalLogin(false);
  };

  const handleBookmarked = (id: number) => {
    try {
      const fetchData = async () => {
        const res = (await bookMarkApi.createBookMark(
          id
        )) as unknown as IBookmark;

        if (res && res.code === 200) {
          toast.success("Save post success", {
            position: "bottom-center",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
          });

          setListJob((prevList) =>
            prevList.map((item) =>
              item.id === id ? { ...item, bookmarked: true } : item
            )
          );
        } else {
          setOpenModalLogin(true);
        }
      };

      fetchData();
    } catch (error) {
      toast.error("You cannot bookmark your own post", {
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

  const handleDeleteBookmarked = (id: number) => {
    try {
      const fetchData = async () => {
        const res = (await bookMarkApi.deleteBookMark(
          id
        )) as unknown as IBookmark;

        if (res && res.code === 200) {
          toast.success("Unsave post success", {
            position: "bottom-center",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
          });

          setListJob((prevList) =>
            prevList.map((item) =>
              item.id === id ? { ...item, bookmarked: false } : item
            )
          );
        }
      };

      fetchData();
    } catch (error) {
      toast.error("You cannot delete your own post", {
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

  const loadMore = async () => {
    if (!loading && hasMoreData) {
      setLoading(true);

      setTimeout(async () => {
        const res = (await postsApi.getPostByThemeId(
          Number(themeId),
          9,
          thresholdNewJob,
          language === 1 ? "vi" : "en",
          pageNewJob
        )) as unknown as IPostTopic;

        if (res && res.success === true) {
          setListJob([...listJob, ...res.data?.posts]);
          setThresholdNewJob(listJob[listJob.length - 1]?.id);

          if (res.data?.posts.length === 0) {
            setHasMoreData(false);
          }
        }

        setLoading(false);
      }, 0);
    }
  };

  return (
    <div className="flex justify-center w-full px-5 bg-gray-50">
      {loadingUi === true && (
        <div className="fixed top-1/2 left-1/2 transform(-50%, -50%)">
          <CircularProgress />
        </div>
      )}
      <div className="py-10 max-w-6xl w-full overflow-hidden">
        <h1 className="font-bold text-2xl mb-6">
          {language === 1
            ? `Tất cả công việc theo chủ đề`
            : `All work by subject`}
        </h1>

        {/* {loadingUi === false && ( */}
        <>
          <SkeletonAll data={theme} type={3}>
            <div className="relative" style={{ marginBottom: "30px" }}>
              {checkPrev && (
                <div className="absolute group bg-white bg-opacity-20 inset-y-0 flex items-center left-0 w-12 justify-center z-10">
                  <button
                    className="p-1 border-2 rounded-full transition-all group-hover:p-2"
                    onClick={handlePrev}
                  >
                    <Image
                      className="w-6"
                      src={"/iconleft.svg"}
                      alt="left"
                      width={200}
                      height={200}
                    />
                  </button>
                </div>
              )}

              <ul
                ref={ref_list_slider}
                className={`select-none inline-flex justify-center gap-x-[13px]`}
              >
                {theme &&
                  theme?.length > 0 &&
                  theme.map((item: any, index: number) => (
                    <li
                      key={index}
                      className="w-[160px] h-[160px] bg-red-500 rounded-lg flex flex-col items-center justify-center item-company overflow-hidden"
                      onClick={() => {
                        if (checkClick) {
                          handleGetData(item.id);
                        } else {
                          setCheckClick(true);
                        }
                      }}
                      onMouseDown={(e: any) => {
                        handleClickDown(e);
                      }}
                      onTouchStart={handleClickDownTouch}
                      // onMouseMove={() => {}}
                    >
                      <Image
                        src={item.image}
                        className="pointer-events-none w-full h-full"
                        width={160}
                        height={160}
                        alt="Kinh doanh"
                      />
                      <h2 className="font-bold absolute text-sm bottom-8 text-white max-w-36 text-wrap">
                        {item.title}
                      </h2>
                      <p className="font-bold absolute text-xs bottom-3 text-white">
                        {item.number_of_posts} việc làm
                      </p>
                    </li>
                  ))}
              </ul>
              {checkNext && (
                <div className="absolute group bg-white bg-opacity-20 inset-y-0 flex items-center right-0 w-12 justify-center z-10">
                  <button
                    className="p-1 border-2 group-hover:p-2 transition-all rounded-full"
                    onClick={handleNext}
                  >
                    <Image
                      className="w-6"
                      src={"/iconright.svg"}
                      alt="right"
                      width={200}
                      height={200}
                    />
                  </button>
                </div>
              )}
            </div>
          </SkeletonAll>
          <SkeletonAll data={listJob} type={"newJob"}>
            <InfiniteScroll
              style={{
                display: "flex",
                flexWrap: "wrap",
                justifyContent: "center",
              }}
              dataLength={listJob.length}
              next={loadMore}
              hasMore={true}
              loader={<></>}
            >
              <div className="flex justify-center">
                <ul className="inline-flex flex-wrap justify-center list-job gap-5 w-full">
                  {listJob &&
                    listJob.length > 0 &&
                    listJob.map((item: any, index: any) => (
                      <li key={index} className="relative">
                        <Link
                          href={`/post-detail/${item.id}`}
                          className={`w-[370px] h-fit group gap-x-2  px-4 border-[1px] hover:border-blue-500 transition-all duration-500  hover:bg-blue-50 bg-white hover:shadow-[rgba(17,_17,_26,_0.1)_0px_0px_16px] rounded-md  py-6 flex justify-between items-center item-job`}
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
                                          item.image
                                            ? item.image
                                            : "/goapply.png"
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
                                          - Gọi điện chăm sóc KH cũ và tư vấn KH
                                          mới về các sản phẩm in ấn và quà tặng
                                          - Giải đáp các thắc mắc của khách hàng
                                          về sản phẩm qua gọi điện, chat,
                                          mail,... - Làm việc trực tiếp với
                                          khách hàng, ghi nhận thông tin và báo
                                          cáo nội dung cho trưởng phòng. - Thực
                                          hiện các vấn đề liên quan như trao đổi
                                          với khách hàng, kí kết và thực hiện
                                          hợp đồng. - Theo dõi quá trình thanh
                                          lý hợp đồng, công nợ, và các công việc
                                          chăm sóc khách hàng trước, trong và
                                          sau hợp đồng. - Công việc cụ thể trao
                                          đổi thêm khi phỏng vấn.
                                        </p>
                                      </div>
                                      <div className="flex flex-col gap-y-2">
                                        <p className="font-bold py-1 px-2 border-l-4 border-blue-500">
                                          Yêu cầu ứng viên
                                        </p>
                                        <p className="text-sm font-medium">
                                          - Gọi điện chăm sóc KH cũ và tư vấn KH
                                          mới về các sản phẩm in ấn và quà tặng
                                          - Giải đáp các thắc mắc của khách hàng
                                          về sản phẩm qua gọi điện, chat,
                                          mail,... - Làm việc trực tiếp với
                                          khách hàng, ghi nhận thông tin và báo
                                          cáo nội dung cho trưởng phòng. - Thực
                                          hiện các vấn đề liên quan như trao đổi
                                          với khách hàng, kí kết và thực hiện
                                          hợp đồng. - Theo dõi quá trình thanh
                                          lý hợp đồng, công nợ, và các công việc
                                          chăm sóc khách hàng trước, trong và
                                          sau hợp đồng. - Công việc cụ thể trao
                                          đổi thêm khi phỏng vấn.
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
                                          router.push(
                                            `/post-detail/${item.id}`
                                          );
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
                                {handleShortValueNumber(
                                  item.salary_min.toString()
                                )}{" "}
                                -{" "}
                                {handleShortValueNumber(
                                  item.salary_max.toString()
                                )}{" "}
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
              </div>
            </InfiniteScroll>
          </SkeletonAll>
          {loading && (
            <div className="mt-5">
              <SkeletonAll type={"newJob"} data={!loading}>
                loading
              </SkeletonAll>
            </div>
          )}
        </>
        {/* )} */}
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

export default Page;
