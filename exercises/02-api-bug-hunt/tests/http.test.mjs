import {test} from 'node:test';import assert from 'node:assert/strict';import {createServer} from '../src/server.mjs';
test('HTTP: health, identity, query, JSON, CRUD và kiểm tra ownership',async()=>{
  const server=createServer();await new Promise(resolve=>server.listen(0,'127.0.0.1',resolve));
  const base=`http://127.0.0.1:${server.address().port}`;
  try{
    assert.equal((await fetch(base+'/health')).status,200);
    assert.equal((await fetch(base+'/api/tasks')).status,401);
    const headers={'x-demo-user':'1','Content-Type':'application/json'};
    assert.equal((await fetch(base+'/api/tasks?page=0',{headers})).status,400);
    assert.equal((await fetch(base+'/api/tasks',{method:'POST',headers,body:'bad'})).status,400);
    const created=await fetch(base+'/api/tasks',{method:'POST',headers,body:JSON.stringify({title:'Đọc truyện',ownerId:2})});
    assert.equal(created.status,201);const item=await created.json();assert.equal(item.ownerId,1);
    const denied=await fetch(base+`/api/tasks/${item.id}`,{method:'DELETE',headers:{'x-demo-user':'2'}});assert.equal(denied.status,403);
    const deleted=await fetch(base+`/api/tasks/${item.id}`,{method:'DELETE',headers});assert.equal(deleted.status,204);
    assert.equal((await fetch(base+`/api/tasks/${item.id}`,{method:'DELETE',headers})).status,404);
  }finally{await new Promise(resolve=>server.close(resolve));}
});
