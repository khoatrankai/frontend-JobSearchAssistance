import axios from "axios"

const appplicationApi = {
  updateApplication: (id: number, status: number) => {
    const URL = `http://localhost:8888/api/v1/application/update`

    return axios.put(
      URL,
      { id, status },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('accessTokenRecruiter')}`,
        },
      }
    )
  },
  applyAplication: (data: FormData) => {
    const URL = `http://localhost:8888/api/v1/application/create`
    return axios.post(URL, data, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
      },
    })
  },
}
export default appplicationApi
