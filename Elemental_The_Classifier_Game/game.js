/* ELEMENTAL: The Last Classifier - game logic
 * Author: Akshith Kumar
 * Sections: data + KNN model -> save system -> screens -> arena engine -> powers -> dialogs -> game loop -> Codex book -> players
 * See docs/BEHIND_THE_SCENES.md for a walkthrough. */
const IMG={
 "map": "assets/map.jpg",
 "ice": "assets/ice.jpg",
 "fire": "assets/fire.jpg",
 "water": "assets/water.jpg",
 "earth": "assets/earth.jpg",
 "core": "assets/core.jpg"
};
const HJ={
 "kael": "assets/kael.png",
 "mira": "assets/mira.png",
 "eira": "assets/eira.png",
 "thorne": "assets/thorne.png"
};
const $=s=>document.querySelector(s),$$=s=>[...document.querySelectorAll(s)];
const EL={Fire:{i:'🔥',d:'Hot and energetic. Burns bright and fast.',s:'Temperature 75+ · Energy 70+'},Water:{i:'💧',d:'Soaked and flowing. Moisture dominates everything else.',s:'Moisture 80+'},Ice:{i:'❄️',d:'Freezing cold, with little temperature left.',s:'Temperature under 20'},Earth:{i:'🌿',d:'Heavy and steady. Dense bodies, medium temperature.',s:'Density 75+ · Temperature 40–60'}};
const NM=Object.keys(EL),FT=['Temperature','Moisture','Density','Energy'];
const RAW=[['Cinderling',91,14,38,88],['Ash Drake',86,9,48,94],['Ember Fox',78,22,31,82],['Magma Beetle',96,18,79,74],['Flare Wisp',83,28,19,97],['River Sprite',24,94,18,52],['Tide Serpent',38,88,42,71],['Coral Stag',31,82,65,59],['Mist Jelly',18,99,12,43],['Rain Caller',42,91,25,66],['Frost Lynx',8,27,68,35],['Glacier Hound',12,35,82,44],['Snow Wisp',4,48,16,29],['Crystal Ram',15,21,93,53],['Winter Moth',9,54,24,31],['Moss Golem',47,38,96,42],['Stoneback',55,26,91,57],['Root Stalker',39,63,77,61],['Bark Sentinel',44,49,86,48],['Jade Beetle',51,42,83,68]];
const DATA=RAW.map((r,i)=>({name:r[0],f:r.slice(1),label:NM[i/5|0],i}));
const TRAIN=DATA.filter(d=>d.i%5),TEST=DATA.filter(d=>!(d.i%5));
const HARD=['Magma Beetle','Jade Beetle','Root Stalker','Coral Stag','Stoneback','Ember Fox'].map(n=>DATA.find(d=>d.name===n));
/* ---- save system: several players per device, stored in localStorage ---- */
const KEY='elementalProfiles';let DB={p:[],c:null};try{DB=JSON.parse(localStorage.getItem(KEY))||DB}catch(e){}
let S={hero:0,xp:0,done:[]};
const saveDB=()=>{try{localStorage.setItem(KEY,JSON.stringify(DB))}catch(e){}};
const save=()=>{const p=DB.p.find(x=>x.id===DB.c);if(p){p.hero=S.hero;p.xp=S.xp;p.done=S.done}saveDB()};
function loadP(id){const p=DB.p.find(x=>x.id===id);if(!p)return;DB.c=id;S={hero:p.hero||0,xp:p.xp||0,done:p.done||[]};saveDB()}
const toast=m=>{const t=$('#to');t.textContent=m;t.classList.add('show');clearTimeout(toast.t);toast.t=setTimeout(()=>t.classList.remove('show'),2300)};
let ac;const beep=(f,d=.12)=>{try{ac=ac||new AudioContext();const o=ac.createOscillator(),g=ac.createGain();o.frequency.value=f;o.connect(g);g.connect(ac.destination);g.gain.setValueAtTime(.06,ac.currentTime);g.gain.exponentialRampToValueAtTime(.001,ac.currentTime+d);o.start();o.stop(ac.currentTime+d)}catch(e){}};
const sfx=ok=>ok?(beep(660),setTimeout(()=>beep(880),110)):beep(150,.3);
const fx=c=>{const p=$('#pl');p.classList.remove('shake','glow');void p.offsetWidth;p.classList.add(c)};
const dist=(a,b)=>Math.hypot(...a.map((v,i)=>v-b[i]));
function knn(f,tr,k){const nb=tr.map(d=>({d,x:dist(f,d.f)})).sort((a,b)=>a.x-b.x).slice(0,k),v={};nb.forEach(n=>v[n.d.label]=(v[n.d.label]||0)+1);const first=l=>nb.find(n=>n.d.label===l).x;return{label:Object.keys(v).sort((a,b)=>v[b]-v[a]||first(a)-first(b))[0],nb,v}}
const loo=(d,k)=>knn(d.f,TRAIN.filter(x=>x.name!==d.name),k);

const COL={};['Fire','Water','Ice','Earth'].forEach(n=>COL[n]=getComputedStyle(document.documentElement).getPropertyValue('--'+n).trim());
function plot(cv,ax,k,U,hl){const g=cv.getContext('2d'),W=cv.width,H=cv.height,N=30,b=U||[50,50,50,50];
 for(let x=0;x<N;x++)for(let y=0;y<N;y++){const f=[...b];f[ax[0]]=(x+.5)/N*100;f[ax[1]]=100-(y+.5)/N*100;g.fillStyle=COL[knn(f,TRAIN,k).label]+'55';g.fillRect(x*W/N,y*H/N,W/N+1,H/N+1)}
 g.font='13px sans-serif';g.fillStyle='#ccc';g.fillText(FT[ax[0]]+' →',W-110,H-8);g.fillText('↑ '+FT[ax[1]],8,16);const P=f=>[f[ax[0]]/100*W,H-f[ax[1]]/100*H];
 DATA.forEach(d=>{const[x,y]=P(d.f),h=hl&&hl.includes(d),t=!(d.i%5)&&!hl;g.beginPath();g.arc(x,y,h?8:6,0,7);g.fillStyle=COL[d.label];g.fill();g.lineWidth=h||t?3:1;g.strokeStyle=h||t?'#fff':'#000a';g.stroke()});
 if(!U)return;const r=knn(U,TRAIN,k);r.nb.forEach(n=>{const[a,b2]=P(U),[c,d]=P(n.d.f);g.beginPath();g.moveTo(a,b2);g.lineTo(c,d);g.strokeStyle='#fff9';g.stroke()});
 const[ux,uy]=P(U);g.beginPath();g.arc(ux,uy,10,0,7);g.fillStyle=COL[r.label];g.fill();g.lineWidth=3;g.strokeStyle='#fff';g.stroke();return r}
const PW={Fire:{n:'Fireball',i:'🔥',cost:20,d:'Hurl a blazing orb that destroys any Null Wisp it touches.',u:'Complete The Awakening (or choose Kael)'},
Water:{n:'Water Shield',i:'💧',cost:35,d:'Wrap yourself in a bubble for 3 seconds. Wisps cannot hurt you and are knocked away.',u:'Complete the Kingdom of Tides (or choose Mira)'},
Ice:{n:'Freeze',i:'❄️',cost:40,d:'Flash-freeze every wisp for 5 seconds. Frozen wisps are harmless, so you can walk right through them.',u:'Complete the Frozen Expanse (or choose Eira)'},
Earth:{n:'Stone Barrier',i:'🪨',cost:30,d:'Raise a stone wall that blocks wisps for 8 seconds. Perfect for guarding a path.',u:'Complete the Verdant Realm (or choose Thorne)'}};
const HE=[
{id:'kael',n:'Kael',t:'The Ember Vanguard',e:'Fire',st:'Born at the lip of the Ashen Caldera, Kael was the only child who ran toward the eruption. His staff’s ember-core has never gone out, and neither has his stubbornness.',q:'If it’s on fire, it’s probably on my side.',fun:'Fast and loud. Fireballs let you clear wisps from a distance.',at:{Power:5,Defense:2,Speed:4,Wisdom:3}},
{id:'mira',n:'Mira',t:'The Tide Weaver',e:'Water',st:'A tide-reader from the drowned archives, Mira remembers every wave she has ever met. She never panics. She simply flows around the problem.',q:'Patience is just a very slow wave.',fun:'The safest guardian. A bubble shield lets you walk through danger.',at:{Power:3,Defense:5,Speed:3,Wisdom:4}},
{id:'eira',n:'Eira',t:'The Frost Sentinel',e:'Ice',st:'Crowned by the glacier on the day she was born, Eira guards the frozen observatory. She is polite, precise, and terrifyingly good at stopping her enemies mid-step.',q:'Let’s all stay calm. I’ll handle the rest.',fun:'A control mage. Freeze every wisp at once, then stroll by.',at:{Power:3,Defense:3,Speed:2,Wisdom:5}},
{id:'thorne',n:'Thorne',t:'The Root Guardian',e:'Earth',st:'A grove-keeper whose cloak sprouts leaves when he’s happy (it is usually full of leaves). His floating stone companion, Pebble, does most of the arguing.',q:'Slow is steady. Steady wins.',fun:'A wall-builder. Block a path and dictate where the wisps go.',at:{Power:3,Defense:5,Speed:2,Wisdom:4}}];
const unl=e=>e===HE[S.hero].e||S.done[NM.indexOf(e)];
const CH=[
{t:'The Awakening',r:'Ashen Caldera',img:'fire',m:'cls',item:'🔸',rn:'Ember Shard',xp:250,need:3,story:'The sky over the Ashen Caldera has turned the colour of old blood. Small creatures pulse with unfamiliar light. The Classifier whispers: “I cannot name what I have never learned to observe.”',lesson:'FEATURES are measurements we observe. The LABEL is the class we want to predict.',obj:'Inspect 3 glowing creatures and classify them',how:['Walk to a glowing creature and press E.','Read its four feature bars (Temperature, Moisture, Density, Energy). Compare them with the element signatures below.','Tap the element you think it is. A wrong answer costs a heart.','When all 3 are classified, the door opens. Walk to it and press E.'],win:'Classify all 3 creatures correctly and walk through the door.'},
{t:'Kingdom of Tides',r:'Azure Reach',img:'water',m:'cur',item:'🔹',rn:'Tide Sigil',xp:400,need:6,story:'Beneath the Azure Reach an archive of living memories drifts between coral towers. The Keeper warns: a model learns only from the examples it is given, and careless labels poison its judgement.',lesson:'TRAINING DATA is a set of labelled examples. Wrong labels teach the model wrong things.',obj:'Inspect all 6 archive tablets and judge each label',how:['Walk to an archive tablet and press E. It shows a creature and the label the archive gave it.','Judge it: does the label match the features? Press “Label is correct” or “Poisoned!”.','Exactly 2 of the 6 labels are poisoned. A wrong judgement costs a heart.','Judge all 6, then use the door.'],win:'Judge all 6 tablets, keeping at least one heart.'},
{t:'The Frozen Expanse',r:'Glacier Crown',img:'ice',m:'cls',item:'💠',rn:'Frost Core',xp:550,need:3,test:1,story:'At Glacier Crown an observatory has slept for a thousand winters. Its crystal console can classify new creatures, but a model that only remembers its training data may fail when the world changes.',lesson:'We TEST a model on creatures it has never seen. ACCURACY = correct ÷ total.',obj:'Classify 3 unseen creatures and compare with the model',how:['These creatures were never in the model’s training data.','Classify each one yourself. Afterwards the model reveals its own prediction.','Compare your accuracy with the model’s. That is how we test a model.'],win:'Classify 3 unseen creatures correctly.'},
{t:'The Verdant Realm',r:'Elderroot Grove',img:'earth',m:'tune',item:'🍃',rn:'Rootstone',xp:700,need:1,story:'The roots of Elderroot remember every creature that ever crossed the forest. Here, signatures overlap. The Classifier must draw a boundary, but no boundary is perfect.',lesson:'A DECISION BOUNDARY separates regions of different predictions. K moves that boundary.',obj:'Use the Boundary Stone to find the best K',how:['Walk to the glowing Boundary Stone in the middle of the grove and press E.','The map shows what the model predicts everywhere. Ringed dots are 6 tricky creatures.','Slide K (how many neighbours vote) and press Test K. Find the K with the highest score.','Each wrong lock-in costs a heart. Then use the door.'],win:'Find the K that scores the most possible.'},
{t:'The Corrupted Core',r:'Null Sanctum',img:'core',m:'boss',item:'✦',rn:'Worldheart',xp:1000,need:5,hearts:4,story:'At the centre of the shattered world waits a creature with no true element. It imitates every class and its features are noisy. Reason from evidence and strike with the right classification.',lesson:'Final trial: real data is noisy. Trust evidence, not instinct.',obj:'Defeat the Null Sovereign: classify 5 disguised creatures',how:['Walk up to the Null Sovereign and press E. It throws a disguised creature at you.','Classify it. A correct answer wounds the boss. A wrong one hurts you (4 hearts this time).','Null Wisps still roam the arena: use your powers to survive.','Defeat the boss, then step through the door.'],win:'Land 5 correct classifications to destroy the Null Sovereign.'}];

/* ---- screens ---- */
function go(id){$$('.screen').forEach(s=>s.classList.toggle('on',s.id===id));scrollTo(0,0);if(id!=='play')T&&(T.pause=1);if(id==='map')drawMap();if(id==='lab')lab();if(id==='codex')turn(0)}
function hud(){$('#xp').textContent=S.xp+' XP';$('#items').textContent=CH.map((c,i)=>S.done[i]?c.item:'').join('')}
const bgOf=c=>`url(${IMG[c.img]})`;
function guard(){$('#gg').innerHTML=HE.map((h,i)=>`<div class="gc ${S.hero===i?'sel':''}" style="--c:var(--${h.e})"><img src="${HJ[h.id]}" alt="${h.n}"><em>${EL[h.e].i} ${h.e} · ${h.t}</em><h3>${h.n}</h3><p>${h.st}</p><q>“${h.q}”</q><div class="pwr"><b>${PW[h.e].i} ${PW[h.e].n}</b> · ${PW[h.e].d}</div><div class="at">${Object.entries(h.at).map(([k,v])=>`<span>${k}</span><i><b style="width:${v*20}%"></b></i>`).join('')}</div><p><b>Why it’s fun:</b> ${h.fun}</p><button class="btn ${S.hero===i?'':'gh'}" onclick="S.hero=${i};save();guard();toast('${h.n} chosen!')">${S.hero===i?'✓ Chosen':'Choose '+h.n}</button></div>`).join('')}
function drawMap(){$('#chs').innerHTML=CH.map((c,i)=>{const lk=i&&!S.done[i-1];return`<button class="ch ${lk?'lk':''}" style="background-image:${bgOf(c)}" onclick="${lk?"toast('Complete the previous realm first')":`intro(${i})`}"><i>${lk?'🔒 Locked':S.done[i]?'✓ '+c.item:'Chapter '+(i+1)}</i><div><small>${c.r}</small><h3>${c.t}</h3><p>${c.lesson.split('.')[0]}.</p></div></button>`}).join('')}
function intro(i,again){const c=CH[i],h=HE[S.hero];
 $('#mb').innerHTML=`<p class="kick">Chapter ${i+1} · ${c.r}</p><h2>${c.t}</h2><p style="color:#d8d1c4">${c.story}</p><h4>How to play this level</h4><ol>${c.how.map(x=>`<li>${x}</li>`).join('')}</ol><h4>Controls</h4><p style="color:#d8d1c4"><kbd>←</kbd><kbd>→</kbd> or <kbd>A</kbd><kbd>D</kbd> walk · <kbd>E</kbd> interact · <kbd>Space</kbd> cast power · <kbd>1</kbd>–<kbd>4</kbd> / <kbd>Q</kbd> switch power. On a phone use the buttons under the arena.</p><h4>The four elements (what to look for)</h4><div class="eg">${NM.map(n=>`<div style="--c:var(--${n})"><b>${EL[n].i} ${n}</b><br>${EL[n].d}<br><small>${EL[n].s}</small></div>`).join('')}</div><h4>Your power · ${h.n}</h4><p style="color:#d8d1c4">${PW[h.e].i} <b>${PW[h.e].n}</b>: ${PW[h.e].d} Costs ${PW[h.e].cost} energy. Energy refills over time. Beat realms to unlock the other elements’ powers.</p><h4>Dangers</h4><p style="color:#d8d1c4">Null Wisps drift through the realm. Touching one costs a heart. Lose all your hearts and your guardian falls.</p><h4>How to win</h4><p style="color:#d8d1c4">${c.win}</p><p style="margin-top:18px"><button class="btn" onclick="${again?'closeM();T&&(T.pause=T.dlg?1:0)':`closeM();start(${i})`}">${again?'Got it':'Begin the trial →'}</button> ${again?'':'<button class="btn gh" onclick="closeM()">Back</button>'}</p>`;$('#md').classList.add('open');if(again&&T)T.pause=1}
const closeM=()=>$('#md').classList.remove('open');

/* ---- arena ---- */
const BG={},SP={};Object.keys(IMG).forEach(k=>{BG[k]=new Image();BG[k].src=IMG[k]});Object.keys(HJ).forEach(k=>{SP[k]=new Image();SP[k].src=HJ[k]});
const CW=960,CH2=460,GY=400,cvA=$('#ac'),g=cvA.getContext('2d'),K={},COSTS=n=>PW[n].cost;
const SPK=[...Array(40)].map(()=>({x:Math.random()*CW,y:Math.random()*CH2,s:.5+Math.random(),p:Math.random()*6}));
let T=null,last=0,hk='';
function start(i){const c=CH[i],W=c.m==='cur'?2400:c.m==='boss'?2100:1800;
 T={i,c,W,hp:c.hearts||3,mx:c.hearts||3,ok:0,tot:0,right:0,mana:100,inv:0,sh:0,cd:0,act:HE[S.hero].e,P:{x:90,f:1,w:0,t:0,v:0},E:[],wis:[],fb:[],br:[],pt:[],pause:0,dead:0,won:0,tt:0,dlg:0,need:c.need,near:null,seen:[],shake:0};
 const add=(x,o)=>T.E.push({x,st:0,...o});
 if(c.m==='cls'){const p=c.test?TEST:TRAIN;[...p].sort(()=>Math.random()-.5).slice(0,3).forEach((d,k)=>add(520+k*400,{type:'spec',d:{...d}}))}
 if(c.m==='cur'){const six=[...DATA].sort(()=>Math.random()-.5).slice(0,6).map(d=>({...d,shown:d.label,bad:0}));six.slice(0,2).forEach(x=>{const o=NM.filter(n=>n!==x.label);x.shown=o[Math.random()*3|0];x.bad=1});six.sort(()=>Math.random()-.5).forEach((d,k)=>add(420+k*300,{type:'tab',d}))}
 if(c.m==='tune'){const sc=[1,2,3,4,5,6,7,8,9].map(k=>HARD.filter(d=>loo(d,k).label===d.label).length);T.bs=Math.max(...sc);T.best=sc.indexOf(T.bs)+1;T.sc=sc;add(900,{type:'altar'})}
 if(c.m==='boss')add(1400,{type:'boss',hp:5});
 add(W-110,{type:'door'});
 const n=c.m==='boss'?4:3,sp=(W-700)/n;for(let k=0;k<n;k++)T.wis.push({x:330+k*sp+sp/2,a:330+k*sp,b:330+k*sp+sp+160,d:k%2?1:-1,ph:k,fz:0,dead:0,rt:0});
 $('#dlg').classList.remove('open');$('#over').classList.remove('open');cvA.classList.remove('fallen');$('#dlg').innerHTML='';
 go('play');mt()}
function mt(){const c=T.c,h=HE[S.hero];const k=T.hp+'|'+T.act+'|'+T.ok+'|'+Math.round(T.mana/5)+S.done.join('');if(k===hk)return;hk=k;
 $('#hd').innerHTML=`<span class="h">${'♥'.repeat(T.hp)}${'♡'.repeat(T.mx-T.hp)}</span><span>Energy <i class="mn"><b style="width:${T.mana}%"></b></i></span><span>${NM.map((n,i)=>unl(n)?`<b class="sl ${T.act===n?'on':''}" title="${PW[n].n}">${PW[n].i}<i>${i+1}</i></b>`:`<b class="sl lk" title="Locked">?<i>${i+1}</i></b>`).join('')}</span><span style="margin-left:auto;color:var(--mute)">${h.n} · ${c.r}</span>`;
 $('#obj').innerHTML=`<b>Goal:</b> ${c.obj} <b style="color:var(--gold)">${Math.min(T.ok,T.need)}/${T.need}</b>${T.ok>=T.need?' · <b style="color:#7fe0a0">The door is open!</b>':''}`}
function dmg(why){if(T.inv>0||T.dead||T.won)return false;T.hp--;T.inv=1.6;T.shake=.4;sfx(0);burst(T.P.x,GY-80,'#ff6b6b',14);mt();if(why)toast(why);if(T.hp<=0){die();return true}return false}
function die(){T.dead=1;T.dt=0;T.pause=0;$('#dlg').classList.remove('open');T.dlg=0;cvA.classList.add('fallen');setTimeout(()=>{$('#over').innerHTML=`<h2>YOU HAVE FALLEN</h2><p style="max-width:440px;color:#e8c9c9">${HE[S.hero].n} collapses as the light fades… The wisps swarm in. Hint: ${['Compare features with the element signatures in the how-to-play guide.','Read every tablet’s numbers carefully before judging.','Your accuracy matters: look at all four features, not just one.','Try small K and large K and see how the answer changes.','Use your power to keep wisps away while you walk.'][T.i]}</p><button class="btn big" onclick="start(T.i)">↻ Rise again</button> <button class="btn gh" onclick="intro(T.i,1)">? How to play</button>`;$('#over').classList.add('open')},1300)}
function burst(x,y,c,n){for(let i=0;i<n;i++)T.pt.push({x,y,vx:(Math.random()-.5)*260,vy:-Math.random()*220,l:.7+Math.random()*.5,c})}
function cast(){if(!T||T.pause||T.dead||T.won||T.cd>0)return;const e=T.act,p=PW[e];if(T.mana<p.cost)return toast('Not enough energy. It refills over time.');T.mana-=p.cost;T.cd=.35;const P=T.P;sfx(1);
 if(e==='Fire')T.fb.push({x:P.x+P.f*60,y:GY-100,vx:P.f*560});
 if(e==='Water')T.sh=3.5;if(e==='Ice'){T.wis.forEach(w=>w.fz=5);T.fzt=5;burst(P.x,GY-80,'#a9dcff',30)}
 if(e==='Earth')T.br.push({x:P.x+P.f*100,t:8});burst(P.x,GY-80,getComputedStyle(document.documentElement).getPropertyValue('--'+e),12);mt()}
function pick(n){if(!T)return;const e=NM[n];if(!unl(e))return toast('🔒 Locked. Win more realms to discover this power!');T.act=e;mt()}
function act(){if(!T||T.pause||T.dead||T.won)return;const e=T.near;if(!e)return;
 if(e.type==='door')return T.ok>=T.need?win():toast(`The door is sealed (${T.ok}/${T.need}).`);
 if(e.st&&e.type!=='boss')return toast('Already done.');
 if(e.type==='spec')dlgCls(e);if(e.type==='tab')dlgTab(e);if(e.type==='altar')dlgTune(e);if(e.type==='boss'){if(e.hp<=0)return;const b=DATA[Math.random()*20|0];dlgCls(e,{name:'Disguised '+b.name.split(' ').pop(),label:b.label,f:b.f.map(v=>Math.max(2,Math.min(99,v+(Math.random()*26-13)|0)))})}}
function open(h){T.pause=1;T.dlg=1;$('#dlg').innerHTML=h;$('#dlg').classList.add('open')}
function close(){T.pause=0;T.dlg=0;$('#dlg').classList.remove('open');mt();if(T.hp<=0&&!T.dead)die()}
function dlgCls(e,nd){const d=nd||e.d,c=T.c;
 open(`<div style="width:min(580px,100%)"><div class="card"><div class="orb" id="orb">?</div><h3>${d.name}</h3><p class="sub">Unknown element · read the features and classify</p>${FT.map((n,i)=>`<div class="ft"><span>${n}</span><i><b style="width:${d.f[i]}%"></b></i><span>${d.f[i]}</span></div>`).join('')}</div><div class="opts" style="margin:12px 0">${NM.map(n=>`<button class="opt" data-n="${n}"><span>${EL[n].i}</span>${n}</button>`).join('')}</div><div class="fb" id="fb"></div></div>`);
 $$('.opt').forEach(b=>b.onclick=()=>{const good=b.dataset.n===d.label;T.tot++;$$('.opt').forEach(o=>{o.disabled=true;if(o.dataset.n===d.label)o.classList.add('ok')});
  if(good){T.right++;T.ok++;sfx(1);if(e.type==='spec')e.st=1;if(e.type==='boss'){e.hp--;T.shake=.5;for(let i=0;i<4;i++)T.fb.push({x:T.P.x+60+i*30,y:GY-100,vx:600,boss:1});burst(e.x,GY-120,'#c9a3ff',30)}}else{b.classList.add('bad');dmg()}
  $('#orb').style.setProperty('--oc',`var(--${d.label})`);$('#orb').textContent=EL[d.label].i;const m=knn(d.f,TRAIN.filter(x=>x.name!==d.name),3);
  $('#fb').innerHTML=`<div class="card"><b>${good?'✓ Correct: '+d.label:'✗ It was '+d.label}</b><p>${good?'Your reading matched the label.':'Its signature: '+EL[d.label].s+'.'}</p>${c.test||c.m==='boss'?`<p>The model predicted <b>${m.label}</b> ${m.label===d.label?'✓':'✗'} · your accuracy <b>${T.right}/${T.tot}</b> (${Math.round(T.right/T.tot*100)}%)</p>`:''}<p>Nearest labelled neighbours: ${m.nb.map(n=>n.d.name+' ('+n.d.label+')').join(', ')}</p><button class="btn" id="cb">${good?'Continue':'Try again'}</button></div>`;
  $('#cb').onclick=()=>{close();if(!good&&e.type==='spec'&&T.hp>0)setTimeout(()=>dlgCls(e),50)};mt()})}
function dlgTab(e){const d=e.d;
 open(`<div style="width:min(520px,100%)"><div class="card"><p class="kick" style="text-align:center">Archive tablet</p><h3>${d.name}</h3><p class="sub">The archive labels this creature as:</p><p style="text-align:center;font-size:24px;font-weight:700;color:var(--${d.shown})">${EL[d.shown].i} ${d.shown}</p>${FT.map((n,i)=>`<div class="ft"><span>${n}</span><i><b style="width:${d.f[i]}%"></b></i><span>${d.f[i]}</span></div>`).join('')}<p class="sub" style="margin-top:10px">Does the label match the features?</p><div style="display:flex;gap:10px;justify-content:center"><button class="btn" id="ok1">✓ Label is correct</button><button class="btn gh" id="ok2">✗ Poisoned!</button></div><div class="fb" id="fb" style="margin-top:10px"></div></div></div>`);
 const f=bad=>{const good=!!d.bad===!!bad;e.st=bad?2:1;T.ok++;T.tot++;if(good){T.right++;sfx(1)}else dmg();$('#fb').innerHTML=`<p><b>${good?'✓ Well judged!':'✗ Not quite.'}</b> ${d.bad?`This label was poisoned. It is really <b>${d.label}</b>.`:'This label was correct.'}</p><button class="btn" id="cb">Continue</button>`;$('#cb').onclick=close;$('#ok1').disabled=$('#ok2').disabled=true;mt()};$('#ok1').onclick=()=>f(0);$('#ok2').onclick=()=>f(1)}
function dlgTune(e){open(`<div style="width:min(560px,100%)"><div class="card"><h3>The Boundary Stone</h3><p class="sub">Ringed dots are 6 tricky creatures. Find the K that classifies the most of them.</p><canvas id="tc" width="540" height="330" style="cursor:default"></canvas><p style="margin-top:8px">K = <b id="tk">3</b><input id="tr" type="range" min="1" max="9" value="3"></p><button class="btn" id="tb">Test K</button> <button class="btn gh" id="tx">Leave</button><div class="fb" id="fb" style="margin-top:8px"></div></div></div>`);
 const d=()=>plot($('#tc'),[0,2],+$('#tr').value,null,HARD);d();$('#tr').oninput=()=>{$('#tk').textContent=$('#tr').value;d()};$('#tx').onclick=close;
 $('#tb').onclick=()=>{const k=+$('#tr').value,s=T.sc[k-1],good=s===T.bs;if(good){T.ok=1;e.st=1;sfx(1)}else dmg();
  $('#fb').innerHTML=`<p><b>K = ${k}: ${s}/6 correct.</b> ${HARD.map(h=>h.name+' '+(loo(h,k).label===h.label?'✓':'✗')).join(' · ')}</p><p>${good?'That is the best any K can do. Small K follows noise; large K blurs the boundary.':'Another K can do better. Try again.'}</p>${good?'<button class="btn" id="cb">Continue</button>':''}`;if(good)$('#cb').onclick=close;mt();if(T.hp<=0)close()}}
function win(){T.won=1;const c=T.c,first=!S.done[T.i],pe=T.i<4?NM[T.i]:null,had=pe&&unl(pe);if(first){S.done[T.i]=true;S.xp+=c.xp}save();hud();sfx(1);setTimeout(()=>sfx(1),200);
 $('#mb').innerHTML=`<div style="text-align:center"><div class="orb" style="--oc:var(--gold);width:100px;height:100px;font-size:46px">${c.item}</div><p class="kick">Realm restored</p><h2>${c.t} complete!</h2><p style="color:#d8d1c4">${T.i===4?'The Null Sovereign shatters. The elements flow back across the bridge and the world is whole again. You are the Last Classifier.':'The door opens onto the next realm.'}</p><h4>Rewards</h4><p style="font-size:18px">${c.item} <b>${c.rn}</b> · +${c.xp} XP</p>${pe&&!had?`<div class="pwr" style="--c:var(--${pe});text-align:left;margin-top:10px"><b>✨ New power discovered: ${PW[pe].i} ${PW[pe].n}</b><br>${PW[pe].d}<br><small>Press <kbd>${NM.indexOf(pe)+1}</kbd> to equip it in your next realm.</small></div>`:''}<p style="margin-top:16px">${T.i<4?`<button class="btn" onclick="closeM();intro(${T.i+1})">Next realm →</button> `:''}<button class="btn gh" onclick="closeM();go('map')">Realm map</button> <button class="btn gh" onclick="closeM();go('codex')">Open the Codex</button></p></div>`;$('#md').classList.add('open')}

/* loop */
function upd(dt){const P=T.P;T.tt+=dt;T.cd-=dt;T.inv-=dt;T.sh-=dt;T.shake-=dt;if(T.fzt>0)T.fzt-=dt;
 if(T.dead){T.dt+=dt;return}
 SPK.forEach(s=>{s.y-=s.s*10*dt;if(s.y<0)s.y=CH2});
 for(let i=T.pt.length;i--;){const p=T.pt[i];p.x+=p.vx*dt;p.y+=p.vy*dt;p.vy+=500*dt;if((p.l-=dt)<=0)T.pt.splice(i,1)}
 if(T.pause||T.won)return;
 const mv=(K.right?1:0)-(K.left?1:0);P.v=mv*235;P.x=Math.max(50,Math.min(T.W-50,P.x+P.v*dt));if(mv)P.f=mv;P.w=mv?P.w+dt*11:0;T.mana=Math.min(100,T.mana+13*dt);
 T.br=T.br.filter(b=>(b.t-=dt)>0);
 T.wis.forEach(w=>{if(w.dead){if((w.rt-=dt)<=0){w.dead=0;w.x=w.a}return}if(w.fz>0){w.fz-=dt;return}w.x+=w.d*95*dt;if(w.x<w.a)w.d=1;if(w.x>w.b)w.d=-1;
  T.br.forEach(b=>{if(Math.abs(w.x-b.x)<34){w.d=w.x<b.x?-1:1;w.x+=w.d*8}});
  if(Math.abs(w.x-P.x)<38){if(T.sh>0){w.d=w.x<P.x?-1:1;w.x+=w.d*30}else if(T.inv<=0){dmg();P.x-=Math.sign(w.x-P.x||1)*50}}});
 for(let i=T.fb.length;i--;){const f=T.fb[i];f.x+=f.vx*dt;let hit=0;if(!f.boss)T.wis.forEach(w=>{if(!w.dead&&Math.abs(w.x-f.x)<34){w.dead=1;w.rt=7;hit=1;burst(w.x,GY-90,'#ff9a5c',18)}});if(hit||f.x>T.W||f.x<0||(f.boss&&f.x>1400-20))T.fb.splice(i,1)}
 T.near=null;let bd=95;T.E.forEach(e=>{const d=Math.abs(e.x-P.x);if(d<bd){bd=d;T.near=e}});
 if(T.i===4){const b=T.E.find(e=>e.type==='boss');if(b&&b.hp<=0&&!T.wis.every(w=>w.dead))T.wis.forEach(w=>{w.dead=1;w.rt=999})}
 if(T.ok>=T.need)T.E.forEach(e=>{if(e.type==='door')e.open=1});mt()}
function draw(){const P=T.P,c=T.c,cam=Math.max(0,Math.min(T.W-CW,P.x-CW/2)),im=BG[c.img];g.setTransform(1,0,0,1,0,0);g.clearRect(0,0,CW,CH2);
 const sx=T.shake>0?(Math.random()-.5)*10:0;g.translate(sx,0);
 if(im.complete&&im.naturalWidth){const ww=CW*1.25,hh=Math.max(CH2,ww*im.naturalHeight/im.naturalWidth);g.drawImage(im,-cam*.18-10,0,ww,hh*1.0)}
 let gr=g.createLinearGradient(0,0,0,CH2);gr.addColorStop(0,'rgba(60,30,70,.25)');gr.addColorStop(.6,'rgba(30,15,30,.1)');gr.addColorStop(1,'rgba(8,6,12,.75)');g.fillStyle=gr;g.fillRect(0,0,CW,CH2);
 const sg=g.createRadialGradient(780,80,5,780,80,110);sg.addColorStop(0,'rgba(255,225,160,.9)');sg.addColorStop(.3,'rgba(255,200,120,.35)');sg.addColorStop(1,'rgba(255,200,120,0)');g.fillStyle=sg;g.fillRect(600,0,360,220);
 g.fillStyle='rgba(255,215,140,.85)';SPK.forEach(s=>{g.globalAlpha=.4+.4*Math.sin(T.tt*2+s.p);g.fillRect(s.x,s.y,s.s*2,s.s*2)});g.globalAlpha=1;
 const grd=g.createLinearGradient(0,GY-4,0,CH2);grd.addColorStop(0,'#3a2c36');grd.addColorStop(1,'#0e0b12');g.fillStyle=grd;g.fillRect(0,GY,CW,CH2-GY);g.fillStyle='rgba(255,200,140,.35)';g.fillRect(0,GY,CW,2);
 g.translate(-cam,0);
 T.E.forEach(e=>{const bob=Math.sin(T.tt*2+e.x)*5;g.save();g.translate(e.x,GY);
  if(e.type==='door'){g.strokeStyle=e.open?'#ffd98a':'#4a4560';g.lineWidth=10;g.fillStyle=e.open?'rgba(255,220,140,.55)':'rgba(10,8,20,.85)';g.shadowColor='#ffd98a';g.shadowBlur=e.open?40:0;g.beginPath();g.moveTo(-55,0);g.lineTo(-55,-130);g.arc(0,-130,55,Math.PI,0);g.lineTo(55,0);g.closePath();g.fill();g.stroke();g.shadowBlur=0;g.font='30px serif';g.textAlign='center';g.fillText(e.open?'✨':'🔒',0,-70)}
  else if(e.type==='spec'||e.type==='boss'){const bs=e.type==='boss',r=bs?70:30,col=e.st?getComputedStyle(document.documentElement).getPropertyValue('--'+e.d.label):(bs?'#c9a3ff':'#e0ad45');
   if(bs&&e.hp<=0){g.globalAlpha=.25}g.shadowColor=col;g.shadowBlur=30;const rg=g.createRadialGradient(0,-60+bob,4,0,-60+bob,r);rg.addColorStop(0,'#fff');rg.addColorStop(.35,col);rg.addColorStop(1,'rgba(20,10,30,.9)');g.fillStyle=rg;g.beginPath();g.arc(0,-(bs?110:60)+bob,r,0,7);g.fill();g.shadowBlur=0;g.font=(bs?54:30)+'px serif';g.textAlign='center';g.fillStyle='#111';g.fillText(e.st?EL[e.d.label].i:bs?'👁':'?',0,-(bs?95:50)+bob);
   if(bs){g.fillStyle='#0008';g.fillRect(-60,-200,120,9);g.fillStyle='#e0524a';g.fillRect(-60,-200,120*Math.max(0,e.hp)/5,9);g.fillStyle='#fff';g.font='12px sans-serif';g.fillText('NULL SOVEREIGN',0,-208)}g.globalAlpha=1}
  else if(e.type==='tab'){g.fillStyle=e.st?'#3b3b4a':'#5a566a';g.strokeStyle=e.st===2?'#ff6b6b':e.st?'#7fe0a0':'#e0ad45';g.lineWidth=3;g.shadowColor=g.strokeStyle;g.shadowBlur=e.st?0:18;g.fillRect(-30,-110,60,110);g.strokeRect(-30,-110,60,110);g.shadowBlur=0;g.fillStyle=g.strokeStyle;g.font='28px serif';g.textAlign='center';g.fillText(e.st===2?'✗':e.st?'✓':'ᚠ',0,-55)}
  else if(e.type==='altar'){g.fillStyle='#4a4a58';g.fillRect(-34,-60,68,60);g.shadowColor=e.st?'#7fe0a0':'#c9a3ff';g.shadowBlur=35;g.fillStyle=e.st?'#7fe0a0':'#c9a3ff';g.beginPath();g.moveTo(0,-140+bob);g.lineTo(26,-95+bob);g.lineTo(0,-60+bob);g.lineTo(-26,-95+bob);g.fill();g.shadowBlur=0}
  g.restore()});
 T.br.forEach(b=>{g.fillStyle='#6b6b78';g.strokeStyle='#8fcf74';g.lineWidth=2;for(let k=-1;k<=1;k++){g.beginPath();g.rect(b.x-16+k*14,GY-90+Math.abs(k)*18,26,90-Math.abs(k)*18);g.fill();g.stroke()}});
 T.wis.forEach(w=>{if(w.dead)return;const y=GY-95+Math.sin(T.tt*3+w.ph)*14;g.save();g.translate(w.x,y);g.shadowColor=w.fz>0?'#a9dcff':'#c9a3ff';g.shadowBlur=22;g.fillStyle=w.fz>0?'#cfeaff':'#3a2358';g.beginPath();g.arc(0,0,26,0,7);g.fill();g.fillStyle=w.fz>0?'#4a7aa8':'#e7c8ff';g.shadowBlur=0;g.fillRect(-12,-6,7,9);g.fillRect(5,-6,7,9);g.restore()});
 T.fb.forEach(f=>{const rg=g.createRadialGradient(f.x,f.y,2,f.x,f.y,22);rg.addColorStop(0,'#fff');rg.addColorStop(.4,'#ff9a5c');rg.addColorStop(1,'rgba(255,80,20,0)');g.fillStyle=rg;g.beginPath();g.arc(f.x,f.y,22,0,7);g.fill()});
 /* hero */
 const im2=SP[HE[S.hero].id],H=175,Wd=im2.naturalWidth?H*im2.naturalWidth/im2.naturalHeight:100;g.save();g.translate(P.x,GY);g.fillStyle='rgba(0,0,0,.35)';g.beginPath();g.ellipse(0,2,48,9,0,0,7);g.fill();
 if(T.dead){const k=Math.min(1,T.dt*2.2);g.translate(0,k*20);g.rotate(k*1.5*P.f);g.globalAlpha=Math.max(.35,1-T.dt*.35)}
 else{g.translate(0,-Math.abs(Math.sin(P.w))*(P.v?7:0));g.rotate(Math.sin(P.w)*(P.v?.035:0));g.scale(1,1+Math.sin(T.tt*2.4)*.012)}
 if(T.inv>0&&!T.dead&&Math.floor(T.tt*14)%2)g.globalAlpha=.45;g.scale(P.f,1);if(im2.naturalWidth)g.drawImage(im2,-Wd/2,-H,Wd,H);g.restore();
 if(T.sh>0){g.strokeStyle='rgba(120,210,255,.9)';g.fillStyle='rgba(80,180,255,.2)';g.lineWidth=4;g.beginPath();g.arc(P.x,GY-85,Math.min(100,60+T.sh*80),0,7);g.fill();g.stroke()}
 if(T.near&&!T.pause&&!T.dead){const e=T.near,t=e.type==='door'?(T.ok>=T.need?'Enter the door':'Sealed'):e.st&&e.type!=='boss'?'Done':e.type==='tab'?'Read tablet':e.type==='altar'?'Use the stone':e.type==='boss'?'Face the boss':'Inspect';g.font='bold 14px sans-serif';g.textAlign='center';const w=g.measureText('[E] '+t).width+22;g.fillStyle='rgba(0,0,0,.75)';g.fillRect(P.x-w/2,GY-215,w,26);g.fillStyle='#ffd98a';g.fillText('[E] '+t,P.x,GY-197)}
 g.fillStyle='#fff';T.pt.forEach(p=>{g.globalAlpha=Math.max(0,p.l);g.fillStyle=p.c;g.fillRect(p.x-2,p.y-2,5,5)});g.globalAlpha=1;
 g.setTransform(1,0,0,1,0,0);const v=g.createRadialGradient(480,230,200,480,230,560);v.addColorStop(0,'rgba(0,0,0,0)');v.addColorStop(1,T.dead?'rgba(140,0,0,.65)':'rgba(0,0,0,.55)');g.fillStyle=v;g.fillRect(0,0,CW,CH2)}
function loop(t){const dt=Math.min(.05,(t-last)/1000||0);last=t;if(T&&$('#play').classList.contains('on')){upd(dt);draw()}requestAnimationFrame(loop)}
addEventListener('keydown',e=>{if(!$('#play').classList.contains('on')||$('#md').classList.contains('open'))return;const k=e.key.toLowerCase();
 if(['arrowleft','arrowright',' ','e','q','a','d'].includes(k)||'1234'.includes(k)&&k.length==1)e.preventDefault();
 if(k==='arrowleft'||k==='a')K.left=1;if(k==='arrowright'||k==='d')K.right=1;
 if(!e.repeat){if(k==='e')act();if(k===' ')cast();if('1234'.includes(k)&&k.length==1)pick(+k-1);if(k==='q'&&T){let n=NM.indexOf(T.act);for(let i=0;i<4;i++){n=(n+1)%4;if(unl(NM[n]))break}pick(n)}}});
addEventListener('keyup',e=>{const k=e.key.toLowerCase();if(k==='arrowleft'||k==='a')K.left=0;if(k==='arrowright'||k==='d')K.right=0});
[['bl','left'],['br2','right']].forEach(([id,k])=>{const b=$('#'+id);['pointerdown'].forEach(ev=>b.addEventListener(ev,()=>K[k]=1));['pointerup','pointerleave','pointercancel'].forEach(ev=>b.addEventListener(ev,()=>K[k]=0))});
$('#be').onclick=act;$('#bs').onclick=cast;requestAnimationFrame(loop);

/* ---- codex book ---- */
const SPREADS=[()=>[`<small>The Ancient Codex</small><h3>Chronicle of the Last Classifier</h3><p>When the elements lost their names, the world forgot how to tell fire from flood. This book records the guardians who remember, and the powers that answer them.</p><div class="ru">Turn the page to meet the guardians. Powers you have not yet earned are sealed behind a <b>?</b>.</div>`,`<small>Contents</small><ol><li>The four guardians</li><li>Powers of the elements</li><li>The language of the Classifier</li></ol><p style="margin-top:20px"><b>Relics collected:</b> ${CH.map((c,i)=>S.done[i]?c.item+' '+c.rn:'<span style="opacity:.4">? ? ?</span>').join(' · ')}</p>`],
...HE.map(h=>()=>[`<small>${h.e} · ${h.t}</small><h3>${h.n}</h3><img src="${HJ[h.id]}" alt="${h.n}">`,`<small>Origin</small><p>${h.st}</p><div class="ru">“${h.q}”</div><p><b>Power:</b> ${PW[h.e].i} ${PW[h.e].n}. ${PW[h.e].d}</p>${Object.entries(h.at).map(([k,v])=>`<p style="margin:2px 0;font-size:13px">${k}: ${'★'.repeat(v)}${'☆'.repeat(5-v)}</p>`).join('')}<p><b>Why play ${h.n}?</b> ${h.fun}</p>`]),
...NM.map(n=>()=>{const u=unl(n),p=PW[n];return[u?`<small>Power · ${n}</small><h3>${p.i} ${p.n}</h3><p>${p.d}</p><p><b>Cost:</b> ${p.cost} energy</p>`:`<small>Power · Undiscovered</small><div class="q">?</div><h3 style="text-align:center">???</h3>`,u?`<small>How to use</small><p>Press <kbd style="color:#000;border-color:#000">${NM.indexOf(n)+1}</kbd> to equip it, then <kbd style="color:#000;border-color:#000">Space</kbd> to cast.</p><div class="ru">${n==='Fire'?'Best against wisps from far away.':n==='Water'?'Walk straight through danger while the bubble holds.':n==='Ice'?'Freeze them all, then walk past without a scratch.':'Block a path and wisps turn around.'}</div>`:`<small>What it does</small><p>${p.d}</p><div class="ru">Sealed. Unlock it by: ${p.u}.</div>`]}),
()=>[`<small>Glossary</small><h3>Words of the Classifier</h3><p><b>Feature</b>: a measurable property.</p><p><b>Label</b>: the class we want to predict.</p><p><b>Training data</b>: labelled examples the model learns from.</p>`,`<small>&nbsp;</small><p><b>Test data</b>: unseen examples used to check the model.</p><p><b>Accuracy</b>: correct predictions ÷ all predictions.</p><p><b>KNN</b>: predict by majority vote of the K closest labelled examples.</p><p><b>Decision boundary</b>: the border between predicted classes.</p>`]];
let pgi=0;function turn(d){pgi=Math.max(0,Math.min(SPREADS.length-1,pgi+d));const s=SPREADS[pgi](),el=$('#pgs');el.innerHTML=`<div>${s[0]}</div><div>${s[1]}</div>`;el.classList.remove('t');void el.offsetWidth;if(d)el.classList.add('t');$('#pn').textContent=`Page ${pgi+1} / ${SPREADS.length}`}
$('#start .hs').style.backgroundImage=`url(${IMG.map})`;
/* ---- players (profiles) ---- */
const esc=s=>String(s).replace(/[&<>"']/g,c=>'&#'+c.charCodeAt(0)+';'),cur=()=>DB.p.find(x=>x.id===DB.c);
function refresh(){const p=cur();$('#who').textContent='👤 '+(p?p.name:'Player');guard();hud();if($('#map').classList.contains('on'))drawMap();if($('#codex').classList.contains('on'))turn(0)}
function pickP(id){loadP(id);closeM();refresh();toast('Welcome, '+cur().name+'!')}
function addP(){const n=$('#nm').value.trim();if(!n)return toast('Type a name first');if(DB.p.length>=4)return;const id='p'+Date.now();DB.p.push({id,name:n.slice(0,14),hero:0,xp:0,done:[]});loadP(id);closeM();refresh();toast('Welcome, '+n+'! Choose your guardian on the start page.');go('start')}
function resetP(id){const p=DB.p.find(x=>x.id===id);if(!p||!confirm('Reset all progress for '+p.name+'? Realms, XP and relics will be erased.'))return;p.xp=0;p.done=[];p.hero=0;if(id===DB.c)loadP(id);saveDB();refresh();if($('#md').classList.contains('open'))profiles();toast('Progress reset')}
function delP(id){const p=DB.p.find(x=>x.id===id);if(!p||!confirm('Delete player '+p.name+' and all their progress?'))return;DB.p=DB.p.filter(x=>x.id!==id);if(DB.c===id){DB.c=DB.p[0]?DB.p[0].id:null;if(DB.c)loadP(DB.c)}saveDB();refresh();profiles()}
function profiles(){$('#mb').innerHTML=`<p class="kick">Players on this device</p><h2>Who’s playing?</h2><p style="color:#d8d1c4">Each player has their own guardian, XP, relics and unlocked powers. Up to 4 players can share this device.</p><div class="pl">${DB.p.map(p=>`<div class="pr ${p.id===DB.c?'on':''}"><button class="pn" onclick="pickP('${p.id}')"><b>${esc(p.name)}</b><small>${HE[p.hero||0].n} · ${p.xp||0} XP · ${(p.done||[]).filter(Boolean).length}/5 realms</small></button><button class="mini" onclick="resetP('${p.id}')">↺ Reset</button><button class="mini" onclick="delP('${p.id}')">🗑</button></div>`).join('')||'<p style="color:var(--gold)">Create your first player to begin.</p>'}</div>${DB.p.length<4?`<div class="add"><input id="nm" maxlength="14" placeholder="New player name" onkeydown="if(event.key==='Enter')addP()"><button class="btn" onclick="addP()">+ Add player</button></div>`:'<p style="color:var(--mute)">Maximum of 4 players reached.</p>'}${DB.c?'<p style="margin-top:14px"><button class="btn gh" onclick="closeM()">Close</button></p>':''}`;$('#md').classList.add('open')}
(function boot(){if(!DB.p.length){try{const o=JSON.parse(localStorage.getItem('elem3'));if(o&&(o.xp||(o.done||[]).length)){DB.p.push({id:'p1',name:'Player 1',hero:o.hero||0,xp:o.xp||0,done:o.done||[]});DB.c='p1'}}catch(e){}}
 if(DB.p.length&&!cur())DB.c=DB.p[0].id;if(DB.c)loadP(DB.c);refresh();if(!DB.p.length)profiles()})();

/* lab */
let U=[72,28,43,80],AX=[0,1];
function lab(){const k=+$('#k').value;$('#kt').textContent=k;const r=plot($('#cv'),AX,k,U);let ok=0;TEST.forEach(d=>{if(knn(d.f,TRAIN,k).label===d.label)ok++});
 $('#acc').innerHTML=`Trained on ${TRAIN.length}, tested on ${TEST.length} unseen → <b>${Math.round(ok/TEST.length*100)}% accuracy</b>`;U.forEach((v,i)=>{$('#u'+i).textContent=v;$('#s'+i).value=v});
 $('#rs').innerHTML=`${EL[r.label].i} Predicts <b>${r.label}</b><br><small>Neighbours: ${r.nb.map(n=>n.d.name).join(', ')}</small>`}
['ax','ay'].forEach((id,j)=>{$('#'+id).innerHTML=FT.map((n,i)=>`<option value="${i}" ${i===AX[j]?'selected':''}>${n}</option>`).join('');$('#'+id).onchange=e=>{AX[j]=+e.target.value;lab()}});
$('#sl').innerHTML=FT.map((n,i)=>`<label>${n} <b id="u${i}"></b><input id="s${i}" type="range" min="0" max="100" oninput="U[${i}]=+this.value;lab()"></label>`).join('');$('#k').oninput=lab;
$('#cv').onclick=e=>{const r=e.target.getBoundingClientRect();U[AX[0]]=Math.round((e.clientX-r.left)/r.width*100);U[AX[1]]=Math.round(100-(e.clientY-r.top)/r.height*100);lab()};
