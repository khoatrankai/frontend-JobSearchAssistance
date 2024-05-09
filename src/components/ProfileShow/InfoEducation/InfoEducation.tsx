import React from "react";
import "./InfoEducation.scss";
type Props = {};

const InfoEducation = (props: Props) => {
  return (
    <div className="pl-[400px] py-16 education">
      <div className="w-fit">
        <p className="text-lg font-bold text-blue-700">Trình độ học vấn</p>
        <div className="h-fit w-full flex justify-center">
          <div
            className="min-h-96 w-1 rounded-lg bg-blue-700 relative"
            style={{ height: `${300 * 4}px` }}
          >
            <div className="absolute inset-0 py-2 flex flex-col gap-y-2">
              <div className="flex gap-x-6 w-fit -translate-x-[6px]">
                <div className="w-4 h-4 rounded-full bg-blue-700"></div>
                <div className="py-2">
                  <div className="bg-blue-500 w-96 h-52  relative rounded-r-lg rounded-b-lg">
                    <div className="arrow-left"></div>
                    <div className="p-4 flex flex-col gap-y-1 text-sm text-white">
                      <p>
                        <span className="font-semibold">Tên trường: </span>
                        HCMUTE
                      </p>
                      <p>
                        <span className="font-semibold">Chuyên ngành: </span>
                        công nghệ thông tin
                      </p>
                      <p>
                        <span className="font-semibold">Thời gian: </span>
                        10/12/2024 - 19/01/2025
                      </p>
                      <p>
                        <span className="font-semibold">Bằng cấp: </span>Đại học
                      </p>
                      <p>
                        <span className="font-semibold">Mô tả: </span>Thuộc
                        trường số 1 võ văn ngân
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex gap-x-6 w-fit -translate-x-[414px]">
                <div className="py-2">
                  <div className="bg-blue-500 w-96 h-52  relative rounded-l-lg rounded-b-lg">
                    <div className="arrow-right"></div>
                    <div className="p-4 flex flex-col gap-y-1 text-sm text-white">
                      <p>
                        <span className="font-semibold">Tên trường: </span>
                        HCMUTE
                      </p>
                      <p>
                        <span className="font-semibold">Chuyên ngành: </span>
                        công nghệ thông tin
                      </p>
                      <p>
                        <span className="font-semibold">Thời gian: </span>
                        10/12/2024 - 19/01/2025
                      </p>
                      <p>
                        <span className="font-semibold">Bằng cấp: </span>Đại học
                      </p>
                      <p>
                        <span className="font-semibold">Mô tả: </span>Thuộc
                        trường số 1 võ văn ngân
                      </p>
                    </div>
                  </div>
                </div>
                <div className="w-4 h-4 rounded-full bg-blue-700"></div>
              </div>
              <div className="flex gap-x-6 w-fit -translate-x-[6px]">
                <div className="w-4 h-4 rounded-full bg-blue-700"></div>
                <div className="py-2">
                  <div className="bg-blue-500 w-96 h-52  relative rounded-r-lg rounded-b-lg">
                    <div className="arrow-left"></div>
                  </div>
                </div>
              </div>
              <div className="flex gap-x-6 w-fit -translate-x-[414px]">
                <div className="py-2">
                  <div className="bg-blue-500 w-96 h-52  relative rounded-l-lg rounded-b-lg">
                    <div className="arrow-right"></div>
                  </div>
                </div>
                <div className="w-4 h-4 rounded-full bg-blue-700"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InfoEducation;
