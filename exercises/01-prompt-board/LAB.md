# Bài 01: giao việc cho AI rồi tự kiểm tra
Thời gian 40–50 phút. Chỉ cần biết mở file, lưu và dùng trình duyệt. Bạn chưa cần học React.

1. Chạy `npm start`, mở http://127.0.0.1:4311. Nhập “Chuẩn bị poster CLB”.
2. Dự đoán: nhập chỉ khoảng trắng thì nên xảy ra gì? Chuyển một việc sang Đã xong thì số còn lại là bao nhiêu?
3. Thử và ghi kết quả thực tế. Chưa nhờ AI ngay.
4. Chạy `npm test`. Có 6 test đỏ có chủ đích trong starter. Đọc tên ít nhất một test lỗi.
5. Viết prompt theo 5 phần: mục tiêu, ngữ cảnh, ràng buộc, ví dụ, cách kiểm tra.
6. Nhờ AI chỉ sửa `src/domain.mjs`, giữ nguyên test. Đọc kế hoạch trước khi cho sửa.
7. Chạy lại test, thử các trường hợp trong spec trên trình duyệt, xem `git diff` nếu đã tạo repo.
8. Đổi người cầm máy. Từng bạn giải thích một hàm đã sửa bằng lời của mình.

## Nộp bài
Ghi vào lab-notes.md: dự đoán ban đầu, prompt, kết quả test, một lỗi đã tìm ra, vì sao bản sửa đúng.
Bài chuyển giao cuối buổi: tự đặt yêu cầu “tối đa 40 ký tự” và nêu hai ca biên cần đổi. Chưa cần sửa code.

## Gợi ý theo mức
- Mức 1: tên rỗng và tên chỉ có dấu cách có khác nhau sau trim không?
- Mức 2: chỗ nào quyết định ok/error? Hàm đếm việc có kiểm tra status chưa?
- Mức 3: viết hai dòng giả mã: từ chối title.trim() rỗng; đếm task có status khác done.
