import { FaCircleUser, FaRegComment } from "react-icons/fa6";
import { Link, useNavigate } from "react-router-dom";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import { PostProps } from "pages/home";
import { useContext } from "react";
import AuthContext from "context/AuthContext";
import {
  arrayRemove,
  arrayUnion,
  deleteDoc,
  doc,
  updateDoc,
} from "firebase/firestore";
import { db, storage } from "firebaseApp";
import { toast } from "react-toastify";
import { deleteObject, ref } from "firebase/storage";
import FollowingBox from "components/following/FollowingBox";
import useTranslation from "hooks/useTranslation";

interface PostBoxProps {
  post: PostProps;
}

export default function PostBox({ post }: PostBoxProps) {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const imageRef = ref(storage, post.imageUrl);

  const translation = useTranslation();

  const handleDelete = async () => {
    const confirm = window.confirm("해당 게시글을 삭제하시겠습니까?");
    if (confirm) {
      // 스토리지 이미지 먼저 삭제
      if (post.imageUrl) {
        deleteObject(imageRef).catch((error) => {
          console.log(error);
        });
      }

      await deleteDoc(doc(db, "posts", post.id));
      toast.success("게시글을 삭제했습니다.");
      navigate("/");
    }
  };

  const toggleLike = async () => {
    const postRef = doc(db, "posts", post.id);

    // 이미 좋아요인 경우 -> 좋아요 취소
    if (user?.uid && post?.likes?.includes(user?.uid)) {
      await updateDoc(postRef, {
        likes: arrayRemove(user?.uid),
        likeCount: post?.likeCount ? post?.likeCount - 1 : 0,
      });
    } else {
      // 좋아요가 아닌 경우 -> 좋아요 추가
      await updateDoc(postRef, {
        likes: arrayUnion(user?.uid),
        likeCount: post?.likeCount ? post?.likeCount + 1 : 1,
      });
    }
  };

  return (
    <div className="post__box">
      <div className="post__box-profile">
        <div className="post__flex">
          {post?.profileUrl ? (
            <img
              src={post.profileUrl}
              alt="profile"
              className="post__box-profile-img"
            />
          ) : (
            <FaCircleUser className="post__box-profile-icon" />
          )}
          <div className="post__flex--between">
            <div className="post__flex">
              <div className="post__email">{post.email}</div>
              <div className="post__createdAt">{post.createdAt}</div>
            </div>
            <FollowingBox post={post} />
          </div>
        </div>
        <Link to={`/posts/${post.id}`}>
          <div className="post__box-content">{post.content}</div>
          {post.imageUrl && (
            <div className="post__image-div">
              <img
                className="post__image"
                src={post?.imageUrl}
                alt="post img"
                width={100}
                height={100}
              />
            </div>
          )}
          <div className="post-form__hashtags-outputs">
            {post?.hashTags?.map((tag, i) => (
              <span className="post-form__hashtags-tag" key={i}>
                #{tag}
              </span>
            ))}
          </div>
        </Link>
      </div>
      <div className="post__box-footer">
        {user?.uid === post?.uid && (
          <>
            <button
              type="button"
              className="post__delete"
              onClick={handleDelete}
            >
              {translation("BUTTON_DELETE")}
            </button>
            <button type="button" className="post__edit">
              <Link to={`/posts/edit/${post?.id}`}>
                {translation("BUTTON_EDIT")}
              </Link>
            </button>
          </>
        )}

        <button type="button" className="post__likes" onClick={toggleLike}>
          {user && post?.likes?.includes(user.uid) ? (
            <AiFillHeart />
          ) : (
            <AiOutlineHeart />
          )}
          {post?.likeCount || 0}
        </button>
        <button type="button" className="post__comments">
          <FaRegComment />
          {post.comments?.length || 0}
        </button>
      </div>
    </div>
  );
}
