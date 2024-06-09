import { useSrollContext } from "@/context/AppProvider";
import { useRouter } from "next/navigation";
import React from "react";
import { FaTrashCan } from "react-icons/fa6";

type Props = {};

const ShowConfirm = (props: Props) => {
  const { callHandleAlert, contentAlert, setContentAlert } = useSrollContext();
  return (
    <div
      className={`bg-black/30 flex justify-center items-center fixed inset-0 z-50 ${
        contentAlert ? "" : "hidden"
      }`}
      onClick={() => {
        setContentAlert();
      }}
    >
      <div
        className=" bg-white rounded-lg p-4 flex flex-col gap-y-6"
        style={{ width: "500px" }}
        onClick={(e: any) => {
          e.stopPropagation();
        }}
      >
        <div className=" flex flex-col gap-y-2">
          <div className="flex justify-between items-center">
            <div className="flex gap-x-4 font-medium text-xl items-center">
              <FaTrashCan className="text-blue-500" />
              <p>{contentAlert?.title} ?</p>
            </div>
          </div>

          <p>{contentAlert?.confirmAgain} ?</p>
        </div>

        <div className="flex gap-x-4 justify-end">
          <button
            className="border-2 rounded-lg px-4 py-2 border-blue-500 text-blue-500 hover:bg-blue-200 "
            onClick={() => {
              setContentAlert();
            }}
          >
            Quay lại
          </button>
          <button
            className="border-2 rounded-lg px-4 py-2 border-blue-500 text-white bg-blue-500 hover:bg-blue-600 hover:border-blue-600"
            onClick={() => {
              setContentAlert();
              callHandleAlert();
            }}
          >
            Tôi chắc chắn
          </button>
        </div>
      </div>
    </div>
  );
};

export default ShowConfirm;
