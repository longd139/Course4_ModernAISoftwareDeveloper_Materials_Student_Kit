// Các handler trả về { status, body } (không cần server thật → dễ test).
import { events, addEvent } from "./store.mjs";

const isIsoDate = (s) => typeof s === "string" && /^\d{4}-\d{2}-\d{2}$/.test(s);

export function listEvents() {
  return { status: 200, body: events };
}

export function createEvent({ user, body }) {
  if (!user) return { status: 401, body: { error: "Sign in first" } };
  const title = typeof body?.title === "string" ? body.title.trim() : "";
  if (!title) return { status: 400, body: { error: "Title is required" } };
  if (!isIsoDate(body.date)) return { status: 400, body: { error: "Date must be YYYY-MM-DD" } };
  return { status: 201, body: addEvent({ title, date: body.date, ownerId: user.id }) };
}
