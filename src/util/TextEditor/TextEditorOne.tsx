"use client";
import { TextareaAutosize } from "@mui/material";
import React, { useState } from "react";

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
  const [mouseEnter, setMouseEnter] = useState<any>(false);
  const [mouseFocus, setMouseFocus] = useState<any>(false);
  return (
    <>
      <TextareaAutosize
        aria-label="empty textarea"
        style={{
          ...style,
          lineHeight: "1.5rem",
          backgroundColor: "transparent",
          borderStyle: "dotted",
          borderWidth: "1px",
          borderColor: `${mouseEnter && !mouseFocus ? "gray" : "transparent"}`,
        }}
        placeholder={placeholder}
        defaultValue={children}
        onMouseEnter={() => {
          setMouseEnter(true);
        }}
        onMouseLeave={() => {
          setMouseEnter(false);
        }}
        onFocusCapture={() => {
          setMouseFocus(true);
        }}
        onBlur={() => {
          setMouseFocus(false);
        }}
        onChange={onBlur}
        onFocus={onFocus}
        inputMode="text"
        spellCheck="false"
        className={` !min-w-2 w-auto max-w-full resize-none ${className} outline-none`}
      />
    </>
  );
};

export default TextEditorOne;
