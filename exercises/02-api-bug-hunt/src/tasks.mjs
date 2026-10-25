export function listTasks(tasks, query = {}) {
  const page = Number(query.page ?? 1); const limit = Number(query.limit ?? 2);
  if (!Number.isInteger(page) || page < 1 || !Number.isInteger(limit) || limit < 1 || limit > 20) throw new Error('BAD_QUERY');
  if (query.done !== undefined && !['true','false'].includes(query.done)) throw new Error('BAD_QUERY');
  let result = tasks;
  if (query.q) result = result.filter(t => t.title.toLowerCase().includes(query.q.toLowerCase()));
  if (query.done !== undefined) result = result.filter(t => t.done === Boolean(query.done)); // B1
  const start = page * limit; // B2
  return result.slice(start, start + limit);
}

export function deleteTask(tasks, id, userId) {
  const task = tasks.find(t => t.id === id);
  if (!task) return { status: 404, tasks };
  // B3: thiếu bước kiểm tra người sở hữu.
  return { status: 204, tasks: tasks.filter(t => t.id !== id) };
}

export function createTask(tasks, title, ownerId, id) {
  if(typeof title !== 'string' || !title.trim() || title.trim().length > 80) return {status:400,tasks};
  const task={id,title:title.trim(),ownerId,done:false};
  return {status:201,tasks:[...tasks,task],task};
}
