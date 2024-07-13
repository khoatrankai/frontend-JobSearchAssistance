import bannersApi from "@/api/banner/apiBanner";
import { useSrollContext } from "@/context/AppProvider";
import { RootState } from "@/redux";
import ShortText from "@/util/ShortText";
import useRouterCustom from "@/util/useRouterCustom/useRouterCustom";
import { Button, Select } from "@mui/material";
import { Input } from "antd";
import { Option } from "antd/es/mentions";
import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";
import { IoIosAdd } from "react-icons/io";
import { IoClose } from "react-icons/io5";
import { TbBorderCorners } from "react-icons/tb";
import { useSelector } from "react-redux";
import { ValidationProfile } from "./validation/validation";
import ToastCustom from "@/util/ToastCustom";
type Props = {};

const CompanyBanner = (props: Props) => {
  const { reponsiveMobile } = useSrollContext();
  const { pushBlank, pushRouter } = useRouterCustom();
  const { hdError, hdSuccess } = ToastCustom();
  const refImg = useRef<any>();
  const refBanner = useRef<any>();
  const [idPost, setIdPost] = useState<any>();
  const [logoShowImg, setLogoShowImg] = useState<any>(null);
  const [logoFileImg, setLogoFileImg] = useState<any>(null);
  const [bannerShowImg, setBannerShowImg] = useState<any>(null);
  const [bannerFileImg, setBannerFileImg] = useState<any>(null);
  const [statusTab, setStatusTab] = useState<any>(0);
  const [dataRequest, setDataRequest] = useState<any>({});
  const { handleShortTextHome } = ShortText();
  const [listDataBanner, setListBanner] = useState<any>();
  const languageRedux = useSelector(
    (state: RootState) => state.changeLaguage.language
  );
  const fetchDataBanner = async () => {
    const res = await bannersApi.getBannerCompany();
    if (res && res?.status === 200) {
      setListBanner(res?.data);
    }
  };
  const handleChangeData = (e: any) => {
    setDataRequest({ ...dataRequest, [e.target.name]: e.target.value });
  };
  function convertFileToBase64(file: any) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);

      reader.onload = () => {
        const base64String = reader.result;
        resolve(base64String);
      };

      reader.onerror = (error) => {
        reject(error);
      };
    });
  }
  const handleUpBanner = (e: any) => {
    const file = e.target.files[0];
    if (file) {
      setBannerFileImg(file);
      convertFileToBase64(file)
        .then((base64String) => {
          setBannerShowImg(base64String);
        })
        .catch((error) => {});
    }
  };
  const handleUpLogo = (e: any) => {
    const file = e.target.files[0];
    if (file) {
      setLogoFileImg(file);
      convertFileToBase64(file)
        .then((base64String) => {
          setLogoShowImg(base64String);
        })
        .catch((error) => {});
    }
  };
  useEffect(() => {
    fetchDataBanner();
  }, []);
  const handleCreateServer = () => {
    const newData: any = {
      name: dataRequest?.name,
      description: dataRequest?.description,
      logoData: logoFileImg,
      imageData: bannerFileImg,
      nameButton: dataRequest?.nameButton,
      link: dataRequest?.link,
    };
    const checkPost = new ValidationProfile(newData);
    const validate = checkPost.validateAllFields();
    if (validate && !validate.status) {
      hdError(validate.message);
    } else {
      const formData = new FormData();
      for (let i in newData) {
        formData.append(i, newData[i]);
      }
      const createPost = async () => {
        const res: any = await bannersApi.createBanner(formData);
        if (res && res?.statusCode === 201) {
          hdSuccess("Tạo thành công");
          setStatusTab(0);
          fetchDataBanner();
          setDataRequest({});
          setBannerFileImg("");
          setBannerShowImg("");
          setLogoFileImg("");
          setLogoShowImg("");
        } else {
          hdError("Tạo thất bại");
        }
      };
      createPost();
    }
  };
  const handleUpdateServer = () => {
    const newData: any = {
      name: dataRequest?.name,
      description: dataRequest?.description,
      logoData: logoFileImg !== "" ? logoFileImg : logoShowImg,
      imageData: bannerFileImg !== "" ? bannerFileImg : bannerShowImg,
      nameButton: dataRequest?.nameButton,
      link: dataRequest?.link,
    };
    const checkPost = new ValidationProfile(newData);
    const validate = checkPost.validateAllFields();
    if (validate && !validate.status) {
      hdError(validate.message);
    } else {
      const formData = new FormData();
      if (logoFileImg === null || logoFileImg === "") {
        delete newData.logoData;
      }
      if (bannerFileImg === null || bannerFileImg === "") {
        delete newData.imageData;
      }
      for (let i in newData) {
        formData.append(i, newData[i]);
      }
      const createPost = async () => {
        const res: any = await bannersApi.updateBanner(formData, idPost);
        if (res && res?.statusCode === 200) {
          hdSuccess("Cập nhật thành công");
          setStatusTab(0);
          fetchDataBanner();
          setDataRequest({});
          setBannerFileImg("");
          setBannerShowImg("");
          setLogoFileImg("");
          setLogoShowImg("");
        } else {
          hdError("Cập nhật thất bại");
        }
      };
      createPost();
    }
  };
  return (
    <div className="flex flex-col mt-5">
      <div
        className={`bg-white shadow-[rgba(13,_38,_76,_0.19)_0px_9px_20px] transition-all p-4 flex flex-col gap-y-4 rounded-xl relative`}
      >
        <div className="mb-8 flex justify-between flex-wrap">
          <div className="flex h-fit items-center ">
            <div className="h-10 w-3 bg-blue-500 mr-4"></div>
            <h1 className="font-bold text-xl">
              {languageRedux === 1
                ? "Thông tin ảnh bìa"
                : "Personal information"}
            </h1>
          </div>
        </div>
        {!statusTab ? (
          <div className="flex flex-col gap-y-4 w-full">
            <div className="w-full flex justify-between">
              <p className="text-2xl font-bold">Các bài viết</p>
              <button
                className="p-2 rounded-lg bg-blue-500 text-white font-semibold text-lg hover:bg-blue-600"
                onClick={() => {
                  setStatusTab(1);
                }}
              >
                Tạo ảnh bìa
              </button>
            </div>
            <div
              className={`flex justify-between gap-2 ${
                reponsiveMobile < 700 && "flex-col"
              }`}
            >
              <div className="flex text-xs font-semibold">
                <button>
                  Tất cả
                  <span>({listDataBanner?.length ?? 0})</span>
                </button>
                {/* <button className=" px-2">
              Ứng viên tiềm năng<span>(10)</span>
            </button> */}
              </div>
              <div className="flex gap-x-1 items-center">
                <label>Tìm kiếm:</label>
                <input
                  placeholder="Từ khóa"
                  className="outline-none bg-gray-50 rounded-sm px-1 py-[2px] font-semibold w-56"
                  type="text"
                />
              </div>
            </div>
            <div className="flex flex-col gap-y-4 py-2 px-4 rounded-md bg-gray-50 w-full overflow-x-scroll">
              <div className="flex gap-x-2 min-w-[1152px]">
                <p className="basis-1/12">STT</p>
                <p className="basis-1/6">Logo</p>
                <p className="basis-1/6">Tên</p>
                <p className="basis-2/6">Mô tả</p>
                <p className="basis-1/4">Chức năng</p>
              </div>
              <div className="flex flex-col gap-y-2 max-h-[315px] overflow-y-scroll  min-w-[1152px]">
                {listDataBanner?.map((dt: any, index: any) => {
                  return (
                    <>
                      <div className="flex gap-x-2 text-sm font-semibold cursor-pointer  items-center">
                        <p className="basis-1/12">{index + 1}</p>
                        <div className="basis-1/6">
                          <Image
                            width={50}
                            height={50}
                            className="rounded-full overflow-hidden"
                            alt=""
                            src={dt?.logoData ?? "/goapply.png"}
                          />
                        </div>
                        <p className="basis-1/6">
                          {handleShortTextHome(dt.name, 15)}
                        </p>
                        <p className="basis-2/6">
                          {handleShortTextHome(dt.description, 30)}
                        </p>

                        <div className="basis-1/4 text-xs font-bold">
                          <button
                            className="p-2 rounded-md text-yellow-500 hover:underline"
                            onClick={() => {
                              // pushRouter(`/community-create?post-community=${dt.id}`);
                              setStatusTab(2);
                              setIdPost(dt?.id);
                              setDataRequest(dt);
                              setBannerShowImg(dt?.imageData);
                              setLogoShowImg(dt?.logoData);
                            }}
                          >
                            Chỉnh sửa
                          </button>
                        </div>
                      </div>
                    </>
                  );
                })}
              </div>
            </div>

            {/* <div className="flex flex-col gap-y-2 max-h-[315px] overflow-y-scroll  min-w-[1152px]"></div> */}
          </div>
        ) : (
          <div className="flex flex-col gap-y-4 w-full">
            <div className="w-full flex justify-between">
              <p className="text-2xl font-bold">
                {statusTab === 2 ? "Chỉnh sửa ảnh bìa" : "Tạo ảnh bìa"}
              </p>
              <div className="flex items-center gap-1">
                <Button
                  onClick={() => {
                    setStatusTab(0);
                  }}
                >
                  Trở về
                </Button>
                <button
                  className="p-2 rounded-lg bg-blue-500 text-white font-semibold text-lg hover:bg-blue-600"
                  onClick={() => {
                    // pushRouter(`/recruiter/new-post`);
                    if (statusTab === 1) {
                      handleCreateServer();
                    } else {
                      handleUpdateServer();
                    }
                  }}
                >
                  {statusTab === 2 ? "Sửa" : "Tạo"}
                </button>
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <div className="flex flex-wrap gap-2">
                <div
                  className={`flex flex-col flex-1 ${
                    reponsiveMobile < 700 ? "min-w-72" : "min-w-96"
                  }`}
                >
                  <p className="text-xs font-bold text-blue-500">Tên</p>
                  <Input
                    className="rounded-md w-full p-2 font-medium"
                    name="name"
                    placeholder="Tên"
                    value={dataRequest?.name}
                    onChange={handleChangeData}
                  />
                </div>
                <div
                  className={`flex flex-col flex-1 ${
                    reponsiveMobile < 700 ? "min-w-72" : "min-w-96"
                  }`}
                >
                  <p className="text-xs font-bold text-blue-500">Mô tả</p>
                  <Input
                    className="rounded-md w-full p-2 font-medium"
                    name="description"
                    placeholder="Mô tả"
                    value={dataRequest?.description}
                    onChange={handleChangeData}
                  />
                </div>
                <div
                  className={`flex flex-col flex-1 ${
                    reponsiveMobile < 700 ? "min-w-72" : "min-w-96"
                  }`}
                >
                  <p className="text-xs font-bold text-blue-500">
                    Link khách truy cập
                  </p>
                  <Input
                    className="rounded-md w-full p-2 font-medium"
                    name="link"
                    placeholder="Link"
                    value={dataRequest?.link}
                    onChange={handleChangeData}
                  />
                </div>
                <div
                  className={`flex flex-col flex-1 ${
                    reponsiveMobile < 700 ? "min-w-72" : "min-w-96"
                  }`}
                >
                  <p className="text-xs font-bold text-blue-500">Tên nút</p>
                  <Input
                    className="rounded-md w-full p-2 font-medium"
                    name="nameButton"
                    placeholder="Tên nút"
                    value={dataRequest?.nameButton}
                    onChange={handleChangeData}
                  />
                </div>
              </div>
              <div className="flex flex-col my-2 py-4">
                <p className="text-xs font-bold text-blue-500">Ảnh logo</p>
                <div className="p-2 bg-gray-100 rounded-sm w-fit flex gap-x-2">
                  <div className="flex gap-x-2">
                    {logoShowImg && (
                      <>
                        <div className="w-44 h-44 rounded-sm overflow-hidden relative">
                          <Image
                            className="w-full h-full"
                            alt=""
                            width={200}
                            height={200}
                            src={logoShowImg}
                          />
                          <div className="absolute top-0 right-0 w-8 h-8 flex justify-center items-center text-white rounded-full bg-blue-800 overflow-hidden cursor-pointer hover:bg-red-800">
                            <IoClose
                              className="w-6 h-6"
                              onClick={() => {
                                setLogoFileImg("");
                                setLogoShowImg("");
                              }}
                            />
                          </div>
                        </div>
                      </>
                    )}
                  </div>

                  {!logoShowImg && (
                    <div
                      className="w-44 h-44 relative text-blue-800 cursor-pointer hover:text-blue-700"
                      onClick={() => {
                        refImg.current.click();
                      }}
                    >
                      <TbBorderCorners className="w-full h-full" />
                      <div className="absolute inset-0 flex justify-center items-center">
                        <IoIosAdd className="h-16 w-16" />
                      </div>
                      <p className="text-xs text-blue-500 absolute bottom-12 inset-x-0 text-center">
                        Thêm ảnh
                      </p>
                      <input
                        type="file"
                        ref={refImg}
                        hidden
                        onChange={handleUpLogo}
                      />
                    </div>
                  )}
                </div>
              </div>
              <div className="flex flex-col my-2 py-4">
                <p className="text-xs font-bold text-blue-500">Ảnh bìa</p>
                <div className="p-2 bg-gray-100 rounded-sm w-fit flex gap-x-2">
                  <div className="flex gap-x-2">
                    {bannerShowImg && (
                      <>
                        <div className="w-44 h-44 rounded-sm overflow-hidden relative">
                          <Image
                            className="w-full h-full"
                            alt=""
                            width={200}
                            height={200}
                            src={bannerShowImg}
                          />
                          <div className="absolute top-0 right-0 w-8 h-8 flex justify-center items-center text-white rounded-full bg-blue-800 overflow-hidden cursor-pointer hover:bg-red-800">
                            <IoClose
                              className="w-6 h-6"
                              onClick={() => {
                                setBannerFileImg("");
                                setBannerShowImg("");
                              }}
                            />
                          </div>
                        </div>
                      </>
                    )}
                  </div>

                  {!bannerShowImg && (
                    <div
                      className="w-44 h-44 relative text-blue-800 cursor-pointer hover:text-blue-700"
                      onClick={() => {
                        refBanner.current.click();
                      }}
                    >
                      <TbBorderCorners className="w-full h-full" />
                      <div className="absolute inset-0 flex justify-center items-center">
                        <IoIosAdd className="h-16 w-16" />
                      </div>
                      <p className="text-xs text-blue-500 absolute bottom-12 inset-x-0 text-center">
                        Thêm ảnh
                      </p>
                      <input
                        type="file"
                        ref={refBanner}
                        hidden
                        onChange={handleUpBanner}
                      />
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CompanyBanner;
