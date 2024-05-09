/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-hooks/rules-of-hooks */
"use client";
import "./page.scss";
import React, { useEffect, useState } from "react";

import { useDispatch, useSelector } from "react-redux";
import { fetchProfileRecruiter } from "@/redux/reducer/profileReducer/profileSliceRecruiter";
import profileAPi from "@/api/profiles/profileApiRecruiter";
import { useParams } from "next/navigation";
import { SaveIconFill, SaveIconOutline } from "@/icons";
import candidateSearch from "@/api/candidate/apiCandidates";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import CvProfile from "@/components/ProfileComponent/CvProfile/CvProfile";
import Image from "next/image";
import { IoMdSettings } from "react-icons/io";
import { MdCastForEducation, MdEditDocument, MdWork } from "react-icons/md";
import {
  FaAward,
  FaBuilding,
  FaCheck,
  FaHeart,
  FaLanguage,
  FaPhoneSquare,
} from "react-icons/fa";
import { AiFillDashboard } from "react-icons/ai";
import { IoClose } from "react-icons/io5";
import { FaClipboardUser } from "react-icons/fa6";
import { RiVipDiamondFill } from "react-icons/ri";
import { GiSkills } from "react-icons/gi";
import InfoPerson from "@/components/ProfileShow/InfoPerson/InfoPerson";
import { HiMiniClipboardDocumentList } from "react-icons/hi2";
import InfoEducation from "@/components/ProfileShow/InfoEducation/InfoEducation";
import InfoExperience from "@/components/ProfileShow/InfoExperience/InfoExperience";
import InfoAward from "@/components/ProfileShow/InfoAward/InfoAward";
import InfoSkill from "@/components/ProfileShow/InfoSkill/InfoSkill";
import InfoLanguage from "@/components/ProfileShow/InfoLanguage/InfoLanguage";
import InfoCV from "@/components/ProfileShow/InfoCV/InfoCV";

type Props = {};

interface IBookmark {
  status: number;
  message: string;
}

const page = (props: Props) => {
  const dispatch = useDispatch();
  const [dataInfo, setDataInfo] = useState<any>();
  const [dataProfile, setDataProfile] = useState<any>({});
  const [resizePage, setResizePage] = useState<boolean>(false);
  const useSearchParams = useParams();
  const [accountId, setAccountId] = useState<any>();

  useEffect(() => {
    const fetchData = async () => {
      setAccountId(localStorage.getItem("accountIdRecruiter"));
      const res = await profileAPi.getProfileByAccountId(
        "vi",
        useSearchParams.id as string
      );

      if (res && res.status === 200) {
        setDataProfile(res.data);
      }
    };

    fetchData();
  }, []);

  const handleUpdateApi = () => {
    dispatch(fetchProfileRecruiter("vi") as any);
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

  const handleBookmarked = (id: number) => {
    try {
      const fetchData = async () => {
        const res = (await candidateSearch.postBookmarkCandidate(
          useSearchParams.id as string
        )) as unknown as IBookmark;

        if (res && res.status === 201) {
          toast.success("Save candidate success", {
            position: "bottom-center",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
          });

          setDataProfile({ ...dataProfile, isBookmarked: true });
        }
      };

      fetchData();
    } catch (error) {
      toast.error("You cannot bookmark your own post", {
        position: "bottom-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    }
  };

  const handleDeleteBookmarked = (id: number) => {
    try {
      const fetchData = async () => {
        const res = (await candidateSearch.postBookmarkCandidate(
          useSearchParams.id as string
        )) as unknown as IBookmark;

        if (res && res.status === 200) {
          toast.success("Unsave candidate success", {
            position: "bottom-center",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
          });

          setDataProfile({ ...dataProfile, isBookmarked: false });
        }
      };

      fetchData();
    } catch (error) {
      toast.error("You cannot delete your own post", {
        position: "bottom-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    }
  };

  return (
    <div className="flex gap-x-2 w-full min-h-96">
      <div className="w-96 h-full">
        <div className="fixed left- w-96 top-20 bottom-0 z-30 flex flex-col p-4 bg-gray-50 overflow-y-scroll max-h-full">
          <div className="flex flex-col gap-y-4">
            <div
              className={`bg-blue-500 rounded-lg w-full h-fit px-4 py-6 flex flex-col gap-y-4 justify-center items-center`}
            >
              <div className="flex w-full justify-between items-center  gap-x-4">
                <div className="flex justify-center">
                  <Image
                    src={"/goapply.png"}
                    alt=""
                    width={150}
                    height={150}
                    className="rounded-full"
                  />
                </div>
                <p className="font-bold text-white">Nguyễn Tuấn Kiệt Quệ</p>
              </div>
              <div className="flex gap-x-2 w-full text-xs font-semibold text-white">
                <button className="p-2 basis-1/3 rounded-md bg-red-500 flex gap-x-1 items-center justify-center">
                  <IoClose />
                  Từ chối
                </button>
                <button className="p-2 basis-1/3 rounded-md bg-green-500 flex gap-x-1 items-center justify-center">
                  <FaCheck />
                  Chấp nhận
                </button>
                <button className="p-2 basis-1/3 rounded-md bg-yellow-500 flex gap-x-1 items-center justify-center">
                  <FaHeart className="text-red-500" />
                  Lưu
                </button>
              </div>
              {/* <div className="w-80 flex gap-x-2 overflow-x-scroll scroll-cv px-2 py-1">
                <div className="min-w-20">
                  <Image
                    className="rounded-lg"
                    alt=""
                    height={100}
                    width={80}
                    src={"/formCV/cv1.webp"}
                  />
                </div>
                <div className="min-w-20">
                  <Image
                    className="rounded-lg"
                    alt=""
                    height={100}
                    width={80}
                    src={"/formCV/cv1.webp"}
                  />
                </div>
                <div className="min-w-20">
                  <Image
                    className="rounded-lg"
                    alt=""
                    height={100}
                    width={80}
                    src={"/formCV/cv1.webp"}
                  />
                </div>
                <div className="min-w-20">
                  <Image
                    className="rounded-lg"
                    alt=""
                    height={100}
                    width={80}
                    src={"/formCV/cv1.webp"}
                  />
                </div>
                <div className="min-w-20">
                  <Image
                    className="rounded-lg"
                    alt=""
                    height={100}
                    width={80}
                    src={"/formCV/cv1.webp"}
                  />
                </div>
              </div> */}
            </div>
            <div className="flex flex-col items-center gap-y-3 w-full justify-center h-full px-2 py-4 flex-1">
              <div
                className={` w-full hover:font-semibold relative  text-lg py-4 rounded-md transition-all duration-500 border-[1px]  flex items-center gap-x-1 pl-6 hover:text-white bg-white`}
                onClick={() => {}}
              >
                <FaClipboardUser />
                <p>Thông tin cá nhân</p>
              </div>
              {/* <div
                className={` w-full hover:font-semibold relative  text-lg py-4 rounded-md transition-all duration-500 border-[1px]  flex items-center gap-x-1 pl-6 hover:text-white bg-white`}
                onClick={() => {}}
              >
                <FaPhoneSquare />
                <p>Thông tin liên hệ</p>
              </div> */}
              <div
                className={` w-full hover:font-semibold relative  text-lg py-4 rounded-md transition-all duration-500 border-[1px]  flex items-center gap-x-1 pl-6 hover:text-white bg-white`}
                onClick={() => {}}
              >
                <MdCastForEducation />
                <p>Trình độ học vấn</p>
              </div>
              <div
                className={` w-full hover:font-semibold relative  text-lg py-4 rounded-md transition-all duration-500 border-[1px]  flex items-center gap-x-1 pl-6 hover:text-white bg-white`}
                onClick={() => {}}
              >
                <RiVipDiamondFill />
                <p>Kinh nghiệm làm việc</p>
              </div>
              <div
                className={` w-full hover:font-semibold relative  text-lg py-4 rounded-md transition-all duration-500 border-[1px]  flex items-center gap-x-1 pl-6 hover:text-white bg-white`}
                onClick={() => {}}
              >
                <FaAward />
                <p>Giải thưởng</p>
              </div>
              <div
                className={` w-full hover:font-semibold relative  text-lg py-4 rounded-md transition-all duration-500 border-[1px]  flex items-center gap-x-1 pl-6 hover:text-white bg-white`}
                onClick={() => {}}
              >
                <GiSkills />
                <p>Kỹ năng</p>
              </div>

              <div
                className={` w-full hover:font-semibold relative  text-lg py-4 rounded-md transition-all duration-500 border-[1px]  flex items-center gap-x-1 pl-6 hover:text-white bg-white`}
                onClick={() => {}}
              >
                <FaLanguage />
                <p>Ngoại ngữ</p>
              </div>
              <div
                className={` w-full hover:font-semibold relative  text-lg py-4 rounded-md transition-all duration-500 border-[1px]  flex items-center gap-x-1 pl-6 hover:text-white bg-white`}
                onClick={() => {}}
              >
                <HiMiniClipboardDocumentList />
                <p>Thông tin CV</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="flex-1 h-full">
        <InfoPerson />
        <InfoEducation />
        <InfoExperience />
        <InfoAward />
        <div className=" py-12 flex flex-col justify-center items-center">
          <p className="text-3xl font-bold text-blue-700">Năng lực</p>
          <div className="px-8 py-12 flex justify-center gap-x-8 flex-wrap w-full">
            <InfoSkill />
            <InfoLanguage />
          </div>
        </div>
        <InfoCV />
      </div>
      {/* <ToastContainer /> */}
    </div>
  );
};

export default page;
