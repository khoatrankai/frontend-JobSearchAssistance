import Image from "next/image";
import React from "react";
import ReactPlayer from "react-player";

type Props = {};

const BannerReceiveEmail = (props: Props) => {
  return (
    <div className="w-full h-96 flex justify-center items-center bg-black/80">
      <div className="max-w-6xl flex flex-col items-center gap-y-6">
        <p className="text-3xl font-bold text-white">
          Để lại email của bạn để chúng tôi có thể gửi bạn những offer công việc
          hấp dẫn
        </p>
        <div className="bg-white/80 p-2 w-fit pl-4 flex gap-x-4 h-14 rounded-lg">
          <input
            className=" bg-transparent w-96 outline-none"
            placeholder="Nhập địa chỉ email của bạn"
          />
          <button className="uppercase p-2 rounded-lg font-semibold bg-blue-500/80 text-sm hover:text-white">
            Đăng ký ngay
          </button>
        </div>
      </div>
    </div>
  );
};

export default BannerReceiveEmail;
