import axiosClient from "@/configs/axiosClient"
import axiosClientRecruiter from "@/configs/axiosRecruiter"

const suggestApi = {
    getSuggestOfPost : (postId: number, limit: number, page: number) => {
        const URL = `http://localhost:1902/api/v3/user-suggest/${postId}?limit=${limit}&page=${page}`

        return axiosClientRecruiter.get(URL, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('accessTokenRecruiter')}`,
            },
        })
    }
}

export default suggestApi
