/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import "./FilterMapComponent.scss";
import PositionJob from "./Modals/PositionJob/PositionJob";
import CategoryJob from "./Modals/CategoryJob/CategoryJob";
import TypeJob from "./Modals/TypeJob/TypeJob";
import SalaryType from "./Modals/SalaryType/SalaryType";
import { BlackSearchIcon, CalendarFilterIcon, MoneyFilterIcon } from "@/icons";
import { useDispatch, useSelector } from "react-redux";
import { fetchSearchResult } from "@/redux/reducer/searchReducer";
import { useRouter } from "next/navigation";
import { RootState } from "@/redux";
import searchApi from "@/api/search/apiSearch";
import { useSrollContext } from "@/context/AppProvider";
import MapRadiusComponent from "../MapRadiusComponent/MapRadiusComponent";
import mapApi from "@/api/map/map";

type Props = {
  // tabSearchFilter?: Boolean;
  // setTabFilter?: any;
  // checkReponsive?: any;
  dataRequest?: any;
  setDataRequest?: any;
  handleSearchOK?: any;
  dataLocation?: any;
  setDataLocation?: any;
  listJob?: any;
};

const FilterMapComponent = (props: Props) => {
  const {
    dataRequest,
    setDataRequest,
    handleSearchOK,
    dataLocation,
    setDataLocation,
    listJob,
  } = props;
  const { reponsiveMobile } = useSrollContext();
  const ref_filter = useRef<any>();
  const ref_tab_salary = useRef<any>();
  const ref_tab_workperiod = useRef<any>();
  const [checkSize, setCheckSize] = useState<boolean>(false);
  const [dataSearchLocation, setDataSearchLocation] = useState<any>();
  // const [checkSizeMin, setCheckSizeMin] = useState<boolean>(false);
  const [tabFilterWorkperiod, setTabFilterWorkperiod] =
    useState<boolean>(false);
  const [tabFilterSalary, setTabFilterSalary] = useState<boolean>(false);
  const languageRedux = useSelector(
    (state: RootState) => state.changeLaguage.language
  );
  // const [dataWorkPeriod, setDataWorkPeriod] = useState<any>([
  //   { typeWork: "Working on the weekend", name: "is_working_weekend" },
  //   { typeWork: "Remote work", name: "is_date_period" },
  // ]);
  const [dataSuggest, setDataSuggest] = React.useState<any>([]);
  const language = useSelector((state: any) => state.changeLaguage.language);
  const router = useRouter();
  const [page, setPage] = React.useState(0);
  const dispatch = useDispatch();

  const [tabSuggest, setTabSuggest] = useState<boolean>(false);
  const ref_input = useRef<any>();
  const handleUpdateWorkPeriod = (name: any) => {
    switch (name) {
      case "is_working_weekend":
        if (dataRequest.is_working_weekend > 0) {
          setDataRequest({ ...dataRequest, is_working_weekend: 0 });
        } else {
          setDataRequest({ ...dataRequest, is_working_weekend: 1 });
        }
        break;
      case "is_date_period":
        if (dataRequest.is_date_period > 0) {
          setDataRequest({ ...dataRequest, is_date_period: 0 });
        } else {
          setDataRequest({ ...dataRequest, is_date_period: 1 });
        }
        break;
    }
  };
  const handleSearchLocation = async () => {
    const dataGet: any = await mapApi.getMapLocation(
      dataSearchLocation,
      "pk.eyJ1IjoiaGJ0b2FuIiwiYSI6ImNsd29tc2h2NjFhOTEyaW54MmFnYWt3ZDQifQ.ljik1w_nZErIaDyhwXh68w"
    );
    console.log(dataGet);

    if (dataGet) {
      const dataOK = dataGet.features.filter((dt: any) => {
        return dt.id.includes("neighborhood");
      })[0];
      if (dataOK) {
        setDataLocation({
          latitude: dataOK?.center?.[1],
          longitude: dataOK?.center?.[0],
          radius: 10,
        });
      } else {
        setDataLocation({
          latitude: dataGet.features?.[2]?.center?.[1],
          longitude: dataGet.features?.[2]?.center?.[0],
          radius: 10,
        });
      }
    }
  };
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          console.log(position);
          setDataLocation({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
            radius: 10,
          });
        },
        (error) => {
          setDataLocation({
            latitude: 10.8,
            longitude: 106.8,
            radius: 10,
          });
        }
      );
    } else {
      setDataLocation({
        latitude: 10.8,
        longitude: 106.8,
        radius: 10,
      });
    }
  }, [navigator]);
  useEffect(() => {
    const handleBlurTab = (e: any) => {
      if (tabSuggest && !ref_input.current?.contains(e.target)) {
        setTabSuggest(false);
      }
    };
    document.addEventListener("click", handleBlurTab);
    return () => {
      document.removeEventListener("click", handleBlurTab);
    };
  }, [tabSuggest]);
  useEffect(() => {
    console.log(listJob);
  }, [listJob]);

  useEffect(() => {
    const handleResizeNav = () => {
      const width = window.innerWidth;
      if (width < 1152) {
        setCheckSize(true);
      } else {
        setCheckSize(false);
      }
      // if (width < 655) {
      //   setCheckSizeMin(true);
      // } else {
      //   setCheckSizeMin(false);
      // }
    };
    handleResizeNav();
    window.addEventListener("resize", handleResizeNav);
    return () => {
      window.removeEventListener("resize", handleResizeNav);
    };
  }, []);

  const handleChangeSalary = (e: any) => {
    const name = e.target.name;
    const data = e.target.value;
    const formattedNumber = Number(data.replace(/\D/g, ""));
    setDataRequest({ ...dataRequest, [name]: formattedNumber });
  };

  useEffect(() => {
    const handleBlurTab = (e: any) => {
      if (ref_tab_salary && !ref_tab_salary?.current?.contains(e.target)) {
        setTabFilterSalary(false);
      }
      if (
        ref_tab_workperiod &&
        !ref_tab_workperiod?.current?.contains(e.target)
      ) {
        setTabFilterWorkperiod(false);
      }
    };
    document.addEventListener("click", handleBlurTab);
    return () => {
      document.removeEventListener("click", handleBlurTab);
    };
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      const res = await searchApi.getSuggestKeyWord(
        10,
        language === 1 ? "vi" : "en"
      );
      setDataSuggest(res && res.data);
    };

    fetchData();
  }, []);

  return (
    <div
      className={`select-none py-8 px-4 min-h-fit w-full flex flex-col gap-4 items-center transition-all justify-center  duration-300 bg-search-result`}
      ref={ref_filter}
    >
      <div
        className={`w-full flex justify-center items-center max-w-6xl gap-4 ${
          checkSize ? "flex-col" : "flex-col"
        }`}
      >
        <div
          className={` items-center flex-wrap flex justify-center gap-[1%] gap-y-5 ${
            checkSize ? "w-full" : "w-full"
          }`}
        >
          <CategoryJob
            // checkSizeMin={checkSizeMin}
            dataRequest={dataRequest}
            setDataRequest={setDataRequest}
          />
          <TypeJob
            // checkSizeMin={checkSizeMin}
            dataRequest={dataRequest}
            setDataRequest={setDataRequest}
          />
          <SalaryType
            // checkSizeMin={checkSizeMin}
            dataRequest={dataRequest}
            setDataRequest={setDataRequest}
          />
          <div
            className={`flex bg-white border-black/30 border-[1px] p-1.5 h-12 rounded-2xl justify-between relative  flex-1  min-w-[270px]`}
            ref={ref_tab_salary}
            onClick={() => {
              setTabFilterSalary(!tabFilterSalary);
            }}
          >
            <div className="flex items-center">
              <div className="w-6 mx-2">
                <MoneyFilterIcon />
              </div>
              <h2>
                {dataRequest.salary_max <= 0 && dataRequest.salary_min <= 0
                  ? languageRedux === 1
                    ? "Mức lương"
                    : "Salary"
                  : `${
                      dataRequest.salary_min
                        .toLocaleString()
                        .replace(/\./g, ",") +
                      " - " +
                      dataRequest.salary_max
                        .toLocaleString()
                        .replace(/\./g, ",")
                    }`}
              </h2>
            </div>
            <div
              className={`absolute flex flex-col inset-x-0 px-5 pt-5 pb-10 rounded-md bg-slate-100 border-2 transition-transform duration-300 top-12 z-10 ${
                tabFilterSalary ? "" : "invisible -translate-y-2 opacity-0"
              }`}
              onClick={(e: any) => {
                e.stopPropagation();
              }}
            >
              <div className="text-center border-b-2 pb-4">
                <h2 className="font-bold text-lg">
                  {languageRedux === 1 ? "Mức lương" : "Salary"}
                </h2>
              </div>
              <div className="flex justify-between my-2">
                <button
                  className={`basis-1/2 p-4 text-base font-bold rounded-xl hover:bg-black/5 ${
                    dataRequest.money_type === 1 && "text-blue-600"
                  }`}
                  onClick={() => {
                    setDataRequest({ ...dataRequest, money_type: 1 });
                  }}
                >
                  VND
                </button>
                <button
                  className={`basis-1/2 p-4 text-base font-bold rounded-xl hover:bg-black/5 ${
                    dataRequest.money_type === 2 && "text-blue-600"
                  }`}
                  onClick={() => {
                    setDataRequest({ ...dataRequest, money_type: 2 });
                  }}
                >
                  USD
                </button>
              </div>
              <div className="border-2 px-2 my-2 h-10 border-black/10 rounded-lg">
                <input
                  name={"salary_min"}
                  placeholder="min"
                  value={
                    dataRequest.salary_min < 0
                      ? ""
                      : dataRequest.salary_min
                          .toLocaleString()
                          .replace(/\./g, ",")
                  }
                  onChange={handleChangeSalary}
                  className="w-full outline-none no-spinners h-full font-medium"
                  type="tel"
                />
              </div>
              <div className="border-2 px-2 h-10 border-black/10 rounded-lg">
                <input
                  name={"salary_max"}
                  placeholder="max"
                  value={
                    dataRequest.salary_max < 0
                      ? ""
                      : dataRequest.salary_max
                          .toLocaleString()
                          .replace(/\./g, ",")
                  }
                  onChange={handleChangeSalary}
                  className="w-full outline-none no-spinners h-full font-medium"
                  type="tel"
                />
              </div>
            </div>
            <button>
              <Image
                className={`w-5 transition-transform duration-300 ${
                  tabFilterSalary && "-rotate-90"
                }`}
                src={"/iconleft.svg"}
                alt=""
                width={200}
                height={200}
              />
            </button>
          </div>
        </div>
        <div className="w-full flex flex-col gap-1">
          <div className="relative flex flex-1 w-full p-1.5 h-12 max-w-6xl bg-white border-black/30  border-[1px] border-opacity-40 rounded-t-2xl rounded-b-md pr-4 focus-within:transition-all focus-within:shadow-gray-300 focus-within:border-opacity-70">
            <button className="p-2">
              <BlackSearchIcon width={24} height={24} />
            </button>
            <input
              onChange={(e: any) => {
                setDataSearchLocation(e.target.value);
              }}
              className="text-xs flex-1 outline-none bg-transparent"
              placeholder={`Vị trí cần tìm`}
              type="text"
              onKeyDown={(e: any) => {
                if (e.key === "Enter") {
                }
              }}
            />
            <button
              className="p-2 rounded-xl hover:bg-blue-700 border-[1px] border-blue-700 text-blue-700 hover:text-white font-bold text-sm"
              onClick={() => {
                if (dataSearchLocation) {
                  setDataLocation(undefined);
                  handleSearchLocation();
                }
              }}
            >
              Đánh dấu
            </button>
          </div>
          <div className="w-full h-96 mapbox-jobit overflow-hidden rounded-t-md rounded-b-2xl">
            {dataLocation != undefined ? (
              <MapRadiusComponent
                listMarker={listJob}
                data={dataLocation}
                setData={setDataLocation}
              />
            ) : (
              <></>
            )}
          </div>
        </div>
        <div className="flex gap-2 w-full items-center justify-end">
          <button
            onClick={() => {}}
            className="py-2 px-4  h-12 rounded-xl flex-1 bg-blue-500 border-2 text-white border-black/20 border-blue-500 hover:shadow-[0px_0px_15px_9px_#00000024] hover:bg-white hover:text-blue-500 hover:font-bold"
          >
            {languageRedux === 1 ? "Xóa bộ lọc" : "Reset"}
          </button>
          <button
            className="py-2 px-4 rounded-xl h-12 flex-1 bg-white border-2 text-blue-500 hover:text-white hover:shadow-[0px_0px_15px_9px_#00000024] hover:bg-blue-500 border-blue-500 hover:font-bold"
            onClick={() => {
              handleSearchOK();
            }}
          >
            {languageRedux === 1 ? "Tìm kiếm" : "Search"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default FilterMapComponent;
