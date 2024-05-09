"use client";
import React, { useEffect, useState } from "react";
import { Input, Space } from "antd";
import { MdEmail, MdOutlineWifiPassword } from "react-icons/md";
import Button from "@mui/material/Button";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { CiCircleInfo } from "react-icons/ci";
import "./style.scss";
import { IoIosArrowBack } from "react-icons/io";
import signInEmailApi from "@/api/authApi";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch } from "react-redux";
import { fetchProfileRecruiter } from "@/redux/reducer/profileReducer/profileSliceRecruiter";
import CheckLoginRecruiter from "@/util/CheckLoginRecruiter";

interface IReponseSignInRecruiter {
  code: number;
  data: any;
}

interface AuthReponse {
  accountId: string | null;
  accessToken: string | null;
  refreshToken: string | null;
}

const Page = () => {
  CheckLoginRecruiter();
  const images = [
    {
      id: 1,
      src: "https://res.cloudinary.com/ddwjnjssj/image/upload/v1709741967/images/banners/tde00h9gzlhdax3skc7m.jpg",
    },
    {
      id: 2,
      src: "https://res.cloudinary.com/ddwjnjssj/image/upload/v1709741789/images/banners/oz7qggoyn5oyoxquq9x3.jpg",
    },
  ];
  const [isMobile, setIsMobile] = useState(false);
  const [isTablet, setIsTablet] = useState(false);
  const [currentImage, setCurrentImage] = useState(0);
  const [isCheckPassword, setIsCheckPassword] = useState(false);
  const [isClickEmail, setIsClickEmail] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();
  const [isError, setIsError] = useState(false);
  const dispatch = useDispatch();

  const fetchDataProfile = async (auth: AuthReponse) => {
    localStorage.setItem(
      "accountIdRecruiter",
      auth && auth.accountId ? auth.accountId : ""
    );
    localStorage.setItem(
      "accessTokenRecruiter",
      auth && auth.accessToken ? auth.accessToken : ""
    );
    localStorage.setItem(
      "refreshTokenRecruiter",
      auth && auth.refreshToken ? auth.refreshToken : ""
    );

    dispatch(fetchProfileRecruiter("vi") as any);
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

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prevImage) =>
        prevImage === images.length - 1 ? 0 : prevImage + 1
      );
    }, 3000);

    return () => clearInterval(interval);
  }, [currentImage, images.length]);

  const handleLogin = async () => {
    const fetchLogin = async () => {
      try {
        const response = (await signInEmailApi.signInRecruit(
          email,
          password
        )) as any as IReponseSignInRecruiter;

        if (response && response.code === 200) {
          toast.success("Đăng nhập thành công chuyển về trang chủ sau 10s", {
            position: "bottom-center",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
          fetchDataProfile(response.data);

          setTimeout(() => {
            router.push("/recruiter");
          }, 5000);
        } else {
          setIsError(true);
        }
      } catch (error) {
        setIsError(true);
        toast.error("Email hoặc mật khẩu không đúng", {
          position: "bottom-center",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      }
    };

    fetchLogin();
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
              router.push("/recruiter");
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
              Cùng tạo dựng lợi thế cho doanh nghiệp bằng trải nghiệm công nghệ
              tuyển dụng ứng dụng sâu AI & Hiring Funnel
            </p>
          </div>
          {isError && (
            <div className="text-red-700 text-sm mb-3">
              Email hoặc mật khẩu không đúng
            </div>
          )}
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
                suffix={
                  isClickEmail && email === "" ? (
                    <CiCircleInfo className="text-red-700" />
                  ) : (
                    ""
                  )
                }
                prefix={
                  <span style={{ marginRight: "8px" }}>
                    <MdEmail />
                  </span>
                }
              />
            </div>
            {isClickEmail && email === "" && (
              <div className="text-red-700 text-sm mb-3">
                Vui lòng nhập email
              </div>
            )}
            <label className="block mb-1">Mật khẩu:</label>
            <div className="mb-3">
              <Input.Password
                onClick={() => {
                  setIsCheckPassword(true);
                }}
                status={isCheckPassword && password === "" ? "error" : ""}
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    if (email == "" && password == "") {
                      setIsError(true);
                    } else {
                      handleLogin();
                    }
                  }
                }}
                size="large"
                placeholder="Mật khẩu"
                prefix={
                  <span style={{ marginRight: "8px" }}>
                    <MdOutlineWifiPassword />
                  </span>
                }
              />
            </div>
            {isCheckPassword && password === "" && (
              <div className="text-red-700 text-sm mb-3">
                Vui lòng nhập mật khẩu
              </div>
            )}
            <p
              className="text-blue-500 hover:underline cursor-pointer text-right basic"
              onClick={() => {
                router.push("/recruiter/forgot-password");
              }}
            >
              Quên mật khẩu?
            </p>
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
                handleLogin();
              }}
            >
              Đăng nhập
            </Button>
            <div className="mt-3 justify-center flex">
              <div className="basic text-[#6f7882]">Bạn chưa có tài khoản?</div>
              <div
                className="basic register cursor-pointer"
                onClick={() => {
                  router.push("/recruiter/register");
                }}
              >
                Đăng ký
              </div>
            </div>
          </div>
        </div>
      </div>
      {!isTablet &&
        images.map((image, index) => (
          <motion.div
            key={image.id}
            className={`w-1/3 h-screen bg-right ${
              index === currentImage ? "visible" : "hidden"
            }`}
            animate={{ x: 0 }}
            initial={{ x: index === 0 ? 0 : -1000 }}
            transition={{ duration: 1 }}
          >
            <img src={image.src} alt={`Image ${image.id}`} />
          </motion.div>
        ))}
    </div>
  );
};

export default Page;
