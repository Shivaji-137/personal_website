import { Link } from 'react-router-dom';
import { odysseyAlbums } from '@/data/odysseyAlbums';

export default function NatureCollections({ search = '', natureOnly = false }: { search?: string; natureOnly?: boolean }) {
  const query = search.trim().toLowerCase();
  const albums = odysseyAlbums.filter(album => [album.title, album.description, album.location, ...album.tags, ...album.items.map(item => item.title)].some(text => text.toLowerCase().includes(query)));
  if (!albums.length) return natureOnly ? <p className="py-8 text-center text-slate-400">No nature collections match your search.</p> : null;
  return <div className="space-y-6">
    <div className="flex items-center gap-3"><span aria-hidden="true" className="h-px w-8 bg-emerald-300/60" /><h3 className="font-space text-xl font-semibold text-white">Journeys in nature</h3></div>
    <div className="grid gap-6 md:grid-cols-2">
      {albums.map(album => {
        const photos = album.items.filter(item => item.kind === 'photo').length;
        const videos = album.items.length - photos;
        return <Link key={album.id} to={`/Myodyssey/${album.id}`} className="group min-w-0 overflow-hidden rounded-2xl border border-white/10 bg-[#111621] transition-colors hover:border-emerald-200/40 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-emerald-200">
          <div className="relative aspect-[16/10] overflow-hidden">
            <img src={album.cover} alt={album.coverAlt} loading="lazy" className="h-full w-full object-cover transition-transform duration-500 motion-safe:group-hover:scale-[1.03]" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#111621] via-black/5 to-transparent" />
            <span className="absolute left-4 top-4 rounded-full border border-white/20 bg-black/50 px-3 py-1 text-xs text-white backdrop-blur-sm"><i className="ri-leaf-line mr-1.5" aria-hidden="true" />Nature</span>
            <div className="absolute bottom-4 left-5 right-5 flex items-end justify-between gap-3"><div><p className="mb-2 text-xs text-slate-200">{album.location}</p><h4 className="font-space text-2xl font-semibold text-white sm:text-3xl">{album.title}</h4></div><i className="ri-arrow-right-up-line text-2xl text-emerald-200" aria-hidden="true" /></div>
          </div>
          <div className="px-5 pb-5"><p className="text-sm leading-7 text-slate-400">{album.description}</p><div className="mt-4 flex flex-wrap gap-4 text-xs text-slate-300"><span><i className="ri-image-line mr-1.5 text-emerald-200" aria-hidden="true" />{photos} photos</span><span><i className="ri-film-line mr-1.5 text-emerald-200" aria-hidden="true" />{videos} videos</span><span className="ml-auto text-emerald-200">Explore collection →</span></div></div>
        </Link>;
      })}
    </div>
  </div>;
}
