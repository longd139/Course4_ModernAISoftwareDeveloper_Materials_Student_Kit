# Spec API lớp học
GET /api/tasks: page mặc định 1, limit mặc định 2, số nguyên page>=1 và 1<=limit<=20.
q: tìm không phân biệt hoa thường. done chỉ nhận chuỗi true hoặc false.
Lọc trước, phân trang sau. Trang 1 có chỉ số bắt đầu 0. Truy vấn sai trả 400.
POST: title sau trim dài 1..80, ownerId lấy từ x-demo-user được chọn, bỏ qua ownerId trong body.
DELETE /api/tasks/:id: chủ việc 204, người khác 403 và giữ nguyên dữ liệu, không có id thì 404.
Thiếu hoặc sai x-demo-user trả 401 (trừ /health).
Storage là mảng trong bộ nhớ, reset khi restart. Đây không phải database hay authentication thật.
Server chỉ bind 127.0.0.1. Ngoài phạm vi: đa người dùng thật, deployment, JWT, cập nhật việc.
