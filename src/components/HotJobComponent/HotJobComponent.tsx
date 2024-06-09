/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/display-name */
"use client";
import React, { useState, useEffect, RefObject, forwardRef } from "react";
import Image from "next/image";
import hotTopicApi from "@/api/topics/hotTopicApi";
import useSwiperAutoSlider from "@/util/SwiperAutoSlider";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";
// import { analytics } from "../../configs/firebase";
import { logEvent } from "firebase/analytics";
import {
  MdControlCamera,
  MdKeyboardArrowLeft,
  MdKeyboardArrowRight,
} from "react-icons/md";
import { TbTruckDelivery } from "react-icons/tb";
import { GiHummingbird } from "react-icons/gi";
import { IoIosPeople } from "react-icons/io";
import { BiSolidTimer } from "react-icons/bi";
import { MdFiberNew } from "react-icons/md";
import { useSrollContext } from "@/context/AppProvider";
import SkeletonAll from "@/util/SkeletonAll";

type Props = {};

const HotJobComponent = forwardRef<HTMLDivElement>((props, ref) => {
  const { reponsiveMobile } = useSrollContext();
  const {
    ref_list_slider,
    handleNext,
    checkNext,
    checkPrev,
    handlePrev,
    handleClickDown,
    handleUpData,
    handleClickDownTouch,
    checkClick,
    setCheckClick,
  } = useSwiperAutoSlider(13);
  const [topic, setTopic] = useState<any>([]);
  const router = useRouter();
  const language = useSelector((state: any) => state.changeLaguage.language);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const reponse = (await hotTopicApi.getAllTopics()) as any;
        if (reponse && reponse?.status === 200) {
          setTopic(reponse.data);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    handleUpData();
  }, [topic]);
  return (
    <div className="flex justify-center w-full px-5 bg-white">
      <div className="py-10 max-w-6xl w-full overflow-hidden">
        <h1
          className={`font-bold text-2xl mb-8 text-blue-700 ${
            reponsiveMobile < 700 ? "text-xl" : "text-2xl"
          }`}
        >
          {language === 1 ? `Công việc nổi bật` : `Outstanding work`}
        </h1>
        <div className="relative" ref={ref}>
          {checkPrev && (
            <div className="absolute group bg-white hover:text-white bg-opacity-20 inset-y-0 flex items-center left-0 w-12 justify-center z-10">
              <button
                className="p-1 border-2 rounded-full transition-all group-hover:p-2"
                onClick={handlePrev}
              >
                <MdKeyboardArrowLeft />
              </button>
            </div>
          )}

          <ul
            ref={ref_list_slider}
            className={` select-none inline-flex justify-center`}

            // onTouchStart={handleClickDown}
          >
            <SkeletonAll data={topic} type={3}>
              <>
                <li
                  key={0}
                  className="w-[278.25px] h-[220px] relative bg-blue-800 text-white border-[1px] hover:border-blue-800 transition-all duration-500 hover:text-blue-800 hover:bg-white rounded-lg flex flex-col items-center justify-center gap-y-8 item-company overflow-hidden cursor-pointer"
                  onMouseEnter={() => {
                    router.prefetch(`/more-hotjob/${topic?.[0]?.id}`);
                  }}
                  onClick={() => {
                    if (checkClick) {
                      router.push(`/more-hotjob/${topic?.[0]?.id}`);
                      // logEvent(analytics, "select_hotjob");
                    } else {
                      setCheckClick(true);
                    }
                  }}
                >
                  {/* {checkClick && <a href="`/more-hotjob/${topic?.[0]?.id}`"></a>} */}

                  <div className="text-6xl">
                    <MdControlCamera />
                  </div>
                  <div className="flex flex-col justify-center items-center gap-y-2">
                    <h2 className=" font-semibold text-lg">
                      {topic?.[0]?.title}
                    </h2>
                    <p className="font-light text-sm">
                      {language === 1 ? `Việc làm` : `Job`} {topic?.[0]?.count}
                    </p>
                  </div>
                </li>
                <li
                  key={1}
                  className="w-[278.25px] h-[220px] relative bg-blue-800 text-white border-[1px] hover:border-blue-800 transition-all duration-500 hover:text-blue-800 hover:bg-white rounded-lg flex flex-col items-center justify-center gap-y-8 item-company overflow-hidden cursor-pointer"
                  onMouseEnter={() => {
                    router.prefetch(`/more-hotjob/${topic?.[1]?.id}`);
                  }}
                  onClick={() => {
                    if (checkClick) {
                      router.push(`/more-hotjob/${topic?.[1]?.id}`);
                      // logEvent(analytics, "select_hotjob");
                    } else {
                      setCheckClick(true);
                    }
                  }}
                >
                  {/* {checkClick && <a href="`/more-hotjob/${topic?.[0]?.id}`"></a>} */}

                  <div className="text-6xl">
                    <TbTruckDelivery />
                  </div>
                  <div className="flex flex-col justify-center items-center gap-y-2">
                    <h2 className=" font-semibold text-lg">
                      {topic?.[1]?.title}
                    </h2>
                    <p className="font-light text-sm">
                      {language === 1 ? `Việc làm` : `Job`} {topic?.[1]?.count}
                    </p>
                  </div>
                </li>
                <li
                  key={2}
                  className="w-[278.25px] h-[220px] relative bg-blue-800 text-white border-[1px] hover:border-blue-800 transition-all duration-500 hover:text-blue-800 hover:bg-white rounded-lg flex flex-col items-center justify-center gap-y-8 item-company overflow-hidden cursor-pointer"
                  onMouseEnter={() => {
                    router.prefetch(`/more-hotjob/${topic?.[2]?.id}`);
                  }}
                  onClick={() => {
                    if (checkClick) {
                      router.push(`/more-hotjob/${topic?.[2]?.id}`);
                      // logEvent(analytics, "select_hotjob");
                    } else {
                      setCheckClick(true);
                    }
                  }}
                >
                  {/* {checkClick && <a href="`/more-hotjob/${topic?.[0]?.id}`"></a>} */}

                  <div className="text-6xl">
                    <GiHummingbird />
                  </div>
                  <div className="flex flex-col justify-center items-center gap-y-2">
                    <h2 className=" font-semibold text-lg">
                      {topic?.[2]?.title}
                    </h2>
                    <p className="font-light text-sm">
                      {language === 1 ? `Việc làm` : `Job`} {topic?.[2]?.count}
                    </p>
                  </div>
                </li>
                <li
                  key={3}
                  className="w-[278.25px] h-[220px] relative bg-blue-800 text-white border-[1px] hover:border-blue-800 transition-all duration-500 hover:text-blue-800 hover:bg-white rounded-lg flex flex-col items-center justify-center gap-y-8 item-company overflow-hidden cursor-pointer"
                  onMouseEnter={() => {
                    router.prefetch(`/more-hotjob/${topic?.[3]?.id}`);
                  }}
                  onClick={() => {
                    if (checkClick) {
                      router.push(`/more-hotjob/${topic?.[3]?.id}`);
                      // logEvent(analytics, "select_hotjob");
                    } else {
                      setCheckClick(true);
                    }
                  }}
                >
                  {/* {checkClick && <a href="`/more-hotjob/${topic?.[0]?.id}`"></a>} */}

                  <div className="text-6xl">
                    <IoIosPeople />
                  </div>
                  <div className="flex flex-col justify-center items-center gap-y-2">
                    <h2 className=" font-semibold text-lg">
                      {topic?.[3]?.title}
                    </h2>
                    <p className="font-light text-sm">
                      {language === 1 ? `Việc làm` : `Job`} {topic?.[3]?.count}
                    </p>
                  </div>
                </li>
                <li
                  key={4}
                  className="w-[278.25px] h-[220px] relative bg-blue-800 text-white border-[1px] hover:border-blue-800 transition-all duration-500 hover:text-blue-800 hover:bg-white rounded-lg flex flex-col items-center justify-center gap-y-8 item-company overflow-hidden cursor-pointer"
                  onMouseEnter={() => {
                    router.prefetch(`/more-hotjob/${topic?.[4]?.id}`);
                  }}
                  onClick={() => {
                    if (checkClick) {
                      router.push(`/more-hotjob/${topic?.[4]?.id}`);
                      // logEvent(analytics, "select_hotjob");
                    } else {
                      setCheckClick(true);
                    }
                  }}
                >
                  {/* {checkClick && <a href="`/more-hotjob/${topic?.[0]?.id}`"></a>} */}

                  <div className="text-6xl">
                    <BiSolidTimer />
                  </div>
                  <div className="flex flex-col justify-center items-center gap-y-2">
                    <h2 className=" font-semibold text-lg">
                      {topic?.[4]?.title}
                    </h2>
                    <p className="font-light text-sm">
                      {language === 1 ? `Việc làm` : `Job`} {topic?.[4]?.count}
                    </p>
                  </div>
                </li>
                <li
                  key={5}
                  className="w-[278.25px] h-[220px] relative bg-blue-800 text-white border-[1px] hover:border-blue-800 transition-all duration-500 hover:text-blue-800 hover:bg-white rounded-lg flex flex-col items-center justify-center gap-y-8 item-company overflow-hidden cursor-pointer"
                  onMouseEnter={() => {
                    router.prefetch(`/more-hotjob/${topic?.[5]?.id}`);
                  }}
                  onClick={() => {
                    if (checkClick) {
                      router.push(`/more-hotjob/${topic?.[5]?.id}`);
                      // logEvent(analytics, "select_hotjob");
                    } else {
                      setCheckClick(true);
                    }
                  }}
                >
                  {/* {checkClick && <a href="`/more-hotjob/${topic?.[0]?.id}`"></a>} */}

                  <div className="text-6xl">
                    <MdFiberNew />
                  </div>
                  <div className="flex flex-col justify-center items-center gap-y-2">
                    <h2 className=" font-semibold text-lg">
                      {topic?.[5]?.title}
                    </h2>
                    <p className="font-light text-sm">
                      {language === 1 ? `Việc làm` : `Job`} {topic?.[5]?.count}
                    </p>
                  </div>
                </li>
              </>
            </SkeletonAll>
          </ul>
          {checkNext && (
            <div className="absolute group bg-white bg-opacity-20 inset-y-0 flex items-center right-0 w-12 justify-center z-10">
              <button
                className="p-1 border-2 group-hover:p-2 transition-all  hover:text-white rounded-full"
                onClick={handleNext}
              >
                <MdKeyboardArrowRight />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
});

export default HotJobComponent;
