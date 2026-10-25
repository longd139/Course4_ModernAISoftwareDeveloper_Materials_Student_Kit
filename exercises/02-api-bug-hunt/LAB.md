# Bài 02: AI đề xuất, bằng chứng quyết định
Thời gian 60–90 phút. Đầu vào: biết hàm, array/filter và HTTP cơ bản. Người mới chưa đạt đầu vào làm bài 01 trước.
1. Đọc spec. Dự đoán kết quả trang 1, done=false và người 2 xóa việc người 1.
2. Chạy `npm test`. Có 7 test đỏ có chủ đích trong starter, một phần do lỗi phân trang che kết quả lọc.
3. Tạo nhánh `git switch -c bai-lam/ten-nhom` nếu đã có repo. Ghi lỗi tái hiện trước khi hỏi AI.
4. Nhờ AI đọc src/tasks.mjs và test, nêu giả thuyết. Chưa chấp nhận sửa cả dự án.
5. Sửa từng nguyên nhân, chạy lại test sau mỗi thay đổi. Không sửa test để qua bài.
6. Chạy `npm start`. Trên terminal khác, dùng PowerShell:
   `Invoke-RestMethod 'http://127.0.0.1:4312/api/tasks?page=1&limit=2' -Headers @{'x-demo-user'='1'}`
7. Tự thêm một test mới không sao chép dữ liệu sẵn có, ví dụ trang 3 rỗng hoặc tìm từ không có kết quả.
8. Review chéo: bạn kia chỉ ra file/dòng, điều kiện gây lỗi và ảnh hưởng. Từng người giải thích Boolean('false').

## Nộp bài
lab-notes.md: ba ca lỗi, nguyên nhân, test bảo vệ, diff và một góp ý review có lý do.
Mở rộng: viết test quá 4096 bytes phải trả 413; gắn requestId; lưu bằng DB thật trong buổi nâng cao.
Không public server này: x-demo-user chỉ là cơ chế đổi nhân vật giả trong lớp, không xác thực người thật.
