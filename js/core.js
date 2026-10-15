/* Core helpers + sky decoration */
const $=s=>document.querySelector(s),R=(a,b)=>a+Math.random()*(b-a),pick=a=>a[Math.random()*a.length|0];

/* ---------- Sky decor ---------- */
(()=>{const s=$('#sky');
for(let i=0;i<6;i++){const c=document.createElement('div');c.className='cloud';c.style.cssText=`top:${R(4,80)}%;transform:scale(${R(.7,1.6)});animation-duration:${R(40,90)}s;animation-delay:-${R(0,80)}s`;s.append(c)}
for(let i=0;i<26;i++){const e=document.createElement('div');e.className='spk';e.textContent=pick(['✦','✧','⭐','·']);e.style.cssText=`left:${R(0,100)}%;top:${R(0,100)}%;font-size:${R(.6,1.5)}rem;animation-delay:-${R(0,3)}s`;s.append(e)}
for(let i=0;i<14;i++){const e=document.createElement('div');e.className='bub';const z=R(20,70);e.style.cssText=`left:${R(0,100)}%;width:${z}px;height:${z}px;animation-duration:${R(10,22)}s;animation-delay:-${R(0,20)}s`;s.append(e)}})();

