import React from 'react';
import type { GetServerSideProps, NextPage } from 'next';
import { useRouter } from 'next/router';
import Image from 'next/image';
import { FcGoogle } from 'react-icons/fc';
import { signOut, useSession, getSession } from 'next-auth/react';

const Index: NextPage = () => {
  const { data: session } = useSession();
  const router = useRouter();

  return (
    <div className="flex h-screen w-screen items-center justify-center bg-gray-900 p-4">
      <div
        className="flex h-auto w-64 cursor-pointer items-center justify-center rounded-md border border-gray-300 p-4 bg-gray-100"
        onClick={() => router.push('/signin')}
      >
        {!session ? (
          <div className="flex items-center justify-center">
            <FcGoogle fontSize={30} className="mr-2" />
            <span>Sign in with Google</span>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center" onClick={signOut}>
            <Image
              src={session?.user?.image as string}
              width="80"
              height="80"
              className="h-20 w-20 rounded-lg shadow-lg"
              alt={session?.user?.name as string}
              priority={true}	
            />
            <p className="mt-2">{session?.user?.name}</p>
          </div>
        )}
      </div>
    </div>
  )
}

export default Index;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await getSession(context);

  return {
    props: {
      session,
    },
  }
};
