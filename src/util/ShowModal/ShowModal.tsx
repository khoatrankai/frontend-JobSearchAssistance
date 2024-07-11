import React, { ReactNode } from "react";

type Props = {
  children?: ReactNode;
  setTab?: any;
};

const ShowModal = ({ children, setTab }: Props) => {
  return (
    <div
      className="fixed inset-0 flex justify-center items-center bg-black/50 z-50"
      onClick={() => {
        setTab(false);
      }}
    >
      {children}
    </div>
  );
};

export default ShowModal;
