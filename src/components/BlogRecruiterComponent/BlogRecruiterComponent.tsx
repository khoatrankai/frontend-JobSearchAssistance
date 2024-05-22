import { useSrollContext } from "@/context/AppProvider";
import ShortText from "@/util/ShortText";
import Image from "next/image";
import React from "react";

type Props = {};

const BlogRecruiterComponent = (props: Props) => {
  const { reponsiveMobile } = useSrollContext();
  const { handleShortTextHome } = ShortText();

  return (
    <div className="flex justify-center bg-gray-100 py-10 px-5">
      <div className="max-w-6xl w-full overflow-hidden justify-center flex flex-col">
        <div className="w-full flex items-center justify-center mb-8">
          <p
            className={`font-bold  ${
              reponsiveMobile < 800 ? "text-2xl" : "text-4xl"
            }`}
          >
            Các Blog tuyển dụng
          </p>
          {/* <button className="text-blue-500 hover:text-blue-600 underline">
            Xem thêm
          </button> */}
        </div>

        <div className="flex gap-6 flex-wrap justify-center">
          <div className="rounded-xl max-w-[276px] min-w-[276px] h-fit border-[1px] overflow-hidden bg-white group hover:border-blue-500">
            <div className=" cursor-pointer">
              <Image
                className="w-full h-40"
                src={"/logo/iphone15.png"}
                alt=""
                width={1000}
                height={1000}
              />
            </div>
            <div className="px-4 pt-4 pb-3 flex flex-col gap-y-4">
              <p className="text-xl font-bold group-hover:text-blue-500 cursor-pointer">
                {handleShortTextHome(
                  " 5 điểm sáng trong phỏng vấn: Bí quyết giúp Gen Z chiếm ưu thế với nhà tuyển dụng",
                  65
                )}
              </p>
              <p className="text-sm">
                {handleShortTextHome(
                  ' Để chiếm ưu thế hơn hàng ngàn ứng viên ngoài kia, nhất là so với những ứng viên giàu kinh nghiệm, Gen Z quả thật cần biết tạo "điểm sáng” trong buổi phỏng vấn',
                  130
                )}
              </p>

              <button className="border-[1px] p-2 rounded-lg font-medium border-blue-500 text-blue-500 hover:bg-blue-500 hover:text-white">
                Đọc thêm
              </button>
            </div>
          </div>
          <div className="rounded-xl max-w-[276px] min-w-[276px] h-fit border-[1px] overflow-hidden bg-white group hover:border-blue-500">
            <div className=" cursor-pointer">
              <Image
                className="w-full h-40"
                src={"/logo/iphone15.png"}
                alt=""
                width={1000}
                height={1000}
              />
            </div>
            <div className="px-4 pt-4 pb-3 flex flex-col gap-y-4">
              <p className="text-xl font-bold group-hover:text-blue-500 cursor-pointer">
                {handleShortTextHome(
                  " 5 điểm sáng trong phỏng vấn: Bí quyết giúp Gen Z chiếm ưu thế với nhà tuyển dụng",
                  65
                )}
              </p>
              <p className="text-sm">
                {handleShortTextHome(
                  ' Để chiếm ưu thế hơn hàng ngàn ứng viên ngoài kia, nhất là so với những ứng viên giàu kinh nghiệm, Gen Z quả thật cần biết tạo "điểm sáng” trong buổi phỏng vấn',
                  130
                )}
              </p>
              <button className="border-[1px] p-2 rounded-lg font-medium border-blue-500 text-blue-500 hover:bg-blue-500 hover:text-white">
                Đọc thêm
              </button>
            </div>
          </div>

          <div className="rounded-xl max-w-[276px] min-w-[276px] h-fit border-[1px] overflow-hidden bg-white group hover:border-blue-500">
            <div className=" cursor-pointer">
              <Image
                className="w-full h-40"
                src={"/logo/iphone15.png"}
                alt=""
                width={1000}
                height={1000}
              />
            </div>
            <div className="px-4 pt-4 pb-3 flex flex-col gap-y-4">
              <p className="text-xl font-bold group-hover:text-blue-500 cursor-pointer">
                {handleShortTextHome(
                  " 5 điểm sáng trong phỏng vấn: Bí quyết giúp Gen Z chiếm ưu thế với nhà tuyển dụng",
                  65
                )}
              </p>
              <p className="text-sm">
                {handleShortTextHome(
                  ' Để chiếm ưu thế hơn hàng ngàn ứng viên ngoài kia, nhất là so với những ứng viên giàu kinh nghiệm, Gen Z quả thật cần biết tạo "điểm sáng” trong buổi phỏng vấn',
                  130
                )}
              </p>
              <button className="border-[1px] p-2 rounded-lg font-medium border-blue-500 text-blue-500 hover:bg-blue-500 hover:text-white">
                Đọc thêm
              </button>
            </div>
          </div>
          <div className="rounded-xl max-w-[276px] min-w-[276px] h-fit border-[1px] overflow-hidden bg-white group hover:border-blue-500">
            <div className=" cursor-pointer">
              <Image
                className="w-full h-40"
                src={"/logo/iphone15.png"}
                alt=""
                width={1000}
                height={1000}
              />
            </div>
            <div className="px-4 pt-4 pb-3 flex flex-col gap-y-4">
              <p className="text-xl font-bold group-hover:text-blue-500 cursor-pointer">
                {handleShortTextHome(
                  " 5 điểm sáng trong phỏng vấn: Bí quyết giúp Gen Z chiếm ưu thế với nhà tuyển dụng",
                  65
                )}
              </p>
              <p className="text-sm">
                {handleShortTextHome(
                  ' Để chiếm ưu thế hơn hàng ngàn ứng viên ngoài kia, nhất là so với những ứng viên giàu kinh nghiệm, Gen Z quả thật cần biết tạo "điểm sáng” trong buổi phỏng vấn',
                  130
                )}
              </p>
              <button className="border-[1px] p-2 rounded-lg font-medium border-blue-500 text-blue-500 hover:bg-blue-500 hover:text-white">
                Đọc thêm
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogRecruiterComponent;
