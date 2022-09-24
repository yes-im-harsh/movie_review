import React from "react";
import SignIn from "./components/auth/SignIn";
import Navbar from "./components/user/Navbar";

const App = () => {
  return (
    <>
      <Navbar />
      <SignIn />
    </>
  );
};

export default App;
