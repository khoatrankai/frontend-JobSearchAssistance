import axios from 'axios'
import queryString from 'query-string'

const BASE_URL = `https://welcome-unlimited-summaries-formerly.trycloudflare.com/api`


const accessToken = (typeof window !== 'undefined') ? localStorage.getItem('accessTokenRecruiter') : null
const axiosClientRecruiter = axios.create({
  baseURL: BASE_URL,
  headers: {
    'content-type': 'application/json',
  },
  paramsSerializer: (params) => queryString.stringify(params),
})


axiosClientRecruiter.interceptors.request.use(
  (config) => {
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`
    } else {
      delete config.headers.Authorization
    }
    return config
  },
  (error) => {
    Promise.reject(error.response || error.message)
  }
)

axiosClientRecruiter.interceptors.response.use(
  (response) => {
    if (response && response.data) {
      return response.data
    }

    const accessToken = window.localStorage.getItem('accessTokenRecruiter') || ''

    response.headers.Authorization = `Bearer ${accessToken}`
    return response
  },
  async (error) => {
    let originalRequest = error.config
    let refreshToken = localStorage.getItem('refreshTokenRecruiter')
    if (!refreshToken) {
      localStorage.removeItem('accessTokenRecruiter');
      return
    }


    if (
      (refreshToken && error.response?.status === 403) ||
      (refreshToken && error.response?.status === 401)
    ) {
      axios
        .post(`${BASE_URL}/v1/reset-access-token`, {
          refreshToken: refreshToken,
        })
        .then((response) => {
          if (response.status === 200) {
            localStorage.setItem('accessTokenRecruiter', response.data.data.accessToken)
            originalRequest.headers[
              'Authorization'
            ] = `Bearer ${response.data.data.accessToken}`
            window.location.reload()

            return axios(originalRequest)
          }
        })
        .catch((error) => {
          if (!localStorage.getItem("refreshTokenRecruiter")) {
            localStorage.removeItem("accessTokenRecruiter")
            localStorage.removeItem("refreshTokenRecruiter")
            localStorage.removeItem("accountIdRecruiter")
            axios.post(`${BASE_URL}/v1/sign-out`)
          } else if ((error.response?.status === 401 && localStorage.getItem("refreshToken")) || (error.response?.status === 403 && localStorage.getItem("refreshTokenRecruiter")) || (error.response?.status === 401 && localStorage.getItem("accessTokenRecruiter")) || (error.response?.status === 400 && localStorage.getItem("accessTokenRecruiter"))) {
            localStorage.removeItem("accessTokenRecruiter")
            localStorage.removeItem("refreshTokenRecruiter")
            localStorage.removeItem("accountIdRecruiter")
            axios.post(`${BASE_URL}/v1/sign-out`)
            window.location.reload()
            
          }else if ((error.response?.status === 401 && !localStorage.getItem("refreshToken")) || (error.response?.status === 401 && !localStorage.getItem("accessTokenRecruiter")) || (error.response?.status === 400 && !localStorage.getItem("accessTokenRecruiter")) || (error.response?.status === 403 && !localStorage.getItem("refreshTokenRecruiter"))) {
            localStorage.removeItem("accessTokenRecruiter")
            localStorage.removeItem("refreshTokenRecruiter")
            localStorage.removeItem("accountIdRecruiter")
            axios.post(`${BASE_URL}/v1/sign-out`)
            window.location.reload()
            
          }
        })
    }

    // throw error
  }
)


export default axiosClientRecruiter