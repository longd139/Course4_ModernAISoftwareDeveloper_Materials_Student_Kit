import { test, beforeEach } from "node:test";
import assert from "node:assert/strict";
import { createEvent, listEvents } from "../src/handlers.mjs";
import { reset } from "../src/store.mjs";

beforeEach(() => reset());

test("liệt kê sự kiện", () => {
  assert.equal(listEvents().body.length, 2);
});

test("tạo sự kiện cần đăng nhập, có title và ngày hợp lệ", () => {
  assert.equal(createEvent({ user: null, body: { title: "x", date: "2026-12-01" } }).status, 401);
  assert.equal(createEvent({ user: { id: 1 }, body: { title: " ", date: "2026-12-01" } }).status, 400);
  assert.equal(createEvent({ user: { id: 1 }, body: { title: "x", date: "tomorrow" } }).status, 400);
  const ok = createEvent({ user: { id: 1 }, body: { title: " Demo ", date: "2026-12-01" } });
  assert.equal(ok.status, 201);
  assert.equal(ok.body.title, "Demo");
  assert.equal(ok.body.ownerId, 1);
});
