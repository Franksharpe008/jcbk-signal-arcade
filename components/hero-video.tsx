type HeroVideoProps = {
  src: string;
  poster: string;
  label: string;
};

export function HeroVideo({ src, poster, label }: HeroVideoProps) {
  return (
    <div className="hero-video-shell">
      <video
        className="hero-video"
        autoPlay
        muted
        loop
        playsInline
        poster={poster}
        aria-label={label}
      >
        <source src={src} type="video/mp4" />
      </video>
      <div className="hero-video-scan" />
      <div className="hero-video-glow" />
    </div>
  );
}
