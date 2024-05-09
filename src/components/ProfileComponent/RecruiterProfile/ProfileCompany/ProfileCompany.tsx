/* eslint-disable react-hooks/rules-of-hooks */
"use client";
import locationApi from "@/api/location/locationApi";
import profileApi from "@/api/recruiter/profile/profileApi";
import roleApi from "@/api/recruiter/role/roleApi";
import { RootState } from "@/redux";
// import { setCategoryId } from "@/redux/reducer/categoryIdReducer";
import { fetchProfileRecruiter } from "@/redux/reducer/profileReducer/profileSliceRecruiter";
import TextEditor from "@/util/TextEditCustom/TextEditorCustom";
import { Input, Select } from "antd";
import imageCompression from "browser-image-compression";
import moment from "moment";
import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";
import { IoIosAdd } from "react-icons/io";
import { IoClose } from "react-icons/io5";
import { TbBorderCorners } from "react-icons/tb";
import { useDispatch, useSelector } from "react-redux";

type Props = {
  dataInfo?: any;
  handleUpdateApi?: any;
  checkUpdate?: boolean;
};
interface ILocation {
  code: number;
  data: any;
}

const ProfileCompany = (props: Props) => {
  const { dataInfo, handleUpdateApi } = props;
  const refImg = useRef<any>();
  const [dataLocation, setDataLocation] = useState<any>([]);
  const [dataRequest, setDataRequest] = useState<any>();
  const [roleData, setRole] = useState<any>();
  const [sizeData, setSize] = useState<any>();
  const [listBase, setListBase] = useState<any>([]);
  const [listFile, setListFile] = useState<any>([]);
  const [logoShowImg, setLogoShowImg] = useState<any>(null);
  const [logoFileImg, setLogoFileImg] = useState<any>(null);
  const [categoryData, setCategory] = useState<any>();
  // const [categoryId,setCategoryId] = useState<any>("3")
  const [provinceData, setProvince] = useState<any>();
  const [provinceID, setProvinceID] = useState<any>("79");
  const [districtData, setDistrict] = useState<any>();
  const [districtID, setDistrictID] = useState<any>("");
  const [wardData, setWard] = useState<any>();
  const [wardID, setWardID] = useState<any>("");
  const [listDeleteImg, setDeleteImg] = useState<any>([]);
  const [listImg, setListImg] = useState<any>([]);
  const [listAddImg, setAddImg] = useState<any>([]);
  const [rsInfo, setRSInfo] = useState<boolean>(false);
  const [btnUpdate, setBtnUpdate] = useState<boolean>(false);
  const languageRedux = useSelector(
    (state: RootState) => state.changeLaguage.language
  );
  const dispatch = useDispatch();
  const profile = useSelector((state: any) => state.profileRecruiter.profile);
  useEffect(() => {
    dispatch(fetchProfileRecruiter("vi") as any);
    const fetchData = async () => {
      const data = await roleApi.getRoleRecruiter();
      setRole(data);
      const data2 = await profileApi.getCompanySize();
      setSize(data2);
      const data3 = await profileApi.getCompanyCategory();
      setCategory(data3?.data);
      const data4 = await locationApi.getAllProvinces("vi");
      setProvince(data4?.data);
    };
    fetchData();
  }, []);
  useEffect(() => {
    const fetchData = async () => {
      const data5 = await locationApi.getDistrictsById(provinceID, "vi");
      setDistrict(data5?.data);
    };
    fetchData();
  }, [provinceID]);
  useEffect(() => {
    const fetchData = async () => {
      const data6 = await locationApi.getWardsId(districtID, "vi");
      setWard(data6?.data);
    };
    fetchData();
  }, [districtID]);
  useEffect(() => {
    setDataRequest(profile?.companyInfomation);
    setListImg(profile?.companyInfomation?.images);
    setProvinceID(
      profile?.companyInfomation?.companyLocation?.district?.province?.id
    );
    setDistrictID(profile?.companyInfomation?.companyLocation?.district?.id);
    setWardID(profile?.companyInfomation?.companyLocation?.id);
    setLogoShowImg(profile?.companyInfomation?.logoPath);
    setLogoFileImg(null);
    // setCategoryId(profile?.companyInfomation?.companyCategory?.id);
  }, [profile]);
  useEffect(() => {}, [dataRequest]);
  useEffect(() => {
    console.log(dataRequest);
  }, [dataRequest]);
  useEffect;
  useEffect(() => {
    if (listBase.length > 0 && listFile.length > 0) {
      setAddImg(
        listBase.map((dt: any, ikey: any) => {
          return { base64: dt, file: listFile[ikey] };
        })
      );
    }
  }, [listBase, listFile]);
  const handleChangeData = (
    e: any,
    type = false,
    dataReq = null,
    name = ""
  ) => {
    setBtnUpdate(true);
    if (type) {
      setDataRequest({ ...dataRequest, description: e });
    } else {
      if (name === "companyRoleInfomation") {
        const value = roleData.filter((dt: any) => {
          return dt.id === e;
        })[0];
        setDataRequest({ ...dataRequest, companyRoleInfomation: value });
      } else {
        if (name === "companySizeInfomation") {
          const value = sizeData.filter((dt: any) => {
            return dt.id === e;
          })[0];
          setDataRequest({ ...dataRequest, companySizeInfomation: value });
        } else {
          if (name === "companyCategory") {
            const value = categoryData.filter((dt: any) => {
              return dt.id == e;
            });

            setDataRequest({ ...dataRequest, companyCategory: value });
          } else
            setDataRequest({ ...dataRequest, [e.target.name]: e.target.value });
        }
      }
    }
  };

  const handleDeleteImg = (vt: any, type = false) => {
    setBtnUpdate(true);
    if (type) {
      setAddImg(
        listAddImg.filter((dt: any, ikey: any) => {
          return vt !== ikey;
        })
      );
    } else {
      setDeleteImg([...listDeleteImg, vt]);
      setListImg(
        listImg.filter((dt: any) => {
          return dt.id !== vt;
        })
      );
    }
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
  const handleAddImg = (e: any) => {
    setBtnUpdate(true);
    const files = Object.values(e.target.files);

    const filePromises = Array.from(files).map((file) =>
      convertFileToBase64(file)
    );

    Promise.all(filePromises)
      .then((base64Strings) => {
        setListBase(base64Strings);
      })
      .catch((error) => {
        console.log(error);
      });
    setListFile(files);
  };
  const handleUpLogo = (e: any) => {
    setBtnUpdate(true);
    const file = e.target.files[0];
    if (file) {
      setLogoFileImg(file);
      convertFileToBase64(file)
        .then((base64String) => {
          setLogoShowImg(base64String);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };
  const handleUpdateServer = () => {
    const newData: any = {
      name: dataRequest?.name,
      address: dataRequest?.address,
      wardId: wardID,
      taxCode: dataRequest?.taxCode,
      phone: dataRequest?.phone,
      email: dataRequest?.email,
      website: dataRequest?.website,
      description: dataRequest?.description,
      companyRoleId: dataRequest?.companyRoleInfomation?.id,
      companySizeId: dataRequest?.companySizeInfomation?.id,
      categoryId: dataRequest?.companyCategory?.id,
      logo: logoFileImg,
      images: listFile,
      deleteImages: listDeleteImg,
    };
    if (logoFileImg === null) {
      delete newData.logo;
    }
    console.log(newData, dataRequest);
    const formData = new FormData();
    for (let i in newData) {
      if (i === "images") {
        newData[i]?.forEach((image: any) => {
          console.log(image);
          formData.append("images", image);
        });
      } else {
        formData.append(i, newData[i]);
      }
    }
    const postData = async () => {
      const data = await profileApi.postProfile(dataRequest.id, formData);
      if (data) {
        dispatch(fetchProfileRecruiter("vi") as any);
      }
    };
    postData();
  };
  return (
    <div className="flex flex-col">
      <div
        className={`bg-white ${
          rsInfo
            ? "shadow-[rgba(13,_38,_76,_0.19)_0px_9px_20px] "
            : "border-transparent"
        } transition-all p-4 flex flex-col gap-y-4 rounded-xl relative`}
      >
        <div className="mb-8 flex justify-between flex-wrap">
          <div className="flex h-fit items-center ">
            <div className="h-10 w-3 bg-blue-500 mr-4"></div>
            <h1 className="font-bold text-xl">
              {languageRedux === 1
                ? "Thông tin công ty"
                : "Personal information"}
            </h1>
          </div>

          {props.checkUpdate === false && (
            <div className="flex gap-2">
              {rsInfo ? (
                <>
                  <button
                    className="w-fit flex items-center hover:shadow-[inset_-12px_-8px_40px_#46464620] rounded-lg p-1 font-serif"
                    onClick={() => {
                      // handleRsInfo("save");
                    }}
                  >
                    <Image
                      className="w-4 mr-1"
                      src={"/icontick.svg"}
                      alt=""
                      width={200}
                      height={200}
                    />
                    <h2 className="text-sm font-bold">
                      {languageRedux === 1 ? "Lưu" : "Save"}
                    </h2>
                  </button>
                  <button
                    className="w-fit flex items-center hover:shadow-[inset_-12px_-8px_40px_#46464620] rounded-lg p-1 font-serif"
                    onClick={() => {
                      // handleRsInfo("close");
                    }}
                  >
                    <Image
                      className="w-4 mr-1"
                      src={"/iconclose.svg"}
                      alt=""
                      width={200}
                      height={200}
                    />
                    <h2 className="text-sm font-bold">
                      {languageRedux === 1 ? "Thoát" : "Exit"}
                    </h2>
                  </button>
                </>
              ) : (
                <button
                  className="w-fit flex items-center hover:shadow-[inset_-12px_-8px_40px_#46464620] rounded-lg p-1 font-serif"
                  onClick={() => {
                    //   handleRsInfo("update");
                  }}
                >
                  <Image
                    className="w-4 mr-1"
                    src={"/iconwrite.svg"}
                    alt=""
                    width={200}
                    height={200}
                  />
                  <h2 className="text-sm font-bold">
                    {languageRedux === 1 ? "Sửa" : "Edit"}
                  </h2>
                </button>
              )}
            </div>
          )}
        </div>
        <div className="gap-4 flex flex-wrap ">
          <div className="flex flex-col w-96">
            <p className="text-xs font-bold text-blue-500">Tên công ty</p>
            <Input
              className="rounded-md w-full p-2 font-medium"
              name="name"
              value={dataRequest?.name}
              onChange={handleChangeData}
            />
          </div>
          <div className="flex flex-col w-96">
            <p className="text-xs font-bold text-blue-500">Số điện thoại</p>
            <Input
              className="rounded-md w-full p-2 font-medium"
              name="phone"
              value={dataRequest?.phone}
              onChange={handleChangeData}
            />
          </div>
          <div className="flex flex-col w-96">
            <p className="text-xs font-bold text-blue-500">Email</p>
            <Input
              className="rounded-md w-full p-2 font-medium"
              name="email"
              value={dataRequest?.email}
              onChange={handleChangeData}
            />
          </div>
          <div className="flex flex-col w-96">
            <p className="text-xs font-bold text-blue-500">Website</p>
            <Input
              className="rounded-md w-full p-2 font-medium"
              name="website"
              value={dataRequest?.website}
              onChange={handleChangeData}
            />
          </div>
          <div className="flex flex-col w-96">
            <p className="text-xs font-bold text-blue-500">Thuế</p>
            <Input
              className="rounded-md w-full p-2 font-medium"
              name="taxCode"
              value={dataRequest?.taxCode}
              onChange={handleChangeData}
            />
          </div>
          <div className="flex flex-col w-96">
            <p className="text-xs font-bold text-blue-500">Vai trò</p>

            <Select
              className="rounded-md h-10 w-full font-medium"
              value={dataRequest?.companyRoleInfomation?.id}
              onChange={(e: any) => {
                // e.target.name = "companyRoleInfomation";
                handleChangeData(e, false, null, "companyRoleInfomation");
              }}
            >
              {roleData?.map((dt: any) => {
                return (
                  <>
                    <option value={dt.id}>{dt.nameText}</option>
                  </>
                );
              })}
            </Select>
          </div>
          <div className="flex flex-col w-96">
            <p className="text-xs font-bold text-blue-500">Quy mô</p>

            <Select
              className="rounded-md h-10 w-full font-medium"
              value={dataRequest?.companySizeInfomation?.id}
              onChange={(e: any) => {
                // e.target.name = "companyRoleInfomation";
                handleChangeData(e, false, null, "companySizeInfomation");
              }}
            >
              {sizeData?.map((dt: any) => {
                return (
                  <>
                    <option value={dt.id}>{dt.nameText}</option>
                  </>
                );
              })}
            </Select>
          </div>
          <div className="flex flex-col w-96">
            <p className="text-xs font-bold text-blue-500">Danh mục</p>

            <Select
              className="rounded-md h-10 w-full font-medium"
              value={dataRequest?.companyCategory?.id}
              onChange={(e: any) => {
                // e.target.name = "companyRoleInfomation";
                console.log(e);
                handleChangeData(e, false, null, "companyCategory");
              }}
            >
              {categoryData?.map((dt: any) => {
                return (
                  <>
                    <option value={dt.id}>{dt.name}</option>
                  </>
                );
              })}
            </Select>
          </div>
          <div className="flex flex-col w-full  max-w-[784px]">
            <p className="text-xs font-bold text-blue-500">Số nhà</p>
            <Input
              className="rounded-md w-full p-2 font-medium"
              name="address"
              value={dataRequest?.address}
              onChange={handleChangeData}
            />
          </div>
          <div className="w-full flex gap-4 flex-wrap">
            <div className="flex flex-col  w-full  max-w-[784px] ">
              <p className="text-xs font-bold text-blue-500">Thành phố</p>
              <Select
                className="rounded-md h-10 w-full font-medium"
                value={provinceID}
                onChange={(e: any) => {
                  setProvinceID(e);
                  setDistrictID("");
                  setWardID("");
                }}
              >
                {provinceData?.map((dt: any) => {
                  return (
                    <>
                      <option value={dt.id}>{dt.name}</option>
                    </>
                  );
                })}
              </Select>
            </div>
            <div className="flex flex-col w-96">
              <p className="text-xs font-bold text-blue-500">Quận/huyện</p>
              <Select
                className="rounded-md h-10 w-full font-medium"
                value={districtID}
                onChange={(e: any) => {
                  setDistrictID(e);
                  setWardID("");
                }}
              >
                {districtData?.map((dt: any) => {
                  return (
                    <>
                      <option value={dt.id}>{dt.full_name}</option>
                    </>
                  );
                })}
              </Select>
            </div>
            <div className="flex flex-col w-96">
              <p className="text-xs font-bold text-blue-500">Phường/xã</p>
              <Select
                className="rounded-md h-10 w-full font-medium"
                value={wardID}
                onChange={(e: any) => {
                  setWardID(e);
                }}
                disabled={districtID === "" ? true : false}
              >
                {wardData?.map((dt: any) => {
                  return (
                    <>
                      <option value={dt.id}>{dt.full_name}</option>
                    </>
                  );
                })}
              </Select>
            </div>
          </div>
        </div>
        <div className="flex flex-col my-2 py-4">
          <p className="text-xs font-bold text-blue-500">Ảnh giới thiệu</p>
          <div className="p-2 bg-gray-100 rounded-sm w-full flex gap-x-2">
            <div className="flex gap-x-2">
              {listImg?.map((dt: any) => {
                return (
                  <>
                    <div className="w-44 h-44 rounded-sm overflow-hidden relative">
                      <Image
                        alt=""
                        width={200}
                        height={200}
                        src={dt.imagePath}
                      />
                      <div className="absolute top-0 right-0 w-8 h-8 flex justify-center items-center text-white rounded-full bg-blue-800 overflow-hidden cursor-pointer hover:bg-red-800">
                        <IoClose
                          className="w-6 h-6"
                          onClick={() => {
                            handleDeleteImg(dt.id);
                          }}
                        />
                      </div>
                    </div>
                  </>
                );
              })}
              {listAddImg?.map((dt: any, ikey: any) => {
                return (
                  <>
                    <div className="w-44 h-44 rounded-sm overflow-hidden relative">
                      <Image alt="" width={200} height={200} src={dt.base64} />
                      <div className="absolute top-0 right-0 w-8 h-8 flex justify-center items-center text-white rounded-full bg-blue-800 overflow-hidden cursor-pointer hover:bg-red-800">
                        <IoClose
                          className="w-6 h-6"
                          onClick={() => {
                            handleDeleteImg(ikey, true);
                          }}
                        />
                      </div>
                    </div>
                  </>
                );
              })}
            </div>

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
                onChange={handleAddImg}
                multiple
              />
            </div>
          </div>
        </div>
        <div className="flex flex-col my-2 py-4">
          <p className="text-xs font-bold text-blue-500">Ảnh logo</p>
          <div className="p-2 bg-gray-100 rounded-sm w-fit flex gap-x-2">
            <div className="flex gap-x-2">
              {logoShowImg && (
                <>
                  <div className="w-44 h-44 rounded-sm overflow-hidden relative">
                    <Image alt="" width={200} height={200} src={logoShowImg} />
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
        <div className="flex flex-col">
          <p className="text-xs font-bold text-blue-500">Mô tả</p>
          <TextEditor
            dataReq={dataRequest}
            handleChangeData={handleChangeData}
          />
        </div>
        <div className="w-full flex justify-end">
          <button
            // disabled={!btnUpdate}
            className={`p-2 rounded-md font-semibold hover:bg-blue-400 bg-blue-500 text-white`}
            onClick={() => {
              handleUpdateServer();
            }}
          >
            Áp dụng
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProfileCompany;
