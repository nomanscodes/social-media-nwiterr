import { NextApiRequest, NextApiResponse } from 'next';
import { getSession } from 'next-auth/react';
import prisma from '@/libs/prismadb';


const serverAuth = async (req: NextApiRequest, res: NextApiResponse) => {

  const session = await getSession({ req });

  console.log("session", session?.user?.email);

  if (!session?.user?.email) {
    throw new Error('Not signed in sss');
  }

  const currentUser = await prisma.user.findUnique({
    where: {
      email: session.user.email,
    }
  });

  if (!currentUser) {
    throw new Error('Not signed in user');
  }

  return { currentUser };
};

export default serverAuth;
