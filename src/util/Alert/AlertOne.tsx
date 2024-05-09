import { useSrollContext } from "@/context/AppProvider";
import React from "react";
import { FaTrashCan } from "react-icons/fa6";

type Props = {};

const AlertOne = (props: Props) => {
  const { setTabAlert, tabAlert, callHandleAlert } = useSrollContext();
  return (
    <div
      className={`bg-black/30 flex justify-center items-center fixed inset-0 z-50 ${
        tabAlert ? "" : "hidden"
      }`}
    >
      <div
        className=" bg-white rounded-lg p-4 flex flex-col gap-y-6"
        style={{ width: "500px" }}
      >
        <div className=" flex flex-col gap-y-2">
          <div className="flex justify-between items-center">
            <div className="flex gap-x-4 font-medium text-xl items-center">
              <FaTrashCan className="text-blue-500" />
              <p>Xóa trang này ?</p>
            </div>
          </div>

          <p>Bạn có chắc chắn sẽ xóa không ?</p>
        </div>

        <div className="flex gap-x-4 justify-end">
          <button
            className="border-2 rounded-lg px-4 py-2 border-blue-500 text-blue-500 hover:bg-blue-200 "
            onClick={() => {
              setTabAlert(false);
            }}
          >
            Quay lại
          </button>
          <button
            className="border-2 rounded-lg px-4 py-2 border-blue-500 text-white bg-blue-500 hover:bg-blue-600 hover:border-blue-600"
            onClick={() => {
              setTabAlert(false);
              callHandleAlert();
            }}
          >
            Tôi đồng ý
          </button>
        </div>
      </div>
    </div>
  );
};

export default AlertOne;
