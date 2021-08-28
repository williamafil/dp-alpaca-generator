import React, { Children, cloneElement } from "react";
import clsx from "../utilities/clsx";

export function RadioGroup(props) {
  const { name, legend, children, onClick } = props;

  return (
    <div>
      <form className="mt-8 flex space-x-2">
        <fieldset className="flex flex-wrap">
          <legend className="block font-extrabold mb-4">{legend}</legend>
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
          "block mb-2 mr-2 px-4 py-2 capitalize border-2 border-blue-200 rounded-full",
          "hover:bg-blue-300 hover:text-gray-700 text-blue-300 font-bold",
          "peer-checked:bg-blue-900 peer-checked:border-blue-900 peer-checked:text-white",
        )}
      >
        {id}
      </label>
    </div>
  );
}
