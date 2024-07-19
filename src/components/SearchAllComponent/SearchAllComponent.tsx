"use client";
import searchApi from "@/api/search/apiSearch";
import { VscDebugRestart } from "react-icons/vsc";

import axiosClient from "@/configs/axiosClient";
import React, { useEffect, useState } from "react";
import { FaSearch } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { IoCloseSharp } from "react-icons/io5";
import ShortText from "@/util/ShortText";
import { useRouter } from "next/navigation";
import { fetchSearchResult } from "@/redux/reducer/searchReducer";
import axiosClientRecruiter from "@/configs/axiosRecruiter";
import { useSrollContext } from "@/context/AppProvider";
import DelayCustom from "@/util/DelayCustom";

type Props = {
  setSearchActive?: any;
  DefaultActive?: boolean;
  setTab?: any;
};

const SearchAllComponent = (props: Props) => {
  const { setSearchActive, DefaultActive, setTab } = props;
  const { useDebounce, useThrottle } = DelayCustom();
  const { handleShortTextHome, handleShortValueNumber } = ShortText();
  const language = useSelector((state: any) => state.changeLaguage.language);
  const { reponsiveMobile } = useSrollContext();
  const [activeSearch, setActiveSearch] = useState<any>(false);
  const [dataSuggest, setDataSuggest] = useState<any>([]);
  const [dataHistoryKey, setHistoryKey] = useState<any>([]);
  const [dataKeySearch, setKeySearch] = useState<any>("");
  const [dataKeyAvailability, setKeyAvailability] = useState<any>([]);
  const preventScroll = (e: any) => {
    e.preventDefault();
  };
  const router = useRouter();
  const dispatch = useDispatch();
  const funcStopScroll = () => {
    document.body.style.overflow = "hidden";
  };
  const funcScroll = () => {
    document.body.style.overflow = "scroll";
  };
  const handleSearchKey = (data: any) => {
    const fetchData = async () => {
      const res = await axiosClient.get(
        `https://lending-advantage-pale-xp.trycloudflare.com/api/v3/posts/search/keyword?keyword=${data}`
      );
      setKeyAvailability(res.data);
    };
    fetchData();
  };
  const handleDebounce = useDebounce(handleSearchKey, 500);
  const handleSearch = (keyword?: string) => {
    setKeySearch(keyword);
    if (keyword) {
      localStorage.setItem("keyWord", JSON.stringify({ q: keyword }));
    } else {
      localStorage.setItem("keyWord", JSON.stringify({ q: "" }));
    }

    dispatch(
      fetchSearchResult({
        q: keyword ? keyword : "",
        page: 0,
        moneyType: 0,
        isWorkingWeekend: 0,
        isDatePeriod: 0,
        salaryMin: 0,
        salaryMax: 99999999,
        jobTypeId: [],
        categoryIds: 0,
        districtIds: 0,
        salaryType: 0,
        lang: "vi",
      }) as unknown as any
    ).then(() => {
      if (setTab) setTab(false);
      router.push("/search-result");
    });
  };
  const handleDeleteHistory = (data: any) => {
    const dataDelete: any = { keyword: data };
    const fetchData = async () => {
      const res = await axiosClient.delete("/v1/search/history", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
        data: dataDelete,
      });
      if (res) {
        const res2 = await axiosClientRecruiter.get("/v1/search/history");
        setHistoryKey(res2.data.listHistorySearch);
      }
    };
    fetchData();
  };
  useEffect(() => {
    if (activeSearch) {
      funcStopScroll();
    } else {
      funcScroll();
    }
  }, [activeSearch]);

  useEffect(() => {
    const fetchData = async () => {
      const dataKeyWord = JSON.parse(localStorage.getItem("keyWord") || "{}");
      const res = await axiosClient.get("/v1/search/history");
      setHistoryKey(res?.data?.listHistorySearch);
      const res2 = await searchApi.getSuggestKeyWord(
        10,
        language === 1 ? "vi" : "en"
      );
      // dataKeySearch(dataKeyWord?.q ?? "");
      setKeySearch(dataKeyWord.q ?? "");
      setDataSuggest(res2?.data);
    };
    fetchData();
  }, []);
  return (
    <>
      <div
        className={`w-full ${
          activeSearch ? " max-w-6xl" : ""
        } peer h-14 rounded-3xl w-full border-black/50 transition-all duration-300 peer cursor-pointer pl-4 pr-2 py-2 flex items-center gap-x-2 relative z-40 bg-white`}
        onClick={() => {
          setActiveSearch(true);
          if (setSearchActive) setSearchActive(true);
        }}
      >
        <FaSearch fontSize="1.4em" />
        <input
          value={dataKeySearch}
          className=" outline-none w-full"
          placeholder="Tìm kiếm công việc, kỹ năng, công ty"
          onChange={(e: any) => {
            setKeySearch(e.target.value);
            handleDebounce(e.target.value);
          }}
        />
        <button
          className={`${
            DefaultActive || activeSearch ? "" : "hidden"
          } text-nowrap bg-black rounded-3xl py-2 px-8 text-white font-semibold `}
          onClick={() => {
            handleSearch(dataKeySearch);
          }}
        >
          Tìm kiếm
        </button>
        <div
          className={`absolute inset-0 rounded-xl overflow-y-scroll max-h-[420px]  top-16 transition-all overflow-hidden duration-300 cursor-default bg-white ${
            activeSearch ? " min-h-[40vh] h-fit" : "h-0"
          }`}
        >
          <div
            className={`flex p-8 h-full gap-4 ${
              reponsiveMobile < 700 ? "flex-col" : ""
            }`}
          >
            <div className="flex flex-1 flex-col gap-y-4">
              {dataKeyAvailability.length > 0 && (
                <div className="flex-1 flex flex-col">
                  <p className="font-medium text-xl mb-2">Từ khóa gần nhất</p>
                  {dataKeyAvailability?.map((dt: any, index: any) => {
                    return (
                      <div
                        className="p-2"
                        onClick={() => {
                          handleSearch(dt.title);
                        }}
                        key={index}
                      >
                        <p className="underline cursor-pointer hover:text-blue-600">
                          {handleShortTextHome(dt.title, 70)}
                        </p>
                      </div>
                    );
                  })}
                </div>
              )}

              <div className="">
                <p className="font-medium text-xl mb-2">Từ khóa gợi ý</p>
                <div className="flex gap-2 flex-wrap">
                  {dataSuggest?.map((dt: any, index: any) => {
                    return (
                      <div
                        className="px-2 py-1 rounded-lg border-[1px] hover:border-black transition-all duration-500 cursor-pointer"
                        onClick={() => {
                          handleSearch(dt.keyword);
                        }}
                        key={index}
                      >
                        {dt.keyword}
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
            <div className="basis-1/3 flex flex-col">
              <p className="font-medium text-xl mb-2">Lịch sử tìm kiếm</p>
              <div
                className={`flex flex-col  ${
                  reponsiveMobile < 700 ? "max-h-24 overflow-y-scroll" : ""
                }`}
              >
                {dataHistoryKey?.map((dt: any, index: any) => {
                  return (
                    <div
                      className="flex justify-between items-center p-1 hover:bg-blue-50 rounded-lg cursor-pointer"
                      onClick={() => {
                        handleSearch(dt.keyword);
                      }}
                      key={index}
                    >
                      <div className="flex gap-x-2 text-lg items-center text-gray-500">
                        <VscDebugRestart />
                        <p className="text-gray-400">
                          {handleShortTextHome(dt.keyword, 35)}
                        </p>
                      </div>
                      <div
                        className=""
                        onClick={(e: any) => {
                          e.stopPropagation();
                          handleDeleteHistory(dt.keyword);
                        }}
                      >
                        <IoCloseSharp />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div
        className={`inset-0 ${
          activeSearch ? "opacity-100" : "invisible opacity-0"
        } fixed transition-all duration-300 bg-black/50 z-30`}
        onClick={() => {
          setActiveSearch(false);
          if (setSearchActive) setSearchActive(false);
        }}
      ></div>
    </>
  );
};

export default SearchAllComponent;
