import React from "react";
import Container from "../Container";
import FormInput from "../form/FormInput";
import Submit from "../form/Submit";
import Title from "../form/Title";

const SignUp = () => {
  return (
    <div className="fixed inset-0 bg-primary -z-20 flex justify-center items-center">
      <Container>
        <form className="bg-secondary rounded p-6 space-y-6 w-72">
          <Title>Sign Up</Title>
          <FormInput label="Name" placeholder="John Doe" name="name" />
          <FormInput label="Email" placeholder="jhon@gmail.com" name="email" />
          <FormInput
            label="Password"
            placeholder="**********"
            name="password"
          />
          <Submit value="Sign Up" />

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
              Sign In?
            </a>
          </div>
        </form>
      </Container>
    </div>
  );
};

export default SignUp;
