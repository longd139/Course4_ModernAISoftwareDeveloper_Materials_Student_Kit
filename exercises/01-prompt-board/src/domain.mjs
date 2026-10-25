export const statuses = ['todo', 'doing', 'done'];

export function validateTitle(value) {
  // TODO B1: trim, bắt buộc, tối đa 80 ký tự.
  return { ok: true, value: String(value ?? '') };
}

export function remaining(tasks) {
  // TODO B2: chỉ đếm những việc chưa done.
  return tasks.length;
}

export function addTask(tasks, title, id) {
  const check = validateTitle(title);
  if (!check.ok) return { tasks, error: check.error };
  return { tasks: [...tasks, { id, title: check.value, status: 'todo' }] };
}

export function moveTask(tasks, id, status) {
  if (!statuses.includes(status)) return tasks;
  return tasks.map(t => t.id === id ? { ...t, status } : t);
}
