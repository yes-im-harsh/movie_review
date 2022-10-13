import React, { useEffect, useState } from "react";
import Container from "../Container";
import FormInput from "../form/FormInput";
import Submit from "../form/Submit";
import Title from "../form/Title";
import CustomLink from "../CustomLink";
import { useAuth, useNotification } from "../../hooks";
import { commonModalClasses } from "../../utils/theme";
import FormContainer from "../form/FormContainer";
import { useNavigate } from "react-router-dom";
import { isValidEmail } from "../../utils/helper";

const validUserInfo = ({ email, password }) => {

  if (!email.trim()) return { ok: false, error: "Email is missing!" };
  if (!isValidEmail(email)) return { ok: false, error: "Invalid Email!" };

  if (!password.trim()) return { ok: false, error: "Password is missing!" };
  if (password.length < 8)
    return { ok: false, error: "Password must be 8 characters long!" };

  return { ok: true };
};

const SignIn = () => {
  const [userInfo, setUserInfo] = useState({
    name: "",
    email: "",
    password: "",
  });

  const { updateNotification } = useNotification();
  const { handleLogin, authInfo } = useAuth();
  const { isPending, isLoggedIn } = authInfo;
  const navigate = useNavigate();

  const handleChange = ({ target }) => {
    const { name, value } = target;
    setUserInfo({ ...userInfo, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { ok, error } = validUserInfo(userInfo);

    if (!ok) return updateNotification("error", error);

    handleLogin(userInfo.email, userInfo.password);
  };

  useEffect(() => {
    if (isLoggedIn) navigate("/");
  }, [isLoggedIn]);

  return (
    <FormContainer>
      <Container>
        <form onSubmit={handleSubmit} className={commonModalClasses + " w-72"}>
          <Title>Sign In</Title>
          <FormInput
            value={userInfo.email}
            label="Email"
            placeholder="jhon@gmail.com"
            name="email"
            onChange={handleChange}
          />
          <FormInput
            value={userInfo.password}
            label="Password"
            placeholder="**********"
            name="password"
            onChange={handleChange}
            type="password"
          />
          <Submit value="Sign In" busy={isPending} />

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
