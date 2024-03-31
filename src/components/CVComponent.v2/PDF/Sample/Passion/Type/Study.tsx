import LibCvV2 from "@/components/CVComponent.v2/Lib/Lib.cv.v2";
import { View, Text } from "@react-pdf/renderer";
import React from "react";

type Props = {
  data: any;
  funcLibrary: any;
};

const Study = (props: Props) => {
  const { data, funcLibrary } = props;
  const { handleTimes } = funcLibrary;
  return (
    <>
      <View
        style={{
          display: "flex",
          flexDirection: "column",
          padding: "8px",
          gap: "4px",
        }}
      >
        <Text
          style={{
            display: "flex",
            flexDirection: "row",
            padding: "8px",
            marginBottom: "12px",
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
          Học vấn
        </Text>
        {data.moreCvExtraInformations?.map((dt: any) => {
          return (
            <>
              <View
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "8px",
                  fontSize: "14px",
                  // lineHeight: "20px",
                }}
              >
                <View
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    gap: "8px",
                  }}
                >
                  <Text
                    style={{
                      paddingHorizontal: "8px",
                      paddingVertical: "4px",
                    }}
                  >
                    {dt.company}
                  </Text>
                  <View
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      gap: "2px",
                    }}
                  >
                    <Text
                      style={{
                        paddingHorizontal: "8px",
                        paddingVertical: "4px",
                      }}
                    >
                      {handleTimes(dt)[0]}
                    </Text>
                    <Text>-</Text>
                    <Text
                      style={{
                        paddingHorizontal: "8px",
                        paddingVertical: "4px",
                      }}
                    >
                      {handleTimes(dt)[1]}
                    </Text>
                  </View>
                </View>

                <Text
                  style={{
                    paddingHorizontal: "8px",
                    paddingVertical: "4px",
                  }}
                >
                  {dt.position}
                </Text>
                <Text
                  style={{
                    paddingHorizontal: "8px",
                    paddingVertical: "4px",
                  }}
                >
                  {dt.description}
                </Text>
              </View>
            </>
          );
        })}
      </View>
    </>
  );
};

export default Study;
