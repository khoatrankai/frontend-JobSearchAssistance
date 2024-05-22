import { TextareaAutosize } from "@mui/material";
import React from "react";

type Props = {
  className?: any;
  placeholder?: any;
  onFocus?: any;
  onBlur?: any;
  style?: any;
  children?: any;
  classNamePlaceholder?: any;
};

const TextEditorOne = ({
  className,
  children,
  onBlur,
  onFocus,
  placeholder,
  style,
}: Props) => {
  return (
    <>
      <TextareaAutosize
        style={{ ...style, lineHeight: "2rem", backgroundColor: "transparent" }}
        placeholder={placeholder}
        value={children}
        onChange={onBlur}
        onFocus={onFocus}
        className={` !min-w-2 resize-none ${className} outline-none`}
      />
    </>
  );
};

export default TextEditorOne;
