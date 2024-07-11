import React from "react";
import "./InfoAward.scss";
type Props = {
  dataProfile?: any;
};

const InfoAward = ({ dataProfile }: Props) => {
  return (
    <div className="pl-[400px] py-16 award">
      <div className="w-fit">
        <p className="text-lg font-bold text-yellow-700">Các giải thưởng</p>
        <div className="h-fit w-full flex justify-center">
          <div
            className="min-h-96 w-1 rounded-lg bg-yellow-700 relative"
            style={{
              height: `${300 * dataProfile?.profileAwards?.length}px`,
            }}
          >
            <div className="absolute inset-0 py-2 flex flex-col gap-y-2">
              {dataProfile?.profileAwards?.map((dt: any, ikey: any) => {
                if (ikey % 2 === 0) {
                  return (
                    <>
                      <div
                        className="flex gap-x-6 w-fit -translate-x-[6px]"
                        key={ikey}
                      >
                        <div className="w-4 h-4 rounded-full bg-yellow-700"></div>
                        <div className="py-2">
                          <div className="bg-yellow-500 w-96 h-52  relative rounded-r-lg rounded-b-lg">
                            <div className="arrow-left bg-yellow-500"></div>
                            <div className="p-4 flex flex-col gap-y-1 text-sm text-white">
                              <p>
                                <span className="font-semibold">
                                  Tên giải:{" "}
                                </span>
                                {dt.title}
                              </p>
                              <p>
                                <span className="font-semibold">Mô tả: </span>
                                {dt.description}
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
                          <div className="bg-yellow-500 w-96 h-52  relative rounded-l-lg rounded-b-lg">
                            <div className="arrow-right bg-yellow-500"></div>
                            <div className="p-4 flex flex-col gap-y-1 text-sm text-white">
                              <p>
                                <span className="font-semibold">
                                  Tên giải:{" "}
                                </span>
                                {dt.title}
                              </p>
                              <p>
                                <span className="font-semibold">Mô tả: </span>
                                {dt.description}
                              </p>
                            </div>
                          </div>
                        </div>
                        <div className="w-4 h-4 rounded-full bg-yellow-700"></div>
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

export default InfoAward;
