import candidateSearch from "@/api/candidate/apiCandidates";
import { useSrollContext } from "@/context/AppProvider";
import TimeStamp from "@/util/TimeStamp/TimeStamp";
import ToastCustom from "@/util/ToastCustom";
import useRouterCustom from "@/util/useRouterCustom/useRouterCustom";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { FaHeart, FaStar } from "react-icons/fa";
import InfiniteScroll from "react-infinite-scroll-component";

type Props = {};

const CandidateSuggested = (props: Props) => {
  const { reponsiveMobile } = useSrollContext();
  const [currentPage, setCurrentPage] = useState<any>(0);
  const [listData, setListData] = useState<any>([]);
  const { handleConvertToDate } = TimeStamp();
  const [isOver, setIsOver] = useState<any>(false);
  const { hdError, hdSuccess } = ToastCustom();
  const handleCancel = async (id: any, index: any) => {
    const res: any = await candidateSearch.postBookmarkCandidate(id);
    if (res && res.status === 200) {
      hdSuccess("Bỏ lưu thành công");
      setListData(
        listData.filter((dt: any, i: any) => {
          return index !== i;
        })
      );
    } else {
      hdError("Bỏ lưu không thành công");
    }
  };
  const { pushBlank } = useRouterCustom();
  useEffect(() => {
    const fetchData = async () => {
      const res: any = await candidateSearch.getBookmarkCandidate(
        currentPage,
        20,
        "vi"
      );
      if (res && res.status === 200) {
        setListData(res?.data?.candidateBookmarks);
        setIsOver(res?.data?.is_over);
      }
    };
    fetchData();
  }, []);
  const moreRes = async (page: any) => {
    if (isOver) {
      const res: any = await candidateSearch.getBookmarkCandidate(
        page,
        20,
        "vi"
      );
      if (res && res.status === 200) {
        setListData([...listData, ...res?.data?.candidateBookmarks]);
      }
      setCurrentPage(currentPage + 1);
    }
  };
  return (
    <div className="flex flex-col gap-y-4 h-[480px] overflow-y-scroll">
      <InfiniteScroll
        style={{ display: "flex", flexWrap: "wrap" }}
        dataLength={listData.length}
        next={() => {
          moreRes(currentPage);
        }}
        hasMore={true}
        loader={<></>}
      >
        {listData?.map((dt: any, i: any) => {
          return (
            <>
              <div
                className="flex bg-gray-50 rounded-sm p-4 justify-between items-end relative flex-wrap gap-2 w-full"
                key={i}
              >
                <div className="flex gap-x-8">
                  <Image
                    src={dt?.profileData?.imageData ?? "/goapply.png"}
                    alt=""
                    width={200}
                    height={400}
                    className="w-28 h-32 rounded-md"
                  />
                  <div className="flex flex-col justify-around font-semibold text-black text-lg">
                    <p className="font-bold">{dt?.profileData?.name}</p>
                    <p className="text-sm font-bold  text-gray-500">
                      Giới tính :{" "}
                      <span className="text-gray-600">
                        {dt?.profileData?.genderData ? "Nam" : "Nữ"}
                      </span>{" "}
                    </p>
                    <p className="text-sm font-bold  text-gray-500">
                      Ngày sinh :
                      <span className="text-gray-600">
                        {handleConvertToDate(dt?.profileData?.birthdayData)}
                      </span>{" "}
                    </p>
                    {/* <p className="text-sm font-bold text-gray-500">
              Mô tả :{" "}
              <span className="text-gray-600">
                Là một người nhiệt huyết ...
              </span>
            </p>
            <p className="text-sm font-bold text-gray-500">
              Đặc điểm phù hợp :{" "}
              <span className="text-blue-600">REACT,JS,công nghệ ...</span>
            </p> */}
                  </div>
                </div>

                <div className="flex gap-x-4 items-center flex-1 justify-end">
                  <button
                    className="text-sm font-bold text-blue-500 hover:underline min-w-32"
                    onClick={() => {
                      pushBlank(
                        `/recruiter/candidate-detail/${dt?.profileData?.accountId}`
                      );
                    }}
                  >
                    Xem chi tiết
                  </button>
                  <button
                    className="p-2 rounded-md bg-blue-500 hover:bg-blue-400 text-sm font-bold text-white flex items-center gap-x-1  min-w-32"
                    onClick={() => {
                      handleCancel(dt?.profileData?.accountId, i);
                    }}
                  >
                    <FaHeart className="text-white" />
                    Bỏ lưu ứng viên
                  </button>
                </div>

                {/* <div className="absolute top-2 right-2 p-1 rounded-md  text-blue-800 text-sm flex gap-x-1 items-center font-bold">
          <FaStar />
          <p>
            {reponsiveMobile > 700 ? (
              <>
                Phù hợp ID <span className="text-blue-700 ">853</span>
              </>
            ) : (
              <></>
            )}
          </p>
        </div> */}
              </div>
            </>
          );
        })}
      </InfiniteScroll>
    </div>
  );
};

export default CandidateSuggested;
