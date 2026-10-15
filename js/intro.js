/* Page: dark intro (the crickets start as soon as the browser allows sound, otherwise on her first tap) */
const DK0="Psst... it's dark in here. Somebody forgot to pay the electricity bill 💸";
function armLights(){$('#dk').textContent=DK0;$('#lon').classList.remove('show');setTimeout(()=>$('#lon').classList.add('show'),1800)}
armLights();
$('#lon').onclick=()=>{if(busy||cur.id!=='lights')return;wake();$('#bulb').classList.add('on');
  tone(220,.06,'square',.2);setTimeout(()=>tone(330,.08,'square',.15),70);
  Music.play(null,{out:300}); // crickets stop first, then Loading starts
  const f=document.createElement('div');f.style.cssText='position:fixed;inset:0;z-index:70;pointer-events:none;background:radial-gradient(circle,#fffbe0,#ffe9a6);transition:opacity 1.6s ease-out';document.body.append(f);
  go('#loader',()=>{window.startLoader();Music.play('loading',{inn:800})});
  requestAnimationFrame(()=>requestAnimationFrame(()=>f.style.opacity=0));setTimeout(()=>f.remove(),1900)};

/* Page: loading screen (the bar goes backwards on purpose, to troll her) */
const LT=[['Preparing something special...',20],['Brewing sky-blue magic... (it\'s mostly food coloring)',40],['Inflating balloons... (my lungs filed a complaint)',60],['Loading age counter... error: too old!',80],['Almost there...',99],['Wait... why is the bar going backwards? 🤨',25],['Fixing it. (Kicking the server.) 🦶',85],['Done!',100]];
let loaded=document.readyState==='complete';addEventListener('load',()=>loaded=true);
window.startLoader=()=>{const t=$('#lt'),pb=$('#pb');let i=0;
  const set=k=>{t.style.opacity=0;setTimeout(()=>{t.textContent=LT[k][0];t.style.opacity=1},250);pb.style.width=LT[k][1]+'%';pb.style.background=k===5?'#ff9aa2':'#fff'};
  pb.style.transition='none';pb.style.width='0%';void pb.offsetWidth;pb.style.transition='';t.textContent=LT[0][0];t.style.opacity=1;pb.style.width=LT[0][1]+'%';
  const iv=setInterval(()=>{set(++i);if(i===LT.length-1){clearInterval(iv);const fin=()=>loaded?go('#p1',()=>Music.play('tumtum',{out:300,inn:800})):setTimeout(fin,300);setTimeout(fin,1300)}},1500)};

/* Page: headphones warning */
const TT=["Heard it? Congrats, you're not deaf 🎉","Louder?! Your neighbours will hate me 😅","Still nothing? Check the mute switch, detective 🕵️","Ping! That's the sound of me being right 🔔"];let tt=0;
$('#test').onclick=()=>{wake();ping();$('#test').textContent=TT[tt++%TT.length]};
$('#go2').onclick=()=>{wake();go('#p2',()=>{turn();Music.play('bday',{out:300,inn:1000});startFun()})};
