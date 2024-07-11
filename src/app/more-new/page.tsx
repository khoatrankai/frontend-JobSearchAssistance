/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import NavbarComponent from "@/components/NavbarComponent/NavbarComponent";
import {
  Box,
  Breadcrumbs,
  Checkbox,
  Collapse,
  FormControlLabel,
  FormGroup,
  Skeleton,
  Stack,
  Typography,
} from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import "./style.scss";
import categoryApi from "@/api/category/categoryApi";
import { getCookie } from "@/cookies";
import postsApi from "@/api/posts/postsApi";
import {
  FilterIcon,
  LightFilterIcon,
  SaveIconFill,
  SaveIconOutline,
} from "@/icons";
import Link from "next/link";
import bookMarkApi from "@/api/bookmarks/bookMarkApi";
import Image from "next/image";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import InfiniteScroll from "react-infinite-scroll-component";
import { useSelector } from "react-redux";
import { Select, SelectProps, Space } from "antd";
import locationApi from "@/api/location/locationApi";

import ShortText from "@/util/ShortText";
import DescriptionHoverProvider from "@/util/DescriptionHoverProvider/DescriptionHoverProvider";
import { useRouter } from "next/navigation";
import EncodingDescription from "@/util/EncodingDescription/EncodingDescription";
import ModalApply from "@/components/ModalApply/ModalApply";
import appplicationApi from "@/api/applicationApi";
import SkeletonAll from "@/util/SkeletonAll";
type Props = {};

interface IBookmark {
  code: number;
  message: string;
}

const Page = () => {
  const { handleShortTextHome, handleShortValueNumber } = ShortText();

  const { DescriptionHover, handleUpdatePosition } = DescriptionHoverProvider();
  const router = useRouter();
  const { handleDecodingDescription } = EncodingDescription();
  const [open, setOpen] = React.useState(false);
  const [valueJobChild, setValueJobChild] = React.useState<any>([]);
  const [arrayChild, setArrayChild] = useState<any>([]);
  const [isLoading, setIsLoading] = React.useState(false);
  const [checkedItems, setCheckedItems] = useState<any>([]);
  const [childCatelories, setChildCatelories] = React.useState<any>(null);
  const [checkItemsCount, setCheckItemsCount] = React.useState<number>(0);
  const [nameCategory, setNameCategory] = useState<any>("");
  const [listJob, setListJob] = useState<any>([]);
  const [loading, setLoading] = useState(false);
  const [hasMoreData, setHasMoreData] = useState(true);
  const [arrayTotal, setArrayTotal] = useState<any>([]);
  const [thresholdNewJob, setThresholdNewJob] = useState<number>(0);
  const categoryId = useSelector((state: any) => state.categoryId);
  const [idFilterProvinces, setIdFilterProvinces] = React.useState("");
  const [optionsProvinces, setOptionsProvinces] = React.useState<
    SelectProps["options"]
  >([]);
  const [openModalLogin, setOpenModalLogin] = useState<boolean>(false);
  const [provincesData, setProvincesData] = React.useState<any>();

  const MAX_CHECKED_ITEMS = 3;
  const language = useSelector((state: any) => state.changeLaguage.language);
  const [accountId, setAccountId] = useState<any>("");
  const languageRedux = useSelector(
    (state: any) => state.changeLaguage.language
  );
  const profile = useSelector((state: any) => state.profile.profile);
  const [postDetail, setPostDetail] = useState<any>({});

  const [idCv, setIdCv] = useState<number>(0);
  const [openModalApply, setOpenModalApply] = useState<boolean>(false);
  const [filePDFParent, setFilePDFParent] = useState<File | null>(null);
  const handleApply = async (type: string) => {
    // type = 'upload' => upload cv
    // type = 'near' => select cv in near cv
    // type = 'all' => select cv in all cv
    const dataApply = new FormData();
    if (profile?.roleData === undefined || profile?.roleData === null) {
      // setOpenModalLogin(true);
      toast.warning(
        languageRedux === 1
          ? "Bạn cần đăng nhập để sử dụng tính năng này"
          : "You need to login to use this feature",
        {
          position: "bottom-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
        }
      );
      return;
    }
    let errorResponse: any = null; // Sử dụng kiểu any

    try {
      const appData = new FormData();

      appData.append("type", type);
      appData.append("postId", postDetail?.id);
      appData.append("accountId", profile.accountId);

      if (type === "near" || type === "all") {
        appData.append("idCv", idCv as any);
      }

      if (type === "upload") {
        if (!filePDFParent) {
          toast.warning(
            languageRedux === 1
              ? "Vui lòng chọn file CV"
              : "Please select CV file",
            {
              position: "bottom-center",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "dark",
            }
          );
          return;
        }
        appData.append("pdf", filePDFParent);
      }
      const res = (await appplicationApi.applyAplication(appData)) as any;

      if (res && (res.data as any).code === 201) {
        toast.success(
          languageRedux === 1
            ? "Ứng tuyển thành công"
            : "Successful application",
          {
            position: "bottom-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            theme: "dark",
          }
        );
      } else {
        errorResponse = res.message;
      }
    } catch (error: any) {
      errorResponse = error?.response?.data.message;
    }

    if (errorResponse) {
      toast.warning(errorResponse, {
        position: "bottom-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "dark",
      });
    }
  };
  useEffect(() => {
    setAccountId(localStorage.getItem("accountId"));
  }, []);
  useEffect(() => {
    setValueJobChild(categoryId);
    setNameCategory(getCookie("categoryName"));
  }, [categoryId, language]);

  const getAllChildCategoriesById = async () => {
    try {
      const result = await categoryApi.getAllChildCategories(
        valueJobChild,
        language === 1 ? "vi" : "en"
      );

      if (result) {
        const newData = result.data.map((item: any) => {
          return {
            ...item,
            checked: false,
          };
        });
        setChildCatelories(newData);
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getAllChildCategoriesById();
  }, [valueJobChild, language]);

  const handleClick = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    event.isPropagationStopped();
    setOpen(!open);
  };

  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = event.target;

    setChildCatelories((prevState: any) => {
      const newData = prevState.map((item: any) => {
        if (item.id === Number(name)) {
          return {
            ...item,
            checked: checked,
          };
        }
        return item;
      });
      setCheckItemsCount(
        newData.filter((item: any) => item.checked === true).length
      );

      return newData;
    });
  };

  const handleClickChoose = async () => {
    setOpen(false);
    const arrayTotalFUC: any[] = [];

    const newData = childCatelories.filter(
      (item: any) => item.checked === true
    );
    const newChildCatelories = newData.map((item: any) => {
      arrayTotalFUC.push(item.id);
    });
    setCheckedItems(newChildCatelories);
    setArrayChild(newData);
    setArrayTotal(arrayTotalFUC);
    setCheckItemsCount(0);
  };

  useEffect(() => {
    const fetchData = async () => {
      // setIsLoading(true);
      setListJob([]);
      const res = (await postsApi.getPostNewestV3(
        arrayTotal,
        valueJobChild ? Number(valueJobChild) : null,
        null,
        idFilterProvinces ? Number(idFilterProvinces) : null,
        9,
        thresholdNewJob,
        language === 1 ? "vi" : "en",
        0
      )) as unknown as any;

      if (res && res.status === 200) {
        setListJob(res.data);
        setThresholdNewJob(res.data[res.data.length - 1]?.id);
      }
      setIsLoading(false);
    };
    fetchData();
  }, [arrayTotal, valueJobChild, idFilterProvinces, language]);

  React.useEffect(() => {
    if (provincesData) {
      const newOptionsProvinces = provincesData.map((provinces: any) => {
        return {
          value: provinces.id,
          label: language === 1 ? provinces.full_name : provinces.full_name_en,
        };
      });
      setOptionsProvinces(newOptionsProvinces);
    }
  }, [provincesData, language]);

  const getProvinces = async () => {
    try {
      const result = await locationApi.getAllProvinces(
        language === 1 ? "vi" : "en"
      );

      if (result) {
        setProvincesData(result.data);
      }
    } catch (error) {
      //console.log("error", error);
    }
  };

  useEffect(() => {
    getProvinces();
  }, [language]);

  const handleToggleModal = () => {
    setOpenModalLogin(false);
  };

  const breadcrumbs = [
    <>
      {nameCategory && (
        <Typography
          key="2"
          color="text.primary"
          sx={{
            cursor: "pointer",
            padding: "4px 12px",
            borderRadius: "12px",
            display: "flex",
            alignItems: "center",
            border: "1px solid #3B82F6",
            color: "#3B82F6",
            background: "#ffffff",
            fontSize: "12px",
            lineHeight: "2",
          }}
        >
          {nameCategory}
        </Typography>
      )}
    </>,
    valueJobChild?.id === 1 ? (
      <React.Fragment key="3"></React.Fragment>
    ) : (
      <div
        key="3"
        style={{
          position: "relative",
        }}
        className="button-breadcrumb"
        onClick={(e) => handleClick(e)}
      >
        <Typography
          color="text.primary"
          sx={{
            cursor: "pointer",
            padding: "4px 12px",
            borderRadius: "12px",
            display: "flex",
            alignItems: "center",
            border: "1px solid #3B82F6",
            color: "#3B82F6",
            background: "#ffffff",
            fontSize: "12px",
            lineHeight: "2",
          }}
        >
          {arrayChild?.length === 0 || arrayChild?.length === undefined
            ? language === 1
              ? `Tất cả`
              : `All`
            : arrayChild?.map(
                (value: { id: number; name: string }, index: number) => (
                  <div key={index}>
                    {value.name} {index !== arrayChild.length - 1 ? "/ " : ""}
                  </div>
                )
              )}
          {open ? (
            <ExpandLess className="icon-breadcrumb" />
          ) : (
            <ExpandMore className="icon-breadcrumb" />
          )}
        </Typography>
      </div>
    ),
  ];

  const handleBookmarked = (id: number) => {
    try {
      const fetchData = async () => {
        const res = (await bookMarkApi.createBookMark(
          id
        )) as unknown as IBookmark;

        if (res && res.code === 200) {
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

          setListJob((prevList: any) =>
            prevList.map((item: any) =>
              item.id === id ? { ...item, bookmarked: true } : item
            )
          );
        } else {
          // toast.warning('Vui lòng đăng nhập trước khi lưu bài', {
          //   position: 'bottom-center',
          //   autoClose: 2000,
          //   hideProgressBar: false,
          //   closeOnClick: true,
          //   pauseOnHover: true,
          //   draggable: true,
          //   progress: undefined,
          //   theme: 'colored',
          // });
          setOpenModalLogin(true);
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
        const res = (await bookMarkApi.deleteBookMark(
          id
        )) as unknown as IBookmark;

        if (res && res.code === 200) {
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

          setListJob((prevList: any) =>
            prevList.map((item: any) =>
              item.id === id ? { ...item, bookmarked: false } : item
            )
          );
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

  const loadMore = async () => {
    if (!loading && hasMoreData) {
      setLoading(true);

      setTimeout(async () => {
        const res = await postsApi.getPostNewestV3(
          arrayTotal,
          null,
          null,
          null,
          9,
          thresholdNewJob,
          language === 1 ? "vi" : "en",
          0
        );

        if (res && res.status === 200) {
          setListJob([...listJob, ...res.data]);
          setThresholdNewJob(listJob[listJob.length - 1]?.id);

          if (res.data?.length === 0) {
            setHasMoreData(false);
          }
        }

        setLoading(false);
      }, 0);
    }
  };

  const handleClickFilterJob = () => {};

  const handleChangeFilterJob = (value: string) => {
    setIdFilterProvinces(value);
  };
  return (
    <div className="flex flex-col items-center ">
      <Box>
        <NavbarComponent />
      </Box>
      <Stack
        className="bread-crumb-container"
        spacing={2}
        sx={{
          maxWidth: "1080px",
          zIndex: "1",
          background: "#ffffff",
          padding: "16px 0px ",
          position: "relative",
          top: 0,
          left: 0,
          right: 0,
          borderBottom: "1px solid #e5e5e5",
          "@media (max-width: 767px)": {},
          boxShadow:
            "10px 0px 0px rgb(255, 255, 255), -10px 0px 0px rgb(255, 255, 255)",
        }}
      >
        {isLoading ? (
          <Skeleton variant="rounded" width="100%" height={34} />
        ) : (
          <Breadcrumbs separator="" aria-label="breadcrumb">
            {breadcrumbs}
          </Breadcrumbs>
        )}
        <Collapse in={open} unmountOnExit className="collapse-breadcrumbs">
          <Typography className="header-breabcrumb_text">
            {language === 1 ? `Danh sách` : `Menu`}
          </Typography>
          <Box padding={0} className="box-breadcrumbs">
            <FormGroup>
              {childCatelories?.map((childCatelorie: any, index: number) => (
                <FormControlLabel
                  key={index}
                  sx={{
                    padding: "4px 24px",
                  }}
                  control={
                    <Checkbox
                      key={index}
                      checked={childCatelorie?.checked}
                      onChange={handleCheckboxChange}
                      name={childCatelorie?.id.toString()}
                      value={childCatelorie?.name.toString()}
                      disabled={
                        checkItemsCount >= MAX_CHECKED_ITEMS &&
                        !checkedItems[index]?.checked
                      }
                    />
                  }
                  label={childCatelorie?.name}
                />
              ))}
            </FormGroup>
          </Box>
          <div className="wrapBtn-breadcrumb_nav">
            <button
              type="submit"
              className="btn-breadcrumb_nav"
              onClick={handleClickChoose}
            >
              {language === 1 ? `Chọn` : "Select"}
            </button>
          </div>
        </Collapse>
      </Stack>

      <div className="py-10 max-w-6xl w-full overflow-hidden">
        <div className="flex justify-between flex-wrap px-4">
          <h1 className="font-bold text-2xl mb-3 px-2">
            {language === 1 ? `Tất cả công việc mới nhất` : `All latest jobs`}
          </h1>

          <div className="filter-hotjob" onClick={() => handleClickFilterJob}>
            <div className="filter-provinces mb-3">
              <Space direction="vertical" style={{ width: "100%" }}>
                <Select
                  size={"large"}
                  onChange={handleChangeFilterJob}
                  style={{ width: "220px" }}
                  options={optionsProvinces}
                  suffixIcon={
                    idFilterProvinces ? (
                      <LightFilterIcon width={20} height={20} />
                    ) : (
                      <FilterIcon width={20} height={20} />
                    )
                  }
                  placeholder={
                    language === 1 ? "Lọc theo khu vực" : `Filter by region`
                  }
                />
              </Space>
            </div>
          </div>
        </div>
        <SkeletonAll type={"newJob"} data={listJob}>
          <div>
            <InfiniteScroll
              style={{ display: "flex", flexWrap: "wrap" }}
              dataLength={listJob.length}
              next={loadMore}
              hasMore={true}
              loader={<></>}
            >
              <div className="flex justify-center">
                <ul className="inline-flex flex-wrap justify-center list-job gap-5 w-full">
                  {listJob &&
                    listJob.length > 0 &&
                    listJob.map((item: any, index: any) => (
                      <li key={index} className="relative">
                        <Link
                          href={`/post-detail/${item.id}`}
                          className={`w-[370px] h-fit group gap-x-2  px-4 border-[1px] hover:border-blue-500 transition-all duration-500  hover:bg-blue-50 bg-white hover:shadow-[rgba(17,_17,_26,_0.1)_0px_0px_16px] rounded-md  py-6 flex justify-between items-center item-job`}
                        >
                          <div className="basis-3/12">
                            <div className="w-16 h-16 rounded-full overflow-hidden group-hover:shadow-[rgba(17,_17,_26,_0.1)_0px_0px_16px]  object-cover">
                              <Image
                                className="group-hover:scale-110 transition-all duration-500"
                                src={item.image ? item.image : "/logo/logo.png"}
                                alt="anh"
                                width={200}
                                height={200}
                              />
                            </div>
                          </div>
                          <div className="basis-8/12 h-full flex flex-col justify-between capitalize">
                            <div>
                              <h2
                                className="text-sm font-bold peer group-hover:drop-shadow-xl  group-hover:text-blue-500 max-w-full w-fit"
                                onMouseEnter={(e: any) => {
                                  handleUpdatePosition(e);
                                }}
                              >
                                {handleShortTextHome(item.title, 20)}
                              </h2>
                              <div className="opacity-0 invisible transition-all relative z-50 duration-200 peer-hover:opacity-100 peer-hover:visible hover:visible hover:opacity-100 w-fit h-fit cursor-default">
                                <DescriptionHover>
                                  <div className="flex flex-col gap-y-4 max-h-full">
                                    <div className="flex items-center basis-1/6 gap-x-4">
                                      <Image
                                        className="w-20 h-20"
                                        alt=""
                                        src={
                                          item.image
                                            ? item.image
                                            : "/goapply.png"
                                        }
                                        width={100}
                                        height={100}
                                      />
                                      <div className="flex flex-col gap-y-2  cursor-auto">
                                        <p className="text-base font-bold">
                                          {item.title}
                                        </p>
                                        <p className="text-sm font-semibold text-gray-400">
                                          {item.companyName}
                                        </p>
                                        <div className="flex text-white text-xs font-medium gap-x-4">
                                          <p className="p-1 rounded-lg bg-blue-400">
                                            {handleShortValueNumber(
                                              item.salaryMin.toString()
                                            )}{" "}
                                            -{" "}
                                            {handleShortValueNumber(
                                              item.salaryMax.toString()
                                            )}{" "}
                                            {item.moneyType}
                                          </p>
                                          <p className="p-1 rounded-lg bg-blue-400">
                                            {item?.jobType.name}
                                          </p>
                                          <p className="p-1 rounded-lg bg-blue-400">
                                            Thời hạn 5 ngày
                                          </p>
                                        </div>
                                      </div>
                                    </div>
                                    <div className="flex-1 flex flex-col gap-y-8 max-h-full overflow-y-scroll  cursor-auto">
                                      <div className="flex flex-col gap-y-2">
                                        <p className="font-bold py-1 px-2 border-l-4 border-blue-500">
                                          Mô tả công việc
                                        </p>
                                        <pre className="whitespace-pre-wrap font-medium">
                                          {
                                            handleDecodingDescription(
                                              item?.description ?? ""
                                            )[0]
                                          }
                                        </pre>
                                      </div>
                                      <div className="flex flex-col gap-y-2">
                                        <p className="font-bold py-1 px-2 border-l-4 border-blue-500">
                                          Yêu cầu ứng viên
                                        </p>

                                        <pre className="whitespace-pre-wrap text-sm font-medium">
                                          {
                                            handleDecodingDescription(
                                              item?.description ?? ""
                                            )[1]
                                          }
                                        </pre>
                                      </div>
                                      <div className="flex flex-col gap-y-2">
                                        <p className="font-bold py-1 px-2 border-l-4 border-blue-500">
                                          Quyền lợi được hưởng
                                        </p>

                                        <pre className="whitespace-pre-wrap text-sm font-medium">
                                          {
                                            handleDecodingDescription(
                                              item?.description ?? ""
                                            )[2]
                                          }
                                        </pre>
                                      </div>
                                    </div>
                                    <div className="flex basis-2/6 gap-x-2 cursor-pointer">
                                      <div className="flex justify-center items-center px-2">
                                        <div
                                          className="h-fit"
                                          onClick={(e) => {
                                            e.preventDefault();
                                            if (item.bookmarked === false) {
                                              handleBookmarked(item.id);
                                            } else {
                                              handleDeleteBookmarked(item.id);
                                            }
                                          }}
                                        >
                                          {item.accountId !== accountId &&
                                            (item.bookmarked === true ? (
                                              <SaveIconFill
                                                width={24}
                                                height={24}
                                              />
                                            ) : (
                                              <SaveIconOutline
                                                width={24}
                                                height={24}
                                              />
                                            ))}
                                        </div>
                                      </div>

                                      <div
                                        className="font-bold flex-1 p-2 rounded-xl bg-red-500 hover:bg-red-600 flex justify-center items-center text-white"
                                        onClick={() => {
                                          router.push(
                                            `/post-detail/${item.id}`
                                          );
                                        }}
                                      >
                                        Xem chi tiết
                                      </div>
                                      {item?.companyResourceData?.id === 2 && (
                                        <div
                                          className="font-bold flex-1 p-2 rounded-xl bg-blue-500 hover:bg-blue-600 flex justify-center items-center text-white"
                                          onClick={() => {
                                            if (item?.isActive) {
                                              setPostDetail(item);
                                              setOpenModalApply(true);
                                            }
                                          }}
                                        >
                                          Nộp đơn
                                        </div>
                                      )}
                                    </div>
                                  </div>
                                </DescriptionHover>
                              </div>
                            </div>

                            <div className="my-2 flex flex-col gap-y-1 font-medium">
                              <div className="flex items-center">
                                <p className="text-xs text-gray-500  drop-shadow-xl">
                                  {handleShortTextHome(item.companyName, 20)}
                                </p>
                              </div>
                            </div>
                            <div className="inline-flex flex-wrap justify-start gap-1 font-extrabold">
                              <h3 className="text-[9px] py-1 px-2 rounded-md min-w-fit bg-blue-50 group-hover:text-blue-500  ">
                                {handleShortValueNumber(
                                  item.salaryMin.toString()
                                )}{" "}
                                -{" "}
                                {handleShortValueNumber(
                                  item.salaryMax.toString()
                                )}{" "}
                                {item.moneyType}
                              </h3>
                              <h3 className="text-[9px] py-1 px-2 rounded-md min-w-fit bg-blue-50 group-hover:text-blue-500  ">
                                {item?.location?.district?.fullName}
                              </h3>
                            </div>
                          </div>

                          <div className="flex justify-start min-h-[70px] flex-1 relative ">
                            <div
                              className={` py-1 px-2 group-hover:text-white rounded-2xl h-fit transition-all duration-500 ${
                                item?.serviceType == "v2"
                                  ? "bg-red-100 group-hover:bg-red-500 text-red-500"
                                  : item?.serviceType == "v1"
                                  ? "bg-green-100 group-hover:bg-green-500 text-green-500"
                                  : item?.serviceType == "v3"
                                  ? "bg-yellow-100 group-hover:bg-yellow-500 text-yellow-500"
                                  : item?.serviceType == "v4"
                                  ? "bg-violet-100 group-hover:bg-violet-500 text-violet-500"
                                  : "bg-gray-100 group-hover:bg-gray-500  text-gray-500"
                              }   text-xs font-medium `}
                            >
                              {item?.serviceType == "v2"
                                ? "hot"
                                : item?.serviceType == "v1"
                                ? "new"
                                : item?.serviceType == "v3"
                                ? "trending"
                                : item?.serviceType == "v4"
                                ? "vip"
                                : "nor"}
                            </div>
                          </div>
                        </Link>
                      </li>
                    ))}
                </ul>
              </div>
            </InfiniteScroll>
          </div>
        </SkeletonAll>
        {loading && (
          <div className="mt-5">
            <SkeletonAll type={"newJob"} data={!loading}>
              loading
            </SkeletonAll>
          </div>
        )}
      </div>
      {/* <ToastContainer /> */}
      {openModalApply && (
        <ModalApply
          namePost={postDetail?.title}
          openModalApply={openModalApply}
          setOpenModalApply={setOpenModalApply}
          profile={profile}
          handleApply={handleApply}
          setFilePDFParent={setFilePDFParent}
          setIdCv={setIdCv}
        />
      )}
    </div>
  );
};

export default Page;
