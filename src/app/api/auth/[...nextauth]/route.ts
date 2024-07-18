import signInEmailApi from '@/api/authApi';
import { useSrollContext } from '@/context/AppProvider';
import NextAuth from 'next-auth/next'
import GoogleProvider from 'next-auth/providers/google'
import FacebookProvider from 'next-auth/providers/facebook';
const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
      
      authorization: {
        params: {},
      },
      checks: ['none'],
    }),
    FacebookProvider({
      clientId: process.env.FACEBOOK_CLIENT_ID as string,
      clientSecret: process.env.FACEBOOK_CLIENT_SECRET as string,
      authorization: {
        params: {
          scope: 'email,public_profile',
        },
      }
      
    }),
  ],
  
  callbacks: {
    async jwt({ token, user, account, profile, isNewUser }) {
      if(account?.provider === "google"){
        const idToken = account?.id_token ?? "";
        if(idToken){
          console.log(idToken)
          const resdata:any =  await signInEmailApi.signInGoogle(idToken)
          if (resdata && resdata.code === 200 && resdata.data) {
            console.log(resdata)
            return {
              ...token,
              accountId: resdata.data.accountId,
              accessToken: resdata.data.accessToken,
              refreshToken: resdata.data.refreshToken,
            };
          }
          
          
        }
      }else{
        const idToken = account?.access_token ?? "";
        if(idToken){
        console.log(token, user, account, profile)
          console.log("token day nè",idToken)
          const resdata:any =  await signInEmailApi.signInFacebook(idToken)
          console.log("tim ra roi",resdata)

          if (resdata && resdata.code === 200 && resdata.data) {
            
          console.log("tim ra roi",resdata)

            return {
              ...token,
              accountId: resdata.data.accountId,
              accessToken: resdata.data.accessToken,
              refreshToken: resdata.data.refreshToken,
            };
          }
          
          
        }
      }
      
     
    return token
             
    },
    async session({ session, token }) {
      
      return {
        ...session,...token
      };
    },
  },
  pages: {
    signIn: "/login",
  }
})

export { handler as GET, handler as POST }