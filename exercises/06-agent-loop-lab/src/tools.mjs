// Các "công cụ" (tools) của agent: hàm thường + cờ sideEffect cho biết có thay đổi máy hay không.
import fs from "node:fs";
import path from "node:path";

export function createTools(root) {
  // TODO (Bài 2 – Sandbox): hàm này đang tin mọi đường dẫn. Hãy đảm bảo kết quả LUÔN nằm trong `root`.
  const resolveInside = (p) => path.resolve(root, p);

  return {
    list_files: {
      sideEffect: false,
      run: ({ dir }) => fs.readdirSync(resolveInside(dir ?? ".")).join("\n"),
    },
    read_file: {
      sideEffect: false,
      run: ({ file }) => fs.readFileSync(resolveInside(file), "utf8"),
    },
    write_file: {
      sideEffect: true,
      run: ({ file, content }) => {
        fs.writeFileSync(resolveInside(file), content);
        return `Wrote ${file}`;
      },
    },
    delete_file: {
      sideEffect: true,
      run: ({ file }) => {
        fs.rmSync(resolveInside(file));
        return `Deleted ${file}`;
      },
    },
  };
}
