import {$} from './ui.js';

// Modo oscuro: sigue al sistema (prefers-color-scheme) hasta que la persona lo cambia con el toggle
export function initTheme(){
  const root=document.documentElement,btn=$('#themeBtn'),sys=matchMedia('(prefers-color-scheme: dark)');
  const saved=localStorage.getItem('theme');if(saved)root.dataset.theme=saved;
  const isDark=()=>root.dataset.theme?root.dataset.theme==='dark':sys.matches;
  const paint=()=>btn.setAttribute('aria-pressed',isDark());
  btn.onclick=()=>{root.dataset.theme=isDark()?'light':'dark';localStorage.setItem('theme',root.dataset.theme);paint()};
  sys.onchange=paint;paint();
}
