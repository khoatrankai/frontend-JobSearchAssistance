"use client";
import { useEffect, useState } from "react";

export default function TextEditor({ dataReq, handleChangeData }: any) {
  let ClassicEditor;
  let CKEditor;

  if (typeof window !== "undefined") {
    // Only import CKEditor and ClassicEditor when window is defined (client-side)
    ClassicEditor = require("@ckeditor/ckeditor5-build-classic");
    CKEditor = require("@ckeditor/ckeditor5-react").CKEditor;
  }
  const [dataRequest, setDataRequest] = useState<any>(dataReq);

  useEffect(() => {
    setDataRequest(dataReq);
  }, [dataReq]);

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
          data={dataRequest?.description ?? ""}
          onChange={(e: any, editor: any) => {
            const data = editor.getData();
            handleChangeData(data, true, dataReq);
          }}
        />
      ) : (
        <textarea
          value={dataRequest?.description ?? ""}
          onChange={(e) => handleChangeData(e.target.value, false, dataReq)}
        />
      )}
    </>
  );
}
