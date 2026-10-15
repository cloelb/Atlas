// Small lightweight walkable scene used for validating game-feel. Deliberately independent of DOM panels.
export function createWorld({onArrive,onStep}){
  const root=document.getElementById('game'),camera=document.getElementById('camera'),avatar=document.getElementById('world-avatar');
  const W=1536,H=1024;
  const destinations={
    maison:{path:[[610,765],[530,740]],call:'maison'},
    mairie:{path:[[750,705],[745,630],[735,555]],call:'mairie'},
    bibliotheque:{path:[[860,760],[970,708],[1030,690]],call:'bibliotheque'},
    pavillon:{path:[[905,755],[1110,690],[1240,585]],call:'pavillon'}
  };
  let player={x:710,y:790},target=null,route=[],arrival=null,scale=1,ox=0,oy=0,pressed=new Set(),last=0,live=true;
  let lastWalkSound=0;
  function fit(){
    const w=root.clientWidth,h=root.clientHeight;
    scale=Math.max(w/W,h/H,0.52); // Fill viewport. The camera follows the traveler on narrow screens.
    reposition();
  }
  function reposition(){
    const w=root.clientWidth,h=root.clientHeight;
    ox=Math.min(0,Math.max(w-W*scale,w/2-player.x*scale));
    oy=Math.min(0,Math.max(h-H*scale,h*.69-player.y*scale));
    camera.style.transform=`translate3d(${ox}px,${oy}px,0) scale(${scale})`;
    avatar.style.left=player.x+'px';avatar.style.top=player.y+'px';
  }
  function walkTo(x,y,call=null){
    route=[[Math.max(330,Math.min(1295,x)),Math.max(510,Math.min(840,y))]];
    target=route.shift();arrival=call;onStep?.('En chemin…');
  }
  function go(place){
    const d=destinations[place];if(!d)return;
    route=[...d.path];target=route.shift();arrival=d.call;onStep?.('Le sentier t’attend…');
  }
  function update(dt){
    let vx=0,vy=0;
    if(pressed.has('ArrowLeft')||pressed.has('a'))vx--;
    if(pressed.has('ArrowRight')||pressed.has('d'))vx++;
    if(pressed.has('ArrowUp')||pressed.has('w'))vy--;
    if(pressed.has('ArrowDown')||pressed.has('s'))vy++;
    const manual=Boolean(vx||vy);
    if(manual){target=null;route=[];arrival=null;const l=Math.hypot(vx,vy)||1;player.x+=vx/l*dt*240;player.y+=vy/l*dt*240}
    else if(target){const dx=target[0]-player.x,dy=target[1]-player.y,d=Math.hypot(dx,dy),step=dt*275;
      if(d<=step){player.x=target[0];player.y=target[1];if(route.length)target=route.shift();else{target=null;if(arrival){const a=arrival;arrival=null;onArrive?.(a)}}}
      else{player.x+=dx/d*step;player.y+=dy/d*step}
      vx=dx;vy=dy;
    }
    player.x=Math.max(330,Math.min(1295,player.x));player.y=Math.max(510,Math.min(845,player.y));
    avatar.classList.toggle('walking',manual||!!target);
    avatar.classList.toggle('facing-left',vx<0);
    if(manual||target){avatar.style.zIndex=String(Math.floor(player.y))}
    reposition();
  }
  function frame(t){if(!live)return;const dt=last?Math.min(.05,(t-last)/1000):0;last=t;update(dt);requestAnimationFrame(frame)}
  function onPointer(e){if(e.target.closest('button,[role="dialog"],.rail,.top-hud,.game-bottom,.micro-map'))return;
    const r=root.getBoundingClientRect(),x=(e.clientX-r.left-ox)/scale,y=(e.clientY-r.top-oy)/scale;
    walkTo(x,y);
  }
  function onKey(e){if(e.target.closest('input,textarea,select,[contenteditable="true"]'))return;
    if(['ArrowLeft','ArrowRight','ArrowUp','ArrowDown','w','a','s','d'].includes(e.key)){
      if(document.getElementById('panel')?.getAttribute('aria-hidden')==='false')return;
      e.preventDefault();pressed.add(e.key);}}
  function onKeyUp(e){pressed.delete(e.key)}
  root.addEventListener('pointerdown',onPointer);
  window.addEventListener('keydown',onKey);window.addEventListener('keyup',onKeyUp);
  window.addEventListener('resize',fit);
  fit();requestAnimationFrame(frame);
  return {go,walkTo,repaint:reposition,disableKeys(){pressed.clear()},destroy(){live=false;root.removeEventListener('pointerdown',onPointer);window.removeEventListener('keydown',onKey);window.removeEventListener('keyup',onKeyUp);window.removeEventListener('resize',fit)}};
}
