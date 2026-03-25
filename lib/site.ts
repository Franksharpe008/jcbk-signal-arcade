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
  visualSrc: string;
  visualPoster: string;
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

export const siteName = "Jacob Kocsis Signal Arcade";

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
  { label: "Entry ritual", value: "Playable touch-ready arcade gate" },
  { label: "Capture path", value: "Live interest + download funnel" }
];

export const introTracks: AudioTrack[] = [
  {
    id: "intro-voice",
    label: "Jacob welcome",
    src: "/media/voice/intro-voice.mp3",
    description: "A brighter voice welcome that frames the whole experience before the first song hits."
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
    visualSrc: "/media/song-visuals/hip-hop-minute.mp4",
    visualPoster: "/media/song-visuals/hip-hop-minute.png",
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
    visualSrc: "/media/song-visuals/rnb-minute.mp4",
    visualPoster: "/media/song-visuals/rnb-minute.png",
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
    visualSrc: "/media/song-visuals/rock-minute.mp4",
    visualPoster: "/media/song-visuals/rock-minute.png",
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
    visualSrc: "/media/song-visuals/eighties-electric-minute.mp4",
    visualPoster: "/media/song-visuals/eighties-electric-minute.png",
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
    visualSrc: "/media/song-visuals/soul-pop-minute.mp4",
    visualPoster: "/media/song-visuals/soul-pop-minute.png",
    accent: "from-lime-300 via-emerald-400 to-teal-500"
  }
];

export const featuredVisuals: Visual[] = [
  {
    id: "hero-loop",
    title: "Jacob launch",
    summary: "The opening hero pass built around a brighter music-and-arcade stage world.",
    src: "/media/hero/hero-loop.mp4",
    poster: "/media/hero/hero-poster.png",
    type: "video"
  },
  {
    id: "arcade-surge",
    title: "Arcade surge",
    summary: "A fresh serpent-and-console motion pass for the arcade and track routes.",
    src: "/media/derived/serpent-rise.mp4",
    poster: "/media/fusion/arcade-serpent.png",
    type: "video"
  },
  {
    id: "logo-orbit",
    title: "Signal orbit",
    summary: "A slow orbit around the new mark for premium pause moments and the footer close.",
    src: "/media/derived/logo-orbit.mp4",
    poster: "/media/fusion/logo-mark.png",
    type: "video"
  },
  {
    id: "pulse-tunnel",
    title: "Pulse tunnel",
    summary: "A luminous gaming-and-music tunnel pass for the visuals and downloads routes.",
    src: "/media/derived/portal-drift.mp4",
    poster: "/media/fusion/frequency-portal.png",
    type: "video"
  },
  {
    id: "voltage-stage",
    title: "Voltage stage",
    summary: "A fresh still built for the experience and contact routes.",
    src: "/media/fusion/night-stage.png",
    type: "image"
  },
  {
    id: "control-room",
    title: "Control room",
    summary: "A fresh still built around Jacob's brighter command booth and release vibe.",
    src: "/media/fusion/control-room.png",
    type: "image"
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
    href: "/media/downloads/jacob-brand-kit.zip",
    note: "Logo mark, posters, and the hero loop for review or handoff."
  }
];

export const footerLinks = [
  { label: "Download the pack", href: "/downloads" },
  { label: "Play the arcade gate", href: "/arcade" },
  { label: "Send your info", href: "/contact" }
];
