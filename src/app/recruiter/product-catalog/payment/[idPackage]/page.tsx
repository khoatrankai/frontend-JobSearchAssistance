/* eslint-disable react-hooks/rules-of-hooks */
"use client";
import React, { useEffect, useState } from "react";
import { RiMoneyDollarCircleFill } from "react-icons/ri";
import { useDispatch, useSelector } from "react-redux";
import { GoPackage } from "react-icons/go";
import { FaFileCircleExclamation } from "react-icons/fa6";
import { FaClipboardCheck } from "react-icons/fa";
import { useParams, useRouter } from "next/navigation";
import packageServiceApi from "@/api/packageService/packageService";
import { MdDone } from "react-icons/md";
import { IoMdClose } from "react-icons/io";
import { useSrollContext } from "@/context/AppProvider";
import { fetchProfileRecruiter } from "@/redux/reducer/profileReducer/profileSliceRecruiter";

type Props = {};

const page = (props: Props) => {
  const { setSelectProfileRecruiter, checkPage } = useSrollContext();
  const dispatch = useDispatch();
  const router = useRouter();
  const { idPackage } = useParams();
  // const [infoStatus,setInfoStatus] = useState<any>()
  const [statusPay, setStatusPay] = useState<any>(-1);
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
        numberArray.splice(vt, 0, ",");
        vt = vt + 4;
      }
      numberArray.pop();
      return numberArray.join("");
    }
  };
  const handlePay = async () => {
    const data: any = await packageServiceApi.postPayPackage(idPackage);
    setStatusPay(data.status);
    if (data.status === 200) {
      dispatch(fetchProfileRecruiter("vi") as any);
    }
  };
  const [dataPackage, setDataPackage] = useState<any>();
  useEffect(() => {
    const fetchData = async () => {
      if (idPackage) {
        const dataPack: any = await packageServiceApi.getIdPackage(idPackage);
        //console.log(dataPack);

        if (dataPack && dataPack.status === 200) {
          //console.log(dataPack);
          setDataPackage(dataPack?.data);
        }
      }
    };
    fetchData();
  }, [idPackage]);
  const profile = useSelector((state: any) => state.profileRecruiter.profile);

  return (
    <div className="flex justify-center">
      <div className="flex flex-col mt-5 w-full max-w-6xl min-h-screen">
        <div
          className={`bg-white transition-all p-4 flex flex-col gap-y-8 rounded-xl relative`}
        >
          <div className="mb-4 flex justify-between flex-wrap">
            <div className="flex h-fit items-center ">
              <div className="h-10 w-3 bg-blue-500 mr-4"></div>
              <h1 className="font-bold text-xl capitalize">
                Thông tin thanh toán
              </h1>
            </div>
          </div>

          {statusPay === -1 ? (
            <div className="flex gap-8 w-full justify-start flex-wrap">
              <div className="flex flex-col gap-2 ">
                <div className="flex items-center gap-2 text-blue-500 text-sm font-medium">
                  {" "}
                  <GoPackage className="text-base" />{" "}
                  <span>Gói thanh toán</span>
                </div>
                <div>
                  <div
                    className={`min-h-fit h-auto w-96 rounded-lg bg-white shadow-2xl  overflow-hidden ${
                      dataPackage?.type === "V4"
                        ? "shadow-red-500/20"
                        : dataPackage?.type === "V3"
                        ? "shadow-yellow-500/20"
                        : dataPackage?.type === "V2"
                        ? "shadow-green-500/20"
                        : "shadow-blue-500/20"
                    }`}
                  >
                    <p
                      className={`text-xl font-bold px-4 py-4  text-white  ${
                        dataPackage?.type === "V4"
                          ? "bg-red-600"
                          : dataPackage?.type === "V3"
                          ? "bg-yellow-500"
                          : dataPackage?.type === "V2"
                          ? "bg-green-600"
                          : "bg-blue-600"
                      }`}
                    >
                      {dataPackage?.name}
                    </p>
                    <div className="px-4 py-2 flex flex-col gap-4">
                      <div>
                        <p className="text-xl font-bold text-blue-700">
                          {dataPackage?.valueNew}{" "}
                          <span className="text-sm font-extrabold">VNĐ</span>
                          <span className="text-gray-400 font-semibold text-sm line-through">
                            {dataPackage?.valueOld}
                          </span>{" "}
                        </p>
                        <p className="text-xs">* Giá trên chưa bao gồm VAT</p>
                      </div>

                      <div>
                        <p className="text-gray-600 text-sm font-bold uppercase mb-4">
                          Quyền lợi
                        </p>
                        {dataPackage?.type === "V4" ? (
                          <>
                            <div className="flex flex-col gap-1">
                              <div className="flex gap-2 items-center text-sm text-blue-500 font-medium">
                                <FaClipboardCheck />
                                <p>
                                  Đăng{" "}
                                  <span className="text-black font-bold">
                                    không giới hạn
                                  </span>{" "}
                                  tin mỗi ngày
                                </p>
                              </div>
                              {/* <div className="flex gap-2 items-center text-sm text-blue-500 font-medium">
                                <FaClipboardCheck />
                                <p>Đẩy top 7 lần trong ngày</p>
                              </div> */}
                              <div className="flex gap-2 items-center text-sm text-blue-500 font-medium">
                                <FaClipboardCheck />
                                <p>Được AI đề xuất CV</p>
                              </div>
                              <div className="flex gap-2 items-center text-sm text-blue-500 font-medium">
                                <FaClipboardCheck />
                                <p>Được đăng info công ty ở banner</p>
                              </div>
                            </div>
                          </>
                        ) : dataPackage?.type === "V3" ? (
                          <>
                            <div className="flex flex-col gap-1 flex-1">
                              <div className="flex gap-2 items-center text-sm text-blue-500 font-medium">
                                <FaClipboardCheck />
                                <p>
                                  Đăng{" "}
                                  <span className="text-black font-bold">
                                    30
                                  </span>{" "}
                                  tin mỗi ngày
                                </p>
                              </div>
                              {/* <div className="flex gap-2 items-center text-sm text-blue-500 font-medium">
                                <FaClipboardCheck />
                                <p>Đẩy top 3 lần trong ngày</p>
                              </div> */}
                              <div className="flex gap-2 items-center text-sm text-blue-500 font-medium">
                                <FaClipboardCheck />
                                <p>Được AI đề xuất CV</p>
                              </div>
                            </div>
                          </>
                        ) : dataPackage?.type === "V2" ? (
                          <>
                            <div className="flex flex-col gap-1">
                              <div className="flex gap-2 items-center text-sm text-blue-500 font-medium">
                                <FaClipboardCheck />
                                <p>
                                  Đăng{" "}
                                  <span className="text-black font-bold">
                                    20
                                  </span>{" "}
                                  tin mỗi ngày
                                </p>
                              </div>
                              {/* <div className="flex gap-2 items-center text-sm text-blue-500 font-medium">
                                <FaClipboardCheck />
                                <p>Đẩy top 1 lần trong ngày</p>
                              </div> */}
                              <div className="flex gap-2 items-center text-sm text-blue-500 font-medium">
                                <FaClipboardCheck />
                                <p>Được AI đề xuất CV</p>
                              </div>
                            </div>
                          </>
                        ) : (
                          <>
                            <div className="flex flex-col gap-1">
                              <div className="flex gap-2 items-center text-sm text-blue-500 font-medium">
                                <FaClipboardCheck />
                                <p>
                                  Đăng{" "}
                                  <span className="text-black font-bold">
                                    10
                                  </span>{" "}
                                  tin mỗi ngày
                                </p>
                              </div>
                              {/* <div className="flex gap-2 items-center text-sm text-blue-500 font-medium">
                                <FaClipboardCheck />
                                <p>Đẩy top 1 lần trong ngày</p>
                              </div> */}
                            </div>
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex flex-col gap-2 flex-1 pl-12 border-l-[1px]">
                <div className="flex items-center gap-2 text-blue-500 text-sm font-medium">
                  <FaFileCircleExclamation className="text-base" />{" "}
                  <span>Chi tiết hóa đơn</span>
                </div>
                <div className="flex flex-wrap gap-4">
                  {/* {checkValue !== -1 && ( */}
                  <div className="flex flex-col w-full min-w-96 p-4 gap-2">
                    <p className="text-sm font-bold py-2 border-b-[1px]">
                      *Chi tiết giao dịch
                    </p>
                    <div className="flex flex-col text-sm font-medium gap-2">
                      <div className="flex justify-between w-full py-2 border-b-[1px]">
                        <p>Gói mua</p>
                        <p>{dataPackage?.name}</p>
                      </div>
                      <div className="flex justify-between w-full py-2 border-b-[1px]">
                        <p>Giá</p>
                        <p>
                          {dataPackage?.valueNew}
                          <span className="ml-1 text-xs text-black">đ</span>
                        </p>
                      </div>
                      <div className="flex justify-between w-full py-2 border-b-[1px]">
                        <p>POINT Khách hàng</p>
                        <p>
                          {profile?.point}{" "}
                          <span className="ml-1 text-xs text-black">đ</span>
                        </p>
                      </div>
                      <div className="flex justify-between w-full py-2 border-b-[1px]">
                        <p>POINT còn lại</p>
                        <p>
                          {profile?.point - dataPackage?.valueNew}{" "}
                          <span className="ml-1 text-xs text-black">đ</span>
                        </p>
                      </div>
                      <div className="flex justify-between w-full py-2 border-b-[1px]">
                        <p>Tên khách hàng</p>
                        <p>{profile.name}</p>
                      </div>
                    </div>
                    {profile?.point - dataPackage?.valueNew < 0 ? (
                      <button
                        className="p-2 rounded-lg bg-red-500 text-white font-semibold hover:bg-red-400"
                        onClick={() => {
                          setSelectProfileRecruiter(6);
                          if (checkPage !== "/recruiter/profile")
                            router.push("/recruiter/profile");
                        }}
                      >
                        Bấm vào đây để nạp thêm POINT
                      </button>
                    ) : (
                      <button
                        className="p-2 rounded-lg bg-green-500 text-white font-semibold hover:bg-green-400"
                        onClick={handlePay}
                      >
                        Xử lý thanh toán
                      </button>
                    )}
                  </div>
                  {/* )} */}
                </div>
              </div>
            </div>
          ) : (
            <div className="flex justify-center">
              {statusPay === 200 ? (
                <div className="flex justify-center items-center flex-col">
                  <div className="p-16 w-fit rounded-full border-2 border-blue-600 mb-2">
                    <MdDone className="text-6xl text-green-500" />
                  </div>
                  <p className="font-semibold text-3xl">
                    Đã thanh toán thành công
                  </p>
                  {/* <p>Mã số nạp của bạn là <span></span></p> */}
                </div>
              ) : (
                <div className="flex justify-center items-center flex-col">
                  <div className="p-16 w-fit rounded-full border-2 border-red-600 mb-2">
                    <IoMdClose className="text-6xl text-red-500" />
                  </div>
                  <p className="font-semibold text-3xl">Thanh toán thất bại</p>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default page;
