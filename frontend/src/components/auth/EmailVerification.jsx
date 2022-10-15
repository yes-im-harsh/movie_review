import { useEffect, useState, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { verifyUserEmail } from "../../api/auth";
import { useAuth, useNotification } from "../../hooks";
import { commonModalClasses } from "../../utils/theme";
import Container from "../Container";
import FormContainer from "../form/FormContainer";
import Submit from "../form/Submit";
import Title from "../form/Title";

const OPT_Length = 6;
let currentOTPIndex;

const isValidOTP = (otp) => {
  let valid = false;
  for (let val of otp) {
    valid = !isNaN(parseInt(val));
    if (!valid) break;
  }

  return valid;
};

const EmailVerification = () => {
  const [otp, setOtp] = useState(new Array(OPT_Length).fill(""));
  const [activeOTPIndex, setActiveOTPIndex] = useState(0);

  const inputRef = useRef();
  const { state } = useLocation();
  const user = state?.user;
  const { isAuth, authInfo } = useAuth();
  const { isLoggedIn, profile } = authInfo;

  const isVerified = profile?.isVerified;

  const navigate = useNavigate();
  const { updateNotification } = useNotification();

  const focusNextInputFiled = (index) => {
    setActiveOTPIndex(index + 1);
  };

  //prev
  const focusPrevInputFiled = (index) => {
    let nextIndex;
    const diff = index - 1;
    nextIndex = diff !== 0 ? diff : 0;

    setActiveOTPIndex(nextIndex);
  };

  const handleOTPChange = ({ target }) => {
    const { value } = target;

    // Logic for Updating OTP State. Now its automatically switching between fields.
    const newOTP = [...otp];
    newOTP[currentOTPIndex] = value.substring(value.length - 1, value.length);

    //Code for using, backspace to clear the state accordingly
    if (!value) focusPrevInputFiled(currentOTPIndex);
    else focusNextInputFiled(currentOTPIndex);

    setOtp([...newOTP]);
  };

  const handleKeyDown = ({ key }, index) => {
    currentOTPIndex = index;
    if (key === "Backspace") {
      focusPrevInputFiled(index);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!isValidOTP(otp)) return updateNotification("error", "Invalid OTP");

    //if you will not use join after the OTP, it will through an error undefined, because our otp is in array. So we need to convert it to a string
    const {
      error,
      message,
      user: userResponse,
    } = await verifyUserEmail({
      userId: user.id,
      OTP: otp.join(""),
    });

    // console.log(otp.join(""));
    if (error) return updateNotification("error", error);

    updateNotification("success", message);
    localStorage.setItem("auth-token", userResponse.token);
    isAuth();
  };

  useEffect(() => {
    inputRef.current?.focus();
  }, [activeOTPIndex]);

  useEffect(() => {
    if (!user) navigate("/not-found");
    if (isLoggedIn && isVerified) navigate("/");
  }, [user, isLoggedIn]);

  return (
    <FormContainer>
      <Container>
        <form onSubmit={handleSubmit} className={commonModalClasses}>
          <div>
            <Title>Please enter the OTP to verify your account</Title>
            <p className="text-center dark:text-dark-subtle text-light-subtle">
              OTP has been sent to your Email
            </p>
          </div>

          <div className="flex justify-center items-center space-x-4">
            {otp.map((_, index) => {
              return (
                <input
                  key={index}
                  type="number"
                  ref={activeOTPIndex === index ? inputRef : null}
                  value={otp[index] || ""}
                  onChange={handleOTPChange}
                  onKeyDown={(e) => handleKeyDown(e, index)}
                  className="w-12 h-12 border-2 dark:border-dark-subtle border-light-subtle dark:focus:border-white focus:border-primary 
                  rounded bg-transparent outline-none text-center dark:text-white text-primary 
                  font-semibold text-xl spin-button-none"
                />
              );
            })}
          </div>

          <Submit value="Verify Account" />
        </form>
      </Container>
    </FormContainer>
  );
};

export default EmailVerification;
