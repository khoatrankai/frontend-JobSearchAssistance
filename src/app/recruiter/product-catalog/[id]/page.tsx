/* eslint-disable react-hooks/rules-of-hooks */
"use client";
import packageServiceApi from "@/api/packageService/packageService";
import Image from "next/image";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { Button, Carousel } from "antd";
import "./style.scss";
import { useSrollContext } from "@/context/AppProvider";
import { MdDone } from "react-icons/md";
import { IoMdClose } from "react-icons/io";
import { Modal } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import useRouterCustom from "@/util/useRouterCustom/useRouterCustom";
import ShortText from "@/util/ShortText";
import { fetchProfileRecruiter } from "@/redux/reducer/profileReducer/profileSliceRecruiter";
type Props = {};

const page = (props: Props) => {
  const { id } = useParams();
  const dispatch = useDispatch();
  // const ChangeNumber = (data: any, type = true) => {
  //   if (!data) {
  //     return 0;
  //   }
  //   if (type) {
  //     const numberArray = data?.split("");
  //     if (numberArray.length <= 4) {
  //       return data;
  //     }
  //     const lengthChange = Math.round(numberArray.length / 3 - 1);
  //     let vt = numberArray.length - (lengthChange * 3 + 1);
  //     for (let i = 0; i < lengthChange; i++) {
  //       numberArray.splice(vt, 0, ".");
  //       vt = vt + 4;
  //     }
  //     return numberArray.join("");
  //   } else {
  //     const numberArray = data?.split("");
  //     if (numberArray.length <= 3) {
  //       return data;
  //     }
  //     numberArray.push("");
  //     const lengthChange = Math.round(numberArray.length / 3 - 1);
  //     let vt = numberArray.length - (lengthChange * 3 + 1);
  //     for (let i = 0; i < lengthChange; i++) {
  //       numberArray.splice(vt, 0, ",");
  //       vt = vt + 4;
  //     }
  //     numberArray.pop();
  //     return numberArray.join("");
  //   }
  // };
  const [dataPackage, setDataPackage] = useState<any>();
  const { setSoureImage } = useSrollContext();
  useEffect(() => {
    const fetchData = async () => {
      if (id) {
        const dataPack: any = await packageServiceApi.getIdPackage(id);
        //console.log(dataPack);

        if (dataPack && dataPack.status === 200) {
          //console.log(dataPack);
          setDataPackage(dataPack?.data);
        }
      }
    };
    fetchData();
  }, [id]);
  const { pushRouter } = useRouterCustom();
  const [tabModal, setTabModal] = useState<boolean>(false);
  const [tabPay, setTabPay] = useState<any>();
  const { ChangeNumber } = ShortText();
  const [packageBuy, setPackageBuy] = useState<any>();
  const { setSelectItemProfileRecruiter, setSelectProfileRecruiter } =
    useSrollContext();
  const profile = useSelector((state: any) => state.profileRecruiter.profile);
  const handlePoint = () => {
    return ChangeNumber(profile.point - dataPackage?.valueNew ?? 0, false, ",");
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
  return (
    <div className="flex justify-center min-h-[80vh] p-4">
      <div className="max-w-6xl w-full flex flex-col max-h-full gap-8">
        <div>
          <p className="text-3xl font-bold text-blue-700">
            {dataPackage?.name}
          </p>
          <p className="text-xl">
            <span className="font-semibold text-red-500">
              {ChangeNumber(dataPackage?.valueNew.toString(), false)}{" "}
              <span className="text-sm font-semibold">VNĐ</span>
            </span>
            <span className="line-through text-sm text-gray-400">
              {ChangeNumber(dataPackage?.valueOld.toString(), false)}
            </span>
          </p>
        </div>

        <div className="flex flex-wrap gap-4 ">
          <div className="overflow-y-scroll flex-1 min-w-[500px] max-h-96">
            <p>{dataPackage?.description}</p>
          </div>
          <div className="flex-1 overflow-hidden min-w-[500px] h-56">
            <Carousel autoplay className="w-full h-full">
              {dataPackage?.imageData?.map((dt: any, ikey: any) => {
                return (
                  <Image
                    onClick={() => {
                      setSoureImage(dt.image);
                    }}
                    key={ikey}
                    alt=""
                    src={dt.image}
                    className="w-full object-fill h-[40vh] cursor-pointer"
                    width={2000}
                    height={1000}
                  />
                );
              })}
            </Carousel>
          </div>
        </div>
        <button
          className="p-2 rounded-md bg-blue-700 text-white font-semibold w-fit hover:bg-blue-600"
          onClick={() => {
            const dataBuy = profile.point - dataPackage?.valueNew;
            if (dataBuy && dataBuy >= 0) {
              // setPackageBuy(id);
              pushRouter(`/recruiter/product-catalog/payment/${id}`);
            } else {
              setTabModal(true);
            }
          }}
        >
          Mua ngay
        </button>
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
                localStorage.setItem("selectProfileRecruiter", "6");
                localStorage.setItem("selectItemProfileUser", "1");
                pushRouter("/recruiter/profile");
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

export default page;
