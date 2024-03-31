import { View, Text, Image } from "@react-pdf/renderer";
import React from "react";

type Props = {
  data: any;
};

const Persional = (props: Props) => {
  const { data } = props;
  const handleCheckImage = (dataa: any) => {
    if (typeof dataa !== "string") {
      const file = dataa?.[0];
      if (file) {
        const url = URL?.createObjectURL(file);
        return url;
      }
    }
    return dataa;
  };
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
        <View
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            padding: "8px",
            gap: "2px",
          }}
        >
          <Image
            src={
              handleCheckImage(data?.avatar) ??
              "https://res.cloudinary.com/ddwjnjssj/image/upload/v1701359384/images/avatar/1701359383630-48cd1190-8d4f-4e01-8742-797dfa8026c3.jpg"
            }
            style={{
              width: "160px",
              height: "160px",
              borderRadius: "100%",
              marginBottom: "8px",
            }}
          />
          <Text style={{ fontSize: "16px" }}>{data.name}</Text>
        </View>
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
          Thông tin cá nhân
        </Text>
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            fontSize: "14px",
            gap: "10px",
          }}
        >
          <Image
            src={
              "https://res.cloudinary.com/ddwjnjssj/image/upload/v1701510744/cv-icon/email/ovc6uekecpscy910dhqv.png"
            }
            style={{ width: "15", height: "15", objectFit: "contain" }}
          />
          <Text style={{ paddingHorizontal: "8px", paddingVertical: "4px" }}>
            {data?.email}
          </Text>
        </View>

        <View
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            fontSize: "14px",
            gap: "10px",
          }}
        >
          <Image
            src={
              "https://res.cloudinary.com/ddwjnjssj/image/upload/v1701511051/cv-icon/intent/dbp2j0xt8fqongcieqso.png"
            }
            style={{ width: "15", height: "15", objectFit: "contain" }}
          />
          <Text style={{ paddingHorizontal: "8px", paddingVertical: "4px" }}>
            {data?.intent}
          </Text>
        </View>
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            fontSize: "14px",
            gap: "10px",
          }}
        >
          <Image
            src={
              "https://res.cloudinary.com/ddwjnjssj/image/upload/v1701511124/cv-icon/phone/chf3fgo5pdtnaghvltyh.png"
            }
            style={{ width: "15", height: "15", objectFit: "contain" }}
          />
          <Text style={{ paddingHorizontal: "8px", paddingVertical: "4px" }}>
            {data?.phone}
          </Text>
        </View>
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            fontSize: "14px",
            gap: "10px",
          }}
        >
          <Image
            src={
              "https://res.cloudinary.com/ddwjnjssj/image/upload/v1701511245/cv-icon/facebook/h2eycvomj4oh4qc7ogf5.png"
            }
            style={{ width: "15", height: "15", objectFit: "contain" }}
          />
          <Text style={{ paddingHorizontal: "8px", paddingVertical: "4px" }}>
            {data?.link}
          </Text>
        </View>
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            fontSize: "14px",
            gap: "10px",
          }}
        >
          <Image
            src={
              "https://res.cloudinary.com/ddwjnjssj/image/upload/v1701511352/cv-icon/address/djyh0lezfeacbpqg92kr.png"
            }
            style={{ width: "15", height: "15", objectFit: "contain" }}
          />
          <Text style={{ paddingHorizontal: "8px", paddingVertical: "4px" }}>
            {data?.address}
          </Text>
        </View>
        {data.moreCvInformations?.map((dt: any) => {
          return (
            <>
              <View
                style={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                  fontSize: "14px",
                  gap: "10px",
                }}
              >
                <Image
                  src={
                    "https://res.cloudinary.com/ddwjnjssj/image/upload/v1701518599/cv-icon/more/b46jc6zsgxb4wcjlsg2c.png"
                  }
                  style={{ width: "15", height: "15", objectFit: "contain" }}
                />
                <Text
                  style={{ paddingHorizontal: "8px", paddingVertical: "4px" }}
                >
                  {dt.content}
                </Text>
              </View>
            </>
          );
        })}
      </View>
    </>
  );
};

export default Persional;
