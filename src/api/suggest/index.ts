import axiosClient from "@/configs/axiosClient"

const suggestApi = {
    getSuggestOfPost : (postId: number, limit: number, page: number) => {
        const URL = `http://localhost:1902/api/v3/user-suggest/${postId}?limit=${limit}&page=${page}`

        return axiosClient.get(URL, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
            },
        })
    }
}

export default suggestApi
