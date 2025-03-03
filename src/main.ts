const audioSrc = new URL('/src/assets/test_ljud.mp3', import.meta.url).href;
const audio: HTMLAudioElement = new Audio(audioSrc);
let isPlaying: boolean = false;
let currentTime: number = 0;
let duration: number = 0;

audio.addEventListener('timeupdate', () => {
  currentTime = audio.currentTime;
});

audio.addEventListener('loadedmetadata', () => {
  duration = audio.duration;
});

// Play/Pause functionality
const togglePlay = (): void => {
  if (audio.paused) {
    audio.play();
    isPlaying = true;
  } else {
    audio.pause();
    isPlaying = false;
  }
};

// Seek functionality
const seekAudio = (event: Event): void => {
  const target = event.target as HTMLInputElement;
  audio.currentTime = parseFloat(target.value);
};

// Format time (seconds → mm:ss)
const formatTime = (time: number): string => {
  if (isNaN(time)) return '0:00';
  const minutes = Math.floor(time / 60);
  const seconds = Math.floor(time % 60)
    .toString()
    .padStart(2, '0');
  return `${minutes}:${seconds}`;
};

// Setup UI updates
document.addEventListener("DOMContentLoaded", () => {
  const playButton = document.getElementById("playButton") as HTMLButtonElement;
  const progressBar = document.getElementById("progressBar") as HTMLInputElement;
  const timeDisplay = document.getElementById("timeDisplay") as HTMLParagraphElement;

  playButton.addEventListener("click", () => {
    togglePlay();
    playButton.textContent = isPlaying ? "Pause" : "Play";
  });

  progressBar.addEventListener("input", seekAudio);
  
  audio.addEventListener("timeupdate", () => {
    progressBar.value = audio.currentTime.toString();
    timeDisplay.textContent = `${formatTime(currentTime)} / ${formatTime(duration)}`;
  });

  audio.addEventListener("loadedmetadata", () => {
    progressBar.max = duration.toString();
  });
});
