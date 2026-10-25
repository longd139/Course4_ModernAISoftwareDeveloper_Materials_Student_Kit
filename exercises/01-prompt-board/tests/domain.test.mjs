import { test } from 'node:test';
import assert from 'node:assert/strict';
import { validateTitle, remaining, addTask, moveTask } from '../src/domain.mjs';
test('từ chối tiêu đề rỗng', () => assert.equal(validateTitle('').ok, false));
test('từ chối chỉ khoảng trắng', () => assert.equal(validateTitle('   ').ok, false));
test('80 ký tự hợp lệ, 81 ký tự bị chặn', () => {
  assert.equal(validateTitle('a'.repeat(80)).ok, true);
  assert.equal(validateTitle('a'.repeat(81)).ok, false);
});
test('bỏ khoảng trắng đầu cuối', () => assert.equal(validateTitle('  Đọc sách  ').value, 'Đọc sách'));
test('từ chối dữ liệu không phải chuỗi', () => assert.equal(validateTitle(null).ok, false));
test('thêm việc hợp lệ không sửa mảng gốc', () => {
  const original=[]; const result=addTask(original,'Đọc sách','1');
  assert.equal(result.tasks[0].status,'todo'); assert.equal(original.length,0);
});
test('chỉ đếm việc chưa hoàn thành', () => assert.equal(remaining([{status:'done'},{status:'todo'},{status:'doing'}]),2));
test('chuyển trạng thái và bỏ qua trạng thái sai', () => {
  const original=[{id:'1',status:'todo'}];
  assert.equal(moveTask(original,'1','done')[0].status,'done');
  assert.deepEqual(moveTask(original,'1','unknown'),original);
  assert.equal(original[0].status,'todo');
});
