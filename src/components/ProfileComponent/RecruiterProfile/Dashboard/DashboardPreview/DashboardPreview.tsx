import { PieChart } from "@mui/x-charts/PieChart";
import { Gauge, gaugeClasses } from "@mui/x-charts/Gauge";
import React, { useEffect, useState } from "react";
import { RiErrorWarningLine } from "react-icons/ri";
import "./DashboardPreview.scss";
import DashboardApi from "@/api/recruiter/dashboard/dashboardApi";

type Props = {};

const DashboardPreview = (props: Props) => {
  const [dataPercent, setDataPercent] = useState<any>({});
  useEffect(() => {
    const fetchData = async () => {
      const data = await DashboardApi.getDetailPercent();
      setDataPercent(data.data);
    };
    fetchData();
  }, []);
  return (
    <div>
      <div className="max-w-6xl flex justify-between flex-wrap gap-2 items-center">
        <div className="w-[250px] h-[250px] p-4 bg-blue-900 rounded-md">
          <div>
            <div className="font-semibold flex items-center gap-x-2 text-lg text-white">
              <span>Đánh giá tốt</span>
              <RiErrorWarningLine />
            </div>
            <div className="w-full h-full flex justify-center items-center relative">
              <Gauge
                className="!text-green-500"
                sx={(theme) => ({
                  [`& .${gaugeClasses}`]: {
                    fontSize: 30,
                    fill: "#ffffff",
                    color: "#ffffff",
                  },

                  [`& .${gaugeClasses.valueArc}`]: {
                    fill: "#4ade80",
                  },
                  [`& .${gaugeClasses.referenceArc}`]: {
                    fill: "#ffffff",
                  },
                })}
                text={""}
                width={200}
                height={200}
                value={dataPercent?.percentCompanyRatings?.percent}
                startAngle={-140}
                endAngle={140}
              />
              <span className="absolute inset-0 text-4xl flex justify-center translate-y-1 text-green-500 items-center font-semibold cursor-pointer">
                {dataPercent?.percentCompanyRatings?.percent.toFixed(2)}%
              </span>
              <span className="absolute inset-0 flex justify-center text-white items-end font-semibold ">
                {dataPercent?.percentCompanyRatings?.totalCompanyRating}
              </span>
            </div>
          </div>
        </div>
        <div className="w-[250px] h-[250px] p-4 bg-blue-900 rounded-md">
          <div>
            <div className="font-semibold flex items-center gap-x-2 text-lg text-white">
              <span>Chất lượng ứng tuyển</span>
              <RiErrorWarningLine />
            </div>
            <div className="w-full h-full flex justify-center items-center relative">
              <Gauge
                sx={(theme) => ({
                  [`& .${gaugeClasses.valueArc}`]: {
                    fill: "#60a5fa",
                  },
                  [`& .${gaugeClasses.referenceArc}`]: {
                    fill: "#ffffff",
                  },
                })}
                text={""}
                width={200}
                height={200}
                value={dataPercent?.percentViewPostAndApply?.percent}
                startAngle={-140}
                endAngle={140}
              />
              <span className="absolute inset-0 text-4xl flex justify-center translate-y-1 text-blue-400 items-center font-semibold cursor-pointer">
                {dataPercent?.percentViewPostAndApply?.percent.toFixed(2)}%
              </span>
              <span className="absolute inset-0 flex justify-center text-white items-end font-semibold ">
                {dataPercent?.percentViewPostAndApply?.totalViewPost}
              </span>
            </div>
          </div>
        </div>
        <div className="w-[250px] h-[250px] p-4 bg-blue-900 rounded-md">
          <div>
            <div className="font-semibold flex items-center gap-x-2 text-lg text-white">
              <span>Chất lượng bài viết</span>
              <RiErrorWarningLine />
            </div>
            <div className="w-full h-full flex justify-center items-center relative">
              <Gauge
                sx={(theme) => ({
                  [`& .${gaugeClasses.valueArc}`]: {
                    fill: "#facc15",
                  },
                  [`& .${gaugeClasses.referenceArc}`]: {
                    fill: "#ffffff",
                  },
                })}
                text={""}
                width={200}
                height={200}
                value={dataPercent?.percentPostAndBookmark?.percent}
                startAngle={-140}
                endAngle={140}
              />
              <span className="absolute inset-0 text-4xl flex justify-center text-yellow-400 translate-y-1 text- items-center font-semibold cursor-pointer">
                {dataPercent?.percentPostAndBookmark?.percent.toFixed(2)}%
              </span>
              <span className="absolute inset-0 flex justify-center text-white items-end font-semibold">
                {dataPercent?.percentPostAndBookmark?.totalPost}
              </span>
            </div>
          </div>
        </div>
        <div className="w-[250px] h-[250px] p-4 bg-blue-900 rounded-md">
          <div>
            <div className="font-semibold flex items-center gap-x-2 text-lg text-white">
              <span>Lượt trúng tuyển</span>
              <RiErrorWarningLine />
            </div>
            <div className="w-full h-full flex justify-center items-center relative">
              <Gauge
                sx={(theme) => ({
                  [`& .${gaugeClasses}`]: {
                    fontSize: 30,
                    fill: "#ffffff",
                    color: "#ffffff",
                  },

                  [`& .${gaugeClasses.valueArc}`]: {
                    fill: "#2dd4bf",
                  },
                  [`& .${gaugeClasses.referenceArc}`]: {
                    fill: "#ffffff",
                  },
                })}
                text={""}
                width={200}
                height={200}
                value={dataPercent?.percentApplication?.percent}
                startAngle={-140}
                endAngle={140}
              />
              <span className="absolute inset-0 text-4xl flex justify-center translate-y-1 text-teal-400 items-center font-semibold cursor-pointer">
                {dataPercent?.percentApplication?.percent.toFixed(2)}%
              </span>
              <span className="absolute inset-0 flex justify-center text-white items-end font-semibold cursor-pointer ">
                {dataPercent?.percentApplication?.totalApplication}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPreview;
