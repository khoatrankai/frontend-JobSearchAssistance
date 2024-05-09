import React, { useEffect, useState } from "react";
import ReactPlayer from "react-player";
import "./InfoJobMail.scss";
import Image from "next/image";
import ShortText from "@/util/ShortText";
import { PieChart } from "@mui/x-charts/PieChart";
import { color } from "framer-motion";
import analyticsApi from "@/api/analytics";
import { Select } from "antd";
import { tabClasses } from "@mui/material";

type Props = {};

const InfoJobMail = (props: Props) => {
  const { handleShortTextHome } = ShortText();
  const [selectSalary, setSelectSalary] = useState<any>(0);
  const [dataSalaryTop, setSalaryTop] = useState<any>([]);
  const [dataJobApplyTop, setDataJobApplyTop] = useState<any>([
    { name: "Kinh doanh" },
    { name: "Kỹ thuật máy tính" },
    { name: "Giáo viên" },
    { name: "Kỹ Sư" },
    { name: "Đầu bếp" },
  ]);
  const [dataSalaryChart, setSalaryChart] = useState<any>([
    {
      id: 0,
      color: "#4ADE80",
      value: 66,
      label: "1-2 triệu",
    },
    {
      id: 1,
      color: "#60A5FA",
      value: 46,
      label: "2-4 triệu",
    },
    {
      id: 2,
      color: "#A78BFA",
      value: 36,
      label: "4-6 triệu",
    },
    {
      id: 3,
      color: "#F472B6",
      value: 20,
      label: "6-8 triệu",
    },
    {
      id: 4,
      color: "#FB923C",
      value: 10,
      label: "trên 8 triệu",
    },
    {
      id: 5,
      color: "#FACC15",
      value: 10,
      label: "trên 8 triệu",
    },
  ]);

  const ChangeNumber = (data: any, type = true) => {
    if (!data) {
      return 0;
    }
    if (type) {
      const numberArray = data?.split("");
      if (numberArray.length <= 4) {
        return data;
      }
      const lengthChange = Math.round(numberArray.length / 3 - 1);
      let vt = numberArray.length - (lengthChange * 3 + 1);
      for (let i = 0; i < lengthChange; i++) {
        numberArray.splice(vt, 0, ".");
        vt = vt + 4;
      }
      return numberArray.join("");
    } else {
      const numberArray = data?.split("");
      if (numberArray.length <= 3) {
        return data;
      }
      numberArray.push("");
      const lengthChange = Math.round(numberArray.length / 3 - 1);
      let vt = numberArray.length - (lengthChange * 3 + 1);
      for (let i = 0; i < lengthChange; i++) {
        numberArray.splice(vt, 0, ".");
        vt = vt + 4;
      }
      numberArray.pop();
      return numberArray.join("");
    }
  };
  const salaryMilestone = [
    "0-1K",
    "1K-2M",
    "2M-4M",
    "6M-8M",
    "8M-10M",
    // { min: 0, max: 1000 },
    // { min: 1001, max: 2000000 },
    // { min: 2000001, max: 4000000 },
    // { min: 4000001, max: 6000000 },
    // { min: 6000001, max: 8000000 },
    // { min: 8000001, max: 10000000 },
  ];

  useEffect(() => {
    const fetch = async () => {
      const data = await analyticsApi.totalApplicationsTop();
      const dataSalary = await analyticsApi.totalSalaryTop();
      setDataJobApplyTop(data.data);
      setSalaryTop(dataSalary.data);
      console.log(dataSalary.data);
    };
    fetch();
  }, []);
  useEffect(() => {
    setSalaryChart(
      dataSalaryChart.map((dt: any, ikey: any) => {
        return {
          ...dt,
          label:
            dataSalaryTop.resultWithMinMax?.[selectSalary].data?.[ikey]
              .parent_categories_name,
          value:
            dataSalaryTop.resultWithMinMax?.[selectSalary].data?.[ikey]
              .total_post,
        };
      })
    );
  }, [dataSalaryTop, selectSalary]);
  useEffect(() => {
    console.log(dataJobApplyTop);
  }, [dataJobApplyTop]);
  return (
    <div className="pb-16 bg-white">
      <div className="flex justify-center h-[500px] ">
        <div className="max-w-6xl w-full h-full relative flex gap-x-4">
          <div className="basis-1/3 p-2  flex flex-col bg-blue-800 rounded-xl">
            <div className="px-4 py-2 relative z-10">
              <p className="font-bold text-white text-3xl">
                Top việc làm{" "}
                <span className="text-blue-400 drop-shadow-2xl">01/2024</span>
              </p>
            </div>
            <div className="flex flex-col flex-1 items-center">
              <div className="rounded-full overflow-hidden w-32 h-32">
                <Image
                  src={"/logo/2023.png"}
                  alt=""
                  width={500}
                  height={500}
                  className="w-full h-full"
                />
              </div>
              <div className="flex-1 flex flex-col p-4 gap-y-2 w-full">
                <div className="basis-1/3 w-full p-2 flex gap-x-2 items-center cursor-pointer">
                  <Image
                    src={"/goapply.png"}
                    alt=""
                    width={500}
                    height={500}
                    className="h-16 w-16 rounded-lg"
                  />
                  <div className="flex flex-col h-full justify-around">
                    <p className="font-semibold text-white text-sm">
                      Việc làm đỉnh cao KOL
                    </p>
                    <p className="font-medium text-xs text-gray-400">
                      Công ty KOL
                    </p>
                    <p className="font-medium text-xs text-gray-400">TPHCM</p>
                  </div>
                </div>
                <div className="basis-1/3 w-full p-2 flex gap-x-2 items-center cursor-pointer">
                  <Image
                    src={"/goapply.png"}
                    alt=""
                    width={500}
                    height={500}
                    className="h-16 w-16 rounded-lg"
                  />
                  <div className="flex flex-col h-full justify-around">
                    <p className="font-semibold text-white text-sm">
                      Việc làm đỉnh cao KOL
                    </p>
                    <p className="font-medium text-xs text-gray-400">
                      Công ty KOL
                    </p>
                    <p className="font-medium text-xs text-gray-400">TPHCM</p>
                  </div>
                </div>
                <div className="basis-1/3 w-full p-2 flex gap-x-2 items-center cursor-pointer">
                  <Image
                    src={"/goapply.png"}
                    alt=""
                    width={500}
                    height={500}
                    className="h-16 w-16 rounded-lg"
                  />
                  <div className="flex flex-col h-full justify-around">
                    <p className="font-semibold text-white text-sm">
                      Việc làm đỉnh cao KOL
                    </p>
                    <p className="font-medium text-xs text-gray-400">
                      Công ty KOL
                    </p>
                    <p className="font-medium text-xs text-gray-400">TPHCM</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="flex-1 px-4 py-5 bg-blue-800 flex flex-col gap-y-4 rounded-xl">
            <div className="basis-1/4 flex w-full gap-x-4">
              <div className="bg-black/30 w-full h-full rounded-xl pl-4 flex flex-col justify-center text-white">
                <p className="font-bold text-3xl">
                  ${ChangeNumber(dataJobApplyTop.resultTotal?.[0].salaryMax)}
                </p>
                <p className="text-sm">Mức lương cao nhất</p>
              </div>
              <div className="bg-black/30 w-full h-full rounded-xl pl-4 flex flex-col justify-center text-white">
                <p className="font-bold text-3xl">
                  {ChangeNumber(
                    dataJobApplyTop.resultTotal?.[0].totalPost,
                    false
                  )}
                </p>
                <p className="text-sm">Việc làm</p>
              </div>
              <div className="bg-black/30 w-full h-full rounded-xl pl-4 flex flex-col justify-center text-white">
                <p className="font-bold text-3xl">
                  {ChangeNumber(
                    dataJobApplyTop.resultTotal?.[0].totalParentCategory,
                    false
                  )}
                </p>
                <p className="text-sm">Ngành nghề</p>
              </div>
            </div>
            <div className="flex-1 flex w-full gap-x-4">
              <div className="bg-black/30 w-full h-full rounded-xl p-4 flex flex-col gap-y-12">
                <p className="text-white font-bold">Số lượng ứng tuyển</p>
                <div className="flex flex-col gap-y-6 justify-end h-full">
                  <div className="flex flex-col">
                    <div className="w-full flex gap-x-2 items-end">
                      <div className="w-full relative group">
                        <div className="h-1 bg-green-400 w-full"></div>
                        <div
                          className=" bg-green-400/30 w-full"
                          style={{
                            height: `${
                              (160 * dataJobApplyTop.resultTop5?.[0].percent) /
                              100
                            }px`,
                          }}
                        ></div>
                        <p className="absolute bottom-full -translate-y-1 inset-x-0 flex justify-center text-xs font-semibold text-white transition-all duration-500 group-hover:text-green-400">
                          {dataJobApplyTop.resultTop5?.[0]?.total_application}
                        </p>
                      </div>
                      <div className="w-full relative group">
                        <div className="h-1 bg-blue-400 w-full"></div>
                        <div
                          className=" bg-blue-400/30 w-full"
                          style={{
                            height: `${
                              (160 * dataJobApplyTop.resultTop5?.[1].percent) /
                              100
                            }px`,
                          }}
                        ></div>
                        <p className="absolute bottom-full -translate-y-1 inset-x-0 flex justify-center text-xs font-semibold text-white transition-all duration-500 group-hover:text-blue-400">
                          {dataJobApplyTop.resultTop5?.[1]?.total_application}
                        </p>
                      </div>
                      <div className="w-full relative group">
                        <div className="h-1 bg-violet-400 w-full"></div>
                        <div
                          className=" bg-violet-400/30 w-full"
                          style={{
                            height: `${
                              (160 * dataJobApplyTop.resultTop5?.[2].percent) /
                              100
                            }px`,
                          }}
                        ></div>
                        <p className="absolute bottom-full -translate-y-1 inset-x-0 flex justify-center text-xs font-semibold text-white transition-all duration-500 group-hover:text-violet-400">
                          {dataJobApplyTop.resultTop5?.[2]?.total_application}
                        </p>
                      </div>
                      <div className="w-full relative group">
                        <div
                          className="h-1 bg-pink-400 w-full"
                          style={{
                            height: `${
                              (160 * dataJobApplyTop.resultTop5?.[3].percent) /
                              100
                            }px`,
                          }}
                        ></div>
                        <p className="absolute bottom-full -translate-y-1 inset-x-0 flex justify-center text-xs font-semibold text-white transition-all duration-500 group-hover:text-pink-400">
                          {dataJobApplyTop.resultTop5?.[3]?.total_application}
                        </p>
                        <div className=" bg-pink-400/30 w-full"></div>
                      </div>
                      <div className="w-full relative group">
                        <div className="h-1 bg-orange-400 w-full"></div>
                        <div
                          className=" bg-orange-400/30 w-full"
                          style={{
                            height: `${
                              (160 * dataJobApplyTop.resultTop5?.[4].percent) /
                              100
                            }px`,
                          }}
                        ></div>
                        <p className="absolute bottom-full -translate-y-1 inset-x-0 flex justify-center text-xs font-semibold text-white transition-all duration-500 group-hover:text-orange-400">
                          {dataJobApplyTop.resultTop5?.[4]?.total_application}
                        </p>
                      </div>
                      <div className="w-full relative group">
                        <div className="h-1 bg-yellow-400 w-full"></div>
                        <div
                          className="h-4 bg-yellow-400/30 w-full"
                          style={{
                            height: `${
                              (160 * dataJobApplyTop.resultTop5?.[5].percent) /
                              100
                            }px`,
                          }}
                        ></div>
                        <p className="absolute bottom-full -translate-y-1 inset-x-0 flex justify-center text-xs font-semibold text-white transition-all duration-500 group-hover:text-yellow-400">
                          {dataJobApplyTop.resultTop5?.[5]?.total_application}
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-wrap justify-between">
                    <div className="flex gap-x-1 items-center basis-1/3">
                      <div className="h-2 w-2 rounded-full bg-green-400"></div>
                      <p className="text-xs text-white font-medium">
                        {handleShortTextHome(
                          dataJobApplyTop.resultTop5?.[0]
                            ?.parent_categories_name,
                          10
                        )}
                      </p>
                    </div>
                    <div className="flex gap-x-1 items-center  basis-1/3">
                      <div className="h-2 w-2 rounded-full bg-blue-400"></div>
                      <p className="text-xs text-white font-medium">
                        {" "}
                        {handleShortTextHome(
                          dataJobApplyTop.resultTop5?.[1]
                            ?.parent_categories_name,
                          10
                        )}
                      </p>
                    </div>
                    <div className="flex gap-x-1 items-center  basis-1/3">
                      <div className="h-2 w-2 rounded-full bg-violet-400"></div>
                      <p className="text-xs text-white font-medium">
                        {handleShortTextHome(
                          dataJobApplyTop.resultTop5?.[2]
                            ?.parent_categories_name,
                          10
                        )}
                      </p>
                    </div>
                    <div className="flex gap-x-1 items-center  basis-1/3">
                      <div className="h-2 w-2 rounded-full bg-pink-400"></div>
                      <p className="text-xs text-white font-medium">
                        {" "}
                        {handleShortTextHome(
                          dataJobApplyTop.resultTop5?.[3]
                            ?.parent_categories_name,
                          10
                        )}
                      </p>
                    </div>
                    <div className="flex gap-x-1 items-center  basis-1/3">
                      <div className="h-2 w-2 rounded-full bg-orange-400"></div>
                      <p className="text-xs text-white font-medium">
                        {" "}
                        {handleShortTextHome(
                          dataJobApplyTop.resultTop5?.[4]
                            ?.parent_categories_name,
                          10
                        )}
                      </p>
                    </div>

                    <div className="flex gap-x-1 items-center  basis-1/3">
                      <div className="h-2 w-2 rounded-full bg-yellow-400"></div>
                      <p className="text-xs text-white font-medium">
                        {handleShortTextHome(
                          dataJobApplyTop.resultTop5?.[5]
                            ?.parent_categories_name,
                          10
                        )}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-black/30 w-full h-full rounded-xl p-4 flex flex-col gap-y-6">
                <div className="flex justify-between items-center">
                  <p className="text-white font-bold">Nhu cầu theo mức lương</p>
                  <Select
                    defaultValue={salaryMilestone[selectSalary]}
                    className="w-24"
                    onChange={(e: any) => {
                      setSelectSalary(e);
                    }}
                  >
                    {salaryMilestone.map((dt: any, ikey: any) => {
                      return (
                        <>
                          <option
                            onClick={() => {
                              setSelectSalary(ikey);
                            }}
                            key={ikey}
                          >
                            {dt}
                          </option>
                        </>
                      );
                    })}
                  </Select>
                </div>
                <div className="flex justify-center items-center relative">
                  <PieChart
                    slotProps={{
                      legend: { hidden: true },
                    }}
                    series={[
                      {
                        data: dataSalaryChart,
                        highlightScope: {
                          faded: "global",
                          highlighted: "item",
                        },
                        faded: {
                          innerRadius: 30,
                          additionalRadius: -30,
                          color: "gray",
                        },
                      },
                    ]}
                    height={200}
                  />
                  <div className="absolute inset-y-0 right-0 flex items-center">
                    <div className="flex flex-col ">
                      {dataSalaryChart.map((dt: any) => {
                        return (
                          <>
                            <div className="flex gap-x-1 items-center">
                              <div
                                className="h-2 w-2 rounded-full "
                                style={{ backgroundColor: dt.color }}
                              ></div>
                              <p className="text-xs text-white font-medium">
                                {handleShortTextHome(dt.label, 12)}
                              </p>
                            </div>
                          </>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InfoJobMail;
