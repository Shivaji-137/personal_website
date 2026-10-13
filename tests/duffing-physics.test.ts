import assert from 'node:assert/strict';
import { duffingRoots,sweepBranch,integrateDuffing } from '../client/src/lib/physics/duffing';
const near=(a:number,b:number,tol=1e-8)=>assert.ok(Math.abs(a-b)<tol,`${a} != ${b}`);
for(const alpha of [-0.5,0,0.5])for(const omega of [0.5,0.9,1,1.1,1.5]){
 const p={alpha,nu:0.05,force:0.06};
 for(const r of duffingRoots(omega,p)){
  near(r.amplitude**2*((1-omega**2+0.75*alpha*r.amplitude**2)**2+(p.nu*omega)**2),p.force**2);
  if(alpha===0)near(r.amplitude,p.force/Math.hypot(1-omega**2,p.nu*omega));
 }
}
const fs=Array.from({length:1001},(_,i)=>0.45+i*1.3/1000);
for(const p of [{alpha:0.5,nu:0.05,force:0.06},{alpha:-0.5,nu:0.04,force:0.03}]){
 const up=sweepBranch(fs,p),down=sweepBranch([...fs].reverse(),p);
 const u=up.findIndex(s=>s.jump),d=down.findIndex(s=>s.jump);
 assert.ok(u>0&&d>0,'Both presets must demonstrate jumps');
 assert.ok(Math.abs(up[u].omega-down[d].omega)>0.002,'Distinct fold frequencies');
 assert.ok(p.alpha>0?up[u].root!.amplitude<up[u-1].root!.amplitude:up[u].root!.amplitude>up[u-1].root!.amplitude);
 assert.ok(p.alpha>0?down[d].root!.amplitude>down[d-1].root!.amplitude:down[d].root!.amplitude<down[d-1].root!.amplitude);
 assert.ok(fs.some((w,i)=>Math.abs(up[i].root!.amplitude-down[1000-i].root!.amplitude)>0.1),'History-dependent amplitude');
 const middle=fs.map(w=>duffingRoots(w,p)).find(rs=>rs.length===3&&rs.every(r=>r.local));
 assert.ok(middle);assert.deepEqual(middle.map(r=>r.stable),[true,false,true]);
 console.log('Verified',p.alpha>0?'hardening':'softening','jump frequencies',up[u].omega,down[d].omega);
}
const p={alpha:0,nu:0.1,force:0.05},seed=duffingRoots(1,p)[0],measured=integrateDuffing(1,p,seed);
assert.equal(measured.escaped,false);near(measured.amplitude,seed.amplitude,2e-6);
assert.equal(sweepBranch(fs,p).some(s=>s.jump),false);
console.log('Duffing checks passed: polynomial roots, linear limit, branch stability, hardening/softening jump directions, bistability, history dependence and RK4 recovery.');
