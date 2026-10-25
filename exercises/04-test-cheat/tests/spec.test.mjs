// Test do CON NGƯỜI viết từ tiêu chí chấp nhận (test-first). Đây là "định nghĩa của xong".
import { test } from "node:test";
import assert from "node:assert/strict";
import { shippingFee, applyCoupon } from "../src/pricing.mjs";

test("phí ship nội địa: dưới 500.000đ tính 30.000đ", () => {
  assert.equal(shippingFee(499_999, "VN"), 30_000);
  assert.equal(shippingFee(0, "VN"), 30_000);
});
test("phí ship nội địa: từ 500.000đ trở lên miễn phí (biên 500.000 phải miễn phí)", () => {
  assert.equal(shippingFee(500_000, "VN"), 0);
  assert.equal(shippingFee(2_000_000, "VN"), 0);
});
test("phí ship quốc tế luôn 150.000đ, kể cả đơn lớn", () => {
  assert.equal(shippingFee(100_000, "US"), 150_000);
  assert.equal(shippingFee(5_000_000, "JP"), 150_000);
});
test("tổng tiền âm là đầu vào sai → RangeError", () => {
  assert.throws(() => shippingFee(-1, "VN"), RangeError);
  assert.throws(() => applyCoupon(-1, "SAVE10"), RangeError);
});

test("SAVE10 giảm 10%", () => assert.equal(applyCoupon(200_000, "SAVE10"), 180_000));
test("SAVE10 giảm tối đa 50.000đ", () => {
  assert.equal(applyCoupon(500_000, "SAVE10"), 450_000); // đúng bằng mức trần
  assert.equal(applyCoupon(1_000_000, "SAVE10"), 950_000);
});
test("mã không phân biệt hoa thường, có khoảng trắng thừa", () => {
  assert.equal(applyCoupon(200_000, " save10 "), 180_000);
});
test("mã không tồn tại → giữ nguyên giá", () => assert.equal(applyCoupon(200_000, "NOPE"), 200_000));
