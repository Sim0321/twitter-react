import Router from "pages/components/Router";
import { Layout } from "pages/components/Layout";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { app } from "firebaseApp";
import { useState, useEffect } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  const auth = getAuth(app);

  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(
    !!auth?.currentUser
  ); // currentUser 초기값은 null이라 true,false로 로그인 상태인지 로그아웃 상태인지 판별하기 위함

  const [init, setInit] = useState<boolean>(false);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setIsAuthenticated(true);
      } else {
        setIsAuthenticated(false);
      }
      setInit(true);
    });
  }, [auth]);

  return (
    <Layout>
      <ToastContainer />
      {init ? (
        <>
          <Router isAuthenticated={isAuthenticated} />
        </>
      ) : (
        "loading"
      )}
    </Layout>
  );
}

export default App;
