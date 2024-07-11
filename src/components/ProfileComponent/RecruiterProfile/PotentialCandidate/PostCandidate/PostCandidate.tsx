import { Select } from "antd";
import Image from "next/image";
import React from "react";
import { FaHeart, FaStar } from "react-icons/fa";

type Props = {};

const PostCandidate = (props: Props) => {
  const { Option } = Select;
  return (
    <div className="flex flex-col gap-y-4">
      <p className="text-2xl font-bold">Gợi ý ứng viên</p>

      <div className="flex gap-x-2 items-center px-2">
        <p>ID bài đăng</p>
        <Select className="w-36">
          <Option>(1) Việc chạy bàn</Option>
          <Option>(2) Việc2 chạy bàn</Option>
          <Option>(3) Việc3 chạy bàn</Option>
          <Option>(3) Việc3 chạy bàn</Option>
          <Option>(3) Việc3 chạy bàn</Option>
          <Option>(3) Việc3 chạy bàn</Option>
        </Select>
      </div>
      <div className="flex justify-between">
        <div className="flex text-xs font-semibold">
          <button>
            Ứng viên tiềm năng<span>(10)</span>
          </button>
        </div>
        <div className="flex gap-x-1 items-center">
          <label>Tìm kiếm:</label>
          <input
            placeholder="Từ khóa"
            className="outline-none bg-gray-50 rounded-sm px-1 py-[2px] font-semibold w-56"
            type="text"
          />
        </div>
      </div>
      <div className="flex flex-col gap-y-4 h-[300px] overflow-y-scroll">
        <div className="flex bg-gray-50 rounded-sm p-4 justify-between items-end relative">
          <div className="flex gap-x-8">
            <Image
              src={"/goapply.png"}
              alt=""
              width={200}
              height={400}
              className="w-28 h-32 rounded-md"
            />
            <div className="flex flex-col justify-around font-semibold text-black text-lg">
              <p className="font-bold">Trần Tấn Khoa</p>
              <p className="text-sm font-bold  text-gray-500">
                Giới tính : <span className="text-gray-600">Nam</span>{" "}
              </p>
              <p className="text-sm font-bold  text-gray-500">
                Email :{" "}
                <span className="text-gray-600">khoanono@gmail.com</span>{" "}
              </p>
              <p className="text-sm font-bold text-gray-500">
                Mô tả :{" "}
                <span className="text-gray-600">
                  Là một người nhiệt huyết ...
                </span>
              </p>
              <p className="text-sm font-bold text-gray-500">
                Đặc điểm phù hợp :{" "}
                <span className="text-blue-600">REACT,JS,công nghệ ...</span>
              </p>
            </div>
          </div>

          <div className="flex gap-x-4 items-center">
            <button className="text-sm font-bold text-blue-500 hover:underline">
              Xem chi tiết
            </button>
            <button className="p-2 rounded-md bg-blue-500 hover:bg-blue-400 text-sm font-bold text-white flex items-center gap-x-1">
              <FaHeart className="text-white" />
              Lưu ứng viên
            </button>
          </div>
          <div className="absolute top-2 right-2 p-1 rounded-md  text-blue-800 text-sm flex gap-x-1 items-center font-bold">
            <FaStar />
            <p>
              Phù hợp ID <span className="text-blue-700 ">853</span>
            </p>
          </div>
        </div>
        <div className="flex bg-gray-50 rounded-sm p-4 justify-between items-end relative">
          <div className="flex gap-x-8">
            <Image
              src={"/goapply.png"}
              alt=""
              width={200}
              height={400}
              className="w-28 h-32 rounded-md"
            />
            <div className="flex flex-col justify-around font-semibold text-black text-lg">
              <p className="font-bold">Trần Tấn Khoa</p>
              <p className="text-sm font-bold  text-gray-500">
                Giới tính : <span className="text-gray-600">Nam</span>{" "}
              </p>
              <p className="text-sm font-bold  text-gray-500">
                Email :{" "}
                <span className="text-gray-600">khoanono@gmail.com</span>{" "}
              </p>
              <p className="text-sm font-bold text-gray-500">
                Mô tả :{" "}
                <span className="text-gray-600">
                  Là một người nhiệt huyết ...
                </span>
              </p>
              <p className="text-sm font-bold text-gray-500">
                Đặc điểm phù hợp :{" "}
                <span className="text-blue-600">REACT,JS,công nghệ ...</span>
              </p>
            </div>
          </div>

          <div className="flex gap-x-4 items-center">
            <button className="text-sm font-bold text-blue-500 hover:underline">
              Xem chi tiết
            </button>
            <button className="p-2 rounded-md bg-blue-500 hover:bg-blue-400 text-sm font-bold text-white flex items-center gap-x-1">
              <FaHeart className="text-white" />
              Lưu ứng viên
            </button>
          </div>
          <div className="absolute top-2 right-2 p-1 rounded-md  text-blue-800 text-sm flex gap-x-1 items-center font-bold">
            <FaStar />
            <p>
              Phù hợp ID <span className="text-blue-700 ">853</span>
            </p>
          </div>
        </div>
        <div className="flex bg-gray-50 rounded-sm p-4 justify-between items-end relative">
          <div className="flex gap-x-8">
            <Image
              src={"/goapply.png"}
              alt=""
              width={200}
              height={400}
              className="w-28 h-32 rounded-md"
            />
            <div className="flex flex-col justify-around font-semibold text-black text-lg">
              <p className="font-bold">Trần Tấn Khoa</p>
              <p className="text-sm font-bold  text-gray-500">
                Giới tính : <span className="text-gray-600">Nam</span>{" "}
              </p>
              <p className="text-sm font-bold  text-gray-500">
                Email :{" "}
                <span className="text-gray-600">khoanono@gmail.com</span>{" "}
              </p>
              <p className="text-sm font-bold text-gray-500">
                Mô tả :{" "}
                <span className="text-gray-600">
                  Là một người nhiệt huyết ...
                </span>
              </p>
              <p className="text-sm font-bold text-gray-500">
                Đặc điểm phù hợp :{" "}
                <span className="text-blue-600">REACT,JS,công nghệ ...</span>
              </p>
            </div>
          </div>

          <div className="flex gap-x-4 items-center">
            <button className="text-sm font-bold text-blue-500 hover:underline">
              Xem chi tiết
            </button>
            <button className="p-2 rounded-md bg-blue-500 hover:bg-blue-400 text-sm font-bold text-white flex items-center gap-x-1">
              <FaHeart className="text-white" />
              Lưu ứng viên
            </button>
          </div>
          <div className="absolute top-2 right-2 p-1 rounded-md  text-blue-800 text-sm flex gap-x-1 items-center font-bold">
            <FaStar />
            <p>
              Phù hợp ID <span className="text-blue-700 ">853</span>
            </p>
          </div>
        </div>
        <div className="flex bg-gray-50 rounded-sm p-4 justify-between items-end relative">
          <div className="flex gap-x-8">
            <Image
              src={"/goapply.png"}
              alt=""
              width={200}
              height={400}
              className="w-28 h-32 rounded-md"
            />
            <div className="flex flex-col justify-around font-semibold text-black text-lg">
              <p className="font-bold">Trần Tấn Khoa</p>
              <p className="text-sm font-bold  text-gray-500">
                Giới tính : <span className="text-gray-600">Nam</span>{" "}
              </p>
              <p className="text-sm font-bold  text-gray-500">
                Email :{" "}
                <span className="text-gray-600">khoanono@gmail.com</span>{" "}
              </p>
              <p className="text-sm font-bold text-gray-500">
                Mô tả :{" "}
                <span className="text-gray-600">
                  Là một người nhiệt huyết ...
                </span>
              </p>
              <p className="text-sm font-bold text-gray-500">
                Đặc điểm phù hợp :{" "}
                <span className="text-blue-600">REACT,JS,công nghệ ...</span>
              </p>
            </div>
          </div>

          <div className="flex gap-x-4 items-center">
            <button className="text-sm font-bold text-blue-500 hover:underline">
              Xem chi tiết
            </button>
            <button className="p-2 rounded-md bg-blue-500 hover:bg-blue-400 text-sm font-bold text-white flex items-center gap-x-1">
              <FaHeart className="text-white" />
              Lưu ứng viên
            </button>
          </div>
          <div className="absolute top-2 right-2 p-1 rounded-md  text-blue-800 text-sm flex gap-x-1 items-center font-bold">
            <FaStar />
            <p>
              Phù hợp ID <span className="text-blue-700 ">853</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostCandidate;
