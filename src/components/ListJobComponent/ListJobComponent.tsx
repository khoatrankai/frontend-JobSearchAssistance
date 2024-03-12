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
import ModalLogin from "../ModalLogin/ModalLogin";
import ShortText from "@/util/ShortText";
import SkeletonAll from "@/util/SkeletonAll";
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md";
import DescriptionHoverProvider from "@/util/DescriptionHoverProvider/DescriptionHoverProvider";

type Props = {};

interface IBookmark {
  code: number;
  message: string;
}

const ListJobComponent = (props: Props) => {
  const { DescriptionHover, handleUpdatePosition } = DescriptionHoverProvider();
  const { handleShortTextHome, handleShortValueNumber } = ShortText();
  const [pageNewJob, setPageNewJob] = useState<number>(0);
  const [thresholdNewJob, setThresholdNewJob] = useState<number>(0);
  const [idPrev, setIdPrev] = useState<number>(0);
  const [listJob, setListJob] = useState<any[]>([]);
  const [bookmarked, setBookmarked] = React.useState(false);
  const accountId = localStorage.getItem("accountId");
  const categoryId = useSelector((state: any) => state.categoryId);
  const [categoriesId, setCategoriesId] = useState<string>("");
  const [openModalLogin, setOpenModalLogin] = useState<boolean>(false);
  const language = useSelector((state: any) => state.changeLaguage.language);
  useEffect(() => {
    setCategoriesId(categoryId);
  }, [categoryId]);
  useEffect(() => {
    const fetchData = async () => {
      const res = await postsApi.getPostNewestV3(
        null,
        Number(categoriesId) ? Number(categoriesId) : null,
        null,
        null,
        12,
        thresholdNewJob,
        language === 1 ? "vi" : "en"
      );

      if (res && res.status === 200) {
        setListJob(res.data);
      }
    };
    fetchData();
  }, [thresholdNewJob, bookmarked, categoriesId, language]);

  const handleNextNewJob = () => {
    setIdPrev(listJob[0]?.id);
    setThresholdNewJob(listJob[listJob.length - 1].id);
    setPageNewJob(pageNewJob + 1);
  };
  const handlePrevNewJob = () => {
    setThresholdNewJob(idPrev + 1);
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
    <div className="flex justify-center py-12 px-5">
      <div className="w-full max-w-6xl relative">
        <div className="flex justify-between items-center mb-8">
          <h1 className="font-bold text-2xl">
            {language === 1 ? `Việc làm mới` : `New job`}
          </h1>
          <div className="flex items-center gap-5">
            <a
              className=" font-bold text-black hover:text-blue-500 cursor-pointer"
              href="/more-new"
            >
              {language === 1 ? `Xem thêm` : `See more`}
            </a>
            <div className="w-20 flex justify-between">
              <button
                className="bg-black hover:shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px] hover:bg-blue-500 w-10 h-10 rounded-lg flex justify-center items-center group"
                onClick={() => handlePrevNewJob()}
              >
                <MdKeyboardArrowLeft color="white" fontSize="1.8em" />
              </button>
              <button
                className=" bg-black hover:shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px] hover:bg-blue-500 w-10 h-10 rounded-lg flex justify-center items-center group ml-2"
                onClick={() => handleNextNewJob()}
              >
                <MdKeyboardArrowRight color="white" fontSize="1.8em" />
              </button>
            </div>
          </div>
        </div>
        <SkeletonAll data={listJob}>
          <div className="flex justify-center">
            <ul className="inline-flex flex-wrap justify-center list-job gap-9 w-full">
              {listJob &&
                listJob.length > 0 &&
                listJob.map((item, index) => (
                  <>
                    <li key={index} className="relative">
                      <Link
                        href={`/post-detail/${item.id}`}
                        className={`w-[360px] h-[180px] group gap-x-2  px-4 border-[1px] hover:border-blue-500 hover:bg-white hover:shadow-[rgba(17,_17,_26,_0.1)_0px_0px_16px] rounded-md  py-6 flex justify-between items-center item-job`}
                      >
                        <div className="basis-3/12">
                          <Image
                            className="w-16 h-16 rounded-xl group-hover:shadow-[rgba(17,_17,_26,_0.1)_0px_0px_16px] object-cover"
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
                                        {item.companyName}
                                      </p>
                                      <div className="flex text-white text-xs font-semibold gap-x-4">
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
                                {handleShortTextHome(item.companyName, 30)}
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
                            </div>
                          </div>
                          <div className="inline-flex flex-wrap justify-start gap-1 font-extrabold">
                            <h3 className="text-[9px] py-1 px-2 rounded-md min-w-fit bg-slate-50 group-hover:text-blue-500  group-hover:drop-shadow-xl">
                              {handleShortValueNumber(
                                item.salaryMin.toString()
                              )}{" "}
                              -{" "}
                              {handleShortValueNumber(
                                item.salaryMax.toString()
                              )}{" "}
                              {item.moneyType}
                            </h3>
                            <h3 className="text-[9px] py-1 px-2 rounded-md min-w-fit bg-slate-50 group-hover:text-blue-500  group-hover:drop-shadow-xl">
                              {item?.jobType.name}
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
                  </>
                ))}
            </ul>
          </div>
        </SkeletonAll>
      </div>
      <ModalLogin
        isOpen={openModalLogin}
        handleToggleModal={handleToggleModal}
      />
      <ToastContainer />
    </div>
  );
};

export default ListJobComponent;
