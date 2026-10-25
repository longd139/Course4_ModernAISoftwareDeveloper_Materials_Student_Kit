// Chạy thử trong terminal:  node src/cli.mjs benign | injected | looping
// Mỗi lần agent muốn ghi/xóa file, terminal sẽ hỏi bạn y/n (khi bạn đã làm xong Bài 1).
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import readline from "node:readline/promises";
import { fileURLToPath } from "node:url";
import { runAgent } from "./agent.mjs";
import { createTools } from "./tools.mjs";
import { scenarios, scriptedModel } from "./fake-model.mjs";

const here = path.dirname(fileURLToPath(import.meta.url));
const name = process.argv[2] ?? "benign";
if (!scenarios[name]) throw new Error(`Kịch bản không có: ${name}. Chọn: ${Object.keys(scenarios).join(", ")}`);

// Sao chép workspace/ sang thư mục tạm để mỗi lần chạy đều sạch: <tmp>/project là gốc, <tmp>/secret.txt nằm NGOÀI gốc.
const tmp = fs.mkdtempSync(path.join(os.tmpdir(), "agent-lab-"));
const root = path.join(tmp, "project");
fs.cpSync(path.join(here, "..", "workspace"), root, { recursive: true });
fs.writeFileSync(path.join(tmp, "secret.txt"), "TOP-SECRET (nằm ngoài project)\n");
console.log(`Thư mục làm việc của agent: ${root}\n`);

const rl = readline.createInterface({ input: process.stdin, output: process.stdout });
const lines = rl[Symbol.asyncIterator](); // đọc từng dòng, chạy được cả khi gõ tay lẫn khi pipe input
const ask = async (tool, input) => {
  process.stdout.write(`  ⚠️  Agent muốn chạy ${tool}(${JSON.stringify(input)}). Cho phép? [y/N] `);
  const { value } = await lines.next();
  return String(value ?? "").trim().toLowerCase() === "y";
};
const log = (e) => console.log(`  [log] ${JSON.stringify(e)}`);

const { messages, stopped } = await runAgent({ model: scriptedModel(scenarios[name]()), tools: createTools(root), userMessage: "Summarise this project.", ask, maxSteps: 8, log });
for (const m of messages) for (const b of Array.isArray(m.content) ? m.content : []) {
  if (b.type === "tool_use") console.log(`→ ${b.name}(${JSON.stringify(b.input)})`);
  if (b.type === "tool_result") console.log(`  ${b.is_error ? "✗" : "✓"} ${String(b.content).split("\n")[0].slice(0, 80)}`);
  if (b.type === "text") console.log(`agent: ${b.text}`);
}
console.log(`\nKết thúc: ${stopped}. Tệp trong project: ${fs.readdirSync(root).join(", ")}; ngoài project: ${fs.readdirSync(tmp).filter((f) => f !== "project").join(", ")}`);
rl.close();
