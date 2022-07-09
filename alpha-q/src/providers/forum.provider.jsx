import { useCallback, useEffect } from "react";
import { createContext, useContext, useState } from "react";
import { useAuthSession } from "../auth-session.provider";
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
 
  const post = async (req, res) => {
    const { title, body, area, telegram } = req.body;
    
    try {
      const { status } = await supabase
        .from('posts')
        .insert({ 
          title: title,
          body: body,
          area: area,
          telegram: telegram,
        })
        if (status !== 200) {
          throw new Error("Unable to post to forum");
        }
    } catch (error) {
      console.error(error);
    }
  }

  const values = {
    post,
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
