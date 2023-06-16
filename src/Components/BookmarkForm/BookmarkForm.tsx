import React, { useState } from "react";
import { FcPlus } from 'react-icons/fc';
import { v4 as uuidv4 } from 'uuid';

interface IBookmark {
  id: string;
  title: string;
  link: string;
}

interface IBookmarkFormProps {
  addBookmark: (arg0: IBookmark) => void;
}

const BookmarkForm = ({ addBookmark }: IBookmarkFormProps) => {
  const [title, setTitle] = useState('');
  const [link, setLink] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addBookmark({ id: uuidv4(), title, link })
    setTitle('');
    setLink('');
  }

  return (
    <div className="flex items-center justify-cente p-4">
      <form className="space-y-6" action="#" onSubmit={handleSubmit}>
        <div className="flex flex-col pb-2">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="bmTitle">
            Title
          </label>
          <input
            id="bmTitle"
            type="text"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            onChange={e => setTitle(e.target.value)}
            value={title}
          />
        </div>
        <div className="flex flex-col mb-2">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="bmLink">
            URL
          </label>
          <input
            id="bmLink"
            type="text"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            onChange={e => setLink(e.target.value)}
            value={link}
          />
        </div>
        <button
            type="submit"
            className="flex items-center rounded-md px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
          >
            <FcPlus fontSize={30} className="mr-2" />
            Add Bookmark
          </button>
      </form>
    </div>
  );
}

export default React.memo(BookmarkForm);
