/** Canvas models are illustrative: distances, spin rates and strain are rescaled. */
export function drawVoyagers(ctx:CanvasRenderingContext2D,size:number,progress:number){
 ctx.save();ctx.strokeStyle='rgba(103,232,249,.18)';ctx.setLineDash([5,7]);ctx.beginPath();ctx.ellipse(-size*.9,0,size*1.05,size*.7,0,0,2*Math.PI);ctx.stroke();ctx.setLineDash([]);
 ctx.fillStyle='#fbbf24';ctx.beginPath();ctx.arc(-size*.9,0,5,0,2*Math.PI);ctx.fill();ctx.font='11px sans-serif';ctx.fillStyle='#94a3b8';ctx.fillText('Sun',-size*.9-10,23);ctx.fillText('Heliopause • schematic',-size*.7,size*.7);
 [0,1].forEach(i=>{
  const x=size*(.25+progress*.6),y=(i===0?-1:1)*size*(.35+progress*.18);
  ctx.strokeStyle='rgba(148,163,184,.3)';ctx.beginPath();ctx.moveTo(-size*.7,0);ctx.lineTo(x,y);ctx.stroke();
  ctx.save();ctx.translate(x,y);ctx.scale(size/200,size/200);ctx.rotate(i===0?-.25:.25);
  // Dish faces inward toward Earth; spacecraft bus, feed supports and three RTGs.
  const metal=ctx.createLinearGradient(-28,-25,28,25);metal.addColorStop(0,'#f8fafc');metal.addColorStop(.5,'#94a3b8');metal.addColorStop(1,'#475569');
  ctx.fillStyle='#b89c55';ctx.fillRect(-6,0,27,16);ctx.strokeStyle='#e2e8f0';ctx.strokeRect(-6,0,27,16);
  ctx.fillStyle=metal;ctx.beginPath();ctx.ellipse(-12,-10,14,29,-.25,0,2*Math.PI);ctx.fill();ctx.stroke();
  ctx.strokeStyle='#e2e8f0';ctx.lineWidth=1;ctx.beginPath();ctx.moveTo(-18,-34);ctx.lineTo(-36,-11);ctx.lineTo(-4,14);ctx.moveTo(-36,-11);ctx.lineTo(-28,-10);ctx.stroke();
  ctx.strokeStyle='#94a3b8';ctx.lineWidth=2;ctx.beginPath();ctx.moveTo(16,8);ctx.lineTo(69,25);ctx.moveTo(12,2);ctx.lineTo(26,-42);ctx.lineTo(34,-44);ctx.stroke();
  ctx.fillStyle='#64748b';ctx.fillRect(26,-49,15,10);ctx.fillStyle='#0f172a';ctx.fillRect(36,-46,8,6);
  for(let j=0;j<3;j++){ctx.save();ctx.translate(38+j*11,16+j*3.5);ctx.rotate(.3);ctx.fillStyle='#3f3f46';ctx.fillRect(-4,-8,10,16);ctx.strokeStyle='#a1a1aa';for(let f=0;f<4;f++){ctx.beginPath();ctx.moveTo(-5+f*3,-8);ctx.lineTo(-5+f*3,8);ctx.stroke();}ctx.restore();}
  ctx.strokeStyle='#94a3b8';ctx.lineWidth=1;ctx.beginPath();ctx.moveTo(13,8);ctx.lineTo(83,-20);ctx.moveTo(13,8);ctx.lineTo(71,52);ctx.stroke();ctx.restore();
  ctx.fillStyle='#cbd5e1';ctx.font='12px sans-serif';ctx.fillText(`Voyager ${i+1}`,x-size*.12,y+size*.35);
 });ctx.restore();
}
export function drawMerger(ctx:CanvasRenderingContext2D,size:number,progress:number){
 const u=Math.min(.995,progress/.76),orbit=size*.42*Math.pow(1-u,.25),angle=40*(1-Math.pow(1-u,.625));
 // Outgoing quadrupolar strain contours: deliberately exaggerated for visibility.
 for(let i=0;i<20;i++){const emitted=i*.038;if(emitted>progress||emitted>.82)continue;const radius=(progress-emitted)*size*3.8;if(radius<5)continue;ctx.strokeStyle=`rgba(103,180,255,${.32*Math.exp(-(progress-emitted)*2)})`;ctx.lineWidth=1.4;ctx.beginPath();for(let j=0;j<=160;j++){const a=j/160*2*Math.PI,dist=radius*(1+.045*Math.cos(2*a-angle*2));const x=dist*Math.cos(a),y=dist*Math.sin(a)*.72;if(j===0)ctx.moveTo(x,y);else ctx.lineTo(x,y);}ctx.stroke();}
 const hole=(x:number,y:number,r:number)=>{ctx.save();const halo=ctx.createRadialGradient(x,y,r*.7,x,y,r*1.5);halo.addColorStop(0,'#000');halo.addColorStop(.7,'rgba(148,163,184,.25)');halo.addColorStop(1,'rgba(0,0,0,0)');ctx.fillStyle=halo;ctx.beginPath();ctx.arc(x,y,r*1.5,0,2*Math.PI);ctx.fill();ctx.fillStyle='#000';ctx.beginPath();ctx.arc(x,y,r,0,2*Math.PI);ctx.fill();ctx.restore();};
 if(progress<.76){for(const sign of [-1,1])hole(sign*orbit*Math.cos(angle),sign*orbit*Math.sin(angle)*.72,size*.065);}else{const ringdown=(progress-.76)/.24;hole(0,0,size*.095);ctx.strokeStyle=`rgba(167,139,250,${.5*Math.exp(-ringdown*5)})`;ctx.beginPath();ctx.ellipse(0,0,size*.12*(1+.07*Math.sin(ringdown*30)),size*.12*(1-.07*Math.sin(ringdown*30)),0,0,2*Math.PI);ctx.stroke();}
 ctx.font='11px sans-serif';ctx.fillStyle='#94a3b8';ctx.textAlign='center';ctx.fillText(progress<.76?'Inspiral • orbital and wave frequencies rise':'Merger → damped ringdown',0,-size*.85);
 ctx.strokeStyle='#f472b6';ctx.lineWidth=1.5;ctx.beginPath();for(let j=0;j<=280;j++){const t=j/280*.98,up=Math.min(.995,t/.76),phase=80*(1-Math.pow(1-up,.625)),amp=t<.76?Math.min(1,.16/Math.pow(1-up,.25)):Math.exp(-(t-.76)*20),signal=amp*Math.sin(t<.76?phase:phase+(t-.76)*150);const x=(t-.49)*size*2.2,y=size*.9-signal*size*.15;if(j===0)ctx.moveTo(x,y);else ctx.lineTo(x,y);}ctx.stroke();ctx.fillStyle='#94a3b8';ctx.fillText('Illustrative chirp • strain enlarged, not a fit to measured data',0,size*1.15);ctx.textAlign='start';
}
