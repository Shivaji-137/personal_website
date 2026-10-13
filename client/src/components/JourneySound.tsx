import { useEffect, useRef, useState } from 'react';

/** The locally supplied journey soundtrack, with browser autoplay fallback. */
export default function JourneySound() {
  const [muted, setMuted] = useState(false);
  const [volume, setVolume] = useState(55);
  const [active, setActive] = useState(false);
  const [failed, setFailed] = useState(false);
  const audio = useRef<HTMLAudioElement | null>(null);
  const settings = useRef({ muted, volume });
  settings.current = { muted, volume };

  useEffect(() => {
    const track = new Audio(`${import.meta.env.BASE_URL}audio/cosmic-journey.mp3`);
    track.loop = true;
    track.preload = 'auto';
    track.volume = 0;
    audio.current = track;
    let mounted = true;
    let enabled = true;
    const play = async () => {
      try {
        await track.play();
        if (mounted) { setActive(true); setFailed(false); }
      } catch {
        if (mounted) setActive(false);
      }
    };
    const onPlaying = () => { enabled = true; setActive(true); setFailed(false); };
    const onError = () => { enabled = false; setActive(false); setFailed(true); };
    track.addEventListener('playing', onPlaying);
    track.addEventListener('error', onError);
    if (!document.hidden) void play();
    const visibility = () => {
      if (document.hidden) track.pause();
      else if (enabled) void play();
    };
    document.addEventListener('visibilitychange', visibility);
    // Fade to the chosen volume instead of an abrupt start or slider jump.
    const fade = window.setInterval(() => {
      track.muted = settings.current.muted;
      const target = settings.current.volume / 100;
      track.volume += (target - track.volume) * 0.18;
    }, 50);
    return () => {
      mounted = false;
      clearInterval(fade);
      document.removeEventListener('visibilitychange', visibility);
      track.removeEventListener('playing', onPlaying);
      track.removeEventListener('error', onError);
      track.pause();
      track.removeAttribute('src');
      track.load();
      audio.current = null;
    };
  }, []);

  const toggle = async () => {
    const track = audio.current;
    if (!track) return;
    if (!active) {
      try {
        track.muted = false;
        await track.play();
        setMuted(false);
        setActive(true);
        setFailed(false);
      } catch { setActive(false); }
    } else {
      track.muted = !muted;
      setMuted(!muted);
    }
  };

  return <div className="flex items-center gap-2 rounded-full border border-white/20 bg-black/40 px-3 py-2">
    <button type="button" aria-label={!active ? 'Enable journey soundtrack' : muted ? 'Unmute journey soundtrack' : 'Mute journey soundtrack'} aria-pressed={active && !muted} onClick={toggle} className="whitespace-nowrap text-xs text-cyan-100">
      {!active ? 'Enable sound' : muted ? 'Sound off' : 'Sound on'}
    </button>
    <input type="range" aria-label="Soundtrack volume" title={`Soundtrack volume: ${volume}%`} min="0" max="100" step="1" value={volume} onChange={e => setVolume(Number(e.target.value))} className="w-14 accent-cyan-300 sm:w-20" />
    {failed && <span role="status" className="text-xs text-amber-200">Audio unavailable</span>}
  </div>;
}
