"use client";
import React from "react";
import ShowModal from "../ShowModal/ShowModal";
import { Button } from "antd";
import useRouterCustom from "../useRouterCustom/useRouterCustom";
import { useSrollContext } from "@/context/AppProvider";

type Props = {};

const ShowModalIf = (props: Props) => {
  const { pushBlank, pushRouter } = useRouterCustom();
  const { tabAlertCatalog, setTabAlertCatalog } = useSrollContext();
  return (
    <>
      {tabAlertCatalog && (
        <ShowModal setTab={setTabAlertCatalog}>
          <div
            className="w-96 h-44 p-4 rounded-xl bg-white flex flex-col justify-between"
            onClick={(e: any) => {
              e.stopPropagation();
            }}
          >
            <div>
              <span className="text-xl text-red-600 font-medium">
                Thông báo!!!
              </span>
              <p className=" font-bold">
                Bạn phải mua gói khi sử dụng chức năng này
              </p>
            </div>

            <div className="flex gap-2 font-semibold justify-end">
              <Button
                className="font-semibold bg-red-500"
                onClick={() => {
                  setTabAlertCatalog(false);
                }}
              >
                Hủy
              </Button>
              <Button
                className="font-semibold bg-green-500"
                onClick={() => {
                  pushRouter("/recruiter/product-catalog");
                  setTabAlertCatalog(false);
                }}
              >
                Xem gói
              </Button>
            </div>
          </div>
        </ShowModal>
      )}
    </>
  );
};

export default ShowModalIf;
