import axios from 'axios'

const messageApi = {
  getChatMessage: (uid: string | null, pid: number, lang: string) => {
    const URL = `https://backend-hcmute-nodejs.onrender.com/api/v1/chats/messages?uid=${uid}&pid=${pid}&lang=${lang}`
    return axios.get(URL, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('accessTokenRecruiter')}`,
      },
    })
  },

  getUserChated: (lang: string) => {
    const URL = `https://backend-hcmute-nodejs.onrender.com/api/v1/chats/users?lang=${lang}`
    return axios.get(URL, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('accessTokenRecruiter')}`,
      },
    })
  },

  getUnread: (lang: string) => {
    const URL = `https://backend-hcmute-nodejs.onrender.com/api/v1/chats/unread?lang=${lang}`
    return axios.get(URL, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('accessTokenRecruiter')}`,
      },
    })
  },
}

export default messageApi
