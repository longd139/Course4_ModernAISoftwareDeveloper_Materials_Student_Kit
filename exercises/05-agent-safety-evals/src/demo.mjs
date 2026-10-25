import {executeTool,runPlan} from './tools.mjs';
console.log('Bộ thực thi tool ngoại tuyến, không gọi LLM hay MCP.');
console.log('1. Tài liệu hợp lệ:',executeTool({name:'read_document',args:{key:'club-rules'}}));
console.log('2. Tool không cho phép:',executeTool({name:'shell',args:{key:'club-rules'}}));
console.log('3. Ghi chú chứa lệnh lạ:',runPlan([{name:'read_document',args:{key:'untrusted-note'}}]));
