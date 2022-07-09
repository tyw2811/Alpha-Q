import { Route, Routes } from "react-router-dom";
import { pages } from "./Pages";

/**
 * A router component for page navigation.
 *
 * @returns A router component.
 */
export default function Router() {
  return (
    <Routes>
      {pages.map((page) => {
        if (page.path && page.content) {
          return (
            <Route key={page.key} path={page.path} element={page.content} />
          );
        }
        return null;
      })}
    </Routes>
  );
}
