import React from "react";
import Container from "../Container";
import FormInput from "../form/FormInput";
import Submit from "../form/Submit";
import Title from "../form/Title";

const ConfirmPassword = () => {
  return (
    <div className="fixed inset-0 bg-primary -z-20 flex justify-center items-center">
      <Container>
        <form className="bg-secondary rounded p-6 space-y-6 w-96">
          <Title>Enter New Password</Title>
          <FormInput
            label="New Password"
            placeholder="********"
            name="password"
            type="password"
          />
          <FormInput
            label="Confirm Password"
            placeholder="********"
            name="confirmPassword"
            type="password"
          />

          <Submit value="Send Link" />
        </form>
      </Container>
    </div>
  );
};

export default ConfirmPassword;
