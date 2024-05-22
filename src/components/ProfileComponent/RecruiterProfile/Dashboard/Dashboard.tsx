import React, { useEffect, useState } from "react";
import { FaUserTie } from "react-icons/fa";
import { MdDocumentScanner } from "react-icons/md";
import { ImBlog } from "react-icons/im";
import "./Dashboard.scss";
import Image from "next/image";
import DashboardPost from "./DashboardPost/DashboardPost";
import "./Dashboard.scss";
import DashboardApply from "./DashboardApply/DashboardApply";
import DashboardPreview from "./DashboardPreview/DashboardPreview";
import DashboardApi from "@/api/recruiter/dashboard/dashboardApi";
type Props = {};

const Dashboard = (props: Props) => {
  const [dataAnalystView, setAnalystView] = useState<any>([]);
  useEffect(() => {
    const fetchData = async () => {
      const data = await DashboardApi.getAnalyticViewers("vi");
      setAnalystView(data.data);
    };
    fetchData();
  }, []);
  return (
    <div className="mt-5 flex flex-col">
      <div className="flex flex-col gap-y-4">
        <p className="font-semibold text-2xl">Số liệu thống kê</p>
        <div className="flex flex-wrap gap-4 max-w-6xl justify-center">
          <div className="basis-[32%] min-w-64  h-36 border-2 rounded-lg relative border-blue-800 flex">
            <div className="text-5xl h-full flex justify-center items-center w-1/4 border-r-2">
              <MdDocumentScanner />
            </div>
            <div className="w-3/4 flex flex-col">
              <p className="font-bold text-4xl w-full flex px-4 h-1/2 items-center  text-blue-700 ">
                {dataAnalystView?.totalPost}
              </p>
              <p className="h-1/2 text-xl font-medium px-4">
                Số bài đăng tuyển
              </p>
            </div>
          </div>
          <div className="basis-[32%] min-w-64 h-36 border-2 rounded-lg relative border-blue-800 flex">
            <div className="text-5xl h-full flex justify-center items-center w-1/4 border-r-2">
              <FaUserTie />
            </div>
            <div className="w-3/4 flex flex-col">
              <p className="font-bold text-4xl w-full flex px-4 h-1/2 items-center  text-blue-700">
                {dataAnalystView?.totalApplication}
              </p>
              <p className="h-1/2 text-xl font-medium px-4">Lượt ứng tuyển</p>
            </div>
          </div>
          <div className="basis-[32%] min-w-64 h-36 border-2 rounded-lg relative border-blue-800 flex">
            <div className="text-5xl h-full flex justify-center items-center w-1/4 border-r-2">
              <ImBlog />
            </div>
            <div className="w-3/4 flex flex-col">
              <p className="font-bold text-4xl w-full flex px-4 h-1/2 items-center  text-blue-700">
                {dataAnalystView?.totalReviewCompany}
              </p>
              <p className="h-1/2 text-xl font-medium px-4">Lượt đánh giá</p>
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-y-16 max-w-6xl">
          <DashboardPost dataView={dataAnalystView} />
          <DashboardApply />
          <DashboardPreview />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
