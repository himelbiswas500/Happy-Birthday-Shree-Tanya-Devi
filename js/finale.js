/* Last page: complaint card, wish jar, power-cut finale */
const LET2=`OFFICIAL COMPLAINT 📜
Filed against: Teerak (a.k.a. Tanya, but we've moved on)

• Says “5 mins, coming” and disappears long enough for me to question my entire existence.... 😭
• Acts cold, gets mad when I act cold back.... bhaisahab, THE HYPOCRISY 💀
• Starts beef with me and then somehow makes me miss her anyway.... actual witchcraft...
• Has me studying Teerakology just to understand what goes on in that head of hers....
• Now is a whole year older and STILL this chaotic.... WHERE'S THE CHARACTER DEVELOPMENT.. Plij grow up saar 😭🙏🏻

Court's verdict: guilty, but unfortunately too adorable to abandon, there's no going back 🔨💀
Sentence: one birthday cake, delivered personally to the face when we finally meet.... NO APPEALS ACCEPTED 🎂

From: Himel aka Willow`;
function fitCard(){const c=$('#flip'),fb=$('#ty'),keep=fb.textContent;c.style.height='10px';fb.textContent=LET2;const h=fb.scrollHeight;fb.textContent=keep;c.style.height=Math.max(h,260)+'px'}
fitCard();addEventListener('resize',fitCard);document.fonts&&document.fonts.ready.then(fitCard);
let typed=false;
$('#flip').onclick=function(){wake();this.classList.toggle('o');turn();if(typed)return;typed=true;let i=0;setTimeout(function t(){$('#ty').textContent=LET2.slice(0,++i);if(i<LET2.length)setTimeout(t,14)},700)};
const W=[['📶','May your Wi-Fi be strong and everyone else\'s be slow.'],['🍕','May you always get the last slice of pizza. (Share it with me.)'],['🔋','May your phone battery outlast your patience.'],['🗓️','May your Mondays get cancelled and weekends go unlimited.'],['⏰','May your year be so good your alarm clock feels bad for you.'],['💙','Stay the same kind of weird. It\'s honestly the best part of you.']];
function buildWishes(){$('#wg').innerHTML='';W.forEach(([e,m])=>{const b=document.createElement('button');b.className='wc';b.innerHTML=e+'<br>Tap me';
  b.onclick=ev=>{if(b.classList.contains('r'))return;wake();b.classList.add('r');b.innerHTML=m;burst(ev.clientX,ev.clientY,18,{v:6});sfx('wish',.7)};$('#wg').append(b)})}
buildWishes();

// put everything back the way it was, so the loop back to the start is clean
function resetState(){score=0;$('#sc').textContent=0;$('#tz').textContent=TZ0;
  gift.classList.remove('open');$('#msg').classList.add('hide');$('#mh').textContent='Tap the gift 👆';$('#mp').textContent="(No, it's not a bomb. Probably.)";
  cake.className='cake hid nc out';$('#bg').style.display='';$('#bg').classList.remove('open');setSt(0);
  $('#flip').classList.remove('o');typed=false;$('#ty').textContent='';buildWishes()}

// finale: black, music dies, PowerOut, funny lines, then a slow fade back into the dark intro
const blk=document.createElement('div');blk.id='blk';document.body.append(blk);
const FL=['Arre sala... light dobara bhaag gaya 💡🏃','Ye sala KHOMBA bhai se ek kaam sahi se ni hota 🤦‍♂️⚡','Chalo phir... lagta h aaj yehi program end karna padega 🫡🕯️'];
const FIRST=3000,GAP=4500;let fing=false;
function restart(){resetState();show('#lights');busy=false;$('#bulb').classList.remove('on');armLights();blk.classList.remove('on');fing=false}
$('#fin').onclick=()=>{if(fing)return;fing=true;wake();Music.cut();blk.innerHTML='';blk.classList.add('on');
  let n=0;const ready=()=>{if(++n===2)restart()};
  const a=sfx('power');let heard=false;const after=()=>{if(heard)return;heard=true;Music.play('cricket',{inn:600});ready()};a.onended=after;a.onerror=()=>setTimeout(after,400);
  FL.forEach((t,k)=>setTimeout(()=>{const d=document.createElement('div');d.textContent=t;d.style.animation=k===1?'up 1.2s both,shk .4s 2 .8s':'up 1.2s both';if(k===1)d.style.color='#ff6b6b';blk.append(d)},FIRST+k*GAP));
  setTimeout(ready,FIRST+(FL.length-1)*GAP+3500)};
