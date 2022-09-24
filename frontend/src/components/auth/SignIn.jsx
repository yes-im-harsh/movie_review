import React from "react";
import Container from "../Container";

const SignIn = () => {
  return (
    <div className="fixed inset-0 bg-primary -z-20 flex justify-center items-center">
      <Container>
        <form className="bg-secondary rounded p-6 w-72">
          <h1 className="text-xl font-semibold text-white text-center">
            Sign In
          </h1>
          <div className="flex flex-col-reverse">
            {/* <label className="font-semibold text-dark-subtle" htmlFor="email">Email</label> */}
            <input
              type="text"
              id="email"
              className="bg-transparent rounded border-2 border-dark-subtle focus:border-white w-full text-lg outline-none p-1 text-white peer transition"
              placeholder="jhon@gmail.com"
            />
            <label
              className="font-semibold text-dark-subtle peer-focus:text-white transition self-start"
              htmlFor="email"
            >
              Email
            </label>
          </div>
        </form>
      </Container>
    </div>
  );
};

export default SignIn;
