import AuthContext from "context/AuthContext";
import { arrayUnion, doc, setDoc } from "firebase/firestore";
import { db } from "firebaseApp";
import { PostProps } from "pages/home";
import { useContext } from "react";

interface FollowingProps {
  post: PostProps;
}

export default function FollowingBox({ post }: FollowingProps) {
  const { user } = useContext(AuthContext);

  const onClickFollow = async (e: any) => {
    e.preventDefault();

    try {
      if (user?.uid) {
        // 내가 주체가 되어 '팔로잉' 컬렉션 생성 or 업데이트
        const followingRef = doc(db, "following", user.uid);

        await setDoc(
          followingRef,
          {
            users: arrayUnion({ id: post?.uid }),
          },
          { merge: true }
        );

        // 팔로우 당하는 사람이 주체가 되어 '팔로우' 컬렉션 생성 or 업데이트
        const followerRef = doc(db, "follower", post.uid);

        await setDoc(
          followerRef,
          { users: arrayUnion({ id: user?.uid }) },
          { merge: true }
        );
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <button className="post__following-btn" onClick={onClickFollow}>
      Follow
    </button>
  );
}
