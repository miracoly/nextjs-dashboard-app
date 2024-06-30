import {authConfig} from '@/auth.config';
import NextAuth from 'next-auth';

export default NextAuth(authConfig).auth;

export const config = {
  matchers: ['/((?!api|_next/static|_next/image|.*\\.png$).*)']
}