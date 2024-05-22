import React from "react";

type Props = {
  setTab: any;
};

const ModalBG = ({ setTab }: Props) => {
  return (
    <div
      className="fixed inset-0  "
      style={{ zIndex: 49 }}
      onMouseDown={() => {
        setTab(0);
      }}
    ></div>
  );
};

export default ModalBG;
