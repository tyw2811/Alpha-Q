import Landing from "./Landing";
import Forum from "./Forum";
import SignUp from "./SignUp";

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
];

export default pages;
