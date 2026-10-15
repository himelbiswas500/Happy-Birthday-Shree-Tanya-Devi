/* Page router: curtain transition. The screen dips into the next page's own colour, pages swap unseen, curtain lifts. */
let cur=$('#lights'),busy=false;
const veil=document.createElement('div');
veil.style.cssText='position:fixed;inset:0;z-index:40;opacity:0;pointer-events:none;transition:opacity .3s ease';document.body.append(veil);
function show(id){cur.classList.remove('on');cur=$(id);cur.classList.add('on')}
function go(id,after){if(busy)return false;busy=true;const n=$(id);
  veil.style.background=n.style.getPropertyValue('--bg')||(id==='#lights'?'#000':'linear-gradient(180deg,var(--s3),var(--s2) 50%,var(--s1))');
  veil.style.opacity=1;
  setTimeout(()=>{show(id);after&&after();requestAnimationFrame(()=>{veil.style.opacity=0;setTimeout(()=>busy=false,320)})},320);return true}
