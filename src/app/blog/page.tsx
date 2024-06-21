/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-hooks/rules-of-hooks */
"use client";
import React, { useEffect, useState } from "react";
import "./page.scss";
import Image from "next/image";
import communityApi from "@/api/community/apiCommunity";
import { useRouter } from "next/navigation";
import { SaveIconFill, SaveIconOutline } from "@/icons";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";
import { useSelector } from "react-redux";
import { RootState } from "@/redux";
import { useSrollContext } from "@/context/AppProvider";
import { FaComment, FaHeart, FaStar, FaUserTie } from "react-icons/fa";
import { CgDanger } from "react-icons/cg";
import { BiSolidLike } from "react-icons/bi";
import { BsEyeFill } from "react-icons/bs";
import ShortText from "@/util/ShortText";
import ComunityCreatePost from "@/components/CommunityComponent/CreateCommunityComponent.tsx";
import { IoClose } from "react-icons/io5";
import { Button } from "antd";
import Comunity from "@/components/CommunityComponent/DetailCommunity";

type Props = {};

const page = (props: Props) => {
  const [communityUser, setCommunityUser] = React.useState<any>([]);
  const { handleShortTextHome, handleConvertText } = ShortText();
  const profile = useSelector((state: any) => state.profile.profile);
  const [communityAdmin, setCommunityAdmin] = React.useState<any>([]);
  const [tabModal, setTabModal] = useState<boolean>(false);
  const [idCommunity, setIdCommunity] = useState<any>();
  const [tabModalDetail, setTabModalDetail] = useState<boolean>(false);
  const [bookmarked, setBookmarked] = React.useState(false);
  const router = useRouter();
  const languageRedux = useSelector(
    (state: RootState) => state.changeLaguage.language
  );
  const { handleLoadHrefPage, reponsiveMobile } = useSrollContext();
  const fetchData = async () => {
    const res = await communityApi.getCommunityNews("0", "6", "cm", 0, "vi");

    if (res && res.status === 200) {
      setCommunityAdmin(res.data.communications);
    }

    const resUser = await communityApi.getCommunityByAccount(
      "0",
      "3",
      "cm",
      languageRedux === 1 ? "vi" : "en"
    );

    if (resUser && resUser.status === 200) {
      setCommunityUser(resUser.data.communications);
    }
  };
  useEffect(() => {
    // handleLoadHrefPage();

    fetchData();
  }, [languageRedux]);
  const handleUpload = (dt: any) => {
    fetchData();
    setTabModal(false);
  };
  const handleBookmarked = async (id: number) => {
    console.log(id);
    const fetchData = async () => {
      const res = await communityApi.postCommunityBookmarked(id);

      if (res && res.status === 201) {
        // setBookmarked(!bookmarked);
        setCommunityAdmin(
          communityAdmin.map((dt: any) => {
            if (dt.id === id) {
              return { ...dt, bookmarked: true };
            }
            return dt;
          })
        );
        toast.success("Save post success", {
          position: "bottom-center",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
        });
      } else {
        toast.error("Save post failed", {
          position: "bottom-center",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
        });
      }
    };
    fetchData();
  };
  const handleLikeCommunity = async (communicationId: number) => {
    try {
      console.log("bam roi");
      const result = await communityApi.postCommunityLike(communicationId);
      if (result) {
        result.status === 201
          ? setCommunityAdmin(
              communityAdmin.map((dt: any) => {
                if (dt.id === communicationId) return { ...dt, liked: true };
                return dt;
              })
            )
          : setCommunityAdmin(
              communityAdmin.map((dt: any) => {
                if (dt.id === communicationId) return { ...dt, liked: false };
                return dt;
              })
            );
      }
    } catch (error) {
      //console.log(error);
    }
  };
  const handleDeleteBookmarked = async (id: number) => {
    console.log(id);
    const fetchData = async () => {
      const res = await communityApi.postCommunityBookmarked(id);

      if (res && res.status === 200) {
        setCommunityAdmin(
          communityAdmin.map((dt: any) => {
            if (dt.id === id) {
              return { ...dt, bookmarked: false };
            }
            return dt;
          })
        );
        toast.success("Unsave post success", {
          position: "bottom-center",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
        });
      } else {
        toast.error("Unsave post failed", {
          position: "bottom-center",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
        });
      }
    };
    fetchData();
  };

  return (
    <div className="flex justify-center relative bg-blog px-4">
      <div className="max-w-6xl w-full flex flex-col gap-8 mb-8">
        <div className="h-40">
          <div className="bg-black/50 transition-all absolute z-0 top-0 inset-x-0 h-40 flex justify-center ">
            <div className="w-full max-w-6xl relative">
              <div className="absolute inset-x-0 top-8">
                {/* <MenuBlogComponent /> */}
              </div>
            </div>
            <h1
              className={` text-gradient font-bold absolute inset-y-0 inset-x-8 flex justify-center items-center pointer-events-none ${
                reponsiveMobile < 900 ? "text-2xl" : "text-4xl"
              }`}
            >
              {languageRedux === 1
                ? "Blog - Nơi chia sẻ kinh nghiệm"
                : "Blog - Your IT career development ideas"}
            </h1>
          </div>
        </div>

        <div className="flex gap-12 w-full">
          <div className=" max-w-5xl w-full flex flex-col gap-8 mt-12">
            <div className="bg-white/50 flex rounded-lg overflow-hidden items-center p-4 gap-2 w-full">
              <div className="w-10 h-10 rounded-full overflow-hidden">
                <Image
                  width={500}
                  height={500}
                  alt=""
                  className=""
                  src={profile.avatarPath ?? "/goapply.png"}
                />
              </div>
              <div
                className="px-2 py-4 bg-black/30 font-medium rounded-full flex-1 text-white cursor-pointer"
                onClick={() => {
                  setTabModal(true);
                }}
              >
                <p>Bạn ơi, bạn muốn đăng gì ?</p>
              </div>
            </div>
            {communityAdmin.map((dt: any, ikey: any) => {
              return (
                <>
                  <div className="flex flex-col gap-6" key={ikey}>
                    <div className="bg-white/50 flex flex-col rounded-lg overflow-hidden gap-2">
                      <div className="flex gap-2 items-center p-4 pb-0">
                        <div className="w-10 h-10 rounded-full overflow-hidden">
                          <Image
                            width={500}
                            height={500}
                            alt=""
                            className=""
                            src={dt.profileData.avatarPath ?? "/goapply.png"}
                          />
                        </div>
                        <div className="flex flex-col justify-between">
                          <p className="font-semibold text-black">
                            {dt.profileData.name ?? "No name"}
                          </p>
                          <div className="flex gap-1 items-center">
                            <p className="text-xs font-semibold text-gray-400">
                              {dt.createdAtText}
                            </p>
                            <FaUserTie className="text-white text-xs" />
                          </div>
                        </div>
                      </div>
                      <div className="px-4">
                        <p className="text-white">{dt.title}</p>
                      </div>
                      <div
                        className="flex flex-col cursor-pointer"
                        onClick={() => {
                          setIdCommunity(dt.id);
                          setTabModalDetail(true);
                        }}
                      >
                        <Image
                          className="w-full max-h-[20vw]"
                          width={2000}
                          height={2000}
                          alt=""
                          src={dt.images[0]?.image ?? "/goapply.png"}
                        />
                        <div className="p-4 bg-black/60 text-white/80 font-medium flex w-full justify-between items-center">
                          <div className="   flex gap-1 items-center">
                            <CgDanger />
                            <p className="text-xl overflow-hidden text-wrap text-white">
                              {handleShortTextHome(
                                handleConvertText(dt.content),
                                30
                              )}
                            </p>
                          </div>
                          <div
                            className="px-4 py-2 rounded-lg border-2 hover:border-blue-500 hover:text-blue-500 cursor-pointer"
                            onClick={(e: any) => {
                              e.stopPropagation();
                              router.push(
                                `/detail-community?post-community=${dt.id}&type=0`
                              );
                            }}
                          >
                            <p>Xem chi tiết</p>
                          </div>
                        </div>
                      </div>
                      <div className="flex flex-col gap-2 w-full px-4 py-2">
                        <div className="border-b-[1px] flex w-full justify-between items-center py-2">
                          <div className="flex gap-1 items-center">
                            <div className="p-1 rounded-full bg-blue-400">
                              <BiSolidLike className="text-xs text-white" />
                            </div>
                            <span className="text-white text-sm">
                              {dt.communicationLikesCount}
                            </span>
                          </div>
                          <div className="flex gap-1">
                            <div className="flex gap-1 items-center text-white">
                              <BsEyeFill className=" text-white" />
                              <span className="text-white text-sm">
                                {dt.communicationViewsCount}
                              </span>
                            </div>
                          </div>
                        </div>
                        <div className="flex w-full gap-1">
                          <div
                            className={`flex gap-1 w-full justify-center items-center py-2  ${
                              dt.liked ? "text-blue-500" : "text-white"
                            } rounded-lg hover:bg-black/50 cursor-pointer`}
                            onClick={() => {
                              handleLikeCommunity(dt.id);
                            }}
                          >
                            <BiSolidLike />
                            <span>Thích</span>
                          </div>

                          {/* <div className="flex gap-1 w-full justify-center items-center py-2 text-white rounded-lg hover:bg-black/50 cursor-pointer">
                      <FaComment />
                      <span>Bình luận</span>
                    </div> */}
                          <div
                            className={`flex gap-1 w-full justify-center items-center py-2  ${
                              dt.bookmarked ? "text-yellow-400" : "text-white"
                            } rounded-lg hover:bg-black/50 cursor-pointer`}
                            onClick={() => {
                              if (dt.bookmarked) {
                                handleDeleteBookmarked(dt.id);
                              } else {
                                handleBookmarked(dt.id);
                              }
                            }}
                          >
                            <FaStar />

                            <span>Lưu</span>
                          </div>
                        </div>
                        {/* <div className="pt-2 border-t-[1px] flex flex-col gap-2">
                          <div className="flex items-center justify-between w-full">
                            <div className="font-bold text-white hover:underline cursor-pointer">
                              Xem thêm
                            </div>
                            <div className="flex gap-1 items-center text-white">
                              <span className=" text-sm">
                                {dt.communicationCommentsCount}
                              </span>
                              <p className="text-sm">bình luận</p>
                            </div>
                          </div>

                          <div className="flex gap-2 items-start w-full">
                            <div className="w-10 h-10 rounded-full overflow-hidden">
                              <Image
                                src={"/goapply.png"}
                                alt=""
                                width={500}
                                height={500}
                              />
                            </div>
                            <div className="flex flex-col py-2 px-4 rounded-2xl max-w-96 bg-black/40">
                              <p className="text-sm font-semibold text-white">
                                Tran Minh
                              </p>
                              <p className="text-xs text-white text-wrap">
                                Ở đây nói không với học
                              </p>
                            </div>
                          </div>
                        </div> */}
                      </div>
                    </div>
                  </div>
                </>
              );
            })}
          </div>
          <div className="min-w-72 flex-1 flex flex-col gap-4">
            <p className="text-2xl text-white">Bài viết mới của bạn</p>
            <div className="flex flex-col gap-3">
              {communityUser.map((dt: any, ikey: any) => {
                return (
                  <>
                    <div
                      className="w-full max-h-72 rounded-lg overflow-hidden relative"
                      key={ikey}
                    >
                      <Image
                        height={500}
                        width={500}
                        alt=""
                        src={profile.avatarPath ?? "/goapply.png"}
                      />
                      <div className="absolute bottom-0 inset-x-0 flex flex-col p-4 bg-black/60">
                        <p
                          className="text-white font-bold text-lg cursor-pointer hover:underline"
                          onClick={() => {
                            router.push(
                              `/detail-community?post-community=${dt.id}&type=0`
                            );
                          }}
                        >
                          {handleShortTextHome(dt.title, 15)}
                        </p>
                        <p className="text-sm text-white">
                          {handleShortTextHome(
                            handleConvertText(dt.content),
                            15
                          )}
                        </p>
                      </div>
                    </div>
                  </>
                );
              })}
            </div>
          </div>
        </div>
      </div>
      {tabModal && (
        <div
          className="fixed bg-black/50 inset-0 flex justify-center items-center z-50"
          onClick={() => {
            setTabModal(false);
          }}
        >
          <div
            className="p-4 bg-white max-w-[500px] max-h-[428px] rounded-lg overflow-y-scroll relative"
            onClick={(e: any) => {
              e.stopPropagation();
            }}
          >
            <div
              className="absolute p-2 rounded-full top-2 right-2 border-2 text-xl cursor-pointer"
              onClick={() => {
                setTabModal(false);
              }}
            >
              <IoClose />
            </div>
            <ComunityCreatePost setTab={handleUpload} />
          </div>
        </div>
      )}
      {tabModalDetail && (
        <div
          className="fixed bg-black/50 inset-0 flex justify-center items-center z-50"
          onClick={() => {
            setTabModalDetail(false);
          }}
        >
          <div
            className="p-4 bg-white max-w-[90vw] max-h-[90vh] rounded-lg overflow-y-scroll relative"
            onClick={(e: any) => {
              e.stopPropagation();
            }}
          >
            {/* <div className="absolute w-full h-20 z-10"> */}
            <div
              className="absolute p-2 rounded-full top-6 right-4 border-2 text-xl cursor-pointer"
              onClick={() => {
                setTabModalDetail(false);
              }}
            >
              <IoClose />
            </div>
            {/* </div> */}
            <div>
              <Comunity idCommunity={idCommunity} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default page;
