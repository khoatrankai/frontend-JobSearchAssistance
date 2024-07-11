"use client";
import { TextareaAutosize } from "@mui/material";
import React, { useEffect, useState } from "react";
import DelayCustom from "../DelayCustom";

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
  const [check, setCheck] = useState<boolean>(false);
  const [value, setValue] = useState<any>(children);
  const { useDebounce } = DelayCustom();
  const handleChange = (e: any) => {
    onBlur(e);
  };
  const handleDebounce = useDebounce(handleChange, 500);
  useEffect(() => {
    if (check && value !== children) {
      setValue(children);
    } else {
      setCheck(true);
    }
  }, [children]);
  return (
    <>
      <TextareaAutosize
        aria-label="empty textarea"
        style={{
          ...style,
          // lineHeight: "2rem",
          backgroundColor: "transparent",
          borderStyle: "dotted",
          borderWidth: "1px",
          borderColor: `${mouseEnter && !mouseFocus ? "gray" : "transparent"}`,
        }}
        placeholder={placeholder}
        value={value}
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
        onChange={(e: any) => {
          setValue(e.target.value);
          handleDebounce(e);
        }}
        onFocus={onFocus}
        inputMode="text"
        spellCheck="false"
        className={` !min-w-2 w-auto max-w-full resize-none ${className} outline-none`}
      />
    </>
  );
};

export default TextEditorOne;
