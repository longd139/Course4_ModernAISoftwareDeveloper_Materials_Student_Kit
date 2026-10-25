// Mỗi nhóm test ứng với một bài tập. Ban đầu một số test sẽ ĐỎ – nhiệm vụ của bạn là làm chúng XANH
// mà KHÔNG sửa file test này.
import { test } from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { runAgent } from "../src/agent.mjs";
import { createTools } from "../src/tools.mjs";
import { scenarios, scriptedModel } from "../src/fake-model.mjs";

function fixture() {
  const tmp = fs.mkdtempSync(path.join(os.tmpdir(), "agent-test-"));
  const root = path.join(tmp, "project");
  fs.mkdirSync(root);
  fs.writeFileSync(path.join(root, "README.md"), "# Hello\n");
  fs.writeFileSync(path.join(tmp, "secret.txt"), "TOP-SECRET\n");
  return { tmp, root };
}
const run = (name, root, opts = {}) =>
  runAgent({ model: scriptedModel(scenarios[name]()), tools: createTools(root), userMessage: "go", ...opts });
const results = (messages) => messages.flatMap((m) => (Array.isArray(m.content) ? m.content : [])).filter((b) => b.type === "tool_result");

// ---------- Mức 0: vòng lặp cơ bản (phải xanh ngay từ đầu) ----------
test("[0] việc bình thường chạy xong và ghi notes.md", async () => {
  const { root } = fixture();
  const { stopped } = await run("benign", root);
  assert.equal(stopped, "end_turn");
  assert.match(fs.readFileSync(path.join(root, "notes.md"), "utf8"), /Notes/);
});

// ---------- Bài 1: xin phép ----------
test("[1] chỉ hỏi cho tool có side effect (ghi/xóa), không hỏi khi chỉ đọc", async () => {
  const { root } = fixture();
  const asked = [];
  await run("benign", root, { ask: async (tool) => (asked.push(tool), true) });
  assert.deepEqual(asked, ["write_file"]);
});

test("[1] bị từ chối thì KHÔNG chạy tool, trả về lỗi 'Denied' và agent vẫn kết thúc bình thường", async () => {
  const { root } = fixture();
  const { messages, stopped } = await run("benign", root, { ask: async () => false });
  assert.equal(fs.existsSync(path.join(root, "notes.md")), false);
  const denied = results(messages).find((r) => r.is_error && /Denied/i.test(r.content));
  assert.ok(denied, "phải có tool_result lỗi chứa 'Denied'");
  assert.equal(stopped, "end_turn");
});

// ---------- Bài 2: sandbox đường dẫn ----------
test("[2] không đọc được file ngoài thư mục project (../secret.txt, đường dẫn tuyệt đối)", async () => {
  const { tmp, root } = fixture();
  const tools = createTools(root);
  assert.throws(() => tools.read_file.run({ file: "../secret.txt" }), /outside|ngoài/i);
  assert.throws(() => tools.read_file.run({ file: path.join(tmp, "secret.txt") }), /outside|ngoài/i);
  assert.throws(() => tools.list_files.run({ dir: ".." }), /outside|ngoài/i);
});

test("[2] không ghi được ra ngoài project, nhưng ghi bên trong (kể cả thư mục con) vẫn OK", async () => {
  const { tmp, root } = fixture();
  const tools = createTools(root);
  assert.throws(() => tools.write_file.run({ file: "../escaped.txt", content: "x" }), /outside|ngoài/i);
  assert.equal(fs.existsSync(path.join(tmp, "escaped.txt")), false);
  fs.mkdirSync(path.join(root, "sub"));
  tools.write_file.run({ file: "sub/ok.txt", content: "ok" });
  assert.equal(fs.readFileSync(path.join(root, "sub", "ok.txt"), "utf8"), "ok");
  // tên thư mục "giống tiền tố" cũng không được lọt: <tmp>/project-evil
  assert.throws(() => tools.read_file.run({ file: "../project-evil/x" }), /outside|ngoài/i);
});

test("[2] kịch bản injection: ngay cả khi người dùng bấm 'yes' hết, không file nào bị lọt ra ngoài", async () => {
  const { tmp, root } = fixture();
  await run("injected", root, { ask: async () => true });
  assert.equal(fs.existsSync(path.join(tmp, "escaped.txt")), false);
});

// ---------- Bài 3: giới hạn bước ----------
test("[3] agent bị kẹt vòng lặp sẽ dừng sau maxSteps", async () => {
  const { root } = fixture();
  const { stopped, messages } = await run("looping", root, { maxSteps: 5 });
  assert.equal(stopped, "max_steps");
  assert.equal(results(messages).length, 5);
});

// ---------- Bài 4: nhật ký ----------
test("[4] log ghi lại mọi lần gọi tool cùng quyết định của người dùng", async () => {
  const { root } = fixture();
  const entries = [];
  await run("benign", root, { ask: async () => false, log: (e) => entries.push(e) });
  assert.deepEqual(entries.map((e) => e.tool), ["list_files", "read_file", "write_file"]);
  assert.deepEqual(entries.map((e) => e.decision), ["auto", "auto", "denied"]);
  assert.equal(entries[2].ok, false);
  assert.equal(entries[0].ok, true);
});
