"use client";
import React, { useEffect, useState } from "react";
import "./styles.scss";
import { ArrowUpOutlined } from "@ant-design/icons";
import { Button } from "antd";

const RollTop: React.FC = () => {
  const [height, setHeight] = React.useState(0);
  const [reponsiveMobile, setReponsiveMobile] = useState<boolean>(false);

  const handleRollTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const listenToScroll = (e: any) => {
    const winScroll =
      document.body.scrollTop || document.documentElement.scrollTop;
    setHeight(winScroll);
  };

  React.useEffect(() => {
    window.addEventListener("scroll", listenToScroll);
    return () => window.removeEventListener("scroll", listenToScroll);
  }, []);
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 1350) {
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
      <Button
        className={` ${
          reponsiveMobile
            ? "roll-top-btn-mobile bottom-[60px]"
            : "roll-top-btn bottom-[60px]"
        }`}
        shape="circle"
        icon={<ArrowUpOutlined />}
        onClick={handleRollTop}
        style={
          height > 200
            ? {
                bottom: "60px",
              }
            : {
                bottom: "-60px",
              }
        }
      />
    </div>
  );
};

export default RollTop;
