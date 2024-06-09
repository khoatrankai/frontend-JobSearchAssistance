/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import "./ListJobComponent.scss";
import postsApi from "@/api/posts/postsApi";
import Link from "next/link";
import { SaveIconFill, SaveIconOutline } from "@/icons";
import bookMarkApi from "@/api/bookmarks/bookMarkApi";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useSelector } from "react-redux";
//
import ShortText from "@/util/ShortText";
import SkeletonAll from "@/util/SkeletonAll";
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md";
import DescriptionHoverProvider from "@/util/DescriptionHoverProvider/DescriptionHoverProvider";
import { Route } from "react-router-dom";
import { useRouter } from "next/navigation";
import EncodingDescription from "@/util/EncodingDescription/EncodingDescription";
import { IoFilterOutline } from "react-icons/io5";
import { IoIosArrowDown } from "react-icons/io";
import { IoIosArrowBack } from "react-icons/io";
import { IoIosArrowForward } from "react-icons/io";
import useSwiperAutoSlider from "@/util/SwiperAutoSlider";
import locationApi from "@/api/location/locationApi";
import categoryApi from "@/api/category/categoryApi";
import ModalApply from "../ModalApply/ModalApply";
import appplicationApi from "@/api/applicationApi";
import useRouterCustom from "@/util/useRouterCustom/useRouterCustom";
import { useSrollContext } from "@/context/AppProvider";
import SkeletonCustom from "@/util/FormSkeleton/SkeletonCustom";

type Props = {};

interface IBookmark {
  code: number;
  message: string;
}

const ListJobComponent = (props: Props) => {
  const { DescriptionHover, handleUpdatePosition } = DescriptionHoverProvider();
  const { handleShortTextHome, handleShortValueNumber } = ShortText();
  const { pushBlank } = useRouterCustom();
  const {
    ref_list_slider,
    handleNext,
    checkNext,
    checkPrev,
    handlePrev,
    handleClickDown,
    handleUpData,
    checkClick,
    setCheckClick,
  } = useSwiperAutoSlider(8);
  const profile = useSelector((state: any) => state.profile.profile);
  const {
    ref_list_slider: ref_list_slider2,
    handleNext: handleNext2,

    handlePrev: handlePrev2,
    handleClickDown: handleClickDown2,
    handleUpData: handleUpData2,
    checkClick: checkClick2,
    setCheckClick: setCheckClick2,
  } = useSwiperAutoSlider(8);

  const [dataListFilter, setListFilter] = useState<any>([
    { name: "Địa điểm", id: 0 },
    { name: "Ngành nghề", id: 1 },
  ]);
  const [postDetail, setPostDetail] = useState<any>({});
  const { reponsiveMobile } = useSrollContext();
  const [provinceId, setProvinceId] = useState<any>(null);
  const [currentPage, setCurrentPage] = useState<any>(1);
  const [totalPage, setTotalPage] = useState<any>(0);
  const [careerId, setCareerId] = useState<any>(null);
  const [chooseFilter, setChooseFilter] = useState<any>(0);
  const [pageNewJob, setPageNewJob] = useState<number>(0);
  const [thresholdNewJob, setThresholdNewJob] = useState<number>(0);
  const [idPrev, setIdPrev] = useState<number>(0);
  const [listJob, setListJob] = useState<any[]>([]);
  // const [bookmarked, setBookmarked] = React.useState(false);
  const accountId = localStorage.getItem("accountId");
  const categoryId = useSelector((state: any) => state.categoryId);
  // const [openModalLogin, setOpenModalLogin] = useState<boolean>(false);
  const [dataLocationFilter, setLocationFilter] = useState<any>([]);
  const [dataListCareer, setListCareer] = useState<any>([]);
  const language = useSelector((state: any) => state.changeLaguage.language);
  const [tabFilter, setTabFilter] = useState<boolean>(false);
  const { handleDecodingDescription } = EncodingDescription();
  const [idCv, setIdCv] = useState<number>(0);
  const [openModalApply, setOpenModalApply] = useState<boolean>(false);
  const [filePDFParent, setFilePDFParent] = useState<File | null>(null);
  const languageRedux = useSelector(
    (state: any) => state.changeLaguage.language
  );
  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      const res = (await postsApi.getPostNewestV3(
        null,
        careerId ? Number(careerId) : null,
        null,
        provinceId,
        9,
        null,
        language === 1 ? "vi" : "en",
        currentPage
      )) as any;
      console.log(res);

      if (res && res.status === 200) {
        setListJob(res.data);
        setTotalPage(res.totalPage);
        // setCurrentPage(res.currentPage);
        console.log(res);
      }
    };
    setListJob([]);
    fetchData();
  }, [careerId, provinceId, language, currentPage]);
  const handleNextNewJob = () => {
    if (currentPage <= totalPage) {
      setCurrentPage(currentPage + 1);
    }
  };
  const handlePrevNewJob = () => {
    if (currentPage !== 0) {
      setCurrentPage(currentPage - 1);
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

  // get data when cookie modify

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
          // console.log("bam", id, listJob);
          setListJob(
            listJob.map((dt: any) => {
              if (dt.id === id) {
                return { ...dt, bookmarked: true };
              }
              return dt;
            })
          );
          // setBookmarked(!bookmarked);
        } else {
          toast.error(
            language === 1
              ? "Lưu bài viết không thành công"
              : "Save post success",
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
          // setOpenModalLogin(true);
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
          setListJob(
            listJob.map((dt: any) => {
              if (dt.id === id) {
                return { ...dt, bookmarked: false };
              }
              return dt;
            })
          );
          // setBookmarked(!bookmarked);
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

  // const handleToggleModal = () => {
  //   setOpenModalLogin(false);
  // };

  useEffect(() => {
    const fetchData = async () => {
      const res = (await locationApi.getAllProvinces(
        language ? "vi" : "en"
      )) as any;
      const dataCareer = (await categoryApi.getParentCategory(language)) as any;

      if (res && res.code === 200) {
        setLocationFilter(res.data);
        console.log(res);
      }
      if (dataCareer && dataCareer.code === 200) {
        console.log(dataCareer);
        setListCareer(dataCareer.data);
      }
    };
    fetchData();
  }, [language]);
  useEffect(() => {
    handleUpData();
  }, [dataLocationFilter]);
  useEffect(() => {
    handleUpData2();
  }, [dataListCareer]);
  useEffect(() => {
    handleUpData();
    handleUpData2();
    setCareerId(null);
    setProvinceId(null);
    setCurrentPage(0);
  }, [chooseFilter]);
  useEffect(() => {
    setCurrentPage(0);
  }, [careerId, provinceId]);
  useEffect(() => {
    console.log(listJob);
  }, [listJob]);

  return (
    <div className="flex justify-center py-12 px-5 bg-blue-50 ">
      <div className="w-full max-w-6xl relative">
        <div className="flex justify-between items-center  mb-6">
          <h1
            className={`font-bold  text-blue-700 ${
              reponsiveMobile < 700 ? "text-xl" : "text-2xl"
            }`}
          >
            {language === 1 ? `Việc làm mới` : `New job`}
          </h1>
          <div className="flex items-center gap-9 w-fit">
            <a
              className=" text-blue-700 hover:text-blue-500 cursor-pointer underline text-sm"
              href="/more-new"
            >
              {language === 1 ? `Xem thêm` : `See more`}
            </a>
            <div className=" flex justify-between">
              <button
                className="w-10 h-10 flex justify-center items-center rounded-full border-2 border-blue-500 hover:bg-blue-500 hover:text-white"
                onClick={() => handlePrevNewJob()}
              >
                <IoIosArrowBack />
              </button>
              <button
                className=" w-10 h-10 flex justify-center items-center rounded-full border-2 border-blue-500 hover:bg-blue-500 hover:text-white ml-2"
                onClick={() => handleNextNewJob()}
              >
                <IoIosArrowForward />
              </button>
            </div>
          </div>
        </div>
        <div
          className={` my-2 flex gap-4 ${
            reponsiveMobile < 700 ? "flex-col" : ""
          }`}
        >
          <div className="p-2 border-2 rounded-lg w-80 flex gap-x-2 bg-white">
            <div className="flex items-center text-gray-500 font-semibold gap-x-2 text-sm">
              <IoFilterOutline className="text-xs" />
              <p className="text-nowrap">Lọc theo :</p>
            </div>
            <div
              className="w-full relative flex gap-x-20 items-center justify-between"
              onClick={(e: any) => {
                setTabFilter(!tabFilter);
                e.preventDefault();
              }}
            >
              <p>{dataListFilter[chooseFilter].name}</p>
              <IoIosArrowDown />
              <div
                className={`absolute inset-x-0 py-2 rounded-md bg-white border-2 transition-transform duration-300 top-12 z-10 ${
                  tabFilter ? "" : "invisible -translate-y-2 opacity-0"
                }`}
              >
                <ul className="w-full h-fit">
                  {dataListFilter.map((dt: any, ikey: any) => {
                    return (
                      <li
                        className="flex px-5 h-10 items-center item-filter-checkbox group cursor-pointer hover:bg-gray-300/40"
                        onClick={(e: any) => {
                          e.stopPropagation();
                          e.preventDefault();
                          setTabFilter(!tabFilter);

                          setChooseFilter(dt.id);
                        }}
                        key={ikey}
                      >
                        <input
                          className="mr-2 group-hover:bg-black"
                          type="radio"
                        />
                        <label className="group-hover:font-bold group-hover:text-blue-600 cursor-pointer">
                          <span>{dt.name}</span>
                        </label>
                      </li>
                    );
                  })}
                </ul>
              </div>
            </div>
          </div>
          <div className="flex-1 flex items-center gap-x-2">
            <button
              className="w-8 h-8 flex justify-center items-center rounded-full border-2 border-blue-500 hover:bg-blue-500 hover:text-white"
              onClick={() => {
                if (chooseFilter === 0) {
                  handlePrev();
                } else {
                  handlePrev2();
                }
              }}
            >
              <IoIosArrowBack />
            </button>
            <div className="flex-1 overflow-hidden h-full flex items-center w-8">
              {/* {chooseFilter === 0 ? ( */}
              <SkeletonCustom
                data={dataLocationFilter[0]}
                className={"w-96 h-9"}
              >
                <ul
                  className={`flex gap-x-2 h-full min-w-fit items-center ${
                    chooseFilter !== 0 && "hidden"
                  }`}
                  ref={ref_list_slider}
                  onMouseDown={(e: any) => {
                    e.preventDefault();
                    handleClickDown(e);
                  }}
                  onMouseUp={(e: any) => {
                    setCheckClick(true);
                  }}
                >
                  {dataLocationFilter.map((dt: any, ikey: any) => {
                    return (
                      <li
                        className={`flex min-w-fit p-2  items-center justify-center bg-gray-200 rounded-2xl cursor-pointer ${
                          provinceId === dt.id && "!bg-blue-500 !text-white"
                        }  ${
                          checkClick ? "hover:bg-blue-500 hover:text-white" : ""
                        }`}
                        key={ikey}
                        onClick={() => {
                          setProvinceId(dt.id);
                        }}
                      >
                        <h2 className="mr-1 text-sm font-medium pointer-events-none">
                          {dt.name}
                        </h2>
                      </li>
                    );
                  })}
                </ul>
              </SkeletonCustom>

              {/* ) : ( */}
              <SkeletonCustom data={dataListCareer[0]} className={"w-96 h-9"}>
                <ul
                  className={`flex gap-x-2 h-full min-w-fit items-center ${
                    chooseFilter === 0 && "hidden"
                  }`}
                  ref={ref_list_slider2}
                  onMouseDown={(e: any) => {
                    e.preventDefault();
                    handleClickDown2(e);
                  }}
                  onMouseUp={(e: any) => {
                    setCheckClick2(true);
                  }}
                >
                  {dataListCareer.map((dt: any, ikey: any) => {
                    return (
                      <li
                        className={`flex min-w-fit p-2  items-center justify-center bg-gray-200 rounded-2xl cursor-pointer  ${
                          careerId === dt.id && "!bg-blue-500 !text-white"
                        } ${
                          checkClick2
                            ? "hover:bg-blue-500 hover:text-white"
                            : ""
                        }`}
                        key={ikey}
                        onClick={() => {
                          setCareerId(dt.id);
                        }}
                      >
                        <h2 className="mr-1 text-sm font-medium pointer-events-none">
                          {dt.name}
                        </h2>
                      </li>
                    );
                  })}
                </ul>
              </SkeletonCustom>

              {/* )} */}
            </div>
            <button
              className="w-8 h-8 flex justify-center items-center rounded-full border-2 border-blue-500 hover:bg-blue-500 hover:text-white"
              onClick={() => {
                if (chooseFilter === 0) {
                  handleNext();
                } else {
                  handleNext2();
                }
              }}
            >
              <IoIosArrowForward />
            </button>
          </div>
        </div>
        <SkeletonAll data={listJob} type={"newJob"}>
          <div className="flex justify-center">
            <ul className="inline-flex flex-wrap justify-center list-job gap-5 w-full">
              {listJob &&
                listJob.length > 0 &&
                listJob.map((item, index) => (
                  <li key={index} className="relative">
                    <Link
                      href={`/post-detail/${item?.id}`}
                      target="_blank"
                      className={`w-[370px] h-fit group gap-x-2  px-4 border-[1px] hover:border-blue-500 transition-all duration-500  hover:bg-blue-50 bg-white hover:shadow-[rgba(17,_17,_26,_0.1)_0px_0px_16px] rounded-md  py-6 flex justify-between items-center item-job`}
                    >
                      <div className="basis-3/12">
                        <div className="w-16 h-16 rounded-full overflow-hidden group-hover:shadow-[rgba(17,_17,_26,_0.1)_0px_0px_16px]  object-cover">
                          <Image
                            className="group-hover:scale-110 transition-all duration-500"
                            src={item.image ? item.image : "/logo/logo.png"}
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
                          <div className="opacity-0 invisible transition-all relative z-50 duration-500 peer-hover:opacity-100 peer-hover:visible hover:visible hover:opacity-100 w-fit h-fit cursor-default">
                            <DescriptionHover>
                              <div className="flex flex-col gap-y-4 max-h-full">
                                <div className="flex items-center basis-1/6 gap-x-4">
                                  <Image
                                    className="w-20 h-20"
                                    alt=""
                                    src={
                                      item.image ? item.image : "/goapply.png"
                                    }
                                    width={100}
                                    height={100}
                                  />
                                  <div className="flex flex-col gap-y-2  cursor-auto">
                                    <p className="text-base font-bold">
                                      {item.title}
                                    </p>
                                    <p className="text-sm font-semibold text-gray-400">
                                      {item.companyName}
                                    </p>
                                    <div className="flex text-white text-xs font-medium gap-x-4">
                                      <p className="p-1 rounded-lg bg-blue-400">
                                        {handleShortValueNumber(
                                          item.salaryMin.toString()
                                        )}{" "}
                                        -{" "}
                                        {handleShortValueNumber(
                                          item.salaryMax.toString()
                                        )}{" "}
                                        {item.moneyType}
                                      </p>
                                      <p className="p-1 rounded-lg bg-blue-400">
                                        {item?.jobType.name}
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
                                    <pre className="whitespace-pre-wrap font-medium">
                                      {
                                        handleDecodingDescription(
                                          item?.description ?? ""
                                        )[0]
                                      }
                                    </pre>
                                  </div>
                                  <div className="flex flex-col gap-y-2">
                                    <p className="font-bold py-1 px-2 border-l-4 border-blue-500">
                                      Yêu cầu ứng viên
                                    </p>

                                    <pre className="whitespace-pre-wrap text-sm font-medium">
                                      {
                                        handleDecodingDescription(
                                          item?.description ?? ""
                                        )[1]
                                      }
                                    </pre>
                                  </div>
                                  <div className="flex flex-col gap-y-2">
                                    <p className="font-bold py-1 px-2 border-l-4 border-blue-500">
                                      Quyền lợi được hưởng
                                    </p>

                                    <pre className="whitespace-pre-wrap text-sm font-medium">
                                      {
                                        handleDecodingDescription(
                                          item?.description ?? ""
                                        )[2]
                                      }
                                    </pre>
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
                                      // router.push(`/post-detail/${item.id}`);
                                      pushBlank(`/post-detail/${item.id}`);
                                    }}
                                  >
                                    Xem chi tiết
                                  </div>
                                  {item?.companyResourceData?.id === 2 && (
                                    <div
                                      className="font-bold flex-1 p-2 rounded-xl bg-blue-500 hover:bg-blue-600 flex justify-center items-center text-white"
                                      onClick={() => {
                                        setPostDetail(item);
                                        setOpenModalApply(true);
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
                            {/* <Image
                                className="w-4 mr-1"
                                src={"/iconcompany.svg"}
                                alt="anh"
                                width={200}
                                height={200}
                              /> */}
                            <p className="text-xs text-gray-500  drop-shadow-xl">
                              {handleShortTextHome(item.companyName, 20)}
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
                                {item.createdAtText}
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
                                {item?.location?.district?.fullName}
                              </p>
                            </div> */}
                        </div>
                        <div className="inline-flex flex-wrap justify-start gap-1 font-extrabold">
                          <h3 className="text-[9px] py-1 px-2 rounded-md min-w-fit bg-blue-50 group-hover:text-blue-500  ">
                            {handleShortValueNumber(item.salaryMin.toString())}{" "}
                            -{" "}
                            {handleShortValueNumber(item.salaryMax.toString())}{" "}
                            {item.moneyType}
                          </h3>
                          <h3 className="text-[9px] py-1 px-2 rounded-md min-w-fit bg-blue-50 group-hover:text-blue-500  ">
                            {item?.location?.district?.fullName}
                          </h3>
                        </div>
                      </div>

                      <div className="flex justify-start min-h-[70px] flex-1 relative ">
                        <div
                          className={` py-1 px-2 group-hover:text-white rounded-2xl h-fit transition-all duration-500 ${
                            index % 2
                              ? "bg-red-100 group-hover:bg-red-500 text-red-500"
                              : "bg-green-100 group-hover:bg-green-500  text-green-500"
                          }   text-xs font-medium `}
                        >
                          {index % 2 ? "hot" : "new"}
                        </div>
                      </div>
                    </Link>
                  </li>
                ))}
            </ul>
          </div>
        </SkeletonAll>
        <div className="flex w-full justify-center gap-x-2 items-center mt-4">
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
              <span className="text-blue-500">{currentPage + 1}</span>/
              <span>{totalPage + 1}</span>trang
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

export default ListJobComponent;
