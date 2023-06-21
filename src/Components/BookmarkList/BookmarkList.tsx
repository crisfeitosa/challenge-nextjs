import Bookmark, { IBookmark } from '../Bookmark/Bookmark';

interface IBookmarkListProps {
  bookmarks: IBookmark[];
  deleteBookmark: (id: string) => void;
}

const BookmarkList = ({ bookmarks, deleteBookmark }: IBookmarkListProps) => {
  return (
    <section>
        <h3 className='font-semibold mb-4'>Bookmarks</h3>
      <div className='flex flex-col mt-6'>
        {bookmarks &&
          bookmarks.map(bookmark => (
            <Bookmark
              key={bookmark.id}
              bookmark={bookmark}
              deleteBookmark={deleteBookmark}
            />
          ))
        }
      </div>
    </section>
  );
}

export default BookmarkList;