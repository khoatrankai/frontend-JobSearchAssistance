import { useSrollContext } from "@/context/AppProvider";
import Image from "next/image";
import React from "react";
import { IoIosCheckmarkCircle } from "react-icons/io";

type Props = {};

const ServiceRecruiterCompany = (props: Props) => {
  const { reponsiveMobile } = useSrollContext();
  return (
    <div className="w-full py-20 px-4 flex justify-center">
      <div className="max-w-6xl gap-y-16 flex flex-col items-center justify-center">
        <p
          className={`font-bold  ${
            reponsiveMobile < 800 ? "text-2xl" : "text-4xl"
          }`}
        >
          Dịch vụ của chúng tôi
        </p>
        <div className="flex justify-between items-center py-6 w-full">
          <Image
            src={"/recruiter/post.png"}
            alt=""
            width={reponsiveMobile < 800 ? 200 : 400}
            height={reponsiveMobile < 800 ? 200 : 400}
          />
          <div className="flex flex-col gap-y-4 basis-1/2">
            <p
              className={`font-semibold text-blue-600 ${
                reponsiveMobile < 800 ? "text-xl" : "text-3xl"
              }`}
            >
              Đăng tin tuyển dụng miễn phí
            </p>
            <div
              className={`flex flex-col gap-y-2 ${
                reponsiveMobile < 800 ? "text-sm" : ""
              }`}
            >
              <div className="flex gap-x-2  items-center">
                <div className="w-6">
                  <IoIosCheckmarkCircle className="text-blue-600" />{" "}
                </div>
                <span>
                  Đăng tin tuyển dụng miễn phí và không giới hạn số lượng.
                </span>
              </div>
              <div className="flex gap-x-2  items-center">
                <div className="w-6">
                  <IoIosCheckmarkCircle className="text-blue-600" />{" "}
                </div>
                <span>Đăng tin tuyển dụng dễ dàng, không quá 1 phút.</span>
              </div>
              <div className="flex gap-x-2  items-center">
                <div className="w-6">
                  <IoIosCheckmarkCircle className="text-blue-600" />{" "}
                </div>
                <span>
                  Tiếp cận nguồn CV ứng viên khổng lồ, tìm kiếm ứng viên từ kho
                  dữ liệu hơn 5 triệu hồ sơ.
                </span>
              </div>
              <div className="flex gap-x-2  items-center">
                <div className="w-6">
                  <IoIosCheckmarkCircle className="text-blue-600" />{" "}
                </div>
                <span>Dễ dàng kiểm duyệt và đăng tin trong 24h.</span>
              </div>
            </div>
          </div>
        </div>
        <div className="flex justify-between items-center py-6 w-full">
          <div className="flex flex-col gap-y-4 basis-1/2">
            <p
              className={`font-semibold text-blue-600 ${
                reponsiveMobile < 800 ? "text-xl" : "text-3xl"
              }`}
            >
              Biểu đồ thống kê linh hoạt
            </p>
            <div
              className={`flex flex-col gap-y-2 ${
                reponsiveMobile < 800 ? "text-sm" : ""
              }`}
            >
              <div className="flex gap-x-2  items-center">
                <div className="w-6">
                  <IoIosCheckmarkCircle className="text-blue-600" />{" "}
                </div>
                <span>Tăng khả năng tìm kiếm ứng viên tìm năng.</span>
              </div>
              <div className="flex gap-x-2  items-center">
                <div className="w-6">
                  <IoIosCheckmarkCircle className="text-blue-600" />{" "}
                </div>
                <span>Dễ dàng tối ưu các từ khóa tìm kiếm.</span>
              </div>
              <div className="flex gap-x-2  items-center">
                <div className="w-6">
                  <IoIosCheckmarkCircle className="text-blue-600" />{" "}
                </div>
                <span>Thống kê lượng ứng viên đã đạt được.</span>
              </div>
              <div className="flex gap-x-2  items-center">
                <div className="w-6">
                  <IoIosCheckmarkCircle className="text-blue-600" />{" "}
                </div>
                <span>Dễ dùng và tiếp cận tốt hơn.</span>
              </div>
            </div>
          </div>
          <Image
            src={"/recruiter/chart.png"}
            alt=""
            width={reponsiveMobile < 800 ? 200 : 400}
            height={reponsiveMobile < 800 ? 200 : 400}
          />
        </div>
        <div className="flex justify-between items-center py-6 w-full">
          <Image
            src={"/recruiter/info.png"}
            alt=""
            width={reponsiveMobile < 800 ? 200 : 400}
            height={reponsiveMobile < 800 ? 200 : 400}
          />
          <div className="flex flex-col gap-y-4  basis-1/2">
            <p
              className={`font-semibold text-blue-600 ${
                reponsiveMobile < 800 ? "text-xl" : "text-3xl"
              }`}
            >
              CV đề xuất
            </p>
            <div
              className={`flex flex-col gap-y-2 ${
                reponsiveMobile < 800 ? "text-sm" : ""
              }`}
            >
              <div className="flex gap-x-2  items-center">
                <div className="w-6">
                  <IoIosCheckmarkCircle className="text-blue-600" />{" "}
                </div>

                <span>
                  Đa dạng hóa nguồn CV ứng viên mà không cần mất công tìm kiếm
                  ứng viên.
                </span>
              </div>
              <div className="flex gap-x-2  items-center">
                <div className="w-6">
                  <IoIosCheckmarkCircle className="text-blue-600" />{" "}
                </div>
                <span>Tiết kiệm thời gian tuyển dụng nhân sự.</span>
              </div>
              <div className="flex gap-x-2  items-center">
                <div className="w-6">
                  <IoIosCheckmarkCircle className="text-blue-600" />{" "}
                </div>
                <span>Tỷ lệ ứng viên phù hợp lên đến 40%.</span>
              </div>
              <div className="flex gap-x-2  items-center">
                <div className="w-6">
                  <IoIosCheckmarkCircle className="text-blue-600" />{" "}
                </div>
                <span>Dịch vụ có cam kết CV đang tìm kiếm công việc.</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServiceRecruiterCompany;
