import { db } from "../firebase.config";
import {
  collection,
  addDoc,
  updateDoc,
  doc,
  deleteDoc,
} from "firebase/firestore";
import { IBookmark } from "../src/Components/Bookmark/Bookmark";

interface IAddBookmarkPros extends IBookmark {
  userId: string;
}

const addBookmark = async ({ userId, title, link, id, tags }: IAddBookmarkPros) => {
  try {
    await addDoc(collection(db, "bookmarks"), {
      userId,
      title,
      link,
      id,
      tags,
      createdAt: new Date().getTime(),
    });
  } catch (err) {}
};

const editBookmark = async ({ id, title, link, tags }: IBookmark) => {
  try {
    const bookmarkRef = doc(db, "bookmarks", id);
    await updateDoc(bookmarkRef, {
      title,
      link,
      tags,
    });
  } catch (err) {
    console.log(err);
  }
};

const deleteBookmark = async (id: string) => {
  try {
    const bookmarkRef = doc(db, "bookmarks", id);
    await deleteDoc(bookmarkRef);
  } catch (err) {
    console.log(err);
  }
};


export { addBookmark, editBookmark, deleteBookmark };