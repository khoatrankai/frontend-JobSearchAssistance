import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import { Component, useEffect, useState } from "react";

export default function TextEditorCustomBlog({
  dataReq,
  handleChangeData,
}: any) {
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
      <CKEditor
        editor={ClassicEditor as any}
        config={editorConfiguration}
        data={dataReq ?? ""}
        onChange={(e, editor) => {
          const data = editor.getData();
          handleChangeData(data);
          // //console.log(data);
        }}
      />
    </>
  );
}
// class App extends Component {
//   render() {
//     return (
//       <div className="App">
//         <h2>Using CKEditor&nbsp;5 build in React</h2>
//         <CKEditor
//           editor={ClassicEditor}
//           data="<p>Hello from CKEditor&nbsp;5!</p>"
//           onReady={(editor) => {
//             // You can store the "editor" and use when it is needed.
//             //console.log("Editor is ready to use!", editor);
//           }}
//           onChange={(event) => {
//             //console.log(event);
//           }}
//           onBlur={(event, editor) => {
//             //console.log("Blur.", editor);
//           }}
//           onFocus={(event, editor) => {
//             //console.log("Focus.", editor);
//           }}
//         />
//       </div>
//     );
//   }
// }

// export default App;
