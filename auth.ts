import {authConfig} from '@/auth.config';
import NextAuth from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import {z} from 'zod';
import {User} from '@/app/lib/definitions';
import {sql} from '@vercel/postgres';
import bcrypt from 'bcrypt';

const getUser = async (email: string): Promise<User> => {
  try {
    const user = await sql<User>`SELECT *
                                 FROM users
                                 WHERE email = ${email}`;
    return user.rows[0];
  } catch (e) {
    console.error('Failed to fetch user: ', e);
    throw new Error('Failed to fetch user.')
  }
}

export const {auth, signIn, signOut} = NextAuth({
  ...authConfig,
  providers: [Credentials({
    authorize: async credentials => {
      const parsedCredentials = z
        .object({email: z.string().email(), password: z.string().min(6)})
        .safeParse(credentials);

      if (parsedCredentials.success) {
        const {email, password} = parsedCredentials.data;
        const user = await getUser(email);
        if (!user) return null;
        const passwordMatch = await bcrypt.compare(password, user.password);

        if (passwordMatch) return user;
      }

      console.log('Invalid credentials');
      return null;
    }
  })]
})