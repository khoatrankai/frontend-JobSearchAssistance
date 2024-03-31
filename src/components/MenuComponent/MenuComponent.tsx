import React, { useRef } from "react";
import MenuRecruiter from "./MenuRecruiter/MenuRecruiter";
import MenuUser from "./MenuUser/MenuUser";
import { useSelector } from "react-redux/es/hooks/useSelector";
import { RootState } from "@/redux";

type Props = {};

const MenuComponent = (props: Props) => {
  const profileV3 = useSelector((state: RootState) => state.profile.profile);

  return <>{profileV3.role !== 3 ? <MenuUser /> : <MenuRecruiter />}</>;
};

export default MenuComponent;
