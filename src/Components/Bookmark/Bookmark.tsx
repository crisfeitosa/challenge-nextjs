import Image from 'next/image';
import Link from 'next/link';
import { RiDeleteBin6Line } from 'react-icons/ri';

interface IBookmark {
  id: string;
  title: string;
  link: string;
}

interface BookmarkProps {
  bookmark: IBookmark;
  deleteBookmark: (id: string) => void;
}

const Bookmark = ({ bookmark, deleteBookmark }: BookmarkProps) => {
  return (
    <div className='flex flex-col rounded border-solid border-2 border-sky-500 mb-4'>
      <Link className='flex mb-4' href={bookmark.link}>
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
      </Link>
      <RiDeleteBin6Line
        onClick={() => deleteBookmark(bookmark.id)}
      />
    </div>
  );
}

export default Bookmark;
