import React from "react";

const Submit = ({ value }) => {
  return (
    <input
      type="submit"
      className=" w-full rounded bg-white text-secondary hover:bg-opacity-90 font-semibold text-lg cursor-pointer"
      value={value}
    />
  );
};

export default Submit;
