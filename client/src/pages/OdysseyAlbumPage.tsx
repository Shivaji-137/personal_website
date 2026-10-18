import { useEffect, useMemo, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import StarBackground from '@/components/StarBackground';
import { Dialog, DialogContent, DialogDescription, DialogTitle } from '@/components/ui/dialog';
import LangtangRouteMap from '@/components/odyssey/LangtangRouteMap';
import { odysseyAlbums } from '@/data/odysseyAlbums';
const duration = (seconds?: number | null) => seconds == null ? '' : `${Math.floor(seconds / 60)}:${String(Math.floor(seconds % 60)).padStart(2, '0')}`;

export default function OdysseyAlbumPage() {
  const { albumId } = useParams();
  const album = odysseyAlbums.find(item => item.id === albumId);
  const [filter, setFilter] = useState<'all' | 'photo' | 'video'>('all');
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const items = useMemo(() => album?.items.filter(item => filter === 'all' || item.kind === filter) ?? [], [album, filter]);
  const selected = items.find(item => item.id === selectedId);
  const selectedIndex = items.findIndex(item => item.id === selectedId);
  useEffect(() => { document.title = `${album?.title ?? 'Collection not found'} | My Odyssey`; setSelectedId(null); setFilter('all'); window.scrollTo(0, 0); }, [album]);
  const move = (direction: number) => setSelectedId(items[(selectedIndex + direction + items.length) % items.length]?.id ?? null);
  const photos = album?.items.filter(item => item.kind === 'photo').length ?? 0;
  const videos = (album?.items.length ?? 0) - photos;

  return <div className="relative min-h-screen overflow-x-hidden bg-[#08080a] text-white"><StarBackground /><Header /><main className="relative z-10 mx-auto max-w-7xl px-4 pb-20 pt-28 sm:px-6">
    <Link to="/Myodyssey?category=Nature" className="inline-flex items-center gap-2 text-sm text-emerald-200 hover:text-white"><i className="ri-arrow-left-line" aria-hidden="true" />My Odyssey · Nature</Link>
    {!album ? <div className="py-20"><h1 className="font-space text-3xl">Collection not found</h1><p className="mt-4 text-slate-400">Return to My Odyssey to explore the available collections.</p></div> : <>
      <header className="mb-10 mt-8 grid items-center gap-7 md:grid-cols-[1fr_1.1fr]">
        <div><p className="text-xs uppercase tracking-[.2em] text-emerald-200">Nature / {album.location}</p><h1 className="mt-4 font-space text-4xl font-bold tracking-tight sm:text-5xl">{album.title}</h1><p className="mt-5 max-w-lg text-base leading-8 text-slate-300">{album.description}</p><p className="mt-5 text-sm text-slate-400">{photos} photos <span aria-hidden="true" className="px-2">·</span>{videos} videos</p></div>
        <img src={album.cover} alt={album.coverAlt} className="aspect-[16/10] w-full rounded-2xl border border-white/10 object-cover" />
      </header>
      {album.id === 'langtang-trek' && <>
        <section aria-labelledby="langtang-story" className="mb-7 rounded-xl border border-emerald-200/15 bg-emerald-100/[0.03] p-4 sm:p-5">
          <p className="text-[10px] uppercase tracking-[.16em] text-emerald-200">Started May 3, 2026 · Into the Langtang valley</p>
          <h2 id="langtang-story" className="mt-2 font-space text-lg sm:text-xl">From Kathmandu to Kyanjin Gompa</h2>
          <p className="mt-3 max-w-4xl text-xs leading-6 text-slate-300 sm:text-sm">On May 3, 2026, we left Kathmandu along the Thankot road and travelled through Nuwakot to Syabrubesi, where our walk into the Langtang valley began. Our first night on the trail was in Bamboo, followed by a second night in Langtang Valley and a third in Kyanjin Gompa. From there, we walked all the way back to Bamboo for our fourth night, then continued down to Syabrubesi and returned to Kathmandu. These photos and videos bring together moments from the trail, the villages, and the mountains along the way.</p>
          <ol className="mt-4 flex flex-wrap gap-2 text-[11px]" aria-label="Langtang overnight stops">{['May 3 · Bamboo', 'May 4 · Langtang Valley', 'May 5 · Kyanjin Gompa', 'May 6 · Bamboo', 'May 7 · Kathmandu'].map(stop => <li key={stop} className="rounded-lg border border-white/10 px-2.5 py-1.5 text-slate-200">{stop}</li>)}</ol>
          <div className="mt-4"><h3 className="text-xs font-medium text-emerald-100">Trekking distance from Syabrubesi</h3><div className="mt-2 grid grid-cols-1 gap-2 sm:grid-cols-3">{[{place:'Bamboo · nights 1 & 4',distance:'≈ 6–8 km / 4–5 miles'},{place:'Langtang Village · night 2',distance:'≈ 24–26 km / 15–16 miles'},{place:'Kyanjin Gompa · night 3',distance:'≈ 30–32 km / 19–20 miles'}].map(stop => <div key={stop.place} className="rounded-lg border border-white/10 px-3 py-2"><p className="text-[11px] text-slate-400">{stop.place}</p><p className="mt-1 text-xs text-emerald-100">{stop.distance}</p></div>)}</div><p className="mt-2 text-[10px] leading-5 text-slate-500">Approximate one-way trail distances measured from Syabrubesi, not separate daily stages. Bamboo has the same location on the return; these figures are not cumulative distance walked over the trip. Trail choices and lodge locations vary. <a className="underline hover:text-white" href="https://www.havenholidaysnepal.com/blogs/trekking-from-syabrubesi-to-lama-hotel-a-trekkers-guide" target="_blank" rel="noopener noreferrer">Bamboo reference</a> · <a className="underline hover:text-white" href="https://merrimenttreks.com/blog/langtang-valley-trek-distance/" target="_blank" rel="noopener noreferrer">Valley distances</a></p></div>
          <div className="mt-4 border-t border-white/10 pt-3"><p className="text-xs text-slate-400">Estimated total return journey · road travel + valley trek</p><p className="mt-1 font-space text-lg text-emerald-100">About 320–350 km <span className="text-sm text-slate-400">/ 200–220 miles</span></p><p className="mt-1 text-[10px] leading-5 text-slate-500">Approximate route distance, excluding side hikes; actual roads and trail choices vary. <a href="https://vehiclehiringnepal.com/kathmandu-to-syabrubesi-road-overview/" target="_blank" rel="noopener noreferrer" className="underline hover:text-white">Road reference</a> · <a href="https://treklangtang.com/kyanjin-gompa/" target="_blank" rel="noopener noreferrer" className="underline hover:text-white">Trail reference</a></p></div>
        </section>
        <section aria-labelledby="langtang-route" className="mb-7 overflow-hidden rounded-xl border border-white/10 bg-white/[0.02]">
          <div className="flex flex-wrap items-center justify-between gap-2 px-4 py-3"><h2 id="langtang-route" className="font-space text-sm text-emerald-100">Our route to Langtang</h2><a href="https://www.google.com/maps/dir/?api=1&origin=Kathmandu,Nepal&destination=Syabrubesi,Nepal&travelmode=driving&waypoints=Thankot,Nepal%7CGalchhi,Nepal%7CTrishuli+Bazaar,Nepal" target="_blank" rel="noopener noreferrer" className="text-xs text-emerald-200 underline underline-offset-4 hover:text-white">Open road directions ↗</a></div>
          <LangtangRouteMap />
        </section>
      </>}
      {album.id === 'mustang-bike' && <section aria-labelledby="mustang-story" className="mb-7 rounded-xl border border-emerald-200/15 bg-emerald-100/[0.03] p-4 sm:p-5">
        <p className="text-[10px] uppercase tracking-[.16em] text-emerald-200">Started October 28, 2023 · On the road</p>
        <h2 id="mustang-story" className="mt-2 font-space text-lg sm:text-xl">From Bhiman to Mustang, all the way by bike</h2>
        <p className="mt-3 max-w-4xl text-xs leading-6 text-slate-300 sm:text-sm sm:leading-6">On October 28, 2023, we set off from Bhiman and rode through Sindhuli and Hetauda, travelling all the way to Muktinath in Mustang by bike. Our first night was in Chitwan, our second in Beni Bazar, and our third in Muktinath. The next day, we began the ride home and stayed overnight in Pokhara before reaching home the following day. These photos and videos capture moments along that journey, from the roads near home to Mustang’s mountain landscapes.</p>
        <ol className="mt-4 flex flex-wrap gap-2 text-[11px]" aria-label="Our overnight stops">
          {['Oct 28 · Chitwan', 'Oct 29 · Beni Bazar', 'Oct 30 · Muktinath', 'Oct 31 · Pokhara', 'Nov 1 · Home in Bhiman'].map(stop => <li key={stop} className="rounded-lg border border-white/10 px-2.5 py-1.5 text-slate-200">{stop}</li>)}
        </ol>
        <div className="mt-4 border-t border-white/10 pt-3"><p className="text-xs text-slate-400">Estimated one-way road distance · Bhiman → Muktinath</p><p className="mt-1 font-space text-lg text-emerald-100">About 520 km <span className="text-sm text-slate-400">/ 320 miles</span></p>

        </div>
      </section>}
      {album.id === 'mustang-bike' && <section aria-labelledby="mustang-route" className="mb-7 overflow-hidden rounded-xl border border-white/10 bg-white/[0.02]">
        <div className="flex flex-wrap items-center justify-between gap-2 px-4 py-3"><h2 id="mustang-route" className="font-space text-sm text-emerald-100">Our route to Mustang</h2><a href="https://www.google.com/maps/dir/?api=1&origin=Bhiman,Nepal&destination=Muktinath,Nepal&travelmode=driving&waypoints=Sindhuli,Nepal%7CHetauda,Nepal%7CNarayanghat,Nepal%7CPokhara,Nepal%7CBeni,Nepal" target="_blank" rel="noopener noreferrer" className="text-xs text-emerald-200 underline underline-offset-4 hover:text-white">Open directions ↗</a></div>
        <iframe title="Road route from Bhiman through Sindhuli, Hetauda, Narayanghat, Pokhara and Beni to Muktinath" src="https://maps.google.com/maps?saddr=Bhiman,Nepal&daddr=Sindhuli,Nepal+to:Hetauda,Nepal+to:Narayanghat,Nepal+to:Pokhara,Nepal+to:Beni,Nepal+to:Muktinath,Nepal&output=embed" className="h-64 w-full border-0 sm:h-80" loading="lazy" referrerPolicy="no-referrer-when-downgrade" allowFullScreen />
        <p className="px-4 py-3 text-[11px] leading-5 text-slate-400">Bhiman → Sindhuli → Hetauda → Chitwan (Narayanghat) → Pokhara → Beni → Muktinath. Return: overnight in Pokhara, then home to Bhiman. The map shows a planned route through these stops; current directions may differ from our 2023 ride.</p>
      </section>}
      <div role="group" aria-label="Filter collection media" className="mb-7 flex flex-wrap items-center gap-2 border-b border-white/10 pb-5">
        {([{ key: 'all', text: 'All moments', count: album.items.length }, { key: 'photo', text: 'Photos', count: photos }, { key: 'video', text: 'Videos', count: videos }] as const).map(item => <button key={item.key} type="button" aria-pressed={filter === item.key} onClick={() => { setFilter(item.key); setSelectedId(null); }} className={`rounded-full border px-4 py-2 text-sm transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-200 ${filter === item.key ? 'border-emerald-200/40 bg-emerald-200/10 text-emerald-100' : 'border-white/10 text-slate-400 hover:border-white/30 hover:text-white'}`}>{item.text} <span className="ml-1 text-xs opacity-60">{item.count}</span></button>)}
        <span className="ml-auto text-xs text-slate-500">Select a moment to view</span>
      </div>
      <div className="grid grid-cols-2 gap-3 sm:gap-5 md:grid-cols-3 lg:grid-cols-4" aria-label={`${album.title} gallery`}>
        {items.map(item => <button key={item.id} type="button" aria-label={`Open ${item.kind === 'photo' ? 'photo' : 'video'}: ${item.title}`} onClick={() => setSelectedId(item.id)} className="group min-w-0 overflow-hidden rounded-xl border border-white/10 bg-[#111621] text-left transition-colors hover:border-emerald-200/40 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-200">
          <div className="relative aspect-[4/3] overflow-hidden"><img src={item.thumbnail} alt={item.title} width={item.width} height={item.height} loading="lazy" decoding="async" className="h-full w-full object-cover transition-transform duration-300 motion-safe:group-hover:scale-105" />{item.kind === 'video' && <><span className="absolute inset-0 flex items-center justify-center bg-black/15"><i className="ri-play-circle-line text-4xl text-white drop-shadow-lg" aria-hidden="true" /></span><span className="absolute bottom-2 right-2 rounded bg-black/70 px-1.5 py-0.5 text-[10px] text-white">{duration(item.duration)}</span></>}</div>
          <div className="p-3"><span className="text-[10px] uppercase tracking-widest text-emerald-200/70">{item.kind === 'photo' ? 'Photograph' : 'Film'}</span><p className="mt-1 text-xs leading-5 text-slate-300 sm:text-sm">{item.title}</p></div>
        </button>)}
      </div>
    </>}
  </main><Footer />
    <Dialog open={!!selected} onOpenChange={open => { if (!open) setSelectedId(null); }}>
      <DialogContent className="w-[calc(100%_-_1.5rem)] max-w-6xl gap-3 rounded-2xl border-white/15 bg-[#0b1019] p-3 text-white sm:p-5" onKeyDown={event => {
        if ((event.target as HTMLElement).closest('video,input')) return;
        if (event.key === 'ArrowRight') { event.preventDefault(); move(1); }
        if (event.key === 'ArrowLeft') { event.preventDefault(); move(-1); }
      }}>
        {selected && <><div className="pr-9"><DialogTitle className="font-space text-base sm:text-lg">{selected.title}</DialogTitle><DialogDescription className="mt-1 text-xs text-slate-400">{album?.title} · {selectedIndex + 1} of {items.length} · {selected.kind === 'photo' ? 'Photo' : 'Video'}</DialogDescription></div>
          <div className="flex h-[min(65svh,720px)] min-h-0 items-center justify-center overflow-hidden rounded-lg bg-black">
            {selected.kind === 'photo' ? <img key={selected.id} src={selected.src} alt={selected.title} className="max-h-full max-w-full object-contain" /> : <video key={selected.id} poster={selected.thumbnail} aria-label={selected.title} controls playsInline preload="metadata" className="h-full w-full object-contain"><source src={selected.src} type="video/mp4" />Your browser cannot play this video.</video>}
          </div>
          <div className="flex items-center justify-between gap-3"><button aria-label="Previous moment" onClick={() => move(-1)} className="rounded-lg border border-white/15 px-3 py-2 text-sm hover:bg-white/10"><i className="ri-arrow-left-line" aria-hidden="true" /> Previous</button><span className="hidden text-xs text-slate-500 sm:block">← → to browse · Esc to close</span><button aria-label="Next moment" onClick={() => move(1)} className="rounded-lg border border-white/15 px-3 py-2 text-sm hover:bg-white/10">Next <i className="ri-arrow-right-line" aria-hidden="true" /></button></div>
        </>}
      </DialogContent>
    </Dialog>
  </div>;
}
