import React from "react";
import clsx from "../utilities/clsx";

const Button = ({ name, className = "", onClick }) => {
  return (
    <button
      className={clsx(
        "py-3 px-8 bg-white border-2 rounded-md",
        "font-extrabold text-md text-black",
        "hover:border-gray-600 hover:shadow-md",
        className,
      )}
      onClick={onClick}
    >
      {name}
    </button>
  );
};

export default Button;
