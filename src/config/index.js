const config = {
  urlBackend: "https://embarrassed-fish-handkerchief.cyclic.app",
};

const formats = [
  "bold",
  "italic",
  "underline",
  "strike",
  "blockquote",
  "code-block",
  "header",
  "list",
  "script",
  "indent",
  "direction",
  "size",
  "color",
  "background",
  "font",
  "align",
  "clean",
];

const toolbarOptions = [
  ["bold", "italic", "underline", "strike"],
  ["blockquote", "code-block"],
  [{ header: 1 }, { header: 2 }],
  [{ list: "ordered" }, { list: "bullet" }],
  [{ script: "sub" }, { script: "super" }],
  [{ indent: "-1" }, { indent: "+1" }],
  [{ direction: "rtl" }],
  [{ size: ["small", false, "large", "huge"] }],
  [{ header: [1, 2, 3, 4, 5, 6, false] }],
  [{ color: [] }, { background: [] }],
  [{ font: [] }],
  [{ align: [] }],
  ["clean"],
];

const modules = {
  toolbar: {
    container: toolbarOptions,
  },
};

export const quill = {
  formats,
  toolbarOptions,
  modules,
};

export default config;
