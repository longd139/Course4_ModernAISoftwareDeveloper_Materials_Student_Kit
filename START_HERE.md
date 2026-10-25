# 🚀 HƯỚNG DẪN BẮT ĐẦU DÀNH CHO HỌC VIÊN (START HERE)
Chào mừng bạn đến với khóa học **The Modern AI Software Developer**!

Ở khóa học này, bạn không cần phải học thuộc lòng từng dòng code, nhưng bạn sẽ học cách trở thành một **Kỹ sư phần mềm chỉ huy AI** chuyên nghiệp.

---

## ⚡ 1. CHUẨN BỊ MÔI TRƯỜNG (CHỈ TRONG 1 BƯỚC)
Tất cả các bài tập đều được thiết kế **Zero-Config (Không cần cài đặt thư viện rườm rà)**.
* Bạn chỉ cần máy tính đã cài **Node.js (phiên bản 20 hoặc 22 trở lên)**.
* Mở Terminal (PowerShell hoặc Git Bash) và gõ kiểm tra:
  ```bash
  node -v
  ```
  *(Nếu hiện `v20.x.x` hoặc `v22.x.x` là máy bạn đã sẵn sàng 100%)*

---

## 📁 2. CHỌN BÀI THỰC HÀNH THEO CHỈ ĐỊNH CỦA THẦY
Mỗi bài tập nằm trong thư mục `exercises/`:
* **`01-prompt-board/`**: Dành cho người mới bắt đầu. Xây dựng bảng việc có giao diện trực quan trên trình duyệt và lưu trữ dữ liệu.
* **`02-api-bug-hunt/`**: Dành cho các bạn thực hành về HTTP API và săn 5 lỗi logic/bảo mật.
* **`03-diff-review/`**: Rèn luyện kỹ năng đọc `git diff` để phát hiện code ẩu do AI sinh ra.
* **`04-test-cheat/`**: Học cách viết Unit Test chặt chẽ để bắt bài AI "gian lận".
* **`05-agent-safety-evals/`**: Dành cho bài tập nâng cao: Kiểm soát quyền an toàn cho AI.
* **`06-agent-loop-lab/`**: Tự code vòng lặp suy luận và xin phép cho AI.

---

## 🛠️ 3. CÁCH LÀM BÀI TRÊN TỪNG THƯ MỤC
Mở Terminal ngay tại thư mục bài tập bạn được giao và sử dụng 2 lệnh duy nhất:

### Bước 1: Chạy kiểm thử tự động
```bash
npm test
```
> ⚠️ **LƯU Ý:** Khi vừa mở bài ra, một số test sẽ báo **ĐỎ (Failed)**. Đây là các tính năng chưa hoàn thiện hoặc lỗi bài tập được cài sẵn có chủ đích, **KHÔNG PHẢI MÁY BẠN BỊ HỎNG**!

### Bước 2: Chạy ứng dụng (đối với bài có giao diện Web hoặc Server)
```bash
npm start
```
Mở trình duyệt truy cập địa chỉ được thông báo trong Terminal (thường là `http://localhost:3000`).

---

## 🧠 4. NGUYÊN TẮC LÀM VIỆC VỚI AI
1. **Không bấm `Yes` mù quáng:** Trước khi cho AI sửa file, hãy đọc kỹ những dòng code màu xanh/đỏ (`git diff`). Nếu AI xóa nhầm file hoặc làm lan man, nhấn `Ctrl + C` hoặc phím `Esc` để dừng ngay.
2. **Nguyên tắc "Test Xanh Mới Xong":** Khi AI bảo *"Tôi đã sửa xong"*, đừng vội tin! Hãy chạy lại lệnh `npm test`. Khi nào tất cả các dòng đều hiện chữ `ok` màu xanh thì mới tính là hoàn thành.
3. **Giải thích được code của mình:** Thầy và Trợ giảng sẽ hỏi ngẫu nhiên: *"Dòng code này làm gì?"*. Nếu bạn không giải thích được thì bài đó chưa được tính điểm!
