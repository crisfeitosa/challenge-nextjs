import React, { useState } from "react";
import Select from "react-select";
import { FcPlus } from 'react-icons/fc';
import { v4 as uuidv4 } from 'uuid';
import { ITagOption, tagsOptions } from "../../utils/tagsOptions";

export interface IBookmark {
  id: string;
  title: string;
  link: string;
  tags: ITagOption[];
}

interface IBookmarkFormProps {
  addBookmark: (arg0: IBookmark) => void;
}

const BookmarkForm = ({ addBookmark }: IBookmarkFormProps) => {
  const [title, setTitle] = useState('');
  const [link, setLink] = useState('');
  const [tags, setTags] = useState<ITagOption[]>([]);
  const isDisabled = title.length < 1 || link.length < 1 || !tags.length
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
  
    addBookmark({ id: uuidv4(), title, link, tags })
    setTitle('');
    setLink('');
    setTags([]);
  }

  return (
    <div className="flex items-center justify-cente p-4">
      <form className="container" action="#" onSubmit={handleSubmit}>
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
        <div className="flex flex-col mb-4">
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
        <div className="flex mx-auto mt-4">
          <Select
            defaultValue={tags}
            onChange={(tag) => setTags(tag)}
            value={tags}
            isMulti
            name="tags"
            id="tags"
            instanceId="tags"
            options={tagsOptions}
            className="lg:w-1/2 w-full"
            classNamePrefix="select"
          />
        </div>
        <div className="border px-4 py-2 bg-gray-900 rounded">
          <button
            type="submit"
            disabled={isDisabled}
            className="flex items-center justify-center px-8 p-3 text-white "
          >
            <FcPlus fontSize={30} className="mr-2" />
              Add Bookmark
          </button>
        </div>
      </form>
    </div>
  );
}

export default React.memo(BookmarkForm);
