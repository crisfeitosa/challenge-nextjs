import React, { useEffect, useState } from 'react';
import type { NextPage } from 'next';
import Image from 'next/image';
import { collection, onSnapshot, query, where } from "firebase/firestore";
import BookmarkList from '../src/Components/BookmarkList/BookmarkList';
import BookmarkForm from '../src/Components/BookmarkForm/BookmarkForm';
import useAuth from '../hooks/useAuth';
import { addBookmark, deleteBookmark } from "../api/bookmarks";
import { db } from '../firebase.config';
import { IBookmark } from '../src/Components/Bookmark/Bookmark';
import { ITagOption, tagsOptions } from '../src/utils/tagsOptions';

const Bookmarks: NextPage = () => {
  const { isLoggedIn, user } = useAuth();
  const [bookmarks, setBookmarks] = useState<IBookmark[]>([]);

  function handleFilter(event: Event) {
    const selectedTag = (event.target as HTMLInputElement).value;

    if (!selectedTag) {
      return refreshData();
    }

    const filteredBookmarks: IBookmark[] = [];

    bookmarks.forEach(bookmark => { 
      bookmark.tags.map(tag => {
        if((tag.value).includes(selectedTag)) {
          return filteredBookmarks.push(bookmark);
        }
      })
    });

    setBookmarks(filteredBookmarks);
 }

  const refreshData = () => {
    if (!user) {
      setBookmarks([]);
      return;
    }
    const q = query(collection(db, "bookmarks"), where("userId", "==", user.email));

    onSnapshot(q, (querySnapshot) => {
      let bookmarksList: IBookmark[] = []

      querySnapshot.docs.forEach((doc) => {
        const newBookmarks: IBookmark = {
          id: doc.id,
          title: doc.data().title,
          link: doc.data().link,
          tags: doc.data().tags,
        };

        bookmarksList.push(newBookmarks);
      });

      setBookmarks(bookmarksList);
    });
  };

  useEffect(() => {
    refreshData();
  }, [user]);

  const handleBookmarkCreate = async (bookmark: IBookmark) => {
    const { id, title, link, tags } = bookmark;

    if (!isLoggedIn) {
      return;
    }

    const newBookmark = {
      id,
      title,
      link,
      tags,
      userId: user.email,
    };
    await addBookmark(newBookmark);
  };

  const handleBookmarkDelete = async (id: string) => {
    if (confirm("Are you sure you wanna delete this bookmark?")) {
      deleteBookmark(id);
    }
  };

  return (
    <>
      <div className="flex flex-col space-y-4 w-100 mx-auto p-4 bg-gray-100">
        <div className="flex flex-col">
          <div className='flex items-center mb-4'>
            <Image
              src={user?.photoURL as string}
              width="32"
              height="32"
              className="h-8 w-8 rounded-full shadow-lg mr-2"
              alt={user?.displayName as string}
              priority={true}	
            />
            <h1 className='font-semibold'>Welcome {user && user.displayName.split(' ')[0]}</h1>
          </div>
          <p>All bookmarks: {bookmarks.length}</p>
        </div>
        <div>
        
        <div>Filter by Tag:</div>
          <div>
            <select
              name="tag-list"
              id="tag-list"
              onChange={handleFilter}
            >
              <option value="">All</option>
              {tagsOptions &&
                tagsOptions.map(({ value, label }: ITagOption) => (
                <option key={value} value={value}>
                  {label}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>
      <div className="flex flex-col w-screen bg-gray-900 py-8 px-4">
        <div
          className="flex flex-col h-auto w-11/12 mx-auto rounded-md border border-gray-300 p-4 bg-gray-100 mb-8"
        >
          <BookmarkForm
            addBookmark={handleBookmarkCreate}
          />
        </div>
        <div
          className="flex flex-col h-auto w-11/12 mx-auto rounded-md border border-gray-300 p-4 bg-gray-100"
        >
          <BookmarkList
            bookmarks={bookmarks}
            deleteBookmark={handleBookmarkDelete}
          />
        </div>
      </div>
    </>
  )
}

export default Bookmarks;
