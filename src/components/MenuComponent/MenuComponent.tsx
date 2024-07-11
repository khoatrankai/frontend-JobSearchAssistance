"use client";
import React, { useEffect, useRef } from "react";
import MenuRecruiter from "./MenuRecruiter/MenuRecruiter";
import MenuUser from "./MenuUser/MenuUser";
import { useSelector } from "react-redux/es/hooks/useSelector";
import { RootState } from "@/redux";
import { useSrollContext } from "@/context/AppProvider";

type Props = {};

const MenuComponent = (props: Props) => {
  const { checkPage } = useSrollContext();

  return (
    <>{!checkPage.includes("/recruiter") ? <MenuUser /> : <MenuRecruiter />}</>
  );
};

export default MenuComponent;
