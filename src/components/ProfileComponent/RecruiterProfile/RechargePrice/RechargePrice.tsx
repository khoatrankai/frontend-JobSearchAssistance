/* eslint-disable react-hooks/rules-of-hooks */
"use client";

import { SiZalo } from "react-icons/si";

import { useSrollContext } from "@/context/AppProvider";
import { RootState } from "@/redux";
import { Input, Select } from "antd";
import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";
import { FaPaypal } from "react-icons/fa";
import { MdOutlinePayment, MdPayment } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { RiMoneyDollarCircleFill } from "react-icons/ri";

type Props = {
  dataInfo?: any;
  handleUpdateApi?: any;
  checkUpdate?: boolean;
};
interface ILocation {
  code: number;
  data: any;
}

const RechargePrice = (props: Props) => {
  const ChangeNumber = (data: any, type = true, typeSpace = ".") => {
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
        numberArray.splice(vt, 0, typeSpace);
        vt = vt + 4;
      }
      numberArray.pop();
      return numberArray.join("");
    }
  };
  const [checkValue, setCheckValue] = useState<any>(-1);
  const [valueOther, setValueOther] = useState<any>(null);
  const dataPrice = [
    10000, 20000, 50000, 100000, 200000, 500000, 1000000, 2000000, 5000000,
    10000000,
  ];
  const profile = useSelector((state: any) => state.profileRecruiter.profile);
  const dataPay = ["THẺ ATM - IBAKING", "PAYPAL", "ZALO PAY", "MOBILE MONEY"];
  const [checkValuePay, setCheckValuePay] = useState<any>(-1);
  return (
    <div className="flex flex-col mt-5">
      <div
        className={`bg-white transition-all p-4 flex flex-col gap-y-8 rounded-xl relative`}
      >
        <div className="mb-4 flex justify-between flex-wrap">
          <div className="flex h-fit items-center ">
            <div className="h-10 w-3 bg-blue-500 mr-4"></div>
            <h1 className="font-bold text-xl capitalize">Giá trị nạp</h1>
          </div>
        </div>
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-2 text-blue-500 text-sm font-medium">
            {" "}
            <MdOutlinePayment className="text-base" />{" "}
            <span>Thanh toán bằng</span>
          </div>
          <div className="flex flex-wrap gap-4 w-fit justify-center">
            <button
              className={`w-44 h-28 relative shadow-2xl shadow-blue-500/20 rounded-md border-[1px] transition-all duration-500  group  flex items-end justify-center ${
                checkValuePay === 0
                  ? "border-blue-800"
                  : "hover:border-blue-800 border-gray-300"
              }`}
              onClick={() => {
                setCheckValuePay(0);
              }}
            >
              <div className="absolute inset-0 flex justify-center items-center">
                <MdPayment
                  className={`text-4xl   transition-all duration-500  ${
                    checkValuePay === 0
                      ? "text-blue-500"
                      : "group-hover:text-blue-500"
                  }`}
                />
              </div>
              <p className="font-bold text-blue-800">THẺ ATM - IBAKING</p>
            </button>
            <button
              className={`w-44 h-28 relative shadow-2xl shadow-blue-500/20 rounded-md border-[1px] transition-all duration-500 group  flex items-end justify-center ${
                checkValuePay === 1
                  ? "border-blue-800"
                  : "hover:border-blue-800 border-gray-300"
              }`}
              onClick={() => {
                setCheckValuePay(1);
              }}
            >
              <div className="absolute inset-0 flex justify-center items-center">
                <FaPaypal
                  className={`text-4xl   transition-all duration-500  ${
                    checkValuePay === 1
                      ? "text-blue-500"
                      : "group-hover:text-blue-500"
                  }`}
                />
              </div>
              <p className="font-bold text-blue-800">PAYPAL</p>
            </button>
            <button
              className={`w-44 h-28 relative shadow-2xl shadow-blue-500/20 rounded-md border-[1px] transition-all duration-500  group  flex items-end justify-center ${
                checkValuePay === 2
                  ? "border-blue-800"
                  : "hover:border-blue-800 border-gray-300"
              }`}
              onClick={() => {
                setCheckValuePay(2);
              }}
            >
              <div className="absolute inset-0 flex justify-center items-center">
                <SiZalo
                  className={`text-4xl   transition-all duration-500  ${
                    checkValuePay === 2
                      ? "text-blue-500"
                      : "group-hover:text-blue-500"
                  }`}
                />
              </div>
              <p className="font-bold text-blue-800">ZALO PAY</p>
            </button>
            <button
              className={`w-44 h-28 relative shadow-2xl shadow-blue-500/20 rounded-md border-[1px] transition-all duration-500  group  flex items-end justify-center ${
                checkValuePay === 3
                  ? "border-blue-800"
                  : "hover:border-blue-800 border-gray-300"
              }`}
              onClick={() => {
                setCheckValuePay(3);
              }}
            >
              <div className="absolute inset-0 flex justify-center items-center">
                <p
                  className={`text-2xl  font-extrabold transition-all duration-500 ${
                    checkValuePay === 3
                      ? "text-pink-600"
                      : "group-hover:text-pink-600"
                  }`}
                >
                  MOMO
                </p>
              </div>
              <p className="font-bold text-blue-800">MOBILE MONEY</p>
            </button>
          </div>
        </div>
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-2 text-blue-500 text-sm font-medium">
            {" "}
            <RiMoneyDollarCircleFill className="text-base" />{" "}
            <span>Giá trị nạp</span>
          </div>
          <div className="flex flex-wrap gap-4">
            <div className="flex flex-col gap-4 font-bold text-sm w-fit border-r-[1px] p-2 rounded-sm">
              <div className="flex px-2 w-fit">
                <div className="w-6"></div>
                <p className="w-40">Giá</p>
                <p className="w-44">POINT</p>
              </div>
              {dataPrice.map((dt: any, ikey: any) => {
                return (
                  <div
                    className={`flex text-sm font-medium items-center px-2 py-1 w-fit border-[1px] rounded-sm   cursor-pointer ${
                      checkValue === ikey
                        ? "border-blue-700"
                        : "hover:border-blue-400 border-transparent"
                    }`}
                    key={ikey}
                    onClick={() => {
                      setCheckValue(ikey);
                    }}
                  >
                    <div className="w-6 flex items-center">
                      <input checked={checkValue === ikey} type="radio" />
                    </div>
                    <p className="w-40">
                      {ChangeNumber(dt.toString(), false, ",")}
                      <span className="ml-1 text-xs text-black">VNĐ</span>
                    </p>
                    <p className="w-44">
                      {ChangeNumber(dt.toString(), false)}
                      <span className="ml-1 text-xs text-black">đ</span>
                    </p>
                  </div>
                );
              })}
              <div
                className={`flex text-sm font-medium items-center px-2 py-1 w-fit border-[1px] rounded-sm   cursor-pointer ${
                  checkValue === dataPrice.length
                    ? "border-blue-700"
                    : "hover:border-blue-400 border-transparent"
                }`}
                onClick={() => {
                  setCheckValue(dataPrice.length);
                }}
              >
                <div className="w-6 flex items-center">
                  <input
                    checked={checkValue === dataPrice.length}
                    type="radio"
                  />
                </div>
                <p className="w-40 relative flex flex-col">
                  Số khác(VNĐ)
                  <input
                    className={`w-40 outline-none duration-500 transition-all ${
                      checkValue === dataPrice.length ? "" : "h-0"
                    }`}
                    onChange={(e: any) => {
                      setValueOther(e.target.value);
                    }}
                    type="number"
                    placeholder="Nhập giá trị"
                  />
                </p>
                <p className="w-44">{valueOther}đ</p>
              </div>
            </div>
            {checkValue !== -1 && (
              <div className="flex flex-col w-96 p-4 gap-2">
                <p className="text-sm font-bold py-2 border-b-[1px]">
                  *Chi tiết giao dịch
                </p>
                <div className="flex flex-col text-sm font-medium gap-2">
                  <div className="flex justify-between w-full py-2 border-b-[1px]">
                    <p>Điểm được thêm</p>
                    <p>
                      {checkValue === dataPrice.length
                        ? ChangeNumber(valueOther, false)
                        : ChangeNumber(
                            dataPrice[checkValue].toString(),
                            false
                          )}{" "}
                    </p>
                  </div>
                  <div className="flex justify-between w-full py-2 border-b-[1px]">
                    <p>Giá</p>
                    <p>
                      {checkValue === dataPrice.length
                        ? ChangeNumber(valueOther, false, ",")
                        : ChangeNumber(
                            dataPrice[checkValue].toString(),
                            false,
                            ","
                          )}{" "}
                      <span className="ml-1 text-xs text-black">VNĐ</span>
                    </p>
                  </div>
                  <div className="flex justify-between w-full py-2 border-b-[1px]">
                    <p>Phương thức thanh toán</p>
                    <p>{checkValuePay !== -1 && dataPay[checkValuePay]}</p>
                  </div>
                  <div className="flex justify-between w-full py-2 border-b-[1px]">
                    <p>Tên khách hàng</p>
                    <p>{profile.name}</p>
                  </div>
                </div>
                <button className="p-2 rounded-lg bg-red-500 text-white font-semibold hover:bg-red-400">
                  Xử lý thanh toán
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default RechargePrice;
