import { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { useReducedMotion } from 'framer-motion';
import JourneySound from './JourneySound';
import { drawVoyagers, drawMerger } from './journeyDynamics';
import { cosmicJourneyImages, type JourneyImage } from '@/data/cosmicJourneyImages';
const originalScenes=[
 {title:'Let’s change perspective.',caption:'The observatory opens a window onto the universe.',scale:'Your telescope',duration:2.5},
 {title:'Our small, blue home.',caption:'Every journey begins with a change of viewpoint.',scale:'Earth • ~10⁴ km',duration:3.5},
 {title:'A star, and its companions.',caption:'Our planetary neighborhood becomes a point of light.',scale:'Solar System • tens of AU',duration:4},
 {title:'A galaxy of stars.',caption:'Hubble’s real image of the Whirlpool Galaxy, M51, reveals spiral arms and its companion NGC 5195.',scale:'M51 • a neighboring spiral galaxy',duration:4.5},
 {title:'A thread of the cosmic web, observed.',caption:'ESO’s MUSE instrument reveals faint gas connecting two galaxies, overlaid in purple on a Hubble image. This is one observed filament, not a photograph of the entire web.',scale:'Observed filament • about 3 million light-years long',duration:4},
 {title:'Even light takes a curved path.',caption:'A thin-lens image-mapping model bends real galaxy imagery into arcs and an Einstein ring. This animation is illustrative; the next scene shows the real black-hole observation.',scale:'Gravitational lens • illustrative thin-lens view',duration:5},
 {title:'A black hole, actually observed.',caption:'The Event Horizon Telescope reconstructed M87* from radio observations. The bright plasma ring surrounds the black-hole shadow; this is not the background-source Einstein ring in the preceding animation.',scale:'M87* • real EHT observational image',duration:4.5},
 {title:'At the frontier of cosmic dawn.',caption:'JWST’s annotated COSMOS field highlights MoM-z14, seen only about 280 million years after the Big Bang. The tiny galaxy is magnified in the image inset.',scale:'MoM-z14 • z = 14.44 • farthest spectroscopically confirmed galaxy in NASA’s record, checked 12 Oct 2026',duration:6},
 {title:'Farther away. Further into the past.',caption:'The cosmic microwave background reaches us from when the universe was about 380,000 years old.',scale:'Earliest freely travelling cosmic light',duration:4.5},
 {title:'The Big Bang happened everywhere.',caption:'The hot, dense early universe expanded and cooled. This conceptual view is not a photograph or an explosion into empty space. Ordinary light cannot give us a direct image of the initial event.',scale:'Before the CMB • conceptual reconstruction',duration:6},
 {title:'ELT: more detail in the faintest light.',caption:'ESO’s Extremely Large Telescope aims to examine faint early galaxies and planetary systems in greater detail. A larger collecting area brings more photons; it does not let visible light pass through the opaque early universe.',scale:'Next-generation ground-based astronomy • ESO ELT',duration:5},
 {title:'LISA: another messenger from the cosmos.',caption:'ESA’s official infographic shows how LISA plans to measure gravitational waves. This is an illustration, not a wave photograph or LISA observation. The earlier black-hole merger scene links to actual recorded LIGO signals.',scale:'Gravitational waves • not a conventional light telescope',duration:5},
 {title:'Could another world be like ours?',caption:'NASA’s Habitable Worlds Observatory concept aims to directly image potentially habitable planets and study their atmospheres. This illustration uses Earth as a visual stand-in; atmospheric clues would not alone prove life.',scale:'Future mission concept • habitability and biosignature searches',duration:6},
 {title:'Worlds beyond our Sun, directly imaged.',caption:'Webb directly imaged four giant planets around HR 8799 by suppressing starlight. Their infrared colors also revealed carbon dioxide in their atmospheres; these are observed point sources, not photographs of surface landscapes.',scale:'Telescope discovery • exoplanets and atmospheric chemistry',duration:6},
 {title:'A spinning neutron star powers a nebula.',caption:'The Crab pulsar rotates about 30 times per second. Its surroundings are shown in real telescope data. The separate sweeping-beam inset is a slowed lighthouse model, not a resolved image of the star’s rotation.',scale:'Crab pulsar • observed nebula + illustrative rotation',duration:6},
 {title:'A quasar launches a river of radiation.',caption:'Hubble, Chandra and Spitzer reveal the enormous jet of quasar 3C 273. Accelerated charged particles emit synchrotron radiation. The small moving-jet inset illustrates the engine and is not part of the observed image.',scale:'Telescope discovery • relativistic jets across wavelengths',duration:6},
 {title:'An apparently empty sky contains galaxies.',caption:'Hubble’s Ultra Deep Field combined long exposures to reveal thousands of galaxies in a tiny patch of sky. This observed ultraviolet-to-infrared view changed how we study galaxy formation across cosmic history.',scale:'Telescope discovery • Hubble Ultra Deep Field',duration:6},
 {title:'We measured spacetime itself ringing.',caption:'A physically motivated, time-rescaled black-hole binary spirals inward, emits quadrupolar gravitational waves, merges and rings down. This is an illustration, not a numerical-relativity simulation. Open the linked LIGO record to compare the real GW150914 detector signals.',scale:'Observatory discovery • GW150914, 2015',duration:6},
 {title:'Every observation is a conversation with the past.',caption:'Light carries a history. Looking outward changes how we see home.',scale:'A moment to reflect',duration:4},
 {title:'Welcome back, explorer.',caption:'The universe returns to your window.',scale:'Back to your observatory',duration:2},
 {title:'Two messengers sail beyond the planets.',caption:'Voyager 1 and 2 cruise through interstellar space beyond the heliopause. The dish, instrument boom and RTG boom follow NASA’s spacecraft design. They coast without rocket exhaust; the distant Oort Cloud still lies ahead.',scale:'Voyager 1 & 2 • recognizable models, compressed distances and travel time',duration:7},
 {title:'Stars emerge inside cosmic pillars.',caption:'Webb’s near-infrared view of the Pillars of Creation reveals young stars among dense gas and dust. Infrared filters are mapped to visible colors. The gentle camera move explores a real observation; it does not animate the stars forming.',scale:'Stellar birth • JWST NIRCam • Eagle Nebula',duration:8},
 {title:'An exploded star leaves a tapestry of debris.',caption:'Webb resolves the tangled knots and filaments of supernova remnant Cassiopeia A. Ejected material collides with surrounding gas. This is a real infrared composite; the slow zoom is a camera effect, not a time-lapse of the expansion.',scale:'Stellar death • JWST NIRCam • Cassiopeia A',duration:8},
 {title:'Gravity turns a distant galaxy into a horseshoe.',caption:'First discovered in Sloan survey data, the Cosmic Horseshoe appears in sharp detail through Hubble. A massive foreground galaxy bends the light of a more distant galaxy into an almost complete Einstein ring. The blue arc is lensed galaxy light, not a physical ring around the foreground galaxy.',scale:'Relativity observed • Hubble WFC3 • Cosmic Horseshoe',duration:8},
 {title:'We map matter that emits no light.',caption:'In Abell 2744, optical telescopes reveal galaxies and Chandra records hot gas, shown in pink. Blue shows a mass distribution reconstructed from gravitational lensing, dominated by dark matter. This is a data composite, not a direct photograph of dark matter.',scale:'Invisible mass inferred • Hubble + VLT + Chandra • Abell 2744',duration:9},
];
const sceneOrder=[0,1,2,20,21,22,3,4,5,23,24,6,7,8,9,13,14,15,16,17,10,11,12,18,19];
const scenes=sceneOrder.map(index=>originalScenes[index]);
const futureSources:Partial<Record<number,{title:string;url:string}>>={
 9:{title:'NASA: Webb and the Big Bang',url:'https://science.nasa.gov/mission/webb/big-bang-q-and-a/'},
 10:{title:'ESO: ELT galaxy science',url:'https://elt.eso.org/science/galaxies/'},
 11:{title:'ESA: What will LISA study?',url:'https://www.esa.int/Science_Exploration/Space_Science/LISA/Which_cosmic_objects_will_LISA_study'},
 20:{title:'NASA: Voyager spacecraft design',url:'https://science.nasa.gov/mission/voyager/spacecraft/'},
 17:{title:'LIGO: Sources of gravitational waves',url:'https://www.ligo.caltech.edu/page/gw-sources'},
 12:{title:'NASA: Habitable Worlds Observatory concept',url:'https://science.nasa.gov/astrophysics/programs/habitable-worlds-observatory/'},
};
const starts=scenes.map((_,i)=>scenes.slice(0,i).reduce((sum,s)=>sum+s.duration,0));
const total=scenes.reduce((sum,s)=>sum+s.duration,0);
const renderImageKey=(stage:number):JourneyImage|null=>({1:'earth',3:'galaxy',4:'web',6:'blackhole',7:'distant',8:'cmb',11:'lisa',12:'earth',13:'exoplanets',14:'pulsar',15:'quasar',16:'deepfield',17:'waves',18:'galaxy',21:'pillars',22:'cassiopeia',23:'horseshoe',24:'darkmatter'} as Partial<Record<number,JourneyImage>>)[stage]??null;
const sceneImageKey=(stage:number)=>renderImageKey(sceneOrder[stage]);
const rand=(i:number)=>{const v=Math.sin(i*127.1+311.7)*43758.5453;return v-Math.floor(v);};
export default function CosmicJourney({origin,onClose}:{origin:{x:number;y:number};onClose:()=>void}){
 const reduced=useReducedMotion(),canvas=useRef<HTMLCanvasElement>(null),layer=useRef<HTMLDivElement>(null),closeButton=useRef<HTMLButtonElement>(null);
 const elapsed=useRef(reduced?starts[1]:0),paused=useRef(Boolean(reduced)),[isPaused,setPaused]=useState(Boolean(reduced)),[stage,setStage]=useState(reduced?1:0),[progress,setProgress]=useState(0);
 const images=useRef<Partial<Record<JourneyImage,HTMLImageElement>>>({});
 const imageStatus=useRef<Record<JourneyImage,string>>(Object.fromEntries(Object.keys(cosmicJourneyImages).map(key=>[key,'loading'])) as Record<JourneyImage,string>);
 const [imageStates,setImageStates]=useState<Record<JourneyImage,string>>(Object.fromEntries(Object.keys(cosmicJourneyImages).map(key=>[key,'loading'])) as Record<JourneyImage,string>);
 useEffect(()=>{
  let mounted=true;
  (Object.keys(cosmicJourneyImages) as JourneyImage[]).forEach(key=>{
   const image=new Image();images.current[key]=image;
   const status=(value:string)=>{imageStatus.current[key]=value;if(mounted)setImageStates(old=>({...old,[key]:value}));};
   image.onload=()=>status('ready');image.onerror=()=>status('error');image.src=cosmicJourneyImages[key].src;
  });
  return()=>{mounted=false;Object.values(images.current).forEach(image=>{if(image){image.onload=null;image.onerror=null;}});};
 },[]);
 const closeRef=useRef(onClose);closeRef.current=onClose;
 useEffect(()=>{
  const previous=document.activeElement as HTMLElement|null,overflow=document.body.style.overflow,root=document.getElementById('root'),wasInert=root?.inert;
  document.body.style.overflow='hidden';if(root)root.inert=true;closeButton.current?.focus();
  const keys=(e:KeyboardEvent)=>{if(e.key==='Escape'){e.preventDefault();closeRef.current();}if(e.key==='Tab'){const buttons=Array.from(layer.current?.querySelectorAll<HTMLElement>('button:not(:disabled), a[href], input:not(:disabled)')??[]);if(!buttons.length)return;const first=buttons[0],last=buttons[buttons.length-1];if(e.shiftKey&&document.activeElement===first){e.preventDefault();last.focus();}else if(!e.shiftKey&&document.activeElement===last){e.preventDefault();first.focus();}}};
  window.addEventListener('keydown',keys);
  return()=>{document.body.style.overflow=overflow;if(root)root.inert=wasInert??false;window.removeEventListener('keydown',keys);previous?.focus();};
 },[]);
 useEffect(()=>{
  const c=canvas.current,ctx=c?.getContext('2d');if(!c||!ctx)return;
  let width=innerWidth,height=innerHeight,id=0,last=0,lastUpdate=0;
  const resize=()=>{width=innerWidth;height=innerHeight;const dpr=Math.min(devicePixelRatio||1,2);c.width=width*dpr;c.height=height*dpr;ctx.setTransform(dpr,0,0,dpr,0,0);};resize();window.addEventListener('resize',resize);
  const stars=(time:number)=>{for(let i=0;i<250;i++){const x=rand(i+1)*width,y=rand(i+900)*height;ctx.fillStyle=`rgba(210,230,255,${0.3+0.5*rand(i+1800)})`;ctx.beginPath();ctx.arc(x,y,0.5+rand(i+2400)*1.5,0,Math.PI*2);ctx.fill();}};
  // Cache a feathered image layer: image pixels stay intact at the center,
  // while an elliptical alpha mask removes the rectangular plate at its edges.
  const blendedImages=new Map<string,HTMLCanvasElement>();
  const blendImage=(image:HTMLImageElement,w:number,h:number,annotated=false,invert=false)=>{
   const key=image.src+annotated+invert;let plate=blendedImages.get(key);
   if(!plate){
    plate=document.createElement('canvas');
    const ratio=Math.min(1,1600/image.naturalWidth);
    plate.width=Math.round(image.naturalWidth*ratio);plate.height=Math.round(image.naturalHeight*ratio);
    const pc=plate.getContext('2d');if(!pc)return;
    if(invert)pc.filter='invert(1)';pc.drawImage(image,0,0,plate.width,plate.height);pc.filter='none';
    pc.globalCompositeOperation='destination-in';
    if(annotated){
     const horizontal=pc.createLinearGradient(0,0,plate.width,0);horizontal.addColorStop(0,'transparent');horizontal.addColorStop(.08,'white');horizontal.addColorStop(.92,'white');horizontal.addColorStop(1,'transparent');pc.fillStyle=horizontal;pc.fillRect(0,0,plate.width,plate.height);
     const vertical=pc.createLinearGradient(0,0,0,plate.height);vertical.addColorStop(0,'transparent');vertical.addColorStop(.08,'white');vertical.addColorStop(.92,'white');vertical.addColorStop(1,'transparent');pc.fillStyle=vertical;pc.fillRect(0,0,plate.width,plate.height);
    }else{
    pc.save();pc.translate(plate.width/2,plate.height/2);pc.scale(plate.width/2,plate.height/2);
    const feather=pc.createRadialGradient(0,0,0,0,0,1);
    feather.addColorStop(0,'rgba(255,255,255,1)');
    feather.addColorStop(0.66,'rgba(255,255,255,1)');
    feather.addColorStop(0.86,'rgba(255,255,255,.72)');
    feather.addColorStop(1,'rgba(255,255,255,0)');
    pc.fillStyle=feather;pc.fillRect(-1,-1,2,2);pc.restore();
    }
    blendedImages.set(key,plate);
   }
   ctx.save();ctx.globalCompositeOperation='screen';
   // A faint halo ties the image into the surrounding animated stars.
   const opacity=ctx.globalAlpha;ctx.globalAlpha=opacity*.12;ctx.filter='blur(18px)';
   ctx.drawImage(plate,-w*.53,-h*.53,w*1.06,h*1.06);
   ctx.filter='none';ctx.globalAlpha=opacity*.96;ctx.drawImage(plate,-w/2,-h/2,w,h);
   ctx.restore();
  };
  const scene=(which:number,local:number,time:number)=>{
   which=sceneOrder[which];
   const cx=width/2,cy=height*0.43,size=Math.min(width,height)*0.29;
   stars(time);ctx.save();ctx.translate(cx,cy);
   if(which===0||which===19){const r=size*(which===0?1+local*0.4:1.4-local*0.5);const glow=ctx.createRadialGradient(0,0,r*0.7,0,0,r*1.2);glow.addColorStop(0,'#020617');glow.addColorStop(0.8,'#164e63');glow.addColorStop(0.9,'#67e8f9');glow.addColorStop(1,'rgba(103,232,249,0)');ctx.fillStyle=glow;ctx.beginPath();ctx.arc(0,0,r*1.2,0,2*Math.PI);ctx.fill();ctx.strokeStyle='#e2e8f0';ctx.lineWidth=4;ctx.beginPath();ctx.ellipse(0,0,r,r,0,0,2*Math.PI);ctx.stroke();}
   if(which===1){const r=size*(1-local*0.45),image=images.current.earth;if(image?.complete&&image.naturalWidth){ctx.save();ctx.beginPath();ctx.arc(0,0,r,0,2*Math.PI);ctx.clip();ctx.drawImage(image,-r,-r,r*2,r*2);ctx.restore();}}
   if(which===2){const zoom=1-local*0.3;ctx.scale(zoom,zoom);for(let i=0;i<7;i++){const r=size*(0.25+i*0.13);ctx.strokeStyle='#334155';ctx.beginPath();ctx.ellipse(0,0,r,r*0.55,-0.2,0,2*Math.PI);ctx.stroke();const angle=(reduced?i:time*(0.3/(i+1))+i*1.7);ctx.fillStyle=['#94a3b8','#fbbf24','#38bdf8','#f87171','#d6b48a','#e9d5a1','#67e8f9'][i];ctx.beginPath();ctx.arc(r*Math.cos(angle),r*0.55*Math.sin(angle),i<4?3:6,0,2*Math.PI);ctx.fill();}const glow=ctx.createRadialGradient(0,0,2,0,0,size*0.2);glow.addColorStop(0,'#fff7ed');glow.addColorStop(0.3,'#fbbf24');glow.addColorStop(1,'rgba(251,146,60,0)');ctx.fillStyle=glow;ctx.beginPath();ctx.arc(0,0,size*0.2,0,2*Math.PI);ctx.fill();}
   if(which===3||which===18){const image=images.current.galaxy;if(image?.complete&&image.naturalWidth){const aspect=image.naturalWidth/image.naturalHeight;const h=Math.min(height*.56,width*.88/aspect)*(1-local*.15),w=h*aspect;blendImage(image,w,h);}}
   if(which===4){const image=images.current.web;if(image?.complete&&image.naturalWidth){const aspect=image.naturalWidth/image.naturalHeight,h=Math.min(height*.57,width*.86/aspect)*(1-local*.08),w=h*aspect;blendImage(image,w,h);}}
   if(which===5){const er=size*.55,sourceX=(local-.5)*er*2.2,image=images.current.galaxy;const lensSize=size*2.7;
    if(image?.complete&&image.naturalWidth){ctx.save();ctx.globalCompositeOperation='screen';const n=84,tile=lensSize/n,aspect=image.naturalWidth/image.naturalHeight,sw=er*1.1,sh=sw/aspect;
     for(let iy=0;iy<n;iy++)for(let ix=0;ix<n;ix++){const tx=(ix+.5)*tile-lensSize/2,ty=(iy+.5)*tile-lensSize/2,r2=tx*tx+ty*ty;if(r2<er*er*.018)continue;const bx=tx*(1-er*er/r2)-sourceX,by=ty*(1-er*er/r2),u=bx/sw+.5,v=by/sh+.5;if(u<0||u>=1||v<0||v>=1)continue;const sourceWidth=Math.max(2,image.naturalWidth/n*.75),sourceHeight=Math.max(2,image.naturalHeight/n*.75);ctx.drawImage(image,Math.max(0,u*image.naturalWidth-sourceWidth/2),Math.max(0,v*image.naturalHeight-sourceHeight/2),sourceWidth,sourceHeight,tx-tile/2,ty-tile/2,tile+.5,tile+.5);}
     ctx.restore();}
    const glow=ctx.createRadialGradient(0,0,er*.11,0,0,er*.3);glow.addColorStop(0,'rgba(0,0,0,1)');glow.addColorStop(.45,'rgba(0,0,0,.95)');glow.addColorStop(1,'rgba(0,0,0,0)');ctx.fillStyle=glow;ctx.beginPath();ctx.arc(0,0,er*.3,0,2*Math.PI);ctx.fill();ctx.fillStyle='#000';ctx.beginPath();ctx.arc(0,0,er*.11,0,2*Math.PI);ctx.fill();
   }
   if(which===8){const image=images.current.cmb;if(image?.complete&&image.naturalWidth){const aspect=image.naturalWidth/image.naturalHeight,w=Math.min(width*.88,height*.54*aspect),h=w/aspect;blendImage(image,w,h);}}
   if(which===9){
    ctx.save();ctx.resetTransform();const dpr=Math.min(devicePixelRatio||1,2);ctx.scale(dpr,dpr);
    const heat=ctx.createLinearGradient(0,0,width,height);heat.addColorStop(0,`rgba(255,190,90,${.32*(1-local)})`);heat.addColorStop(1,`rgba(150,40,100,${.2*(1-local)})`);ctx.fillStyle=heat;ctx.fillRect(0,0,width,height);
    const spacing=32+local*85;ctx.strokeStyle='rgba(251,191,36,.16)';
    for(let x=width/2%spacing;x<width;x+=spacing){ctx.beginPath();ctx.moveTo(x,0);ctx.lineTo(x,height);ctx.stroke();}
    for(let y=height/2%spacing;y<height*.68;y+=spacing){ctx.beginPath();ctx.moveTo(0,y);ctx.lineTo(width,y);ctx.stroke();}
    for(let i=0;i<180;i++){ctx.fillStyle=local<.5?'rgba(255,235,190,.8)':'rgba(251,146,60,.7)';const x=((rand(i+13)*width*2*(1+local*.8))%width),y=((rand(i+313)*height*2*(1+local*.8))%(height*.67));ctx.beginPath();ctx.arc(x,y,1.5+(1-local)*2,0,2*Math.PI);ctx.fill();}ctx.restore();
   }

   if(which===10){const r=size*.12;for(let row=-3;row<=3;row++)for(let col=-3;col<=3;col++){if(Math.abs(row)+Math.abs(col)>4)continue;const x=col*r*1.75+row%2*r*.875,y=row*r*1.5;ctx.beginPath();for(let k=0;k<6;k++){const a=k*Math.PI/3+Math.PI/6,px=x+r*.95*Math.cos(a),py=y+r*.95*Math.sin(a);if(k===0)ctx.moveTo(px,py);else ctx.lineTo(px,py);}ctx.closePath();ctx.fillStyle='#475569';ctx.fill();ctx.strokeStyle='#bae6fd';ctx.stroke();}ctx.strokeStyle='rgba(103,232,249,.4)';for(let i=-2;i<=2;i++){ctx.beginPath();ctx.moveTo(i*size*.35,-size*.9);ctx.lineTo(i*size*.35,-size*.1);ctx.lineTo(0,size*.75);ctx.stroke();}ctx.fillStyle='#fbbf24';ctx.beginPath();ctx.arc(0,size*.75,4,0,2*Math.PI);ctx.fill();}

   if(which===12){const image=images.current.earth;const glow=ctx.createRadialGradient(-size*.45,0,0,-size*.45,0,size*.4);glow.addColorStop(0,'rgba(255,240,200,.7)');glow.addColorStop(1,'rgba(255,240,200,0)');ctx.fillStyle=glow;ctx.fillRect(-size,-size*.5,size,size);ctx.fillStyle='#02040b';ctx.beginPath();ctx.arc(-size*.45,0,size*.11,0,2*Math.PI);ctx.fill();ctx.strokeStyle='#94a3b8';ctx.stroke();const radius=size*.12,px=size*.55,py=-size*.1;if(image?.complete&&image.naturalWidth){ctx.save();ctx.beginPath();ctx.arc(px,py,radius,0,2*Math.PI);ctx.clip();ctx.drawImage(image,px-radius,py-radius,2*radius,2*radius);ctx.restore();}ctx.strokeStyle='#67e8f9';ctx.beginPath();ctx.moveTo(px,size*.35);for(let i=0;i<90;i++)ctx.lineTo(px-size*.35+i*size*.009,size*.65-(.1+.12*Math.sin(i*.4)**2)*size);ctx.stroke();}
   if([6,7,11,13,14,15,16].includes(which)){const key=renderImageKey(which),image=key?images.current[key]:undefined;if(image?.complete&&image.naturalWidth){const aspect=image.naturalWidth/image.naturalHeight,w=Math.min(width*.92,height*.54*aspect)*(1-local*.04),h=w/aspect;blendImage(image,w,h,[7,11,13].includes(which),false);}}
   if(which>=21&&which<=24){
    const key=renderImageKey(which),image=key?images.current[key]:undefined;
    if(image?.complete&&image.naturalWidth){
     const aspect=image.naturalWidth/image.naturalHeight;
     const cameraProgress=reduced?0:local;
     ctx.save();
     // Nebulae fill the sky; the camera reframes a fixed observed image.
     if(which===21||which===22){
      const scale=Math.max(width/image.naturalWidth,height/image.naturalHeight)*(1.04+cameraProgress*.05);
      const w=image.naturalWidth*scale,h=image.naturalHeight*scale;
      ctx.translate((cameraProgress-.5)*width*.015,height*.07+(cameraProgress-.5)*height*.015);
      ctx.globalAlpha*=.78;
      blendImage(image,w,h,false);
      const shade=ctx.createLinearGradient(0,-height/2,0,height/2);
      shade.addColorStop(0,'rgba(2,4,11,.3)');
      shade.addColorStop(.4,'rgba(2,4,11,.04)');
      shade.addColorStop(.7,'rgba(2,4,11,.4)');
      shade.addColorStop(1,'rgba(2,4,11,.8)');
      ctx.fillStyle=shade;
      ctx.fillRect(-width/2-20,-height/2-20,width+40,height+40);
     }else{
      const h=Math.min(height*.57,width*.88/aspect)*(1+cameraProgress*.07),w=h*aspect;
      ctx.translate((cameraProgress-.5)*w*.018,(cameraProgress-.5)*h*.018);
      blendImage(image,w,h,true);
     }
     ctx.restore();
    }
   }
   if(which===20)drawVoyagers(ctx,size,local);
   if(which===17){drawMerger(ctx,size,local);}
   if(which===14||which===15){
    // An independent inset explains the source mechanism without altering observational pixels.
    ctx.save();ctx.translate(size*.85,-size*.65);const r=size*.23;
    ctx.fillStyle='rgba(2,6,23,.9)';ctx.fillRect(-r*1.5,-r*1.5,r*3,r*3.3);ctx.strokeStyle='#475569';ctx.strokeRect(-r*1.5,-r*1.5,r*3,r*3.3);
    ctx.save();ctx.rotate(which===14?(reduced?.5:time*.8):-.35);
    const beam=ctx.createLinearGradient(-r*1.3,0,r*1.3,0);beam.addColorStop(0,'rgba(103,232,249,0)');beam.addColorStop(.5,'rgba(103,232,249,.8)');beam.addColorStop(1,'rgba(103,232,249,0)');ctx.fillStyle=beam;
    ctx.beginPath();ctx.moveTo(0,0);ctx.lineTo(r*1.3,-r*.35);ctx.lineTo(r*1.3,r*.35);ctx.closePath();ctx.fill();ctx.beginPath();ctx.moveTo(0,0);ctx.lineTo(-r*1.3,-r*.35);ctx.lineTo(-r*1.3,r*.35);ctx.closePath();ctx.fill();
    if(which===15){ctx.strokeStyle='#fbbf24';ctx.lineWidth=3;ctx.beginPath();ctx.ellipse(0,0,r*.3,r*.12,Math.PI/2,0,2*Math.PI);ctx.stroke();for(const sign of [-1,1]){const fraction=reduced?.6:(time*.35)%1;ctx.fillStyle='#e0f2fe';ctx.beginPath();ctx.arc(sign*fraction*r*1.2,0,2,0,2*Math.PI);ctx.fill();}}
    ctx.fillStyle=which===14?'#bae6fd':'#000';ctx.beginPath();ctx.arc(0,0,r*.12,0,2*Math.PI);ctx.fill();ctx.restore();ctx.fillStyle='#cbd5e1';ctx.font='9px sans-serif';ctx.textAlign='center';ctx.fillText(which===14?'Spin slowed • model':'Jet engine • model',0,r*1.65);ctx.restore();
   }
   ctx.restore();
  };
  const draw=(now:number)=>{
   const before=Math.max(0,starts.findLastIndex(s=>elapsed.current>=s));
   const needed=sceneImageKey(before);
   const waiting=needed&&imageStatus.current[needed]==='loading';
   if(last&&!paused.current&&!document.hidden&&!waiting)elapsed.current+=Math.min(.05,(now-last)/1000);last=now;
   if(elapsed.current>=total){closeRef.current();return;}
   const current=Math.max(0,starts.findLastIndex(s=>elapsed.current>=s)),local=(elapsed.current-starts[current])/scenes[current].duration;
   ctx.fillStyle='#02040b';ctx.fillRect(0,0,width,height);scene(current,local,elapsed.current);
   // Brief cross-dissolves connect consecutive scale views.
   if(current<scenes.length-2&&local>.82){ctx.save();ctx.globalAlpha=(local-.82)/.18;scene(current+1,0,elapsed.current);ctx.restore();}
   if(layer.current){const full=Math.hypot(width,height);const portal=current===0?(reduced?1:Math.min(1,local*1.5)):current===scenes.length-1?(reduced?0:1-local):1;layer.current.style.clipPath=`circle(${Math.max(3,full*portal)}px at ${origin.x}px ${origin.y}px)`;}
   if(now-lastUpdate>150){setStage(current);setProgress(elapsed.current/total);lastUpdate=now;}
   id=requestAnimationFrame(draw);
  };id=requestAnimationFrame(draw);
  return()=>{cancelAnimationFrame(id);window.removeEventListener('resize',resize);};
 },[origin.x,origin.y,reduced]);
 const imageKey=sceneImageKey(stage);
 const jump=(index:number)=>{elapsed.current=starts[Math.max(0,Math.min(scenes.length-1,index))];setStage(index);};
 return createPortal(<div ref={layer} style={{clipPath: reduced ? undefined : `circle(3px at ${origin.x}px ${origin.y}px)`}} role="dialog" aria-modal="true" aria-labelledby="cosmic-journey-title" className="fixed inset-0 z-[100] bg-[#02040b] text-white"><canvas ref={canvas} aria-hidden="true" className="absolute inset-0 h-full w-full"/><div className="absolute inset-x-0 top-0 flex items-center justify-between gap-3 bg-gradient-to-b from-black/80 to-transparent px-5 py-5"><span className="hidden text-xs uppercase tracking-[0.22em] text-cyan-200 sm:block">Journey through scales</span><JourneySound/><button ref={closeButton} onClick={onClose} className="rounded-full border border-white/30 bg-black/40 px-4 py-2 text-xs hover:bg-white/10">Skip / return home ×</button></div><div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black via-black/80 to-transparent px-5 pb-4 pt-12 text-center"><p className="mb-2 text-[9px] uppercase tracking-wider text-amber-200 sm:text-[10px]">{scenes[stage].scale}</p><h2 id="cosmic-journey-title" className="mx-auto max-w-3xl text-lg font-semibold leading-snug sm:text-2xl">{scenes[stage].title}</h2><p className="mx-auto mt-2 max-w-3xl text-[11px] leading-[1.65] text-slate-300 sm:text-xs">{scenes[stage].caption}</p><div className="mt-3 flex flex-wrap justify-center gap-2"><button onClick={()=>jump(Math.max(1,stage-1))} className="rounded-full border border-white/20 px-3 py-1.5 text-[10px]">← Previous</button>{!reduced&&<button onClick={()=>{paused.current=!paused.current;setPaused(paused.current);}} className="rounded-full border border-white/20 px-3 py-1.5 text-[10px]">{isPaused?'Play':'Pause'}</button>}<button onClick={()=>stage>=scenes.length-2?onClose():jump(stage+1)} className="rounded-full border border-cyan-200/40 px-3 py-1.5 text-[10px] text-cyan-100">{stage>=scenes.length-2?'Return home':'Next →'}</button></div><div className="mx-auto mt-3 h-0.5 max-w-lg overflow-hidden rounded bg-white/10"><div className="h-full bg-cyan-300" style={{width:`${progress*100}%`}}/></div><p className="mt-2 text-[9px] text-slate-500">Observed images are credited • Big Bang and future-observatory scenes are conceptual, not photographs or guaranteed forecasts • relative sizes are not to scale</p>{imageKey&&<div className="mt-2 text-[9px] leading-relaxed text-slate-400">{imageStates[imageKey]==='loading'?<p role="status">Loading official astronomy imagery…</p>:imageStates[imageKey]==='error'?<p role="status">Image could not load. Open the original source below.</p>:null}<a href={cosmicJourneyImages[imageKey].source} target="_blank" rel="noreferrer" className="text-cyan-200 underline">{cosmicJourneyImages[imageKey].credit} ↗</a></div>}{futureSources[sceneOrder[stage]]&&<a className="mt-2 inline-block text-[10px] text-cyan-200 underline" href={futureSources[sceneOrder[stage]]!.url} target="_blank" rel="noreferrer">{futureSources[sceneOrder[stage]]!.title} ↗</a>}{sceneOrder[stage]===5&&<a className="mt-2 inline-block text-[10px] text-cyan-200 underline" href="https://science.nasa.gov/mission/hubble/science/science-behind-the-discoveries/hubble-gravitational-lenses/" target="_blank" rel="noreferrer">Explore gravitational lensing with NASA ↗</a>}{sceneOrder[stage]===4&&<a className="mt-2 inline-block text-[10px] text-cyan-200 underline" href="https://science.nasa.gov/mission/webb/science-overview/science-explainers/how-does-webb-see-back-in-time/" target="_blank" rel="noreferrer">Why looking farther means looking back ↗</a>}{sceneOrder[stage]===8&&<a className="mt-2 inline-block text-[10px] text-cyan-200 underline" href="https://www.esa.int/Science_Exploration/Space_Science/Planck/Planck_and_the_cosmic_microwave_background" target="_blank" rel="noreferrer">Explore the CMB with ESA ↗</a>}</div></div>,document.body);
}
