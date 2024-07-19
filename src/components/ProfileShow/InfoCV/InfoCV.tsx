import React, { useEffect } from "react";
import Image from "next/image";
import { useSrollContext } from "@/context/AppProvider";
type Props = {
  dataProfile?: any;
  dataApply?: any;
};

const InfoCV = ({ dataProfile, dataApply }: Props) => {
  const { setSoureImage } = useSrollContext();
  useEffect(() => {
    console.log(dataProfile);
  }, [dataProfile]);
  return (
    <>
      {dataApply ? (
        <div className="py-12 px-8 flex flex-col items-center gap-y-6 justify-center">
          <p className="text-3xl font-bold text-blue-700">CV ứng tuyển</p>

          <>
            <div
              className="w-[500px] h-[800px] overflow-hidden cursor-pointer border-[1px] transition-all duration-500 hover:shadow-[0_20px_50px_rgba(8,_112,_184,_0.7)] mb-8"
              onClick={() => {
                setSoureImage(dataApply?.applicationProfile?.image_url);
              }}
            >
              <Image
                src={dataApply?.applicationProfile?.image_url}
                alt=""
                width={1000}
                height={2000}
              />
            </div>
          </>
        </div>
      ) : (
        <div className="py-12 px-8 flex flex-col items-center gap-y-6 justify-center">
          <p className="text-3xl font-bold text-blue-700">CV ứng viên</p>
          {dataProfile?.profilesCvs?.map((dt: any) => {
            if (dt?.status === 1) {
              return (
                <>
                  <div
                    className="w-[500px] h-[800px] overflow-hidden cursor-pointer border-[1px] transition-all duration-500 hover:shadow-[0_20px_50px_rgba(8,_112,_184,_0.7)] mb-8"
                    key={dt?.id}
                    onClick={() => {
                      setSoureImage(dt.imageURL);
                    }}
                  >
                    <Image
                      src={dt.imageURL}
                      alt=""
                      width={1000}
                      height={2000}
                    />
                  </div>
                </>
              );
            }
          })}
        </div>
      )}
    </>
  );
};

export default InfoCV;
