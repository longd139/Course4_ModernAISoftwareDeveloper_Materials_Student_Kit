# agent-loop-lab — Tự xây "phanh" cho một coding agent (bài mở rộng sau Buổi 1 & 3)

**Mục tiêu:** hiểu *tại sao* Claude Code luôn hỏi xin phép — bằng cách tự viết các lớp bảo vệ cho một agent mini (~60 dòng).
Liên hệ trực tiếp: slide S01 (agent loop, "read before you approve"), S03 (autonomy levels), S07 (prompt injection).

- **Không cần API key, không tốn tiền**: model là "model giả" chạy theo kịch bản (`src/fake-model.mjs`).
- **Không cần `npm install`**: chỉ dùng Node 22 (`node:test`).
- Thời lượng gợi ý: 45–60 phút (cặp đôi). Yêu cầu: JavaScript cơ bản, đã xem demo agent loop.

## Chạy
```bash
npm test                 # ban đầu: 1 xanh, 7 đỏ — nhiệm vụ: làm tất cả xanh, KHÔNG sửa tests/
npm run demo             # kịch bản bình thường (sẽ hỏi y/n sau khi bạn làm xong Bài 1)
npm run demo:injected    # mô phỏng prompt injection: agent bị lừa → xem các lớp bảo vệ của bạn chặn thế nào
```

## Bài tập (làm theo thứ tự; tìm `TODO` trong `src/`)
| Bài | File | Việc cần làm | Khái niệm |
|----|------|--------------|-----------|
| 1 | `src/agent.mjs` | Hỏi người dùng (`ask`) trước khi chạy tool có `sideEffect`; bị từ chối thì không chạy và báo `Denied by user` | permission prompt |
| 2 | `src/tools.mjs` | Chặn mọi đường dẫn thoát khỏi thư mục project (`../`, đường dẫn tuyệt đối, thư mục "giống tiền tố") | sandbox / least privilege |
| 3 | `src/agent.mjs` | Dừng sau `maxSteps` lượt gọi tool | chống vòng lặp vô hạn, tốn token |
| 4 | `src/agent.mjs` | Ghi nhật ký mỗi lần gọi tool: `{tool, input, decision, ok}` | audit trail |

## Câu hỏi thảo luận sau khi xong
1. Ở `injected`, nếu người dùng bấm `y` mù quáng cho *mọi* thứ, lớp bảo vệ nào còn cứu được bạn? (gợi ý: Bài 2)
2. Chế độ "bypass permissions" của Claude Code tương ứng với việc bạn làm gì trong `agent.mjs`? Vì sao slide ghi *never on real repos*?
3. Bài 2 chặn `../`. Còn **symlink** thì sao? (Mở rộng: dùng `fs.realpathSync`.)
4. Model thật không tất định — vì sao không thể dựa vào "model đủ thông minh để không bị lừa" thay cho các lớp này?

Đáp án nằm ở nhánh `solution` (**TA giữ, không phát**): `git diff main solution`.
