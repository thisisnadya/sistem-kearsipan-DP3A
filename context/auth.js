import Loading from "@/components/Loading";
import { Authentication } from "@/lib/firebase";
import { useUser, initialUserState } from "./user";
import { useEffect, useState } from "react";

const AuthStateChangeProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(true);
  const user = useUser();
  const { SetUser } = user;

  const InitiateAuthStateChange = () => {
    Authentication().onAuthStateChanged((user) => {
      if (user) {
        console.log("User authenticated");
        // console.log(user);
        SetUser({ email: user.email, uid: user.uid });
      } else {
        console.log("user unauthenticated");
        SetUser(initialUserState);
      }
      setIsLoading(false);
    });
  };

  useEffect(() => {
    InitiateAuthStateChange();
  }, []);

  if (isLoading) {
    return <Loading />;
  }

  return children;
};

export default AuthStateChangeProvider;
