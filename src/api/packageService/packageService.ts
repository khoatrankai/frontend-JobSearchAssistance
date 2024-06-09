import axiosClient from "@/configs/axiosClient"
import axiosClientRecruiter from "@/configs/axiosRecruiter"
import { V3 } from "../linkLocal"

const packageServiceApi = {
  getIdPackage: (id: any) => {
    const URL = `${V3}/api/v3/service-recruitment/${id}`

    return axiosClientRecruiter.get(URL)
  },
  postPayPackage: (id: any) => {
    const URL = `${V3}/api/v3/service-history`

    return axiosClientRecruiter.post(URL,{
        "serviceRecruitmentId": id
      })
  },
  getHistoryService: () => {
    const URL = `${V3}/api/v3/service-history`

    return axiosClientRecruiter.get(URL)
  }
}
export default packageServiceApi
