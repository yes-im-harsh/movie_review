import React from "react";
import { useSearchParams } from "react-router-dom";
import { commonModalClasses } from "../../utils/theme";
import Container from "../Container";
import FormContainer from "../form/FormContainer";
import FormInput from "../form/FormInput";
import Submit from "../form/Submit";
import Title from "../form/Title";

const ConfirmPassword = () => {
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");
  const id = searchParams.get("id");
  console.log(token, id);
  // http://localhost:3000/auth/reset-password?token=6bab0f8391dbb7cf34dbfb58c347a3b2d7683c536cd5d640d39f67f3e948&id=6349959b1f099e97fafbd261

  //To-do: isValid, isVerifying, !isValid

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
