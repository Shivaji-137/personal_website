import { useEffect, useRef } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Approximate settlement positions; connecting lines illustrate the itinerary, not a recorded GPS track.
const road: L.LatLngTuple[] = [[27.7172,85.324],[27.687,85.211],[27.805,84.999],[27.914,85.146],[27.974,85.185],[28.109,85.297],[28.161,85.345]];
const trail: L.LatLngTuple[] = [[28.161,85.345],[28.153,85.365],[28.15516,85.39817],[28.173,85.418],[28.184,85.427],[28.201,85.452],[28.21,85.477],[28.2159,85.515],[28.218,85.54],[28.212,85.566]];
const stops = [
  {at:[28.161,85.345] as L.LatLngTuple,name:'Syabrubesi',note:'Trailhead · road travel ends here',badge:'Start'},
  {at:[28.15516,85.39817] as L.LatLngTuple,name:'Bamboo',note:'May 3 · night 1; May 6 · night 4 (return)',badge:'1 & 4'},
  {at:[28.2159,85.515] as L.LatLngTuple,name:'Langtang Village',note:'May 4 · night 2',badge:'2'},
  {at:[28.212,85.566] as L.LatLngTuple,name:'Kyanjin Gompa',note:'May 5 · night 3 · turnaround',badge:'3'},
];
export default function LangtangRouteMap(){
 const host=useRef<HTMLDivElement>(null); const mapRef=useRef<L.Map|null>(null);
 useEffect(()=>{
  if(!host.current) return;
  const map=L.map(host.current,{scrollWheelZoom:false}).setView([28.185,85.455],12); mapRef.current=map;
  const street=L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png',{maxZoom:19,attribution:'&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'});
  const satellite=L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}',{maxZoom:19,attribution:'Imagery &copy; Esri, Maxar, Earthstar Geographics and the GIS User Community'}).addTo(map);
  L.control.layers({'Street map':street,'Satellite':satellite},undefined,{collapsed:false,position:'topright'}).addTo(map);
  L.polyline(road,{color:'#a78bfa',weight:4,dashArray:'6 7'}).addTo(map).bindPopup('Road approach · approximate itinerary via Thankot, Galchhi and Nuwakot');
  L.polyline(trail,{color:'#059669',weight:4,dashArray:'8 6'}).addTo(map).bindPopup('Trekking itinerary · return along the valley via Bamboo');
  L.circleMarker(road[0],{radius:7,color:'#7c3aed',fillOpacity:1}).addTo(map).bindTooltip('Kathmandu · May 3 departure / May 7 return');
  stops.forEach(stop=>L.marker(stop.at,{icon:L.divIcon({className:'',html:`<span style="display:flex;align-items:center;justify-content:center;min-width:32px;height:28px;padding:0 5px;border:2px solid white;border-radius:16px;background:#065f46;color:white;font:bold 11px sans-serif;box-shadow:0 2px 7px #0008">${stop.badge}</span>`,iconSize:[40,28],iconAnchor:[20,14]})}).addTo(map).bindTooltip(`${stop.name} · ${stop.badge==='Start'?'Trailhead':`Night ${stop.badge}`}`,{permanent:true,direction:stop.name==='Langtang Village'?'top':'bottom',offset:[0,stop.name==='Langtang Village'?-14:14]}).bindPopup(`<strong>${stop.name}</strong><br/>${stop.note}`));
  map.fitBounds(L.latLngBounds(trail).pad(.2));
  const observer=new ResizeObserver(()=>map.invalidateSize()); observer.observe(host.current);
  return()=>{observer.disconnect();map.remove();mapRef.current=null;};
 },[]);
 return <><div className="flex flex-wrap gap-2 border-t border-white/10 px-4 py-3"><button type="button" onClick={()=>mapRef.current?.fitBounds(L.latLngBounds(trail).pad(.2))} className="rounded-lg border border-emerald-200/30 px-3 py-1.5 text-xs text-emerald-100">Trekking route</button><button type="button" onClick={()=>mapRef.current?.fitBounds(L.latLngBounds([...road,...trail]).pad(.1))} className="rounded-lg border border-white/20 px-3 py-1.5 text-xs text-slate-300">Whole journey</button><span className="self-center text-[11px] text-slate-400">Green: trek · Purple: road · Tap a stop for dates</span></div><div ref={host} role="region" aria-label="Interactive Langtang route map with overnight stops" className="relative z-0 h-[380px] w-full sm:h-[440px]"/><p className="px-4 py-3 text-[11px] leading-5 text-slate-400">Dashed lines show an approximate itinerary, not a surveyed trail or GPS recording. Bamboo marks both nights 1 and 4. Return via Bamboo and Syabrubesi to Kathmandu. <a className="underline" href="https://mapcarta.com/N11186154607" target="_blank" rel="noopener noreferrer">Bamboo location</a></p></>;
}
