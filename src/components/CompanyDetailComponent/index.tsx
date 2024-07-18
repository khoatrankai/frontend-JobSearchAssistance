"use client";
import React, { useEffect, useState } from "react";
import styles from "./style.module.scss";
import "./style.scss";
import { useSelector } from "react-redux";
import { Skeleton, Tabs } from "antd";
import type { TabsProps } from "antd";
import { RootState } from "@/redux/reducer";
import apiCompany from "@/api/company/apiCompany";
import ContactInfo from "./ContactInfo";
import ApplyPosition from "./ApplyPosition";
import { CateIcon, LocationHomeIcon } from "@/icons";
import ShowCancleSave from "../HistoryComponent/ShowCancelSave";

import ReviewCompany from "./ReviewCompany";
import { useParams } from "next/navigation";
import searchApi from "@/api/search/apiSearch";
import { useSrollContext } from "@/context/AppProvider";
import { CiBellOn } from "react-icons/ci";
import { FaBell } from "react-icons/fa6";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";

const DetailCompany = () => {
  const languageRedux = useSelector(
    (state: RootState) => state.changeLaguage.language
  );
  // const [applyPostitions, setApplyPositions] = useState(0);
  const [company, setCompanyData] = useState<any>();
  const [nameCompany, setNameCompany] = useState<any>();
  const [postOfCompany, setPostOfCompany] = useState<any>([]);
  const [hasMore, setHasMore] = React.useState(false);
  const [page, setPage] = React.useState<any>(1);
  const [loading, setLoading] = React.useState(true);
  const [openModalLogin, setOpenModalLogin] = React.useState(false);
  const { handleLoadHrefPage } = useSrollContext();
  const searchParams = useParams();
  const companyId = searchParams?.id;
  const profile = useSelector((state: any) => state.profile.profile);
  //console.log(companyId);
  const getCompanyInfo = async () => {
    try {
      setLoading(true);
      const result = await apiCompany.getDetailCompany(
        companyId as any,
        languageRedux === 1 ? "vi" : "en"
      );
      if (result && result.status === 200) {
        setLoading(false);
        setCompanyData(result.data);
        setNameCompany(result.data.name);
      }
    } catch (error) {}
  };

  useEffect(() => {
    console.log(postOfCompany);
  }, [postOfCompany]);

  const getApplicationPositionCount = async () => {
    try {
      setLoading(true);
      const res = await apiCompany.getPostCompany(companyId, 10, page);
      console.log(res);
      if (res && res?.status === 200) {
        setHasMore(res?.data?.postData?.is_over);
        setPage(page + 1);
        setPostOfCompany([...postOfCompany, ...res?.data?.postData?.data]);
        setLoading(false);
      }
    } catch (error) {
      console.log("error", error);
    }
  };

  useEffect(() => {
    getCompanyInfo();
  }, [languageRedux, companyId]);

  useEffect(() => {
    getApplicationPositionCount();
  }, []);
  useEffect(() => {
    console.log(loading);
  }, [loading]);
  const items: TabsProps["items"] = [
    {
      key: "1",
      label: (
        <p>{languageRedux === 1 ? "Thông tin liên hệ" : "Contact Info"}</p>
      ),
      children: <ContactInfo company={company} />,
    },
    {
      key: "2",
      label: (
        <p>
          {languageRedux === 1 ? "Các công việc" : "All jobs"}
          <span style={{ color: "#0D99FF" }}>
            {" "}
            {"("}
            {postOfCompany?.length}
            {")"}
          </span>
        </p>
      ),
      children: (
        <ApplyPosition
          nameCompany={company?.name}
          postOfCompany={postOfCompany}
          setPostOfCompany={setPostOfCompany}
          hasMore={hasMore}
          setHasMore={setHasMore}
          page={page}
          setPage={setPage}
          companyId={companyId}
          accountId={company?.accountId}
        />
      ),
    },
    {
      key: "3",
      label: <p>{languageRedux === 1 ? "Đánh giá" : "Review"}</p>,
      children: <ReviewCompany company={company} companyId={companyId} />,
    },
  ];

  const handleFollowCompany = () => {
    if (!localStorage.getItem("accessToken")) {
      toast.error("Vui lòng đăng nhập để theo dõi công ty", {
        position: "bottom-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      return;
    }
    if (!profile?.isActive) {
      toast.error("Vui lòng xác thực", {
        position: "bottom-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      return;
    }
    const fetchFollow = async () => {
      try {
        const response = (await apiCompany.createFollowCompany(
          +companyId
        )) as any;

        if (response.statusCode === 200) {
          toast.success(response.message, {
            position: "bottom-center",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
          getCompanyInfo();
        }
      } catch (error) {}
    };

    fetchFollow();
  };

  return (
    <div className={`${styles.detail_company_container} px-5`}>
      <div className={styles.detail_company_content}>
        <div className={styles.detail_company_title}>
          <h3 className="mt-5">
            {languageRedux === 1 ? "Chi tiết công ty" : "View detail Company"}
          </h3>
        </div>
        <Skeleton loading={false} active>
          <div className={styles.detail_company_intro}>
            <div className={styles.logo_company}>
              <img
                src={
                  company?.logoPath
                    ? company.logoPath
                    : "https://res.cloudinary.com/ddwjnjssj/image/upload/v1701273430/images/mailchimp/ads_mail/uk1usmfh6phaft7eqo8e.jpg"
                }
                alt=""
                loading="lazy"
              />
            </div>
            <div className={styles.info_company}>
              <div className={styles.company_name}>
                <h3>
                  {company?.name
                    ? company.name
                    : languageRedux === 1
                    ? "Thông tin công ty chưa cập nhật"
                    : "Company information not updated yet"}
                </h3>

                {company?.isFollowed ? (
                  <div
                    className="flex items-center gap-1 bg-blue-600 p-2 rounded-lg text-white cursor-pointer"
                    onClick={() => {
                      handleFollowCompany();
                    }}
                  >
                    <FaBell />
                    <p>{`Đã theo dõi (${company?.countFollowCompany})`}</p>
                  </div>
                ) : (
                  <div
                    className="flex items-center gap-1 bg-red-500 p-2 rounded-lg text-white cursor-pointer"
                    onClick={() => {
                      handleFollowCompany();
                    }}
                  >
                    <CiBellOn />
                    <p>{`Theo dõi (${company?.countFollowCompany})`}</p>
                  </div>
                )}
              </div>
              <div className={styles.company_address}>
                <div className={styles.address_item}>
                  <LocationHomeIcon />
                  <p>
                    {company?.address
                      ? company.address
                      : languageRedux === 1
                      ? "Thông tin công ty chưa cập nhật"
                      : "Company information not updated yet"}
                  </p>
                </div>
                <div className={styles.address_item}>
                  <CateIcon />
                  <p>
                    {languageRedux === 1
                      ? `${postOfCompany?.length} vị trí ứng tuyển`
                      : `${postOfCompany?.length} application positions`}
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="detail_company_tabs">
            <Tabs defaultActiveKey="1" items={items} animated={false} />
          </div>
        </Skeleton>
      </div>
      <ShowCancleSave />
      {/* <ToastContainer /> */}
    </div>
  );
};

export default DetailCompany;
