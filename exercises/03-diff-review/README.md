# diff-review-lab — Bài tập "Đọc diff như một reviewer" (Buổi 3, mở rộng từ slide 7)

**Tình huống:** đồng đội bảo agent "thêm tính năng sửa sự kiện (US-05)". Agent đã tạo xong nhánh `feat/edit-event`
và mọi test đều xanh. Bạn là reviewer: **có merge được không?**

```bash
npm test                              # trên main: xanh
git checkout feat/edit-event
npm test                              # trên nhánh: vẫn xanh!  → "xanh" ≠ "đúng"
git diff main...feat/edit-event       # đây là thứ bạn phải review
```

## Nhiệm vụ (20–30 phút, theo cặp)
1. Đọc story: *"Là người tạo sự kiện, tôi muốn sửa tiêu đề và ngày của sự kiện mình, để cập nhật khi kế hoạch thay đổi."*
   Tiêu chí: (a) chỉ chủ sở hữu được sửa; (b) title không rỗng; (c) ngày đúng `YYYY-MM-DD`; (d) sự kiện không tồn tại → 404.
2. Dùng checklist ở slide S03 / Lab 03. Viết **review comment** theo dạng: `[danh mục] file:dòng – vấn đề – vì sao quan trọng – gợi ý sửa`.
   Mục tiêu: tìm **ít nhất 6 vấn đề** (có hơn thế).
3. Tự hỏi: vì sao test hiện có không bắt được chúng?
4. Viết test **đỏ** chứng minh 3 vấn đề bạn tìm ra, rồi nhờ agent sửa (nhớ prompt: *"Không được sửa test"*).

> Gợi ý nếu bí: đặt 3 câu hỏi với mỗi dòng code mới — *Ai gọi được?* *Điều gì xảy ra nếu input sai?* *Dòng này có nên nằm trong Git không?*

Đáp án + bộ test ẩn nằm ở nhánh `ta-answer` (**TA giữ, không đẩy lên repo của sinh viên**).
