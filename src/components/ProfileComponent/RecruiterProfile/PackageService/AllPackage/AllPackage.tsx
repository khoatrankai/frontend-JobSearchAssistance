/* eslint-disable react-hooks/rules-of-hooks */
"use client";
import packageServiceApi from "@/api/packageService/packageService";
import Image from "next/image";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { Button, Carousel } from "antd";
// import "./style.scss";
import { useSrollContext } from "@/context/AppProvider";
import { FaClipboardCheck } from "react-icons/fa";
import { Modal } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import ShortText from "@/util/ShortText";
import useRouterCustom from "@/util/useRouterCustom/useRouterCustom";
import { MdDone } from "react-icons/md";
import { IoMdClose } from "react-icons/io";
import { fetchProfileRecruiter } from "@/redux/reducer/profileReducer/profileSliceRecruiter";
import ToastCustom from "@/util/ToastCustom";
type Props = {};

const AllPackage = (props: Props) => {
  const dispatch = useDispatch();
  const { hdError } = ToastCustom();
  const [selectItem, setSelectItem] = useState<any>(-1);
  const { pushBlank, pushRouter } = useRouterCustom();
  const [tabModal, setTabModal] = useState<boolean>(false);
  const [tabPay, setTabPay] = useState<any>();
  const { ChangeNumber } = ShortText();
  const [listService, setListService] = useState<any>();
  const [packageBuy, setPackageBuy] = useState<any>();
  const { setSelectItemProfileRecruiter, setSelectProfileRecruiter } =
    useSrollContext();
  const profile = useSelector((state: any) => state.profileRecruiter.profile);
  const handlePoint = () => {
    return ChangeNumber(
      profile.point -
        (listService?.find((pay: any) => {
          return pay.id === packageBuy;
        })?.valueNew ?? 0),
      false,
      ","
    );
  };
  const handleBuy = async () => {
    const res: any = await packageServiceApi.postBuyService(packageBuy);
    if (res) {
      setPackageBuy(undefined);

      if (res.message === "Buy success") {
        dispatch(fetchProfileRecruiter("vi") as any);
        setTabPay(200);
      } else {
        setTabPay(100);
      }
    }
  };
  useEffect(() => {
    const fetchData = async () => {
      const res = await packageServiceApi.getListService();
      if (res) {
        setListService(res.data);
      }
    };
    fetchData();
  }, []);
  useEffect(() => {
    console.log(profile);
  }, [profile]);
  return (
    <div className="w-full flex justify-center max-h-[55vh] overflow-y-scroll">
      <div className="max-w-6xl w-full ">
        <div className="p-4 bg-slate-50 my-4 rounded-md">
          <div className="mb-6">
            <p className="text-2xl font-bold text-blue-800 capitalize">
              Gói đăng tuyển
            </p>
            <p className="text-sm font-semibold text-blue-800">
              Giúp tăng hiệu suất tìm ứng viên
            </p>
          </div>
          <div className="flex gap-6 flex-wrap justify-center">
            {listService?.map((dt: any) => {
              if (dt.type === "V4") {
                return (
                  <>
                    <div className="min-h-fit h-auto w-64 rounded-lg bg-white shadow-2xl shadow-red-500/20 overflow-hidden flex flex-col">
                      <p className="text-xl font-bold px-4 py-4 bg-red-600 text-white">
                        {dt.name}
                      </p>
                      <div className="flex flex-col flex-1 duration-500 transition-all">
                        <div
                          className={`px-4 py-2 flex flex-col gap-4 duration-500 transition-all  ${
                            selectItem === 0 ? "max-h-0 overflow-hidden" : ""
                          }`}
                        >
                          <div>
                            <p className="text-xl font-bold text-blue-700">
                              {ChangeNumber(dt.valueNew, false, ",")}
                              <span className="text-sm font-extrabold">
                                VNĐ
                              </span>
                              {/* <span className="text-gray-400 font-semibold">
                                /Hot
                              </span>{" "} */}
                            </p>
                            <p className="text-xs">
                              * Giá trên chưa bao gồm VAT
                            </p>
                          </div>

                          <div>
                            <button
                              className="w-full py-2 hover:bg-blue-700 hover:text-white rounded-lg border-[1px] border-blue-700 text-blue-700 font-semibold mb-1"
                              onClick={() => {
                                if (profile?.companyInfomation?.isActive) {
                                  const dataBuy =
                                    profile.point -
                                    listService?.find((pay: any) => {
                                      return pay.id === dt.id;
                                    })?.valueNew;
                                  console.log(
                                    dataBuy,
                                    profile.point,
                                    listService?.find((pay: any) => {
                                      return pay.id === dt.id;
                                    })?.valueNew
                                  );
                                  if (dataBuy >= 0) {
                                    // setPackageBuy(dt.id);
                                    pushRouter(
                                      `/recruiter/product-catalog/payment/${dt.id}`
                                    );
                                  } else {
                                    setTabModal(true);
                                  }
                                } else {
                                  hdError("Vui lòng chờ xác thực");
                                }
                              }}
                            >
                              Mua gói
                            </button>
                            <button
                              className="w-full py-2 bg-blue-700 hover:bg-blue-600 rounded-lg border-[1px] border-blue-700 text-white font-semibold"
                              onClick={() => {
                                // setSelectItem(0);
                                pushBlank(
                                  `/recruiter/product-catalog/${dt.id}`
                                );
                              }}
                            >
                              Xem chi tiết
                            </button>
                          </div>

                          <div>
                            <p className="text-gray-600 text-sm font-bold uppercase mb-4">
                              Quyền lợi
                            </p>
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
                          </div>
                        </div>
                        <div
                          className={`flex flex-col w-full  duration-500 transition-all px-2 ${
                            selectItem === 0
                              ? "flex-1"
                              : " max-h-0 overflow-hidden"
                          }`}
                        >
                          <div className="mb-2">
                            <button
                              className="text-blue-500"
                              onClick={() => {
                                setSelectItem(-1);
                              }}
                            >
                              Quay lại
                            </button>
                          </div>

                          <p>
                            <span className="text-red-500">*</span>Được đề xuất
                            lên trang chính bìa
                          </p>
                          <p>
                            <span className="text-red-500">*</span>Không giới
                            hạn lượt đăng bài
                          </p>
                          <p>
                            <span className="text-red-500">*</span>Được toàn
                            quyền sử dụng chức năng của trang
                          </p>
                        </div>
                      </div>
                    </div>
                  </>
                );
              }
              if (dt.type === "V3") {
                return (
                  <>
                    <div className="min-h-fit h-auto w-64 rounded-lg bg-white shadow-2xl shadow-yellow-500/20 overflow-hidden">
                      <p className="text-xl font-bold px-4 py-4 bg-yellow-500 text-white">
                        {dt.name}
                      </p>

                      <div className="flex flex-col flex-1 duration-500 transition-all">
                        <div
                          className={`px-4 py-2 flex flex-col gap-4 duration-500 transition-all  ${
                            selectItem === 1 ? "max-h-0 overflow-hidden" : ""
                          }`}
                        >
                          <div>
                            <p className="text-xl font-bold text-blue-700">
                              {ChangeNumber(dt.valueNew, false, ",")}
                              <span className="text-sm font-extrabold">
                                VNĐ
                              </span>
                              {/* <span className="text-gray-400 font-semibold">
                                /30 tin
                              </span>{" "} */}
                            </p>
                            <p className="text-xs">
                              * Giá trên chưa bao gồm VAT
                            </p>
                          </div>

                          <div>
                            <button
                              className="w-full py-2 hover:bg-blue-700 hover:text-white rounded-lg border-[1px] border-blue-700 text-blue-700 font-semibold mb-1"
                              onClick={() => {
                                if (profile?.companyInfomation?.isActive) {
                                  const dataBuy =
                                    profile.point -
                                    listService?.find((pay: any) => {
                                      return pay.id === dt.id;
                                    })?.valueNew;
                                  if (dataBuy >= 0) {
                                    // setPackageBuy(dt.id);
                                    pushRouter(
                                      `/recruiter/product-catalog/payment/${dt.id}`
                                    );
                                  } else {
                                    setTabModal(true);
                                  }
                                } else {
                                  hdError("Vui lòng chờ xác thực");
                                }
                              }}
                            >
                              Mua gói
                            </button>
                            <button
                              className="w-full py-2 bg-blue-700 hover:bg-blue-600 rounded-lg border-[1px] border-blue-700 text-white font-semibold"
                              onClick={() => {
                                pushBlank(
                                  `/recruiter/product-catalog/${dt.id}`
                                );
                              }}
                            >
                              Xem chi tiết
                            </button>
                          </div>
                          <div>
                            <p className="text-gray-600 text-sm font-bold uppercase mb-4">
                              Quyền lợi
                            </p>
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
                          </div>
                        </div>
                        <div
                          className={`flex flex-col w-full  duration-500 transition-all px-2 ${
                            selectItem === 1
                              ? "flex-1"
                              : " max-h-0 overflow-hidden"
                          }`}
                        >
                          <div className="mb-2">
                            <button
                              className="text-blue-500"
                              onClick={() => {
                                setSelectItem(-1);
                              }}
                            >
                              Quay lại
                            </button>
                          </div>

                          <p>
                            <span className="text-red-500">*</span>Được đề xuất
                            lên việc làm mới
                          </p>
                          <p>
                            <span className="text-red-500">*</span>30 lượt đăng
                            bài
                          </p>
                          <p>
                            <span className="text-red-500">*</span>Được toàn
                            quyền sử dụng chức năng của trang
                          </p>
                        </div>
                      </div>
                    </div>
                  </>
                );
              }
              if (dt.type === "V2") {
                return (
                  <>
                    <div className="min-h-fit h-auto w-64 rounded-lg bg-white border-[1px] shadow-2xl shadow-green-500/20 overflow-hidden">
                      <p className="text-xl font-bold px-4 py-4 bg-green-600 text-white">
                        {dt.name}
                      </p>

                      <div className="flex flex-col flex-1 duration-500 transition-all">
                        <div
                          className={`px-4 py-2 flex flex-col gap-4 duration-500 transition-all  ${
                            selectItem === 2 ? "max-h-0 overflow-hidden" : ""
                          }`}
                        >
                          <div>
                            <p className="text-xl font-bold text-blue-700">
                              {ChangeNumber(dt.valueNew, false, ",")}
                              <span className="text-sm font-extrabold">
                                VNĐ
                              </span>
                              {/* <span className="text-gray-400 font-semibold">
                                /20 tin
                              </span>{" "} */}
                            </p>
                            <p className="text-xs">
                              * Giá trên chưa bao gồm VAT
                            </p>
                          </div>

                          <div>
                            <button
                              className="w-full py-2 hover:bg-blue-700 hover:text-white rounded-lg border-[1px] border-blue-700 text-blue-700 font-semibold mb-1"
                              onClick={() => {
                                if (profile?.companyInfomation?.isActive) {
                                  const dataBuy =
                                    profile.point -
                                    listService?.find((pay: any) => {
                                      return pay.id === dt.id;
                                    })?.valueNew;
                                  if (dataBuy >= 0) {
                                    // setPackageBuy(dt.id);
                                    pushRouter(
                                      `/recruiter/product-catalog/payment/${dt.id}`
                                    );
                                  } else {
                                    setTabModal(true);
                                  }
                                } else {
                                  hdError("Vui lòng chờ xác thực");
                                }
                              }}
                            >
                              Mua gói
                            </button>
                            <button
                              className="w-full py-2 bg-blue-700 hover:bg-blue-600 rounded-lg border-[1px] border-blue-700 text-white font-semibold"
                              onClick={() => {
                                pushBlank(
                                  `/recruiter/product-catalog/${dt.id}`
                                );
                              }}
                            >
                              Xem chi tiết
                            </button>
                          </div>
                          <div>
                            <p className="text-gray-600 text-sm font-bold uppercase mb-4">
                              Quyền lợi
                            </p>
                            <div className="flex flex-col gap-1">
                              <div className="flex gap-2 items-center text-sm text-blue-500 font-medium">
                                <FaClipboardCheck />
                                <p>
                                  Đăng{" "}
                                  <span className="text-black font-bold">
                                    15
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
                          </div>
                        </div>
                        <div
                          className={`flex flex-col w-full  duration-500 transition-all px-2 ${
                            selectItem === 2
                              ? "flex-1"
                              : " max-h-0 overflow-hidden"
                          }`}
                        >
                          <div className="mb-2">
                            <button
                              className="text-blue-500"
                              onClick={() => {
                                setSelectItem(-1);
                              }}
                            >
                              Quay lại
                            </button>
                          </div>

                          <p>
                            <span className="text-red-500">*</span>Được đề xuất
                            lên đầu việc làm mới
                          </p>
                          <p>
                            <span className="text-red-500">*</span>20 lượt đăng
                            bài
                          </p>
                          <p>
                            <span className="text-red-500">*</span>Được toàn
                            quyền sử dụng chức năng tìm kiếm ứng viên
                          </p>
                        </div>
                      </div>
                    </div>
                  </>
                );
              }
              if (dt.type === "V1") {
                return (
                  <>
                    <div className="min-h-fit h-auto w-64 rounded-lg bg-white border-[1px] shadow-2xl shadow-blue-500/20 overflow-hidden">
                      <p className="text-xl font-bold px-4 py-4 bg-blue-500 text-white">
                        {dt.name}
                      </p>

                      <div className="flex flex-col flex-1 duration-500 transition-all">
                        <div
                          className={`px-4 py-2 flex flex-col gap-4 duration-500 transition-all  ${
                            selectItem === 3 ? "max-h-0 overflow-hidden" : ""
                          }`}
                        >
                          <div>
                            <p className="text-xl font-bold text-blue-700">
                              {ChangeNumber(dt.valueNew, false, ",")}
                              <span className="text-sm font-extrabold">
                                VNĐ
                              </span>
                              {/* <span className="text-gray-400 font-semibold">
                                /3 tin
                              </span>{" "} */}
                            </p>
                            <p className="text-xs">
                              * Giá trên chưa bao gồm VAT
                            </p>
                          </div>

                          <div>
                            <button
                              className="w-full py-2 hover:bg-blue-700 hover:text-white rounded-lg border-[1px] border-blue-700 text-blue-700 font-semibold mb-1"
                              onClick={() => {
                                if (profile?.companyInfomation?.isActive) {
                                  const dataBuy =
                                    profile.point -
                                    listService?.find((pay: any) => {
                                      return pay.id === dt.id;
                                    })?.valueNew;
                                  if (dataBuy >= 0) {
                                    // setPackageBuy(dt.id);
                                    pushRouter(
                                      `/recruiter/product-catalog/payment/${dt.id}`
                                    );
                                  } else {
                                    setTabModal(true);
                                  }
                                } else {
                                  hdError("Vui lòng chờ xác thực");
                                }
                              }}
                            >
                              Mua gói
                            </button>
                            <button
                              className="w-full py-2 bg-blue-700 hover:bg-blue-600 rounded-lg border-[1px] border-blue-700 text-white font-semibold"
                              onClick={() => {
                                pushBlank(
                                  `/recruiter/product-catalog/${dt.id}`
                                );
                              }}
                            >
                              Xem chi tiết
                            </button>
                          </div>
                          <div>
                            <p className="text-gray-600 text-sm font-bold uppercase mb-4">
                              Quyền lợi
                            </p>
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
                          </div>
                        </div>
                        <div
                          className={`flex flex-col w-full  duration-500 transition-all px-2 ${
                            selectItem === 3
                              ? "flex-1"
                              : " max-h-0 overflow-hidden"
                          }`}
                        >
                          <div className="mb-2">
                            <button
                              className="text-blue-500"
                              onClick={() => {
                                setSelectItem(-1);
                              }}
                            >
                              Quay lại
                            </button>
                          </div>

                          <p>
                            <span className="text-red-500">*</span>Được đề xuất
                            lên đầu việc làm mới
                          </p>
                          <p>
                            <span className="text-red-500">*</span>3 lượt đăng
                            bài
                          </p>
                          <p>
                            <span className="text-red-500">*</span>Được toàn
                            quyền sử dụng chức năng tìm kiếm ứng viên
                          </p>
                        </div>
                      </div>
                    </div>
                  </>
                );
              }
            })}
          </div>
        </div>
      </div>
      <Modal open={tabModal} className="flex justify-center items-center">
        <div className="w-96 h-fit rounded-md bg-white p-2 flex flex-col gap-4">
          <p className="font-semibold text-red-500">
            Hiện tại ,bạn không đủ tiền mua gói!
          </p>
          <div className="flex w-full gap-1 justify-end">
            <Button
              onClick={() => {
                setTabModal(false);
              }}
            >
              Hủy
            </Button>
            <Button
              onClick={() => {
                setSelectProfileRecruiter(6);
                setSelectItemProfileRecruiter(1);
                setTabModal(false);
              }}
            >
              Nạp tiền
            </Button>
          </div>
        </div>
      </Modal>
      <Modal
        open={packageBuy !== undefined ? true : false}
        className="flex justify-center items-center"
      >
        <div className="w-96 h-fit rounded-md bg-white p-2 flex flex-col">
          <p className="font-semibold text-blue-500">
            Số tiền bạn sau khi mua gói sẽ còn
            <span className="text-yellow-500 ml-1">{handlePoint()}</span>
          </p>

          <p className="font-bold text-red-500">Bạn có chắc chắn muốn mua ?</p>
          <div className="flex w-full gap-1 justify-end mt-4">
            <Button
              onClick={() => {
                setPackageBuy(undefined);
              }}
            >
              Hủy
            </Button>
            <Button
              onClick={() => {
                handleBuy();
              }}
            >
              Mua
            </Button>
          </div>
        </div>
      </Modal>
      <Modal
        onClose={() => {
          setTabPay(undefined);

          setSelectProfileRecruiter(7);
          setSelectItemProfileRecruiter(2);
          pushRouter("/recruiter/profile");
        }}
        open={tabPay !== undefined ? true : false}
        className="flex justify-center items-center"
      >
        <div className="w-fit h-fit rounded-md bg-white p-4 flex flex-col gap-4">
          {tabPay === 200 ? (
            <div className="flex justify-center items-center flex-col">
              <div className="p-16 w-fit rounded-full border-2 border-blue-600 mb-2">
                <MdDone className="text-6xl text-green-500" />
              </div>
              <p className="font-semibold text-3xl">Đã thanh toán thành công</p>
              {/* <p>Mã số nạp của bạn là <span></span></p> */}
            </div>
          ) : (
            <div className="flex justify-center items-center flex-col">
              <div className="p-16 w-fit rounded-full border-2 border-red-600 mb-2">
                <IoMdClose className="text-6xl text-red-500" />
              </div>
              <p className="font-semibold text-3xl">Gói đang còn hạn sử dụng</p>
            </div>
          )}
        </div>
      </Modal>
    </div>
  );
};

export default AllPackage;
