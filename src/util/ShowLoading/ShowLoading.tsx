import { useSrollContext } from "@/context/AppProvider";
import { useRouter } from "next/navigation";
import React from "react";
import { FaTrashCan } from "react-icons/fa6";
import "./styles.scss";
import { borderTopLeftRadius } from "html2canvas/dist/types/css/property-descriptors/border-radius";
type Props = {};

const ShowLoading = (props: Props) => {
  const { isLoading, titleIsLoading } = useSrollContext();
  return (
    <div
      className={`fixed overflow-hidden min-h-12 right-0 top-20 bg-black/50 z-50 flex gap-2 items-center duration-500 transition-all ${
        isLoading ? "w-96" : "w-0 opacity-0"
      }`}
      style={{
        transform: "translateY(24px)",
        borderTopLeftRadius: "0.75rem",
        borderBottomLeftRadius: "0.75rem",
      }}
    >
      <div>
        <div className="lds-ring">
          <div></div>
          <div></div>
          <div></div>
          <div></div>
        </div>
      </div>
      <p className="text-white font-bold text-lg">
        {titleIsLoading === "" ? "Vui lòng chờ trong giây lát" : titleIsLoading}
      </p>
    </div>
  );
};

export default ShowLoading;
