"use client";
import React, { useEffect, useState } from "react";
import { Input, Checkbox } from "antd";
import { MdEmail, MdOutlineWifiPassword } from "react-icons/md";
import Button from "@mui/material/Button";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { FaPhoneAlt } from "react-icons/fa";
import { FaAsterisk } from "react-icons/fa";
import "./style.scss";
import { useSelector } from "react-redux";
import { RootState } from "@/redux";
import EditLogoCompanyComponent from "@/components/CompanyComponent/EditLogoCompanyComponent";
import EditAddressCompanyComponent from "@/components/CompanyComponent/EditAddressCompanyComponent";
import ModifyNameTaxComponent from "@/app/recruiter/register/component/RegisterNameTaxComponent/page";
import ModifyEmailPhoneComponent from "@/app/recruiter/register/component/RegisterPhoneMailComponent/page";
import ModifyRoleWebComponent from "@/app/recruiter/register/component/RegisterRoleWebComponent/page";
import ModifyFieldScaleCompany from "@/app/recruiter/register/component/RegisterFieldComponent/page";
import EditDescripeCompanyComponent from "@/components/CompanyComponent/EditDescripeCompanyComponent";
import { CiCircleInfo } from "react-icons/ci";
import apiAccount from "@/api/candidate/apiAccount";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";
import CheckLoginRecruiter from "@/util/CheckLoginRecruiter";

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
  const [dataCompany, setDataCompany] = useState<any | null>({
    name: "",
    address: "",
    companyLocation: "",
    companyRoleInfomation: "",
    companyCategory: "",
    companySizeInfomation: "",
    taxCode: "",
    phone: "",
    email: "",
    website: "",
    description: "",
    logoPath: "",
  });
  const [isClickEmail, setIsClickEmail] = useState(false);
  const [email, setEmail] = useState("");
  const [isClickPassword, setIsClickPassword] = useState(false);
  const [password, setPassword] = useState("");
  const [isClickVerifyPassword, setIsClickVerifyPassword] = useState(false);
  const [verifyPassword, setVerifyPassword] = useState("");
  const [isCheckPolicy, setIsCheckPolicy] = useState(false);
  const languageRedux = useSelector(
    (state: RootState) => state.changeLaguage.language
  );
  const [isSuccess, setIsSuccess] = useState(false);
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

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prevImage) =>
        prevImage === images.length - 1 ? 0 : prevImage + 1
      );
    }, 3000);

    return () => clearInterval(interval);
  }, [currentImage, images.length]);

  const handleRegister = () => {
    const dataRegister = new FormData();
    dataRegister.append("email", email);
    dataRegister.append("password", password);
    dataRegister.append("name", dataCompany.name);
    dataCompany.taxCode && dataRegister.append("taxCode", dataCompany.taxCode);
    dataRegister.append("companyRoleId", dataCompany.companyRoleInfomation.id);
    dataRegister.append("website", dataCompany.website);
    dataRegister.append("phone", dataCompany.phone);
    dataRegister.append("wardId", dataCompany.companyLocation.id);
    dataRegister.append("address", dataCompany.address);
    dataRegister.append("categoryId", dataCompany.companyCategory.id);
    dataRegister.append("companySizeId", dataCompany.companySizeInfomation.id);
    dataRegister.append("description", dataCompany.description);
    dataRegister.append("logoFile", dataCompany.logoPath);
    dataRegister.append("latitude", dataCompany.latitude);
    dataRegister.append("longitude", dataCompany.longitude);
    const fetchResgiter = async () => {
      const response = await apiAccount.recruiterSignUp(dataRegister);

      if (response && response.status === 201) {
        toast.success("Đăng ký tài khoản thành công", {
          position: "bottom-center",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        setIsSuccess(true);

        setTimeout(() => {
          router.push("/recruiter/login");
        }, 5000);
      } else {
        toast.error("Đăng ký tài khoản thất bại", {
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
    fetchResgiter();
  };

  return (
    <div className="flex bg-gray-100">
      <div
        className={
          isTablet
            ? "w-full p-4 flex items-center justify-center overflow-y-auto"
            : "w-2/3 p-4 flex items-center justify-center overflow-y-scroll"
        }
      >
        <div
          className={
            isMobile ? "w-full rounded-lg p-3" : "w-3/5 rounded-lg p-3"
          }
        >
          <div className="header mb-6 flex flex-col gap-1">
            <img src="/logo/2025.png" alt="logo" width={170} height={170} />
            <h1 className="text-2xl font-bold">
              Đăng ký tài khoản Nhà tuyển dụng
            </h1>
            <p className="text-gray-600">
              Cùng tạo dựng lợi thế cho doanh nghiệp bằng trải nghiệm công nghệ
              tuyển dụng ứng dụng sâu AI & Hiring Funnel
            </p>
          </div>
          <div className="policy">
            <div className="basic regulations">Quy định</div>
            <div className="flex flex-col gap-4">
              <div className="basic">
                Để đảm bảo chất lượng dịch vụ, JOBS{" "}
                <span className="text-red-color">
                  không cho phép một người dùng tạo nhiều tài khoản khác nhau.
                </span>
              </div>
              <div className="basic text-justify">
                Nếu phát hiện vi phạm, JOBS sẽ ngừng cung cấp dịch vụ tới tất cả
                các tài khoản trùng lặp hoặc chặn toàn bộ truy cập tới hệ thống
                website của JOBS. Đối với trường hợp khách hàng đã sử dụng hết 3
                tin tuyển dụng miễn phí, JOBS hỗ trợ kích hoạt đăng tin tuyển
                dụng không giới hạn sau khi quý doanh nghiệp cung cấp thông tin
                giấy phép kinh doanh.
              </div>
              <div className="basic">
                Mọi thắc mắc vui lòng liên hệ Hotline CSKH:
              </div>
              <div className="basic flex gap-1 items-center">
                <FaPhoneAlt className="text-[#00b14f]" />
                <span className="text-[#00b14f]">1900 636 299</span>
              </div>
            </div>
          </div>
          <div className="login">
            <div className="email">
              <div className="flex mb-1 gap-1">
                <label>Email</label>
                <FaAsterisk className="asterisk" />
              </div>

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
              </div>
              {isClickEmail && email === "" && (
                <div>
                  <div className="text-red-700 text-sm mb-3">
                    Vui lòng nhập email
                  </div>
                </div>
              )}
              <div className="basic mt-3 text-red-color text-justify">
                Trường hợp bạn đăng ký tài khoản bằng email không phải email tên
                miền công ty, một số dịch vụ trên tài khoản có thể sẽ bị giới
                hạn quyền mua hoặc sử dụng.
              </div>
            </div>
            <div className="password">
              <div className="flex mb-1 gap-1 mt-3">
                <label>Mật khẩu:</label>
                <FaAsterisk className="asterisk" />
              </div>

              <div className="mb-3">
                <Input.Password
                  onClick={() => {
                    setIsClickPassword(true);
                  }}
                  status={isClickPassword && password === "" ? "error" : ""}
                  onChange={(e) => {
                    setPassword(e.target.value);
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

              {isClickPassword && password === "" && (
                <div className="text-red-700 text-sm mb-3">
                  Vui lòng nhập mật khẩu
                </div>
              )}
            </div>

            <div className="verify-password">
              <div className="flex mb-1 gap-1 mt-3">
                <label>Xác nhận mật khẩu:</label>
                <FaAsterisk className="asterisk" />
              </div>

              <div className="mb-3">
                <Input.Password
                  onClick={() => {
                    setIsClickVerifyPassword(true);
                  }}
                  onChange={(e) => {
                    setVerifyPassword(e.target.value);
                  }}
                  status={
                    isClickVerifyPassword && verifyPassword === ""
                      ? "error"
                      : ""
                  }
                  size="large"
                  placeholder="Xác nhận mật khẩu"
                  prefix={
                    <span style={{ marginRight: "8px" }}>
                      <MdOutlineWifiPassword />
                    </span>
                  }
                />
                {isClickVerifyPassword && verifyPassword === "" && (
                  <div className="text-red-700 text-sm mb-3">
                    Vui lòng xác nhận mật khẩu
                  </div>
                )}
                {verifyPassword !== password && (
                  <div className="text-red-700 text-sm mb-3">
                    Mật khẩu không trùng khớp
                  </div>
                )}
              </div>
            </div>
            <div className="mt-3 flex flex-col gap-2">
              <div className="text-info-employer">Thông tin nhà tuyển dụng</div>
              <EditLogoCompanyComponent
                dataCompany={dataCompany}
                setDataCompany={setDataCompany}
                is_profile={false}
                language={languageRedux}
              />
              <ModifyNameTaxComponent
                dataCompany={dataCompany}
                setDataCompany={setDataCompany}
                is_profile={false}
              />
              <ModifyRoleWebComponent
                dataCompany={dataCompany}
                setDataCompany={setDataCompany}
                is_profile={false}
              />
              <ModifyEmailPhoneComponent
                dataCompany={dataCompany}
                setDataCompany={setDataCompany}
                is_profile={false}
              />
              <EditAddressCompanyComponent
                dataCompany={dataCompany}
                setDataCompany={setDataCompany}
                is_profile={false}
              />
              <ModifyFieldScaleCompany
                dataCompany={dataCompany}
                setDataCompany={setDataCompany}
                is_profile={false}
              />
              <EditDescripeCompanyComponent
                dataCompany={dataCompany}
                setDataCompany={setDataCompany}
                is_profile={false}
              />
            </div>
            <div className="flex gap-2 mt-3 items-center">
              <Checkbox
                onChange={(e) => {
                  setIsCheckPolicy(e.target.checked);
                }}
                className="checkbox"
                style={{ color: "#ffcc00" }}
              ></Checkbox>
              <div className="basic">
                Tôi đã đọc và đồng ý với các điều khoản sử dụng của JOBS
              </div>
            </div>
            {isSuccess && (
              <div className="text-green-700 text-sm mb-3">
                Đăng ký tài khoản thành công quay lại trang đăng nhập sau 10s
              </div>
            )}
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
              disabled={
                !isCheckPolicy ||
                email === "" ||
                password === "" ||
                verifyPassword === "" ||
                verifyPassword !== password ||
                dataCompany.name === "" ||
                dataCompany.companyRoleInfomation === "" ||
                dataCompany.website === "" ||
                dataCompany.phone === "" ||
                dataCompany.address === "" ||
                dataCompany.companyLocation === "" ||
                dataCompany.companyCategory === "" ||
                dataCompany.companySizeInfomation === "" ||
                dataCompany.description === "" ||
                dataCompany.logoPath === ""
              }
              onClick={handleRegister}
            >
              Hoàn tất
            </Button>
            <div className="mt-3 justify-center flex">
              <div className="basic text-[#6f7882]">
                Bạn đã có tài khoản?{" "}
                <span
                  className="text-[#00b14f] cursor-pointer"
                  onClick={() => {
                    router.push("/recruiter/login");
                  }}
                >
                  Đăng nhập
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
      {!isTablet && (
        <div className="w-1/3 h-full">
          <div className="fixed inset-y-0 right-0 left-2/3">
            {images.map((image, index) => (
              <motion.div
                key={image.id}
                className={`h-full flex bg-right ${
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
        </div>
      )}
    </div>
  );
};

export default Page;
