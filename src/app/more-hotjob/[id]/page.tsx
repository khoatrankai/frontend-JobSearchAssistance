/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
"use client";
import hotJobApi from "@/api/hotjob/hotJobApi";
import { useParams, useRouter } from "next/navigation";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { ToastContainer, toast } from "react-toastify";
import {
  FilterIcon,
  LightFilterIcon,
  SaveIconFill,
  SaveIconOutline,
} from "@/icons";
import bookMarkApi from "@/api/bookmarks/bookMarkApi";
import "react-toastify/dist/ReactToastify.css";
import InfiniteScroll from "react-infinite-scroll-component";
import { Select, SelectProps, Space } from "antd";
import locationApi from "@/api/location/locationApi";
import "./page.scss";

import { useSelector } from "react-redux";
import { useSrollContext } from "@/context/AppProvider";
import ShortText from "@/util/ShortText";
import DescriptionHoverProvider from "@/util/DescriptionHoverProvider/DescriptionHoverProvider";
import EncodingDescription from "@/util/EncodingDescription/EncodingDescription";
import ModalApply from "@/components/ModalApply/ModalApply";
import appplicationApi from "@/api/applicationApi";
import SkeletonAll from "@/util/SkeletonAll";
type Props = {};

interface IHotJob {
  is_over: boolean;
  total: number;
  data: any;
  status: number;
}

interface IBookmark {
  code: number;
  message: string;
}

const page = (props: Props) => {
  const { handleShortTextHome, handleShortValueNumber } = ShortText();
  const { DescriptionHover, handleUpdatePosition } = DescriptionHoverProvider();
  const router = useRouter();
  const { handleDecodingDescription } = EncodingDescription();
  const [pageNumber, setPageNumber] = React.useState(0);
  const [listHotJob, setListHotJob] = useState<any[]>([]);
  const [total, setTotal] = useState<number>(0);

  const [bookmarked, setBookmarked] = React.useState(false);
  const [loading, setLoading] = useState(false);
  const [hasMoreData, setHasMoreData] = useState(true);
  const [idFilterProvinces, setIdFilterProvinces] = React.useState("");
  const { handleLoadHrefPage } = useSrollContext();
  const [provincesData, setProvincesData] = React.useState<
    [
      {
        id: string;
        name: string;
        name_en: string;
        full_name: string;
        full_name_en: string;
        code_name: string;
        administrative_unit_id: number;
        administrative_region_id: number;
      }
    ]
  >();
  const [openModalLogin, setOpenModalLogin] = useState<boolean>(false);
  const [optionsProvinces, setOptionsProvinces] = React.useState<
    SelectProps["options"]
  >([]);
  const language = useSelector((state: any) => state.changeLaguage.language);
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
  // useParams
  const { id } = useParams();
  const [accountId, setAccountId] = useState<any>("");
  useEffect(() => {
    setAccountId(localStorage.getItem("accountId"));
  }, []);
  useEffect(() => {
    // handleLoadHrefPage();
    const url = `http://localhost:1902/api/v3/posts/topic/${id}?a=394,370`;
    const fetchData = async () => {
      setListHotJob([]);
      const res = (await hotJobApi.getHotJobById(
        url,
        pageNumber,
        18,
        language === 1 ? "vi" : "en",
        idFilterProvinces ? idFilterProvinces : null
      )) as unknown as IHotJob;

      setTotal(res.total);

      if (res && res.status === 200) {
        setListHotJob(res.data);
      }
    };

    fetchData();
  }, [bookmarked, idFilterProvinces, language]);

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

          setListHotJob((prevList) =>
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

  const handleToggleModal = () => {
    setOpenModalLogin(false);
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

          setListHotJob((prevList) =>
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
        const url = `http://localhost:1902/api/v3/posts/topic/${id}?a=394,370`;

        const res = (await hotJobApi.getHotJobById(
          url,
          pageNumber,
          18,
          "vi",
          null
        )) as unknown as IHotJob;

        if (res && res.status === 200) {
          setListHotJob([...listHotJob, ...res.data]);
          setPageNumber(pageNumber + 1);

          if (res.data?.length === 0) {
            setHasMoreData(false);
          }
        }

        setLoading(false);
      }, 0);
    }
  };

  const handleClickFilterJob = () => {};

  const handleChangeFilterJob = (value: string) => {
    setIdFilterProvinces(value);
  };

  React.useEffect(() => {
    if (provincesData) {
      const newOptionsProvinces = provincesData.map((provinces: any) => {
        return {
          value: provinces.id,
          label: language === 1 ? provinces.full_name : provinces.full_name_en,
        };
      });
      setOptionsProvinces(newOptionsProvinces);
    }
  }, [provincesData]);

  const getProvinces = async () => {
    try {
      const result = await locationApi.getAllProvinces(
        language === 1 ? "vi" : "en"
      );

      if (result) {
        setProvincesData(result.data);
      }
    } catch (error) {
      console.log("error", error);
    }
  };

  useEffect(() => {
    getProvinces();
  }, [language]);

  return (
    <div className="flex justify-center w-full px-5 bg-gray-100">
      <div className="py-10 max-w-6xl w-full">
        <div className="flex flex-wrap justify-between items-center">
          <h1 className="font-bold text-2xl mb-3">
            {language === 1
              ? `Tìm thấy ${total} công việc nổi bật`
              : `Found ${total} featured jobs`}{" "}
          </h1>

          <div className="filter-hotjob mb-5" onClick={handleClickFilterJob}>
            <div className="filter-provinces">
              <Space direction="vertical" style={{ width: "100%" }}>
                <Select
                  size={"large"}
                  onChange={handleChangeFilterJob}
                  style={{ width: "220px" }}
                  options={optionsProvinces}
                  suffixIcon={
                    idFilterProvinces ? (
                      <LightFilterIcon width={20} height={20} />
                    ) : (
                      <FilterIcon width={20} height={20} />
                    )
                  }
                  placeholder={
                    language === 1 ? `Lọc theo khu vực` : `Filter by region`
                  }
                />
              </Space>
            </div>
          </div>
        </div>
        <SkeletonAll type={"newJob"} data={listHotJob}>
          <div>
            <InfiniteScroll
              style={{ display: "flex", flexWrap: "wrap", overflow: "hidden" }}
              dataLength={listHotJob.length}
              next={loadMore}
              hasMore={true}
              loader={<></>}
            >
              <div className="flex justify-center">
                <ul className="inline-flex flex-wrap justify-center list-job gap-5 w-full">
                  {listHotJob &&
                    listHotJob.length > 0 &&
                    listHotJob.map((item, index) => (
                      <li key={index} className="relative">
                        <Link
                          href={`/post-detail/${item.id}`}
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
                                <p className="text-xs text-gray-500  drop-shadow-xl">
                                  {handleShortTextHome(item.companyName, 20)}
                                </p>
                              </div>
                            </div>
                            <div className="inline-flex flex-wrap justify-start gap-1 font-extrabold">
                              <h3 className="text-[9px] py-1 px-2 rounded-md min-w-fit bg-blue-50 group-hover:text-blue-500  ">
                                {handleShortValueNumber(
                                  item.salaryMin.toString()
                                )}{" "}
                                -{" "}
                                {handleShortValueNumber(
                                  item.salaryMax.toString()
                                )}{" "}
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
            </InfiniteScroll>
          </div>
        </SkeletonAll>
        {loading && (
          <div className="mt-5">
            <SkeletonAll type={"newJob"} data={!loading}>
              loading
            </SkeletonAll>
          </div>
        )}
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
