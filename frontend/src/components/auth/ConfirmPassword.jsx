import React from "react";
import { useState } from "react";
import { ImSpinner10 } from "react-icons/im";
import { useSearchParams } from "react-router-dom";
import { commonModalClasses } from "../../utils/theme";
import Container from "../Container";
import FormContainer from "../form/FormContainer";
import FormInput from "../form/FormInput";
import Submit from "../form/Submit";
import Title from "../form/Title";

const ConfirmPassword = () => {
  const [isVerifying, setIsVerifying] = useState(true);
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");
  const id = searchParams.get("id");
  console.log(token, id);
  // http://localhost:3000/auth/reset-password?token=6bab0f8391dbb7cf34dbfb58c347a3b2d7683c536cd5d640d39f67f3e948&id=6349959b1f099e97fafbd261

  //To-do: isValid, !isValid

  if (isVerifying) {
    return (
      <FormContainer>
        <Container>
          <div className="flex space-x-2 items-center">
            <h1 className="text-4xl font-semibold dark:text-white text-primary">
              Wait! Token Verifying
            </h1>
            <ImSpinner10 className="animate-spin text-4xl dark:text-white text-primary" />
          </div>
        </Container>
      </FormContainer>
    );
  }

  return (
    <FormContainer>
      <Container>
        <form className={commonModalClasses + " w-96"}>
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
    </FormContainer>
  );
};

export default ConfirmPassword;
