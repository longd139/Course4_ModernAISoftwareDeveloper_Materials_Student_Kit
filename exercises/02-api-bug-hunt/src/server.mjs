import http from 'node:http';
import {pathToFileURL} from 'node:url';
import {listTasks,deleteTask,createTask} from './tasks.mjs';
import {seed} from './seed.mjs';
export function createServer(){
  let tasks=seed();let nextId=5;
  return http.createServer(async(req,res)=>{
    const reply=(status,body)=>{res.writeHead(status,{'Content-Type':'application/json; charset=utf-8'});res.end(body===undefined?'':JSON.stringify(body));};
    const url=new URL(req.url,'http://localhost');
    if(req.method==='GET'&&url.pathname==='/health')return reply(200,{status:'ok',storage:'memory'});
    // Chọn nhân vật hư cấu để học phân quyền. Header này KHÔNG phải cơ chế xác thực.
    const userId=Number(req.headers['x-demo-user']);
    if(![1,2].includes(userId))return reply(401,{error:'Chọn x-demo-user: 1 hoặc 2. Đây là danh tính demo.'});
    try{
      if(req.method==='GET'&&url.pathname==='/api/tasks')return reply(200,listTasks(tasks,Object.fromEntries(url.searchParams)));
      if(req.method==='POST'&&url.pathname==='/api/tasks'){
        const chunks=[];let size=0;
        for await(const chunk of req){size+=chunk.length;if(size>4096){reply(413,{error:'Nội dung quá lớn'});return;}chunks.push(chunk);}
        let body;try{body=JSON.parse(Buffer.concat(chunks).toString());}catch{return reply(400,{error:'JSON không hợp lệ'});}
        const result=createTask(tasks,body?.title,userId,nextId);tasks=result.tasks;if(result.status===201)nextId++;
        return reply(result.status,result.task??{error:'Tiêu đề không hợp lệ'});
      }
      const match=url.pathname.match(/^\/api\/tasks\/(\d+)$/);
      if(req.method==='DELETE'&&match){const result=deleteTask(tasks,Number(match[1]),userId);tasks=result.tasks;return reply(result.status,result.status===204?undefined:{error:result.status===403?'Bạn không sở hữu việc này':'Không tìm thấy'});}
      return reply(404,{error:'Không tìm thấy'});
    }catch(error){return reply(error.message==='BAD_QUERY'?400:500,{error:error.message==='BAD_QUERY'?'Tham số không hợp lệ':'Lỗi nội bộ'});}
  });
}
if(process.argv[1]&&import.meta.url===pathToFileURL(process.argv[1]).href)createServer().listen(4312,'127.0.0.1',()=>console.log('API demo: http://127.0.0.1:4312 | dữ liệu reset khi khởi động lại'));
