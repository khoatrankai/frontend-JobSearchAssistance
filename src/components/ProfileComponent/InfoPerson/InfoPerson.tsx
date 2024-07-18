/* eslint-disable react/jsx-key */
import React, { useEffect, useState } from "react";
import Image from "next/image";
import axiosClient from "@/configs/axiosClient";
import moment from "moment";
import { useSelector } from "react-redux";
import { RootState } from "@/redux";
import { Input, Select } from "antd";
import { Option } from "antd/es/mentions";
import ToastCustom from "@/util/ToastCustom";
import { ValidationProfile } from "./validation/validation";

type Props = {
  dataInfo: any;
  handleUpdateApi: any;
  checkUpdate: boolean;
};
interface ILocation {
  code: number;
  data: any;
}
const InfoPerson = (props: Props) => {
  const { dataInfo, handleUpdateApi } = props;
  const { hdError } = ToastCustom();
  const [dataLocation, setDataLocation] = useState<any>([]);
  const [dataRequest, setDataRequest] = useState<any>();
  const [rsInfo, setRSInfo] = useState<boolean>(false);
  const { Option } = Select;
  const languageRedux = useSelector(
    (state: RootState) => state.changeLaguage.language
  );
  const handleUpdate = (e: any) => {
    switch (e.target.name) {
      case "birthday":
        setDataRequest({
          ...dataRequest,
          [e.target.name]: new Date(e.target.value).getTime(),
        });
        break;
      default:
        setDataRequest({ ...dataRequest, [e.target.name]: e.target.value });
    }
  };
  const rsData = () => {
    setDataRequest(dataInfo);
  };
  const saveData = () => {
    const checkPost = new ValidationProfile(
      dataRequest?.name,
      dataRequest?.birthday,
      dataRequest?.gender,
      dataRequest?.address,
      dataRequest?.jobTypeName
    );
    const validate = checkPost.validateAllFields();
    if (validate && !validate.status) {
      hdError(validate.message);
    } else {
      handleUpdateData();
    }
  };
  const handleUpdateData = () => {
    const fetchData = async () => {
      const res = (await axiosClient.put(
        "https://imagination-trusted-joyce-techniques.trycloudflare.com/api/v1/profiles/per",
        dataRequest
      )) as unknown as ILocation;
      const { hdError, hdSuccess } = ToastCustom();

      if (res && res.code === 200) {
        hdSuccess("Cập nhật thông tin cá nhân thành công");
        setRSInfo(!rsInfo);
      } else {
        hdError("Cập nhật thông tin cá nhân không thành công");
      }
    };
    fetchData();
  };
  useEffect(() => {
    rsData();
  }, [dataInfo]);
  useEffect(() => {
    const fetchData = async () => {
      const res = (await axiosClient.get(
        "https://imagination-trusted-joyce-techniques.trycloudflare.com/api/v1/locations/p"
      )) as unknown as ILocation;
      if (res && res.code === 200) {
        setDataLocation(res.data);
      }
    };
    fetchData();
  }, []);
  const handleRsInfo = (name: any) => {
    switch (name) {
      case "update":
        setRSInfo(!rsInfo);
        break;
      case "save":
        saveData();
        break;
      case "close":
        setRSInfo(!rsInfo);
        rsData();
        break;
    }
  };

  return (
    <div
      className={`bg-white ${
        rsInfo
          ? "shadow-[rgba(13,_38,_76,_0.19)_0px_9px_20px] "
          : "border-transparent"
      } transition-all p-4 rounded-xl relative`}
    >
      <div className="mb-8 flex justify-between flex-wrap">
        <div className="flex h-fit items-center ">
          <div className="h-10 w-3 bg-blue-500 mr-4"></div>
          <h1 className="font-bold text-xl">
            {languageRedux === 1 ? "Thông tin cá nhân" : "Personal information"}
          </h1>
        </div>

        {props.checkUpdate === false && (
          <div className="flex gap-2">
            {rsInfo ? (
              <>
                <button
                  className="w-fit flex items-center hover:shadow-[inset_-12px_-8px_40px_#46464620] rounded-lg p-1 font-serif"
                  onClick={() => {
                    handleRsInfo("save");
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
                    handleRsInfo("close");
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
                  handleRsInfo("update");
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
      <div>
        <div className="flex flex-col gap-2">
          <div className="flex min-w-fit items-center">
            <label className="basis-1/3 font-serif">
              {languageRedux === 1 ? "Họ và tên" : "FullName"}
            </label>
            <div className="basis-2/3 font-bold">
              <Input
                value={dataRequest?.name ?? ""}
                className={`font-serif outline-none focus-within:bg-black/5 border-[1px] w-full rounded-lg p-1 ${
                  rsInfo ? "border-dashed border-black/30" : "bg-transparent"
                }`}
                name="name"
                onChange={handleUpdate}
                disabled={!rsInfo}
                type="text"
              />
            </div>
          </div>
          <div className="flex min-w-fit items-center">
            <label className="basis-1/3 font-serif">
              {languageRedux === 1 ? "Ngày sinh" : "Birthday"}
            </label>
            <div className="basis-2/3 font-bold">
              <Input
                className={`font-serif outline-none focus-within:bg-black/5 border-[1px] w-full rounded-lg p-1 ${
                  rsInfo ? "border-dashed border-black/30" : "bg-transparent"
                }`}
                value={moment(dataRequest?.birthday).format("yyyy-MM-DD")}
                name="birthday"
                onChange={handleUpdate}
                disabled={!rsInfo}
                type="date"
              />
            </div>
          </div>
          <div className="flex min-w-fit items-center">
            <label className="basis-1/3 font-serif">
              {languageRedux === 1 ? "Giới tính" : "Sex"}
            </label>
            <div className="basis-2/3 font-bold">
              <Select
                // @ts-ignore
                name="gender"
                className={`font-serif focus-within:bg-black/5 w-full rounded-lg appearance-none ${
                  rsInfo ? "border-dashed border-black/30" : "bg-transparent"
                }`}
                value={dataRequest?.gender}
                disabled={!rsInfo}
                onChange={(e) => {
                  setDataRequest({
                    ...dataRequest,
                    gender: e,
                  });
                }}
              >
                <Option value={1}>
                  {languageRedux === 1 ? "Nam" : "Male"}
                </Option>
                <Option value={0}>
                  {languageRedux === 1 ? "Nữ" : "Female"}
                </Option>
              </Select>
            </div>
          </div>
          <div className="flex min-w-fit items-center">
            <label className="basis-1/3 font-serif">
              {languageRedux === 1 ? "Địa chỉ" : "Address"}
            </label>
            <div className="basis-2/3 font-bold">
              <Select
                value={dataRequest?.address}
                className={`focus-within:bg-black/5 border-[1px] w-full rounded-lg appearance-none ${
                  rsInfo ? "border-dashed " : "bg-transparent"
                }`}
                onChange={(e) => {
                  setDataRequest({
                    ...dataRequest,
                    address: e,
                  });
                }}
                disabled={!rsInfo}
              >
                {dataLocation?.map((dt: any) => {
                  return (
                    <Option key={dt.id} value={dt.id}>
                      {dt.name}
                    </Option>
                  );
                })}
              </Select>
            </div>
          </div>
          <div className="flex min-w-fit items-center">
            <label className="basis-1/3 font-serif">
              {languageRedux === 1
                ? "Vị trí ứng tuyển"
                : "Position applied for"}
            </label>
            <div className="basis-2/3 font-bold">
              <Input
                value={dataRequest?.jobTypeName ?? ""}
                className={`font-serif outline-none focus-within:bg-black/5 border-[1px] w-full rounded-lg p-1 ${
                  rsInfo ? "border-dashed border-black/30" : "bg-transparent"
                }`}
                name="jobTypeName"
                onChange={handleUpdate}
                disabled={!rsInfo}
                type="text"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InfoPerson;
