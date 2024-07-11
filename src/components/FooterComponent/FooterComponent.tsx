"use client";
import React, { useEffect, useRef } from "react";

import { useSelector } from "react-redux/es/hooks/useSelector";
import { RootState } from "@/redux";
import { useSrollContext } from "@/context/AppProvider";
import FooterUser from "./FooterUser/FooterUser";
import FooterRecruiter from "./FooterRecruiter/FooterRecruiter";

type Props = {};

const FooterComponent = (props: Props) => {
  const { checkPage } = useSrollContext();
  const profileV3 = useSelector((state: RootState) => state.profile.profile);
  useEffect(() => {
    //console.log(profileV3);
  }, [profileV3]);
  return (
    <>
      {!checkPage.includes("/recruiter/candidate-detail") &&
        !checkPage.includes("/cv/") &&
        (!checkPage.includes("/recruiter") ? (
          <FooterUser />
        ) : (
          <FooterRecruiter />
        ))}
    </>
  );
};

export default FooterComponent;
