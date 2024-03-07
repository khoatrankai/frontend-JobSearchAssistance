'use client';
import React, { useEffect, useState } from 'react';
import { Input, Checkbox, Space } from 'antd';
import { MdEmail, MdOutlineWifiPassword } from 'react-icons/md';
import Button from '@mui/material/Button';
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
import { useRouter } from 'next/navigation';
import { motion } from "framer-motion";
import { FaPhoneAlt } from "react-icons/fa";
import { FaAsterisk } from "react-icons/fa";
import './style.scss';
import { useSelector } from 'react-redux';
import { RootState } from '@/redux';
import EditLogoCompanyComponent from '@/components/CompanyComponent/EditLogoCompanyComponent';
import EditAddressCompanyComponent from '@/components/CompanyComponent/EditAddressCompanyComponent';
import ModifyNameTaxComponent from '@/app/recruiter/register/component/RegisterNameTaxComponent/page';
import ModifyEmailPhoneComponent from '@/app/recruiter/register/component/RegisterPhoneMailComponent/page';
import ModifyRoleWebComponent from '@/app/recruiter/register/component/RegisterRoleWebComponent/page';
import ModifyFieldScaleCompany from '@/app/recruiter/register/component/RegisterFieldComponent/page';
import EditDescripeCompanyComponent from '@/components/CompanyComponent/EditDescripeCompanyComponent';
import EditImageCompanyComponent from '@/components/CompanyComponent/EditImageCompanyComponent';
const Page = () => {
    const images = [
        {
            id: 1, src: 'https://res.cloudinary.com/ddwjnjssj/image/upload/v1709741967/images/banners/tde00h9gzlhdax3skc7m.jpg'
        },
        {
            id: 2, src: 'https://res.cloudinary.com/ddwjnjssj/image/upload/v1709741789/images/banners/oz7qggoyn5oyoxquq9x3.jpg'
        }
    ]
    const [isMobile, setIsMobile] = useState(false);
    const [isTablet, setIsTablet] = useState(false);
    const [passwordVisible, setPasswordVisible] = useState(false);
    const [currentImage, setCurrentImage] = useState(0);
    const [verifyPasswordVisible, setVerifyPasswordVisible] = useState(false);
    const [dataCompany, setDataCompany] = useState<any | null>({
        name: '',
        address: '',
        companyLocation: '',
        companyRoleInfomation: '',
        companyCategory: '',
        companySizeInfomation: '',
        taxCode: '',
        phone: '',
        email: '',
        website: '',
        description: '',
        logoPath: '',
    });
    const languageRedux = useSelector(
        (state: RootState) => state.changeLaguage.language,
    );
    const router = useRouter();

    const togglePasswordVisibility = () => {
        setPasswordVisible((prevVisible) => !prevVisible);
    };

    const toggleVerifyPasswordVisibility = () => {
        setVerifyPasswordVisible((prevVisible) => !prevVisible);
    }

    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth < 1200) {
                setIsTablet(true);
            }
            if (window.innerWidth < 768) {
                setIsMobile(true);
            }
            if (window.innerWidth > 1200) {
                setIsTablet(false);
            }
            if (window.innerWidth > 768) {
                setIsMobile(false);
            }
        }
        handleResize();
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentImage((prevImage) =>
                prevImage === images.length - 1 ? 0 : prevImage + 1
            );
        }, 3000);

        return () => clearInterval(interval);
    }, [currentImage, images.length]);
    return (
        <div className="flex bg-gray-100 h-screen">
            <div className={isTablet ? 'w-full p-4 flex items-center justify-center overflow-y-auto' : 'w-2/3 p-4 flex items-center justify-center overflow-y-scroll'}>
                <div className={isMobile ? 'w-full rounded-lg p-3' : 'w-3/5 rounded-lg p-3'} >
                    <div className='header mb-6 flex flex-col gap-1'>
                        <img src="/logo/2025.png" alt="logo" width={170} height={170} />
                        <h1 className='text-2xl font-bold'>Đăng ký tài khoản Nhà tuyển dụng</h1>
                        <p className='text-gray-600'>
                            Cùng tạo dựng lợi thế cho doanh nghiệp bằng trải nghiệm công nghệ tuyển dụng ứng dụng sâu AI & Hiring Funnel
                        </p>
                    </div>
                    <div className='policy'>
                        <div className='basic regulations'>
                            Quy định
                        </div>
                        <div className='flex flex-col gap-4'>
                            <div className='basic'>
                                Để đảm bảo chất lượng dịch vụ, TopCV không cho phép một người dùng tạo nhiều tài khoản khác nhau.
                            </div>
                            <div className='basic'>
                                Nếu phát hiện vi phạm, TopCV sẽ ngừng cung cấp dịch vụ tới tất cả các tài khoản trùng lặp hoặc chặn toàn bộ truy cập tới hệ thống website của TopCV. Đối với trường hợp khách hàng đã sử dụng hết 3 tin tuyển dụng miễn phí, TopCV hỗ trợ kích hoạt đăng tin tuyển dụng không giới hạn sau khi quý doanh nghiệp cung cấp thông tin giấy phép kinh doanh.
                            </div>
                            <div className='basic'>
                                Mọi thắc mắc vui lòng liên hệ Hotline CSKH:
                            </div>
                            <div className='basic flex gap-1 items-center'>
                                <FaPhoneAlt className='text-[#00b14f]' />
                                <span className='text-[#00b14f]'>
                                    1900 636 299
                                </span>
                            </div>
                        </div>

                    </div>
                    <div className='login'>
                        <div className='email'>
                            <div className='flex mb-1 gap-1'>
                                <label>
                                    Email
                                </label>
                                <FaAsterisk className='asterisk' />
                            </div>

                            <div className='mb-3'>
                                <Input
                                    size="large"
                                    placeholder="Email"
                                    prefix={<span style={{ marginRight: '8px' }}><MdEmail /></span>}
                                />
                            </div>
                            <div>
                                Email đăng nhập không được để trống
                            </div>
                            <div>
                                Trường hợp bạn đăng ký tài khoản bằng email không phải email tên miền công ty, một số dịch vụ trên tài khoản có thể sẽ bị giới hạn quyền mua hoặc sử dụng.
                            </div>
                        </div>
                        <div className='password'>
                            <div className='flex mb-1 gap-1'>
                                <label >
                                    Mật khẩu:
                                </label>
                                <FaAsterisk className='asterisk' />
                            </div>

                            <div className='mb-3'>
                                <Input size="large" placeholder="Mật khẩu" prefix={<span style={{ marginRight: '8px' }}><MdOutlineWifiPassword /></span>} suffix={
                                    <Space onClick={toggleVerifyPasswordVisibility} style={{ cursor: 'pointer' }}>
                                        {verifyPasswordVisible ? <FaEye /> : <FaEyeSlash />}
                                    </Space>
                                } />
                            </div>

                            <div>
                                Mật khẩu không được để trống
                            </div>
                        </div>

                        <div className='verify-password'>
                            <div className='flex mb-1 gap-1'>
                                <label >
                                    Xác nhận mật khẩu:
                                </label>
                                <FaAsterisk className='asterisk' />
                            </div>

                            <div className='mb-3'>
                                <Input size="large" placeholder="Xác nhận mật khẩu" prefix={<span style={{ marginRight: '8px' }}><MdOutlineWifiPassword /></span>} suffix={
                                    <Space onClick={togglePasswordVisibility} style={{ cursor: 'pointer' }}>
                                        {passwordVisible ? <FaEye /> : <FaEyeSlash />}
                                    </Space>
                                } />
                            </div>

                            <div>
                                Mật khẩu không trùng khớp
                            </div>
                        </div>
                        <div>
                            <div>
                                Thông tin nhà tuyển dụng
                            </div>
                            <EditLogoCompanyComponent
                                dataCompany={dataCompany}
                                setDataCompany={setDataCompany}
                                is_profile={false}
                                language={languageRedux}
                            />
                            <ModifyNameTaxComponent
                                dataCompany={dataCompany}
                                setDataCompany={setDataCompany}
                                is_profile={false}
                            />
                            <ModifyRoleWebComponent
                                dataCompany={dataCompany}
                                setDataCompany={setDataCompany}
                                is_profile={false}
                            />
                            <ModifyEmailPhoneComponent
                                dataCompany={dataCompany}
                                setDataCompany={setDataCompany}
                                is_profile={false}
                            />
                            <EditAddressCompanyComponent
                                dataCompany={dataCompany}
                                setDataCompany={setDataCompany}
                                is_profile={false}
                            />
                            <ModifyFieldScaleCompany
                                dataCompany={dataCompany}
                                setDataCompany={setDataCompany}
                                is_profile={false}
                            />
                            <EditDescripeCompanyComponent
                                dataCompany={dataCompany}
                                setDataCompany={setDataCompany}
                                is_profile={false}
                            />
                        </div>
                        <div className='flex gap-1'>
                            <Checkbox>

                            </Checkbox>
                            <div>
                                Tôi đã đọc và đồng ý với các điều khoản sử dụng của TopCV
                            </div>
                        </div>
                        <Button sx={{
                            backgroundColor: '#ffcc00',
                            color: 'black',
                            marginTop: '20px',
                            '&:hover': {
                                backgroundColor: '#ffcc00',
                                color: 'black'
                            }

                        }} className='w-full'>
                            Hoàn tất
                        </Button>
                        <div className='mt-3 justify-center flex'>
                            <div className='basic text-[#6f7882]'>
                                Bạn đã có tài khoản? Đăng nhập
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {!isTablet &&
                images.map((image, index) => (
                    <motion.div
                        key={image.id}
                        className={`w-1/3 h-screen flex bg-right ${index === currentImage ? "visible" : "hidden"
                            }`}
                        animate={{ x: 0 }}
                        initial={{ x: index === 0 ? 0 : -1000 }}  // Chỉ set x = 0 cho ảnh đầu tiên
                        transition={{ duration: 1 }}
                    >
                        <img src={image.src} alt={`Image ${image.id}`} />
                    </motion.div>
                ))}
        </div>
    );
}

export default Page;
