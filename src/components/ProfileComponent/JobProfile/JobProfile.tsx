/* eslint-disable react/jsx-key */
import React, { useEffect, useState } from "react";
import Image from "next/image";
import CategoryProfile from "./Modals/CategoryProfile/CategoryProfile";
import PositionProfile from "./Modals/PositionProfile/PositionProfile";
import TypeJob from "./Modals/TypeJob/TypeJob";
import axiosClient from "@/configs/axiosClient";
import { useSelector } from "react-redux";
import { RootState } from "@/redux";
import ToastCustom from "@/util/ToastCustom";

type Props = {
  dataInfo: any;
  handleUpdateApi: any;
  checkUpdate: boolean;
};
interface IData {
  code: any;
  data: any;
}
const JobProfile = (props: Props) => {
  const { dataInfo, handleUpdateApi } = props;
  const [dataRequest, setDataRequest] = useState({
    categoryIds: [],
    locationIds: [],
  });
  const languageRedux = useSelector(
    (state: RootState) => state.changeLaguage.language
  );
  const handleBack = () => {
    setDataRequest(dataInfo);
  };
  useEffect(() => {
    handleBack();
  }, [dataInfo]);
  const [rsJob, setRSJob] = useState<boolean>(false);
  const handleRsJob = (name: any) => {
    switch (name) {
      case "update":
        setRSJob(!rsJob);
        break;
      case "save":
        handleUpdateData();
        setRSJob(!rsJob);
        break;
      case "close":
        handleBack();
        setRSJob(!rsJob);
        break;
    }
  };
  const handleUpdateData = () => {
    const fetchData = async () => {
      const resCat = (await axiosClient.put(
        "https://backend-hcmute-nodejs.onrender.com/api/v1/profiles/cat",
        dataRequest
      )) as unknown as IData;
      const resLoc = (await axiosClient.put(
        "https://backend-hcmute-nodejs.onrender.com/api/v1/profiles/loc",
        dataRequest
      )) as unknown as IData;
      const resType = (await axiosClient.put(
        "https://backend-hcmute-nodejs.onrender.com/api/v1/profiles/per",
        dataRequest
      )) as unknown as IData;
      const { hdError, hdSuccess } = ToastCustom();
      if (
        resCat &&
        resType &&
        resLoc &&
        resLoc &&
        resCat.code === 200 &&
        resLoc.code === 200 &&
        resType.code === 200
      ) {
        hdSuccess("Cập nhật thông tin liên hệ thành công");
        handleUpdateApi();
      } else {
        hdError("Cập nhật thông tin liên hệ không thành công");
      }
    };
    fetchData();
  };
  return (
    <div
      className={` bg-white ${
        rsJob
          ? "shadow-[rgba(13,_38,_76,_0.19)_0px_9px_20px] "
          : "border-transparent"
      } transition-all  p-4 rounded-xl relative`}
    >
      <div className="flex justify-between flex-wrap mb-8">
        <div className="flex h-fit items-center">
          <div className="h-10 w-3 bg-blue-500 mr-4"></div>
          <h1 className="font-bold text-xl">
            {languageRedux === 1 ? "Công việc mong muốn" : "Desired job"}
          </h1>
        </div>

        {props.checkUpdate === false && (
          <div className="flex gap-2">
            {rsJob ? (
              <>
                <button
                  className="w-fit flex items-center hover:shadow-[inset_-12px_-8px_40px_#46464620] rounded-lg p-1 font-serif"
                  onClick={() => {
                    handleRsJob("save");
                  }}
                >
                  <Image
                    className="w-4 mr-1"
                    src={"/icontick.svg"}
                    alt=""
                    width={200}
                    height={200}
                  />
                  <h2 className="text-sm font-bold">
                    {languageRedux === 1 ? "Lưu" : "Save"}
                  </h2>
                </button>
                <button
                  className="w-fit flex items-center hover:shadow-[inset_-12px_-8px_40px_#46464620] rounded-lg p-1 font-serif"
                  onClick={() => {
                    handleRsJob("close");
                  }}
                >
                  <Image
                    className="w-4 mr-1"
                    src={"/iconclose.svg"}
                    alt=""
                    width={200}
                    height={200}
                  />
                  <h2 className="text-sm font-bold">
                    {languageRedux === 1 ? "Thoát" : "Exit"}
                  </h2>
                </button>
              </>
            ) : (
              <button
                className="w-fit flex items-center hover:shadow-[inset_-12px_-8px_40px_#46464620] rounded-lg p-1 font-serif"
                onClick={() => {
                  handleRsJob("update");
                }}
              >
                <Image
                  className="w-4 mr-1"
                  src={"/iconwrite.svg"}
                  alt=""
                  width={200}
                  height={200}
                />
                <h2 className="text-sm font-bold">
                  {languageRedux === 1 ? "Sửa" : "Edit"}
                </h2>
              </button>
            )}
          </div>
        )}
      </div>
      <CategoryProfile
        rsJob={rsJob}
        dataRequest={dataRequest}
        setDataRequest={setDataRequest}
      />
      <PositionProfile
        rsJob={rsJob}
        dataRequest={dataRequest}
        setDataRequest={setDataRequest}
      />
      <TypeJob
        rsJob={rsJob}
        dataRequest={dataRequest}
        setDataRequest={setDataRequest}
      />
    </div>
  );
};

export default JobProfile;
