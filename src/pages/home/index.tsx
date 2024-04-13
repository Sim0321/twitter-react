import { FiImage } from "react-icons/fi";
import { FaCircleUser, FaRegComment } from "react-icons/fa6";
import { Link } from "react-router-dom";
import { AiFillHeart } from "react-icons/ai";

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
  const handleFileUpload = () => {};
  const handleDelete = () => {};

  return (
    <div className="home">
      <div className="home__title">Home</div>
      <div className="home__tabs">
        <div className="home__tab home__tab--active">For You</div>
        <div className="home__tab">Following</div>
      </div>
      {/* post form */}
      <form className="post-form">
        <textarea
          className="post-form__textarea"
          name="content"
          id="content"
          required
          placeholder="What is happening?"
        />
        <div className="post-form__submit-area">
          <label htmlFor="file-input" className="post-form__file">
            <FiImage className="post-form__file-icon" />
          </label>
          <input
            type="file"
            name="file-input"
            id="file-input"
            accept="image/*"
            onChange={handleFileUpload}
            className="hidden"
          />
          <input
            type="submit"
            value="Tweet"
            className="post-form__submit-btn"
          />
        </div>
      </form>
      {/* tweet posts */}
      <div className="post">
        {posts?.map((post) => (
          <div className="post__box" key={post?.id}>
            <Link to={`/posts/${post.id}`}>
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
                  <div className="post__email">{post.email}</div>
                  <div className="post__createdAt">{post.createdAt}</div>
                </div>
                <div className="post__box-content">{post.content}</div>
              </div>
            </Link>
            <div className="post__box-footer">
              {/* post.uid === user.uid 일 때 */}
              <>
                <button
                  type="button"
                  className="post__delete"
                  onClick={handleDelete}
                >
                  Delete
                </button>
                <button type="button" className="post__edit">
                  <Link to={`/posts/edit/${post?.id}`}>Edit</Link>
                </button>
                <button
                  type="button"
                  className="post__likes"
                  onClick={handleDelete}
                >
                  <AiFillHeart />
                  {post?.likeCount || 0}
                </button>
                <button type="button" className="post__comments">
                  {post.comments?.length || 0}
                  <FaRegComment />
                </button>
              </>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
