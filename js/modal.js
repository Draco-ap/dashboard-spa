import {$,openLayer,closeLayer,setLoading,sleep} from './ui.js';

// Modal de confirmación para acciones destructivas. Devuelve una promesa true/false.
export function confirmAction({title,text,label,danger}){
  const m=$('#modal'),ok=$('#mOk'),no=$('#mNo');
  $('#mTitle').textContent=title;$('#mText').textContent=text;
  ok.textContent=label;ok.className='btn '+(danger?'danger':'primary');
  openLayer(m);
  return new Promise(res=>{
    const done=v=>{ok.onclick=no.onclick=m._cancel=null;closeLayer(m);res(v)};
    no.onclick=()=>done(false);
    m._cancel=()=>{if(ok.getAttribute('aria-busy')!=='true')done(false)}; // Escape / clic fuera
    ok.onclick=async()=>{setLoading(ok,true);no.disabled=true;await sleep(1200);setLoading(ok,false);no.disabled=false;done(true)};
  });
}
