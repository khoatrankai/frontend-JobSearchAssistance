"use client";
import React, { useState, useEffect } from "react";
import { ArrowUpOutlined } from "@ant-design/icons";
import { Button } from "antd";
import "./styles.scss";
import { useRouter } from "next/navigation";
import SmartToyIcon from "@mui/icons-material/SmartToy";

const RollTop: React.FC = () => {
  const [showButton, setShowButton] = useState(true);
  const [reponsiveMobile, setReponsiveMobile] = useState<boolean>(false);

  const router = useRouter();
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 480) {
        setReponsiveMobile(true);
      } else {
        setReponsiveMobile(false);
      }
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  return (
    <div className="roll-top-container">
      {showButton && (
        <Button
          className={` ${
            reponsiveMobile
              ? "roll-chat-btn-mobile bottom-[125px]"
              : "roll-chat-btn bottom-[130px]"
          }`}
          shape="circle"
          icon={<SmartToyIcon />}
          onClick={() => {
            router.push("/chat-bot");
          }}
        />
      )}
    </div>
  );
};

export default RollTop;
