import { useCallback, useEffect } from "react";
import { createContext, useContext, useState } from "react";
import { useAuthSession } from "./auth-session.provider";
import { supabase } from '../services/supabase.client'

const ForumContext = createContext({
  loading: false,
  roadmap: [],
  addSemester: ({ id, year, semester, modules = [] }) => {},
  getSemesters: () => [],
  getSemesterById: (id) => ({ id }),
  deleteSemesterById: (id) => ({ id }),
  setPropertyById: (id, propertyKey, propertyValue) => {},
  setYearById: (id, year) => {},
  setSemesterById: (id, semester) => {},
  setModulesById: (id, modules = []) => {},
  dragSemesters: (srcIndex, destIndex) => {},
  dragMods: (srcIndex, srcDroppableId, destIndex, destDroppableId) => {},
});

function ForumProvider({ children }) {
  const { isAuth } = useAuthSession();
  const [loading, setLoading] = useState(false);
 
  // const postToForum =  useCallback(async (input) => {
  //   try {
  //     const { data, status } = await supabase
  //           .from('posts')
  //           .insert({ 
  //               title: input.title,
  //               body: input.body,
  //               area: input.area,
  //               user_id: input.user_id,
  //           }, { returning: "minimal" });
  //       console.log(data);
  //       if (status !== 200) {
  //         throw new Error("Unable to post to forum");
  //       }
  //   } catch (error) {
  //     console.error(error);
  //   }
  // }, []);

  const postToForum = useCallback(async (input) => {
    console.log(input);
    const { data, error } = await supabase
      .from("posts")
      .insert({
        title: input.title,
        body: input.body,
        area: input.area,
        user_id: input.user_id,
      })
      .single();
    if (error) throw error;

    return true;
  }, []);

  const values = {
    postToForum,
  };

  return (
    <ForumContext.Provider value={values}>{children}</ForumContext.Provider>
  );
}

function useForum() {
  const context = useContext(ForumContext);
  if (!(context ?? false)) {
    throw new Error("useForum must be used within an RoadmapProvider");
  }

  return context;
}

export { ForumProvider, useForum };
