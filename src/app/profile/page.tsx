/* eslint-disable react-hooks/rules-of-hooks */
"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import "./style.scss";
import InfoPerson from "@/components/ProfileComponent/InfoPerson/InfoPerson";
import JobProfile from "@/components/ProfileComponent/JobProfile/JobProfile";
import EducationProfile from "@/components/ProfileComponent/EducationProfile/EducationProfile";
import ExperienceProfile from "@/components/ProfileComponent/ExperienceProfile/ExperienceProfile";
import AchivementProfile from "@/components/ProfileComponent/AchivementProfile/AchivementProfile";
import ContactProfile from "@/components/ProfileComponent/ContactProfile/ContactProfile";
import SkillProfile from "@/components/ProfileComponent/SkillProfile/SkillProfile";
import LanguageProfile from "@/components/ProfileComponent/LanguageProfile/LanguageProfile";
import AvatarProfile from "@/components/ProfileComponent/AvatarProfile/AvatarProfile";
import NameProfile from "@/components/ProfileComponent/NameProfile/NameProfile";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux";
import { fetchProfile } from "@/redux/reducer/profileReducer/profileSlice";
import { useSrollContext } from "@/context/AppProvider";
import { AiFillDashboard } from "react-icons/ai";
import { MdEditDocument } from "react-icons/md";
import { FaBuilding } from "react-icons/fa";
import { MdWork } from "react-icons/md";
import { IoMdSettings } from "react-icons/io";

import CvProfile from "@/components/ProfileComponent/CvProfile/CvProfile";

type Props = {};

const page = (props: Props) => {
  const dataProfile = useSelector((state: RootState) => state.profile.profile);
  const { reponsiveMobile } = useSrollContext();
  const dispatch = useDispatch();
  const [dataInfo, setDataInfo] = useState<any>();
  const { handleLoadHrefPage } = useSrollContext();
  const [resizePage, setResizePage] = useState<boolean>(false);
  const [menuProfile, setMenuProfile] = useState<boolean>(false);
  const handleUpdateApi = () => {
    dispatch(fetchProfile("vi") as any);
  };
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
    handleLoadHrefPage();
    const handleResize = () => {
      if (window.innerWidth < 1152) {
        setResizePage(true);
      } else {
        setResizePage(false);
      }
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
        <div className=" w-full flex items-start pb-16 relative">
          {/* <AvatarProfile
            dataInfo={dataInfo}
            handleUpdateApi={handleUpdateApi}
            checkUpdate={false}
          />
          <NameProfile
            dataInfo={dataInfo}
            handleUpdateApi={handleUpdateApi}
            checkUpdate={false}
          />
          <div className={`flex w-full ${resizePage ? "flex-wrap px-16" : ""}`}>
            <div
              className={` ${resizePage ? "min-w-full" : "mr-9 basis-8/12"}`}
            >
              <InfoPerson
                dataInfo={dataInfo}
                handleUpdateApi={handleUpdateApi}
                checkUpdate={false}
              />
              <JobProfile
                dataInfo={dataInfo}
                handleUpdateApi={handleUpdateApi}
                checkUpdate={false}
              />
              <EducationProfile
                dataInfo={dataInfo}
                handleUpdateApi={handleUpdateApi}
                checkUpdate={false}
              />
              <ExperienceProfile
                dataInfo={dataInfo}
                handleUpdateApi={handleUpdateApi}
                checkUpdate={false}
              />
              <AchivementProfile
                dataInfo={dataInfo}
                handleUpdateApi={handleUpdateApi}
                checkUpdate={false}
              />
              <CvProfile profile={dataProfile} />
            </div>

            <div className={` ${resizePage ? "min-w-full" : "basis-4/12"}`}>
              <ContactProfile
                dataInfo={dataInfo}
                handleUpdateApi={handleUpdateApi}
                checkUpdate={false}
              />
              <SkillProfile
                dataInfo={dataInfo}
                handleUpdateApi={handleUpdateApi}
                checkUpdate={false}
              />
              <LanguageProfile
                dataInfo={dataInfo}
                handleUpdateApi={handleUpdateApi}
                checkUpdate={false}
              />
            </div>
          </div> */}
          <div
            className={`${
              reponsiveMobile < 950 ? "absolute z-40" : "basis-1/4"
            }  rounded-lg flex justify-center gap-y-6  flex-col items-center p-4`}
          >
            <div
              className={`bg-blue-500 rounded-lg w-full h-fit p-4 flex justify-center items-center ${
                reponsiveMobile > 990 ? " flex-col" : "gap-x-2"
              }`}
              onClick={() => {
                if (reponsiveMobile < 950) {
                  setMenuProfile(!menuProfile);
                }
              }}
            >
              {reponsiveMobile > 990 ? (
                <AvatarProfile
                  dataInfo={dataInfo}
                  handleUpdateApi={handleUpdateApi}
                  checkUpdate={false}
                />
              ) : (
                <Image
                  className={`${
                    dataInfo?.avatarPath ? "" : ""
                  }w-6 h-6 rounded-full border-2`}
                  src={dataInfo?.avatarPath ?? "/iconuser.svg"}
                  width={1000}
                  height={1000}
                  alt={""}
                />
              )}
              {reponsiveMobile < 950 ? (
                ""
              ) : (
                <p className="font-bold text-white">Nguyễn Tuấn Kiệt Quệ</p>
              )}
            </div>
            <div className="flex flex-col items-center gap-y-3 w-full justify-center">
              <div
                className={` w-full hover:font-semibold relative  text-lg py-4 rounded-md transition-all duration-500 border-[1px] hover:border-blue-500 bg-white  hover:bg-blue-200  cursor-pointer flex items-center gap-x-2  ${
                  reponsiveMobile < 950
                    ? `justify-center ${
                        menuProfile ? "" : "-top-20 opacity-0 -z-10"
                      }`
                    : "pl-6 hover:text-white"
                }`}
              >
                <AiFillDashboard />
                <p
                  className={`${
                    reponsiveMobile < 950
                      ? "absolute left-full text-white translate-x-5 text-nowrap"
                      : ""
                  }   `}
                >
                  Tổng quan
                </p>
              </div>
              <div
                className={` w-full hover:font-semibold relative  text-lg py-4 rounded-md transition-all duration-500 border-[1px] hover:border-blue-500 bg-white  hover:bg-blue-200  cursor-pointer flex items-center gap-x-2  ${
                  reponsiveMobile < 950
                    ? `justify-center ${
                        menuProfile ? "" : "-top-20 opacity-0 -z-10"
                      }`
                    : "pl-6 hover:text-white"
                }`}
              >
                <MdEditDocument />
                <p
                  className={`${
                    reponsiveMobile < 950
                      ? "absolute left-full text-white translate-x-5 text-nowrap"
                      : ""
                  }   `}
                >
                  Hồ sơ cá nhân
                </p>
              </div>
              <div
                className={` w-full hover:font-semibold relative  text-lg py-4 rounded-md transition-all duration-500 border-[1px] hover:border-blue-500 bg-white  hover:bg-blue-200  cursor-pointer flex items-center gap-x-2  ${
                  reponsiveMobile < 950
                    ? `justify-center ${
                        menuProfile ? "" : "-top-20 opacity-0 -z-10"
                      }`
                    : "pl-6 hover:text-white"
                }`}
              >
                <FaBuilding />
                <p
                  className={`${
                    reponsiveMobile < 950
                      ? "absolute left-full text-white translate-x-5 text-nowrap"
                      : ""
                  }   `}
                >
                  Công ty của tôi
                </p>
              </div>
              <div
                className={` w-full hover:font-semibold relative  text-lg py-4 rounded-md transition-all duration-500 border-[1px] hover:border-blue-500 bg-white  hover:bg-blue-200  cursor-pointer flex items-center gap-x-2  ${
                  reponsiveMobile < 950
                    ? `justify-center ${
                        menuProfile ? "" : "-top-20 opacity-0 -z-10"
                      }`
                    : "pl-6 hover:text-white"
                }`}
              >
                <MdWork />
                <p
                  className={`${
                    reponsiveMobile < 950
                      ? "absolute left-full text-white translate-x-5 text-nowrap"
                      : ""
                  }   `}
                >
                  Việc làm của tôi
                </p>
              </div>
              <div
                className={` w-full hover:font-semibold relative  text-lg py-4 rounded-md transition-all duration-500 border-[1px] hover:border-blue-500 bg-white  hover:bg-blue-200  cursor-pointer flex items-center gap-x-2  ${
                  reponsiveMobile < 950
                    ? `justify-center ${
                        menuProfile ? "" : "-top-20 opacity-0 -z-10"
                      }`
                    : "pl-6 hover:text-white"
                }`}
              >
                <IoMdSettings />
                <p
                  className={`${
                    reponsiveMobile < 950
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
              reponsiveMobile < 1280
                ? reponsiveMobile < 992
                  ? "flex-1"
                  : "flex-1 mr-2"
                : "basis-2/3"
            }  mt-8 rounded-lg h-full flex flex-col gap-y-4`}
          >
            {/* bg-white shadow-[0_8px_30px_rgb(0,0,0,0.12)] */}
            {reponsiveMobile < 990 && (
              <div className="flex justify-center">
                <AvatarProfile
                  dataInfo={dataInfo}
                  handleUpdateApi={handleUpdateApi}
                  checkUpdate={false}
                />
              </div>
            )}

            <div>
              <InfoPerson
                dataInfo={dataInfo}
                handleUpdateApi={handleUpdateApi}
                checkUpdate={false}
              />
            </div>
            <div>
              <ContactProfile
                dataInfo={dataInfo}
                handleUpdateApi={handleUpdateApi}
                checkUpdate={false}
              />
            </div>
            <div>
              <JobProfile
                dataInfo={dataInfo}
                handleUpdateApi={handleUpdateApi}
                checkUpdate={false}
              />
            </div>
            <div>
              <EducationProfile
                dataInfo={dataInfo}
                handleUpdateApi={handleUpdateApi}
                checkUpdate={false}
              />
            </div>
            <div>
              <ExperienceProfile
                dataInfo={dataInfo}
                handleUpdateApi={handleUpdateApi}
                checkUpdate={false}
              />
            </div>
            <div>
              <AchivementProfile
                dataInfo={dataInfo}
                handleUpdateApi={handleUpdateApi}
                checkUpdate={false}
              />
            </div>
            <div>
              <SkillProfile
                dataInfo={dataInfo}
                handleUpdateApi={handleUpdateApi}
                checkUpdate={false}
              />
            </div>
            <div>
              <LanguageProfile
                dataInfo={dataInfo}
                handleUpdateApi={handleUpdateApi}
                checkUpdate={false}
              />
            </div>
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
