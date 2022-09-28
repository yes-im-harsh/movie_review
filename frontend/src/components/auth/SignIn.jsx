import React from "react";
import Container from "../Container";
import FormInput from "../form/FormInput";
import Submit from "../form/Submit";
import Title from "../form/Title";
import CustomLink from "../CustomLink";
// import { useContext } from "react";
// import { ThemeContext } from "../../context/themeProvider";
import { useTheme } from "../../hooks";

const SignIn = () => {
  // const theme = useContext(ThemeContext);
  // console.log(theme.method());

  const { toggleTheme } = useTheme();
  console.log(toggleTheme);

  return (
    <div className="fixed inset-0 dark:bg-primary bg-white -z-20 flex justify-center items-center">
      <Container>
        <form className="dark:bg-secondary bg-white drop-shadow-lg rounded p-6 space-y-6 w-72">
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
    </div>
  );
};

export default SignIn;
