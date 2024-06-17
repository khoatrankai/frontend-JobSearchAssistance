// Import necessary components and styles
"use client";
import React, { useEffect, useState } from "react";
import { Input, Checkbox, Space } from "antd";
import { MdOutlineWifiPassword } from "react-icons/md";
import Button from "@mui/material/Button";
import { useRouter } from "next/navigation";
import { useParams } from "next/navigation";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";
import "./style.scss";
import apiAccount from "@/api/candidate/apiAccount";

const Page = () => {
  const [isMobile, setIsMobile] = useState(false);
  const [isTablet, setIsTablet] = useState(false);
  const [password, setPassword] = useState("");
  const [verifyPassword, setVerifyPassword] = useState("");
  const [isCheckVerifyPassword, setIsCheckVerifyPassword] = useState(false);
  const [isCheckPassword, setIsCheckPassword] = useState(false);
  const { token } = useParams();

  const router = useRouter();

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 1200) {
        setIsTablet(true);
      }
      if (window.innerWidth < 768) {
        setIsMobile(true);
      }
      if (window.innerWidth > 1200) {
        setIsTablet(false);
      }
      if (window.innerWidth > 768) {
        setIsMobile(false);
      }
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const hadleUpdatePassword = () => {
    if (password === "" || verifyPassword === "") {
      toast.error("Vui lòng nhập mật khẩu", {
        position: "bottom-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
    if (password.length < 6 || password.length > 25) {
      toast.error("Mật khẩu từ 6 đến 25 ký tự", {
        position: "bottom-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
    if (password !== verifyPassword) {
      toast.error("Mật khẩu không trùng khớp", {
        position: "bottom-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }

    const fetchData = async () => {
      const res = (await apiAccount.candidateResetPassword(
        password,
        token as string,
        verifyPassword as string
      )) as any;
      //console.log(res);
      if (res.data.statusCode === 200) {
        toast.success("Cập nhật mật khẩu thành công", {
          position: "bottom-center",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        // deplay 3s and redirect to login page
        setTimeout(() => {
          router.push("/candidate/login");
        }, 3000);
      }
    };

    fetchData();
  };

  return (
    <div className="flex bg-gray-100 h-screen">
      <div
        className={
          isTablet
            ? "w-full p-4 flex items-center justify-center bg-white"
            : "w-full p-4 flex items-center justify-center bg-white"
        }
      >
        <div
          className={
            isMobile
              ? "w-full rounded-lg shadow-lg p-3 bg-white"
              : "w-2/5 rounded-lg shadow-lg p-3 bg-white"
          }
        >
          <div className="header mb-6 flex flex-col gap-1">
            <img
              src="/logo/2025.png"
              alt="logo"
              className="w-24 h-24 mx-auto"
            />
            <h1 className="text-2xl font-bold">Tạo lại mật khẩu của bạn</h1>
            <p className="text-gray-600">
              Đăng nhập ngay để bắt đầu xây dựng một hồ sơ nổi bật cho bạn và
              nhận được các cơ hội sự nghiệp lý tưởng
            </p>
          </div>
          <div className="login">
            <label className="block mb-1">Mật khẩu mới:</label>
            <div className="mb-3 flex flex-col">
              <Input.Password
                size="large"
                onClick={() => {
                  setIsCheckPassword(true);
                }}
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
                status={isCheckPassword && password === "" ? "error" : ""}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    hadleUpdatePassword();
                  }
                }}
                placeholder="Mật khẩu"
                prefix={
                  <span style={{ marginRight: "8px" }}>
                    <MdOutlineWifiPassword />
                  </span>
                }
              />

              {isCheckPassword && (
                <ul style={{ listStyleType: "disc", marginLeft: "20px" }}>
                  <li className="mt-2 basic">Mật khẩu từ 6 đến 25 ký tự</li>
                  <li className="mt-2 basic">
                    Bao gồm chữ hoa, thường và ký tự số
                  </li>
                </ul>
              )}
              {isCheckPassword && password === "" && (
                <p className="text-red-700 text-sm mt-2">
                  Vui lòng nhập mật khẩu
                </p>
              )}
            </div>
            <label className="block mb-1">Xác nhận mật khẩu:</label>
            <div className="mb-3">
              <Input.Password
                size="large"
                onClick={() => {
                  setIsCheckVerifyPassword(true);
                }}
                onChange={(e) => {
                  setVerifyPassword(e.target.value);
                }}
                status={
                  isCheckVerifyPassword && verifyPassword === "" ? "error" : ""
                }
                placeholder="Nhập lại mật khẩu"
                prefix={
                  <span style={{ marginRight: "8px" }}>
                    <MdOutlineWifiPassword />
                  </span>
                }
              />

              {isCheckVerifyPassword && verifyPassword === "" && (
                <p className="text-red-700 text-sm mt-2">
                  Vui lòng nhập lại mật khẩu
                </p>
              )}
              {isCheckVerifyPassword && verifyPassword !== password && (
                <p className="text-red-700 text-sm mt-2">
                  Mật khẩu không trùng khớp
                </p>
              )}
            </div>
            <div className="flex gap-2.5">
              <Checkbox defaultChecked={false} />
              <div className="basic cursor-pointer">
                Đăng xuất ra khỏi thiết bị khác
              </div>
            </div>
            <Button
              sx={{
                backgroundColor: "#ffcc00",
                color: "black",
                marginTop: "20px",
                "&:hover": {
                  backgroundColor: "#ffcc00",
                  color: "black",
                },
              }}
              className="w-full"
              onClick={() => {
                hadleUpdatePassword();
              }}
            >
              Tạo lại mật khẩu mới
            </Button>
            <div className="flex">
              <div className="basic mt-3">
                <span
                  className="text-blue-500 cursor-pointer"
                  onClick={() => router.push("/candidate/login")}
                >
                  Quay lại đăng nhập
                </span>
              </div>
              <div className="basic mt-3 ml-auto">
                <span
                  className="text-blue-500 cursor-pointer"
                  onClick={() => router.push("/candidate/sign-up")}
                >
                  Tạo tài khoản mới
                </span>
              </div>
            </div>
            <div className="flex flex-col justify-center items-center mt-4 gap-1">
              <div className="text-sm font-bold">
                Bạn gặp khó khăn khi tạo tài khoản?
              </div>
              <div className="basic">
                <span className="text-blue-500 font-bold cursor-pointer">
                  Liên hệ hỗ trợ: 0x00
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* <ToastContainer /> */}
    </div>
  );
};

export default Page;
