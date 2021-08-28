import React, { Children, cloneElement } from "react";
import clsx from "../utilities/clsx";

export function RadioGroup(props) {
  const { name, legend, children, onClick } = props;

  return (
    <div>
      <form className="mt-4 flex space-x-2">
        <fieldset className="flex flex-wrap">
          <legend className="block font-extrabold mb-2">{legend}</legend>
          {Children.map(children, (child) =>
            cloneElement(child, { name, onClick }),
          )}
        </fieldset>
      </form>
    </div>
  );
}

export function RadioBtn(props) {
  const { id, name, selection, onClick } = props;

  return (
    <div className="">
      <input
        type="radio"
        name={name}
        id={id}
        className="sr-only peer"
        checked={selection === id ? true : false}
        onChange={(e) => onClick(e)}
      />
      <label
        htmlFor={id}
        className={clsx(
          "block mb-2 mr-2 px-2 py-1 capitalize border-2 border-blue-200 rounded-full",
          "md:px-4 md:mr-3 md:mb-3 md:py-2 md:text-lg",
          "hover:bg-blue-300 hover:text-gray-700 text-blue-300 text-sm font-bold",
          "peer-checked:bg-blue-900 peer-checked:border-blue-900 peer-checked:text-white",
        )}
      >
        {id}
      </label>
    </div>
  );
}
