import Router from "pages/components/Router";
import { Layout } from "pages/components/Layout";

import { getAuth } from "firebase/auth";
import { app } from "firebaseApp";
import { useState } from "react";

function App() {
  const auth = getAuth(app);

  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(
    !!auth?.currentUser
  ); // currentUser 초기값은 null이라 true,false로 로그인 상태인지 로그아웃 상태인지 판별하기 위함

  return (
    <Layout>
      <Router />
    </Layout>
  );
}

export default App;
