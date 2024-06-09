import axiosClient from "@/configs/axiosClient"
import axiosClientRecruiter from "@/configs/axiosRecruiter"

const notificationApi = {
  getNotification: (lang: string) => {
    const URL = `/v2/notification/all?lang=${lang}`

    return axiosClient.get(URL, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
      },
    })
  },
  getNotificationRecruiter: (lang: string) => {
    const URL = `/v2/notification/all?lang=${lang}`

    return axiosClientRecruiter.get(URL, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('accessTokenRecruiter')}`,
      },
    })
  },
}
export default notificationApi
