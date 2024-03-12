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
import ModalLogin from "../ModalLogin/ModalLogin";
import ShortText from "@/util/ShortText";
import DescriptionHoverProvider from "@/util/DescriptionHoverProvider/DescriptionHoverProvider";
import FilterComponent from "../FilterComponent/FilterComponent";

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
  const [loading, setLoading] = useState(false);
  const [hasMoreData, setHasMoreData] = useState(true);
  const dispatch = useDispatch();
  const languageRedux = useSelector(
    (state: RootState) => state.changeLaguage.language
  );
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
  useEffect(() => {
    setAccountId(localStorage.getItem("accountId"));
  }, []);
  useEffect(() => {
    setListJob(searchResult.posts);
    // if(!checkKey){
    setPage(1);
    setHasMoreData(true);
    // }
  }, [searchResult]);
  const { handleLoadHrefPage } = useSrollContext();

  useEffect(() => {
    handleLoadHrefPage();
  }, []);
  useEffect(() => {
    console.log(listJob, page);
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

  useEffect(() => {
    const dataObj = JSON.parse(localStorage.getItem("dataRequest") || "{}");

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
      page: null,
    };

    dispatch(fetchSearchResult(queryParams) as any);
  }, []);

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
        const dataObj = JSON.parse(localStorage.getItem("dataRequest") || "{}");

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
      <div className="flex justify-center py-12">
        <div className="w-full max-w-6xl relative">
          <h1 className="font-bold text-2xl mb-3">{`${
            searchResult.total ? searchResult.total : 0
          } kết quả tìm kiếm`}</h1>
          <div>
            <InfiniteScroll
              style={{ display: "flex", flexWrap: "wrap", overflow: "hidden" }}
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
                        className={`w-[360px] h-[180px] group gap-x-2  px-4 border-[1px] hover:border-blue-500 hover:bg-white hover:shadow-[rgba(17,_17,_26,_0.1)_0px_0px_16px] rounded-md  py-6 flex justify-between items-center item-job`}
                      >
                        <div className="basis-3/12 rounded-sm overflow-hidden">
                          <Image
                            className="w-16 h-16 object-cover"
                            src={item.image ? item.image : "/logo/logo.png"}
                            alt="anh"
                            width={200}
                            height={200}
                          />
                        </div>
                        <div className="basis-7/12 h-full flex flex-col justify-between capitalize">
                          <div>
                            <h2
                              className="text-sm font-bold peer group-hover:drop-shadow-xl  group-hover:text-blue-500"
                              onMouseEnter={(e: any) => {
                                handleUpdatePosition(e);
                              }}
                            >
                              {handleShortTextHome(item.title, 20)}
                            </h2>
                            <div className="opacity-0 invisible peer-hover:opacity-100 peer-hover:visible hover:visible hover:opacity-100 w-fit h-fit cursor-default">
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
                                        mới về các sản phẩm in ấn và quà tặng -
                                        Giải đáp các thắc mắc của khách hàng về
                                        sản phẩm qua gọi điện, chat, mail,... -
                                        Làm việc trực tiếp với khách hàng, ghi
                                        nhận thông tin và báo cáo nội dung cho
                                        trưởng phòng. - Thực hiện các vấn đề
                                        liên quan như trao đổi với khách hàng,
                                        kí kết và thực hiện hợp đồng. - Theo dõi
                                        quá trình thanh lý hợp đồng, công nợ, và
                                        các công việc chăm sóc khách hàng trước,
                                        trong và sau hợp đồng. - Công việc cụ
                                        thể trao đổi thêm khi phỏng vấn.
                                      </p>
                                    </div>
                                    <div className="flex flex-col gap-y-2">
                                      <p className="font-bold py-1 px-2 border-l-4 border-blue-500">
                                        Yêu cầu ứng viên
                                      </p>
                                      <p className="text-sm font-medium">
                                        - Gọi điện chăm sóc KH cũ và tư vấn KH
                                        mới về các sản phẩm in ấn và quà tặng -
                                        Giải đáp các thắc mắc của khách hàng về
                                        sản phẩm qua gọi điện, chat, mail,... -
                                        Làm việc trực tiếp với khách hàng, ghi
                                        nhận thông tin và báo cáo nội dung cho
                                        trưởng phòng. - Thực hiện các vấn đề
                                        liên quan như trao đổi với khách hàng,
                                        kí kết và thực hiện hợp đồng. - Theo dõi
                                        quá trình thanh lý hợp đồng, công nợ, và
                                        các công việc chăm sóc khách hàng trước,
                                        trong và sau hợp đồng. - Công việc cụ
                                        thể trao đổi thêm khi phỏng vấn.
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

                                    <div className="font-bold flex-1 p-2 rounded-xl bg-red-500 hover:bg-red-600 flex justify-center items-center text-white">
                                      Xem chi tiết
                                    </div>
                                    <div className="font-bold flex-1 p-2 rounded-xl bg-blue-500 hover:bg-blue-600 flex justify-center items-center text-white">
                                      Nộp đơn
                                    </div>
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
                            <div className="flex items-center">
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
                            </div>
                          </div>
                          <div className="inline-flex flex-wrap justify-start gap-1 font-extrabold">
                            <h3 className="text-[9px] py-1 px-2 rounded-md min-w-fit bg-slate-50 group-hover:text-blue-500  group-hover:drop-shadow-xl">
                              {handleShortValueNumber(
                                item.salary_min.toString()
                              )}{" "}
                              -{" "}
                              {handleShortValueNumber(
                                item.salary_max.toString()
                              )}{" "}
                              {item.money_type_text}
                            </h3>
                            <h3 className="text-[9px] py-1 px-2 rounded-md min-w-fit bg-slate-50 group-hover:text-blue-500  group-hover:drop-shadow-xl">
                              {item?.job_type_name}
                            </h3>
                          </div>
                        </div>

                        <div className="flex justify-center h-2/5 flex-1 relative -translate-y-16">
                          <div
                            className={` w-full ${
                              index % 2
                                ? "bg-red-500 bg-ribbon-hot"
                                : "bg-green-500 bg-ribbon-new"
                            }  text-white text-sm font-bold items-center flex justify-center`}
                          >
                            {index % 2 ? "Hot" : "New"}
                          </div>
                        </div>
                      </Link>
                    </li>
                  ))}
              </ul>
            </InfiniteScroll>
          </div>
        </div>
        <ModalLogin
          isOpen={openModalLogin}
          handleToggleModal={() => setOpenModalLogin(!openModalLogin)}
        />
        <ToastContainer />
      </div>
    </>
  );
};

export default SearchJobComponent;
