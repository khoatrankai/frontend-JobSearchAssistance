import React, { ReactNode, useEffect, useRef, useState } from "react";

type Props = {
  children?: ReactNode;
};

const DescriptionHoverProvider = () => {
  const [positionHoverJobX, setPositionHoverJobX] = useState<any>("");
  const [positionHoverJobY, setPositionHoverJobY] = useState<any>("");
  const PositionHoverJob = (
    x: any,
    y: any,
    w: any,
    h: any,
    position: any = 1
  ) => {
    const widthScreen = window.innerWidth / 2;
    const heightScreen = window.innerHeight / 2;
    if (x < widthScreen && y < heightScreen) {
      return [x + position, y + position];
    }
    if (x > widthScreen && y < heightScreen) {
      return [x - w + position, y + position];
    }
    if (x < widthScreen && y > heightScreen) {
      return [x + position, y - h + position];
    }
    return [x - w + position, y - h + position];
  };
  const handleUpdatePosition = (e: any) => {
    const mouseX = e.clientX;
    const mouseY = e.clientY;
    setPositionHoverJobX(PositionHoverJob(mouseX, mouseY, 580, 400, 0)[0]);
    setPositionHoverJobY(PositionHoverJob(mouseX, mouseY, 580, 400, 0)[1]);
  };
  const DescriptionHover = (props: Props) => {
    const { children } = props;
    return (
      <div
        className={` transition-all fixed z-50 border-2 p-4 bg-white rounded-2xl shadow-[0px_4px_16px_rgba(17,17,26,0.1),_0px_8px_24px_rgba(17,17,26,0.1),_0px_16px_56px_rgba(17,17,26,0.1)] `}
        onClick={(e: any) => {
          e.preventDefault();
        }}
        style={{
          width: "580px",
          height: "400px",
          left: `${positionHoverJobX}px`,
          top: `${positionHoverJobY}px`,
        }}
      >
        {children}
      </div>
    );
  };
  return { DescriptionHover, handleUpdatePosition };
};

export default DescriptionHoverProvider;
