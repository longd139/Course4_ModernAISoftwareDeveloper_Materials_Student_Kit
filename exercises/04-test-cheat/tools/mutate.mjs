// "Mutation testing" tí hon (không cần thư viện): cố ý làm hỏng code ở từng chỗ, rồi xem test có phát hiện không.
// Mutant bị test bắt = tốt ("killed"). Mutant KHÔNG bị bắt = test yếu ("survived").
// Dùng:  node tools/mutate.mjs <file test>      (chạy trên nhánh có code đã cài đặt)
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { spawnSync } from "node:child_process";

const testFile = process.argv[2];
if (!testFile) { console.error("Cách dùng: node tools/mutate.mjs tests/xxx.test.mjs"); process.exit(2); }
const root = process.cwd();
const target = "src/pricing.mjs";
const source = fs.readFileSync(path.join(root, target), "utf8");

const rules = [
  [/>=/g, ">"], [/(?<![=<>!])>(?!=)/g, ">="], [/<=/g, "<"], [/(?<![=<>!])<(?!=)/g, "<="],
  [/===/g, "!=="], [/\*/g, "/"], [/\+/g, "-"], [/\bthrow\b/g, "return; throw"],
  [/\b(\d[\d_]*)\b/g, (m) => String(Number(m.replaceAll("_", "")) + 1)],
];

const mutants = [];
for (const [re, rep] of rules) {
  for (const m of source.matchAll(re)) {
    const line = source.slice(0, m.index).split("\n").length;
    const text = source.split("\n")[line - 1].trim();
    if (text.startsWith("//") || text.startsWith("import")) continue;
    const code = source.slice(0, m.index) + (typeof rep === "function" ? rep(m[0]) : rep) + source.slice(m.index + m[0].length);
    mutants.push({ line, text, from: m[0], to: typeof rep === "function" ? rep(m[0]) : rep, code });
  }
}

const tmp = fs.mkdtempSync(path.join(os.tmpdir(), "mutate-"));
fs.cpSync(path.join(root, "src"), path.join(tmp, "src"), { recursive: true });
fs.cpSync(path.join(root, "tests"), path.join(tmp, "tests"), { recursive: true });
fs.writeFileSync(path.join(tmp, "package.json"), '{"type":"module"}');

let killed = 0; const survived = [];
for (const mu of mutants) {
  fs.writeFileSync(path.join(tmp, target), mu.code);
  const r = spawnSync(process.execPath, ["--test", testFile], { cwd: tmp, encoding: "utf8" });
  if (r.status !== 0) killed++; else survived.push(mu);
}
const score = mutants.length ? Math.round((killed / mutants.length) * 100) : 0;
console.log(`Mutants: ${mutants.length} | killed: ${killed} | survived: ${survived.length} | mutation score: ${score}%`);
for (const s of survived) console.log(`  ✗ sống sót  dòng ${s.line}: "${s.from}" → "${s.to}"   ${s.text}`);
process.exit(survived.length ? 1 : 0);
