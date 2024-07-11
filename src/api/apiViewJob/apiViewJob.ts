import axiosClient from "@/configs/axiosClient";

export const apiViewJob = {
    createViewJob: (postId: number) => {
        const URL = `https://backend-hcmute-nestjs.onrender.com/api/v3/view-jobs`;
        return axiosClient.post(URL, { postId }, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
            },
        });
    },
    getAllViewJob: () => {
        const URL = `https://backend-hcmute-nestjs.onrender.com/api/v3/view-jobs`;
        return axiosClient.get(URL, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
            },
        });
    }
}