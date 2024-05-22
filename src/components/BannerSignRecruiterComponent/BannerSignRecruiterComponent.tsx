import React, { useEffect } from "react";
import "./BannerSignRecruiterComponent.scss";
import Image from "next/image";
import { useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import { useSrollContext } from "@/context/AppProvider";
type Props = {};

const BannerSignRecruiterComponent = (props: Props) => {
  const profile = useSelector((state: any) => state.profileRecruiter.profile);
  const { reponsiveMobile } = useSrollContext();
  const router = useRouter();
  useEffect(() => {
    console.log(profile?.companyInfomation?.companyInfomation?.id, profile);
  }, [profile]);
  return (
    <div className="w-full flex justify-center gradient-bg-sign px-4">
      <div className="max-w-6xl w-full h-[800px]  flex items-center relative overflow-hidden">
        {!profile && (
          <div className="flex flex-col">
            <p
              className={` font-extrabold ${
                reponsiveMobile < 1152 ? "text-5xl" : "text-7xl"
              }`}
            >
              JOB RECRUITER <br /> <span>HELLO FRIEND</span>
            </p>
            <p className="font-semibold text-lg text-black/50">
              Hãy nhanh tay đăng ký để chúng tôi hỗ trợ bạn tốt hơn
            </p>
            <button
              className="p-4 rounded-lg border-2 border-blue-500 mt-10 w-fit font-bold text-blue-500 translate-x-32 hover:bg-blue-500 hover:text-white transition-all duration-300 peer"
              onClick={() => {
                router.push("/recruiter/register");
              }}
            >
              Đăng ký tại đây
            </button>
            <Image
              className="absolute -bottom-10 left-0 peer-hover:bottom-0 transition-all duration-500"
              alt=""
              width={250}
              height={250}
              src={"/bannersignrecruiter.png"}
            />
          </div>
        )}
        {!profile?.companyInfomation?.companyLocation?.id && profile && (
          <div className="flex flex-col">
            <p
              className={` font-extrabold ${
                reponsiveMobile < 1152 ? "text-5xl" : "text-7xl"
              }`}
            >
              JOB RECRUITER <br /> <span>HEY!!! BẠN ƠI</span>
            </p>
            <p className="font-semibold text-lg text-black/50">
              Bạn chưa cập nhật hồ sơ công ty này
            </p>
            <button
              className="p-4 rounded-lg border-2 border-blue-500 mt-10 w-fit font-bold text-blue-500 translate-x-32 hover:bg-blue-500 hover:text-white transition-all duration-300 peer"
              onClick={() => {
                router.push("/recruiter/profile");
              }}
            >
              Cập nhật thông tin
            </button>
            <Image
              className="absolute -bottom-10 left-0 peer-hover:bottom-0 transition-all duration-500"
              alt=""
              width={250}
              height={250}
              src={"/bannersignrecruiter.png"}
            />
          </div>
        )}
        {profile?.companyInfomation?.companyLocation?.id && profile && (
          <div className="flex flex-col">
            <p
              className={` font-extrabold ${
                reponsiveMobile < 1152 ? "text-5xl" : "text-7xl"
              }`}
            >
              JOB RECRUITER <br /> <span>TUI CÓ NÀY CHO BẠN NÈ!!!</span>
            </p>
            <p className="font-semibold text-lg text-black/50">
              Có những ứng viên cực kì tiềm năng cho bạn
            </p>
            <button
              className="p-4 rounded-lg border-2 border-blue-500 mt-10 w-fit font-bold text-blue-500 translate-x-32 hover:bg-blue-500 hover:text-white transition-all duration-300 peer"
              onClick={() => {
                router.push("/recruiter/profile");
              }}
            >
              Thông tin ứng viên
            </button>
            <Image
              className="absolute -bottom-10 left-0 peer-hover:bottom-0 transition-all duration-500"
              alt=""
              width={250}
              height={250}
              src={"/bannersignrecruiter.png"}
            />
          </div>
        )}
        <div></div>
      </div>
    </div>
  );
};

export default BannerSignRecruiterComponent;
