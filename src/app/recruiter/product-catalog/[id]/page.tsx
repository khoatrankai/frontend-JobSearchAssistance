/* eslint-disable react-hooks/rules-of-hooks */
"use client";
import packageServiceApi from "@/api/packageService/packageService";
import Image from "next/image";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { Carousel } from "antd";
import "./style.scss";
import { useSrollContext } from "@/context/AppProvider";
type Props = {};

const page = (props: Props) => {
  const { id } = useParams();
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
        <button className="p-2 rounded-md bg-blue-700 text-white font-semibold w-fit hover:bg-blue-600">
          Mua ngay
        </button>
      </div>
    </div>
  );
};

export default page;
