/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode:true,
  images: {
    domains: [
      'i02.appmifile.com',
      'res.cloudinary.com'
    ],
  },
  // experimental:{
  //   forceSwcTransforms: true,
  // },
  
  env: {
    GOOGLE_CLIENT_ID:'654427955583-p55kmtciurlr413ek8pah4tdgfvsh0ml.apps.googleusercontent.com',
    GOOGLE_CLIENT_SECRET:'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',
    FACEBOOK_CLIENT_ID:'7405181522919452',
    FACEBOOK_CLIENT_SECRET:'1749176e4a6ddabcfb2d4bfc3729db7f',
    NEXTAUTH_URL:'https://next-kltn-live.vercel.app/',
    NEXTAUTH_SECRET:'WR6rmKiWremCcY3f3ku4Z6S/bw6Y+s1HglK5Thqumyo=',
    REACT_APP_GOOGLE_CLIENT_ID:
      '436273589347-ot9ec9jhm235q3irsvjpnltr8hsun5cp.apps.googleusercontent.com',
    REACT_APP_FACEBOOK_APP_ID: '523018296116961',
    FIREBASE_API_KEY: "AIzaSyAG8YqWXCErlZSLKUNR54NZ_NK7BTZU--g",
    FIREBASE_AUTH_DOMAIN: "mymap-e291c.firebaseapp.com",
    FIREBASE_PROJECT_ID: "mymap-e291c",
    FIREBASE_STORAGE_BUCKET: "mymap-e291c.appspot.com",
    FIREBASE_MESSAGING_SENDER_ID: "663285944055",
    FIREBASE_APP_ID: "1:663285944055:web:6fa094eec315491756cdf2",
    FIREBASE_MEASUREMENT_ID: "G-T65LCW23PJ"
  },
};

module.exports = nextConfig;