import React, { useEffect } from "react";
import Image from "next/image";
import { useSrollContext } from "@/context/AppProvider";
type Props = {
  dataProfile?: any;
};

const InfoCV = ({ dataProfile }: Props) => {
  const { setSoureImage } = useSrollContext();
  useEffect(() => {
    console.log(dataProfile);
  }, [dataProfile]);
  return (
    <div className="py-12 px-8 flex flex-col items-center gap-y-6 justify-center">
      <p className="text-3xl font-bold text-blue-700">CV ứng tuyển</p>
      {dataProfile?.profilesCvs?.map((dt: any) => {
        return (
          <>
            <div
              className="w-[500px] h-[800px] overflow-hidden cursor-pointer border-[1px] transition-all duration-500 hover:shadow-[0_20px_50px_rgba(8,_112,_184,_0.7)] mb-8"
              key={dt?.id}
              onClick={() => {
                setSoureImage(dt.imageURL);
              }}
            >
              <Image src={dt.imageURL} alt="" width={1000} height={2000} />
            </div>
          </>
        );
      })}
    </div>
  );
};

export default InfoCV;
