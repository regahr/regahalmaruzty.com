"use client";

import { useEffect, useRef, useState } from "react";
import type { ArticleFilm } from "@/content/site";

// One row of three films as a contact sheet. At rest each cell is a poster with
// a play control under it, on the same row as the mono label, so nothing covers
// the poster. The <video> is not in the DOM, so no mp4 is fetched until a
// press. On press the native element mounts with native controls and the
// control goes away, leaving the native chrome in charge.
function Cell({ film }: { film: ArticleFilm }) {
  const [playing, setPlaying] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (!playing) return;
    videoRef.current?.play().catch(() => {
      // Native controls remain, so the visitor can still start it.
    });
  }, [playing]);

  return (
    <figure className="flex flex-col gap-3">
      <div className="relative aspect-[4/5] rounded-xl overflow-hidden border border-line bg-surface">
        {playing ? (
          <video
            ref={videoRef}
            controls
            playsInline
            preload="metadata"
            width={896}
            height={1120}
            poster={film.poster}
            className="w-full h-full object-cover"
          >
            <source src={film.mp4} type="video/mp4" />
            {film.captions && (
              <track kind="captions" src={film.captions} srcLang="en" label="English" default />
            )}
          </video>
        ) : (
          // Plain img: the repo uses no next/image. Explicit size, object-cover.
          // Nothing is drawn over the poster; the play control sits below it.
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={film.poster}
            alt={film.posterAlt}
            width={896}
            height={1120}
            className="w-full h-full object-cover"
          />
        )}
      </div>
      <figcaption className="flex flex-col gap-1.5">
        <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
          <h3 className="font-mono text-xs text-accent">{film.label}</h3>
          {!playing && (
            <button
              type="button"
              onClick={() => setPlaying(true)}
              aria-label={`Play film ${film.attempt}`}
              className="shrink-0 inline-flex items-center justify-center min-w-[44px] min-h-[44px] px-3 rounded-md border border-line bg-surface font-mono text-xs text-fg transition-transform duration-[160ms] ease-[cubic-bezier(0.23,1,0.32,1)] active:scale-[0.97]"
            >
              play
            </button>
          )}
        </div>
        <p className="text-[16px] leading-relaxed text-muted">{film.caption}</p>
      </figcaption>
    </figure>
  );
}

export default function ArticleFilmStrip({ films }: { films: ArticleFilm[] }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
      {films.map((f) => (
        <Cell key={f.attempt} film={f} />
      ))}
    </div>
  );
}