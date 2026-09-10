import { createBrowserRouter } from "react-router";
import App , { loader as appLoader } from "@/App";

// 各ページコンポーネントのインポート
import Login, { action as loginAction } from "@/pages/Login";
import { action as logoutAction } from "@/pages/Logout";
import Preregister, { action as preregisterAction } from "@/pages/Register/Preregister";
import PreregisterComplete from "@/pages/Register/PreregisterComplete";
import Register, { loader as registerLoader, action as registerAction } from "@/pages/Register/Register";
import RegisterComplete, { loader as registerCompleteLoader} from "@/pages/Register/RegisterComplete";
import { loader as emailVerifyLoader } from "@/pages/Register/EmailVerify";
import PostList, { loader as postListLoader } from "@/pages/Post/PostList";
import PostCreate, { action as postCreateAction } from "@/pages/Post/PostCreate";
import Post, { action as postAction, loader as postLoader } from "@/pages/Post/Post";
import PostEdit, { action as postEditAction, loader as postEditLoader } from "@/pages/Post/PostEdit";
// import ErrorPage from "./pages/ErrorPage";
// import NotFoundPage from "./pages/NotFoundPage";

// ルーティング定義をオブジェクトの配列として作成
export const router = createBrowserRouter([
  {
    path: "/",
    Component: App,
    loader: appLoader,
    // shouldRevalidate: appShouldRevalidate,
    // errorElement: <ErrorPage />,
    children: [
      { index: true, Component: Login, action: loginAction, id: "login" },
      { path: "logout", action: logoutAction, id: "logout" },
      { path: "preregister", Component: Preregister, action: preregisterAction, id: "preregister" },
      { path: "preregister_complete", Component: PreregisterComplete, id: "preregister_complete" },
      { path: "verify", loader: emailVerifyLoader, id: "email_verify" },
      { path: "register", Component: Register, loader: registerLoader, action: registerAction, id: "register" },
      { path: "register_complete", Component: RegisterComplete, loader: registerCompleteLoader, id: "register_complete" },
      { path: "posts", Component: PostList, loader:postListLoader, id: "posts" },
      { path: "posts/create", Component: PostCreate, action:postCreateAction, id: "post_create" },
      { path: "posts/:postId", Component: Post, action:postAction, loader:postLoader, id: "post" },
      { path: "posts/:postId/edit", Component: PostEdit, action:postEditAction, loader:postEditLoader, id: "post_edit" },
      // { path: "*", Component: NotFoundPage },
    ],
  },
]);
