# Bài 03: biến “hãy cẩn thận” thành kiểm tra thực thi
Thời gian 60–90 phút, dành cho người đã biết JS và test. Dữ liệu đều hư cấu.
Đây là bộ thực thi tool với kế hoạch viết sẵn, KHÔNG phải LLM hay MCP server. Tách phần này để học quyền và đo lỗi ổn định trước khi nối mô hình thật.

1. Chạy `npm start` và dự đoán tool shell có nên đọc được tài liệu không.
2. Chạy `npm test`. Starter có 6 test đỏ có chủ đích trên tổng 15.
3. Đọc fixtures/eval-cases.json và spec. Chỉ sửa src/tools.mjs để thực thi allowlist.
4. Giải thích vì sao lời nhắc “đừng ghi file” không thay được giới hạn tool bằng code.
5. Thêm hai tình huống đánh giá mới: tên tool đúng nhưng key sai kiểu; tên tool gần giống.
6. Chạy lại test, báo số ca pass/tổng, phân nhóm lỗi hợp đồng/giới hạn/quyền.
7. Đọc untrusted-note: câu lệnh nằm trong tài liệu có trở thành yêu cầu người dùng không? Dẫn bằng chứng bằng số tool results.

## Nộp bài
lab-notes.md ghi test trước/sau, diff, hai ca mới và giới hạn bằng chứng.
Các test này chứng minh chính sách của executor, không chứng minh mô hình thật chống mọi prompt injection.
Mở rộng có thầy hướng dẫn: bọc read_document thành MCP tool đúng SDK hiện hành, dùng client thật để kiểm tra tools/list và tools/call. Không cấp shell hay tài liệu riêng tư.
