import React, { useEffect, useState } from "react";
import {
  PDFViewer,
  PDFDownloadLink,
  Document,
  Page,
  Text,
  Svg,
  Font,
  View,
  StyleSheet,
  Image,
} from "@react-pdf/renderer";
import CheckType from "./CheckType";

type Props = {
  //   funcLibrary: any;
  funcLibrary: any;
};

const Passion = (props: Props) => {
  const { funcLibrary } = props;
  const { dataRequest } = funcLibrary;
  useEffect(() => {
    console.log(dataRequest);
  }, [dataRequest]);
  Font.register({
    family: "Inter",
    fonts: [
      {
        src: "http://fonts.gstatic.com/s/inter/v12/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuLyeMZhrib2Bg-4.ttf",
        fontWeight: 100,
      },
      {
        src: "http://fonts.gstatic.com/s/inter/v12/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuDyfMZhrib2Bg-4.ttf",
        fontWeight: 200,
      },
      {
        src: "http://fonts.gstatic.com/s/inter/v12/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuOKfMZhrib2Bg-4.ttf",
        fontWeight: 300,
      },
      {
        src: "http://fonts.gstatic.com/s/inter/v12/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuLyfMZhrib2Bg-4.ttf",
        fontWeight: 400,
      },
      {
        src: "http://fonts.gstatic.com/s/inter/v12/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuI6fMZhrib2Bg-4.ttf",
        fontWeight: 500,
      },
      {
        src: "http://fonts.gstatic.com/s/inter/v12/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuGKYMZhrib2Bg-4.ttf",
        fontWeight: 600,
      },
      {
        src: "http://fonts.gstatic.com/s/inter/v12/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuFuYMZhrib2Bg-4.ttf",
        fontWeight: 700,
      },
      {
        src: "http://fonts.gstatic.com/s/inter/v12/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuDyYMZhrib2Bg-4.ttf",
        fontWeight: 800,
      },
      {
        src: "http://fonts.gstatic.com/s/inter/v12/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuBWYMZhrib2Bg-4.ttf",
        fontWeight: 900,
      },
    ],
  });
  return (
    <>
      {dataRequest && (
        <Document>
          <Page
            style={{
              fontFamily: "Inter",
              display: "flex",
              width: "794px",
              minHeight: "988px",
              padding: "8px",
              backgroundColor: "#FFedd5",
              gap: "10px",
              flexDirection: "column",
            }}
          >
            {dataRequest?.map((dt: any) => {
              return (
                <>
                  <View
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      // width: "100%",
                      // backgroundColor: "red",
                      minHeight: "100px",
                      padding: "8px",
                      // gap: "4px",
                    }}
                  >
                    {dt.data.map((dtt: any, index: any) => {
                      return (
                        <>
                          <View
                            style={{
                              display: "flex",
                              flexDirection: "column",
                              flexBasis: `${dt.layout[index]}%`,
                              backgroundColor: `${
                                dt.color[index] === "#" ? "" : dt.color[index]
                              }`,
                              //   //   width: "100%",
                              gap: "16px",
                              padding: `${dtt.length > 0 && "8px"}`,
                              maxWidth: `${dt.layout[index]}%`,
                              minWidth: `${dt.layout[index]}%`,
                            }}
                          >
                            {dtt.map((dttt: any) => {
                              return (
                                <>
                                  {/* <View
                                    style={{
                                      display: "flex",
                                      flexDirection: "column",
                                      padding: "8px",
                                    }}
                                  >
                                    <Text
                                      style={{
                                        display: "flex",
                                        flexDirection: "row",
                                        padding: "8px",
                                        marginBottom: "16px",
                                        justifyContent: "center",
                                        alignItems: "center",
                                        borderWidth: "2px",
                                        textAlign: "center",

                                        fontSize: "16px",
                                        // lineHeight: "24px",
                                        fontWeight: "light",
                                        borderColor: "black",
                                      }}
                                    >
                                      Chứng chỉ
                                    </Text>
                                    <View
                                      style={{
                                        display: "flex",
                                        flexDirection: "column",
                                        gap: "8px",
                                        fontSize: "14px",
                                        // lineHeight: "20px",
                                      }}
                                    >
                                      <Text
                                        style={{
                                          paddingHorizontal: "8px",
                                          paddingVertical: "4px",
                                        }}
                                      >
                                        Thời gian
                                      </Text>
                                      <Text
                                        style={{
                                          paddingHorizontal: "8px",
                                          paddingVertical: "4px",
                                        }}
                                      >
                                        Mô tả
                                      </Text>
                                    </View>
                                  </View> */}
                                  <CheckType
                                    data={dttt}
                                    funcLibrary={funcLibrary}
                                  />
                                </>
                              );
                            })}
                          </View>
                        </>
                      );
                    })}
                  </View>
                </>
              );
            })}
          </Page>
        </Document>
      )}
    </>
  );
};

export default Passion;
