import {$,$$} from './ui.js';

// Router SPA por hash: #/dashboard, #/servidores, #/componentes
const R={dashboard:'Dashboard',servidores:'Servidores',componentes:'Guía de componentes'};
let cur=null,prev=null;

export function initRouter(){
  const go=()=>{
    const h=location.hash.replace('#/',''),k=R[h]?h:'dashboard';
    if(cur&&cur!==k)prev=cur;
    cur=k;
    $$('[data-view]').forEach(v=>v.hidden=v.id!=='view-'+k);
    // ¿Dónde estoy?
    $$('#sidebar a').forEach(a=>a.getAttribute('href')==='#/'+k?a.setAttribute('aria-current','page'):a.removeAttribute('aria-current'));
    // ¿De dónde vengo? / ¿A dónde puedo ir?
    $('#crumbs').innerHTML=`<ol><li><a href="#/dashboard">Inicio</a></li><li aria-current="page">${R[k]}</li></ol>`+(prev?`<a href="#/${prev}">← Volver a ${R[prev]}</a>`:'');
    document.title=`${R[k]} · CloudWatch`;
    $('#sidebar').classList.remove('open');$('#menuBtn').setAttribute('aria-expanded','false');
  };
  addEventListener('hashchange',()=>{go();$('#main').focus()});
  go();
}
