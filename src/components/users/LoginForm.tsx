import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  GithubAuthProvider,
  GoogleAuthProvider,
  getAuth,
  signInWithEmailAndPassword,
  signInWithPopup,
} from "firebase/auth";
import { app } from "firebaseApp";
import { toast } from "react-toastify";
import useTranslation from "hooks/useTranslation";

export default function LoginForm() {
  const [error, setError] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const translation = useTranslation();

  const navigate = useNavigate();

  const onSubmit = async (e: any) => {
    e.preventDefault();

    try {
      const auth = getAuth(app);
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/");
      toast.success("성공적으로 로그인이 되었습니다.");
    } catch (error: any) {
      toast.error(error?.code);
    }
  };

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {
      target: { name, value },
    } = e;

    if (name === "email") {
      setEmail(value);
      const validRegex =
        /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

      if (!value.match(validRegex)) {
        setError("이메일 형식이 올바르지 않습니다.");
      } else {
        setError("");
      }
    }

    if (name === "password") {
      setPassword(value);

      if (value.length < 8) {
        setError("비밀번호는 8자리 이상 입력해주세요.");
      } else {
        setError("");
      }
    }
  };

  const onClickSocialLogin = async (e: any) => {
    const {
      target: { name },
    } = e;

    let provider;
    const auth = getAuth(app);

    if (name === "google") {
      provider = new GoogleAuthProvider();
    }

    if (name === "github") {
      provider = new GithubAuthProvider();
    }

    await signInWithPopup(
      auth,
      provider as GithubAuthProvider | GoogleAuthProvider
    )
      .then((result) => {
        toast.success("로그인 되었습니다.");
      })
      .catch((e) => {
        console.log(e);
        const errorMessage = e?.message;
        toast.error(errorMessage);
      });
  };

  return (
    <form className="form form--lg" onSubmit={onSubmit}>
      <div className="form__title">{translation("MENU_LOGIN")}</div>
      <div className="form__block">
        <label htmlFor="email">{translation("FORM_EMAIL")}</label>
        <input
          type="text"
          name="email"
          id="email"
          required
          value={email}
          onChange={onChange}
          autoComplete="off"
        />
      </div>
      <div className="form__block">
        <label htmlFor="password">{translation("FORM_PASSWORD")}</label>
        <input
          type="password"
          name="password"
          id="password"
          required
          value={password}
          onChange={onChange}
        />
      </div>

      {/* 유효성 검사 실패 시 */}
      {error && error?.length > 0 && (
        <div className="form__block">
          <div className="form__error">{error}</div>
        </div>
      )}

      <div className="form__block">
        {translation("NO_ACCOUNT")}
        <Link to="/users/signup" className="form__link">
          {translation("SIGNIN_LINK")}
        </Link>
      </div>
      <div className="form__block--lg">
        <button
          type="submit"
          className="form__btn--submit"
          disabled={error?.length > 0}
        >
          {translation("SIGNUP_LINK")}
        </button>
      </div>

      <div className="form__block">
        <button
          type="button"
          className="form__btn--google"
          onClick={onClickSocialLogin}
          name="google"
        >
          {translation("LOGIN_WITH_GOOGLE")}
        </button>
      </div>
      <div className="form__block">
        <button
          type="button"
          className="form__btn--github"
          onClick={onClickSocialLogin}
          name="github"
        >
          {translation("LOGIN_WITH_GITHUB")}
        </button>
      </div>
    </form>
  );
}
