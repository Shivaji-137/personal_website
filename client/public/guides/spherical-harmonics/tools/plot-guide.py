import os
os.environ['MPLCONFIGDIR']='/private/tmp/harmonics-matplotlib-cache'
import json
import gzip
from pathlib import Path
import numpy as np
import matplotlib
matplotlib.use('Agg')
import matplotlib.pyplot as plt
from matplotlib.colors import LinearSegmentedColormap, Normalize
from matplotlib import cm
root=Path(__file__).resolve().parents[1]/'figures'
d=json.loads(gzip.decompress((root/'plot-data.json.gz').read_bytes()))
plt.rcParams.update({'font.size':10,'figure.facecolor':'#0b1220','axes.facecolor':'#111c2e','text.color':'#e2e8f0','axes.labelcolor':'#cbd5e1','xtick.color':'#94a3b8','ytick.color':'#94a3b8','axes.edgecolor':'#64748b','savefig.facecolor':'#0b1220','svg.fonttype':'none'})
cmap=LinearSegmentedColormap.from_list('signed',['#fb7185','#192234','#22d3ee'])

def finish(fig,name):
 fig.savefig(root/(name+'.svg'),bbox_inches='tight')
 fig.savefig(root/(name+'.png'),bbox_inches='tight',dpi=140)
 plt.close(fig)

fig,axes=plt.subplots(3,3,figsize=(12,8),layout='constrained')
for ax,model in zip(axes.flat,d['models']):
 a=np.array(model['field']);scale=np.max(np.abs(a));ax.imshow(a,extent=[-180,180,180,0],aspect='auto',cmap=cmap,vmin=-scale,vmax=scale,interpolation='bilinear')
 # Actual zero contours, not fabricated equally spaced latitude lines.
 if np.min(a)<0<np.max(a):ax.contour(np.linspace(-180,180,a.shape[1]),np.linspace(0,180,a.shape[0]),a,levels=[0],colors=['#e2e8f0'],linewidths=.6)
 ax.set(title=rf'$\ell={model["l"]},\ m={model["m"]}$',xlabel=r'$\psi$ (degrees)',ylabel=r'$\theta$ (degrees)',xticks=[-180,-90,0,90,180],yticks=[0,90,180])
fig.suptitle('Real components • standard Condon–Shortley phase\nCyan: positive     Rose: negative     White: nodal curves',fontsize=14)
finish(fig,'low-degree-maps')

fig=plt.figure(figsize=(12,8),layout='constrained');gs=fig.add_gridspec(2,2,height_ratios=[1,1.5])
t=np.linspace(0,180,len(d['thetaFactor']));lat=np.array(d['thetaFactor']);ax=fig.add_subplot(gs[0,0]);ax.plot(t,lat,color='#22d3ee');ax.axhline(0,color='#64748b',lw=.8)
for v in d['latitudes']:ax.axvline(np.degrees(v),ls='--',color='#fbbf24',lw=.8)
ax.set(title=r'Latitude factor $A(\theta)$',xlabel=r'$\theta$ (degrees)',ylabel='Normalized amplitude',xlim=[0,180]);ax.grid(alpha=.12)
p=np.linspace(-180,180,721);ax=fig.add_subplot(gs[0,1]);ax.plot(p,np.cos(3*np.deg2rad(p)),color='#fb7185');ax.axhline(0,color='#64748b',lw=.8)
for v in d['longitudes']:ax.axvline(np.degrees(v),ls='--',color='#fbbf24',lw=.8)
ax.set(title=r'Longitude factor $\cos(3\psi)$',xlabel=r'$\psi$ (degrees)',ylabel='Factor',xlim=[-180,180]);ax.grid(alpha=.12)
ax=fig.add_subplot(gs[1,:]);a=np.array(d['worked']);scale=np.max(np.abs(a));ax.imshow(a,extent=[-180,180,180,0],aspect='auto',cmap=cmap,vmin=-scale,vmax=scale)
latroots=[np.degrees(v) for v in d['latitudes']];lonroots=[np.degrees(v) for v in d['longitudes']]
for v in latroots:ax.axhline(v,color='white',lw=.8)
for v in lonroots:ax.axvline(v,color='white',lw=.8)
for row in zip([0]+latroots,latroots+[180]):
 for col in zip([-180]+lonroots,lonroots+[180]):
  th=np.deg2rad(sum(row)/2);ps=np.deg2rad(sum(col)/2);v=np.sin(th)**3*(9*np.cos(th)**2-1)*np.cos(3*ps);ax.text(sum(col)/2,sum(row)/2,'+' if v>0 else '−',ha='center',va='center',color='white',fontsize=15)
ax.scatter([-165],[35],s=65,facecolor='none',edgecolor='#fbbf24');ax.set(title='Product: 3 rows × 7 cut-map columns = 21 boxes; 18 connected sphere regions',xlabel=r'$\psi$ (degrees)',ylabel=r'$\theta$ (degrees)',xticks=[-180,-150,-90,-30,30,90,150,180],yticks=[0,*latroots,180])
fig.suptitle(r'$\mathrm{Re}\,\widetilde Y_5^3 = \sqrt{385/\pi}\,\sin^3\theta\,(9\cos^2\theta-1)\cos(3\psi)/32$'+'\nNotes phase • yellow marker: (35°, −165°)',fontsize=15)
finish(fig,'worked-5-3')

fig,ax=plt.subplots(figsize=(12,3.5),layout='constrained')
from matplotlib.patches import Rectangle, FancyArrowPatch
edges=(np.array([-180,-150,-90,-30,30,90,150,180])+180)*7/360
for j in range(7):
 ax.add_patch(Rectangle((edges[j],0),edges[j+1]-edges[j],1,facecolor='#fb7185' if j%2==0 else '#22d3ee',alpha=.8,edgecolor='white'))
 ax.text((edges[j]+edges[j+1])/2,.5,'−' if j%2==0 else '+',ha='center',va='center',fontsize=23,color='white')
for x,txt in zip(edges,['−180°','−150°','−90°','−30°','30°','90°','150°','180°']):ax.text(x,-.15,txt,ha='center',fontsize=10)
ax.add_patch(FancyArrowPatch((edges[1]/2,1.05),((edges[-2]+edges[-1])/2,1.05),connectionstyle='arc3,rad=-.12',arrowstyle='<->',color='#fbbf24',mutation_scale=15,lw=2))
ax.text(3.5,1.62,'Same negative sector: outer columns reconnect across the map seam',ha='center',color='#fbbf24')
ax.text(3.5,-.55,'One latitude row: 7 rectangle boxes → 6 connected longitude sectors',ha='center',fontsize=13)
ax.set(xlim=[-.3,7.3],ylim=[-.8,1.9]);ax.axis('off');fig.suptitle('The rectangle is cut open; the sphere has no left/right boundary',fontsize=14)
finish(fig,'seam-diagram')

th,ps=np.meshgrid(np.linspace(0,np.pi,181),np.linspace(-np.pi,np.pi,361),indexing='ij');a=np.array(d['worked']);scale=np.max(np.abs(a));xyz=[np.sin(th)*np.cos(ps),np.sin(th)*np.sin(ps),np.cos(th)];colors=cmap(Normalize(-scale,scale)(a));r=np.abs(a)/scale
fig=plt.figure(figsize=(12,6),layout='constrained')
for index,(radius,title) in enumerate([(np.ones_like(r),'Unit sphere: fixed radius'),(r,'Lobe model: radius = |f| / peak')]):
 ax=fig.add_subplot(1,2,index+1,projection='3d');ax.plot_surface(*(v*radius for v in xyz),facecolors=colors,rstride=2,cstride=2,shade=False,linewidth=0,antialiased=False,rasterized=True)
 ax.set(xlabel='x',ylabel='y',zlabel='z',xlim=[-1.12,1.12],ylim=[-1.12,1.12],zlim=[-1.12,1.12],title=title);ax.set_box_aspect([1,1,1]);ax.view_init(elev=24,azim=38)
 for axis in [ax.xaxis,ax.yaxis,ax.zaxis]:axis.set_pane_color((.06,.10,.16,1))
fig.suptitle('Same selected component: degree 5, order 3, real, notes phase\nColor preserves function sign in both representations',fontsize=14)
finish(fig,'sphere-and-lobes')
print('Created four SVG figures and four PNG previews.')
