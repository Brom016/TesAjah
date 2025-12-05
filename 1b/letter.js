// letter.js - envelope open + seal click -> audio + redirect
const envelope = document.getElementById('envelope');
const flapTop = document.getElementById('flapTop');
const flapBottom = document.getElementById('flapBottom');
const seal = document.getElementById('seal');

/*
 Behavior:
 - Click envelope (anywhere) to open once.
 - When open, the seal is clickable: plays audio then redirects.
*/

// ensure audio file is in same folder: root/1b/qlx.mp3
const audio = new Audio('qlx.mp3');
audio.preload = 'auto';

// open envelope on first click
let opened = false;
envelope.addEventListener('click', (ev) => {
  // if user clicked the seal after opened, that event will be handled separately
  if (opened) return;
  opened = true;
  envelope.classList.add('open');

  // optional: subtle "bounce" on envelope when opening
  envelope.style.transform = 'rotateZ(-3deg) scale(1.02)';
  setTimeout(() => envelope.style.transform = 'rotateZ(-3deg) scale(1)', 600);
});

// prevent seal click from bubbling to envelope (so it doesn't toggle weird)
seal.addEventListener('click', (ev) => {
  ev.stopPropagation();

  // require envelope opened first
  if (!opened) {
    // if envelope closed, open it first then wait briefly then play and redirect
    opened = true;
    envelope.classList.add('open');
    setTimeout(() => playAndRedirect(), 700);
  } else {
    playAndRedirect();
  }
});

function playAndRedirect() {
  // play audio safely (browsers require user gesture - we have it)
  audio.currentTime = 0;
  audio.play().catch(() => {
    // ignore play error
  });

  // small seal feedback
  seal.style.transform += ' scale(0.96)';
  setTimeout(() => {
    // redirect after a short delay so audio is heard a bit
    window.location.href = "../1c/index.html";
  }, 800);
}
