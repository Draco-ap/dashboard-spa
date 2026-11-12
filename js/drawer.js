import {$,$$,openLayer,closeLayer,setLoading,sleep,toast} from './ui.js';

export function initDrawer(){
  const d=$('#drawer'),f=$('#cfgForm');
  $('#openDrawer').onclick=()=>openLayer(d);
  $$('#closeDrawer,#cancelCfg').forEach(b=>b.onclick=()=>closeLayer(d));
  f.onsubmit=async e=>{
    e.preventDefault();
    if(!f.reportValidity())return;
    const b=$('#saveBtn');setLoading(b,true);await sleep(1000);setLoading(b,false);
    closeLayer(d);toast('Cambios guardados');
  };
}
