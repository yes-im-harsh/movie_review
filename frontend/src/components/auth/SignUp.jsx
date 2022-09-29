import React, { useState } from "react";
import createUser from "../../api/auth";
import { commonModalClasses } from "../../utils/theme";
import Container from "../Container";
import CustomLink from "../CustomLink";
import FormContainer from "../form/FormContainer";
import FormInput from "../form/FormInput";
import Submit from "../form/Submit";
import Title from "../form/Title";

const validUserInfo = ({ name, email, password }) => {
  const isValidEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  const isValidName = /^[a-z A-Z]+$/;

  if (!name.trim()) return { ok: false, error: "Name is missing" };
  if (!isValidName.test(name)) return { ok: false, error: "Invalid Name!" };

  if (!email.trim()) return { ok: false, error: "Email is missing!" };
  if (!isValidEmail.test(email)) return { ok: false, error: "Invalid Email!" };

  if (!password.trim()) return { ok: false, error: "Password is missing!" };
  if (password.length < 8)
    return { ok: false, error: "Password must be 8 characters long!" };

  return { ok: true };
};

const SignUp = () => {
  const [userInfo, setUserInfo] = useState({
    name: "",
    email: "",
    password: "",
  });

  const { name, email, password } = userInfo;

  const handleChange = ({ target }) => {
    const { name, value } = target;
    setUserInfo({ ...userInfo, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // console.log(userInfo);
    const { ok, error } = validUserInfo(userInfo);

    if (!ok) return console.log(error);

    const response = await createUser(userInfo);
    if (response.error) return console.log(response.error);
    console.log(response.user);
  };

  return (
    <FormContainer>
      <Container>
        <form onSubmit={handleSubmit} className={commonModalClasses + " w-72"}>
          <Title>Sign Up</Title>
          <FormInput
            label="Name"
            placeholder="John Doe"
            name="name"
            value={name}
            onChange={handleChange}
          />
          <FormInput
            label="Email"
            placeholder="jhon@gmail.com"
            name="email"
            value={email}
            onChange={handleChange}
          />
          <FormInput
            label="Password"
            type="password"
            placeholder="**********"
            name="password"
            value={password}
            onChange={handleChange}
          />
          <Submit value="Sign Up" />

          <div className="flex justify-between flex-row-reverse">
            <CustomLink to="/auth/signin">Sign In</CustomLink>
          </div>
        </form>
      </Container>
    </FormContainer>
  );
};

export default SignUp;
