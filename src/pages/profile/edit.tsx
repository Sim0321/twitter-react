import PostHeader from "components/posts/Header";
import { useState } from "react";
import { FiImage } from "react-icons/fi";

export default function ProfileEditPage() {
  const [displayName, setDisplayName] = useState<string>("");
  const [imageUrl, setImageUrl] = useState<string>("");
  const onChange = () => {};
  const handleFileUpload = () => {};
  const handleDeleteImage = () => {};
  return (
    <div className="post">
      <PostHeader />
      <form action="" className="post-form">
        <div className="post-form__profile">
          <input
            type="text"
            name="displayName"
            id=""
            className="post-form__input"
            placeholder="이름"
            onChange={onChange}
            value={displayName}
          />
          {imageUrl && (
            <div className="post-form__attachment">
              <img src={imageUrl} alt="attachment" width={100} height={100} />
              <button
                type="button"
                onClick={handleDeleteImage}
                className="post-form__clear-btn"
              >
                삭제
              </button>
            </div>
          )}

          <div className="post-form__submit-area">
            <div className="post-form__image-area">
              <label htmlFor="file-input" className="post-form__file">
                <FiImage className="post-form__file-icon" />
              </label>
            </div>
            <input
              type="file"
              name="file-input"
              id="file-input"
              accept="image/*"
              className="hidden"
              onChange={handleFileUpload}
            />
            <input
              type="submit"
              value="프로필 수정"
              className="post-form__submit-btn"
            />
          </div>
        </div>
      </form>
    </div>
  );
}
