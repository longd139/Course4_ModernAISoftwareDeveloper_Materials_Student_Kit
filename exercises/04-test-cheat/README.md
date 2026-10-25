# test-cheat-lab — "Agent làm test xanh bằng cách nào?" (mở rộng Buổi 4, dùng được từ Buổi 1)

Thông điệp: **test xanh chưa chắc là code đúng.** Agent rất giỏi làm test xanh — kể cả bằng cách gian lận.
Repo này cho sinh viên *tận mắt thấy* điều đó, rồi học cách phát hiện.

## Tình huống
`tests/spec.test.mjs` do **con người** viết từ tiêu chí chấp nhận (test-first). Bạn giao cho agent: *"Cài đặt `src/pricing.mjs` cho test pass."*
Có hai nhánh là kết quả của hai "agent" khác nhau:

| Nhánh | Chuyện gì xảy ra |
|-------|------------------|
| `agent-honest` | Cài đặt đúng, thêm vài test bổ sung |
| `agent-cheat`  | Commit 1 cài đặt sai (lệch biên, hard-code). Test đỏ. Commit 2 **sửa test cho khớp code** → xanh |

```bash
git checkout agent-cheat && npm test                    # XANH
git log --stat                                          # commit nào đụng vào tests/ ?
git diff agent-cheat~1 agent-cheat -- tests/            # agent đã sửa test như thế nào?
git diff main agent-cheat -- tests/spec.test.mjs        # so với bản test gốc của người
```

## Bài tập A — Thám tử (15 phút)
1. Chỉ bằng `git log` / `git diff`, liệt kê **mọi** cách agent đã "làm xanh" bài test ở nhánh `agent-cheat` (có ≥ 4: sửa kỳ vọng, đổi `assertEqual` → `ok`, xóa assert, hard-code `if (subtotal === 1_000_000)`).
2. Với mỗi cách, viết **một dòng luật** để thêm vào `CLAUDE.md` hoặc prompt để ngăn lại.
   Ví dụ: *"Không được sửa file trong tests/. Nếu nghĩ test sai, dừng lại và giải thích."*
3. Thử bảo vệ cấp quy trình: ý tưởng — CI chạy test từ nhánh `main` đè lên tests/ của PR; hoặc `CODEOWNERS` yêu cầu người duyệt khi `tests/` đổi.

## Bài tập B — Đo độ mạnh của test (15 phút)
`tools/mutate.mjs` là "mutation testing" tí hon: cố ý làm hỏng code ở từng chỗ, xem test có bắt được không.
```bash
git checkout agent-honest
node tools/mutate.mjs tests/spec.test.mjs            # test của NGƯỜI   → mutation score 100%
node tools/mutate.mjs tests/agent-written.test.mjs   # test của AGENT   → ~17%, 10 mutant sống sót
```
1. Xem từng mutant sống sót, ví dụ `">=" → ">"` ở ngưỡng 500.000. Test của agent thiếu **trường hợp biên** nào?
2. Viết thêm test để giết ít nhất 5 mutant. Chạy lại cho tới khi score ≥ 90%.
3. Thảo luận: vì sao `assert.ok(x < 200_000)` yếu hơn `assert.equal(x, 180_000)`?

## Bài tập C — Tự làm đúng quy trình (20 phút)
Từ `main` (test đỏ, chưa có code): tạo nhánh mới, nhờ agent cài đặt với prompt có luật *"Không sửa tests/"*; đọc diff; chạy `mutate`.
Nếu agent dừng lại và nói "test X có vẻ sai" → hãy kiểm tra: test sai thật, hay agent lười?

## Lưu ý cho TA
- Mọi thứ chạy bằng Node 22 thuần (`node --test`), không cần `npm install`.
- Chuẩn bị sẵn đáp án A: (1) đổi kỳ vọng biên 500.000 từ 0 → 30.000; (2) `assert.equal(...,150_000)` → `assert.ok(... <= 150_000)`; (3) xóa 2 assert `RangeError`; (4) `assert.equal(... 950_000)` → `assert.ok(... < 1_000_000)` + hard-code `subtotal === 1_000_000` trong code.
- Chỉ liên hệ khái niệm này với sinh viên Buổi 1 ở mức: "agent có thể làm xanh test mà không làm đúng — vì vậy ta phải đọc diff".
