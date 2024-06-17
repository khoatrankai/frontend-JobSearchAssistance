"use client";
import React, { useRef } from "react";
import { Col, Row } from "antd";
import styles from "./style.module.scss";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/reducer";
import { DataLog, DataLogRecuiter } from "@/components/Analytics/typeChart";
import {
  ChartCompanySave,
  ChartCompanyView,
  ChartPerson,
  ChartPostCreate,
  ChartPostSave,
  RightChart,
  SearchedChart,
} from "@/icons";
import CustomSkeleton from "@/components/CustomSkeleton";
import {
  PropItemOther,
  PropItemValue,
} from "@/components/LogChartComponent/typeChart";

const ItemsOtherChartCandidate: React.FC<{
  dataLog: DataLog | undefined;
  dataLogRecruiter: DataLogRecuiter | undefined;
}> = ({ ...props }) => {
  const { dataLog, dataLogRecruiter } = props;
  const languageRedux = useSelector(
    (state: RootState) => state.changeLaguage.language
  );

  const elements: React.ReactNode[] = Array.from({ length: 2 }, (_, index) => (
    <React.Fragment key={index} />
  ));

  const itemsOther: PropItemOther = {
    otherTop: [
      {
        id: 1,
        title: dataLog
          ? languageRedux === 1
            ? "Lượt công ty lưu hồ sơ"
            : "Number of companies saved the profile"
          : languageRedux === 1
          ? "Lượt ứng viên xem công ty"
          : "Number of candidates viewed the company",
        icon: dataLog ? <ChartCompanyView /> : <ChartPerson />,
        total: dataLog
          ? dataLog?.saveYourCompanyLogs
          : dataLogRecruiter?.viewYourCompanyLogs,
        path: dataLog ? "" : "",
      },
      {
        id: 2,
        title: dataLog
          ? languageRedux === 1
            ? "Lượt công ty xem hồ sơ"
            : "Number of companies that viewed the profile"
          : languageRedux === 1
          ? "Lượt ứng viên theo dõi công ty"
          : "Number of candidates following the company",

        icon: dataLog ? <SearchedChart /> : <ChartCompanySave />,
        total: dataLog
          ? dataLog?.viewYourCompanyLogs
          : dataLogRecruiter?.saveYourCompanyLogs,
        path: dataLog ? "" : "",
      },
    ],
    otherMid: [
      {
        id: 1,
        title: dataLog
          ? languageRedux === 1
            ? "Bài viết đã lưu"
            : "Saved article"
          : "",
        icon: <SearchedChart />,
        total: dataLog?.countPostBookmark,
        path: "",
      },
    ],
    otherBottom: [
      {
        id: 1,
        title: languageRedux === 1 ? "Bài blog đã tạo" : "createCommunityLogs",
        icon: <ChartPostSave />,
        total: dataLog
          ? dataLog?.createCommunityLogs
          : dataLogRecruiter?.saveCommunityLogs,
        path: dataLog
          ? "/history?community_post=30"
          : "/history?community_post=30",
      },
      {
        id: 2,
        title: languageRedux === 1 ? "Bài blog đã lưu" : "saveCommunityLogs",
        icon: <ChartPostCreate />,
        total: dataLog
          ? dataLog?.saveCommunityLogs
          : dataLogRecruiter?.createCommunityLogs,
        path: dataLog
          ? "/history?community_post=31"
          : "/history?community_post=31",
      },
    ],
  };

  return (
    <div className={styles.container}>
      <div className={styles.wrap_row}>
        <h3 className={styles.title_chart}>
          {dataLog
            ? languageRedux === 1
              ? "Công ty quan tâm đến bạn"
              : "The company cares about you"
            : languageRedux === 1
            ? "Ứng viên theo dõi công ty của bạn"
            : "Candidates follow your company"}
        </h3>
        <Row className={styles.row} align="top">
          {(dataLog && !dataLogRecruiter) || (!dataLog && dataLogRecruiter)
            ? itemsOther.otherTop.map((other: PropItemValue, index: any) => (
                <Col span={6} className={styles.col} key={index}>
                  <div className={`${styles.col_left} col_left__itemsChart`}>
                    {other.icon}
                  </div>
                  <div className={styles.col_right}>
                    <div className={styles.col_right__top}>
                      <span className={styles.col_right__topValue1}>
                        {other.total}
                      </span>
                    </div>
                    <div className={styles.col_right__bottom}>
                      <p className={styles.col_right__bottomText}>
                        {other.title}
                      </p>
                    </div>
                  </div>
                </Col>
              ))
            : elements.map((value, index: number) => (
                <CustomSkeleton key={index} />
              ))}
        </Row>
      </div>
      {dataLog && (
        <div className={styles.wrap_row}>
          <h3 className={styles.title_chart}>
            {languageRedux === 1 ? "Tìm kiếm công việc" : "Job Search"}
          </h3>
          <Row className={styles.row} align="top">
            {(dataLog && !dataLogRecruiter) || (!dataLog && dataLogRecruiter)
              ? itemsOther.otherMid.map(
                  (other: PropItemValue, index: number) => (
                    <Col
                      key={""}
                      span={6}
                      className={styles.col}
                      pull={index === 1 ? 0 : 12}
                      offset={index === 1 ? 0 : 12}
                    >
                      <div
                        className={`${styles.col_left} col_left__itemsChart`}
                      >
                        {other.icon}
                      </div>
                      <div className={styles.col_right}>
                        <div className={styles.col_right__top}>
                          <span className={styles.col_right__topValue1}>
                            {other.total}
                          </span>
                        </div>
                        <div className={styles.col_right__bottom}>
                          <p className={styles.col_right__bottomText}>
                            {other.title}
                          </p>
                        </div>
                      </div>
                    </Col>
                  )
                )
              : elements.map((value, index: number) => (
                  <CustomSkeleton key={index} />
                ))}
          </Row>
        </div>
      )}
      <div className={styles.wrap_row}>
        <h3 className={styles.title_chart}>
          {languageRedux === 1 ? "Câu chuyện việc làm" : "Job story"}
        </h3>
        <Row className={styles.row} align="top">
          {(dataLog && !dataLogRecruiter) || (!dataLog && dataLogRecruiter)
            ? itemsOther.otherBottom.map((other: PropItemValue, index: any) => (
                <Col span={6} className={styles.col} key={index}>
                  <div className={`${styles.col_left} col_left__itemsChart`}>
                    {other.icon}
                  </div>
                  <div className={styles.col_right}>
                    <div className={styles.col_right__top}>
                      <span className={styles.col_right__topValue1}>
                        {other.total}
                      </span>
                    </div>
                    <div className={styles.col_right__bottom}>
                      <p className={styles.col_right__bottomText}>
                        {other.title}
                      </p>
                    </div>
                  </div>
                </Col>
              ))
            : elements.map((value, index: number) => (
                <CustomSkeleton key={index} />
              ))}
        </Row>
      </div>
    </div>
  );
};

export default ItemsOtherChartCandidate;
