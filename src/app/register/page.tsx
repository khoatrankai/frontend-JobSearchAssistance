"use client";
import React, { useEffect, useState } from "react";
import "./style.scss";
import { useRouter } from "next/navigation";
import { Input, Checkbox } from "antd";
import { MdEmail, MdOutlineWifiPassword } from "react-icons/md";
import Button from "@mui/material/Button";
import { FaPersonBreastfeeding } from "react-icons/fa6";
import { CiCircleInfo } from "react-icons/ci";
import apiAccount from "@/api/candidate/apiAccount";
import CheckPageLogin from "@/util/CheckPageComLogin";
import { signIn, signOut, useSession, getSession } from "next-auth/react";
import { useDispatch } from "react-redux";
import { fetchProfile } from "@/redux/reducer/profileReducer/profileSlice";
const Page = () => {
  CheckPageLogin();
  const { data: session } = useSession();
  const [isMobile, setIsMobile] = useState(false);
  const [isTablet, setIsTablet] = useState(false);
  const [isClickName, setIsClickName] = useState(false);
  const [isClickEmail, setIsClickEmail] = useState(false);
  const [isClickPassword, setIsClickPassword] = useState(false);
  const [isClickVerifyPassword, setIsClickVerifyPassword] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [verifyPassword, setVerifyPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [isArrgee, setIsArrgee] = useState(false);
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
  const dispatch = useDispatch();
  const handleCandidateSignUp = () => {
    if (
      name === "" ||
      email === "" ||
      password === "" ||
      verifyPassword === ""
    ) {
      setError("Vui lòng nhập đầy đủ thông tin");
    }
    if (password !== verifyPassword) {
      setError("Mật khẩu không khớp");
    }

    const fetchCandidateSignUp = async () => {
      const response = await apiAccount.candidateSignUp(email, password, name);

      if (response.data.statusCode === 201) {
        setSuccess(true);

        // Redirect to login page after 10s
        setTimeout(() => {
          router.push("/login");
        }, 10000);
      }
    };

    fetchCandidateSignUp();
  };
  const fetchDataProfile = async (auth: any) => {
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
    if (session) {
      fetchDataProfile(session as any);
      signOut();
    }
  }, [session]);
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
          <div className="header mb-6 flex flex-col gap-1">
            <h1
              className={
                isMobile ? "mt-36 text-2xl font-bold" : "text-2xl font-bold"
              }
            >
              Chào mừng bạn đến với JOBS
            </h1>
            <p className="text-gray-600">
              Cùng xây dựng một hồ sơ nổi bật và nhận được các cơ hội sự nghiệp
              lý tưởng
            </p>

            <div>
              {error && (
                <p className="text-red-700 text-sm mt-2 bg-slate-200 w-full p-3 font-bold">
                  {error}
                </p>
              )}
            </div>
            <div>
              {success && (
                <p className="text-green-700 text-sm mt-2 bg-slate-200 w-full p-3 font-bold">
                  Đăng ký thành công, hệ thống sẽ trở về trang đăng nhập sau 10s
                </p>
              )}
            </div>
          </div>
          <div className="login">
            <label className="block mb-1">Họ và tên:</label>
            <div className="mb-3">
              <Input
                size="large"
                placeholder="Họ và tên"
                prefix={
                  <span style={{ marginRight: "8px" }}>
                    <FaPersonBreastfeeding />
                  </span>
                }
                onClick={() => {
                  setIsClickName(true);
                }}
                onChange={(e) => {
                  setName(e.target.value);
                }}
                status={isClickName && name === "" ? "error" : ""}
                suffix={
                  isClickName && name === "" ? (
                    <CiCircleInfo className="text-red-700" />
                  ) : (
                    ""
                  )
                }
              />
              {isClickName && name === "" && (
                <p className="text-red-700 text-sm mt-2">
                  Vui lòng nhập họ và tên
                </p>
              )}
            </div>
            <label className="block mb-1">Email:</label>
            <div className="mb-3">
              <Input
                size="large"
                placeholder="Email"
                prefix={
                  <span style={{ marginRight: "8px" }}>
                    <MdEmail />
                  </span>
                }
                onClick={() => {
                  setIsClickEmail(true);
                }}
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
                value={email}
                status={isClickEmail && email === "" ? "error" : ""}
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
                onClick={() => {
                  setIsClickPassword(true);
                }}
                status={isClickPassword && password === "" ? "error" : ""}
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
                value={password}
                size="large"
                placeholder="Mật khẩu"
                prefix={
                  <span style={{ marginRight: "8px" }}>
                    <MdOutlineWifiPassword />
                  </span>
                }
              />
              {isClickPassword && password === "" && (
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
                  setIsClickVerifyPassword(true);
                }}
                status={
                  isClickVerifyPassword && verifyPassword === "" ? "error" : ""
                }
                onChange={(e) => {
                  setVerifyPassword(e.target.value);
                }}
                value={verifyPassword}
                placeholder="Xác nhận mật khẩu"
                prefix={
                  <span style={{ marginRight: "8px" }}>
                    <MdOutlineWifiPassword />
                  </span>
                }
              />
              {isClickVerifyPassword && verifyPassword === "" && (
                <p className="text-red-700 text-sm mt-2">
                  Vui lòng xác nhận mật khẩu
                </p>
              )}
              {isClickVerifyPassword &&
                verifyPassword !== "" &&
                verifyPassword !== password && (
                  <p className="text-red-700 text-sm mt-2">
                    Mật khẩu không khớp
                  </p>
                )}
            </div>

            <div className="flex mt-4 align-top">
              <Checkbox
                defaultChecked={false}
                onChange={(e) => {
                  setIsArrgee(e.target.checked);
                }}
              />
              <p className="ml-2 basic agreement-social-login">
                Tôi đã đọc và đồng ý với Điều khoản dịch vụ và Chính sách bảo
                mật của JOBS
              </p>
            </div>

            <Button
              sx={{
                backgroundColor: "#006dff",
                color: "black",
                marginTop: "20px",
                "&:hover": {
                  backgroundColor: "#005ef3",
                  color: "white",
                },
              }}
              className="w-full"
              disabled={!isArrgee}
              onClick={() => {
                handleCandidateSignUp();
              }}
            >
              Đăng ký
            </Button>
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
                onClick={() => {
                  signIn("facebook");
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
                onClick={() => {
                  signIn("google");
                }}
              >
                Google
              </Button>
            </div>
            <div className="flex mt-4 align-top">
              <Checkbox defaultChecked={false} />
              <p className="ml-2 basic agreement-social-login">
                Bằng việc đăng nhập bằng tài khoản mạng xã hội, tôi đã đọc và
                đồng ý với Điều khoản dịch vụ và Chính sách bảo mật của JOBS
              </p>
            </div>

            <div className="mt-3 justify-center flex">
              <div className="basic">Bạn đã có tài khoản?</div>
              <div
                className="basic register cursor-pointer"
                onClick={() => {
                  router.push("/login");
                }}
              >
                Đăng nhập
              </div>
            </div>
          </div>
        </div>
      </div>
      {!isTablet && <div className="w-1/3 h-screen bg-right"></div>}
    </div>
  );
};

export default Page;
