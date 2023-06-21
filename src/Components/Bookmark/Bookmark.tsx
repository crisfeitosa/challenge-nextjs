import Image from 'next/image';
import Link from 'next/link';
import { ITagOption } from '../../utils/tagsOptions';
import { RiDeleteBin6Line } from 'react-icons/ri';

export interface IBookmark {
  id: string;
  title: string;
  link: string;
  tags: ITagOption[];
}

interface BookmarkProps {
  bookmark: IBookmark;
  deleteBookmark: (id: string) => void;
}

const Bookmark = ({ bookmark, deleteBookmark }: BookmarkProps) => {
  return (
    <div className='flex flex-col rounded border-solid border-2 border-sky-500 mb-4'>
      <Link className='flex flex-col mb-4' href={bookmark.link}>
        <div className='flex flex-row mb-4'>
          <Image
            src={`https://www.google.com/s2/favicons?domain=${bookmark.link}`}
            alt={bookmark.title}
            width={24}
            height={24}
            className="mr-2"
          />
          <span>
            {bookmark.title}
          </span>
        </div>
        <div className='flex'>
          {bookmark.tags.map(tag => (
            <span className='bg-gray-900 text-white px-4 mr-2' key={tag.value}>
              {tag.label}
            </span>
          ))}
        </div>
      </Link>

      <RiDeleteBin6Line
        onClick={() => deleteBookmark(bookmark.id)}
      />
    </div>
  );
}

export default Bookmark;
