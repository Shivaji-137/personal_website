import { useEffect, useState } from 'react';
import { Film, Search, X } from 'lucide-react';
import { Content as DialogContent } from '@radix-ui/react-dialog';
import {
  Dialog, DialogPortal, DialogOverlay, DialogTrigger,
  DialogClose, DialogTitle, DialogDescription,
} from '@/components/ui/dialog';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import StarBackground from '@/components/StarBackground';
import { watchedMovies, wantToWatchMovies, type WatchedMovie } from '@/data/movies';

function MovieCard({ movie, watched }: { movie: WatchedMovie; watched: boolean }) {
  const [posterFailed, setPosterFailed] = useState(false);
  const poster = movie.poster && !posterFailed ? (
    <img
      src={movie.poster}
      alt={`${movie.title} artwork`}
      loading="lazy"
      onError={() => setPosterFailed(true)}
      className="h-full w-full object-contain"
    />
  ) : (
    <span className="flex h-full items-center justify-center text-[#d7c6a6]/50">
      <Film size={40} aria-hidden="true" />
    </span>
  );

  return (
    <Dialog>
      <article className="flex h-full flex-col overflow-hidden rounded-xl border border-white/10 bg-[#15141a] transition-colors hover:border-[#d7c6a6]/50">
      <DialogTrigger asChild>
        <button
          type="button"
          aria-label={`View details for ${movie.title}`}
          className="group flex w-full flex-1 flex-col text-left focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-[#FFD15C]"
        >
          <span className="block aspect-[2/3] w-full overflow-hidden bg-gradient-to-br from-[#292330] to-[#121217]">
            <span className="block h-full w-full transition-transform duration-300 group-hover:scale-105 motion-reduce:transition-none">{poster}</span>
          </span>
          <span className="block p-2 sm:p-2.5">
            <span className="block font-space text-xs font-semibold leading-snug text-[#f3e9d6] sm:text-[13px]">{movie.title}</span>
            <span className="mt-1 block text-[10px] text-slate-400">{movie.kind}{movie.year ? ` · ${movie.year}` : ''}</span>
            <span className="mt-1 block text-[10px] leading-relaxed text-[#d7c6a6]">{movie.genres.join(' · ')}</span>
            {movie.note && <span className="mt-1.5 block text-[11px] leading-relaxed text-slate-300">{movie.note}</span>}
          </span>
        </button>
      </DialogTrigger>
      <a
        href={movie.summarySource}
        target="_blank"
        rel="noreferrer"
        aria-label={`Read more about ${movie.title} on Wikipedia`}
        className="mx-2 mb-2 inline-block self-start text-[10px] text-[#d7c6a6] underline underline-offset-4 hover:text-white sm:mx-2.5 sm:mb-2.5"
      >Read more ↗</a>
      </article>
      <DialogPortal>
        <DialogOverlay className="z-[70] bg-black/70 backdrop-blur-md motion-reduce:animate-none" />
        <DialogContent className="fixed left-1/2 top-1/2 z-[80] max-h-[90dvh] w-[calc(100%-2rem)] max-w-4xl -translate-x-1/2 -translate-y-1/2 overflow-y-auto rounded-2xl border border-[#d7c6a6]/20 bg-[#131218] p-5 text-white shadow-2xl focus:outline-none sm:p-8">
          <span className={`absolute right-16 top-4 rounded-full border px-3 py-1.5 text-[11px] font-medium ${watched ? 'border-emerald-300/20 bg-emerald-400/10 text-emerald-200' : 'border-amber-300/20 bg-amber-400/10 text-amber-200'}`}>
            {watched ? (movie.note === 'Partially watched' ? 'Partially watched' : 'Watched') : 'Want to Watch'}
          </span>
          <DialogClose aria-label="Close movie details" className="absolute right-3 top-3 z-10 flex h-10 w-10 items-center justify-center rounded-full border border-white/20 bg-black/70 text-white hover:bg-white/15 focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#FFD15C]">
            <X size={20} aria-hidden="true" />
          </DialogClose>
          <div className="grid gap-6 pt-10 sm:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] sm:pt-5 sm:items-center">
            <div className="mx-auto aspect-[2/3] w-40 overflow-hidden rounded-lg bg-black/30 sm:w-full">{poster}</div>
            <div className="min-w-0">
              <DialogTitle className="pr-8 font-space text-2xl font-bold leading-tight text-[#FFE2A0] sm:text-3xl">{movie.title}</DialogTitle>
              <div className="mt-2 flex flex-wrap items-center gap-x-3 gap-y-1 text-[11px] leading-relaxed">
                <p className="text-slate-400">{movie.kind}{movie.year ? ` · ${movie.year}` : ''}</p>
                <p className="text-[#d7c6a6]">{movie.genres.join(' · ')}</p>
              </div>
              {movie.imdb && (
                <div className="mt-2 flex flex-wrap items-center gap-x-2 gap-y-1">
                  <a
                    href={`https://www.imdb.com/title/${movie.imdb.id}/`}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={`IMDb rating for ${movie.title}: ${movie.imdb.rating.toFixed(1)} out of 10`}
                    title={`${movie.imdb.votes.toLocaleString()} votes · Checked ${movie.imdb.checkedOn}`}
                    className="inline-flex items-center gap-1.5 rounded border border-[#f5c518]/25 bg-[#f5c518]/10 px-2 py-1 text-[11px] hover:bg-[#f5c518]/20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#f5c518]"
                  >
                    <span className="rounded bg-[#f5c518] px-1 py-0.5 text-[10px] font-bold text-black">IMDb</span>
                    <span className="text-[#f5c518]" aria-hidden="true">★</span>
                    <span className="font-semibold text-white">{movie.imdb.rating.toFixed(1)}<span className="font-normal text-slate-400">/10</span></span>
                  </a>
                  <p className="text-[10px] text-slate-400">Checked {movie.imdb.checkedOn}</p>
                </div>
              )}
              {movie.note && <p className="mt-2 text-xs text-slate-400">{movie.note}</p>}
              <h3 className="mt-4 font-space text-sm font-semibold text-slate-200">About the story</h3>
              <DialogDescription className="mt-2 whitespace-pre-line text-sm leading-7 text-slate-300 sm:text-base">{movie.summary}</DialogDescription>
              <div className="mt-6 flex flex-wrap gap-x-5 gap-y-3 text-xs text-[#d7c6a6]">
                <a href={movie.summarySource} target="_blank" rel="noreferrer" className="underline underline-offset-4 hover:text-white">Read more ↗</a>
              </div>
            </div>
          </div>
        </DialogContent>
      </DialogPortal>
    </Dialog>
  );
}

export default function MoviesCollectionPage() {
  const [collection, setCollection] = useState('watched');
  const movies = collection === 'watched' ? watchedMovies : wantToWatchMovies;
  const [query, setQuery] = useState('');
  const [genre, setGenre] = useState('All');
  const genres = Array.from(new Set(movies.flatMap(movie => movie.genres))).sort();
  const [kind, setKind] = useState<'All' | WatchedMovie['kind']>('All');
  const normalize = (value: string) => value.toLowerCase().replace(/[^a-z0-9]+/g, '');
  const filteredMovies = movies.filter(movie =>
    (kind === 'All' || movie.kind === kind) &&
    (genre === 'All' || movie.genres.includes(genre)) &&
    normalize(`${movie.title} ${movie.year ?? ''} ${movie.genres.join(' ')}`).includes(normalize(query))
  );

  useEffect(() => {
    document.title = 'Movies Collection | Shivaji Chaulagain';
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="relative flex min-h-screen flex-col overflow-x-hidden bg-[#08080a] text-white">
      <StarBackground />
      <Header />
      <main className="relative z-10 mx-auto w-full max-w-7xl flex-1 px-5 pb-20 pt-32 sm:px-8">
        <div className="mb-10 border-b border-[#d7c6a6]/15 pb-8">
          <h1 className="font-space text-3xl font-bold tracking-tight text-[#FFE2A0] sm:text-5xl">Movies Collection</h1>
          <p className="mt-4 max-w-xl text-sm leading-relaxed text-slate-300 sm:text-base">What I’ve watched, and what I want to watch next.</p>
        </div>

        <Tabs value={collection} onValueChange={value => {
          setCollection(value);
          setQuery('');
          setGenre('All');
          setKind('All');
        }}>
          <TabsList aria-label="Movie shelves" className="mb-6 h-auto max-w-full gap-1 rounded-full border border-white/10 bg-white/5 p-1">
            <TabsTrigger value="watched" className="rounded-full px-4 py-2.5 text-xs text-slate-400 data-[state=active]:bg-[#d7c6a6]/15 data-[state=active]:text-[#FFE2A0] sm:text-sm">
              Watched <span className="ml-2 text-[10px] opacity-65">{watchedMovies.length}</span>
            </TabsTrigger>
            <TabsTrigger value="want-to-watch" className="rounded-full px-4 py-2.5 text-xs text-slate-400 data-[state=active]:bg-[#d7c6a6]/15 data-[state=active]:text-[#FFE2A0] sm:text-sm">
              Want to Watch <span className="ml-2 text-[10px] opacity-65">{wantToWatchMovies.length}</span>
            </TabsTrigger>
          </TabsList>
          <TabsContent key={collection} value={collection}>
        {movies.length > 0 ? (
          <>
            <div className="mb-7 flex flex-wrap items-center justify-between gap-4">
              <div className="flex flex-wrap gap-2" role="group" aria-label="Filter collection">
                {(['All', 'Film', 'Series', 'Collection'] as const).map(option => (
                  <button
                    key={option}
                    type="button"
                    aria-pressed={kind === option}
                    onClick={() => setKind(option)}
                    className={`rounded-full border px-4 py-2 text-xs transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#FFD15C] ${kind === option ? 'border-[#d7c6a6]/40 bg-[#d7c6a6]/15 text-[#FFE2A0]' : 'border-white/10 text-slate-400 hover:border-white/30 hover:text-white'}`}
                  >
                    {option === 'Film' ? 'Films' : option === 'Collection' ? 'Collections' : option}
                  </button>
                ))}
              </div>
              <label className="flex items-center gap-2 text-xs text-slate-400">
                Genre
                <select
                  aria-label="Filter by genre"
                  value={genre}
                  onChange={event => setGenre(event.target.value)}
                  className="max-w-full rounded-full border border-white/15 bg-[#15141a] px-3 py-2.5 text-sm text-[#f3e9d6] focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#FFD15C]"
                >
                  <option value="All">All genres</option>
                  {genres.map(option => <option key={option} value={option}>{option}</option>)}
                </select>
              </label>
              <label className="flex w-full items-center gap-3 rounded-full border border-white/15 bg-white/5 px-4 py-3 focus-within:border-[#d7c6a6]/60 sm:w-80">
                <Search size={17} aria-hidden="true" className="shrink-0 text-slate-400" />
                <span className="sr-only">Search movies by title, year, or genre</span>
                <input value={query} onChange={event => setQuery(event.target.value)} placeholder="Title, year, or genre" type="search" className="min-w-0 flex-1 bg-transparent text-sm outline-none placeholder:text-slate-500" />
              </label>
            </div>
            <p role="status" className="mb-5 text-xs text-slate-400">{filteredMovies.length} {filteredMovies.length === 1 ? 'title' : 'titles'}{query || kind !== 'All' || genre !== 'All' ? ` of ${movies.length}` : ''}</p>
            {filteredMovies.length > 0 ? (
              <div className="grid grid-cols-3 gap-2 sm:grid-cols-4 sm:gap-3 md:grid-cols-5 lg:grid-cols-6 xl:grid-cols-8">
                {filteredMovies.map(movie => <MovieCard key={movie.id} movie={movie} watched={collection === 'watched'} />)}
              </div>
            ) : <p className="py-16 text-center text-slate-400">No titles match your search and filter.</p>}
            <p className="mt-10 text-xs leading-relaxed text-slate-500">Collections use representative artwork.</p>
          </>
        ) : (
          <div className="flex min-h-64 flex-col items-center justify-center rounded-2xl border border-[#d7c6a6]/15 bg-gradient-to-br from-[#d7c6a6]/[.06] to-transparent px-6 py-16 text-center">
            <Film size={36} strokeWidth={1.2} aria-hidden="true" className="mb-5 text-[#d7c6a6]" />
            <h2 className="font-space text-xl text-[#f3e9d6]">{collection === 'watched' ? 'The collection is coming soon' : 'Want to Watch'}</h2>
            <p className="mt-3 max-w-sm text-sm leading-relaxed text-slate-400">{collection === 'watched' ? 'My watched films will appear here with their posters and titles.' : 'A place for the films and series I plan to watch next.'}</p>
          </div>
        )}
          </TabsContent>
        </Tabs>
      </main>
      <Footer />
    </div>
  );
}
