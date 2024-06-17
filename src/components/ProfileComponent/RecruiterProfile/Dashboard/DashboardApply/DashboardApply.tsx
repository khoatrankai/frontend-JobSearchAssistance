import DashboardApi from "@/api/recruiter/dashboard/dashboardApi";
import { useSrollContext } from "@/context/AppProvider";
import Image from "next/image";
import React, { useEffect, useState } from "react";

type Props = {};

const DashboardApply = (props: Props) => {
  const [dataApply, setApply] = useState<any>([]);
  const [maxTop, setMaxTop] = useState<any>(0);
  const myArrayCount = new Array(11).fill(5);
  const [chooseMonth, setChooseMonth] = useState<any>(1);
  const { reponsiveMobile } = useSrollContext();
  const [dataMonth, setDataMonth] = useState<any>([]);
  useEffect(() => {
    const fetchData = async () => {
      const data = await DashboardApi.getAnalyticApplications();
      // setApply(data.data)
      const totalMax = data.data.reduce((max: any, cur: any) => {
        if (cur.seen > max) {
          return cur.seen;
        }
        return max;
      }, 10);
      setMaxTop(totalMax);
      setApply(
        data.data.map((dt: any) => {
          return {
            ...dt,
            perSeen: dt.seen / totalMax,
            perAcp: dt.accepted / totalMax,
            perRej: dt.rejected / totalMax,
          };
        })
      );
    };
    fetchData();
  }, []);
  const handlePercent = (value: any) => {
    if (maxTop > 10) {
      return Math.round((maxTop / 10) * (10 - value));
    }
    return 1 * (10 - value);
    // //console.log((maxTop / 10) * value);
  };
  useEffect(() => {
    const fetchData = async () => {
      const data = await DashboardApi.getDetailMonth(chooseMonth);
      setDataMonth(data);
    };
    fetchData();
  }, [chooseMonth]);
  return (
    <div className="w-full max-w-6xl">
      <p className="font-bold text-2xl mb-4">Lượt ứng tuyển</p>
      <div
        className={`flex bg-blue-900 p-4 rounded-md ${
          reponsiveMobile < 1390 ? "flex-col gap-8" : "gap-x-2"
        }`}
      >
        <div
          className={` pb-4 px-8 rounded-md ${
            reponsiveMobile < 1390 ? "w-full" : "w-1/3"
          }`}
        >
          <div className="w-full h-72 min-h-72  relative">
            <div className="w-full flex items-end max-w-[70vw]  overflow-x-scroll overflow-y-auto scroll-chart h-full pl-1">
              {dataApply.map((dt: any) => {
                return (
                  <>
                    <div className="flex flex-col h-full items-center justify-end gap-y-1 px-4 w-full hover:bg-black/5">
                      <div className="flex gap-x-1 h-[81.5%] w-full items-end ">
                        <div
                          className="bg-red-400/50 w-9 relative group min-h-[4%]"
                          style={{ height: `${dt.perRej * 100}%` }}
                        >
                          <div className="bg-red-400 h-2 w-full "></div>
                        </div>
                        <div
                          className="bg-blue-400/50 w-9 min-h-[4%]"
                          style={{ height: `${dt.perSeen * 100}%` }}
                        >
                          <div className="bg-blue-400 w-full h-2"></div>
                        </div>
                        <div
                          className="bg-green-400/50 w-9 min-h-[4%]"
                          style={{ height: `${dt.perAcp * 100}%` }}
                        >
                          <div className="bg-green-400 w-full h-2"></div>
                        </div>
                      </div>
                      <p className="h-[7%] text-xs font-medium text-white">
                        Tháng {dt.month}
                      </p>
                    </div>
                  </>
                );
              })}
            </div>
            <div className="text-white font-semibold flex flex-col justify-between text-xs absolute bottom-[10%] top-[10%]  inset-y-0 right-full border-r-2 border-white">
              {myArrayCount.map((dt: any, ikey: any) => {
                return (
                  <>
                    <div className="flex gap-x-2 justify-between">
                      <p className="h-full flex items-end w-full flex justify-center">
                        {handlePercent(ikey)}
                      </p>
                      <span>-</span>
                    </div>
                  </>
                );
              })}
            </div>
          </div>
        </div>
        <div
          className={` border-2 bg-white rounded-md p-4 ${
            reponsiveMobile < 1390 ? "w-full" : "w-2/3"
          }`}
        >
          <div className="w-full flex flex-col gap-y-4 rounded-lg  bottom-full ">
            <div className="flex justify-between rounded-md p-2  group cursor-pointer items-center">
              <p className=" font-extrabold text-blue-700 pb-1 w-fit">
                Đang xem tháng: {dataMonth?.month}
              </p>
              <p className=" font-extrabold text-blue-700 pb-1 w-fit">
                Tổng số bài đăng {dataMonth?.total}
              </p>
            </div>

            <div className="flex flex-col gap-y-2 overflow-x-scroll">
              <div className="flex gap-x-4 items-center justify-between font-bold text-xs min-w-[850px] w-full">
                <p className="w-8">STT</p>
                <p className="w-2/12">Lượt ứng tuyển</p>
                <p className="w-2/12">Lượt từ chối</p>
                <p className="w-2/12">Lượt chấp thuận</p>
                <p className="w-3/12">Tên bài đăng</p>
                <div className="w-[15%] h-full"></div>
              </div>
              <div className="flex flex-col gap-y-2 overflow-y-scroll max-h-40 min-w-[850px]">
                <div className="flex gap-x-4 items-center justify-between font-medium text-xs w-full">
                  <p className="w-8 pl-2">1</p>
                  <p className="w-2/12 text-blue-500 pl-2">10,102</p>
                  <p className="w-2/12 text-red-500 pl-2">300</p>
                  <p className="w-2/12 text-green-500 pl-2">600</p>
                  <p className="w-3/12">Việc làm cung ứng</p>

                  <button className=" hover:text-blue-400 p-1 w-[15%] font-bold rounded-xl text-blue-700 text-nowrap">
                    Xem chi tiết
                  </button>
                </div>
                <div className="flex gap-x-4 items-center justify-between font-medium text-xs w-full">
                  <p className="w-8 pl-2">1</p>
                  <p className="w-2/12 text-blue-500 pl-2">10,102</p>
                  <p className="w-2/12 text-red-500 pl-2">300</p>
                  <p className="w-2/12 text-green-500 pl-2">600</p>
                  <p className="w-3/12">Việc làm cung ứng</p>

                  <button className=" hover:text-blue-400 p-1 w-[15%] font-bold rounded-xl text-blue-700 text-nowrap">
                    Xem chi tiết
                  </button>
                </div>
                <div className="flex gap-x-4 items-center justify-between font-medium text-xs w-full">
                  <p className="w-8 pl-2">1</p>
                  <p className="w-2/12 text-blue-500 pl-2">10,102</p>
                  <p className="w-2/12 text-red-500 pl-2">300</p>
                  <p className="w-2/12 text-green-500 pl-2">600</p>
                  <p className="w-3/12">Việc làm cung ứng</p>

                  <button className=" hover:text-blue-400 p-1 w-[15%] font-bold rounded-xl text-blue-700 text-nowrap">
                    Xem chi tiết
                  </button>
                </div>
                <div className="flex gap-x-4 items-center justify-between font-medium text-xs w-full">
                  <p className="w-8 pl-2">1</p>
                  <p className="w-2/12 text-blue-500 pl-2">10,102</p>
                  <p className="w-2/12 text-red-500 pl-2">300</p>
                  <p className="w-2/12 text-green-500 pl-2">600</p>
                  <p className="w-3/12">Việc làm cung ứng</p>

                  <button className=" hover:text-blue-400 p-1 w-[15%] font-bold rounded-xl text-blue-700 text-nowrap">
                    Xem chi tiết
                  </button>
                </div>
                <div className="flex gap-x-4 items-center justify-between font-medium text-xs w-full">
                  <p className="w-8 pl-2">1</p>
                  <p className="w-2/12 text-blue-500 pl-2">10,102</p>
                  <p className="w-2/12 text-red-500 pl-2">300</p>
                  <p className="w-2/12 text-green-500 pl-2">600</p>
                  <p className="w-3/12">Việc làm cung ứng</p>

                  <button className=" hover:text-blue-400 p-1 w-[15%] font-bold rounded-xl text-blue-700 text-nowrap">
                    Xem chi tiết
                  </button>
                </div>
                <div className="flex gap-x-4 items-center justify-between font-medium text-xs w-full">
                  <p className="w-8 pl-2">1</p>
                  <p className="w-2/12 text-blue-500 pl-2">10,102</p>
                  <p className="w-2/12 text-red-500 pl-2">300</p>
                  <p className="w-2/12 text-green-500 pl-2">600</p>
                  <p className="w-3/12">Việc làm cung ứng</p>

                  <button className=" hover:text-blue-400 p-1 w-[15%] font-bold rounded-xl text-blue-700 text-nowrap">
                    Xem chi tiết
                  </button>
                </div>
                <div className="flex gap-x-4 items-center justify-between font-medium text-xs w-full">
                  <p className="w-8 pl-2">1</p>
                  <p className="w-2/12 text-blue-500 pl-2">10,102</p>
                  <p className="w-2/12 text-red-500 pl-2">300</p>
                  <p className="w-2/12 text-green-500 pl-2">600</p>
                  <p className="w-3/12">Việc làm cung ứng</p>

                  <button className=" hover:text-blue-400 p-1 w-[15%] font-bold rounded-xl text-blue-700 text-nowrap">
                    Xem chi tiết
                  </button>
                </div>
                <div className="flex gap-x-4 items-center justify-between font-medium text-xs w-full">
                  <p className="w-8 pl-2">1</p>
                  <p className="w-2/12 text-blue-500 pl-2">10,102</p>
                  <p className="w-2/12 text-red-500 pl-2">300</p>
                  <p className="w-2/12 text-green-500 pl-2">600</p>
                  <p className="w-3/12">Việc làm cung ứng</p>

                  <button className=" hover:text-blue-400 p-1 w-[15%] font-bold rounded-xl text-blue-700 text-nowrap">
                    Xem chi tiết
                  </button>
                </div>
              </div>
            </div>
            {/* <div className="flex justify-center">
              <button className="font-semibold text-sm text-blue-700 hover:text-blue-400">
                Xem thêm
              </button>
            </div> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardApply;
