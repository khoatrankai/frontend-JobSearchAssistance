/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-hooks/rules-of-hooks */
"use client";
import "./page.scss";
import React, { useEffect, useRef, useState } from "react";

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
import { AiFillDashboard, AiFillMessage } from "react-icons/ai";
import { IoClose } from "react-icons/io5";
import { FaArrowsLeftRight, FaClipboardUser } from "react-icons/fa6";
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
import applicationApi from "@/api/application/applicationApi";
import { useSrollContext } from "@/context/AppProvider";
import { TextareaAutosize } from "@mui/material";
import CheckRoleRecruiter from "@/util/CheckRoleRecruiter";
import ToastCustom from "@/util/ToastCustom";

type Props = {};

interface IBookmark {
  status: number;
  message: string;
}

const page = (props: Props) => {
  CheckRoleRecruiter();

  const dispatch = useDispatch();
  const { hdError, hdSuccess } = ToastCustom();
  const { scrollTopPosition } = useSrollContext();
  const [tabMenu, setTabMenu] = useState<any>(false);
  const [tabModal, setTabModal] = useState<any>(null);
  const [dataInfo, setDataInfo] = useState<any>();
  const [descriptionRej, setDescriptionRej] = useState<any>();
  const [typeSeen, setTypeSeen] = useState<any>(true);
  const [applicationId, setApplicationId] = useState<any>();
  const [postID, setPostId] = useState<any>();
  const [dataProfilePOST, setDataProfilePOST] = useState<any>([]);
  const [positionScroll, setPositionScroll] = useState<any>(0);
  const [application_status, setStatus] = useState<any>(-1);
  const [dataProfile, setDataProfile] = useState<any>({});
  const [resizePage, setResizePage] = useState<boolean>(false);
  const useSearchParams = useParams();
  const [accountId, setAccountId] = useState<any>();
  const ref_Info = useRef<any>();
  const ref_Study = useRef<any>();
  const ref_Experience = useRef<any>();
  const ref_Award = useRef<any>();
  const ref_Capacity = useRef<any>();
  const ref_CV = useRef<any>();

  useEffect(() => {
    const dataId: any = useSearchParams.id.toString();

    const fetchData = async () => {
      const listData = dataId.split("POST");
      setAccountId(localStorage.getItem("accountIdRecruiter"));
      // //console.log(listData);
      if (listData.length === 2) {
        setApplicationId(listData?.[0]);
        setPostId(Number(listData?.[1]));

        // //console.log(listData);
        const res = (await applicationApi.getRecruiterAplication(
          listData?.[1],
          listData?.[0]
        )) as any;
        // //console.log(res);
        if (res && res.code === 200) {
          setDataProfile(res.data);

          if (res.data.applicationProfile?.application_status === 0) {
            handleUpdateStatus(listData?.[0], 0);
          } else {
            setStatus(res.data.applicationProfile?.application_status);
          }
          const res2 = await profileAPi.getProfileByAccountId(
            "vi",
            res.data.applicationProfile.account_id as string
          );

          if (res2 && res2.status === 200) {
            // //console.log(res2);
            setDataProfilePOST(res2.data);
          }
          setTypeSeen(false);
        }
      } else {
        const res = await profileAPi.getProfileByAccountId(
          "vi",
          dataId as string
        );

        if (res && res.status === 200) {
          setDataProfile(res.data);
          setDataProfilePOST(res.data);
        }
      }
    };

    fetchData();
  }, []);

  // const handleUpdateApi = () => {
  //   dispatch(fetchProfileRecruiter("vi") as any);
  // };
  const handleCancel = async (id: any, index: any) => {
    const res: any = await candidateSearch.postBookmarkCandidate(id);
    if (res && res.status === 200) {
      hdSuccess("Bỏ lưu thành công");
    } else {
      hdSuccess("Lưu thành công");
    }
  };
  const handleTabScroll = () => {
    if (ref_Info?.current?.getBoundingClientRect()?.bottom >= 20) {
      return 0;
    }
    if (20 <= ref_Study?.current?.getBoundingClientRect()?.bottom) {
      return 1;
    }
    if (20 <= ref_Experience?.current?.getBoundingClientRect()?.bottom) {
      return 2;
    }
    if (20 <= ref_Award?.current?.getBoundingClientRect()?.bottom) {
      return 3;
    }
    if (20 <= ref_Capacity?.current?.getBoundingClientRect()?.bottom) {
      return 4;
    }
    if (20 <= ref_CV?.current?.getBoundingClientRect()?.bottom) {
      return 5;
    }
  };
  useEffect(() => {
    setPositionScroll(handleTabScroll());
    // //console.log(scrollTopPosition);
  }, [
    scrollTopPosition,
    ref_Info,
    ref_Award,
    ref_CV,
    ref_Capacity,
    ref_Experience,
    ref_Study,
  ]);
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
  const handleUpdateStatus = async (applicationId: any, status: any) => {
    const dataRes = await applicationApi.updateApplication(
      applicationId,
      status
    );
    setStatus(status);
  };
  const handleBookmarked = (id: string) => {
    try {
      const fetchData = async () => {
        const res = (await candidateSearch.postBookmarkCandidate(
          id as string
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

          setDataProfilePOST({ ...dataProfilePOST, isBookmarked: true });
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
  const handleRejectApplication = async (description: any) => {
    const dataDelete = await applicationApi.updateApplication(
      applicationId,
      3,
      description
    );
    // //console.log(dataDelete);
    setTabModal(false);
    setStatus(3);
  };
  const handleDeleteBookmarked = (id: string) => {
    try {
      const fetchData = async () => {
        const res = (await candidateSearch.postBookmarkCandidate(
          id as string
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

          setDataProfilePOST({ ...dataProfilePOST, isBookmarked: false });
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
  useEffect(() => {
    console.log(dataProfile, dataProfilePOST);
  }, [dataProfile, dataProfilePOST]);
  return (
    <div className="flex gap-x-2 w-full min-h-96 overflow-scroll">
      <div
        className={` h-screen transition-all duration-500 ${
          tabMenu ? "w-96" : "w-0"
        }`}
      >
        <div
          className={`fixed  top-20 bottom-0 z-30 flex flex-col p-4 transition-all duration-500 bg-gray-50 overflow-y-scroll max-h-full ${
            tabMenu ? "w-96 left-0" : "w-0 -left-8"
          }`}
        >
          <div className="flex flex-col gap-y-4">
            <div
              className={`bg-blue-500 rounded-lg w-full h-fit px-4 py-6 flex flex-col gap-y-4 justify-center items-center`}
            >
              <div className="flex w-full justify-between items-center  gap-x-4 px-8">
                <div className="flex justify-center w-36 h-36">
                  <Image
                    src={dataProfilePOST?.avatarPath ?? "/goapply.png"}
                    alt=""
                    width={150}
                    height={150}
                    className="rounded-full w-full h-full"
                  />
                </div>
                <p className="font-bold text-white">{dataProfilePOST?.name}</p>
              </div>

              <div className="flex gap-x-2 w-full text-xs font-semibold text-white">
                {!typeSeen &&
                  (application_status === 0 || application_status === 1) && (
                    <>
                      <button
                        className="p-2 basis-1/3 rounded-md bg-red-500 flex gap-x-1 items-center justify-center"
                        onClick={() => {
                          setTabModal(true);
                        }}
                      >
                        <IoClose />
                        Từ chối
                      </button>
                      <button
                        className="p-2 basis-1/3 rounded-md bg-green-500 flex gap-x-1 items-center justify-center"
                        onClick={() => {
                          handleUpdateStatus(applicationId, 2);
                        }}
                      >
                        <FaCheck />
                        Chấp nhận
                      </button>
                      {/* <button className="p-2 basis-1/3 rounded-md bg-orange-500 flex gap-x-1 items-center justify-center">
                        <AiFillMessage />
                        Nhắn tin
                      </button> */}
                    </>
                  )}
                {!typeSeen && application_status === 2 && (
                  <>
                    <button className="p-2 basis-2/4 rounded-md bg-green-500 flex gap-x-1 items-center justify-center">
                      <FaCheck />
                      Đã chấp thuận
                    </button>
                    {/* <button className="p-2 basis-2/4 rounded-md bg-orange-500 flex gap-x-1 items-center justify-center">
                      <AiFillMessage />
                      Nhắn tin
                    </button> */}
                    {dataProfilePOST?.isBookmarked ? (
                      <button
                        className="p-2 basis-2/4 rounded-md bg-yellow-500 flex gap-x-1 items-center justify-center"
                        onClick={() => {
                          handleDeleteBookmarked(dataProfilePOST?.accountId);
                        }}
                      >
                        <FaHeart className="text-red-500" />
                        Lưu
                      </button>
                    ) : (
                      <button
                        className="p-2 basis-2/4 rounded-md bg-yellow-500 flex gap-x-1 items-center justify-center"
                        onClick={() => {
                          handleBookmarked(dataProfilePOST?.accountId);
                        }}
                      >
                        <FaHeart className="text-white" />
                        Lưu
                      </button>
                    )}
                  </>
                )}
                {!typeSeen && application_status === 3 && (
                  <>
                    <button className="p-2 basis-2/4 rounded-md bg-red-500 flex gap-x-1 items-center justify-center">
                      <FaCheck />
                      Đã từ chối
                    </button>
                    {/* <button className="p-2 basis-2/4 rounded-md bg-orange-500 flex gap-x-1 items-center justify-center">
                      <AiFillMessage />
                      Nhắn tin
                    </button> */}

                    {dataProfilePOST?.isBookmarked ? (
                      <button
                        className="p-2 basis-2/4 rounded-md bg-yellow-500 flex gap-x-1 items-center justify-center"
                        onClick={() => {
                          handleDeleteBookmarked(dataProfilePOST?.accountId);
                        }}
                      >
                        <FaHeart className="text-red-500" />
                        Lưu
                      </button>
                    ) : (
                      <button
                        className="p-2 basis-2/4 rounded-md bg-yellow-500 flex gap-x-1 items-center justify-center"
                        onClick={() => {
                          handleBookmarked(dataProfilePOST?.accountId);
                        }}
                      >
                        <FaHeart className="text-white" />
                        Lưu
                      </button>
                    )}
                  </>
                )}
                {typeSeen && (
                  <>
                    {/* <button className="p-2 basis-1/2 rounded-md bg-orange-500 flex gap-x-1 items-center justify-center">
                      <AiFillMessage />
                      Nhắn tin
                    </button> */}

                    {dataProfilePOST?.isBookmarked ? (
                      <button
                        className="p-2 flex-1 rounded-md bg-yellow-500 flex gap-x-1 items-center justify-center"
                        onClick={() => {
                          handleDeleteBookmarked(dataProfilePOST?.accountId);
                        }}
                      >
                        <FaHeart className="text-red-500" />
                        Lưu
                      </button>
                    ) : (
                      <button
                        className="p-2 flex-1 rounded-md bg-yellow-500 flex gap-x-1 items-center justify-center"
                        onClick={() => {
                          handleBookmarked(dataProfilePOST?.accountId);
                        }}
                      >
                        <FaHeart className="text-white" />
                        Lưu
                      </button>
                    )}
                  </>
                )}
              </div>
            </div>
            <div
              className={`flex flex-col items-center gap-y-3 w-full justify-center h-full px-2 py-4 flex-1 `}
            >
              <div
                className={` w-full  relative  text-lg py-4 rounded-md transition-all duration-500 border-[1px]  flex items-center gap-x-1 pl-6 cursor-pointer ${
                  positionScroll === 0
                    ? "bg-black text-white"
                    : "hover:text-white hover:bg-black bg-white hover:font-semibold"
                }`}
                onClick={() => {
                  ref_Info.current.scrollIntoView({
                    behavior: "smooth",
                  });
                }}
              >
                <FaClipboardUser />
                <p>Thông tin cá nhân</p>
              </div>
              {dataProfile?.profilesEducations?.length > 0 && (
                <div
                  className={` w-full  relative  text-lg py-4 rounded-md transition-all duration-500 border-[1px]  flex items-center gap-x-1 pl-6 cursor-pointer ${
                    positionScroll === 1
                      ? "bg-black text-white"
                      : "hover:text-white hover:bg-black bg-white hover:font-semibold"
                  }`}
                  onClick={() => {
                    ref_Study.current.scrollIntoView({
                      behavior: "smooth",
                    });
                  }}
                >
                  <MdCastForEducation />
                  <p>Trình độ học vấn</p>
                </div>
              )}
              {dataProfile?.profilesExperiences?.length > 0 && (
                <div
                  className={` w-full  relative  text-lg py-4 rounded-md transition-all duration-500 border-[1px]  flex items-center gap-x-1 pl-6 cursor-pointer ${
                    positionScroll === 2
                      ? "bg-black text-white"
                      : "hover:text-white hover:bg-black bg-white hover:font-semibold"
                  }`}
                  onClick={() => {
                    ref_Experience.current.scrollIntoView({
                      behavior: "smooth",
                    });
                  }}
                >
                  <RiVipDiamondFill />
                  <p>Kinh nghiệm làm việc</p>
                </div>
              )}
              {dataProfile?.profileAwards?.length > 0 && (
                <div
                  className={` w-full  relative  text-lg py-4 rounded-md transition-all duration-500 border-[1px]  flex items-center gap-x-1 pl-6 cursor-pointer ${
                    positionScroll === 3
                      ? "bg-black text-white"
                      : "hover:text-white hover:bg-black bg-white hover:font-semibold"
                  }`}
                  onClick={() => {
                    ref_Award.current.scrollIntoView({
                      behavior: "smooth",
                    });
                  }}
                >
                  <FaAward />
                  <p>Giải thưởng</p>
                </div>
              )}
              {dataProfile?.profilesSkills?.length > 0 && (
                <div
                  className={` w-full  relative  text-lg py-4 rounded-md transition-all duration-500 border-[1px]  flex items-center gap-x-1 pl-6 cursor-pointer ${
                    positionScroll === 4
                      ? "bg-black text-white"
                      : "hover:text-white hover:bg-black bg-white hover:font-semibold"
                  }`}
                  onClick={() => {
                    ref_Capacity.current.scrollIntoView({
                      behavior: "smooth",
                    });
                  }}
                >
                  <GiSkills />
                  <p>Kỹ năng</p>
                </div>
              )}

              {dataProfile?.profilesLanguages?.length > 0 && (
                <div
                  className={` w-full  relative  text-lg py-4 rounded-md transition-all duration-500 border-[1px]  flex items-center gap-x-1 pl-6 cursor-pointer ${
                    positionScroll === 4
                      ? "bg-black text-white"
                      : "hover:text-white hover:bg-black bg-white hover:font-semibold"
                  }`}
                  onClick={() => {
                    ref_Capacity.current.scrollIntoView({
                      behavior: "smooth",
                    });
                  }}
                >
                  <FaLanguage />
                  <p>Ngoại ngữ</p>
                </div>
              )}
              {dataProfile?.profilesCvs?.length > 0 && (
                <div
                  className={` w-full  relative  text-lg py-4 rounded-md transition-all duration-500 border-[1px]  flex items-center gap-x-1 pl-6 cursor-pointer ${
                    positionScroll === 5
                      ? "bg-black text-white"
                      : "hover:text-white hover:bg-black bg-white hover:font-semibold"
                  }`}
                  onClick={() => {
                    ref_CV.current.scrollIntoView({
                      behavior: "smooth",
                    });
                  }}
                >
                  <HiMiniClipboardDocumentList />
                  <p>Thông tin CV</p>
                </div>
              )}
            </div>
          </div>
          <div
            className={`fixed  inset-y-0 flex items-center transition-all duration-500 justify-end z-40 ${
              tabMenu ? "left-96" : "left-4"
            }`}
          >
            <button
              className="w-8 h-8 rounded-full bg-black text-white flex justify-center items-center -translate-x-4 hover:bg-blue-700"
              onClick={() => {
                setTabMenu(!tabMenu);
              }}
            >
              <FaArrowsLeftRight />
            </button>
          </div>
        </div>
      </div>
      <div className="flex-1 h-full min-w-[980px]">
        <div ref={ref_Info} className="py-4">
          <InfoPerson dataProfile={dataProfilePOST} />
        </div>
        {dataProfile?.profilesEducations?.length > 0 && (
          <div ref={ref_Study} className="py-4">
            <InfoEducation dataProfile={dataProfilePOST} />
          </div>
        )}
        {dataProfile?.profilesExperiences?.length > 0 && (
          <div ref={ref_Experience} className="py-4">
            <InfoExperience dataProfile={dataProfilePOST} />
          </div>
        )}
        {dataProfile?.profileAwards?.length > 0 && (
          <div ref={ref_Award} className="py-4">
            <InfoAward dataProfile={dataProfilePOST} />
          </div>
        )}
        {(dataProfile?.profilesLanguages?.length > 0 ||
          dataProfile?.profilesSkills?.length > 0) && (
          <div
            className=" pb-12 pt-20 flex flex-col justify-center items-center"
            ref={ref_Capacity}
          >
            <p className="text-3xl font-bold text-blue-700">Năng lực</p>
            <div className="px-8 py-12 flex justify-center gap-8 flex-wrap w-full">
              {dataProfile?.profilesLanguages?.length > 0 && (
                <InfoLanguage dataProfile={dataProfilePOST} />
              )}
              {dataProfile?.profilesSkills?.length > 0 && (
                <InfoSkill dataProfile={dataProfilePOST} />
              )}
            </div>
          </div>
        )}

        {dataProfile?.profilesCvs?.length > 0 && (
          <div ref={ref_CV} className="py-8">
            <InfoCV dataProfile={dataProfilePOST} />
          </div>
        )}
      </div>
      {/* <ToastContainer /> */}
      {tabModal && (
        <div
          className="fixed bg-black/50 inset-0 flex justify-center items-center z-50"
          onClick={() => {
            setTabModal(false);
          }}
        >
          <div
            className="w-96 h-52 rounded-md bg-white p-4 flex flex-col"
            onClick={(e: any) => {
              e.stopPropagation();
            }}
          >
            <p className="text-sm font-medium text-red-600">
              *Hãy nhập lý do từ chối:
            </p>
            <TextareaAutosize
              placeholder="Nhập lý do"
              onChange={(e: any) => {
                setDescriptionRej(e.target.value);
              }}
              className="outline-none w-full flex-1 rounded-sm bg-slate-50 p-2"
            />
            <div className="w-full flex gap-2 justify-end items-center">
              <button
                className="p-2 rounded-lg bg-red-500 text-white"
                onClick={() => {
                  handleRejectApplication(descriptionRej);
                }}
              >
                Từ chối
              </button>
              <button
                className="p-2 rounded-lg border-blue-500 text-black"
                onClick={() => {
                  setTabModal(false);
                }}
              >
                Hủy
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default page;
