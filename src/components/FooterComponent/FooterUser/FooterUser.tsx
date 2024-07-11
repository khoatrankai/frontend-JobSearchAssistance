/* eslint-disable react-hooks/rules-of-hooks */
"use client";
import React, { useRef } from "react";
import Image from "next/image";
import PhoneIcon from "@mui/icons-material/Phone";
import EmailIcon from "@mui/icons-material/Email";
import LanguageIcon from "@mui/icons-material/Language";
import AddLocationIcon from "@mui/icons-material/AddLocation";
import PersonIcon from "@mui/icons-material/Person";
import { RootState } from "@/redux";
import { useSelector } from "react-redux";
import {
  FaAppStoreIos,
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
  FaTiktok,
  FaUserGraduate,
  FaYoutube,
} from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { IoLogoGooglePlaystore } from "react-icons/io5";
type Props = {};

const FooterUser = (props: Props) => {
  const languageRedux = useSelector(
    (state: RootState) => state.changeLaguage.language
  );
  return (
    <div className="bg-white pt-4 relative">
      <div className="w-full flex justify-center  border-t-[1px] text-black pt-16 px-4 relative">
        <div className="max-w-6xl w-full flex flex-col gap-y-20">
          <div className="flex justify-between flex-wrap gap-8">
            <div>
              <p className="mb-4 font-bold">Thông tin liên hệ</p>
              <div className="flex flex-col text-sm gap-y-1">
                <p className="flex gap-1 items-center">
                  <span>
                    <FaUserGraduate />
                  </span>
                  20110505 - Trần Tấn Khoa
                </p>
                <p className="flex gap-1 items-center">
                  <span>
                    <FaUserGraduate />
                  </span>
                  20161385 - Huỳnh Bảo Toàn
                </p>
                <p className="flex gap-1 items-center">
                  <span>
                    <MdEmail />
                  </span>
                  JobIT2024@gmail.com
                </p>
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
                <div className="hover:text-blue-500 cursor-pointer">
                  Hỏi Đáp
                </div>
              </div>
            </div>
            <div>
              <p className="mb-4 font-bold">Ứng dụng di động</p>
              <div className="flex gap-2 flex-col">
                <button className="flex gap-1 items-center justify-center w-36 h-11 rounded-md border-[1px] group hover:border-t-green-500 hover:border-r-yellow-500 hover:border-b-red-500 hover:border-l-blue-500 hover:font-semibold duration-300 transition-all text-sm">
                  <IoLogoGooglePlaystore />
                  <p className="w-[100px]">
                    <span className="group-hover:text-blue-500 transition-all duration-300">
                      G
                    </span>
                    <span className="group-hover:text-blue-500 transition-all duration-300">
                      o
                    </span>
                    <span className="group-hover:text-red-500 transition-all duration-300">
                      o
                    </span>
                    <span className="group-hover:text-yellow-500 transition-all duration-300">
                      g
                    </span>
                    <span className="group-hover:text-green-500 transition-all duration-300">
                      l
                    </span>
                    <span className="group-hover:text-red-500 transition-all duration-300">
                      e
                    </span>{" "}
                    Store
                  </p>
                </button>
                <button className="flex gap-1 items-center justify-center w-36 h-11 rounded-md border-[1px] group hover:border-blue-400 hover:font-semibold duration-300 transition-all text-sm">
                  <FaAppStoreIos className="group-hover:text-blue-400 duration-300 transition-all" />
                  <p className="w-[100px]">App Store</p>
                </button>
              </div>
            </div>
            <div>
              <p className="mb-4 font-bold">Kết Nối Với JOBIT</p>
              <div className="flex gap-2 flex-wrap">
                <button className="flex items-center justify-center w-8 h-8 rounded-full bg-red-600 text-white">
                  <FaYoutube />
                </button>
                <button className="flex items-center justify-center w-8 h-8 rounded-full bg-blue-600 text-white">
                  <FaFacebookF />
                </button>
                <button className="flex items-center justify-center w-8 h-8 rounded-full bg-blue-700 text-white">
                  <FaLinkedinIn />
                </button>
                <button className="flex items-center justify-center w-8 h-8 rounded-full bg-black text-white">
                  <FaTiktok />
                </button>
                <button
                  className="flex items-center justify-center w-8 h-8 rounded-full text-white"
                  style={{ backgroundColor: "#D8225A" }}
                >
                  <FaInstagram />
                </button>
              </div>
            </div>
          </div>
          <div className="w-full border-t-[1px] border-gray-200 py-4 flex flex-col items-center text-xs font-light">
            <Image alt="" src={"/logo/2023.png"} width={100} height={100} />
            <p>Bản Quyền © JOB IT K20 SPKT</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FooterUser;
