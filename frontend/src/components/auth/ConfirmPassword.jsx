import React, { useEffect } from "react";
import { useState } from "react";
import { ImSpinner10 } from "react-icons/im";
import { useNavigate, useSearchParams } from "react-router-dom";
import { resetPassword, verifyPasswordResetToken } from "../../api/auth";
import { useNotification } from "../../hooks";
import { commonModalClasses } from "../../utils/theme";
import Container from "../Container";
import FormContainer from "../form/FormContainer";
import FormInput from "../form/FormInput";
import Submit from "../form/Submit";
import Title from "../form/Title";

const ConfirmPassword = () => {
  const [password, setPassword] = useState({
    one: "",
    two: "",
  });
  const [isVerifying, setIsVerifying] = useState(true);
  const [isValid, setIsValid] = useState(false);

  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");
  const id = searchParams.get("id");

  const { updateNotification } = useNotification();
  const navigate = useNavigate();

  useEffect(() => {
    isValidToken();
  }, []);

  const isValidToken = async () => {
    const { error, valid } = await verifyPasswordResetToken(token, id);
    setIsVerifying(false);
    if (error) {
      navigate("/auth/reset-password", { replace: true });
      return updateNotification("error", error);
    }

    if (!valid) {
      setIsValid(false);
      return navigate("/auth/reset-password", { replace: true });
    }

    setIsValid(true);
  };

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

  if (!isValid) {
    return (
      <FormContainer>
        <Container>
          <h1 className="text-4xl font-semibold dark:text-white text-primary">
            Sorry, The token is invalid!
          </h1>
        </Container>
      </FormContainer>
    );
  }

  const handleChange = ({ target }) => {
    const { name, value } = target;
    setPassword({ ...password, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!password.one.trim())
      return updateNotification("error", "Password is missing!");
    if (password.one.trim().length < 8)
      return updateNotification("error", "Password must be 8 characters long!");
    if (password.one !== password.two)
      return updateNotification("error", "Password didn't match");

    const { error, message } = await resetPassword({
      newPassword: password.one,
      userId: id,
      token,
    });
    if (error) updateNotification("error", error);

    updateNotification("success", message);
    navigate("/auth/signin", { replace: true });
  };

  return (
    <FormContainer>
      <Container>
        <form onSubmit={handleSubmit} className={commonModalClasses + " w-96"}>
          <Title>Enter New Password</Title>
          <FormInput
            value={password.one}
            onChange={handleChange}
            label="New Password"
            placeholder="********"
            name="one"
            type="password"
          />
          <FormInput
            value={password.two}
            onChange={handleChange}
            label="Confirm Password"
            placeholder="********"
            name="two"
            type="password"
          />

          <Submit value="Send Link" />
        </form>
      </Container>
    </FormContainer>
  );
};

export default ConfirmPassword;
