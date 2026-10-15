/* ---------- Confetti ---------- */
const cv=$('#fx'),cx=cv.getContext('2d');let P=[];
const COL=['#7dd3fc','#38bdf8','#ffffff','#fde68a','#f9a8d4','#c4b5fd','#86efac'];
const fit=()=>{cv.width=innerWidth;cv.height=innerHeight};addEventListener('resize',fit);fit();
function burst(x,y,n=40,o={}){for(let i=0;i<n;i++){const a=(o.a??R(0,6.283))+(o.s?R(-.5,.5)*o.s:0),v=(o.v||7)*R(.4,1);P.push({x,y,vx:Math.cos(a)*v,vy:Math.sin(a)*v,w:R(5,10),h:R(3,6),c:pick(COL),r:R(0,6),vr:R(-.3,.3),l:1})}}
(function loop(){cx.clearRect(0,0,cv.width,cv.height);P=P.filter(p=>p.l>0);for(const p of P){p.vy+=.22;p.vx*=.99;p.x+=p.vx;p.y+=p.vy;p.r+=p.vr;p.l-=.007;cx.save();cx.globalAlpha=Math.max(p.l,0);cx.translate(p.x,p.y);cx.rotate(p.r);cx.fillStyle=p.c;cx.fillRect(-p.w/2,-p.h/2,p.w,p.h);cx.restore()}requestAnimationFrame(loop)})();

