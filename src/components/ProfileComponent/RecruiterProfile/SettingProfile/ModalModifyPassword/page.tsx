import { RootState } from "@/redux";
import { Button, Input, Modal } from "antd";
import { LuAsterisk } from "react-icons/lu";
import { useSelector } from "react-redux";

type Prop = {
    isModalOpenModifyPassword: boolean,
    handleOkModifyPassword: () => void,
    handleCancelModifyPassword: () => void,
    oldPassword: string,
    setOldPassword: (value: string) => void,
    newPassword: string,
    setNewPassword: (value: string) => void,
    confirmPassword: string,
    setConfirmPassword: (value: string) => void,
    isCheckOldPassword: boolean,
    setIsCheckOldPassword: (value: boolean) => void,
    isCheckNewPassword: boolean,
    setIsCheckNewPassword: (value: boolean) => void,
    isCheckConfirmPassword: boolean,
    setIsCheckConfirmPassword: (value: boolean) => void
}

const ModalModifyPassword = (prop: Prop) => {
    const languageRedux = useSelector((state: RootState) => state.changeLaguage.language);
    const {
        isModalOpenModifyPassword,
        handleOkModifyPassword,
        handleCancelModifyPassword,
        oldPassword,
        setOldPassword,
        newPassword,
        setNewPassword,
        confirmPassword,
        setConfirmPassword,
        isCheckOldPassword,
        setIsCheckOldPassword,
        isCheckNewPassword,
        setIsCheckNewPassword,
        isCheckConfirmPassword,
        setIsCheckConfirmPassword
    } = prop;
    return (
        <Modal
            style={{
                top: 250,
            }}
            title={languageRedux === 1 ? 'Thay đổi mật khẩu' : 'Modify Password'}
            open={isModalOpenModifyPassword}
            onOk={handleOkModifyPassword}
            onCancel={handleCancelModifyPassword}
            footer={null}
            closeIcon={null}
        >
            <div className="flex flex-col">
                <div className="flex flex-col gap-3">
                    <div>
                        <div className="flex gap-1 items-center mb-3">
                            <LuAsterisk style={{ color: 'red' }} />
                            <label htmlFor="oldPassword" className="font-serif ">
                                {languageRedux === 1 ? 'Mật khẩu cũ' : 'Old password'}
                            </label>
                        </div>
                        <Input.Password
                            onChange={(e) => setOldPassword(e.target.value)}
                            id="oldPassword"
                            onClick={() => setIsCheckOldPassword(true)}
                            className="w-full p-2 rounded-lg border border-gray-300"
                        />
                        {
                            isCheckOldPassword && oldPassword === '' && <div className="text-red-500 text-[13px] mt-2">
                                {languageRedux === 1 ? 'Mật khẩu cũ không được để trống' : 'Old password cannot be empty'}
                            </div>
                        }
                    </div>
                    <div>
                        <div className="flex gap-1 items-center mb-3">
                            <LuAsterisk style={{ color: 'red' }} />
                            <label htmlFor="newPassword" className="font-serif ">
                                {languageRedux === 1 ? 'Mật khẩu mới' : 'New password'}
                            </label>
                        </div>
                        <Input.Password
                            id="newPassword"
                            onChange={(e) => setNewPassword(e.target.value)}
                            onClick={() => setIsCheckNewPassword(true)}
                            className="w-full p-2 rounded-lg border border-gray-300"
                        />
                        {
                            isCheckNewPassword && newPassword === '' && <div className="text-red-500 text-[13px] mt-2">
                                {languageRedux === 1 ? 'Mật khẩu mới không được để trống' : 'New password cannot be empty'}
                            </div>
                        }
                    </div>
                    <div>
                        <div className="flex gap-1 items-center mb-3">
                            <LuAsterisk style={{ color: 'red' }} />
                            <label htmlFor="confirmPassword" className="font-serif">
                                {languageRedux === 1
                                    ? 'Nhập lại mật khẩu mới'
                                    : 'Confirm new password'}
                            </label>
                        </div>
                        <Input.Password
                            id="confirmPassword"
                            onClick={() => setIsCheckConfirmPassword(true)}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            className="w-full p-2 rounded-lg border border-gray-300"
                        />
                        {
                            isCheckConfirmPassword && confirmPassword === '' && <div className="text-red-500 text-[13px] mt-2">
                                {languageRedux === 1 ? 'Nhập lại mật khẩu mới không được để trống' : 'Confirm new password cannot be empty'}
                            </div>
                        }
                        {
                            isCheckConfirmPassword && confirmPassword !== newPassword && <div className="text-red-500 text-[13px] mt-2">
                                {languageRedux === 1 ? 'Mật khẩu nhập lại không khớp' : 'The re-entered password does not match'}
                            </div>
                        }
                    </div>
                </div>
            </div>
            <div className="flex justify-end gap-2">
                <div className="flex justify-end mt-4">
                    <Button
                        type="default"
                        className="rounded-lg"
                        onClick={handleOkModifyPassword}
                        style={{
                            backgroundColor: '#7a7acb',
                            color: 'white'
                        }}
                        disabled={
                            oldPassword === '' || newPassword === '' || confirmPassword === '' || confirmPassword !== newPassword
                        }
                    >
                        {languageRedux === 1 ? 'Lưu' : 'Save'}
                    </Button>
                </div>
                <div className="flex justify-end mt-4">
                    <Button
                        type="default"
                        style={{
                            backgroundColor: 'red',
                            color: 'white'
                        }}
                        className="rounded-lg"
                        onClick={handleCancelModifyPassword}
                    >
                        {languageRedux === 1 ? 'Hủy' : 'Cancel'}
                    </Button>
                </div>
            </div>
        </Modal>
    );
}

export default ModalModifyPassword;
