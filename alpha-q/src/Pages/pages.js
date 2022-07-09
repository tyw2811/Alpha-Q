import Landing from "./Landing";
import Forum from "./Forum";
import SignUp from "./SignUp";
import Map from "./Map";


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
];

export default pages;
