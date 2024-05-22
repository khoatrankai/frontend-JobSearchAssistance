import React from "react";
import { FaHeadphones, FaRobot } from "react-icons/fa";
import { FaMessage } from "react-icons/fa6";
import { MdEmail } from "react-icons/md";

type Props = {};

const page = (props: Props) => {
  return (
    <div className="flex w-full justify-center flex-col items-center">
      <div className="w-full h-72 flex justify-center items-center bg-black">
        <p className="text-4xl font-bold text-white uppercase">
          Câu hỏi thường gặp & Cách liên hệ
        </p>
      </div>
      <div className="max-w-6xl w-full py-4 flex flex-col">
        <div className="border-b-[1px] py-8">
          <p className="font-semibold px-1 mb-4">Câu hỏi thường gặp</p>
          <div className="flex flex-col gap-2">
            <div className="text-sm font-medium cursor-pointer transition-all duration-500 hover:font-semibold">
              [Cập nhật hệ thống] Thông báo cập nhật Thông tin công ty
            </div>
            <div className="text-sm font-medium cursor-pointer transition-all duration-500 hover:font-semibold">
              Điều chỉnh điều kiện bán hàng đối với NTD email cá nhân sử dụng
              gói Top Credit
            </div>
            <div className="text-sm font-medium cursor-pointer transition-all duration-500 hover:font-semibold">
              [Cập nhật hệ thống] Quyền lợi của Huy hiệu Tia sét
            </div>
            <div className="text-sm font-medium cursor-pointer transition-all duration-500 hover:font-semibold">
              [Cập nhật hệ thống] Ra mắt Gói tin đăng cơ bản và Huy hiệu Tia sét
            </div>
          </div>
        </div>
        <div className="border-b-[1px] py-8">
          <p className="font-semibold px-1 mb-4">Liên hệ</p>
          <div className="flex flex-col gap-2">
            <div className="text-sm font-medium cursor-pointer transition-all duration-500 flex gap-2 items-center">
              <FaHeadphones className="text-blue-700" />
              <p>Hồ Chí Minh: (84 28) 3925 8456</p>
            </div>
            <div className="text-sm font-medium cursor-pointer transition-all duration-500 flex gap-2 items-center">
              <FaHeadphones className="text-blue-700" />
              <p>Hà Nội: (84 24) 3944 0568</p>
            </div>
            <div className="text-sm font-medium cursor-pointer transition-all duration-500 flex gap-2 items-center">
              <MdEmail className="text-blue-700" />
              <p>JobIT2024@gmail.com</p>
            </div>
            <div className="text-sm font-medium cursor-pointer transition-all duration-500 flex gap-2 items-center">
              <FaMessage className="text-blue-700" />
              <p className="underline text-blue-500">
                Nhấn để liên lạc nhân viên trực tuyến
              </p>
            </div>
            <div className="text-sm font-medium cursor-pointer transition-all duration-500 flex gap-2 items-center">
              <FaRobot className="text-blue-700" />
              <p className="underline text-blue-500">Nhấn để chatAI hỗ trợ</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default page;
