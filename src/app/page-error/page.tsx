'use client';
import { IoIosArrowBack } from "react-icons/io";
import { useRouter } from "next/navigation";
import './style.scss';

const Page = () => {
    const router = useRouter();
    return (
        <div className="flex h-screen justify-center items-center flex-col bg-slate-100">
            <div className="flex items-center">
                <div className="bg-icon cursor-pointer" onClick={() => {
                    router.push('/');
                }}>
                    <IoIosArrowBack />
                </div>

                <img src="/logo/2025.png" alt="404" width={205} height={205} />
            </div>
            <div className="text-center text-3xl font-bold uppercase">
                Đường link không tồn tại hoặc đã hết hạn
            </div>
        </div>

    );
}

export default Page;