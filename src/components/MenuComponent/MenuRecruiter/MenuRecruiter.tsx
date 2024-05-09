import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";
import "./MenuRecruiter.scss";
import { useDispatch, useSelector } from "react-redux";
import { fetchProfileRecruiter } from "@/redux/reducer/profileReducer/profileSliceRecruiter";
import { Router } from "next/router";
import { useRouter } from "next/navigation";
import { AiFillDashboard } from "react-icons/ai";
import { MdEditDocument, MdWork } from "react-icons/md";
import { FaBuilding } from "react-icons/fa";
import { IoMdSettings } from "react-icons/io";
import { CiLogout } from "react-icons/ci";

type Props = {};

const MenuRecruiter = (props: Props) => {
  const dispatch = useDispatch();
  const [tabSetting, setTabSetting] = useState<boolean>(false);
  const profile = useSelector((state: any) => state.profileRecruiter.profile);
  useEffect(() => {
    dispatch(fetchProfileRecruiter("vi") as any);
  }, []);
  const router = useRouter();
  // useEffect(() => {
  //   console.log(profile);
  // }, [profile]);
  return (
    <div className="h-20 ">
      <div className="fixed top-0 inset-x-0 h-20 z-40  flex justify-center gradient-bg-menu">
        <div className="max-w-6xl w-full flex justify-between px-4 items-center ">
          <div className="flex items-center gap-x-12">
            <Image
              onClick={() => {
                window.location.href = "/recruiter";
              }}
              style={{ cursor: "pointer" }}
              alt="logo"
              className="w-20 scale-150"
              width="500"
              height="500"
              src="/logo/2024recruiter.png"
            />
            <div className="flex gap-x-8 font-medium text-lg text-white">
              <div className="cursor-pointer">Giới thiệu</div>
              <div className="cursor-pointer">Báo giá</div>
              <div className="cursor-pointer">Dịch vụ</div>
              <div className="cursor-pointer">Blog</div>
              <div className="cursor-pointer">Hỗ trợ</div>
            </div>
          </div>
          <div className="flex gap-x-2">
            {Object.keys(profile).length > 0 ? (
              <>
                <div
                  className="flex gap-x-2 items-center cursor-pointer"
                  onClick={() => {
                    setTabSetting(!tabSetting);
                  }}
                >
                  <p className="font-semibold text-white ">{profile?.name}</p>
                  <span className="">
                    <Image
                      src={
                        profile?.companyInfomation?.logoPath ?? "/goapply.png"
                      }
                      className="w-8 h-8 rounded-full"
                      width={100}
                      height={100}
                      alt=""
                    />
                  </span>
                  <div
                    className={`flex flex-col gap-y-4 absolute  pointer-events-none ${
                      tabSetting
                        ? "h-fit opacity-100 visible"
                        : "opacity-0 invisible"
                    } top-full transition-all translate-y-2 right-0 w-96 overflow-hidden duration-300 px-4 py-6 bg-white rounded-lg shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px]`}
                  >
                    <div className="flex items-center justify-between">
                      <Image
                        className="shadow-sm rounded-full"
                        alt=""
                        src={"/goapply.png"}
                        width={50}
                        height={50}
                      />
                      <div>
                        <p className="font-semibold capitalize text-blue-500">
                          {profile?.name}
                        </p>
                        <p className="text-sm font-medium capitalize text-gray-400 w-36 break-words">
                          {profile?.email}
                        </p>
                      </div>
                      <div
                        className="rounded-xl font-semibold border-blue-700 text-xs text-blue-700 hover:bg-blue-100 p-2 border-[1px] pointer-events-auto"
                        onClick={() => {
                          router.push("/recruiter/profile");
                        }}
                      >
                        Cập nhật hồ sơ
                      </div>
                    </div>
                    <div className="flex flex-col gap-y-2">
                      <div
                        className="flex items-center py-2 pl-4 transition-all duration-300 w-full border-2 hover:border-blue-600 border-transparent hover:font-semibold hover:bg-blue-100 rounded-lg pointer-events-auto"
                        onClick={() => {
                          // setSelectProfileUser(1);
                          // if (checkPage !== "/profile")
                          //   router.push("/profile");
                        }}
                      >
                        <AiFillDashboard />
                        <p className="ml-2">Tổng quan</p>
                      </div>
                      <div
                        className="flex items-center py-2 pl-4 transition-all duration-300 w-full border-2 hover:border-blue-600 border-transparent hover:font-semibold hover:bg-blue-100 rounded-lg pointer-events-auto"
                        onClick={() => {
                          // setSelectProfileUser(2);
                          // if (checkPage !== "/profile")
                          //   router.push("/profile");
                        }}
                      >
                        <MdEditDocument />
                        <p className="ml-2">Thông tin công ty</p>
                      </div>
                      <div
                        className="flex items-center py-2 pl-4 transition-all duration-300 w-full border-2 hover:border-blue-600 border-transparent hover:font-semibold hover:bg-blue-100 rounded-lg pointer-events-auto"
                        onClick={() => {
                          // setSelectProfileUser(3);
                          // if (checkPage !== "/profile")
                          //   router.push("/profile");
                        }}
                      >
                        <FaBuilding />
                        <p className="ml-2">Hồ sơ tuyển dụng</p>
                      </div>
                      <div
                        className="flex items-center py-2 pl-4 transition-all duration-300 w-full border-2 hover:border-blue-600 border-transparent hover:font-semibold hover:bg-blue-100 rounded-lg pointer-events-auto"
                        onClick={() => {
                          // setSelectProfileUser(4);
                          // if (checkPage !== "/profile")
                          //   router.push("/profile");
                        }}
                      >
                        <MdWork />
                        <p className="ml-2">Ứng viên tiềm năng</p>
                      </div>
                      <div
                        className="flex items-center py-2 pl-4 transition-all duration-300 w-full border-2 hover:border-blue-600 border-transparent hover:font-semibold hover:bg-blue-100 rounded-lg pointer-events-auto"
                        onClick={() => {
                          // setSelectProfileUser(5);
                          // if (checkPage !== "/profile")
                          //   router.push("/profile");
                        }}
                      >
                        <IoMdSettings />
                        <p className="ml-2">Quản lý tài khoản</p>
                      </div>
                      <div className="flex items-center py-2 pl-4 transition-all duration-300 w-full border-2 hover:border-blue-600 border-transparent hover:font-semibold hover:bg-blue-100 rounded-lg pointer-events-auto">
                        <CiLogout />
                        <p className="ml-2">Thoát</p>
                      </div>
                    </div>
                  </div>
                </div>
              </>
            ) : (
              <>
                <div className="px-4 py-2 rounded-xl text-lg border-2 border-blue-500  cursor-pointer text-blue-500 font-semibold">
                  Đăng nhập
                </div>
                <div className="px-4 py-2 rounded-xl text-lg border-2 bg-blue-500 border-blue-500  cursor-pointer text-white font-semibold">
                  Đăng ký
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MenuRecruiter;
