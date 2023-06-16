import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import type { GetServerSideProps, NextPage } from 'next';
import { signOut, useSession, getSession } from 'next-auth/react';
import Image from 'next/image';
import BookmarkList from '../src/Components/BookmarkList/BookmarkList';
import BookmarkForm from '../src/Components/BookmarkForm/BookmarkForm';

interface IBookmark {
  id: string;
  title: string;
  link: string;
}

const Bookmarks: NextPage = () => {
  const { data: session } = useSession();
  const router = useRouter();
  const [bookmarks, setBookmarks] = useState<IBookmark[]>([]);

  const addBookmark = (bookmark: IBookmark) => {
    setBookmarks(prevBookmarks => [
      ...prevBookmarks,
      {
        id: bookmark.id,
        title: bookmark.title,
        link: bookmark.link,
      }
    ]);
  }

  const deleteBookmark = (id: string) => {
    setBookmarks(prevBookmarks =>
      prevBookmarks.filter(bookmark => bookmark.id !== id));
  }

  const logOutAccount = () => {
    signOut
    router.push('/signin')
  }

  useEffect(() => {
    const json = localStorage.getItem('bookmarks');
    const loadedBookmarks = JSON.parse(json!);
    if (loadedBookmarks) {
      setBookmarks(loadedBookmarks)
    }
  }, []);

  useEffect(() => {
    const json = JSON.stringify(bookmarks);
    localStorage.setItem('bookmarks', json);
  }, [bookmarks]);

  if (!session) {
    return (
      <div>
        <p>Access Denied</p>
      </div>
  )}

  return (
    <>
      <div className="flex flex-col space-y-4 w-100 mx-auto p-4 bg-gray-100">
        <div className='flex items-center'>
          <Image
            src={session?.user?.image as string}
            width="32"
            height="32"
            className="h-8 w-8 rounded-full shadow-lg mr-2"
            alt={session?.user?.name as string}
            priority={true}	
          />
          <h1 className='font-semibold'>Welcome {session?.user?.name.split(' ')[0]}</h1>
        </div>
        <p>All bookmarks: {bookmarks.length}</p>
      </div>
      <div className="flex flex-col h-screen w-screen bg-gray-900 py-8 px-4">
          <div
            className="flex flex-col h-auto w-11/12 mx-auto rounded-md border border-gray-300 p-4 bg-gray-100 mb-8"
          >
          <BookmarkForm
            addBookmark={addBookmark}
          />
        </div>
        <div
          className="flex flex-col h-auto w-11/12 mx-auto rounded-md border border-gray-300 p-4 bg-gray-100"
        >
          <BookmarkList
            bookmarks={bookmarks}
            deleteBookmark={deleteBookmark}
          />
        </div>
      </div>
    </>
  )
}

export default Bookmarks;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await getSession(context);

  return {
    props: {
      session,
    },
  }
};

