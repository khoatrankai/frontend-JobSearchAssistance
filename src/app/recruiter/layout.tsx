/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import { useSrollContext } from "@/context/AppProvider";
import { fetchProfileRecruiter } from "@/redux/reducer/profileReducer/profileSliceRecruiter";
import CheckRoleRecruiter from "@/util/CheckRoleRecruiter";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // const { handleLoadHrefPage } = useSrollContext();

  // useEffect(() => {
  //   handleLoadHrefPage();
  // }, []);
  return <>{children}</>;
}
