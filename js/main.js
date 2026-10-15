/* Boot: crickets on the dark intro; the first tap unlocks audio if the browser blocked autoplay */
Music.play('cricket',{inn:800});
// browsers only allow sound after a real gesture (on phones that is touchend/click, NOT pointerdown)
['pointerup','click','keydown','touchend'].forEach(ev=>addEventListener(ev,e=>{if(e.target.closest&&e.target.closest('#lon'))return;Music.unlock()},true));
