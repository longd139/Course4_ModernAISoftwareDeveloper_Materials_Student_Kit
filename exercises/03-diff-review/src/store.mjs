// Kho dữ liệu trong bộ nhớ (đủ cho bài tập đọc diff).
export const events = [];
let nextId = 1;

export function reset() {
  events.length = 0;
  nextId = 1;
  addEvent({ title: "Club meeting", date: "2026-11-02", ownerId: 1 });
  addEvent({ title: "Hackathon kickoff", date: "2026-11-15", ownerId: 2 });
}

export function addEvent({ title, date, ownerId }) {
  const event = { id: nextId++, title, date, ownerId };
  events.push(event);
  return event;
}
reset();
