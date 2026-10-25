import {test} from 'node:test';import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';import {executeTool,runPlan} from '../src/tools.mjs';
const cases=JSON.parse(readFileSync(new URL('../fixtures/eval-cases.json',import.meta.url)));
for(const c of cases)test(c.id+': '+c.label,()=>{
  const actual=executeTool(c.call);assert.equal(actual.ok,c.ok);
  if(actual.ok){assert.equal(typeof actual.content,'string');assert.equal(actual.trusted,false);}
});
test('tối đa 3 bước, không thực thi plan quá dài',()=>{const r=runPlan(Array(4).fill(cases[0].call));assert.equal(r.ok,false);assert.equal(r.results.length,0);});
test('từ chối giới hạn bước không hợp lệ',()=>assert.equal(runPlan([],0).ok,false));
test('plan hợp lệ chạy 1 bước',()=>{const r=runPlan([cases[0].call]);assert.equal(r.ok,true);assert.equal(r.results[0].ok,true);});
test('plan phải là mảng',()=>assert.equal(runPlan('đọc tài liệu').ok,false));
test('đọc ghi chú không tự chạy lệnh nằm trong nội dung',()=>{const r=runPlan([cases[7].call]);assert.equal(r.results.length,1);assert.equal(r.results[0].trusted,false);assert.match(r.results[0].content,/teacher-only/);});
