import React, { ReactNode } from "react";

type Props = {
  children?: ReactNode;
};

const ShowModal = ({ children }: Props) => {
  return (
    <div className="fixed inset-0 flex justify-center items-center bg-black/25 z-[100]">
      {children}
    </div>
  );
};

export default ShowModal;
