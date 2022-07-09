import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import {supabase} from "../services/supabase.client";

const AuthSessionContext = createContext({
  loading: false,
  isAuth: () => false,
  handleSignup: async ({ username, email, password }) => {},
  handleSignin: async ({ email, password }) => {},
  handleSignout: async () => {},
});

function AuthSessionProvider({ children }) {
  const [loading, setLoading] = useState(false);
  const [authEvent, setAuthEvent] = useState(null);
  const [user, setUser] = useState(supabase.auth.user());
  const [profile, setProfile] = useState(null);
  const [aud, setAud] = useState(false);

  useEffect(() => {
    const newAud = !!user;
    setAud(newAud);
  }, [aud, user]);

  const isAuth = useCallback(() => aud, [aud]);

  const getUser = useCallback(async () => {
    return user;
  }, []);

  const handleSignup = async ({ username, email, password }) => {
    const { error } = await supabase.auth.signUp(
      {
        email,
        password,
      },
      { data: { username } }
    );
    if (error) throw error;
  };

  const handleSignin = async ({ email, password }) => {
    const { error } = await supabase.auth.signIn({
      email,
      password,
    });
    if (error) {
      throw error;
    } else {
      setAud(true);
    }
  };

  const handleSignout = useCallback(async () => {
    await supabase.auth.signOut();
  }, []);

  useEffect(() => {
    supabase.auth.onAuthStateChange((event, session) => {
      setAuthEvent(event);
      setUser(supabase.auth.user());
    });
  }, []);

  const value = {
    loading,
    profile,
    isAuth,
    handleSignup,
    handleSignin,
    handleSignout,
    getUser,
  };

  return (
    <AuthSessionContext.Provider value={value}>
      {children}
    </AuthSessionContext.Provider>
  );
}

function useAuthSession() {
  const context = useContext(AuthSessionContext);
  if (!(context ?? false)) {
    throw new Error(
      "useAuthSession must be used within an AuthSessionProvider"
    );
  }

  return context;
}

export { AuthSessionProvider, useAuthSession };
