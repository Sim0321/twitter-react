import PostForm from "components/posts/PostForm";
import PostBox from "components/posts/PostBox";

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
}

const posts: PostProps[] = [
  {
    id: "1",
    email: "test@test.com",
    content: "content 입니다.",
    createdAt: "2024-04-13",
    uid: "abc",
  },
  {
    id: "2",
    email: "test2@test.com",
    content: "content 입니다2.",
    createdAt: "2024-04-13",
    uid: "abc2",
  },
  {
    id: "3",
    email: "test3@test.com",
    content: "content 입니다3.",
    createdAt: "2024-04-13",
    uid: "abc3",
  },
  {
    id: "4",
    email: "test4@test.com",
    content: "content 입니다4.",
    createdAt: "2024-04-13",
    uid: "abc4",
  },
  {
    id: "5",
    email: "test4@test.com",
    content: "content 입니다5.",
    createdAt: "2024-04-13",
    uid: "abc5",
  },
  {
    id: "6",
    email: "test6@test.com",
    content: "content 입니다6.",
    createdAt: "2024-04-13",
    uid: "abc6",
  },
  {
    id: "7",
    email: "test7@test.com",
    content: "content 입니다7.",
    createdAt: "2024-04-13",
    uid: "abc7",
  },
];

export default function HomePage() {
  return (
    <div className="home">
      <div className="home__title">Home</div>
      <div className="home__tabs">
        <div className="home__tab home__tab--active">For You</div>
        <div className="home__tab">Following</div>
      </div>
      <PostForm />
      {/* tweet posts */}
      <div className="post">
        {posts?.map((post) => (
          <PostBox post={post} key={post.id} />
        ))}
      </div>
    </div>
  );
}
