import PostForm from "components/posts/PostForm";
import PostBox from "components/posts/PostBox";
import { useCallback, useContext, useEffect, useState } from "react";
import {
  collection,
  query,
  onSnapshot,
  orderBy,
  doc,
  where,
} from "firebase/firestore";
import AuthContext from "context/AuthContext";
import { db } from "firebaseApp";
import { UserProps } from "components/following/FollowingBox";
import useTranslation from "hooks/useTranslation";

export interface PostProps {
  id: string;
  email: string;
  content: string;
  createdAt: string;
  uid: string;
  profileUrl?: string;
  likes?: string[];
  likeCount?: number;
  comments?: any;
  hashTags?: string[];
  imageUrl?: string;
}

type tabType = "all" | "following";

export default function HomePage() {
  const [posts, setPosts] = useState<PostProps[]>([]);
  const [followingPosts, setFollowingPosts] = useState<PostProps[]>([]);
  const [followingIds, setFollowingIds] = useState<string[]>([""]);
  const [activeTab, setActiveTab] = useState<tabType>("all");
  const { user } = useContext(AuthContext);

  const translation = useTranslation();

  // 실시간 동기화로 user의 팔로잉 id array 가져오기
  const getFollowingIds = useCallback(async () => {
    if (user?.uid) {
      const ref = doc(db, "following", user?.uid);
      onSnapshot(ref, (doc) => {
        setFollowingIds([""]);
        doc
          ?.data()
          ?.users?.map((user: UserProps) =>
            setFollowingIds((prev: string[]) =>
              prev ? [...prev, user?.id] : []
            )
          );
      });
    }
  }, [user?.uid]);

  useEffect(() => {
    if (user) {
      let postsRef = collection(db, "posts");
      let postsQuery = query(postsRef, orderBy("createdAt", "desc"));
      let followingQuery = query(
        postsRef,
        where("uid", "in", followingIds),
        orderBy("createdAt", "desc")
      );

      onSnapshot(postsQuery, (snapshot) => {
        let dataObj = snapshot.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        }));
        setPosts(dataObj as PostProps[]);
      });

      onSnapshot(followingQuery, (snapshot) => {
        let dataObj = snapshot.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        }));
        setFollowingPosts(dataObj as PostProps[]);
      });
    }
  }, [user, followingIds]);

  useEffect(() => {
    if (user?.uid) getFollowingIds();
  }, [getFollowingIds, user?.uid]);

  return (
    <div className="home">
      <div className="home__top">
        <div className="home__title">Home</div>
        <div className="home__tabs">
          <div
            className={`home__tab ${
              activeTab === "all" && "home__tab--active"
            }`}
            onClick={() => setActiveTab("all")}
          >
            {translation("TAB_ALL")}
          </div>
          <div
            className={`home__tab ${
              activeTab === "following" && "home__tab--active"
            }`}
            onClick={() => setActiveTab("following")}
          >
            {translation("TAB_FOLLOWING")}
          </div>
        </div>
      </div>
      <PostForm />

      {/* tweet posts */}
      {activeTab === "all" && (
        <div className="post">
          {posts?.length > 0 ? (
            posts?.map((post) => <PostBox post={post} key={post.id} />)
          ) : (
            <div className="post__no-posts">
              <div className="post__text">{translation("NO_POSTS")}</div>
            </div>
          )}
        </div>
      )}

      {activeTab === "following" && (
        <div className="post">
          {followingPosts?.length > 0 ? (
            followingPosts?.map((post) => <PostBox post={post} key={post.id} />)
          ) : (
            <div className="post__no-posts">
              <div className="post__text">{translation("NO_POSTS")}</div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
