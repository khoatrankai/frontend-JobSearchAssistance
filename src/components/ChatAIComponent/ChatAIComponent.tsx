import React from "react";

type Props = {};

const ChatAIComponent = (props: Props) => {
  return (
    <div className="fixed inset-0 z-40">
      <div className="w-[60px] h-[60px] rounded-full bg-black absolute bottom-[270px] right-4 group"></div>
    </div>
  );
};

export default ChatAIComponent;
