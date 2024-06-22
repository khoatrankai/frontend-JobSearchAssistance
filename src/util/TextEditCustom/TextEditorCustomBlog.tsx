"use client";
import { useEffect, useState } from "react";

export default function TextEditorCustomBlog({
  dataReq,
  handleChangeData,
}: any) {
  let ClassicEditor;
  let CKEditor;

  if (typeof window !== "undefined") {
    // Only import CKEditor and ClassicEditor when window is defined (client-side)
    ClassicEditor = require("@ckeditor/ckeditor5-build-classic");
    CKEditor = require("@ckeditor/ckeditor5-react").CKEditor;
  }
  const editorConfiguration = {
    toolbar: {
      items: [
        "heading",
        "|",
        "bold",
        "italic",
        "link",
        "bulletedList",
        "numberedList",
        "|",
        "outdent",
        "indent",
        "|",
        "imageUpload",
        "insertTable",
        "mediaEmbed",
        "undo",
        "redo",
        "alignment",
        "fontSize",
        "horizontalLine",
      ],
    },
    language: "en",
    image: {
      toolbar: [
        "imageTextAlternative",
        "toggleImageCaption",
        "imageStyle:inline",
        "imageStyle:block",
        "imageStyle:side",
      ],
    },
    table: {
      contentToolbar: ["tableColumn", "tableRow", "mergeTableCells"],
    },
  };

  return (
    <>
      {ClassicEditor && CKEditor ? (
        <CKEditor
          editor={ClassicEditor}
          config={editorConfiguration}
          data={dataReq ?? ""}
          onChange={(e: any, editor: any) => {
            const data = editor.getData();
            handleChangeData(data);
          }}
        />
      ) : (
        <textarea
          value={dataReq ?? ""}
          onChange={(e) => handleChangeData(e.target.value)}
        />
      )}
    </>
  );
}
