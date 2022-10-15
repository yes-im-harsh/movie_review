import React from "react";
import { useAuth } from "../hooks";
import Container from "./Container";

const Home = () => {
  const { authInfo } = useAuth();
  console.log(authInfo);
  return (
    <Container>
      <p className="text-lg text-center bg-blue-50 p-2">
        It looks like you haven't verified your account,{" "}
        <button className="text-blue-500 font-semibold hover:underline">
          Click here to verify your account
        </button>
      </p>
    </Container>
  );
};

export default Home;
