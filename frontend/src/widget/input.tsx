import { useState } from "react";

interface InputProps {
  label: string;
  type: string;
  key: string;
  onChange: (e)=>void
}

export default function Input(props: InputProps) {
  const [isFocus, setFocus] = useState(false);

  return (
    <div className={`flex flex-col p-2`}>
      <label
        htmlFor={props.key}
        className={`${isFocus ? "text-[#727272]"   : "text-[#727272]"} text-sm`}
      >
        {props.label}
      </label>
      <input
        required
        onChange={props.onChange}
        className={`${isFocus ? "text-[#727272] border-black" : "text-[#727272]"} h-9 border border-solid outline-none rounded`}
        id={props.key}
        type={props.type}
        onFocus={() => setFocus(true)}
        onBlur={() => setFocus(false)}
      />
    </div>
  );
}
