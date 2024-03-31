import { View, Text } from "@react-pdf/renderer";
import React from "react";

type Props = {
  data: any;
};

const Hobby = (props: Props) => {
  const { data } = props;
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
          Sở thích
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

export default Hobby;
