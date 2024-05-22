import React from "react";
import "./InfoEducation.scss";
import TimeStamp from "@/util/TimeStamp/TimeStamp";
type Props = {
  dataProfile?: any;
};

const InfoEducation = ({ dataProfile }: Props) => {
  const { handleConvertToDate } = TimeStamp();
  return (
    <div className="pl-[400px] py-16 education">
      <div className="w-fit">
        <p className="text-lg font-bold text-blue-700">Trình độ học vấn</p>
        <div className="h-fit w-full flex justify-center">
          <div
            className="min-h-96 w-1 rounded-lg bg-blue-700 relative"
            style={{
              height: `${300 * dataProfile?.profilesEducations?.length}px`,
            }}
          >
            <div className="absolute inset-0 py-2 flex flex-col gap-y-2">
              {dataProfile?.profilesEducations?.map((dt: any, ikey: any) => {
                if (ikey % 2 === 0) {
                  return (
                    <>
                      <div
                        className="flex gap-x-6 w-fit -translate-x-[6px]"
                        key={ikey}
                      >
                        <div className="w-4 h-4 rounded-full bg-blue-700"></div>
                        <div className="py-2">
                          <div className="bg-blue-500 w-96 h-52  relative rounded-r-lg rounded-b-lg">
                            <div className="arrow-left"></div>
                            <div className="p-4 flex flex-col gap-y-1 text-sm text-white">
                              <p>
                                <span className="font-semibold">
                                  Tên trường:{" "}
                                </span>
                                {dt.companyName}
                              </p>
                              <p>
                                <span className="font-semibold">
                                  Chuyên ngành:{" "}
                                </span>
                                {dt.major}
                              </p>
                              <p>
                                <span className="font-semibold">
                                  Thời gian:{" "}
                                </span>
                                {handleConvertToDate(dt?.startDate)} |{" "}
                                {handleConvertToDate(dt?.endDate)}
                              </p>
                              <p>
                                <span className="font-semibold">
                                  Bằng cấp:{" "}
                                </span>
                                {dt.academicTypeId}
                              </p>
                              <p>
                                <span className="font-semibold">Mô tả: </span>
                                {dt.extraInformation}
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </>
                  );
                } else {
                  return (
                    <>
                      <div
                        className="flex gap-x-6 w-fit -translate-x-[414px]"
                        key={ikey}
                      >
                        <div className="py-2">
                          <div className="bg-blue-500 w-96 h-52  relative rounded-l-lg rounded-b-lg">
                            <div className="arrow-right"></div>
                            <div className="p-4 flex flex-col gap-y-1 text-sm text-white">
                              <p>
                                <span className="font-semibold">
                                  Tên trường:{" "}
                                </span>
                                {dt.companyName}
                              </p>
                              <p>
                                <span className="font-semibold">
                                  Chuyên ngành:{" "}
                                </span>
                                {dt.major}
                              </p>
                              <p>
                                <span className="font-semibold">
                                  Thời gian:{" "}
                                </span>
                                {handleConvertToDate(dt?.startDate)} -{" "}
                                {handleConvertToDate(dt?.endDate)}
                              </p>
                              <p>
                                <span className="font-semibold">
                                  Bằng cấp:{" "}
                                </span>
                                {dt.academicTypeId}
                              </p>
                              <p>
                                <span className="font-semibold">Mô tả: </span>
                                Thuộc
                                {dt.extraInformation}
                              </p>
                            </div>
                          </div>
                        </div>
                        <div className="w-4 h-4 rounded-full bg-blue-700"></div>
                      </div>
                    </>
                  );
                }
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InfoEducation;
