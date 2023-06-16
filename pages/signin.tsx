import React from 'react';
import Image from 'next/image';
import type { GetServerSidePropsContext, InferGetServerSidePropsType } from "next";
import { getServerSession } from "next-auth/next";
import { getProviders, signIn } from 'next-auth/react';
import { authOptions } from './api/auth/[...nextauth]';

export default function SignIn({ providers }: InferGetServerSidePropsType<typeof getServerSideProps>) {
  return (
    <div className="relative flex h-screen w-screen items-center justify-center">
      <Image
        className="h-full w-full object-cover"
        width={0}
        height={0}
        sizes="100vw"
        src="https://cdn.pixabay.com/photo/2017/11/27/21/31/computer-2982270_960_720.jpg"
        alt="background-image"
      />
      <div className="absolute inset-0 flex h-full w-full items-center justify-center bg-[rgba(0,0,0,0.7)]">
        {providers && 
          Object.values(providers).map((provider) => (
            <div
              key={provider?.name}
              className="rounded-md border bg-[rgba(0,0,0,0.4)] px-4 py-2"
            >
              <button
                onClick={() => signIn(provider?.id)}
                className="font-semibold text-white"
              >
                Sign in with {provider?.name}
              </button>
            </div>
          ))}
      </div>
    </div>
  )
};

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const { req, res } = context;
  const session = await getServerSession(req, res, authOptions);
  
  if (session) {
    return { redirect: { destination: "/bookmarks" } };
  }

  const providers = await getProviders();
  
  return {
    props: { providers: providers ?? [] },
  }
}
