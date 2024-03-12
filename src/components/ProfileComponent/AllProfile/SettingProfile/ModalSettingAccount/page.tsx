import { RootState } from "@/redux";
import { Button, Input, Modal } from "antd";
import { useSelector } from "react-redux";
import { LuAsterisk } from "react-icons/lu";
import { useState } from "react";

type Prop = {
    isModalOpenSettingAccount: boolean,
    handleOkSettingAccount: () => void,
    handleCancelSettingAccount: () => void,
    currentPassword: string,
    setCurrentPassword: (value: string) => void,
    newPasswordSetting: string,
    setNewPasswordSetting: (value: string) => void,
}

const ModalSettingAccount = (prop: Prop) => {
    const {
        isModalOpenSettingAccount,
        handleOkSettingAccount,
        handleCancelSettingAccount,
        currentPassword,
        setCurrentPassword,
        newPasswordSetting,
        setNewPasswordSetting,
    } = prop;
    const profileV3 = useSelector((state: RootState) => state.profile.profile);
    const [isCheckCurrentPassword, setIsCheckCurrentPassword] = useState(false);
    const [isCheckNewPasswordSetting, setIsCheckNewPasswordSetting] = useState(false);

    return (
        <Modal
            style={{
                top: 250,
            }}
            title="Thiết lập tài khoản"
            open={isModalOpenSettingAccount}
            footer={null}
            closeIcon={null}
            onCancel={handleCancelSettingAccount}
        >
            <div className="flex flex-col">
                <div className="flex flex-col gap-3">
                    <div>
                        <div className="flex gap-1 items-center mb-3">
                            <div className="flex gap-1 items-center">
                                <LuAsterisk style={{ color: 'red' }} />
                                <label htmlFor="oldPassword" className="font-serif ">
                                    Email đăng nhập
                                </label>
                            </div>
                        </div>
                        <Input
                            value={profileV3?.email}
                            disabled
                        />
                    </div>
                    <div>
                        <div className="flex gap-1 items-center mb-3">
                            <div className="flex gap-1 items-center">
                                <LuAsterisk style={{ color: 'red' }} />
                                <label htmlFor="oldPassword" className="font-serif">
                                    Mật khẩu hiện tại
                                </label>
                            </div>
                        </div>
                        <Input.Password
                            placeholder="Mật khẩu hiện tại"
                            onChange={
                                (e) => {
                                    setCurrentPassword(e.target.value);
                                }
                            }
                            onClick={
                                () => {
                                    setIsCheckCurrentPassword(true);
                                }
                            }
                        />
                        {
                            isCheckCurrentPassword && currentPassword === '' ? <div className="text-red-500 text-[13px] mt-2">Mật khẩu không được để trống</div> : null
                        }
                    </div>
                    <div>
                        <div className="flex gap-1 items-center mb-3">
                            <div className="flex gap-1 items-center">
                                <LuAsterisk style={{ color: 'red' }} />
                                <label htmlFor="oldPassword" className="font-serif ">
                                    Mật khẩu mới
                                </label>
                            </div>
                        </div>
                        <Input
                            placeholder="Email mới"
                            onChange={
                                (e) => {
                                    setNewPasswordSetting(e.target.value);
                                }
                            }
                            onClick={
                                () => {
                                    setIsCheckNewPasswordSetting(true);
                                }
                            }
                        />
                        {
                            isCheckNewPasswordSetting && newPasswordSetting === '' ? <div className="text-red-500 text-[13px] mt-2">Mật khẩu mới không được để trống</div> : null
                        }
                    </div>
                </div>
                <div className="flex gap-2 mt-3 justify-end">
                    <div className="flex justify-end">
                        <Button
                            type="default"
                            style={{
                                backgroundColor: '#7a7acb',
                                color: 'white'
                            }}
                            className="rounded-lg" onClick={
                                handleOkSettingAccount
                            }>
                            Lưu
                        </Button>
                    </div>

                    <div className="flex justify-end">
                        <Button type="default"
                            style={{
                                backgroundColor: 'red',
                                color: 'white'
                            }}
                            className="rounded-lg" onClick={
                                handleCancelSettingAccount
                            }>
                            Hủy
                        </Button>
                    </div>
                </div>
            </div>

        </Modal>
    )
}

export default ModalSettingAccount