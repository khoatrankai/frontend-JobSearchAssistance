import React from "react";
import "./InfoPerson.scss";
import Image from "next/image";
import { FaFacebookF, FaPhone } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
type Props = {};

const InfoPerson = (props: Props) => {
  return (
    <div className="h-screen w-full bg-white flex flex-col px-12 justify-center gap-y-8">
      <div className=" flex flex-col">
        <p className="text-7xl font-extrabold text-blue-700 uppercase">
          Trần Tấn Khoa
        </p>
        <div className="flex gap-x-1 text-2xl font-semibold text-gray-600 uppercase">
          <p>24/11/2002</p>
          <span>-</span>
          <p className="text-blue-700">Nam</p>
          <span>-</span>
          <p>27/6 đường nguyễn văn quân</p>
        </div>
      </div>

      <p className="text-gray-400 text-lg font-medium">
        Giới thiệu bản thân là việc trình bày thông tin cơ bản về bản thân mình
        cho người khác để họ hiểu thêm về chúng ta, đến từ đâu và một số thông
        tin quan trọng về cuộc sống và sở thích của cá nhân. Mục đích chính của
        việc giới thiệu bản thân là tạo ra một sự kết nối ban đầu, thiết lập mối
        quan hệ hoặc bắt đầu một cuộc trò chuyện. Thông qua việc giới thiệu,
        người khác có cơ hội biết về bản thân mình, có thể tạo ra một cơ sở cho
        giao tiếp và tương tác tiếp theo.
      </p>
      <div className="flex gap-x-8 text-white text-2xl font-bold">
        <button className="w-12 h-12 flex justify-center items-center rounded-full bg-gray-600">
          <FaFacebookF />
        </button>
        <button className="w-12 h-12 flex justify-center items-center  rounded-full bg-gray-600">
          <FaPhone />
        </button>
        <button className="w-12 h-12 flex justify-center items-center  rounded-full bg-gray-600">
          <MdEmail />
        </button>
        <button className="w-12 h-12 flex justify-center items-center  rounded-full bg-gray-600">
          <g>in</g>
        </button>
      </div>
    </div>
  );
};

export default InfoPerson;
