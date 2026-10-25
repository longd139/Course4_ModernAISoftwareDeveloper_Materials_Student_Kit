// Vòng lặp agent tối giản:  LLM → (tool call → kết quả → LLM)* → câu trả lời.
// `model` là một hàm async nhận { messages } và trả về { content: [...], stop_reason } giống API của Anthropic.

export async function runAgent({ model, tools, userMessage, ask = async () => true, maxSteps = 10, log = () => {} }) {
  const messages = [{ role: "user", content: userMessage }];

  // TODO (Bài 3 – Giới hạn bước): vòng lặp này có thể chạy mãi mãi. Dừng sau `maxSteps` lượt gọi tool
  //                              và trả về stopped: "max_steps".
  while (true) {
    const res = await model({ messages });
    messages.push({ role: "assistant", content: res.content });
    if (res.stop_reason !== "tool_use") return { messages, stopped: "end_turn" };

    const results = [];
    for (const block of res.content) {
      if (block.type !== "tool_use") continue;
      const tool = tools[block.name];
      let content;
      let is_error = false;

      // TODO (Bài 1 – Xin phép): công cụ có sideEffect phải được người dùng duyệt qua `await ask(name, input)`.
      //   - Bị từ chối → KHÔNG chạy tool; trả về tool_result { is_error: true, content: "Denied by user" }.
      //   - Công cụ chỉ đọc (sideEffect = false) thì không cần hỏi.
      // TODO (Bài 4 – Nhật ký): gọi log({ tool, input, decision, ok }) cho mỗi lần gọi tool.
      try {
        content = String(tool.run(block.input));
      } catch (e) {
        content = `Error: ${e.message}`;
        is_error = true;
      }
      results.push({ type: "tool_result", tool_use_id: block.id, content, is_error });
    }
    messages.push({ role: "user", content: results });
  }
}
