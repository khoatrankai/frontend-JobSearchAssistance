import { Box, Grid } from "@mui/material";
import { Skeleton, Spin, message } from "antd";
import React, { memo, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { useSelector } from "react-redux";
import { LoadingOutlined } from "@ant-design/icons";
import { RootState } from "@/redux/reducer";
import apiCompany from "@/api/company/apiCompany";
import NoDataComponent from "@/util/NoDataPage";
import JobOfCompanyCard from "../JobOfCompanyCard";
import searchApi from "@/api/search/apiSearch";

interface IApplyPosition {
  postOfCompany: any;
  setPostOfCompany: React.Dispatch<React.SetStateAction<any>>;
  page: any;
  setPage: React.Dispatch<React.SetStateAction<any>>;
  hasMore: boolean;
  setHasMore: React.Dispatch<React.SetStateAction<boolean>>;
  companyId: any;
  accountId: any;
  nameCompany: any;
}

const ApplyPosition: React.FC<IApplyPosition> = (props) => {
  const {
    nameCompany,
    postOfCompany,
    setPostOfCompany,
    hasMore,
    setHasMore,
    page,
    setPage,
    accountId,
    companyId,
  } = props;
  const languageRedux = useSelector(
    (state: RootState) => state.changeLaguage.language
  );
  const [loading, setLoading] = React.useState(false);
  const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;

  const fetchMoreData = async () => {
    try {
      if (!hasMore) {
        setLoading(true);
        const res = await apiCompany.getPostCompany(companyId, 10, page);
        if (res && res?.status === 200) {
          setHasMore(res?.data?.postData?.is_over);
          setPage(page + 1);
          setPostOfCompany([...postOfCompany, ...res?.data?.postData?.data]);
          setLoading(false);
        }
      }
    } catch (error) {
      //console.log('error', error);
    }
  };

  React.useEffect(() => {
    // getJobOfCompany();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [languageRedux]);

  return (
    <div className="apply-position-container">
      <div className="apply-position-content">
        <InfiniteScroll
          dataLength={postOfCompany?.length}
          next={fetchMoreData}
          hasMore={hasMore}
          loader={
            <Spin
              style={{ width: "100%" }}
              indicator={loading ? antIcon : <></>}
            />
          }
          style={{ overflow: "unset" }}
          scrollableTarget="scrollableDiv"
        >
          <Skeleton loading={loading} active>
            <Grid container spacing={2} columns={{ xs: 6, sm: 4, md: 12 }}>
              {postOfCompany.map((item: any, index: number) => (
                <Grid item xs={12} sm={6} md={6} lg={6} key={index}>
                  <JobOfCompanyCard item={item} accountId={accountId} />
                </Grid>
              ))}
            </Grid>
          </Skeleton>
        </InfiniteScroll>
        {postOfCompany?.length === 0 ? <NoDataComponent /> : <></>}
      </div>
    </div>
  );
};

export default memo(ApplyPosition);
