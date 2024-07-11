import React from "react";
import "./InfoExperience.scss";
import TimeStamp from "@/util/TimeStamp/TimeStamp";
type Props = {
  dataProfile?: any;
};

const InfoExperience = ({ dataProfile }: Props) => {
  const { handleConvertToDate } = TimeStamp();
  return (
    <div className="pr-[400px] py-16 flex justify-end experience">
      <div className="w-fit">
        <p className="text-lg font-bold text-green-700">Kinh nghiệm làm việc</p>
        <div className="h-fit w-full flex justify-center">
          <div
            className="min-h-96 w-1 rounded-lg bg-green-700 relative"
            style={{
              height: `${300 * dataProfile?.profilesExperiences?.length}px`,
            }}
          >
            <div className="absolute inset-0 py-2 flex flex-col gap-y-2">
              {dataProfile?.profilesExperiences?.map((dt: any, ikey: any) => {
                if (ikey % 2 === 0) {
                  return (
                    <>
                      <div
                        className="flex gap-x-6 w-fit -translate-x-[6px]"
                        key={ikey}
                      >
                        <div className="w-4 h-4 rounded-full bg-green-700"></div>
                        <div className="py-2">
                          <div className="bg-green-500 w-96 h-52  relative rounded-r-lg rounded-b-lg">
                            <div className="arrow-left"></div>
                            <div className="p-4 flex flex-col gap-y-1 text-sm text-white">
                              <p>
                                <span className="font-semibold">
                                  Công ty/Tổ chức:{" "}
                                </span>
                                {dt?.companyName}
                              </p>
                              <p>
                                <span className="font-semibold">Chức vụ: </span>
                                {dt?.title}
                              </p>
                              <p>
                                <span className="font-semibold">
                                  Thời gian:{" "}
                                </span>
                                {handleConvertToDate(dt?.startDate)} |{" "}
                                {handleConvertToDate(dt?.endDate)}
                              </p>
                              <p>
                                <span className="font-semibold">Mô tả: </span>
                                {dt?.extraInformation}
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
                          <div className="bg-green-500 w-96 h-52  relative rounded-l-lg rounded-b-lg">
                            <div className="arrow-right"></div>
                            <div className="p-4 flex flex-col gap-y-1 text-sm text-white">
                              <p>
                                <span className="font-semibold">
                                  Công ty/Tổ chức:{" "}
                                </span>
                                {dt?.companyName}
                              </p>
                              <p>
                                <span className="font-semibold">Chức vụ: </span>
                                {dt?.title}
                              </p>
                              <p>
                                <span className="font-semibold">
                                  Thời gian:{" "}
                                </span>
                                {handleConvertToDate(dt?.startDate)} |{" "}
                                {handleConvertToDate(dt?.endDate)}
                              </p>
                              <p>
                                <span className="font-semibold">Mô tả: </span>
                                Thuộc
                                {dt?.extraInformation}
                              </p>
                            </div>
                          </div>
                        </div>
                        <div className="w-4 h-4 rounded-full bg-green-700"></div>
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

export default InfoExperience;
