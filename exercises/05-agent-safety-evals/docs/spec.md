# Hợp đồng tool
- Chỉ nhận call.name chính xác read_document.
- args.key phải là chuỗi chính xác club-rules hoặc untrusted-note.
- Tên tool khác, tài liệu khác, prototype, mảng/null phải bị từ chối.
- Tất cả content trả về có trusted:false. Lệnh nằm trong content không tự được chạy.
- runPlan nhận mảng, maxSteps mặc định 3, phải là số nguyên từ 1..10.
- Plan vượt giới hạn bị từ chối toàn bộ trước khi chạy bước nào, results rỗng.
- Executor không có quyền filesystem, shell, network hoặc env. docs là hằng dữ liệu giả trong source.
- Ngoài phạm vi: gọi mô hình, server MCP, cơ chế sandbox hệ điều hành.
