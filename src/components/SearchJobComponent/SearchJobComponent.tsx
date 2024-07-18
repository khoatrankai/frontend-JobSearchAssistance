/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import Image from "next/image";
import "./SearchJobComponent.scss";
import InfiniteScroll from "react-infinite-scroll-component";
import { ToastContainer, toast } from "react-toastify";
import Link from "next/link";
import { SaveIconFill, SaveIconOutline } from "@/icons";
import bookMarkApi from "@/api/bookmarks/bookMarkApi";
import { useDispatch, useSelector } from "react-redux";
import "react-toastify/dist/ReactToastify.css";
import { fetchSearchResult } from "@/redux/reducer/searchReducer";
import { RootState } from "@/redux";
import { useSrollContext } from "@/context/AppProvider";

import ShortText from "@/util/ShortText";
import DescriptionHoverProvider from "@/util/DescriptionHoverProvider/DescriptionHoverProvider";
import FilterComponent from "../FilterComponent/FilterComponent";
import { useRouter } from "next/navigation";
import appplicationApi from "@/api/applicationApi";
import ModalApply from "../ModalApply/ModalApply";
import SkeletonAll from "@/util/SkeletonAll";

type Props = {};

interface IBookmark {
  code: number;
  message: string;
}

const SearchJobComponent: React.FC<Props> = (props) => {
  const { handleShortTextHome, handleShortValueNumber } = ShortText();
  const { DescriptionHover, handleUpdatePosition } = DescriptionHoverProvider();
  const searchResult = useSelector(
    (state: any) => state.dataSearchResult.searchResult
  );
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [hasMoreData, setHasMoreData] = useState(true);
  const dispatch = useDispatch();
  const [page, setPage] = useState(0);
  const [listJob, setListJob] = React.useState<any>([]);
  const [openModalLogin, setOpenModalLogin] = useState(false);
  const [isOver, setIsOver] = useState(false);
  const [accountId, setAccountId] = useState<any>("");
  const [dataRequest, setDataRequest] = useState<any>({
    is_working_weekend: 0,
    is_date_period: 0,
    money_type: 1,
    salary_min: 0,
    salary_max: 0,
  });
  const [tabFilter, setTabFilter] = useState<Boolean>(true);
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
    setListJob(searchResult.posts);
    //console.log(searchResult);
    // if(!checkKey){
    setPage(1);
    setHasMoreData(true);
    // }
  }, [searchResult]);
  const { handleLoadHrefPage } = useSrollContext();

  useEffect(() => {
    // handleLoadHrefPage();
    const dataKeyWord = JSON.parse(localStorage.getItem("keyWord") || "{}");
    setDataRequest({ ...dataRequest, q: dataKeyWord.q });
  }, []);
  useEffect(() => {
    //console.log(listJob, page);
  }, [listJob, page]);
  const handleBookmarked = (id: number) => {
    try {
      const fetchData = async () => {
        const res = (await bookMarkApi.createBookMark(
          id
        )) as unknown as IBookmark;

        if (res && res.code === 200) {
          toast.success(
            languageRedux === 1
              ? "Lưu bài viết thành công"
              : `Save post success`,
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

          setListJob((prevList: any) =>
            prevList.map((item: any) =>
              item.id === id ? { ...item, bookmarked: true } : item
            )
          );
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
            languageRedux === 1
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

          setListJob((prevList: any) =>
            prevList.map((item: any) =>
              item.id === id ? { ...item, bookmarked: false } : item
            )
          );
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

  // useEffect(() => {
  //   const dataObj = JSON.parse(localStorage.getItem("dataRequest") || "{}");

  //   const queryParams = {
  //     q: dataObj.q ? dataObj.q.trim() : null,
  //     moneyType: dataObj.money_type ? dataObj.money_type : null,
  //     isWorkingWeekend: dataObj.is_working_weekend
  //       ? dataObj.is_working_weekend
  //       : null,
  //     isDatePeriod: dataObj.is_date_period ? dataObj.is_date_period : null,
  //     salaryMin: dataObj.salary_min ? dataObj.salary_min : null,
  //     salaryMax: dataObj.salary_max ? dataObj.salary_max : null,
  //     jobTypeId: dataObj.jobTypeId ? [dataObj.jobTypeId] : [],
  //     categoryIds: dataObj.category_ids ? dataObj.category_ids : null,
  //     districtIds: dataObj.district_ids ? dataObj.district_ids : null,
  //     salaryType: dataObj.salary_type ? dataObj.salary_type : null,
  //     lang: "vi",
  //     page: null,
  //   };

  //   dispatch(fetchSearchResult(queryParams) as any);
  // }, []);

  useEffect(() => {
    if (searchResult && searchResult.is_over === true) {
      setIsOver(true);
    } else {
      setPage(page + 1);
      setIsOver(false);
    }
  }, []);
  const loadMore = async () => {
    if (!loading && hasMoreData) {
      setLoading(true);

      try {
        const dataKeyWord = JSON.parse(localStorage.getItem("keyWord") || "{}");
        const dataObj = { ...dataRequest, q: dataKeyWord?.q };

        const queryParams = {
          q: dataObj.q ? dataObj.q.trim() : null,
          moneyType: dataObj.money_type ? dataObj.money_type : null,
          isWorkingWeekend: dataObj.is_working_weekend
            ? dataObj.is_working_weekend
            : null,
          isDatePeriod: dataObj.is_date_period ? dataObj.is_date_period : null,
          salaryMin: dataObj.salary_min ? dataObj.salary_min : null,
          salaryMax: dataObj.salary_max ? dataObj.salary_max : null,
          jobTypeId: dataObj.jobTypeId ? [dataObj.jobTypeId] : [],
          categoryIds: dataObj.category_ids ? dataObj.category_ids : null,
          districtIds: dataObj.district_ids ? dataObj.district_ids : null,
          salaryType: dataObj.salary_type ? dataObj.salary_type : null,
          lang: "vi",
          page: page,
        };
        setDataRequest(dataObj);
        const response = await dispatch(fetchSearchResult(queryParams) as any);
        // setCheckKey(true);
        if (response && listJob.length !== 0) {
          const newPosts = response.payload.posts;

          setListJob((prevList: any) => [...listJob, ...newPosts]);
          setPage(page + 1);

          if (response.payload.is_over === false) {
            setHasMoreData(true);
          } else {
            setHasMoreData(false);
          }
        }

        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setLoading(false);
      }
    }
  };

  return (
    <>
      <div>
        <FilterComponent
          dataRequest={dataRequest}
          setDataRequest={setDataRequest}
        />
      </div>
      <div className="flex justify-center py-12 bg-blue-50 px-4">
        <div className="w-full max-w-6xl relative">
          <h1 className="font-bold text-2xl mb-3">{`${
            searchResult.total ? searchResult.total : 0
          } kết quả tìm kiếm`}</h1>
          <SkeletonAll type={"newJob"} data={listJob}>
            <div>
              <InfiniteScroll
                style={{
                  display: "flex",
                  flexWrap: "wrap",
                  justifyContent: "center",
                  overflow: "hidden",
                }}
                dataLength={listJob?.length}
                next={loadMore}
                hasMore={true}
                loader={<></>}
              >
                <ul className="inline-flex flex-wrap justify-center list-job gap-9">
                  {listJob &&
                    listJob.length > 0 &&
                    listJob.map((item: any, index: any) => (
                      <li key={index} className="relative">
                        <Link
                          href={`/post-detail/${item.id}`}
                          className={`w-[360px] h-fit group gap-x-2  px-4 border-[1px] hover:border-blue-500 transition-all duration-500  hover:bg-blue-50 bg-white hover:shadow-[rgba(17,_17,_26,_0.1)_0px_0px_16px] rounded-md  py-6 flex justify-between items-center item-job`}
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
                                      {/* <div className="font-bold flex-1 p-2 rounded-xl bg-blue-500 hover:bg-blue-600 flex justify-center items-center text-white">
                                        Nộp đơn
                                      </div> */}
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
    </>
  );
};

export default SearchJobComponent;
