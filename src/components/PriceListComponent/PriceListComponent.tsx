import React from "react";
import { FaClipboardCheck } from "react-icons/fa";

type Props = {};

const PriceListComponent = (props: Props) => {
  return (
    <div className="w-full flex justify-center">
      <div className="max-w-6xl w-full ">
        <div className="p-4 bg-slate-50 my-4 rounded-md">
          <div className="mb-6">
            <p className="text-2xl font-bold text-blue-800 capitalize">
              Gói đăng tuyển
            </p>
            <p className="text-sm font-semibold text-blue-800">
              Giúp tăng hiệu suất tìm ứng viên
            </p>
          </div>
          <div className="flex gap-6 flex-wrap justify-center">
            <div className="min-h-96 h-fit w-64 rounded-lg bg-white shadow-2xl shadow-red-500/20 overflow-hidden">
              <p className="text-xl font-bold px-4 py-4 bg-red-600 text-white">
                VIP PRO MAX
              </p>
              <div className="px-4 py-2 flex flex-col gap-4">
                <div>
                  <p className="text-xl font-bold text-blue-700">
                    5,400,000{" "}
                    <span className="text-sm font-extrabold">VNĐ</span>
                    <span className="text-gray-400 font-semibold">
                      /Hot
                    </span>{" "}
                  </p>
                  <p className="text-xs">* Giá trên chưa bao gồm VAT</p>
                </div>

                <button className="w-full py-2 hover:bg-blue-700 hover:text-white rounded-lg border-[1px] border-blue-700 text-blue-700 font-semibold">
                  Mua gói
                </button>
                <div>
                  <p className="text-gray-600 text-sm font-bold uppercase mb-4">
                    Quyền lợi
                  </p>
                  <div className="flex flex-col gap-1">
                    <div className="flex gap-2 items-center text-sm text-blue-500 font-medium">
                      <FaClipboardCheck />
                      <p>
                        Đăng{" "}
                        <span className="text-black font-bold">
                          không giới hạn
                        </span>{" "}
                        tin mỗi ngày
                      </p>
                    </div>
                    <div className="flex gap-2 items-center text-sm text-blue-500 font-medium">
                      <FaClipboardCheck />
                      <p>Đẩy top 7 lần trong ngày</p>
                    </div>
                    <div className="flex gap-2 items-center text-sm text-blue-500 font-medium">
                      <FaClipboardCheck />
                      <p>Được AI đề xuất CV</p>
                    </div>
                    <div className="flex gap-2 items-center text-sm text-blue-500 font-medium">
                      <FaClipboardCheck />
                      <p>Được đăng info công ty ở banner</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="min-h-96 h-fit w-64 rounded-lg bg-white shadow-2xl shadow-yellow-500/20 overflow-hidden">
              <p className="text-xl font-bold px-4 py-4 bg-yellow-500 text-white">
                VIP PRO
              </p>
              <div className="px-4 py-2 flex flex-col gap-4">
                <div>
                  <p className="text-xl font-bold text-blue-700">
                    4,200,000{" "}
                    <span className="text-sm font-extrabold">VNĐ</span>
                    <span className="text-gray-400 font-semibold">
                      /30 tin
                    </span>{" "}
                  </p>
                  <p className="text-xs">* Giá trên chưa bao gồm VAT</p>
                </div>

                <button className="w-full py-2 hover:bg-blue-700 hover:text-white rounded-lg border-[1px] border-blue-700 text-blue-700 font-semibold">
                  Mua gói
                </button>
                <div>
                  <p className="text-gray-600 text-sm font-bold uppercase mb-4">
                    Quyền lợi
                  </p>
                  <div className="flex flex-col gap-1">
                    <div className="flex gap-2 items-center text-sm text-blue-500 font-medium">
                      <FaClipboardCheck />
                      <p>
                        Đăng <span className="text-black font-bold">30</span>{" "}
                        tin mỗi ngày
                      </p>
                    </div>
                    <div className="flex gap-2 items-center text-sm text-blue-500 font-medium">
                      <FaClipboardCheck />
                      <p>Đẩy top 3 lần trong ngày</p>
                    </div>
                    <div className="flex gap-2 items-center text-sm text-blue-500 font-medium">
                      <FaClipboardCheck />
                      <p>Được AI đề xuất CV</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="min-h-96 h-fit w-64 rounded-lg bg-white border-[1px] shadow-2xl shadow-green-500/20 overflow-hidden">
              <p className="text-xl font-bold px-4 py-4 bg-green-600 text-white">
                PRO
              </p>
              <div className="px-4 py-2 flex flex-col gap-4">
                <div>
                  <p className="text-xl font-bold text-blue-700">
                    2,100,000{" "}
                    <span className="text-sm font-extrabold">VNĐ</span>
                    <span className="text-gray-400 font-semibold">
                      /20 tin
                    </span>{" "}
                  </p>
                  <p className="text-xs">* Giá trên chưa bao gồm VAT</p>
                </div>

                <button className="w-full py-2 hover:bg-blue-700 hover:text-white rounded-lg border-[1px] border-blue-700 text-blue-700 font-semibold">
                  Mua gói
                </button>
                <div>
                  <p className="text-gray-600 text-sm font-bold uppercase mb-4">
                    Quyền lợi
                  </p>
                  <div className="flex flex-col gap-1">
                    <div className="flex gap-2 items-center text-sm text-blue-500 font-medium">
                      <FaClipboardCheck />
                      <p>
                        Đăng <span className="text-black font-bold">20</span>{" "}
                        tin mỗi ngày
                      </p>
                    </div>
                    <div className="flex gap-2 items-center text-sm text-blue-500 font-medium">
                      <FaClipboardCheck />
                      <p>Đẩy top 1 lần trong ngày</p>
                    </div>
                    <div className="flex gap-2 items-center text-sm text-blue-500 font-medium">
                      <FaClipboardCheck />
                      <p>Được AI đề xuất CV</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="min-h-96 h-fit w-64 rounded-lg bg-white border-[1px] shadow-2xl shadow-blue-500/20 overflow-hidden">
              <p className="text-xl font-bold px-4 py-4 bg-blue-500 text-white">
                PLUS
              </p>
              <div className="px-4 py-2 flex flex-col gap-4">
                <div>
                  <p className="text-xl font-bold text-blue-700">
                    1,200,000{" "}
                    <span className="text-sm font-extrabold">VNĐ</span>
                    <span className="text-gray-400 font-semibold">
                      /3 tin
                    </span>{" "}
                  </p>
                  <p className="text-xs">* Giá trên chưa bao gồm VAT</p>
                </div>

                <button className="w-full py-2 hover:bg-blue-700 hover:text-white rounded-lg border-[1px] border-blue-700 text-blue-700 font-semibold">
                  Mua gói
                </button>
                <div>
                  <p className="text-gray-600 text-sm font-bold uppercase mb-4">
                    Quyền lợi
                  </p>
                  <div className="flex flex-col gap-1">
                    <div className="flex gap-2 items-center text-sm text-blue-500 font-medium">
                      <FaClipboardCheck />
                      <p>
                        Đăng <span className="text-black font-bold">3</span> tin
                        mỗi ngày
                      </p>
                    </div>
                    <div className="flex gap-2 items-center text-sm text-blue-500 font-medium">
                      <FaClipboardCheck />
                      <p>Đẩy top 1 lần trong ngày</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PriceListComponent;
