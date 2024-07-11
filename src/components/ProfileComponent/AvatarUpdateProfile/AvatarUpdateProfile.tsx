import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";
import { FaCamera } from "react-icons/fa";
import imageCompression from "browser-image-compression";
import profileAPi from "@/api/profiles/profileApi";
import ToastCustom from "@/util/ToastCustom";
import { useDispatch } from "react-redux";
import { fetchProfile } from "@/redux/reducer/profileReducer/profileSlice";
type Props = {
  dataInfo: any;
  handleUpdateApi: any;
  checkUpdate: boolean;
};

const AvatarUpdateProfile = ({
  dataInfo,
  handleUpdateApi,
  checkUpdate,
}: Props) => {
  const dispatch = useDispatch();
  const { hdError, hdSuccess } = ToastCustom();
  const ref_inputImg = useRef<any>();
  const [imageAvatar, setImgAvatar] = useState<any>();
  const handleUploadImage = (e: any) => {
    const options = {
      maxSizeMB: 1,
      maxWidthOrHeight: 840,
    };

    const file = e.target.files[0];
    const reader = new FileReader();
    if (file) {
      reader.readAsArrayBuffer(file);
    }
    reader.addEventListener("load", async function () {
      const compressedImages: any = [];
      const compressedImage = await imageCompression(file, options);
      compressedImages.push(
        new File([compressedImage], compressedImage.name, {
          type: compressedImage.type,
        }) as never
      );
      const dataRes: any = await profileAPi.uploadAvatar(compressedImages[0]);
      if (dataRes && dataRes.code === 200) {
        hdSuccess("Cập nhật ảnh đại diện thành công");
        // handleUpSetImage(file);
        dispatch(fetchProfile("vi") as any);
      } else {
        hdError("Cập nhật ảnh đại diện thành công");
      }
    });
  };
  //   const handleUpSetImage = (data: any) => {
  //     const readerImg = new FileReader();
  //     readerImg.readAsDataURL(data);
  //     readerImg.addEventListener("load", function () {
  //       const buffer = readerImg.result;
  //       setImgAvatar(buffer);
  //     });
  //   };
  useEffect(() => {
    console.log(dataInfo);
    setImgAvatar(dataInfo?.avatarPath);
  }, [dataInfo]);
  return (
    <div className="h-64 w-full flex justify-center">
      <div
        className="w-[200px] h-[200px] overflow-hidden rounded-full relative cursor-pointer group"
        onClick={() => {
          ref_inputImg.current.click();
        }}
      >
        <Image
          alt=""
          src={imageAvatar ?? "/goapply.png"}
          height={250}
          width={250}
        />

        <span className="absolute inset-0 hidden justify-center items-center group-hover:bg-black/40 group-hover:flex">
          <FaCamera className="w-8 h-8 text-white" />
        </span>
        <input
          type="file"
          hidden
          ref={ref_inputImg}
          onChange={(e: any) => {
            handleUploadImage(e);
          }}
        />
      </div>
    </div>
  );
};

export default AvatarUpdateProfile;
