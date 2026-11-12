import {$,toast,closeLayer} from './ui.js';
import {initRouter} from './router.js';
import {initTheme} from './theme.js';
import {initDrawer} from './drawer.js';
import {confirmAction} from './modal.js';

// ---------- Datos simulados ----------
const rnd=(a,b)=>Math.round(a+Math.random()*(b-a));
const clamp=(v,a=5,b=98)=>Math.min(b,Math.max(a,v));
const BS={running:['En línea','ok'],warning:['Alerta','warn'],stopped:['Detenido','bad']};
const ST=['running','running','warning','stopped'];
const servers=['api-gateway','db-primary','cache-01','worker-a','worker-b','auth-svc','web-01','web-02','queue-01','logs-01','search-01','cdn-edge']
  .map((name,i)=>({id:i+1,name,region:['us-east','eu-west','sa-east'][i%3],status:ST[i%4],cpu:rnd(10,90)}));
const M={cpu:42,ram:58,disk:63,up:93784,net:Array.from({length:20},()=>rnd(20,70))};
let q='',st='',pg=1;const PER=5;

// ---------- Métricas en "tiempo real" ----------
const set=(k,v)=>{$('#'+k+'V').textContent=v+'%';$('#'+k+'B').style.width=v+'%'};
function tick(){
  M.cpu=clamp(M.cpu+rnd(-8,8));M.ram=clamp(M.ram+rnd(-3,3));M.disk=clamp(M.disk+rnd(0,1),5,99);M.up+=2;
  M.net.push(clamp(M.net.at(-1)+rnd(-15,15),0,100));M.net.shift();
  set('cpu',M.cpu);set('ram',M.ram);set('disk',M.disk);
  $('#upV').textContent=`${Math.floor(M.up/86400)}d ${Math.floor(M.up%86400/3600)}h ${Math.floor(M.up%3600/60)}m`;
  $('#netV').textContent=M.net.at(-1)+' Mbps';
  $('#netLine').setAttribute('points',M.net.map((v,i)=>`${(i*200/19).toFixed(1)},${(78-v*.76).toFixed(1)}`).join(' '));
}
function summary(){
  $('#sum').innerHTML=Object.entries(BS).map(([k,[t,c]])=>`<span class="badge ${c}">${t}: ${servers.filter(s=>s.status===k).length}</span>`).join('');
}

// ---------- Tabla con filtros y paginación ----------
function table(){
  const list=servers.filter(s=>s.name.includes(q)&&(!st||s.status===st));
  const pages=Math.max(1,Math.ceil(list.length/PER));pg=Math.min(pg,pages);
  $('#rows').innerHTML=list.slice((pg-1)*PER,pg*PER).map(s=>`<tr><th scope="row">${s.name}</th><td>${s.region}</td><td><span class="badge ${BS[s.status][1]}">${BS[s.status][0]}</span></td><td>${s.cpu}%</td><td><div class="acts"><button class="btn" data-act="restart" data-id="${s.id}">Reiniciar</button><button class="btn danger" data-act="delete" data-id="${s.id}">Eliminar</button></div></td></tr>`).join('')
    ||'<tr><td colspan="5">No hay instancias con ese filtro. Prueba con otro nombre o estado.</td></tr>';
  $('#pg').textContent=`Página ${pg} de ${pages}`;$('#prev').disabled=pg<2;$('#next').disabled=pg>=pages;
}
$('#q').oninput=e=>{q=e.target.value.trim().toLowerCase();pg=1;table()};
$('#fst').onchange=e=>{st=e.target.value;pg=1;table()};
$('#prev').onclick=()=>{pg--;table()};
$('#next').onclick=()=>{pg++;table()};
$('#rows').onclick=async e=>{
  const b=e.target.closest('button');if(!b)return;
  const s=servers.find(x=>x.id==b.dataset.id),del=b.dataset.act==='delete';
  const ok=await confirmAction(del
    ?{title:`¿Eliminar ${s.name}?`,text:'Esta acción no se puede deshacer. Se perderán la instancia y sus datos.',label:'Sí, eliminar',danger:true}
    :{title:`¿Reiniciar ${s.name}?`,text:'La instancia quedará fuera de línea unos segundos.',label:'Sí, reiniciar'});
  if(!ok)return;
  if(del)servers.splice(servers.indexOf(s),1);else s.status='running';
  toast(del?'Instancia eliminada':'Instancia reiniciada');table();summary();
};

// ---------- Guía de componentes: los 5 estados ----------
function guide(){
  const S=['Default','Hover','Focus','Disabled','Loading'];
  const mk=(t,k,s)=>{
    const c=s==='Hover'?' is-hover':s==='Focus'?' is-focus':'',d=/Dis|Loa/.test(s)?' disabled':'',b=s==='Loading'?' aria-busy="true"':'',l=s==='Loading'?' is-loading':'';
    if(t==='btn')return `<button class="btn ${k}${c}"${d}${b}>${s==='Loading'?'Guardando…':'Acción'}</button>`;
    return t==='in'?`<input class="ctl${c}${l}" value="${s}" aria-label="Campo ${s}"${d}${b}>`:`<select class="ctl${c}${l}" aria-label="Lista ${s}"${d}${b}><option>${s}</option></select>`;
  };
  const rows=[['Botón primario','btn','primary'],['Botón secundario','btn',''],['Botón destructivo','btn','danger'],['Campo de texto','in',''],['Dropdown','sel','']];
  $('#guide').innerHTML=`<thead><tr><th>Control</th>${S.map(s=>`<th>${s}</th>`).join('')}</tr></thead><tbody>${rows.map(([n,t,k])=>`<tr><th scope="row">${n}</th>${S.map(s=>`<td>${mk(t,k,s)}</td>`).join('')}</tr>`).join('')}</tbody>`;
}

// ---------- Comportamiento global (5D) ----------
const closeTop=()=>{
  if($('#modal').classList.contains('open'))$('#modal')._cancel?.();
  else if($('#drawer').classList.contains('open'))closeLayer($('#drawer'));
  else{$('#sidebar').classList.remove('open');$('#menuBtn').setAttribute('aria-expanded','false')}
};
document.addEventListener('keydown',e=>{
  if(e.key==='Escape')closeTop();
  if(e.key==='/'&&!/INPUT|TEXTAREA|SELECT/.test(e.target.tagName)){e.preventDefault();location.hash='#/servidores';setTimeout(()=>$('#q').focus(),50)}
});
$('#backdrop').onclick=closeTop;
$('#modal').onclick=e=>{if(e.target.id==='modal')closeTop()};
$('#menuBtn').onclick=()=>$('#menuBtn').setAttribute('aria-expanded',$('#sidebar').classList.toggle('open'));

initTheme();initDrawer();initRouter();summary();table();guide();tick();
setInterval(tick,2000);
