import {addTask,moveTask,remaining,statuses} from '/domain.mjs';
const KEY='teaching-board-v1'; const labels={todo:'Cần làm',doing:'Đang làm',done:'Đã xong'};
let tasks=[];
try{const saved=JSON.parse(localStorage.getItem(KEY)??'[]');if(Array.isArray(saved))tasks=saved.filter(t=>t&&typeof t.id==='string'&&typeof t.title==='string'&&statuses.includes(t.status));}catch{}
const board=document.querySelector('#board'); const error=document.querySelector('#error');
function save(){try{localStorage.setItem(KEY,JSON.stringify(tasks));return true;}catch{error.textContent='Trình duyệt không lưu được dữ liệu. Đừng đóng trang trước khi ghi lại bài.';return false;}}
function render(){
  board.replaceChildren(); document.querySelector('#summary').textContent=`Còn ${remaining(tasks)} việc chưa hoàn thành.`;
  for(const status of statuses){
    const section=document.createElement('section');const h=document.createElement('h2');h.textContent=labels[status];section.append(h);
    for(const task of tasks.filter(t=>t.status===status)){
      const item=document.createElement('article');item.className='task';const p=document.createElement('p');p.textContent=task.title;
      const label=document.createElement('label');label.textContent='Trạng thái của '+task.title;const select=document.createElement('select');
      for(const s of statuses){const option=document.createElement('option');option.value=s;option.textContent=labels[s];select.append(option);}select.value=status;
      select.addEventListener('change',()=>{tasks=moveTask(tasks,task.id,select.value);save();render();});label.append(select);item.append(p,label);section.append(item);
    }board.append(section);
  }
}
document.querySelector('#form').addEventListener('submit',event=>{
  event.preventDefault();const input=document.querySelector('#title');const result=addTask(tasks,input.value,crypto.randomUUID());
  error.textContent=result.error??'';if(result.error)return;tasks=result.tasks;save();input.value='';render();input.focus();
});render();
