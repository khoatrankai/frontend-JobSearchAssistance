import ShowModal from "@/util/ShowModal/ShowModal";
import React, { useState } from "react";

type Props = {};

const RecruitmentRejectList = (props: Props) => {
  const [textReason, setTextReason] = useState<any>(
    "Bạn chưa đủ kiến thức để nhận"
  );
  const [tabReason, setTabReason] = useState<any>(false);
  return (
    <div className="flex flex-col gap-y-4">
      <p className="text-2xl font-bold">Ứng viên bị từ chối</p>
      <div className="flex justify-between">
        <div className="flex text-xs font-semibold">
          <button className=" px-2">
            Tất cả<span>(10)</span>
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
      <div className="flex flex-col gap-y-4 py-2 px-4 rounded-md bg-gray-50">
        <div className="flex gap-x-2">
          <p className="basis-1/6">Tên người dùng</p>
          <p className="basis-1/6">Tên ứng viên</p>
          <p className="basis-1/6">Email</p>
          <p className="basis-1/6">Số điện thoại</p>
          <p className="basis-1/12">ID Bài viết</p>
          <p className="basis-1/6">Chức năng</p>
        </div>
        <div className="flex flex-col gap-y-2 max-h-[315px] overflow-y-scroll">
          <div className="flex gap-x-2 text-sm font-semibold cursor-pointer  items-center">
            <p className="basis-1/6">Khoa000</p>
            <p className="basis-1/6">Trần Tấn Khoa</p>
            <p className="basis-1/6">khoanono963@gmail.com</p>
            <p className="basis-1/6">0357658878</p>
            <p className="basis-1/12">85421</p>
            <div className="basis-1/6 text-xs font-bold flex">
              <button className="p-2 rounded-md text-blue-500 hover:underline">
                Xem chi tiết
              </button>
              <button
                className="p-2 rounded-md text-red-500 hover:underline"
                onClick={() => {
                  setTabReason(true);
                }}
              >
                Lý do
              </button>
            </div>
          </div>
          <div className="flex gap-x-2 text-sm font-semibold cursor-pointer  items-center">
            <p className="basis-1/6">Khoa000</p>
            <p className="basis-1/6">Trần Tấn Khoa</p>
            <p className="basis-1/6">khoanono963@gmail.com</p>
            <p className="basis-1/6">0357658878</p>
            <p className="basis-1/12">85421</p>
            <div className="basis-1/6 text-xs font-bold">
              <button className="p-2 rounded-md text-blue-500 hover:underline">
                Xem chi tiết
              </button>
            </div>
          </div>
          <div className="flex gap-x-2 text-sm font-semibold cursor-pointer  items-center">
            <p className="basis-1/6">Khoa000</p>
            <p className="basis-1/6">Trần Tấn Khoa</p>
            <p className="basis-1/6">khoanono963@gmail.com</p>
            <p className="basis-1/6">0357658878</p>
            <p className="basis-1/12">85421</p>
            <div className="basis-1/6 text-xs font-bold">
              <button className="p-2 rounded-md text-blue-500 hover:underline">
                Xem chi tiết
              </button>
            </div>
          </div>
          <div className="flex gap-x-2 text-sm font-semibold cursor-pointer  items-center">
            <p className="basis-1/6">Khoa000</p>
            <p className="basis-1/6">Trần Tấn Khoa</p>
            <p className="basis-1/6">khoanono963@gmail.com</p>
            <p className="basis-1/6">0357658878</p>
            <p className="basis-1/12">85421</p>
            <div className="basis-1/6 text-xs font-bold">
              <button className="p-2 rounded-md text-blue-500 hover:underline">
                Xem chi tiết
              </button>
            </div>
          </div>
          <div className="flex gap-x-2 text-sm font-semibold cursor-pointer  items-center">
            <p className="basis-1/6">Khoa000</p>
            <p className="basis-1/6">Trần Tấn Khoa</p>
            <p className="basis-1/6">khoanono963@gmail.com</p>
            <p className="basis-1/6">0357658878</p>
            <p className="basis-1/12">85421</p>
            <div className="basis-1/6 text-xs font-bold">
              <button className="p-2 rounded-md text-blue-500 hover:underline">
                Xem chi tiết
              </button>
            </div>
          </div>
          <div className="flex gap-x-2 text-sm font-semibold cursor-pointer  items-center">
            <p className="basis-1/6">Khoa000</p>
            <p className="basis-1/6">Trần Tấn Khoa</p>
            <p className="basis-1/6">khoanono963@gmail.com</p>
            <p className="basis-1/6">0357658878</p>
            <p className="basis-1/12">85421</p>
            <div className="basis-1/6 text-xs font-bold">
              <button className="p-2 rounded-md text-blue-500 hover:underline">
                Xem chi tiết
              </button>
            </div>
          </div>
          <div className="flex gap-x-2 text-sm font-semibold cursor-pointer  items-center">
            <p className="basis-1/6">Khoa000</p>
            <p className="basis-1/6">Trần Tấn Khoa</p>
            <p className="basis-1/6">khoanono963@gmail.com</p>
            <p className="basis-1/6">0357658878</p>
            <p className="basis-1/12">85421</p>
            <div className="basis-1/6 text-xs font-bold">
              <button className="p-2 rounded-md text-blue-500 hover:underline">
                Xem chi tiết
              </button>
            </div>
          </div>
          <div className="flex gap-x-2 text-sm font-semibold cursor-pointer  items-center">
            <p className="basis-1/6">Khoa000</p>
            <p className="basis-1/6">Trần Tấn Khoa</p>
            <p className="basis-1/6">khoanono963@gmail.com</p>
            <p className="basis-1/6">0357658878</p>
            <p className="basis-1/12">85421</p>
            <div className="basis-1/6 text-xs font-bold">
              <button className="p-2 rounded-md text-blue-500 hover:underline">
                Xem chi tiết
              </button>
            </div>
          </div>
          <div className="flex gap-x-2 text-sm font-semibold cursor-pointer  items-center">
            <p className="basis-1/6">Khoa000</p>
            <p className="basis-1/6">Trần Tấn Khoa</p>
            <p className="basis-1/6">khoanono963@gmail.com</p>
            <p className="basis-1/6">0357658878</p>
            <p className="basis-1/12">85421</p>
            <div className="basis-1/6 text-xs font-bold">
              <button className="p-2 rounded-md text-blue-500 hover:underline">
                Xem chi tiết
              </button>
            </div>
          </div>
          <div className="flex gap-x-2 text-sm font-semibold cursor-pointer  items-center">
            <p className="basis-1/6">Khoa000</p>
            <p className="basis-1/6">Trần Tấn Khoa</p>
            <p className="basis-1/6">khoanono963@gmail.com</p>
            <p className="basis-1/6">0357658878</p>
            <p className="basis-1/12">85421</p>
            <div className="basis-1/6 text-xs font-bold">
              <button className="p-2 rounded-md text-blue-500 hover:underline">
                Xem chi tiết
              </button>
            </div>
          </div>
        </div>
      </div>
      {tabReason && (
        <ShowModal>
          <div
            className="w-full h-full flex justify-center items-center bg-black/40"
            onClick={() => {
              setTabReason(false);
            }}
          >
            <div
              className="p-4 rounded-lg bg-white w-96 h-60"
              onClick={(e: any) => {
                e.stopPropagation();
              }}
            >
              <p className="font-semibold mb-2">Lý do từ chối</p>
              <p className="bg-gray-100 p-2 text-sm font-bold">{textReason}</p>
            </div>
          </div>
        </ShowModal>
      )}
    </div>
  );
};

export default RecruitmentRejectList;
