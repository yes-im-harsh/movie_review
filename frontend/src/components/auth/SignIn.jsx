import React from "react";
import Container from "../Container";
import FormInput from "../form/FormInput";
import Submit from "../form/Submit";
import Title from "../form/Title";
import CustomLink from "../CustomLink";
// import { useContext } from "react";
// import { ThemeContext } from "../../context/themeProvider";
import { useTheme } from "../../hooks";
import { commonModalClasses } from "../../utils/theme";
import FormContainer from "../form/FormContainer";

const SignIn = () => {
  // const theme = useContext(ThemeContext);
  // console.log(theme.method());

  const { toggleTheme } = useTheme();
  console.log(toggleTheme);

  return (
    <FormContainer>
      <Container>
        <form className={commonModalClasses + " w-72"}>
          <Title>Sign In</Title>
          <FormInput label="Email" placeholder="jhon@gmail.com" name="email" />
          <FormInput
            label="Password"
            placeholder="**********"
            name="password"
          />
          <Submit value="Sign In" />

          <div className="flex justify-between">
            <CustomLink to="/auth/forget-password">Forget Password</CustomLink>
            <CustomLink to="/auth/signup">Sign Up</CustomLink>
          </div>
        </form>
      </Container>
    </FormContainer>
  );
};

export default SignIn;
