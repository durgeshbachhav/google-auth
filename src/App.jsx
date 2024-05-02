import React, { useState, useEffect } from "react";
import { account } from "./appwrite/appwriteconfige";

const App = () => {
  const [loggedInUser, setLoggedInUser] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const user = await account.get();
        console.log(user);
        setLoggedInUser(user);
      } catch (error) {
        console.error("Error fetching user:", error);
      }
    };

    fetchData();
  }, []);

  const handleLoginWithGoogle = async () => {
    try {
      await account.createOAuth2Session(
        "google",
        "http://localhost:5173",
        "http://localhost:5173/fail"
      );
      const user = await account.get();
      setLoggedInUser(user);
      console.log(loggedInUser);
    } catch (error) {
      console.error("Error logging in with Google:", error);
    }
  };

  return (
    <div>
      <p>
        {loggedInUser ? `Logged in as ${loggedInUser.name}` : "Not logged in"}
      </p>
      <button
        type="button"
        onClick={async () => {
          await account.deleteSession("current");
          setLoggedInUser(null);
        }}
      >
        Logout
      </button>
      <button type="button" onClick={handleLoginWithGoogle}>
        Login with Google
      </button>
    </div>
  );
};

export default App;
