import React from "react";

type Props = {};

const FooterRecruiter = (props: Props) => {
  return (
    <div className="w-full flex justify-center bg-blue-900 text-white pt-16 px-4">
      <div className="max-w-6xl w-full flex flex-col gap-y-20">
        <div className="flex justify-between flex-wrap gap-4">
          <div>
            <p className="mb-4 font-bold">Thông tin liên hệ</p>
            <div className="flex flex-col text-sm gap-y-1">
              <p>Hồ Chí Minh: (84 28) 3925 8456</p>
              <p>Hà Nội: (84 24) 3944 0568</p>
              <p>Jobsupport@vietnamworks.com</p>
            </div>
          </div>
          <div>
            <p className="mb-4 font-bold">Công ty</p>
            <div className="flex flex-col text-sm gap-y-1">
              <div className="hover:text-blue-500 cursor-pointer">
                Giới thiệu
              </div>
              <div className="hover:text-blue-500 cursor-pointer">
                Bảo Mật Thông Tin
              </div>
              <div className="hover:text-blue-500 cursor-pointer">
                Quy Định Sử Dụng
              </div>
              <div className="hover:text-blue-500 cursor-pointer">Hỏi Đáp</div>
            </div>
          </div>
          <div>
            <p className="mb-4 font-bold">Ứng dụng di động</p>
            <div className="flex flex-col text-sm gap-y-1"></div>
          </div>
          <div>
            <p className="mb-4 font-bold">Kết Nối Với JOBIT</p>
            <div className="flex flex-col text-sm gap-y-1"></div>
          </div>
        </div>
        <div className="w-full border-t-[1px] border-white py-4 flex flex-col items-center text-xs font-light">
          <p>Bản Quyền © JOB IT K20 SPKT</p>
        </div>
      </div>
    </div>
  );
};

export default FooterRecruiter;
