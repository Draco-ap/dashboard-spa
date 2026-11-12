// Utilidades compartidas: selectores, estado de carga, toast y capas (drawer/modal)
export const $=(s,r=document)=>r.querySelector(s);
export const $$=(s,r=document)=>[...r.querySelectorAll(s)];
export const sleep=ms=>new Promise(r=>setTimeout(r,ms));
export function setLoading(b,on){b.setAttribute('aria-busy',on);b.disabled=on}

let tt;
export function toast(t){const e=$('#toast');e.textContent=t;e.classList.add('show');clearTimeout(tt);tt=setTimeout(()=>e.classList.remove('show'),3000)}

// Mantiene el foco atrapado en la capa superior y sincroniza el fondo oscuro
export function sync(){
  const m=$('#modal').classList.contains('open'),d=$('#drawer').classList.contains('open');
  $('.app').inert=m||d;$('#drawer').inert=m||!d;$('#modal').inert=!m;
  $('#backdrop').classList.toggle('show',m||d);
}
export function openLayer(el){
  el._ret=document.activeElement;el.classList.add('open');sync();
  setTimeout(()=>($('[data-focus]',el)||$('input,select,textarea,button',el))?.focus(),60);
}
export function closeLayer(el){el.classList.remove('open');sync();el._ret?.focus()}
