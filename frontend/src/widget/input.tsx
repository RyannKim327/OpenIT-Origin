import { useState } from "react";

interface InputProps {
  label: string;
  type: string;
  key: string;
}

export default function Input(props: InputProps) {
  const [isFocus, setFocus] = useState(false);

  return (
    <div className={`flex flex-col`}>
      <label
        htmlFor={props.key}
        className={`${isFocus ? "text-red-500" : "text-black"} ml-[25px]`}
      >
        {props.label}
      </label>
      <input
        className={`${isFocus ? "text-red-500 border-red-500" : "text-black"} border border-solid outline-none rounded m-2`}
        id={props.key}
        type={props.type}
        onFocus={() => setFocus(true)}
        onBlur={() => setFocus(false)}
      />
    </div>
  );
}
