import { useRef } from "react";
import { useEffect, useState } from "react";
import Container from "../Container";
import Submit from "../form/Submit";
import Title from "../form/Title";

const OPT_Length = 6;
let currentOTPIndex;

const EmailVerification = () => {
  const [otp, setOtp] = useState(new Array(OPT_Length).fill(""));
  const [activeOTPIndex, setActiveOTPIndex] = useState(0);

  const inputRef = useRef();

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

  useEffect(() => {
    inputRef.current?.focus();
  }, [activeOTPIndex]);

  return (
    <div className="fixed inset-0 bg-primary -z-20 flex justify-center items-center">
      <Container>
        <form className="bg-secondary rounded p-6 space-y-6">
          <div>
            <Title>Please enter the OTP to verify your account</Title>
            <p className="text-center text-dark-subtle">
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
                  className="w-12 h-12 border-2 border-dark-subtle focus:border-white rounded bg-transparent outline-none text-center text-white font-semibold text-xl spin-button-none"
                />
              );
            })}
          </div>

          <Submit value="Send Link" />
        </form>
      </Container>
    </div>
  );
};

export default EmailVerification;
