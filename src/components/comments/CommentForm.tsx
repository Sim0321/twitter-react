import AuthContext from "context/AuthContext";
import {
  addDoc,
  arrayUnion,
  collection,
  doc,
  updateDoc,
} from "firebase/firestore";
import { db } from "firebaseApp";
import useTranslation from "hooks/useTranslation";
import { PostProps } from "pages/home";
import { useContext, useState } from "react";
import { toast } from "react-toastify";

export interface CommentFormProps {
  post: PostProps | null;
}

export default function CommentForm({ post }: CommentFormProps) {
  const [comment, setComment] = useState<string>("");
  const { user } = useContext(AuthContext);

  const translation = useTranslation();

  const truncate = (str: string) => {
    return str.length > 10 ? str.substring(0, 10) + "..." : str;
  };

  const onSubmit = async (e: any) => {
    e.preventDefault();

    if (post && user) {
      try {
        const postRef = doc(db, "posts", post?.id);

        const commentObj = {
          comment: comment,
          uid: user?.uid,
          email: user?.email,
          createdAt: new Date().toLocaleDateString("ko", {
            hour: "2-digit",
            minute: "2-digit",
            second: "2-digit",
          }),
        };

        await updateDoc(postRef, {
          comments: arrayUnion(commentObj),
        });

        // 댓글 생성 알림 만들기
        if (user?.uid !== post?.uid) {
          await addDoc(collection(db, "notifications"), {
            createdAt: new Date()?.toLocaleDateString("ko", {
              hour: "2-digit",
              minute: "2-digit",
              second: "2-digit",
            }),
            uid: post?.uid,
            isRead: false,
            url: `/posts/${post?.id}`,
            content: `"${truncate(post?.content)}" 글에 댓글이 작성되었습니다.`,
          });
        }

        toast.success("댓글을 생성했습니다.");
        setComment("");
      } catch (error) {
        console.log(error);
      }
    }
  };

  const onChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const {
      target: { name, value },
    } = e;

    if (name === "comment") {
      setComment(value);
    }
  };
  return (
    <form className="post-form" onSubmit={onSubmit}>
      <textarea
        name="comment"
        id="comment"
        className="post-form__textarea"
        required
        placeholder="What is happening?"
        onChange={onChange}
        value={comment}
      />
      <div className="post-form__submit-area">
        <div />
        <input
          type="submit"
          value={translation("BUTTON_COMMENT")}
          className="post-form__submit-btn"
          disabled={!comment}
        />
      </div>
    </form>
  );
}
