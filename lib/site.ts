export type NavItem = {
  href: string;
  label: string;
};

export type Metric = {
  label: string;
  value: string;
};

export type AudioTrack = {
  id: string;
  label: string;
  src: string;
  description: string;
};

export type Song = {
  id: string;
  title: string;
  genre: string;
  runtime: string;
  mood: string;
  description: string;
  audioSrc: string;
  downloadSrc: string;
  lyricsSrc: string;
  accent: string;
};

export type Visual = {
  id: string;
  title: string;
  summary: string;
  src: string;
  poster?: string;
  type: "video" | "image";
};

export const siteName = "JCBK Signal Arcade";

export const navItems: NavItem[] = [
  { href: "/", label: "Home" },
  { href: "/tracks", label: "Tracks" },
  { href: "/arcade", label: "Arcade" },
  { href: "/visuals", label: "Visuals" },
  { href: "/experience", label: "Experience" },
  { href: "/downloads", label: "Downloads" },
  { href: "/contact", label: "Contact" }
];

export const heroMetrics: Metric[] = [
  { label: "Original tracks", value: "5 x 60-second drops" },
  { label: "Entry ritual", value: "Playable splash arcade gate" },
  { label: "Capture path", value: "Live interest + download funnel" }
];

export const introTracks: AudioTrack[] = [
  {
    id: "intro-voice",
    label: "Intro voice",
    src: "/media/voice/intro-voice.mp3",
    description: "The opening voice pass that frames the whole experience before the first song hits."
  },
  {
    id: "site-mix",
    label: "Site mix",
    src: "/media/tracks/eighties-electric-minute.mp3",
    description: "A glossy synth-led backdrop for reading the site at full color."
  }
];

export const songs: Song[] = [
  {
    id: "hip-hop-minute",
    title: "City Signal",
    genre: "Hip-Hop",
    runtime: "1:00",
    mood: "Confident, polished, late-night flex energy",
    description:
      "A hard-driving one-minute rap record built for bold entrances, sharp drums, and a hook that lands instantly.",
    audioSrc: "/media/tracks/hip-hop-minute.mp3",
    downloadSrc: "/media/tracks/hip-hop-minute.mp3",
    lyricsSrc: "/media/tracks/hip-hop-minute-lyrics.txt",
    accent: "from-cyan-400 via-sky-500 to-blue-600"
  },
  {
    id: "rnb-minute",
    title: "After Hours Dial Tone",
    genre: "90s R&B",
    runtime: "1:00",
    mood: "Smooth, romantic, plush, radio-ready",
    description:
      "A velvet R&B minute with warm chords, a silky pocket, and a chorus designed to feel familiar in the best way.",
    audioSrc: "/media/tracks/rnb-minute.mp3",
    downloadSrc: "/media/tracks/rnb-minute.mp3",
    lyricsSrc: "/media/tracks/rnb-minute-lyrics.txt",
    accent: "from-fuchsia-500 via-pink-500 to-rose-500"
  },
  {
    id: "rock-minute",
    title: "Static Horizon",
    genre: "Rock",
    runtime: "1:00",
    mood: "Arena-ready, urgent, bright-edged",
    description:
      "A one-minute rock cut with live-wire guitars, a lift-off chorus, and enough motion to feel cinematic without dragging.",
    audioSrc: "/media/tracks/rock-minute.mp3",
    downloadSrc: "/media/tracks/rock-minute.mp3",
    lyricsSrc: "/media/tracks/rock-minute-lyrics.txt",
    accent: "from-orange-400 via-red-500 to-amber-500"
  },
  {
    id: "eighties-electric-minute",
    title: "Neon Receiver",
    genre: "80s Synth",
    runtime: "1:00",
    mood: "Chrome, color, midnight drive nostalgia",
    description:
      "An 80s-inspired synth anthem with bright pads, glossy drums, and a chorus that feels built for a glowing skyline.",
    audioSrc: "/media/tracks/eighties-electric-minute.mp3",
    downloadSrc: "/media/tracks/eighties-electric-minute.mp3",
    lyricsSrc: "/media/tracks/eighties-electric-minute-lyrics.txt",
    accent: "from-violet-500 via-indigo-500 to-cyan-400"
  },
  {
    id: "soul-pop-minute",
    title: "Gold On The Wire",
    genre: "Soul Pop",
    runtime: "1:00",
    mood: "Premium, uplifting, crossover-ready",
    description:
      "A soulful pop closer with bounce, shine, and a feel-good lift that rounds the pack into something replayable.",
    audioSrc: "/media/tracks/soul-pop-minute.mp3",
    downloadSrc: "/media/tracks/soul-pop-minute.mp3",
    lyricsSrc: "/media/tracks/soul-pop-minute-lyrics.txt",
    accent: "from-lime-300 via-emerald-400 to-teal-500"
  }
];

export const featuredVisuals: Visual[] = [
  {
    id: "hero-loop",
    title: "Launch hero",
    summary: "The opening loop that sets the whole mood before the first click.",
    src: "/media/hero/hero-loop.mp4",
    poster: "/media/hero/hero-poster.png",
    type: "video"
  },
  {
    id: "snake-rise",
    title: "Arcade serpent",
    summary: "The symbol motion pass behind the arcade section and hover states.",
    src: "/media/derived/serpent-rise.mp4",
    poster: "/media/fusion/arcade-serpent.png",
    type: "video"
  },
  {
    id: "logo-orbit",
    title: "Brand orbit",
    summary: "A slow orbit around the logo mark for premium pause moments and footer close.",
    src: "/media/derived/logo-orbit.mp4",
    poster: "/media/fusion/logo-mark.png",
    type: "video"
  },
  {
    id: "portal-drift",
    title: "Frequency portal",
    summary: "A luminous portal pass for the visuals and downloads routes.",
    src: "/media/derived/portal-drift.mp4",
    poster: "/media/fusion/frequency-portal.png",
    type: "video"
  },
  {
    id: "night-stage",
    title: "Night stage",
    summary: "A stage-ready still for the story route and hero fallbacks.",
    src: "/media/fusion/night-stage.png",
    type: "image"
  },
  {
    id: "neon-particles",
    title: "Particle rain",
    summary: "A stock neon field used to add motion depth without drowning the content.",
    src: "/media/stock/neon-particles.mp4",
    poster: "/media/stock/neon-particles-still.jpg",
    type: "video"
  }
];

export const bundleFiles = [
  {
    label: "Full five-track pack",
    href: "/media/tracks/jcbk-five-pack.zip",
    note: "All five one-minute songs plus lyrics files in one clean download."
  },
  {
    label: "Logo and hero kit",
    href: "/media/downloads/jcbk-brand-kit.zip",
    note: "Logo mark, posters, and the hero loop for review or handoff."
  }
];

export const footerLinks = [
  { label: "Download the pack", href: "/downloads" },
  { label: "Play the arcade gate", href: "/arcade" },
  { label: "Send your info", href: "/contact" }
];
