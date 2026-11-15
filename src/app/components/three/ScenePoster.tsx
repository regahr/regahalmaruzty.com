// Still image of a scene's first frame, shown until the live scene is ready,
// then cross-faded out. The live canvas is transparent, so the poster must
// fade out rather than stay underneath. Images: public/posters/, made from
// the real scene (see runs/ notes). Decorative: empty alt, and both parents are aria-hidden.
export default function ScenePoster({ name, live }: { name: "chick" | "concepts"; live: boolean }) {
  const src = (theme: string, size: string) => `/posters/${name}-${theme}-${size}.webp`;
  return (
    <picture
      className={`pointer-events-none absolute inset-0 transition-opacity duration-300 motion-reduce:transition-none ${live ? "opacity-0" : "opacity-100"}`}
    >
      <source media="(prefers-color-scheme: light) and (min-width: 640px)" srcSet={src("light", "lg")} />
      <source media="(min-width: 640px)" srcSet={src("dark", "lg")} />
      <source media="(prefers-color-scheme: light)" srcSet={src("light", "sm")} />
      {/* eslint-disable-next-line @next/next/no-img-element -- static poster, sized by its box */}
      <img src={src("dark", "sm")} alt="" decoding="async" className="w-full h-full object-contain" />
    </picture>
  );
}
