/* eslint-disable @next/next/no-img-element */
/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-hooks/rules-of-hooks */
"use client";
import "./page.scss";
import { useSrollContext } from "@/context/AppProvider";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import imageCompression from "browser-image-compression";
import EditIcon from "@mui/icons-material/Edit";
import { useRouter } from "next/navigation";
import ReplyIcon from "@mui/icons-material/Reply";
import DeleteIcon from "@mui/icons-material/Delete";
import StarIcon from "@mui/icons-material/Star";
import DownloadIcon from "@mui/icons-material/Download";
import AddIcon from "@mui/icons-material/Add";
import profileCvsApi from "@/api/profileCvs/profileCvsApi";
import { fetchProfile } from "@/redux/reducer/profileReducer/profileSlice";
import { Button, Modal } from "antd";
import { PDFDownloadLink } from "@react-pdf/renderer";
import CheckPageLogin from "@/util/CheckPageLogin";

import LightGallery from "lightgallery/react";
import lgZoom from "lightgallery/plugins/zoom";
import lgThumbnail from "lightgallery/plugins/thumbnail";
import { LightGallery as ILightGallery } from "lightgallery/lightgallery";
import CustomLightImage from "@/util/CustomLightImage/CustomLightImage";
import { IoCopy } from "react-icons/io5";
import { MdOutlineDriveFolderUpload, MdUploadFile } from "react-icons/md";
import Image from "next/image";
import { IoMdDownload } from "react-icons/io";
import cvsApi from "@/api/cvs";
import CookieCustom from "@/util/CookieCustom";
import { createDocument } from "@/util/CreateDocs";
import axiosClient from "@/configs/axiosClient";
import { SiDocsdotrs } from "react-icons/si";
import ToastCustom from "@/util/ToastCustom";

type Props = {};

interface IDeleteProfileCv {
  statusCode: number;
  message: string;
}

const page = (props: Props) => {
  const { hdSuccess, hdError } = ToastCustom();
  CheckPageLogin();
  const { handleLoadHrefPage, setSoureImage, reponsiveMobile } =
    useSrollContext();
  const { setCookieCustom } = CookieCustom();
  const handleConvertDataDocs = (data: any) => {
    const newData = Object.keys(data).map((dt: any) => {
      if (dt === "info_person") {
        return { type: dt, ...data[dt], moreCvInformations: [] };
      }
      if (dt === "info_project") {
        return { type: dt, moreCvProjects: data[dt] };
      }
      return { type: dt, moreCvExtraInformations: data[dt] };
    });
    return newData;
  };
  const language = useSelector((state: any) => state.changeLaguage.language);
  const profile = useSelector((state: any) => state.profile.profile);
  const [profileCV, setProfileCV] = React.useState<any>([]);
  const [tabUploadDocs, setTabUploadDocs] = useState<boolean>(false);
  const [openModalConfirmDelete, setOpenModalConfirmDelete] =
    React.useState<boolean>(false);
  const router = useRouter();
  const dispatch = useDispatch();
  const [idDelete, setIdDelete] = React.useState<number>(0);
  const [statusDrag, setStatusDrag] = useState<boolean>(false);
  const [templateChoose, setTemplateChoose] = useState<any>(0);
  const [isLoadingDocs, setIsLoadingDocs] = useState<boolean>(false);
  const refInputCV = useRef<any>();
  const [dataDocShow, setDataDocShow] = useState<any>();
  const [typeTemplate, setTypeTemplate] = useState<any>([
    { id: 0 },
    { id: 1 },
    { id: 2 },
    { id: 3 },
    { id: 4 },
    { id: 5 },
    { id: 6 },
    { id: 8 },
    { id: 9 },
    { id: 7 },
    { id: 10 },
    { id: 11 },
    { id: 12 },
    { id: 13 },
    { id: 14 },
  ]);
  const [openModalConfirmPushTop, setOpenModalConfirmPushTop] =
    React.useState<boolean>(false);
  const handleCloseModal = () => {
    setOpenModalConfirmDelete(false);
  };
  const handleCloseModalPushTop = () => {
    setOpenModalConfirmPushTop(false);
  };
  const handleUploadImage = (file: any) => {};
  const [idPushTop, setIdPushTop] = React.useState<number>(0);
  const [openModalConfirmHideCV, setOpenModalConfirmHideCv] =
    React.useState<boolean>(false);
  useEffect(() => {
    setProfileCV(profile.profilesCvs);
    // //console.log(profile);
  }, [profile]);

  const handleUpLoadDocs = async (e: any) => {
    const dataFile = e.target.files?.[0] || e.dataTransfer?.files?.[0];
    if (dataFile) {
      setStatusDrag(false);
      setIsLoadingDocs(true);
      const res = await cvsApi.cvDocs(dataFile);
      if (res && res.statusCode === 200) {
        setIsLoadingDocs(false);
        setDataDocShow(handleConvertDataDocs(res.data));
        setCookieCustom("cvsDocs", res.data);
      }
    }
    // handleUploadImage(dataFile);
  };
  const handleDeleteCv = (id: number) => {
    const fetchData = async () => {
      const res = (await profileCvsApi.deleteCvs([
        id,
      ])) as unknown as IDeleteProfileCv;

      if (res && res.statusCode === 200) {
        hdSuccess("Xoá CV thành công");
        setOpenModalConfirmDelete(false);
        dispatch(fetchProfile(language ? "vi" : "en") as any);
      } else {
        hdError("Xóa CV thất bại");
      }
    };

    fetchData();
  };

  const handlePushTop = (id: number) => {
    const fetchData = async () => {
      const res = (await profileCvsApi.pushTopCv(
        id
      )) as unknown as IDeleteProfileCv;

      if (res && res.statusCode === 200) {
        dispatch(fetchProfile(language ? "vi" : "en") as any);
      }
      setOpenModalConfirmPushTop(false);
    };

    fetchData();
  };

  const handleHideCV = (id: number) => {
    const fetchData = async () => {
      const res = (await profileCvsApi.hideCV()) as unknown as IDeleteProfileCv;

      if (res && res.statusCode === 200) {
        dispatch(fetchProfile(language ? "vi" : "en") as any);
      }
      setOpenModalConfirmHideCv(false);
    };

    fetchData();
  };
  const fetchData = async (cvIndex: any) => {
    const res = (await axiosClient.get(
      `https://lending-advantage-pale-xp.trycloudflare.com/api/v3/cv-extra-information/?cvIndex=${cvIndex}`
    )) as unknown as any;
    const res2 = (await axiosClient.get(
      `https://lending-advantage-pale-xp.trycloudflare.com/api/v3/cv-project/?cvIndex=${cvIndex}`
    )) as unknown as any;
    const res3 = (await axiosClient.get(
      `https://lending-advantage-pale-xp.trycloudflare.com/api/v3/cv-information/?cvIndex=${cvIndex}`
    )) as unknown as any;
    const res4 = (await axiosClient.get(
      `https://lending-advantage-pale-xp.trycloudflare.com/api/v3/cv-layout/?cvIndex=${cvIndex}`
    )) as unknown as any;
    const dataNew = [...res.data, ...res2.data, res3.data];
    //console.log(res, res2, res3, res4, profile, cvNew);

    return dataNew;
  };
  return (
    <div className=" flex min-h-[89.5vh] py-16 bg-[#f0f0f0] flex-col items-center gap-8 px-4">
      <div className="w-full max-w-6xl h-[45vw] max-h-64 bg-blue-400 rounded-xl flex items-center justify-between relative">
        <div className="flex flex-col pl-12 justify-center">
          <p
            className={`font-semibold  ${
              reponsiveMobile < 560 ? "text-xl" : "text-2xl"
            }`}
          >
            <span className="font-bold">"Bạn đã có CV chưa?"</span>
          </p>
          <p
            className={`font-medium ${reponsiveMobile < 560 ? "text-sm" : ""}`}
          >
            Nếu chưa hãy mau mau tạo ngay để nhà tuyển dụng biết hơn về tài năng
            của bạn !
          </p>
        </div>
        <div className="p-4 -translate-y-5 relative">
          <img
            className="max-h-96 max-w-96 w-[40vw] h-[40vw]"
            src="/icon-cv/work-pikbest.png"
          />
          <div className="bg-white rounded-full absolute top-[238px] left-[114px] z-10 icon-bg-manage">
            <img className="w-8" src="/logo/2025.png" />
          </div>
        </div>
      </div>
      <div className="w-full max-w-6xl rounded-xl">
        <div className="bg-[#fff] h-fit flex flex-col p-5 rounded-xl gap-2">
          <div className="flex flex-wrap justify-between gap-2">
            <div className="text-2xl font-bold">
              {language === 1 ? "CV đã tạo trên Jobs" : "CV created on Jobs"}
            </div>
            <div className="flex gap-2">
              <div
                className="flex items-center w-fit h-hit bg-blue-500"
                style={{
                  borderRadius: "32px",
                  padding: "5px 10px",
                }}
              >
                <MdOutlineDriveFolderUpload className="text-white" />
                <div
                  className="text-white cursor-pointer"
                  onClick={() => {
                    setTabUploadDocs(true);
                  }}
                >
                  {language === 1 ? "Tải tài liệu" : "Upload CV"}
                </div>
              </div>
              <div
                className="flex items-center w-fit h-hit"
                style={{
                  backgroundColor: "#00b14f",
                  borderRadius: "32px",
                  padding: "5px 10px",
                }}
              >
                <AddIcon
                  sx={{
                    color: "#fff",
                  }}
                />
                <div
                  className="text-white cursor-pointer"
                  onClick={() => {
                    router.push("/cv-all");
                  }}
                >
                  {language === 1 ? "Tạo CV mới" : "Create new CV"}
                </div>
              </div>
            </div>
          </div>
          <div className="text-sm italic">
            {language === 1
              ? `Tổng số: ${profileCV?.length ?? 0} CV`
              : `Total: ${profileCV?.length ?? 0} CV`}
          </div>
          <div className="inline-flex flex-wrap w-full gap-2 justify-around my-5">
            {profileCV &&
              profileCV.length > 0 &&
              profileCV.map((item: any, index: number) => {
                return (
                  <div
                    className="flex flex-col w-1/2 h-fit min-w-[220px] max-w-[440px] mt-10"
                    key={index}
                  >
                    <div
                      className="h-96 relative overflow-hidden border-[1px] border-gray-300 rounded-md group"
                      onClick={() => {
                        setSoureImage(item?.imageURL);
                      }}
                    >
                      <img
                        src={item.imageURL}
                        alt=""
                        className="w-full group-hover:scale-105 transition-all duration-500"
                        onError={(e: any) => {
                          e.target.onerror = null;
                          e.target.src = "https://via.placeholder.com/150";
                        }}
                      />
                      {/* <CustomLightImage src={item.imageURL}/> */}

                      <div>
                        <div className="absolute top-2 right-2">
                          {item.status === 1 && (
                            <div className="bg-[#212f3f] text-white rounded-lg p-1 flex gap-1 text-sm items-center">
                              <div>
                                <StarIcon
                                  sx={{
                                    color: "blue",
                                    fontSize: "14px",
                                  }}
                                />
                              </div>
                              <div>
                                {language === 1 ? "CV chính" : "Main CV"}
                              </div>
                            </div>
                          )}
                        </div>

                        <div className="absolute bottom-2 flex gap-2 items-center w-full justify-center flex-wrap">
                          <div
                            className="flex gap-2 rounded-lg p-1 items-center w-fit cursor-pointer"
                            style={{
                              backgroundColor: "rgba(0, 16, 0, 0.3)",
                            }}
                          >
                            <div>
                              <ReplyIcon
                                sx={{
                                  color: "#fff",
                                  fontSize: "14px",
                                }}
                              />
                            </div>
                            <div
                              className="text-[#fff] text-sm"
                              onClick={(e: any) => {
                                e.stopPropagation();

                                if (item.status === 0) {
                                  {
                                    setOpenModalConfirmPushTop(true);
                                    setIdPushTop(item.id);
                                  }
                                } else {
                                  {
                                    setOpenModalConfirmHideCv(true);
                                    setIdPushTop(item.id);
                                  }
                                }
                              }}
                            >
                              {item.status === 1
                                ? language === 1
                                  ? "Ẩn CV"
                                  : "Hide CV"
                                : language === 1
                                ? "Đặt CV chính"
                                : "Set main CV"}
                            </div>
                          </div>
                          <div
                            className="flex gap-2 rounded-lg p-1 items-center w-fit cursor-pointer"
                            style={{
                              backgroundColor: "rgba(0, 16, 0, 0.3)",
                            }}
                            about="Tải CV xuống"
                          >
                            <div>
                              <DownloadIcon
                                sx={{
                                  color: "#fff",
                                  fontSize: "14px",
                                }}
                              />
                            </div>
                            <div
                              className="text-[#fff] text-sm w-fit cursor-pointer"
                              onClick={(e: any) => {
                                e.stopPropagation();
                                window.open(item.pdfURL, "_blank");
                              }}
                            >
                              {language === 1 ? "Tải xuống" : "Download"}
                            </div>
                          </div>
                          <div
                            className="cursor-pointer"
                            about="Tạo lại theo CV"
                            onClick={(e: any) => {
                              e.stopPropagation();
                              window.open(
                                `/cv/create-v2/create-back/${item.cvIndex}`,
                                "_blank"
                              );
                            }}
                          >
                            <IoCopy className="text-black text-2xl" />
                          </div>
                          <div
                            className="cursor-pointer"
                            onClick={async (e: any) => {
                              e.stopPropagation();
                              const res = await fetchData(item?.cvIndex);
                              if (res) {
                                createDocument(res);
                              }
                              // router.push(
                              //   `/cv/create-v2/create-back/${item.cvIndex}`
                              // );
                            }}
                            about="Tải file tái tạo"
                          >
                            <SiDocsdotrs className="text-black text-2xl" />
                          </div>
                          <div
                            onClick={(e: any) => {
                              e.stopPropagation();
                              setIdDelete(item.id);
                              setOpenModalConfirmDelete(true);
                            }}
                            about="Xóa CV"
                          >
                            <DeleteIcon
                              sx={{
                                color: "black",
                                fontSize: "26px",
                                cursor: "pointer",
                              }}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="h-1/2 justify-center mt-2 text-lg flex gap-2 font-bold items-center">
                      <div>{item.name}</div>
                      <div
                        className="cursor-pointer"
                        onClick={() => {
                          router.push(
                            `/cv/create-v2/${item?.templateId}/${item?.cvIndex}`
                          );
                        }}
                        about="Chỉnh sửa CV"
                      >
                        <EditIcon />
                      </div>
                    </div>
                  </div>
                );
              })}
          </div>
        </div>
      </div>
      <Modal
        width={500}
        centered
        title={
          <h3
            style={{
              fontFamily: "Roboto",
              fontSize: "24px",
              lineHeight: "24px",
              letterSpacing: "0em",
              textAlign: "center",
            }}
          >
            {language === 1 ? "Xác nhận xóa CV" : "Confirm deletion of CV"}
          </h3>
        }
        footer={null}
        open={openModalConfirmDelete}
        onCancel={handleCloseModal}
      >
        <p
          style={{
            fontFamily: "Roboto",
            fontSize: "16px",
            fontWeight: "400",
            lineHeight: "24px",
            letterSpacing: "0.5px",
            textAlign: "center",
          }}
        >
          {language === 1
            ? "Bạn có chắc xoá CV này ?"
            : "Are you sure to delete this CV?"}
        </p>
        <div className="text-center">
          <Button
            type="text"
            shape="round"
            onClick={() => handleDeleteCv(idDelete)}
            className="border-red-500 bg-red-500 mr-3 mt-2"
          >
            {language === 1 ? "Xóa" : "Delete"}
          </Button>
          <Button
            type="text"
            shape="round"
            onClick={handleCloseModal}
            className="bg-slate-300"
          >
            {language === 1 ? "Hủy" : "Cancel"}
          </Button>
        </div>
      </Modal>
      <Modal
        width={500}
        centered
        title={
          <h3
            style={{
              fontFamily: "Roboto",
              fontSize: "24px",
              lineHeight: "24px",
              letterSpacing: "0em",
              textAlign: "center",
            }}
          >
            {language === 1
              ? "Xác nhận hiển thị CV lên đầu"
              : "Confirm CV display on top"}
          </h3>
        }
        footer={null}
        open={openModalConfirmPushTop}
        onCancel={handleCloseModalPushTop}
      >
        <p
          style={{
            fontFamily: "Roboto",
            fontSize: "16px",
            fontWeight: "400",
            lineHeight: "24px",
            letterSpacing: "0.5px",
            textAlign: "center",
          }}
        >
          {language === 1
            ? "CV của bạn sẽ được hiển thị cho nhà tuyển dụng"
            : "Your CV will be visible to employers"}
        </p>
        <div className="text-center">
          <Button
            type="text"
            shape="round"
            onClick={() => handlePushTop(idPushTop)}
            className=" bg-orange-400 mr-3 mt-2"
          >
            {language === 1 ? "Xác nhận" : "Confirm"}
          </Button>
          <Button
            type="text"
            shape="round"
            onClick={handleCloseModalPushTop}
            className="bg-slate-300"
          >
            {language === 1 ? "Hủy" : "Cancel"}
          </Button>
        </div>
      </Modal>
      <Modal
        width={500}
        centered
        title={
          <h3
            style={{
              fontFamily: "Roboto",
              fontSize: "24px",
              lineHeight: "24px",
              letterSpacing: "0em",
              textAlign: "center",
            }}
          >
            {language === 1 ? "Xác nhận ẩn CV" : "Confirm hidden CV"}
          </h3>
        }
        footer={null}
        open={openModalConfirmHideCV}
        onCancel={() => setOpenModalConfirmHideCv(false)}
      >
        <p
          style={{
            fontFamily: "Roboto",
            fontSize: "16px",
            fontWeight: "400",
            lineHeight: "24px",
            letterSpacing: "0.5px",
            textAlign: "center",
          }}
        >
          {language === 1
            ? "Bạn có chắt ẩn hết tất cả CV"
            : "You can hide all your CVs"}
        </p>
        <div className="text-center">
          <Button
            type="text"
            shape="round"
            onClick={() => handleHideCV(idPushTop)}
            className=" bg-orange-400 mr-3 mt-2"
          >
            {language === 1 ? "Xác nhận" : "Confirm"}
          </Button>
          <Button
            type="text"
            shape="round"
            onClick={() => setOpenModalConfirmHideCv(false)}
            className="bg-slate-300"
          >
            {language === 1 ? "Hủy" : "Cancel"}
          </Button>
        </div>
      </Modal>
      {tabUploadDocs && (
        <div
          className={`bg-black/50 flex justify-center items-center fixed inset-0 z-50`}
          onClick={() => {
            setTabUploadDocs(false);
          }}
        >
          <div
            className=" bg-white rounded-lg p-4 flex flex-col gap-y-4 max-w-[100vw]"
            style={{ width: "500px" }}
            onClick={(e: any) => {
              e.stopPropagation();
            }}
          >
            <p className="text-black font-semibold">Thông tin đã nhận diện</p>
            <div className="flex gap-2 justify-between">
              <div className="w-80 h-80 p-2 flex flex-col  bg-blue-400 rounded-lg relative">
                {isLoadingDocs ? (
                  <>
                    <div className="flex flex-col justify-center items-center w-full h-full">
                      <p className="text-white font-semibold text-xs">
                        Đang phân tích ...
                      </p>
                      <div className="loader-animation"></div>
                    </div>
                  </>
                ) : dataDocShow ? (
                  <div className="w-full h-full overflow-y-scroll">
                    {dataDocShow?.map((dt: any) => {
                      if (dt.type === "info_person") {
                        return (
                          <>
                            <div className=" rounded-lg p-2">
                              <p className="text-sm font-bold text-white mb-1">
                                Thông tin của bạn
                              </p>
                              <div className="flex flex-col gap-1">
                                <div className="bg-white rounded-md p-1 gap-1">
                                  {Object.keys(dt).map((dtt: any) => {
                                    return (
                                      <>
                                        <div className="pl-2 text-gray-400  text-xs">
                                          <p className="font-semibold">
                                            {dtt}:
                                            <span className="font-medium text-blue-600">
                                              {dt[dtt]}
                                            </span>
                                          </p>
                                        </div>
                                      </>
                                    );
                                  })}
                                </div>
                              </div>
                            </div>
                          </>
                        );
                      }
                      if (dt.type === "info_project") {
                        return (
                          <>
                            <div className=" rounded-lg p-2">
                              <p className="text-sm font-bold text-white mb-1">
                                Dự án của bạn
                              </p>
                              <div className="flex flex-col gap-1">
                                {dt.moreCvProjects.map((dtt: any) => {
                                  return (
                                    <>
                                      <div className="bg-white rounded-md p-1 gap-1">
                                        {Object.keys(dtt).map((dttt: any) => {
                                          return (
                                            <>
                                              <div className="pl-2 text-gray-400  text-xs">
                                                <p className="font-semibold">
                                                  {dttt}:
                                                  <span className="font-medium text-blue-600">
                                                    {dtt[dttt]}
                                                  </span>
                                                </p>
                                              </div>
                                            </>
                                          );
                                        })}
                                      </div>
                                    </>
                                  );
                                })}
                              </div>
                            </div>
                          </>
                        );
                      }
                      if (dt.type === "info_study") {
                        return (
                          <>
                            <div className=" rounded-lg p-2">
                              <p className="text-sm font-bold text-white mb-1">
                                Học tập
                              </p>
                              <div className="flex flex-col gap-1">
                                {dt.moreCvExtraInformations.map((dtt: any) => {
                                  return (
                                    <>
                                      <div className="bg-white rounded-md p-1 gap-1">
                                        {Object.keys(dtt).map((dttt: any) => {
                                          if (dtt[dttt] != null) {
                                            return (
                                              <>
                                                <div className="pl-2 text-gray-400  text-xs">
                                                  <p className="font-semibold">
                                                    {dttt}:
                                                    <span className="font-medium text-blue-600">
                                                      {dtt[dttt]}
                                                    </span>
                                                  </p>
                                                </div>
                                              </>
                                            );
                                          }
                                        })}
                                      </div>
                                    </>
                                  );
                                })}
                              </div>
                            </div>
                          </>
                        );
                      }
                      if (dt.type === "info_experience") {
                        return (
                          <>
                            <div className=" rounded-lg p-2">
                              <p className="text-sm font-bold text-white mb-1">
                                Kinh nghiệm
                              </p>
                              <div className="flex flex-col gap-1">
                                {dt.moreCvExtraInformations.map((dtt: any) => {
                                  return (
                                    <>
                                      <div className="bg-white rounded-md p-1 gap-1">
                                        {Object.keys(dtt).map((dttt: any) => {
                                          if (dtt[dttt] != null) {
                                            return (
                                              <>
                                                <div className="pl-2 text-gray-400  text-xs">
                                                  <p className="font-semibold">
                                                    {dttt}:
                                                    <span className="font-medium text-blue-600">
                                                      {dtt[dttt]}
                                                    </span>
                                                  </p>
                                                </div>
                                              </>
                                            );
                                          }
                                        })}
                                      </div>
                                    </>
                                  );
                                })}
                              </div>
                            </div>
                          </>
                        );
                      }
                      if (dt.type === "info_activate") {
                        return (
                          <>
                            <div className=" rounded-lg p-2">
                              <p className="text-sm font-bold text-white mb-1">
                                Hoạt động
                              </p>
                              <div className="flex flex-col gap-1">
                                {dt.moreCvExtraInformations.map((dtt: any) => {
                                  return (
                                    <>
                                      <div className="bg-white rounded-md p-1 gap-1">
                                        {Object.keys(dtt).map((dttt: any) => {
                                          if (dtt[dttt] != null) {
                                            return (
                                              <>
                                                <div className="pl-2 text-gray-400  text-xs">
                                                  <p className="font-semibold">
                                                    {dttt}:
                                                    <span className="font-medium text-blue-600">
                                                      {dtt[dttt]}
                                                    </span>
                                                  </p>
                                                </div>
                                              </>
                                            );
                                          }
                                        })}
                                      </div>
                                    </>
                                  );
                                })}
                              </div>
                            </div>
                          </>
                        );
                      }
                      if (dt.type === "info_award") {
                        return (
                          <>
                            <div className=" rounded-lg p-2">
                              <p className="text-sm font-bold text-white mb-1">
                                Giải thưởng
                              </p>
                              <div className="flex flex-col gap-1">
                                {dt.moreCvExtraInformations.map((dtt: any) => {
                                  return (
                                    <>
                                      <div className="bg-white rounded-md p-1 gap-1">
                                        {Object.keys(dtt).map((dttt: any) => {
                                          if (dtt[dttt] != null) {
                                            return (
                                              <>
                                                <div className="pl-2 text-gray-400  text-xs">
                                                  <p className="font-semibold">
                                                    {dttt}:
                                                    <span className="font-medium text-blue-600">
                                                      {dtt[dttt]}
                                                    </span>
                                                  </p>
                                                </div>
                                              </>
                                            );
                                          }
                                        })}
                                      </div>
                                    </>
                                  );
                                })}
                              </div>
                            </div>
                          </>
                        );
                      }
                      if (dt.type === "info_skill") {
                        return (
                          <>
                            <div className=" rounded-lg p-2">
                              <p className="text-sm font-bold text-white mb-1">
                                Kỹ năng
                              </p>
                              <div className="flex flex-col gap-1">
                                {dt.moreCvExtraInformations.map((dtt: any) => {
                                  return (
                                    <>
                                      <div className="bg-white rounded-md p-1 gap-1">
                                        {Object.keys(dtt).map((dttt: any) => {
                                          if (dtt[dttt] != null) {
                                            return (
                                              <>
                                                <div className="pl-2 text-gray-400  text-xs">
                                                  <p className="font-semibold">
                                                    {dttt}:
                                                    <span className="font-medium text-blue-600">
                                                      {dtt[dttt]}
                                                    </span>
                                                  </p>
                                                </div>
                                              </>
                                            );
                                          }
                                        })}
                                      </div>
                                    </>
                                  );
                                })}
                              </div>
                            </div>
                          </>
                        );
                      }
                      if (dt.type === "info_achivement") {
                        return (
                          <>
                            <div className=" rounded-lg p-2">
                              <p className="text-sm font-bold text-white mb-1">
                                Chứng chỉ
                              </p>
                              <div className="flex flex-col gap-1">
                                {dt.moreCvExtraInformations.map((dtt: any) => {
                                  return (
                                    <>
                                      <div className="bg-white rounded-md p-1 gap-1">
                                        {Object.keys(dtt).map((dttt: any) => {
                                          if (dtt[dttt] != null) {
                                            return (
                                              <>
                                                <div className="pl-2 text-gray-400  text-xs">
                                                  <p className="font-semibold">
                                                    {dttt}:
                                                    <span className="font-medium text-blue-600">
                                                      {dtt[dttt]}
                                                    </span>
                                                  </p>
                                                </div>
                                              </>
                                            );
                                          }
                                        })}
                                      </div>
                                    </>
                                  );
                                })}
                              </div>
                            </div>
                          </>
                        );
                      }
                      if (dt.type === "info_hobby") {
                        return (
                          <>
                            <div className=" rounded-lg p-2">
                              <p className="text-sm font-bold text-white mb-1">
                                Sở thích
                              </p>
                              <div className="flex flex-col gap-1">
                                {dt.moreCvExtraInformations.map((dtt: any) => {
                                  return (
                                    <>
                                      <div className="bg-white rounded-md p-1 gap-1">
                                        {Object.keys(dtt).map((dttt: any) => {
                                          if (dtt[dttt] != null) {
                                            return (
                                              <>
                                                <div className="pl-2 text-gray-400  text-xs">
                                                  <p className="font-semibold">
                                                    {dttt}:
                                                    <span className="font-medium text-blue-600">
                                                      {dtt[dttt]}
                                                    </span>
                                                  </p>
                                                </div>
                                              </>
                                            );
                                          }
                                        })}
                                      </div>
                                    </>
                                  );
                                })}
                              </div>
                            </div>
                          </>
                        );
                      }
                    })}
                  </div>
                ) : (
                  <div
                    className="w-full h-full flex justify-center items-center flex-col cursor-pointer"
                    onClick={() => {
                      refInputCV.current.click();
                    }}
                    onDragEnter={() => {
                      setStatusDrag(true);
                    }}
                    onDragLeave={() => {
                      setStatusDrag(false);
                    }}
                    onDragOver={(e: any) => {
                      e.preventDefault();
                      // setStatusDrag(false);
                    }}
                    onDrop={(e: any) => {
                      e.preventDefault();
                      handleUpLoadDocs(e);
                    }}
                  >
                    {statusDrag ? (
                      <>
                        <div className="absolute inset-0 bg-black/20 pointer-events-none flex justify-center items-center flex-col gap-5">
                          <IoMdDownload className="text-6xl text-white up-down-animation" />
                          <p className="text-xs font-medium text-white">
                            *Thả ra để được thêm vào
                          </p>
                        </div>
                      </>
                    ) : (
                      <>
                        <MdUploadFile className="text-6xl text-white" />
                        <p className="text-xs font-medium">
                          *Thả hoặc nhấn để thêm file word để được nhận diện
                        </p>
                      </>
                    )}
                  </div>
                )}
                <input
                  type="file"
                  ref={refInputCV}
                  hidden
                  onChange={(e: any) => {
                    handleUpLoadDocs(e);
                  }}
                />
              </div>
              <div className="flex flex-col gap-2 h-80">
                <p className="px-2 font-semibold text-blue-500 text-sm">
                  Mẫu CV
                </p>
                <div className="overflow-y-scroll flex-1">
                  <ul className="flex flex-col gap-2 px-2">
                    {typeTemplate?.map((dt: any, index: any) => {
                      return (
                        <li
                          className={`w-24 h-24 object-contain rounded-xl overflow-hidden relative text-sm font-bold uppercase  cursor-pointer
                        `}
                          onClick={(e: any) => {
                            e.stopPropagation();
                            setTemplateChoose(index);
                          }}
                          key={index}
                        >
                          {/* <span className="select-none">{dt.id}</span>
                           */}
                          {templateChoose === index && (
                            <div className="absolute inset-0 bg-blue-500/50"></div>
                          )}
                          <Image
                            className={` duration-700 transition-all ${
                              templateChoose !== index && "hover:scale-150"
                            }`}
                            width={200}
                            height={200}
                            alt=""
                            src={`/formCV/cv${index + 1}.webp`}
                          />
                        </li>
                      );
                    })}
                  </ul>
                </div>
              </div>
            </div>
            <div className="flex justify-end gap-2">
              <button
                className="px-2 py-1 border-2 hover:border-blue-500 text-blue-500 rounded-lg"
                onClick={() => {
                  setTabUploadDocs(false);
                }}
              >
                Quay lại
              </button>
              {dataDocShow && (
                <button
                  className="px-2 py-1 text-white hover:bg-yellow-400 bg-green-500 rounded-lg"
                  onClick={() => {
                    refInputCV.current?.click();
                  }}
                >
                  Tải lại
                </button>
              )}

              <button
                className="px-2 py-1 text-white hover:bg-blue-400 bg-blue-500 rounded-lg"
                onClick={() => {
                  router.push(`/cv/create-v2/${templateChoose}/upload`);
                }}
              >
                Tạo
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default page;
