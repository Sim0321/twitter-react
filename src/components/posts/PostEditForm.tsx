import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "firebaseApp";
import { PostProps } from "pages/home";
import { useCallback, useEffect, useState } from "react";
import { FiImage } from "react-icons/fi";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";

export default function PostEditForm() {
  const [content, setContent] = useState<string>("");
  const navigate = useNavigate();
  const [post, setPost] = useState<PostProps | null>(null);
  const params = useParams();

  const [hashTag, setHashTag] = useState<string>("");
  const [tags, setTags] = useState<string[]>([]);
  console.log(tags);

  const handleFileUpload = () => {};

  const getPost = useCallback(async () => {
    if (params.id) {
      const docRef = doc(db, "posts", params.id);
      const docSnap = await getDoc(docRef);
      // fireStore에 따로 id가 없어서 params에서 id값을 추출후 id값 넣기
      setPost({ ...(docSnap.data() as PostProps), id: docSnap.id });
      setContent(docSnap.data()?.content);
      setTags(docSnap.data()?.hashTags);
    }
  }, [params.id]);

  const onSubmit = async (e: any) => {
    e.preventDefault();
    try {
      if (post) {
        const postRef = doc(db, "posts", post?.id);
        await updateDoc(postRef, {
          content: content,
          hashTags: tags,
        });
      }
      navigate(`/posts/${post?.id}`);
      toast.success("게시글을 수정했습니다.");
    } catch (e: any) {
      toast.error(e.code);
    }
  };

  const onChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const {
      target: { name, value },
    } = e;

    if (name === "content") {
      setContent(value);
    }
  };

  useEffect(() => {
    if (params.id) getPost();
  }, [getPost, params.id]);

  const handleKeyUp = (e: any) => {
    // keyCode32가 스페이스바
    if (e.keyCode === 32 && e.target.value.trim() !== "") {
      // 만약 같은 태그가 있다면 에러를 띄움.
      // 아니면 태그 생성
      if (tags?.includes(e.target.value.trim())) {
        toast.error("같은 태그가 있습니다.");
      } else {
        setTags((prev) => (prev?.length > 0 ? [...prev, hashTag] : [hashTag]));
        setHashTag("");
      }
    }
  };

  const onChangeHashTag = (e: React.ChangeEvent<HTMLInputElement>) => {
    setHashTag(e.target.value.trim());
  };

  const removeTag = (tag: string) => {
    setTags(tags?.filter((val) => val !== tag));
  };

  return (
    <form className="post-form" onSubmit={onSubmit}>
      <textarea
        className="post-form__textarea"
        name="content"
        id="content"
        required
        placeholder="What is happening?"
        onChange={onChange}
        value={content}
      />

      <div className="post-form__hashtags">
        <span className="post-form__hashtags-outputs">
          {tags?.map((tag, i) => (
            <span
              className="post-form__hashtags-tag"
              key={i}
              onClick={() => removeTag(tag)}
            >
              #{tag}
            </span>
          ))}
        </span>

        <input
          className="post-form__input"
          type="text"
          name="hashtag"
          id="hashtag"
          placeholder="해시태그 + 스페이스바 입력"
          onChange={onChangeHashTag}
          onKeyUp={handleKeyUp}
          value={hashTag}
        />
      </div>

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
        <input type="submit" value="수정" className="post-form__submit-btn" />
      </div>
    </form>
  );
}
