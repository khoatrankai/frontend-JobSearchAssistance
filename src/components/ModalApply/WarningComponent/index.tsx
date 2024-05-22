import React from 'react';
import './style.scss';
import { IoMdWarning } from "react-icons/io";

const Page = () => {
    return (
        <div className="warning-container">
            <div className='flex gap-1 text-red-600 items-center font-bold text-sm'>
                <IoMdWarning className="warning-icon" />
                <div>
                    Lưu ý
                </div>
            </div>
            <div className='text-sm mt-3'>
                1. Bạn chỉ được ứng tuyển 1 lần cho mỗi bài viết tuyển dụng.
            </div>
            <div className='text-sm mt-1'>
                2. Hãy chắc chắn bạn đã chọn đúng CV cần ứng tuyển.
            </div>
        </div>
    );
}

export default Page;