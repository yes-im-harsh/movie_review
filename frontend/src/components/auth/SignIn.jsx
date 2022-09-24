import React from "react";
import Container from "../Container";
import FormInput from "../form/FormInput";
import Submit from "../form/Submit";
import Title from "../form/Title";

const SignIn = () => {
  return (
    <div className="fixed inset-0 bg-primary -z-20 flex justify-center items-center">
      <Container>
        <form className="bg-secondary rounded p-6 space-y-6 w-72">
          <Title>Sign In</Title>
          <FormInput label="Email" placeholder="jhon@gmail.com" name="email" />
          <FormInput
            label="Password"
            placeholder="**********"
            name="password"
          />
          <Submit value="Sign In" />

          <div className="flex justify-between">
            <a
              href="#"
              className="text-dark-subtle hover:text-white transition"
            >
              Forget Password
            </a>
            <a
              href="#"
              className="text-dark-subtle hover:text-white transition"
            >
              Sign Up
            </a>
          </div>
        </form>
      </Container>
    </div>
  );
};

export default SignIn;
