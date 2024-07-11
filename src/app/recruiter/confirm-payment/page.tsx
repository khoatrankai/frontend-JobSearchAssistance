/* eslint-disable react-hooks/rules-of-hooks */
"use client";
import apiPayment from "@/api/payment/apiPayment";
import { useSrollContext } from "@/context/AppProvider";
import useRouterCustom from "@/util/useRouterCustom/useRouterCustom";
import { Button } from "@mui/material";
import { useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { IoMdClose } from "react-icons/io";
import { MdDone } from "react-icons/md";

type Props = {};

const page = (props: Props) => {
  const paramUrl = useSearchParams();
  const Message = paramUrl.get("Message");

  const [infoStatus, setInfoStatus] = useState<any>();
  const { pushRouter } = useRouterCustom();
  const [statusPay, setStatusPay] = useState<boolean>();
  const { setSelectProfileRecruiter, setSelectItemProfileUser } =
    useSrollContext();
  useEffect(() => {
    const orderId = paramUrl.get("orderId");
    const fetchData = async () => {
      const res: any = await apiPayment.corfirmPay(orderId);
      if (res && res.statusCode === 200) {
        setInfoStatus(res.data);
        if (res.data.status === 1) {
          setStatusPay(true);
        } else {
          setStatusPay(false);
        }
      }
    };
    if (orderId) {
      fetchData();
    }
  }, []);
  return (
    <div className="h-screen flex justify-center items-center">
      {statusPay !== undefined && statusPay ? (
        <div className="flex justify-center items-center flex-col">
          <div className="p-16 w-fit rounded-full border-2 border-blue-600 mb-2">
            <MdDone className="text-6xl text-green-500" />
          </div>
          <div className="flex flex-col font-semibold gap-1  items-center my-2">
            <p className="font-semibold text-3xl">Đã nạp tiền thành công</p>
            <p>
              Mã nạp của bạn là{" "}
              <span className="font-bold text-blue-500">
                {infoStatus?.orderId}
              </span>
            </p>
            <p>
              Số tiền cộng vào tài khoản là{" "}
              <span className="font-bold text-yellow-500">
                {infoStatus?.amount}
              </span>
            </p>
          </div>

          <Button
            className="uppercase "
            onClick={() => {
              localStorage.setItem("selectProfileRecruiter", "6");
              localStorage.setItem("selectItemProfileUser", "2");
              pushRouter("/recruiter/profile");
            }}
          >
            Bấm để xem lịch sử
          </Button>
        </div>
      ) : (
        <div className="flex justify-center items-center flex-col">
          <div className="p-16  w-fit rounded-full border-2 border-red-600 mb-2">
            <IoMdClose className="text-6xl text-red-500" />
          </div>
          <div className="flex  flex-col font-semibold gap-1 items-center  my-2">
            <p className="font-semibold text-3xl">Nạp tiền thất bại</p>
            <p>
              Mã nạp của bạn là{" "}
              <span className="font-bold text-red-500">
                {infoStatus?.orderId}
              </span>
            </p>
            {Message && (
              <p>
                Lỗi của bạn là{" "}
                <span className="font-bold text-red-500">{Message}</span>
              </p>
            )}
          </div>

          <Button
            className="uppercase"
            onClick={() => {
              localStorage.setItem("selectProfileRecruiter", "6");
              localStorage.setItem("selectItemProfileUser", "2");
              pushRouter("/recruiter/profile");
            }}
          >
            Bấm để xem lịch sử
          </Button>
        </div>
      )}
    </div>
  );
};

export default page;
