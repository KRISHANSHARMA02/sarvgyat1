import NextAuth from "next-auth";

import CredentialsProvider from 'next-auth/providers/credentials';
import axios from 'axios';

export const {
    handlers: { GET, POST },
    auth,
    signIn,
    signOut,
} = NextAuth({
    session: {
        jwt: {
            signingKey: {
                kty: 'oct',
                kid: process.env.NEXTAUTH_JWT_KEY_ID,
                alg: 'HS512',
                k: process.env.NEXTAUTH_JWT_KEY,
            },
           
        },
    },
    providers: [ 
        CredentialsProvider({
            name: 'Credentials',
            credentials: {
              email: { label: 'Email', type: 'email' },
              password: { label: 'Password', type: 'password' },
              role: { label: 'Role', type: 'text' }  // Added role field
            },
            async authorize(credentials) {
              const { email, password, role } = credentials;
      
              try {
                const endpoint = role === 'teacher'
                  ? 'https://learnospherebackend.singhbrothers.ltd/api/route/login'
                  : 'https://learnospherebackend.singhbrothers.ltd/api/route/studentlogin';     //https://learnospherebackend.singhbrothers.ltd/api/route/login   //https://learnospherebackend.singhbrothers.ltd/api/route/studentlogin
                                                                                                     
                
                const response = await axios.post(endpoint, {
                  email,
                  password
                });
      
                if (response.data && response.data.user) {
                  return response.data.user;
                } else {
                  if (response.data && response.data.errors) {
                    throw new Error(response.data.errors[0].message);
                  } else {
                    throw new Error('Invalid credentials');
                  }
                }
              } catch (error) {
                console.error('Authorization error:', error.message || error);
                throw new Error(error.response?.data?.errors?.[0]?.msg || 'Invalid credentials');
              }
            },
          }),
    ],

    callbacks: {
      async jwt({ token, account }) {
        if (account?.access_token) {
          token.accessToken = account.access_token;
        }
        return token;
      },
      async session({ session, token }) {
        session.accessToken = token.accessToken;
        return session;
      },
    },

    
    secret: process.env.NEXTAUTH_SECRET,


  
    
    pages: {
        error: '/auth/error',
        
    },
    
    trustHost: true,
    trustDomain: true,
        
   
});