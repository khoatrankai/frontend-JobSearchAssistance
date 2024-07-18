// api/productApi.js

import axiosClient from '@/configs/axiosClient';
import { V3 } from '../linkLocal';
import axiosClientRecruiter from '@/configs/axiosRecruiter';

const apiPayment = {
  createPay: async(money:any) => {
    const URL = `${V3}/api/v3/vnpay-models/create_payment_url`;
    return await axiosClientRecruiter.post(URL, { "amount": money,
      "bankCode": "",
      "language": "vn"},{
      headers: {
        Authorization: `Bearer ${localStorage.getItem('accessTokenRecruiter')}`,
      },
    });
  },

  createPayMomo: async(money:any) => {
    const URL = `${V3}/api/v3/momo/createPayment`;
    return await axiosClientRecruiter.post(URL, {
      "amount": money.toString(),
      "extraData": "Thanh toan MOMO"
    },{
      headers: {
        Authorization: `Bearer ${localStorage.getItem('accessTokenRecruiter')}`,
      },
    });
  },
  corfirmPay: async(orderId:any) => {
    const URL = `${V3}/api/v3/user-histories/${orderId}`;
    return await axiosClientRecruiter.get(URL, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('accessTokenRecruiter')}`,
      },
    });
  }

  
};

export default apiPayment;
