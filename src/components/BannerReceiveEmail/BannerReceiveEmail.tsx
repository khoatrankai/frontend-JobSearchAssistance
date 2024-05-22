import { useSrollContext } from "@/context/AppProvider";
import Image from "next/image";
import React, { useState } from "react";
import ReactPlayer from "react-player";

type Props = {};

const BannerReceiveEmail = (props: Props) => {
  const [email, setEmail] = useState<any>("");
  const { reponsiveMobile } = useSrollContext();
  const handleSendEmail = () => {
    const formData = new FormData();
    formData.append("Email", email);
    const scriptURL =
      "https://script.google.com/macros/s/AKfycbxrCNlIw4Af0ng1DyyXWKhC_fZR-PRtK4GWRwyb8LjBp4BR9Fg9htcxWepGWN9NVAbE/exec";

    fetch(scriptURL, { method: "POST", body: formData })
      .then((response) =>
        alert("Thanks for contacting me. I will get back to you soon.")
      )
      .catch((error) => console.error("Error!", error.message));
  };
  return (
    <div className="w-full h-96 flex justify-center items-center bg-black/80 px-5">
      <div className="max-w-6xl flex flex-col items-center gap-y-6">
        <p
          className={` font-bold text-white ${
            reponsiveMobile < 800 ? "text-xl" : "text-3xl"
          }`}
        >
          Để lại email của bạn để chúng tôi có thể gửi bạn những offer công việc
          hấp dẫn
        </p>
        <div className="bg-white/80 p-2 w-fit pl-4 flex gap-x-4 h-14 rounded-lg">
          <input
            className={` bg-transparent  outline-none ${
              reponsiveMobile < 580 ? "w-72" : "w-96"
            }`}
            placeholder="Nhập địa chỉ email của bạn"
            value={email}
            onChange={(e: any) => {
              setEmail(e.target.value);
            }}
          />
          <button
            className={`uppercase p-2 rounded-lg font-semibold bg-blue-500/80 w-fit hover:text-white ${
              reponsiveMobile < 800 ? "text-xs" : "text-sm"
            }`}
            onClick={handleSendEmail}
          >
            Đăng ký ngay
          </button>
        </div>
      </div>
    </div>
  );
};

export default BannerReceiveEmail;
