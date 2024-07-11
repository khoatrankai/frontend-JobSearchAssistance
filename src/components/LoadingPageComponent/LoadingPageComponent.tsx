import Image from "next/image";
import React from "react";
import "./LoadingPageComponent.scss";
type Props = {};

const LoadingPageComponent = (props: Props) => {
  return (
    <div className="flex flex-col justify-center items-center h-screen -translate-y-20">
      <div className="flip-animation-loading absolute">
        <Image
          src={"/logo/2023.png"}
          alt=""
          width={500}
          height={500}
          className="w-56 h-56"
        />
      </div>
      <h2 className="loading-text text-[20vw] font-semibold opacity-10">
        <span className="char">L</span>
        <span className="char">o</span>
        <span className="char">a</span>
        <span className="char">d</span>
        <span className="char">i</span>
        <span className="char">n</span>
        <span className="char">g</span>
      </h2>
    </div>
  );
};

export default LoadingPageComponent;
