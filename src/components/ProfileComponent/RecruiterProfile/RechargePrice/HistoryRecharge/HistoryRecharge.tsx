import packageServiceApi from "@/api/packageService/packageService";
import TimeStamp from "@/util/TimeStamp/TimeStamp";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

type Props = {};

const HistoryRecharge = (props: Props) => {
  const [dataHistory, setDataHistory] = useState<any>([]);
  const router = useRouter();
  const { handleConvertToDate } = TimeStamp();
  const ChangeNumber = (data: any, type = true, typeSpace = ".") => {
    if (!data) {
      return 0;
    }
    if (type) {
      const numberArray = data?.split("");
      if (numberArray.length <= 4) {
        return data;
      }
      const lengthChange = Math.round(numberArray.length / 3 - 1);
      let vt = numberArray.length - (lengthChange * 3 + 1);
      for (let i = 0; i < lengthChange; i++) {
        numberArray.splice(vt, 0, ".");
        vt = vt + 4;
      }
      return numberArray.join("");
    } else {
      const numberArray = data?.split("");
      if (numberArray.length <= 3) {
        return data;
      }
      numberArray.push("");
      const lengthChange = Math.round(numberArray.length / 3 - 1);
      let vt = numberArray.length - (lengthChange * 3 + 1);
      for (let i = 0; i < lengthChange; i++) {
        numberArray.splice(vt, 0, typeSpace);
        vt = vt + 4;
      }
      numberArray.pop();
      return numberArray.join("");
    }
  };
  useEffect(() => {
    const fetchData = async () => {
      const data: any = await packageServiceApi.getHistoryRecharge();
      if (data.status === 200) {
        setDataHistory(data.data);
      }
    };
    fetchData();
  }, []);
  return (
    <div className="flex flex-col gap-y-4">
      <p className="text-2xl font-bold">Lịch sử nạp tiền</p>

      <div className="flex flex-col gap-y-4 py-2 px-4 rounded-md bg-gray-50 overflow-x-scroll">
        <div className="flex gap-x-2 min-w-[1152px]">
          <p className="basis-1/5">Mã Order</p>
          <p className="basis-1/5">Nhà thanh toán</p>
          <p className="basis-1/5">Giá</p>
          <p className="basis-1/5">Ngày nạp</p>
          <p className="basis-1/5">Trạng thái</p>
        </div>
        <div className="flex flex-col gap-y-4 max-h-[315px]  min-w-[1152px] overflow-y-scroll">
          {dataHistory?.map((dt: any, ikey: any) => {
            return (
              <>
                <div className="flex gap-x-2 text-sm font-semibold cursor-pointer  items-center">
                  <p className="basis-1/5">{dt.orderId}</p>

                  <p className="basis-1/5">{dt.description}</p>
                  <p className="basis-1/5">
                    {ChangeNumber(dt.amount.toString(), false, ",")}
                    <span className="text-xs font-semibold">VNĐ</span>
                  </p>
                  <p className="basis-1/5">
                    {handleConvertToDate(dt.createdAt)}
                  </p>

                  <div className="basis-1/5 ">
                    {!dt.status ? (
                      <p className="text-red-500">Thất bại</p>
                    ) : (
                      <p className="text-green-500">Thành công</p>
                    )}
                  </div>
                </div>
              </>
            );
          })}
          {/* {listDataFilter.map((dt: any, index: any) => {
                return (
                  <>
                    <div className="flex gap-x-2 text-sm font-semibold cursor-pointer  items-center">
                      <p className="basis-1/6">{index + 1}</p>
                      <p className="basis-1/6">{dt.name}</p>
                      <p className="basis-1/6">{dt.email}</p>
                      <p className="basis-1/6">{dt.phone}</p>
                      <p className="basis-1/6">{idPost}</p>
                      <div className="basis-1/6 text-xs font-bold">
                        <button
                          className="p-2 rounded-md text-blue-500 hover:underline"
                          onClick={() => {
                            pushBlank(
                              `/recruiter/candidate-detail/${dt.account_id}-POST${idPost}`
                            );
                          }}
                        >
                          Xem chi tiết
                        </button>
                      </div>
                    </div>
                  </>
                );
              })} */}
        </div>
      </div>
    </div>
  );
};

export default HistoryRecharge;
