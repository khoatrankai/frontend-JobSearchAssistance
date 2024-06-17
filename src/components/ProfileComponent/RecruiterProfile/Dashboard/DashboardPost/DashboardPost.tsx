import DashboardApi from "@/api/recruiter/dashboard/dashboardApi";
import { useSrollContext } from "@/context/AppProvider";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { FaArrowDown, FaArrowUp } from "react-icons/fa";

type Props = {
  dataView: any;
};

const DashboardPost = ({ dataView }: Props) => {
  const [arrayTop, setArrayTop] = useState<any>([
    10, 20, 30, 40, 50, 60, 70, 80, 90, 100, 0, 0,
  ]);
  const { reponsiveMobile } = useSrollContext();
  const [maxTop, setMaxTop] = useState<any>(0);
  const [arrayPost, setPost] = useState<any>([]);
  const myArrayCount = new Array(11).fill(5);
  useEffect(() => {
    if (dataView) {
      const total = dataView?.countAnalyticsPosted12Month?.reduce(
        (max: any, current: any) => {
          if (current > max) return current;
          return max;
        },
        0
      );
      setMaxTop(total);
      setArrayTop(
        arrayTop?.map((dt: any, ikey: any) => {
          const dataTotal = dataView?.countAnalyticsPosted12Month?.[ikey].total;
          //console.log(dataTotal, total);
          if (!total || !dataTotal) {
            return 0;
          }
          return dataTotal / total;
        })
      );

      const fetchData = async () => {
        const dataPostNew = await Promise.all(
          arrayTop.map(async (dt: any, ikey: any) => {
            const data = await DashboardApi.getViewsMonth(ikey + 1);
            return data;
          })
        );
        setPost(dataPostNew);
      };
      fetchData();
    }
  }, [dataView]);
  useEffect(() => {
    //console.log(arrayPost);
  }, [arrayPost]);
  const handlePercent = (value: any) => {
    if (maxTop > 10) {
      return Math.round((maxTop / 10) * (10 - value));
    }
    return 1 * (10 - value);
    // //console.log((maxTop / 10) * value);
  };
  return (
    <div
      className={`w-full flex  px-2  ${
        reponsiveMobile < 1392 ? "h-fit flex-col gap-8" : "gap-x-2 h-96"
      }`}
    >
      {/* <p className="font-semibold text-2xl">Lượt bài đăng trong năm 2024</p> */}
      <div
        className={` border-2 border-blue-800 rounded-md relative ${
          reponsiveMobile < 1392 ? "w-full h-96" : "w-3/4 h-full"
        }`}
      >
        <div className="flex gap-4 py-4 px-2 !pb-0 absolute inset-0 bottom-0  items-end">
          {arrayTop.map((dt: any, ikey: any) => {
            return (
              <>
                <div
                  className="w-full relative group min-h-2"
                  style={{ height: `${dt}%` }}
                >
                  <div className="w-full h-2 bg-blue-500 absolute top-0"></div>
                  <div className="w-full h-full bg-blue-500/30"></div>
                  <div
                    className={`absolute w-max h-fit flex flex-col gap-y-4 px-8 py-6 rounded-lg  z-10 bottom-0 opacity-0 invisible group-hover:opacity-100 group-hover:bg-white/90 group-hover:visible  -translate-y-2 bg-transparent transition-all duration-500  ${
                      ikey > 7 ? "right-1/4" : "left-1/4"
                    }`}
                  >
                    <div className="flex justify-between rounded-md p-2 hover:bg-white group cursor-pointer items-center">
                      <p className="text-lg font-extrabold text-blue-700 pb-1 border-b-2 border-blue-700 w-fit">
                        Lượt xem nhiều nhất tháng {ikey + 1}
                      </p>
                      <p className=" font-extrabold text-blue-700 pb-1 w-fit">
                        Số bài viết: {arrayPost?.[ikey]?.totalPosts}
                      </p>
                    </div>

                    <div className="flex flex-col gap-y-2">
                      <div className="flex gap-x-6 items-center font-bold text-xs w-full">
                        <div className="w-8"></div>

                        <p className="w-max flex-1">Lượt xem</p>
                        <p className="w-32">Tên bài đăng</p>
                        <p className="w-28">Trạng thái</p>
                        <div className="w-20 h-full"></div>
                      </div>
                      <div className="flex flex-col gap-y-2">
                        <div className="flex gap-x-6 items-center font-medium text-xs w-full">
                          <Image
                            width={300}
                            height={300}
                            alt=""
                            src={"/goapply.png"}
                            className="w-8 h-8 rounded-full overflow-hidden "
                          />
                          <p className="w-max flex-1 text-blue-500">10,012</p>
                          <p className="w-32 h-">Việc làm cung...</p>
                          <p className="w-28 font-semibold text-green-500">
                            Đang hoạt động
                          </p>

                          <button className=" hover:text-blue-400 p-1 w-20 font-bold rounded-xl text-blue-700 text-nowrap">
                            Xem chi tiết
                          </button>
                        </div>
                        <div className="flex gap-x-6 items-center font-medium text-xs w-full">
                          <Image
                            width={300}
                            height={300}
                            alt=""
                            src={"/goapply.png"}
                            className="w-8 h-8 rounded-full overflow-hidden "
                          />
                          <p className="w-max flex-1 text-blue-500">10,012</p>
                          <p className="w-32 h-">Việc làm cung...</p>
                          <p className="w-28 font-semibold text-yellow-500">
                            Tạm dừng
                          </p>

                          <button className=" hover:text-blue-400 p-1 w-20 font-bold rounded-xl text-blue-700 text-nowrap">
                            Xem chi tiết
                          </button>
                        </div>
                        <div className="flex gap-x-6 items-center font-medium text-xs w-full">
                          <Image
                            width={300}
                            height={300}
                            alt=""
                            src={"/goapply.png"}
                            className="w-8 h-8 rounded-full overflow-hidden "
                          />
                          <p className="w-max flex-1 text-blue-500">10,012</p>
                          <p className="w-32">Việc làm cung...</p>
                          <p className="w-28 font-semibold text-red-500">
                            Đã ngưng tuyển
                          </p>

                          <button className=" hover:text-blue-400 p-1 w-20 font-bold rounded-xl text-blue-700 text-nowrap">
                            Xem chi tiết
                          </button>
                        </div>
                        <div className="flex gap-x-6 items-center font-medium text-xs w-full">
                          <Image
                            width={300}
                            height={300}
                            alt=""
                            src={"/goapply.png"}
                            className="w-8 h-8 rounded-full overflow-hidden "
                          />
                          <p className="w-max flex-1 text-blue-500">10,012</p>
                          <p className="w-32">Việc làm cung...</p>
                          <p className="w-28 font-semibold text-red-500">
                            Đã ngưng tuyển
                          </p>

                          <button className=" hover:text-blue-400 p-1 w-20 font-bold rounded-xl text-blue-700 text-nowrap">
                            Xem chi tiết
                          </button>
                        </div>
                        <div className="flex gap-x-6 items-center font-medium text-xs w-full">
                          <Image
                            width={300}
                            height={300}
                            alt=""
                            src={"/goapply.png"}
                            className="w-8 h-8 rounded-full overflow-hidden "
                          />
                          <p className="w-max flex-1 text-blue-500">10,012</p>
                          <p className="w-32">Việc làm cung...</p>
                          <p className="w-28 font-semibold text-red-500">
                            Đã ngưng tuyển
                          </p>

                          <button className=" hover:text-blue-400 p-1 w-20 font-bold rounded-xl text-blue-700 text-nowrap">
                            Xem chi tiết
                          </button>
                        </div>
                      </div>
                    </div>
                    <div className="flex justify-center">
                      <button className="font-semibold text-sm text-blue-700 hover:text-blue-400">
                        Xem thêm
                      </button>
                    </div>
                  </div>
                </div>
              </>
            );
          })}
        </div>
        <div className="flex gap-4 text-[10px] text-blue-700 font-semibold absolute inset-x-0 top-full px-2 text-center translate-y-2">
          <p className="w-full">Tháng 1</p>
          <p className="w-full">Tháng 2</p>
          <p className="w-full">Tháng 3</p>
          <p className="w-full">Tháng 4</p>
          <p className="w-full">Tháng 5</p>
          <p className="w-full">Tháng 6</p>
          <p className="w-full">Tháng 7</p>
          <p className="w-full">Tháng 8</p>
          <p className="w-full">Tháng 9</p>
          <p className="w-full">Tháng 10</p>
          <p className="w-full">Tháng 11</p>
          <p className="w-full">Tháng 12</p>
        </div>
        <div className="flex flex-col gap-4 text-xs font-semibold absolute -bottom-1 -translate-x-2 text-blue-800  inset-y-0 right-full ">
          {myArrayCount.map((dt: any, ikey: any) => {
            return (
              <>
                <p className="h-full flex items-end">{handlePercent(ikey)}</p>
              </>
            );
          })}
          {/* <p className="h-full flex items-end">9</p>
          <p className="h-full flex items-end">8</p>
          <p className="h-full flex items-end">7</p>
          <p className="h-full flex items-end">6</p>
          <p className="h-full flex items-end">5</p>
          <p className="h-full flex items-end">4</p>
          <p className="h-full flex items-end">3</p>
          <p className="h-full flex items-end">2</p>
          <p className="h-full flex items-end">1</p>
          <p className="h-full flex items-end">0</p> */}
        </div>
      </div>
      <div
        className={`  bg-blue-800 rounded-md p-4 flex flex-col  ${
          reponsiveMobile < 1392 ? "w-full h-96" : "w-1/4 h-full"
        }`}
      >
        <p className="text-white font-medium text-lg mb-4">Top lượt xem</p>
        <div className="flex gap-y-1 flex-col">
          <div className="flex gap-x-4 border-transparent rounded-md cursor-pointer font-bold text-white">
            <p>BXH</p>
            <p>Tên bài đăng</p>
          </div>
          <div className="flex flex-col justify-between flex-1 text-sm">
            <div className="flex gap-x-4 border-[1px] border-transparent rounded-md p-2 hover:bg-white group cursor-pointer">
              <p className="text-white font-semibold  group-hover:text-blue-800">
                #1
              </p>

              <p className="text-white group-hover:text-blue-700 ">
                Việc làm cung ứng ...
              </p>
              <div className="flex text-green-400 items-center gap-x-1 group-hover:text-green-700">
                <FaArrowUp />
                <p>1</p>
              </div>
            </div>
            <div className=" border-transparent flex gap-x-4 border-[1px] rounded-md p-2 hover:bg-white group cursor-pointer">
              <p className="text-white font-semibold  group-hover:text-blue-800">
                #2
              </p>

              <p className="text-white group-hover:text-blue-700 ">
                Việc làm cung ứng ...
              </p>
              <div className="flex text-green-400 items-center gap-x-1">
                <FaArrowUp />
                <p>1</p>
              </div>
            </div>
            <div className=" border-transparent flex gap-x-4 border-[1px] rounded-md p-2 hover:bg-white group cursor-pointer">
              <p className="text-white font-semibold  group-hover:text-blue-800">
                #3
              </p>

              <p className="text-white group-hover:text-blue-700 ">
                Việc làm cung ứng ...
              </p>
              <div className="flex text-red-400 items-center gap-x-1">
                <FaArrowDown />
                <p>1</p>
              </div>
            </div>
            <div className=" border-transparent flex gap-x-4 border-[1px] rounded-md p-2 hover:bg-white group cursor-pointer">
              <p className="text-white font-semibold  group-hover:text-blue-800">
                #4
              </p>

              <p className="text-white group-hover:text-blue-700 ">
                Việc làm cung ứng ...
              </p>
              <div className="flex text-green-400 items-center gap-x-1">
                <FaArrowUp />
                <p>1</p>
              </div>
            </div>
            <div className=" border-transparent flex gap-x-4 border-[1px] rounded-md p-2 hover:bg-white group cursor-pointer">
              <p className="text-white font-semibold  group-hover:text-blue-800">
                #5
              </p>

              <p className="text-white group-hover:text-blue-700 ">
                Việc làm cung ứng ...
              </p>
              <div className="flex text-green-400 items-center gap-x-1">
                <FaArrowUp />
                <p>1</p>
              </div>
            </div>
            <div className=" border-transparent flex gap-x-4 border-[1px] rounded-md p-2 hover:bg-white group cursor-pointer">
              <p className="text-white font-semibold  group-hover:text-blue-800">
                #6
              </p>

              <p className="text-white group-hover:text-blue-700 ">
                Việc làm cung ứng ...
              </p>
              <div className="flex text-green-400 items-center gap-x-1">
                <FaArrowUp />
                <p>1</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPost;
