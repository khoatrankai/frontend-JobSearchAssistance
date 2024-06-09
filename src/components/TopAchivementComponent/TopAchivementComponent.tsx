import React, { memo, useEffect, useState } from "react";
import "./TopAchivementComponent.scss";
import Image from "next/image";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useSrollContext } from "@/context/AppProvider";
type Props = {};
const MyComponent = memo(({ dt, index }: any) => {
  return (
    <div
      className={`bubble cursor-pointer p-4 border-[1px] hover:shadow-sm border-transparent hover:bg-blue-200 x${
        Math.floor(Math.random() * (10 - 1 + 1)) + 1
      } group`}
      style={{
        left: `${Math.floor(Math.random() * (80 - 55 + 10)) + 55}%`,
        top: `${Math.floor(Math.random() * (85 - 5 + 4)) + 5}%`,
        scale: `${Math.random() * (0.6 - 0.4) + 0.4}`,
      }}
      key={index + "vo"}
    >
      <div className="rounded-full absolute inset-0 flex justify-center items-center">
        <Image
          className="scale-50 group-hover:scale-75 transition-all duration-500"
          width={500}
          height={500}
          alt=""
          src={`/company/logo${dt.name}.png`}
        />
      </div>
    </div>
  );
});

MyComponent.displayName = "BannerAnimation";
const TopAchivementComponent = (props: Props) => {
  const router = useRouter();
  const { reponsiveMobile } = useSrollContext();

  const [dataCompany, setDataCompany] = useState<any>([
    { name: "acer", link: "https://www.acer.com/" },
    { name: "apple", link: "https://www.acer.com/" },
    { name: "asus", link: "https://www.acer.com/" },
    { name: "dell", link: "https://www.acer.com/" },
    { name: "hp", link: "https://www.acer.com/" },
    { name: "lenovo", link: "https://www.acer.com/" },
    { name: "microsoft", link: "https://www.acer.com/" },
    { name: "razer", link: "https://www.acer.com/" },
    { name: "rog", link: "https://www.acer.com/" },
    { name: "disney", link: "https://www.acer.com/" },
    { name: "hcmute", link: "https://www.acer.com/" },
    { name: "just", link: "https://www.acer.com/" },
    { name: "nike", link: "https://www.acer.com/" },
    { name: "nissan", link: "https://www.acer.com/" },
    { name: "tesla", link: "https://www.acer.com/" },
  ]);

  return (
    <div className="gradient-bg-mid w-full relative flex flex-col items-center py-8 h-[440px] px-5">
      {/* <p className="font-extrabold text-3xl drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)]">
        TOP CÔNG TY NỔI BẬT
      </p> */}
      <div className="max-w-6xl w-full h-full flex flex-col justify-center items-start gap-y-4 relative ">
        <p
          className={`capitalize font-bold  text-black/75 w-2/3 relative z-10 ${
            reponsiveMobile < 800 ? "text-2xl" : "text-4xl"
          }`}
        >
          Những Nhà Tuyển dụng nổi bật nhất tháng cùng{" "}
          <span className="text-blue-700">JOB IT</span>
        </p>
        <p
          className={`font-medium  text-black/50 w-2/3 relative z-10  ${
            reponsiveMobile < 800 ? "text-sm" : "text-lg"
          }`}
        >
          Hãy để chúng tôi tạo nên những điểm nổi bật ở bạn để nhà tuyển dụng
          thấy và
          <br /> <span className="font-bold text-black/80">"Tôi chọn bạn"</span>
        </p>
        <button
          className="p-4 rounded-xl font-semibold bg-blue-700 relative hover:bg-blue-600 transition-all duration-500 text-white z-10"
          onClick={() => {
            router.push("/cv-all");
          }}
        >
          Tạo CV ngay
        </button>
      </div>
      <div className="absolute inset-0 overflow-hidden">
        {dataCompany.map((dt: any, index: any) => {
          return <MyComponent key={index} dt={dt} index={index} />;
        })}
      </div>
    </div>
  );
};

export default TopAchivementComponent;
