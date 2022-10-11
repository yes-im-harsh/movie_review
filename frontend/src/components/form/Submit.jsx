import React from "react";
import { ImSpinner10 } from "react-icons/im";

const Submit = ({ value, busy }) => {
  return (
    <button
      type="submit"
      className=" w-full rounded dark:bg-white bg-secondary dark:text-secondary text-white hover:bg-opacity-90 font-semibold text-lg cursor-pointer transition h-10 flex items-center justify-center"
      value={value}
    >
      {busy ? <ImSpinner10 className="animate-spin" /> : value}
    </button>
  );
};

export default Submit;
