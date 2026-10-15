/* Page: goofy birthday blast (balloons, gift greeting, cake ritual) + hand-off to the quiet page */
let score=0,bt;const TZ0=$('#tz').textContent;
const BC=['#7dd3fc','#38bdf8','#bae6fd','#f9a8d4','#c4b5fd','#fde68a','#a7f3d0'];
const TZ={5:"Warming up. Gentle fingers, grandma.",15:"Okay okay, someone's competitive.",30:"Touch grass. Or at least a balloon. Oh wait.",50:"50 pops! Is that your age? Kidding. (Maybe.)"};
const SURP=[['🎁','SURPRISE! You won... absolutely nothing. Congrats 🎉'],['🍰','Free cake unlocked! Pickup location: my imagination. Bring a spoon.'],['⭐','+1000 aura. Spend it wisely. (You won\'t.)'],['🪩','Mandatory dance unlocked. Do it. Nobody is watching. (I am.)'],['💌','A very important letter has arrived: "ur old" 😭'],['🧸','Free hug coupon! Valid for emotional damage only.']];
function toast(m){const t=document.createElement('div');t.className='toast';t.textContent=m;document.body.append(t);setTimeout(()=>t.remove(),3200)}
function boom(x,y){sfx('boom');burst(x,y,120,{v:14});const f=document.createElement('div');f.textContent='💣 BOOM!';
  f.style.cssText='position:fixed;inset:0;z-index:60;display:grid;place-items:center;font:700 4rem Fredoka,sans-serif;color:#fff;background:#ff3b3b88;pointer-events:none;animation:shk .15s 4,fo .9s forwards';
  document.body.append(f);setTimeout(()=>f.remove(),950);toast('Plot twist: that one was a bomb. Skill issue. 💀')}
function spawn(){const b=document.createElement('div');b.className='bln';const z=R(58,92),r=Math.random(),kind=r<.1?'bomb':r<.32?'surprise':'plain',sp=kind==='surprise'?pick(SURP):null;
  b.style.cssText=`left:${R(0,Math.max(10,innerWidth-z))}px;width:${z}px;height:${z*1.22}px;background:radial-gradient(circle at 30% 25%,#ffffffcc,${pick(BC)} 62%);animation-duration:${R(6,11)}s;--sw:${R(-70,70)}px`;
  if(sp)b.textContent=sp[0];
  b.onpointerdown=e=>{e.preventDefault();wake();b.remove();if(kind==='bomb')return boom(e.clientX,e.clientY);
    burst(e.clientX,e.clientY,28,{v:8});popSfx();if(sp){burst(e.clientX,e.clientY,40,{v:10});toast(sp[1])}
    $('#sc').textContent=++score;if(TZ[score])$('#tz').textContent=TZ[score]};
  b.onanimationend=()=>b.remove();$('#bl').append(b)}
function startFun(){clearInterval(bt);spawn();bt=setInterval(spawn,850)}
function stopFun(){clearInterval(bt);$('#bl').innerHTML=''}

const gift=$('#gift');
function openGift(){if(gift.classList.contains('open'))return;wake();gift.classList.add('open');sfx('gift');const r=gift.getBoundingClientRect();burst(r.left+70,r.top+30,90,{a:-Math.PI/2,s:2.6,v:13});
  $('#mh').textContent='HAPPY BIRTHDAY TANYA! 🥳✨';$('#mp').textContent='Another year older, but definitely not wiser!';$('#msg').classList.remove('hide')}
gift.onclick=openGift;gift.onkeydown=e=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();openGift()}};

// cake ritual: lift the lid > candles > light > blow
const cake=$('#cake'),blow=$('#blow');let st=0;
const NT=['Lift the lid 🍽️','Put the candles on 🕯️','Light them up 🔥','Blow them out 💨','Again! 🔁'],
CN=['Something delicious is hiding under there. Lift the lid. Slowly. Dramatically.','Cake acquired. Now for the sacred candles...','Candles on. Fire safety? Never heard of her.','Lit! Take a deep breath and make a wish...','Wish granted*. (*Terms apply. Cake is not optional.)'];
const setSt=n=>{st=n;blow.textContent=NT[n];$('#cn').textContent=CN[n]};
blow.onclick=()=>{wake();const g=$('#bg');
  if(st===0){g.classList.add('open');const r=g.getBoundingClientRect();burst(r.left+r.width/2,r.top+40,70,{a:-Math.PI/2,s:2.6,v:12});sfx('lid');setTimeout(()=>{g.style.display='none';cake.classList.remove('hid');cake.classList.add('show')},700);setSt(1)}
  else if(st===1){cake.classList.remove('nc');cake.classList.add('drop');sfx('candle');setSt(2)}
  else if(st===2){cake.classList.remove('out');sfx('lightup');setSt(3)}
  else if(st===3){sfx('blow');cake.classList.add('out');
    cake.querySelectorAll('.cd i').forEach(c=>{for(let k=0;k<4;k++){const s=document.createElement('span');s.className='smoke';s.style.cssText=`--dx:${R(-30,30)}px;animation-delay:${k*.25}s`;c.append(s);setTimeout(()=>s.remove(),3000)}});
    setTimeout(()=>{burst(0,innerHeight,90,{a:-Math.PI/3,s:.9,v:20});burst(innerWidth,innerHeight,90,{a:-2*Math.PI/3,s:.9,v:20});popSfx()},350);setSt(4)}
  else{cake.className='cake hid nc out';g.style.display='';g.classList.remove('open');setSt(0)}};

// goofy music stops -> a completely silent page -> Dandelions begins with the messages
$('#go3').onclick=()=>{wake();go('#pq',()=>{Music.play(null,{out:700});stopFun()})};
$('#goL').onclick=()=>{wake();go('#L0',()=>{turn();Music.play('dandelions',{inn:1500})})};
