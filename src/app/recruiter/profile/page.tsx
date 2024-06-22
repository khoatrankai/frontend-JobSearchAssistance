/* eslint-disable react-hooks/rules-of-hooks */
"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import "./style.scss";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux";
import { fetchProfile } from "@/redux/reducer/profileReducer/profileSlice";
import { useSrollContext } from "@/context/AppProvider";
import { AiFillDashboard } from "react-icons/ai";
import { MdEditDocument, MdOutlineManageHistory } from "react-icons/md";
import { FaBuilding } from "react-icons/fa";
import { MdWork } from "react-icons/md";
import { IoMdSettings } from "react-icons/io";
import CheckRoleRecruiter from "@/util/CheckRoleRecruiter";
import Dashboard from "@/components/ProfileComponent/RecruiterProfile/Dashboard/Dashboard";
import RecruitmentList from "@/components/ProfileComponent/RecruiterProfile/RecruitmentList/RecruitmentList";
import PotentialCandidate from "@/components/ProfileComponent/RecruiterProfile/PotentialCandidate/PotentialCandidate";
import ProfileCompany from "@/components/ProfileComponent/RecruiterProfile/ProfileCompany/ProfileCompany";
import SettingProfile from "@/components/ProfileComponent/RecruiterProfile/SettingProfile/SettingProfile";
import { fetchProfileRecruiter } from "@/redux/reducer/profileReducer/profileSliceRecruiter";
import { FaListCheck } from "react-icons/fa6";
import { RiMoneyDollarCircleFill } from "react-icons/ri";
import ListPostProfile from "@/components/ProfileComponent/RecruiterProfile/ListPostProfile/ListPostProfile";
import RechargePrice from "@/components/ProfileComponent/RecruiterProfile/RechargePrice/RechargePrice";
import PackageService from "@/components/ProfileComponent/RecruiterProfile/PackageService/PackageService";
import AvatarRecruiterProfile from "@/components/ProfileComponent/AvatarRecruiterProfile/AvatarProfile";

type Props = {};

const page = (props: Props) => {
  CheckRoleRecruiter();
  const dataProfile = useSelector(
    (state: RootState) => state.profileRecruiter.profile
  );
  const { reponsiveMobile, selectProfileUser, selectProfileRecruiter } =
    useSrollContext();
  const dispatch = useDispatch();
  const [dataInfo, setDataInfo] = useState<any>();
  const { handleLoadHrefPage } = useSrollContext();
  //   const [resizePage, setResizePage] = useState<boolean>(false);
  const [menuProfile, setMenuProfile] = useState<boolean>(false);
  const [selectionMenu, setSelectionMenu] = useState<number>(6);
  const handleUpdateApi = () => {
    dispatch(fetchProfileRecruiter("vi") as any);
  };
  useEffect(() => {
    setSelectionMenu(selectProfileRecruiter);
  }, [selectProfileRecruiter]);
  useEffect(() => {
    setDataInfo({
      ...dataProfile,
      address: dataProfile?.addressText?.id,
      categoryIds: dataProfile?.profileCategories?.map((dt: any) => {
        return dt.id;
      }),
      locationIds: dataProfile?.profileLocations?.map((dt: any) => {
        return dt.id;
      }),
      profilesSkills: dataProfile?.profilesSkills?.map((dt: any) => {
        return {
          id: dt?.id,
          skillName: dt?.skillName,
          skillLevelId: dt?.dataLevel?.id,
        };
      }),
      profilesLanguages: dataProfile?.profilesLanguages?.map((dt: any) => {
        return {
          id: dt?.id,
          languageName: dt?.languageName,
          languageLevelId: dt?.dataLevel?.id,
        };
      }),
    });
  }, [dataProfile]);
  useEffect(() => {
    // handleLoadHrefPage();
    const handleResize = () => {
      //   if (window.innerWidth < 1152) {
      //     setResizePage(true);
      //   } else {
      //     setResizePage(false);
      //   }
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div>
      <div className="flex justify-center bg-gray-200/45">
        <div className=" w-full flex gap-x-8 items-start pb-16 relative px-4">
          <div
            className={`${
              reponsiveMobile < 1152
                ? "absolute z-40"
                : "min-w-[400px] w-[400px]"
            }  rounded-lg flex justify-center gap-y-6  flex-col items-center p-4`}
          >
            <div
              className={`bg-blue-500 rounded-lg w-full h-fit p-4 flex justify-center items-center ${
                reponsiveMobile > 1152 ? " flex-col" : "gap-x-2"
              }`}
              onClick={() => {
                if (reponsiveMobile < 1152) {
                  setMenuProfile(!menuProfile);
                }
              }}
            >
              {reponsiveMobile > 1152 ? (
                <AvatarRecruiterProfile
                  dataInfo={dataInfo}
                  handleUpdateApi={handleUpdateApi}
                  checkUpdate={false}
                />
              ) : (
                <Image
                  className={`w-6 h-6 rounded-full border-2`}
                  src={dataInfo?.companyInfomation?.logoPath ?? "/iconuser.svg"}
                  width={1000}
                  height={1000}
                  alt={""}
                />
              )}
              {reponsiveMobile < 1152 ? (
                ""
              ) : (
                <p className="font-bold text-white">{dataInfo?.name}</p>
              )}
            </div>
            <div className="flex flex-col items-center gap-y-3 w-full justify-center">
              <div
                className={` w-full hover:font-semibold relative  text-lg py-4 rounded-md transition-all duration-500 border-[1px] ${
                  selectionMenu === 1
                    ? "border-blue-500 bg-blue-200"
                    : "bg-white"
                } hover:border-blue-500   hover:bg-blue-200  cursor-pointer flex items-center gap-x-2  ${
                  reponsiveMobile < 1152
                    ? `justify-center ${
                        menuProfile ? "" : "-top-20 opacity-0 -z-10"
                      }`
                    : "pl-6 hover:text-white"
                }`}
                onClick={() => {
                  setSelectionMenu(1);
                  setMenuProfile(false);
                }}
              >
                <AiFillDashboard />
                <p
                  className={`${
                    reponsiveMobile < 1152
                      ? "absolute left-full text-white translate-x-5 text-nowrap"
                      : ""
                  }   `}
                >
                  Tổng quan
                </p>
              </div>
              <div
                className={` w-full hover:font-semibold relative  text-lg py-4 rounded-md transition-all duration-500 border-[1px] ${
                  selectionMenu === 2
                    ? "border-blue-500 bg-blue-200"
                    : "bg-white"
                } hover:border-blue-500   hover:bg-blue-200  cursor-pointer flex items-center gap-x-2  ${
                  reponsiveMobile < 1152
                    ? `justify-center ${
                        menuProfile ? "" : "-top-20 opacity-0 -z-10"
                      }`
                    : "pl-6 hover:text-white"
                }`}
                onClick={() => {
                  setSelectionMenu(2);
                  setMenuProfile(false);
                }}
              >
                <MdEditDocument />
                <p
                  className={`${
                    reponsiveMobile < 1152
                      ? "absolute left-full text-white translate-x-5 text-nowrap"
                      : ""
                  }   `}
                >
                  Thông tin công ty
                </p>
              </div>
              <div
                className={` w-full hover:font-semibold relative  text-lg py-4 rounded-md transition-all duration-500 border-[1px] ${
                  selectionMenu === 3
                    ? "border-blue-500 bg-blue-200"
                    : "bg-white"
                } hover:border-blue-500   hover:bg-blue-200  cursor-pointer flex items-center gap-x-2  ${
                  reponsiveMobile < 1152
                    ? `justify-center ${
                        menuProfile ? "" : "-top-20 opacity-0 -z-10"
                      }`
                    : "pl-6 hover:text-white"
                }`}
                onClick={() => {
                  setSelectionMenu(3);
                  setMenuProfile(false);
                }}
              >
                <FaBuilding />
                <p
                  className={`${
                    reponsiveMobile < 1152
                      ? "absolute left-full text-white translate-x-5 text-nowrap"
                      : ""
                  }   `}
                >
                  Hồ sơ tuyển dụng
                </p>
              </div>
              <div
                className={` w-full hover:font-semibold relative  text-lg py-4 rounded-md transition-all duration-500 border-[1px] ${
                  selectionMenu === 4
                    ? "border-blue-500 bg-blue-200"
                    : "bg-white"
                } hover:border-blue-500   hover:bg-blue-200  cursor-pointer flex items-center gap-x-2  ${
                  reponsiveMobile < 1152
                    ? `justify-center ${
                        menuProfile ? "" : "-top-20 opacity-0 -z-10"
                      }`
                    : "pl-6 hover:text-white"
                }`}
                onClick={() => {
                  setSelectionMenu(4);
                  setMenuProfile(false);
                }}
              >
                <MdWork />
                <p
                  className={`${
                    reponsiveMobile < 1152
                      ? "absolute left-full text-white translate-x-5 text-nowrap"
                      : ""
                  }   `}
                >
                  Ứng viên tiềm năng
                </p>
              </div>
              <div
                className={` w-full hover:font-semibold relative  text-lg py-4 rounded-md transition-all duration-500 border-[1px] ${
                  selectionMenu === 5
                    ? "border-blue-500 bg-blue-200"
                    : "bg-white"
                } hover:border-blue-500   hover:bg-blue-200  cursor-pointer flex items-center gap-x-2  ${
                  reponsiveMobile < 1152
                    ? `justify-center ${
                        menuProfile ? "" : "-top-20 opacity-0 -z-10"
                      }`
                    : "pl-6 hover:text-white"
                }`}
                onClick={() => {
                  setSelectionMenu(5);
                  setMenuProfile(false);
                }}
              >
                <FaListCheck />
                <p
                  className={`${
                    reponsiveMobile < 1152
                      ? "absolute left-full text-white translate-x-5 text-nowrap"
                      : ""
                  }   `}
                >
                  Danh sách bài viết
                </p>
              </div>
              <div
                className={` w-full hover:font-semibold relative  text-lg py-4 rounded-md transition-all duration-500 border-[1px] ${
                  selectionMenu === 6
                    ? "border-blue-500 bg-blue-200"
                    : "bg-white"
                } hover:border-blue-500   hover:bg-blue-200  cursor-pointer flex items-center gap-x-2  ${
                  reponsiveMobile < 1152
                    ? `justify-center ${
                        menuProfile ? "" : "-top-20 opacity-0 -z-10"
                      }`
                    : "pl-6 hover:text-white"
                }`}
                onClick={() => {
                  setSelectionMenu(6);
                  setMenuProfile(false);
                }}
              >
                <RiMoneyDollarCircleFill />
                <p
                  className={`${
                    reponsiveMobile < 1152
                      ? "absolute left-full text-white translate-x-5 text-nowrap"
                      : ""
                  }   `}
                >
                  Nạp tiền
                </p>
              </div>
              <div
                className={` w-full hover:font-semibold relative  text-lg py-4 rounded-md transition-all duration-500 border-[1px] ${
                  selectionMenu === 7
                    ? "border-blue-500 bg-blue-200"
                    : "bg-white"
                } hover:border-blue-500   hover:bg-blue-200  cursor-pointer flex items-center gap-x-2  ${
                  reponsiveMobile < 1152
                    ? `justify-center ${
                        menuProfile ? "" : "-top-20 opacity-0 -z-10"
                      }`
                    : "pl-6 hover:text-white"
                }`}
                onClick={() => {
                  setSelectionMenu(7);
                  setMenuProfile(false);
                }}
              >
                <MdOutlineManageHistory />
                <p
                  className={`${
                    reponsiveMobile < 1152
                      ? "absolute left-full text-white translate-x-5 text-nowrap"
                      : ""
                  }   `}
                >
                  Dịch vụ
                </p>
              </div>
              <div
                className={` w-full hover:font-semibold relative  text-lg py-4 rounded-md transition-all duration-500 border-[1px] ${
                  selectionMenu === 8
                    ? "border-blue-500 bg-blue-200"
                    : "bg-white"
                } hover:border-blue-500   hover:bg-blue-200  cursor-pointer flex items-center gap-x-2  ${
                  reponsiveMobile < 1152
                    ? `justify-center ${
                        menuProfile ? "" : "-top-20 opacity-0 -z-10"
                      }`
                    : "pl-6 hover:text-white"
                }`}
                onClick={() => {
                  setSelectionMenu(8);
                  setMenuProfile(false);
                }}
              >
                <IoMdSettings />
                <p
                  className={`${
                    reponsiveMobile < 1152
                      ? "absolute left-full text-white translate-x-5 text-nowrap"
                      : ""
                  }   `}
                >
                  Quản lý tài khoản
                </p>
              </div>
            </div>
          </div>
          <div
            className={`${
              reponsiveMobile < 1152
                ? "flex-auto w-96 mt-16"
                : "flex-auto mr-2 w-96"
            } rounded-lg h-full flex flex-col gap-y-4`}
          >
            {/* bg-white shadow-[0_8px_30px_rgb(0,0,0,0.12)] */}
            {selectionMenu === 1 && <Dashboard />}
            {selectionMenu === 2 && (
              <ProfileCompany
                dataInfo={dataInfo}
                handleUpdateApi={handleUpdateApi}
              />
            )}
            {selectionMenu === 3 && <RecruitmentList />}
            {selectionMenu === 4 && <PotentialCandidate />}
            {selectionMenu === 5 && <ListPostProfile />}
            {selectionMenu === 6 && <RechargePrice />}
            {selectionMenu === 7 && <PackageService />}

            {selectionMenu === 8 && <SettingProfile />}
          </div>
        </div>
        {menuProfile && (
          <div
            className="fixed inset-0 bg-black/30"
            onClick={() => {
              setMenuProfile(false);
            }}
          ></div>
        )}
      </div>
    </div>
  );
};

export default page;
