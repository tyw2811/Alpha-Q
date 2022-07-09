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

  const getUserId = useCallback(async () => {
    return user.id;
  }, [user]);

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

  const getProfile = useCallback(async (userId) => {
    const { data, error } = await supabase
      .from("profiles")
      .select()
      .eq("id", userId)
      .single();
    if (error) {
      console.error("getProfile", error);
      return null;
    }

    const result = {
      username: data.username,
      avatarUrl: data.avatar_url,
    }

    return result;
  }, []);

  const createProfile = useCallback(async (userId, username) => {
    const { data, error } = await supabase
      .from("profiles")
      .insert({
        id: userId,
        username,
      })
      .single();
    if (error) throw error;

    const result = {
      username: data.username,
      avatarUrl: data.avatar_url,
    }
    return result;
  }, []);

  const postToForum = useCallback(async (input) => {
    console.log(input);
    const { data, error } = await supabase
      .from("posts")
      .insert({
        title: input.title,
        body: input.body,
        area: input.area,
        user_id: user.id,
        telegram: user.user_metadata.username
      })
      .single();
    if (error) throw error;

    return true;
  }, []);

  useEffect(() => {
    async function init() {
      if (user) {
        setLoading(true);

        let userProfile = await getProfile(user.id);
        if (!userProfile) {
          userProfile = await createProfile(
            user.id,
            user.user_metadata.username
          );
        }
        setProfile(userProfile);
        setLoading(false);
      } else {
        setProfile(null);
        setLoading(false);
      }
    }

    init();
  }, [user, createProfile, getProfile]);

  const value = {
    loading,
    profile,
    isAuth,
    handleSignup,
    handleSignin,
    handleSignout,
    getUserId,
    postToForum,
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
