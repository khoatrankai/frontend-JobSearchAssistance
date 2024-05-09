/* eslint-disable react-hooks/rules-of-hooks */
import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import axiosClient from "@/configs/axiosClient";

type Props = {
  dataInfo: any;
  handleUpdateApi: any;
  checkUpdate: boolean;
};

const AvatarProfile = (props: Props) => {
  const { dataInfo, handleUpdateApi } = props;
  const [dataImg, setDataImg] = useState<any>(dataInfo?.avatarPath);

  useEffect(() => {
    setDataImg(dataInfo?.companyInfomation?.logoPath);
    console.log(dataInfo);
  }, [dataInfo]);
  return (
    <div className="relative w-fit mb-6">
      <Image
        className={`${dataImg ? "" : ""}w-32 h-32 rounded-full border-2`}
        src={dataImg ?? "/iconuser.svg"}
        width={1000}
        height={1000}
        alt={""}
      />
    </div>
  );
};
export default AvatarProfile;
