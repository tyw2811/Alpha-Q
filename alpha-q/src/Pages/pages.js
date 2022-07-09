import Landing from "./Landing";
import Forum from "./Forum";
import SignUp from "./SignUp";
import Map from "./Map";
import Login from "./Login";
import ImageUpload from "./ImageUpload";

const pages = [
  {
    key: "forum",
    path: "/forum",
    content: <Forum />,
  },
  {
    key: "signup",
    path: "/signup",
    content: <SignUp />,
  },
  {
    key: "landing",
    path: "/",
    content: <Landing />,
  },
  {
    key: "map",
    path: "/map",
    content: <Map />,
  },
  {
    key: "login",
    path: "/login",
    content: <Login />,
  },
  {
    key: "imageupload",
    path: "/imageupload",
    content: <ImageUpload />,
  },
];

export default pages;
