/* Audio: ONE music channel (old track fades out, THEN the new one fades in) + independent sound effects.
   Put the mp3s in the audio/ folder (names in SND). A missing file just stays silent. */
const AUDIO_DIR='audio/',LOOP_GAP=2500;
const SND={cricket:'CricketNoise.mp3',loading:'Loading.mp3',tumtum:'TumTum.mp3',bday:'HappyBirthdayToYouJi.mp3',dandelions:'Dandelions.mp3',turn:'PageTurn.mp3',pop:'pop.mp3',boom:'vineboom.mp3',blow:'blow.mp3',power:'PowerOut.mp3',wish:'WishJars.mp3',gift:'gift.mp3',lid:'lid.mp3',candle:'candle.mp3',lightup:'lightup.mp3'};
const AC=new (window.AudioContext||window.webkitAudioContext)();
const wake=()=>{if(AC.state==='suspended')AC.resume()};

class Track{
  constructor(name){this.a=new Audio(AUDIO_DIR+SND[name]);this.a.volume=0;this.name=name;this.on=true;
    // loop with a silent gap
    this.a.onended=()=>{if(!this.on)return;this.t=setTimeout(()=>{if(this.on){this.a.currentTime=0;this.a.play().catch(()=>{})}},LOOP_GAP)}}
  ramp(to,ms,done){clearInterval(this.iv);const f=this.a.volume,t0=performance.now();
    this.iv=setInterval(()=>{const k=Math.min(1,(performance.now()-t0)/Math.max(ms,1));this.a.volume=f+(to-f)*k;if(k>=1){clearInterval(this.iv);done&&done()}},40)}
  play(ms){this.a.play().then(()=>{if(!this.on){this.a.pause();return}this.ramp(1,ms)}).catch(()=>{this.blocked=true})} // if it was stopped while still starting, never let it fade back in
  stop(ms,done){this.on=false;clearTimeout(this.t);this.ramp(0,ms,()=>{this.a.pause();done&&done()})}
  kill(){this.on=false;clearTimeout(this.t);clearInterval(this.iv);this.a.pause()}
}
const Music={cur:null,fading:null,id:0,
  // play(name, {out: fade-out ms of the old track, inn: fade-in ms of the new one}); play(null) just stops the music
  play(name,o={}){if(name&&this.cur&&this.cur.name===name&&this.cur.on)return;
    const id=++this.id,out=o.out??500,inn=o.inn??1000;
    if(this.fading)this.fading.kill();
    const old=this.cur;this.cur=null;
    const next=()=>{if(id!==this.id)return;this.fading=null;if(name){this.cur=new Track(name);this.cur.play(inn)}};
    if(old){this.fading=old;old.stop(out,next)}else next()},
  cut(){this.id++;[this.cur,this.fading].forEach(t=>t&&t.kill());this.cur=this.fading=null},
  unlock(){wake();const t=this.cur;if(t&&t.on&&t.blocked){t.blocked=false;t.play(800)}}
};
function sfx(name,vol=1){const a=new Audio(AUDIO_DIR+SND[name]);a.volume=vol;a.play().catch(()=>{});return a}
const turn=()=>sfx('turn');
function tone(f,d,type='sine',v=.25,slide=0){const t=AC.currentTime,o=AC.createOscillator(),g=AC.createGain();o.type=type;o.frequency.setValueAtTime(f,t);if(slide)o.frequency.exponentialRampToValueAtTime(slide,t+d);g.gain.setValueAtTime(v,t);g.gain.exponentialRampToValueAtTime(.001,t+d);o.connect(g);g.connect(AC.destination);o.start(t);o.stop(t+d)}
const ping=()=>{tone(988,.25);setTimeout(()=>tone(1318,.35),120)};
let popBad=false;const popProbe=new Audio(AUDIO_DIR+SND.pop);popProbe.onerror=()=>popBad=true;
const popSfx=()=>popBad?tone(600,.12,'square',.2,90):sfx('pop');
