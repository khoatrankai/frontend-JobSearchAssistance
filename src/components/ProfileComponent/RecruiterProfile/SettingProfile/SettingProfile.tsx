"use client";
import { RootState } from "@/redux";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import ModalModifyPassword from "./ModalModifyPassword/page";
import ModalSettingAccount from "./ModalSettingAccount/page";
import profileAPi from "@/api/profiles/profileApiRecruiter";
import ToastCustom from "@/util/ToastCustom";

type Props = {};

const SettingProfile = (props: Props) => {
  const profileV3 = useSelector(
    (state: RootState) => state.profileRecruiter.profile
  );
  const languageRedux = useSelector(
    (state: RootState) => state.changeLaguage.language
  );
  const [isModalOpenModifyPassword, setIsModalOpenModifyPassword] =
    useState(false);
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isCheckOldPassword, setIsCheckOldPassword] = useState(false);
  const [isCheckNewPassword, setIsCheckNewPassword] = useState(false);
  const [isCheckConfirmPassword, setIsCheckConfirmPassword] = useState(false);
  const [isModalOpenSettingAccount, setIsModalOpenSettingAccount] =
    useState(false);
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPasswordSetting, setNewPasswordSetting] = useState("");
  const { hdError, hdSuccess } = ToastCustom();
  const showModalModifyPassword = () => {
    setIsModalOpenModifyPassword(true);
  };

  const handleOkModifyPassword = async () => {
    const res: any = await profileAPi.recruitUpdatePassword(
      newPassword,
      oldPassword,
      "vi"
    );
    if (res && res?.statusCode === 200) {
      hdSuccess("Đổi mật khẩu thành công");
      setNewPassword("");
      setOldPassword("");
      setConfirmPassword("");
    } else {
      hdError("Đổi mật khẩu không thành công");
    }
    setIsModalOpenModifyPassword(false);
  };

  const handleCancelModifyPassword = () => {
    setIsModalOpenModifyPassword(false);
  };

  const showModalSettingAccount = () => {
    setIsModalOpenSettingAccount(true);
  };

  const handleOkSettingAccount = () => {
    setIsModalOpenSettingAccount(false);
  };

  const handleCancelSettingAccount = () => {
    setIsModalOpenSettingAccount(false);
  };

  return (
    <div>
      <h1 className="mt-4 font-bold text-2xl bg-white p-3 rounded-lg">
        {languageRedux === 1 ? "Quản lý tài khoản" : "Account settings"}
      </h1>
      <div className="w-full flex flex-col p-3 bg-white rounded-lg mt-3 gap-3">
        <div className="font-bold">
          {languageRedux === 1
            ? "Email đăng nhập & mật khẩu"
            : "Login Email & Password"}
        </div>
        <div className="font-serif">
          {languageRedux === 1 ? "Địa chỉ email" : "Email Address"} :{" "}
          {profileV3?.email}
        </div>

        <div className="flex justify-end font-serif gap-2 text-blue-500">
          {/* <div
            className="cursor-pointer"
            onClick={() => {
              showModalSettingAccount();
            }}
          >
            {languageRedux === 1 ? "Thiết lập tài khoản" : "Account settings"}
          </div> */}
          <div>|</div>
          <div
            className="cursor-pointer"
            onClick={() => {
              showModalModifyPassword();
            }}
          >
            {languageRedux === 1 ? "Thay đổi mật khẩu" : "Change password"}
          </div>
        </div>
      </div>
      <ModalModifyPassword
        isModalOpenModifyPassword={isModalOpenModifyPassword}
        handleOkModifyPassword={handleOkModifyPassword}
        handleCancelModifyPassword={handleCancelModifyPassword}
        oldPassword={oldPassword}
        setOldPassword={setOldPassword}
        newPassword={newPassword}
        setNewPassword={setNewPassword}
        confirmPassword={confirmPassword}
        setConfirmPassword={setConfirmPassword}
        isCheckOldPassword={isCheckOldPassword}
        setIsCheckOldPassword={setIsCheckOldPassword}
        isCheckNewPassword={isCheckNewPassword}
        setIsCheckNewPassword={setIsCheckNewPassword}
        isCheckConfirmPassword={isCheckConfirmPassword}
        setIsCheckConfirmPassword={setIsCheckConfirmPassword}
      />
      <ModalSettingAccount
        isModalOpenSettingAccount={isModalOpenSettingAccount}
        handleOkSettingAccount={handleOkSettingAccount}
        handleCancelSettingAccount={handleCancelSettingAccount}
        currentPassword={currentPassword}
        setCurrentPassword={setCurrentPassword}
        newPasswordSetting={newPasswordSetting}
        setNewPasswordSetting={setNewPasswordSetting}
      />
    </div>
  );
};

export default SettingProfile;
