// Import necessary components and styles
"use client";
import React, { useEffect, useState } from "react";
import { Input, Checkbox, Space } from "antd";
import { MdEmail, MdOutlineWifiPassword } from "react-icons/md";
import Button from "@mui/material/Button";
import { useRouter } from "next/navigation";
import { CiCircleInfo } from "react-icons/ci";
import "./style.scss";
import { fetchProfile } from "@/redux/reducer/profileReducer/profileSlice";
import { useDispatch } from "react-redux";
import signInEmailApi from "@/api/authApi";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { IoIosArrowBack } from "react-icons/io";
import CheckPageLogin from "@/util/CheckPageComLogin";

interface AuthReponse {
  accountId: string | null;
  accessToken: string | null;
  refreshToken: string | null;
}

interface IReponseSignInCandidate {
  code: number;
  data: any;
}

const Page = () => {
  CheckPageLogin();
  const [isMobile, setIsMobile] = useState(false);
  const [isTablet, setIsTablet] = useState(false);
  const [email, setEmail] = useState("");
  const [isClickEmail, setIsClickEmail] = useState(false);
  const [password, setPassword] = useState("");
  const [isCheckPassword, setIsCheckPassword] = useState(false);
  const [checkClickPolicy, setCheckClickPolicy] = useState(false);
  const router = useRouter();
  const dispatch = useDispatch();

  const fetchDataProfile = async (auth: AuthReponse) => {
    localStorage.setItem(
      "accountId",
      auth && auth.accountId ? auth.accountId : ""
    );
    localStorage.setItem(
      "accessToken",
      auth && auth.accessToken ? auth.accessToken : ""
    );
    localStorage.setItem(
      "refreshToken",
      auth && auth.refreshToken ? auth.refreshToken : ""
    );

    dispatch(fetchProfile("vi") as any);
  };

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

  const handleLogin = async () => {
    const fetchSignIn = async () => {
      const response = (await signInEmailApi.signInCandidate(
        email,
        password
      )) as any as IReponseSignInCandidate;

      if (response && response.code === 200) {
        fetchDataProfile(response.data);
        toast.success("Đăng nhập thành công chuyển về trang chủ sao 10s", {
          position: "bottom-center",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        // redirect to home page after 10s
        setTimeout(() => {
          router.push("/");
        }, 5000);
      } else {
        toast.error("Đăng nhập không thành công", {
          position: "bottom-center",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      }
    };

    fetchSignIn();
  };

  return (
    <div className="flex bg-gray-100 h-screen">
      <div
        className={
          isTablet
            ? "w-full p-4 flex items-center justify-center"
            : "w-2/3 p-4 flex items-center justify-center"
        }
      >
        <div
          className={
            isMobile
              ? "w-full rounded-lg shadow-lg p-3"
              : "w-3/5 rounded-lg shadow-lg p-3"
          }
        >
          <div
            className="flex gap-2 items-center mb-3"
            onClick={() => {
              router.push("/");
            }}
          >
            <div className="back-home">
              <IoIosArrowBack />
            </div>
            <div className="text-lg font-bold cursor-pointer">Trở về</div>
          </div>
          <div className="header mb-6 flex flex-col gap-1">
            <h1 className="text-2xl font-bold">
              Chào mừng bạn đã quay trở lại
            </h1>
            <p className="text-gray-600">
              Cùng xây dựng một hồ sơ nổi bật và nhận được các cơ hội sự nghiệp
              lý tưởng
            </p>
          </div>
          <div className="login">
            <label className="block mb-1">Email:</label>
            <div className="mb-3">
              <Input
                size="large"
                placeholder="Email"
                onClick={() => {
                  setIsClickEmail(true);
                }}
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
                status={isClickEmail && email === "" ? "error" : ""}
                prefix={
                  <span style={{ marginRight: "8px" }}>
                    <MdEmail />
                  </span>
                }
                suffix={
                  isClickEmail && email === "" ? (
                    <CiCircleInfo className="text-red-700" />
                  ) : (
                    ""
                  )
                }
              />

              {isClickEmail && email === "" && (
                <p className="text-red-700 text-sm mt-2">Vui lòng nhập email</p>
              )}
            </div>
            <label className="block mb-1">Mật khẩu:</label>
            <div className="mb-3">
              <Input.Password
                size="large"
                onClick={() => {
                  setIsCheckPassword(true);
                }}
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    if (checkClickPolicy) {
                      handleLogin();
                    }
                  }
                }}
                status={isCheckPassword && password === "" ? "error" : ""}
                placeholder="Mật khẩu"
                prefix={
                  <span style={{ marginRight: "8px" }}>
                    <MdOutlineWifiPassword />
                  </span>
                }
              />

              {isCheckPassword && password === "" && (
                <p className="text-red-700 text-sm mt-2">
                  Vui lòng nhập mật khẩu
                </p>
              )}
            </div>
            <p
              className="text-blue-500 hover:underline cursor-pointer text-right basic"
              onClick={() => {
                router.push("/candidate/forgot-password");
              }}
            >
              Quên mật khẩu?
            </p>
            <p className="or">Hoặc đăng nhập bằng</p>
            <div className="flex gap-3">
              <Button
                sx={{
                  backgroundColor: "#3b5998",
                  width: "50%",
                  color: "white",
                  borderRadius: "5px",
                  "&:hover": {
                    backgroundColor: "#3b5998",
                  },
                }}
              >
                Facebook
              </Button>
              <Button
                sx={{
                  backgroundColor: "#ff0000",
                  width: "50%",
                  color: "white",
                  borderRadius: "5px",
                  "&:hover": {
                    backgroundColor: "#ff0000",
                  },
                }}
              >
                Google
              </Button>
            </div>
            <div className="flex mt-4 align-top">
              <Checkbox
                defaultChecked={false}
                onChange={(e) => {
                  setCheckClickPolicy(e.target.checked);
                }}
              />
              <p className="ml-2 basic agreement-social-login">
                Bằng việc đăng nhập bằng tài khoản mạng xã hội, tôi đã đọc và
                đồng ý với Điều khoản dịch vụ và Chính sách bảo mật của JOBS
              </p>
            </div>
            <div className="mt-3 justify-center flex">
              <div className="basic text-[#6f7882]">Bạn chưa có tài khoản?</div>
              <div
                className="basic register cursor-pointer"
                onClick={() => {
                  router.push("/candidate/sign-up");
                }}
              >
                Đăng ký
              </div>
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
            disabled={!checkClickPolicy}
            onClick={() => {
              handleLogin();
            }}
          >
            Đăng nhập
          </Button>
        </div>
      </div>
      {!isTablet && <div className="w-1/3 h-screen bg-right"></div>}
      {/* <ToastContainer /> */}
    </div>
  );
};

export default Page;
