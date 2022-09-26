import { useRef } from "react";
import { useEffect, useState } from "react";
import Container from "../Container";
import Submit from "../form/Submit";
import Title from "../form/Title";

const OPT_Length = 6;

const EmailVerification = () => {
  const [otp, setOtp] = useState(new Array(OPT_Length).fill(""));
  const [activeOTPIndex, setActiveOTPIndex] = useState(0);

  const inputRef = useRef();

  const handleOTPChange = ({ target }, index) => {
    const { value } = target;
    // setOtp([value]);
    setActiveOTPIndex(index + 1);
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
                  onChange={(e) => handleOTPChange(e, index)}
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
