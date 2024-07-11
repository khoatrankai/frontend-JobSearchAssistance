import { RootState } from "@/redux";
import useRouterCustom from "@/util/useRouterCustom/useRouterCustom";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";

type Props = {};

const ShowActive = (props: Props) => {
  const profileInfoV3 = useSelector(
    (state: RootState) => state.profile.profile
  );
  const { pushRouter } = useRouterCustom();
  useEffect(() => {
    console.log(profileInfoV3);
  }, [profileInfoV3]);
  return (
    <>
      {Object.keys(profileInfoV3).length !== 0 && !profileInfoV3?.isActive && (
        <div className="fixed z-50 bottom-0 inset-x-0">
          <div className="w-full bg-red-700/70 flex justify-center text-white">
            <button
              onClick={() => {
                pushRouter("/verify-email");
              }}
            >
              Vui lòng <span className="underline">xác thực</span>{" "}
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default ShowActive;
